---
title: AirISP 烧录工具
order: 1
icon: cube
---

AirISP 是一个通过串口与芯片ISP功能进行交互，从而实现擦除、烧录、修改读保护等功能的一个小工具。

它使用`.NET6`进行编写，支持跨平台。可以在[GitHub上获取该项目的源码](https://github.com/Air-duino/AirISP)。

## 快速开始

前往[GitHub Release页面](https://github.com/Air-duino/AirISP/releases/latest)下载最新版本的AirISP工具。

Arch Linux 及其衍生版可以安装 [AUR airisp-git](https://aur.archlinux.org/packages/airisp-git)。

**注：命令行名称按 Arch Linux 规范应该是小写，安装后命令行为：`airisp`。**

```bash
yay -Syu airisp
```

解压或安装后可以得到 `AirISP`：

```bash
> .\AirISP -h
Description:
  AirISP 是一个flash烧录工具

Usage:
  AirISP [command] [options]

Options:
  -c, --chip <chip>                      目标芯片型号，auto/air001
  -p, --port <port>                      串口名称
  -b, --baud <baud>                      串口波特率
  -t, --trace                            启用trace日志输出 [default: False]
  --connect-attempts <connect-attempts>  最大重试次数，小于等于0表示无限次，默认为10次 [default: 10]
  --before <before>                      下载前要执行的操作 [default: default_reset]
  --after <after>                        下载后要执行的操作 [default: hard_reset]
  --version                              Show version information
  -?, -h, --help                         Show help and usage information

Commands:
  chip_id                           获取芯片ID
  get                               获取ISP版本和支持的命令列表
  get_version                       获取ISP版本和芯片读保护状态
  write_flash <address> <filename>  向flash刷入固件
  read_unprotect                    关闭读保护
  read_protect                      开启读保护
```

我们可以使用该工具为芯片进行烧录，比如下面这样：

```bash
> .\AirISP.exe -c air001 -p COM21 -b 115200 write_flash -e 0x08000000 gpio.hex
AirISP v1.2.4.0
串口 COM21
连接中...
Chip PID is: 0x04 0x40
擦除flash中（请耐心等待）...
擦除成功，耗时 39.5811 ms.
Writing at 134219264... 100.00%
Write 1536 bytes at 0x08000000 in 274.0526 ms

Leaving...
通过RTS硬件复位...
```

更多信息请见其他章节内容
