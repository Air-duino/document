---
title: 刷写固件
order: 2
icon: paper-plane
---

AirISP支持烧录`HEX`或`BIN`格式的文件到芯片的 FLASH 中。

我们可以使用`write_flash`命令来执行烧录操作，像下面这样：

```powershell
> .\AirISP.exe -c air001 -p COM21 -b 115200 -e write_flash 0x08000000 gpio.hex
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

:::tip

烧录固件时请务必加上`-e`擦除参数，未擦除的时候刷入的固件一般跑不起来。

:::

:::tip

如若使用劣质串口转USB芯片导致通信失败，需要降低波特率再试，比如`9600`。

:::
