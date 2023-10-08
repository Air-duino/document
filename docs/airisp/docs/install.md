---
title: 安装
order: 1
icon: download
---

我们可以前往[GitHub Release页面](https://github.com/Air-duino/AirISP/releases/latest)下载最新版本的AirISP工具。

::: details Arch包管理安装

Arch Linux 及其衍生版可以安装 [AUR airisp-git](https://aur.archlinux.org/packages/airisp-git)。

**注：命令行名称按 Arch Linux 规范应该是小写，安装后命令行为：`airisp`。**

```bash
yay -Syu airisp
```

:::

> `AiISP`工具内置了`.NET`运行时，所以无需手动安装额外的依赖。

解压后可以得到`AirISP.exe`（其他系统上可能为`AirISP`）

此时我们就可以直接使用这个工具了：

```bash
> .\AirISP.exe -h
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
