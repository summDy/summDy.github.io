+++
title       = "RT-Thread 启动 HardFault：.rti_fn 段里的空指针"
date        = 2026-09-03
draft       = false
description = "上电后在 rt_components_board_init 里直接崩，多半是链接脚本把 .rti_fn 段丢了。记一下三步定位法。"
categories  = ["嵌入式"]
tags        = ["RT-Thread", "HardFault", "调试", "链接脚本"]
+++

上电后在 `rt_components_board_init()` 里直接 HardFault，挂死时 PC 停在一个明显不是函数的地址。这类问题在把 RT-Thread 移植到新 BSP、或者换过分散加载文件之后特别常见，排查思路记一下。

## 现象

仿真器连上，全速跑，进 HardFault。Call Stack 大致是：

```
rt_components_board_init()
  -> 0x00000000   (或 0xFFFFFFFF / 一段乱地址)
```

如果停在 `0x00000000`、`0xFFFFFFFF`，或者某个明显落在 Flash 空区的地址，基本可以确定：**函数指针本身是坏的，不是函数内部崩的**。

## 原理：RT-Thread 的自动初始化机制

RT-Thread 用宏把初始化函数"注册"到一个自定义段里，启动时遍历这个段依次调用。

```c
/* 展开后大致是这样 */
#define INIT_BOARD_EXPORT(fn)                                        \
    const init_fn_t __rt_init_##fn SECTION(".rti_fn.1") = fn
```

`__rt_init_##fn` 是个**函数指针变量**，放到 `.rti_fn.N` 段。启动时的遍历逻辑：

```c
void rt_components_board_init(void)
{
    const init_fn_t *fn_ptr;

    for (fn_ptr = &__rt_init_rti_board_start;
         fn_ptr < &__rt_init_rti_board_end;
         fn_ptr++)
    {
        (*fn_ptr)();        /* 这里崩 */
    }
}
```

关键点：

- 编译器保证同一段内的变量**按名字排序**放置，于是 `__rt_init_rti_board_start` / `__rt_init_rti_board_end` 就成了这个段的"哨兵"
- 段内每一项都是一个函数指针，大小 4 字节（Cortex-M）
- `(*fn_ptr)()` 从 Flash 里**取值再跳转**——取到什么就跳什么，没有任何校验

所以一旦段内容是空的（全 `0x00` 或全 `0xFF`），跳过去就是 HardFault。

## 根因：分散加载文件把段丢了

最常见的原因是 `.sct`（Keil）/ `.ld`（GCC）里**没有显式保留 `.rti_fn*` 段**，链接器认为它没被引用，直接丢弃了。

Keil 的 `.sct` 里必须显式写上：

```
LR_IROM1 0x08000000 0x00100000  {
  ER_IROM1 0x08000000 0x00100000  {
    *.o (RESET, +First)
    *(InRoot$$Sections)
    .ANY (+RO)
    .ANY (+XO)           ; ARMCC 6 需要
  }
  ...
}
```

注意 `.ANY (+RO)` 理论上能收进去，但如果开了 **link-time 优化或者 gc-sections**，`.rti_fn` 这种"只被指针引用"的数据段经常被判定为不可达而删掉。稳妥写法是显式列出来：

```
    *(.rti_fn*)
    *(InRoot$$Sections)
```

GCC 的 `.ld` 对应位置：

```ld
    .text :
    {
        *(.text*)
        KEEP(*(.rti_fn*))     /* KEEP 是关键 */
    } > FLASH
```

`KEEP()` 会阻止 `--gc-sections` 删除该段。

## 快速自检三步

### 1. 看 map 文件里有没有这个段

```bash
grep -i "rti_fn" build/*.map
```

如果没有任何输出，或者只有 `start` / `end` 两个哨兵而没有中间项——**段被丢了**。

### 2. 直接看 Flash 内容

```bash
# 假设哨兵符号地址已知
arm-none-eabi-nm build/*.elf | grep rti_fn
```

拿到 `__rt_init_rti_board_start` 地址后，在调试器里 dump 那片内存。如果全是 `0xFF`（未擦写）或 `0x00`，确认无疑。

正常应该看到一串递增的、落在 `.text` 区间的地址值。

### 3. 检查哨兵之间的跨度

```c
/* 临时加个调试打印 */
rt_kprintf("board: %p -> %p, count=%d\n",
           &__rt_init_rti_board_start,
           &__rt_init_rti_board_end,
           (int)(&__rt_init_rti_board_end - &__rt_init_rti_board_start));
```

如果 `count` 是 0 或者是个离谱的大数，说明段布局有问题。

## 另一种坑：C++ 里的静态初始化顺序

如果是 C++ 工程，还有一种情况是初始化函数本身还没构造好就被调用了。这种情况不会是空指针，而是跳进去了但成员变量是乱的。判据是 **PC 落在合法函数内，但数据不对**——这就不是本节的问题了。

## 小结

| 现象 | 原因 |
| --- | --- |
| PC = `0x00000000` | 段未擦写或被丢，取到 0 |
| PC = `0xFFFFFFFF` | Flash 空区，段被丢 |
| PC 在合法函数内崩 | 不是段问题，查函数内部 |
| map 里搜不到 `rti_fn` | 链接脚本没 KEEP |
| 只有哨兵没有中间项 | 所有 `INIT_*_EXPORT` 都没生效 |

排查顺序：**看 map → 看 Flash → 查链接脚本**。三步里基本第二步就能定性。
