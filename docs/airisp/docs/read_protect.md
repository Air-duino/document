---
title: 读写保护
order: 3
icon: unlock-alt
---

## 解除读保护

有时候我们会不小心将 MCU 的读保护打开，导致无法刷入固件，这是就需要去除读保护。

我们可以使用`read_unprotect`命令来关闭 FLASH 的读保护，像下面这样：

```bash
> .\AirISP.exe -c air001 -p COM21 -b 115200 read_unprotect
AirISP v1.2.4.0
串口 COM21
连接中...
Leaving...
通过RTS硬件复位...
```

:::warning

解除读保护的操作会导致 FLASH 数据被全部擦除。

:::

:::tip

如若使用劣质串口转USB芯片导致通信失败，需要降低波特率再试，比如`9600`。

:::

## 启用读保护

我们可以使用`read_protect`命令来开启 FLASH 的读保护，像下面这样：

```bash
> .\AirISP.exe -c air001 -p COM21 -b 115200 read_protect
AirISP v1.2.4.0
串口 COM21
连接中...
Leaving...
通过RTS硬件复位...
```

:::warning

开启读保护后，会导致无法使用 ISP 工具进行烧录操作，需要解除读保护后才可操作。

:::

:::tip

如若使用劣质串口转USB芯片导致通信失败，需要降低波特率再试，比如`9600`。

:::
