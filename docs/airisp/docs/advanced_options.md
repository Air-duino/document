---
title: 高级参数
order: 5
icon: star
---

## -t, --trace

如果加上了这个参数，表示会打印出详细的 DEBUG 信息。

## --connect-attempts <次数>

最大重试次数，默认为`10`次，`0`表示无限次。

## --before <default_reset|direct_connect>

下载前的操作，用于让芯片自动进入 BOOT 模式：

- default_reset：Air001 开发板的默认控制方式，由于需要兼容 Arduino IDE 的串口查看器，所以使用了特殊的 ISP 控制电路，进入 BOOT 时需要使用特殊的时序控制方法。
- direct_connect：串口的 DTR 连接 BOOT0 ，RTS 连接 RST，直接控制设备进入 BOOT 模式。

## --after <default_reset|direct_connect>

下载完成后的操作，用于让芯片自动重启运行代码：

- default_reset：Air001 开发板的默认控制方式，原因参考上一小节。
- direct_connect：串口的 RTS 连接 RST，直接控制设备重启。
