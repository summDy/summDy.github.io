+++
title   = "搜索"
layout  = "search"
type    = "page"
url     = "/search/"
slug    = "search"
# 必须输出 json：主题自带的 Fuse 搜索靠 /search/index.json 取数据
# （Pagefind 索引缺失时的回退方案，侧边栏搜索框也走这条链路）
outputs = ["html", "json"]
+++
