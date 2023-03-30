## Welcome to GitHub Pages

You can use the [editor on GitHub](https://github.com/summDy/WeiShenYiNeng.github.io/edit/master/README.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [Basic writing and formatting syntax](https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/summDy/WeiShenYiNeng.github.io/settings/pages). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://docs.github.com/categories/github-pages-basics/) or [contact support](https://support.github.com/contact) and we’ll help you sort it out.


# github.io的入门

index.html作为入口



# HTML入门
HTML(Hypertext Markup Language) 超文本标记语言

HTML主要用于构建网页的结构，描述页面的内容。
Hypertext Markup Language：超文本标记语言。是用来制作网页的一种标记语言。
标记：又叫标签（HTML TAG），有特殊的书写规范，是写给浏览器的一种语法格式，结合普通的文字信息，实现特殊的语义或显示内容。在编辑器中可以编辑和查看，在浏览器中不显示。重要的事情说三遍，在浏览器中不显示。

WWW（World Wide Web）

```
根标签，有且只有一个
<html></html>
```



## 基本骨架

在vscode的html文档中输入！出现提示再按Tab键，就会自动生成。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```



## head标签

```
<head>
		<title></title>
</head>
```

主要是传给给浏览器看的。

title是干嘛的？，不在网页中，出现在标题栏





## body标签

网页的可见内容，希望用户看到的。都在body中



## 自结束标签和注释

注意事项：

注释不能嵌套



什么是自结束标签？

```
<body>
<!--
HTML的注释，注释中的内容会被浏览器所忽略，不会再网页中直接显示，
	但是可以在源码中查看注释，注释用来对代码进行解释说明的。
	开发中一定要养成良好的编写注释的习惯，注释要求简单明了。
	
注释还可以将一些不希望显示的内容隐藏。

标签一般成对出现，但是也存在一些自结束标签
-->
<img>
<img />
<input>
<input />
</body>
```



## 标签中的属性

```
<html>
    <head>
        <title>标签的属性</title>
    </head>
    <body>
        <!--
            属性，在标签中（开始标签或自结束标签）才可以设置属性
            属性是一个名值对（x=y）
            属性和标签名或其他属性应该使用空格隔开
            属性不能缩写，应该根据文档中的规定编写
            有些属性有属性值，有些没有，如果有属性值，属性值应该使用引号引起来
        -->
        <h1>这是我的<font color="red" size ="3">第三个</font>网页</h1>

    </body>
</html>
```

我们怎么知道这个标签有属性呢？

又怎么知道属性有哪些值呢？



## 文档声明

网页的基本结构？

```
<!doctype html>
<html>
    <head>
        <title>网页的基本结构</title>
    </head>
    <body>
        <!--
            迭代
                网页的版本
                HTML4
                HTML2.0
                HTML5
                ...
                文档声明（doctype）
                    - 文档声明用来告诉浏览器当前网页的版本
                    - html5的文档声明
                    <!doctype html>
                    <!Doctype HTML>
        -->

    </body>
</html>
```

## 字符编码

```
 <!-- 可以通过meta标签来设置网页的字符集，避免乱码问题-->
        <meta charset="utf-8">
```



```
<!-- 文档声明，声明当前网页的版本-->
<!doctype html>
<html>
    <head>
        <!-- 可以通过meta标签来设置网页的字符集，避免乱码问题-->
        <meta charset="utf-8">
        <title>网页的基本结构</title>
    </head>
    <body>
        <!--
            迭代
                网页的版本
                HTML4
                HTML2.0
                HTML5
                ...
                文档声明（doctype）
                    - 文档声明用来告诉浏览器当前网页的版本
                    - html5的文档声明
                    <!doctype html>
                    <!Doctype HTML>

            字符编码
                - 所有的数据在计算机中存储时都是以二进制形式存储的。文字也不例外。
                    所以一段文字在存储到内存中时，都需要转换为二进制编码
                    当我们读取这段文字时，计算机会将编码转换为字符，供我们阅读。

                - 编码
                    将字符转换为二进制码的过程为编码
                -解码
                    将二进制码转换为字符的过程称为解码
                - 字符集（charset）
                    编码和解码所采用的规则称为字符集
                - 乱码问题：
                    如果编码和解码所采用的字符集不同就会出现乱码问题
                - 常见的字符集：
                    ASCII, ISO88591, GB2312, GBK, UTF-8

        -->

    </body>
</html>
```

## 文档的使用

相当于说明书

### 工具

vc_redist_x64.exe

vc_redist_x86.exe

zeal-0.6.1-windows-x64.exe(离线文档查看器)

zeal-0.6.1-windows-x86.exe

如何使用请看此视频在10：00开始：https://www.youtube.com/watch?v=zEy4Asm157Y&list=PLmOn9nNkQxJFs5KfK5ihVgb8nNccfkgxn&index=11

zeal还可以查看go、python、java等各种语言的。我感觉这就像windows上开发看MSDN一样。

https://www.w3school.com.cn



## vscode上开发技巧

请看此视频从12：00开始：https://www.youtube.com/watch?v=DGClCZ5tftA&list=PLmOn9nNkQxJFs5KfK5ihVgb8nNccfkgxn&index=13&t=623s

vscode，安装ayu主题。

神奇的操作来啦，真的是提高生产力。。。。

直接写html，就会有智能提示出来，再敲键盘enter键，就直接出现箭头对啦

！+Tab键，直接就出来一个完整的基本框架代码啦，爽。。。。。。。。。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```



## 配置live Server

请看此视频：https://www.youtube.com/watch?v=DGClCZ5tftA&list=PLmOn9nNkQxJFs5KfK5ihVgb8nNccfkgxn&index=13&t=623s

vscode安装插件liveServer

liveServer的作用：改代码，在浏览器中自动同步刷新。随时改随时看到效果。爽。。。。。。。

回到html文件，右键。这里就多了Open with Live Server选项。如果没有则点击一下添加都监视。

点击一下Open with Live Server, 则在浏览器中打开了相应的网页。

修改代码后保存，则马上就同步刷新到浏览器中就可以看到了。爽。。。。。。。。。。



看到浏览器中的地址栏：是一个服务器地址下的网页。比较真实的模拟真实上线的场景。



解决保存后，才能同步刷新。vscode设置自动保存。

vscode中设置，Auto Save

写个p标签，p+Tab就直接出来啦

## 实体

https://www.youtube.com/watch?v=0AlJEUAxJkQ&list=PLmOn9nNkQxJFs5KfK5ihVgb8nNccfkgxn&index=14

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
 
    <title>实体</title>
</head>
<body>

    <!-- 
	在网页中编写多个空格默认情况下会自动被浏览器解析为一个空格
	在html中有些时候，我们不能直接书写一些特殊符号
		比如：多个空格；字母两则的大于和小于号
		
	如果我们需要在网页中书写这些特殊的符号，则需要使用html中的实体（转义字符）
    实体的语法：
        &nbsp； 空格
        &gt； 大于号
        &lt； 小于号
        &copy; 版权符号
    -->
    <p>
        今天&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;天气真不错！
    </p>

    <p>
        a&lt;b&gt;c
    </p>
    
</body>
</html>
```

那么多实体（转义字符），不是每个都要记住的。需要用的时候去如下的W3C网站查找就可以了，上面还有HTML实体符号参考手册

https://www.w3school.com.cn



## meta标签

请看此视频：https://www.youtube.com/watch?v=9dVqkTg6xh8&list=PLmOn9nNkQxJFs5KfK5ihVgb8nNccfkgxn&index=17&t=41s

```
<!DOCTYPE html>
<html lang="en">
<head>
     <!--
        meta 主要用于设置网页中的一些元数据，元数据不是给用户看
            charset 指定网页的字符集
            name 指定的数据的名称
            content 指定的数据内容

                keywords 表示网站的关键字，可以同时指定多个关键字，关键字间使用，隔开
                    <meta name="keywords" content="网上购物，网上商城，手机，笔记本，电脑">
                    <meta name="keywords" content="网购，网上购物，在线购物，网购网站">
                decription 用于指定网站的描述
                    <meta name="description" content="京东JD.COM-专业的综合网上购物商城">

    -->
    <meta charset="UTF-8">
    <meta name="keywords" content="HTML5,前端，CS3">
    <meta name="decription" content="这是一个非常不错的网站">
    <!--
        <meta http-quiv="refresh" content="3;url=https://www.mozilla,org">
        将页面重定向到另一个网站
    -->
    <!-- <meta http-equiv="refresh" content="3;url=https://www.baidu.com"> -->

    <title>meta标签</title>
</head>
<body>

    <!-- 
	在网页中编写多个空格默认情况下会自动被浏览器解析为一个空格
	在html中有些时候，我们不能直接书写一些特殊符号
		比如：多个空格；字母两则的大于和小于号
		
	如果我们需要在网页中书写这些特殊的符号，则需要使用html中的实体（转义字符）
    实体的语法：
        &nbsp； 空格
        &gt； 大于号
        &lt； 小于号
        &copy; 版权符号
    -->
    <p>
        今天&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;天气真不错！
    </p>

    <p>
        a&lt;b&gt;c
    </p>
    
</body>
</html>
```

设置页面中的关键字

设置网站的描述

移动端的话，设置。。。。。。。。。。。



## 语义化标签

https://www.youtube.com/watch?v=Vx_SyyfRN6M&list=PLmOn9nNkQxJFs5KfK5ihVgb8nNccfkgxn&index=16

```

```

https://www.youtube.com/watch?v=ItXbNFH8_LU&list=PLmOn9nNkQxJFs5KfK5ihVgb8nNccfkgxn&index=19

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <!-- 
        在网页中HTML专门来负责网页的结构
            所以在使用html标签时，应该关注的是标签的语义，而不是它的样式

            标题标签
                h1 ~ h6 一共有六级标题
                从h1~h6重要性递减，最重要，h6最不重要
                h1在网页中的重要性仅次于title标签，
     -->

     <!-- <h1>一共有六级标题</h1>
     <h2>二级标题</h2>
     <h3></h3>
     <h4></h4>
     <h5></h5>
     <h6>六级标题</h6> -->

     <!--
        块元素（block element）
            - 在网页中一般通过块元素来对页面进行布局

        行内元素（inline element）
            - 行内元素主要用来包裹文字

        - 一般情况下会在块元素中放行内元素，而不会再行内元素中块元素
        - 块元素中基本上什么都能放
        - p元素中不能放任何的块元素

        浏览器在解析网页时，会自动对网页中不符合规范的内容进行修正
            比如：
                标签写在了根元素的外部
                p元素中嵌套了块元素
                根元素中出现了除head和body以外的子元素
     -->

     <!-- 布局标签（结构化语义标签）-->
     <!-- 
        header 表示网页的头部 
        main 表示网页的主体部分（一个页面中只会有一个main）
        footer 表示网页的底部
        nav 表示网页中的导航
        aside 和主体相关的其他内容（侧边栏）
        article 表示一个独立的文章
        section 表示一个独立的区块，上边的标签都不能表示使用时使用section

        div 没有语义，就是用来表示一个区块，目前来讲div还是我们主要的布局元素。
        span 行内(内联)元素，没有任何语义，一般用于在网页中选中文字
    -->

     <header>
        <h1>最大标题</h1>

     </header>
     <!-- 表示网页的主体部分（一个页面中有且只有一个main） -->
     <main></main>

     <!-- 网页的底部 -->
     <footer></footer>

     <!-- 网页中的导航 -->
     <nav></nav>

     <aside></aside>

     <article></article>

     <section>wwww</section>

     <div></div>

     <span></span>
    
</body>
</html>
```





## *块元素和行内元素

https://www.youtube.com/watch?v=Pqkn2u1p7Wo&list=PLmOn9nNkQxJFs5KfK5ihVgb8nNccfkgxn&index=17

浏览器会自动修正错误。是什么错误呢？怎么修正？ 请看视频

如何在浏览器中查看源码，查看内存中实际运行的源码（也就是浏览器自动修正后的代码）

```
 <!--
        块元素（block element）
            - 在网页中一般通过块元素来对页面进行布局

        行内元素（inline element）
            - 行内元素主要用来包裹文字

        - 一般情况下会在块元素中放行内元素，而不会再行内元素中块元素
        - 块元素中基本上什么都能放
        - p元素中不能放任何的块元素

        浏览器在解析网页时，会自动对网页中不符合规范的内容进行修正
            比如：
                标签写在了根元素的外部
                p元素中嵌套了块元素
                根元素中出现了除head和body以外的子元素
     -->
```



## 列表

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <!-- 
        在网页中HTML专门来负责网页的结构
            所以在使用html标签时，应该关注的是标签的语义，而不是它的样式

            标题标签
                h1 ~ h6 一共有六级标题
                从h1~h6重要性递减，最重要，h6最不重要
                h1在网页中的重要性仅次于title标签，
     -->

     <!-- <h1>一共有六级标题</h1>
     <h2>二级标题</h2>
     <h3></h3>
     <h4></h4>
     <h5></h5>
     <h6>六级标题</h6> -->

     <!--
        块元素（block element）
            - 在网页中一般通过块元素来对页面进行布局

        行内元素（inline element）
            - 行内元素主要用来包裹文字

        - 一般情况下会在块元素中放行内元素，而不会再行内元素中块元素
        - 块元素中基本上什么都能放
        - p元素中不能放任何的块元素

        浏览器在解析网页时，会自动对网页中不符合规范的内容进行修正
            比如：
                标签写在了根元素的外部
                p元素中嵌套了块元素
                根元素中出现了除head和body以外的子元素
     -->

     <!-- 布局标签（结构化语义标签）-->
     <!-- 
        header 表示网页的头部 
        main 表示网页的主体部分（一个页面中只会有一个main）
        footer 表示网页的底部
        nav 表示网页中的导航
        aside 和主体相关的其他内容（侧边栏）
        article 表示一个独立的文章
        section 表示一个独立的区块，上边的标签都不能表示使用时使用section

        div 没有语义，就是用来表示一个区块，目前来讲div还是我们主要的布局元素。
        span 行内(内联)元素，没有任何语义，一般用于在网页中选中文字
    -->

     <header>
        <h1>最大标题</h1>

     </header>
     <!-- 表示网页的主体部分（一个页面中有且只有一个main） -->
     <main></main>

     <!-- 网页的底部 -->
     <footer></footer>

     <!-- 网页中的导航 -->
     <nav></nav>

     <aside></aside>

     <article></article>

     <section>wwww</section>

     <div></div>

     <span></span>

     <!-- 
        列表（list）
            1、铅笔
            2、笔记本
            3、橡皮
        在html中也可以创建列表，html列表一共有三种：
            有序列表
            无序列表
            定义列表

        列表之间可以相互嵌套
      -->

      <!-- 无序列表 ，相对用的对，在浏览器中看网页的源代码常看到 -->
      <ul>
        <li>结构</li>
        <li>硬件</li>
        <li>软件</li>
      </ul>
      <!-- 有序列表 -->
      <ol>
        <li>结构</li>
        <li>硬件</li>
        <li>软件</li>
      </ol>

      <!-- 定义列表，使用dt来表示定义的内容，使用dd来对内容进行解释说明 -->
      <dl>
            <dt>结构</dt>
            <dd>结构表示网页的结构，结构用来规定网页中哪里是标题，哪里是段落</dd>
            <dd>结构表示网页的结构，结构用来规定网页中哪里是标题，哪里是段落</dd>
            <dd>结构表示网页的结构，结构用来规定网页中哪里是标题，哪里是段落</dd>

      </dl>




    
</body>
</html>
```



## 超链接

https://www.youtube.com/watch?v=YxBzY-fpl4I&list=PLmOn9nNkQxJFs5KfK5ihVgb8nNccfkgxn&index=20

### 相对路径

https://www.youtube.com/watch?v=X6tDL17rRGQ&list=PLmOn9nNkQxJFs5KfK5ihVgb8nNccfkgxn&index=21





### 其他用法



## 图片

```
<img src="" alt="">
```



### 图片格式

​	jpg 

	- 支持的颜色比较丰富，不支持透明效果，不支持动图
	- 一般用来显示图片

​	gif 

	- 支持颜色比较少，支持简单透明，支持动图
	- 颜色单一的图片，图片

​	png 

 - 支持的颜色丰富，支持复杂透明，不支持动图

 - 颜色丰富，复杂透明图片（专为网页而生）

   

   webp

   效果一样，用小的

   效果不一样，用效果好的



## 内联框架











## 如何阅读HTML代码

https://www.youtube.com/watch?v=T0fwwjmPU8Q

https://www.youtube.com/watch?v=egmyh81Y1YQ&list=PLmOn9nNkQxJFs5KfK5ihVgb8nNccfkgxn&index=3













# CSS

用于控制页面中的元素的样式



## 基本语法



### 选择器

https://www.w3school.com.cn/css/css_selectors.asp

CSS选择器用于"查找"（或选取）要设置样式的HTML元素。

我们可以将 CSS 选择器分为五类：

- 简单选择器（根据名称、id、类来选取元素）
- [组合器选择器](https://www.w3school.com.cn/css/css_combinators.asp)（根据它们之间的特定关系来选取元素）
- [伪类选择器](https://www.w3school.com.cn/css/css_pseudo_classes.asp)（根据特定状态选取元素）
- [伪元素选择器](https://www.w3school.com.cn/css/css_pseudo_elements.asp)（选取元素的一部分并设置其样式）
- [属性选择器](https://www.w3school.com.cn/css/css_attribute_selectors.asp)（根据属性或属性值来选取元素）



border 边框





# JavaScript



## 历史

https://wangdoc.com/javascript/basic/history#:~:text=1995%E5%B9%B412%E6%9C%884,%E5%86%85%E7%BD%AE%E4%BA%86JavaScript%20%E8%84%9A%E6%9C%AC%E8%AF%AD%E8%A8%80%E3%80%82

JavaScript 的基本语法和对象体系，是模仿 Java 而设计的。但是，JavaScript 没有采用 Java 的静态类型。正是因为 JavaScript 与 Java 有很大的相似性，

JavaScript 语言的函数是一种独立的数据类型，以及采用基于原型对象（prototype）的继承链。这是它与 Java 语法最大的两点区别。JavaScript 语法要比 Java 自由得多。



### 关键的时间节点

2004年，**<u>Dojo 框架</u>**诞生，为不同浏览器提供了同一接口，并为主要功能提供了便利的调用方法。这标志着 JavaScript 编程框架的时代开始来临。

2006年，Google推出 Google Web Toolkit 项目（缩写为 GWT），提供 Java 编译成 JavaScript 的功能，开创了将其他语言转为 JavaScript 的先河。



2012年，微软发布 TypeScript 语言。该语言被设计成 JavaScript 的超集，这意味着所有 JavaScript 程序，都可以不经修改地在 TypeScript 中运行。同时，TypeScript 添加了很多新的语法特性，主要目的是为了开发大型程序，然后还可以被编译成 JavaScript 运行。



2015年3月，Facebook 公司发布了 React Native 项目，将 React 框架移植到了手机端，可以用来开发手机 App。它会将 JavaScript 代码转为 iOS 平台的 Objective-C 代码，或者 Android 平台的 Java 代码，从而为 JavaScript 语言开发高性能的原生 App 打开了一条道路。



https://wangdoc.com/javascript/





## 概述

https://javascript.ruanyifeng.com/introduction/intro.html





## 实验环境

JavaScript的上手非常方便，只要电脑安装了浏览器，就可以用来实验了。只要打开Chrome浏览器的“开发者工具”（Developer Tools），就可以在它的“控制台”（console）运行JavaScript代码。

进入“控制台”，有两种方法。

快捷键方式，在Chrome浏览器中，直接按Option + Command + J (Mac) 或者 Ctrl + shift + J (Windows/Linux)。

菜单方式，从“工具”（Tools）菜单中打开“开发者工具”，然后点击Console选项卡。“开发者工具”的快捷键是F12，或者option + Command + I (Mac) and Ctrl + shift + I (Windows / Linux) 

进入控制台以后，就可以在提示符后输入代码，然后按Enter键，代码就会执行。如果shift + Enter键，就是代码换行，不会触发执行。







用于响应用户操作



https://www.youtube.com/watch?v=3eLw3flIC9M

最简单的应用，图片轮播

```
//获取容器
var pics =document.getElementById("pics");
var n=1;

//设置时钟控件
setInterval(function(){
	//alert(n);
	if(n>4) n =1
	pics.innerHTML="<img src='img/a%20("+n+").jpg' />";
	n++;
},2000);
```







# 网络资源

https://cloud.tencent.com/developer/article/1027974



# 相关知识

万维网联盟（W3C），制订网页开发的标准，以使用一个网页在不同的浏览器中有相同的效果。所以，我们需要制订我们编写的网页都需要遵循W3C的规范。



































































