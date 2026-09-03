+++
title       = "无线数据采集平台"
date        = 2026-07-15
draft       = false
description = "ATmega128 + FreeRTOS 的无线采集平台，集成 LoRa 与 ZigBee 双无线链路，支持 SHT3x 温湿度采集与远程固件升级。"
summary     = "双无线链路冗余设计，LoRa 负责远距离回传，ZigBee 负责区域内组网，含完整 Bootloader。"
categories  = ["物联网终端"]
tags        = ["LoRa", "ZigBee", "FreeRTOS", "ATmega128", "SHT3x", "Bootloader"]
weight      = 2
featured    = true

cover       = ""
role        = "软硬件开发"
stack       = ["ATmega128", "FreeRTOS", "LoRa M-HL10", "CC2420"]
outcome     = "完成 6 个子工程与协议栈整合"
link        = ""
+++

<!-- 以下内容为示例，请按实际情况修改或补充 -->

## 项目背景

环境监测场景下，采集点分散且布线困难，需要一套能长距离回传、
又能在局部区域自组网的采集方案。

## 方案设计

采用 **LoRa + ZigBee 双无线** 互补：

| 链路 | 芯片 | 作用 | 特点 |
| --- | --- | --- | --- |
| LoRa | M-HL10 | 远距离回传 | 公里级、低功耗、速率低 |
| ZigBee | CC2420 | 区域内组网 | 自组网、多点接入、延迟低 |

FreeRTOS 划分采集任务、LoRa 收发任务、ZigBee 协议栈任务与升级任务。

## 关键技术点

### 双链路的共存干扰

两路无线都工作在 2.4G 之外的 Sub-G 与 2.4G 频段，错开频段后仍需注意
发射瞬间的电源跌落，硬件侧加了足够的去耦，软件侧错峰发送。

### 远程升级的可靠性

Bootloader 带 CRC 校验与双区备份，升级失败自动回滚到上一版本，
避免现场变砖。

## 交付内容

- 采集终端固件 + Bootloader
- 网关侧汇聚程序
- 上位机配置工具
