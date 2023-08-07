---
title: 工具命令
order: 6
icon: terminal
---

## chip_id

获取芯片 ID

## get

获取芯片 ISP 版本和支持的命令列表。

## get_version

获取芯片 ISP 版本和芯片读保护状态。

## write_flash <芯片FLASH地址> <固件文件>

向 FLASH 的指定地址开始，刷入固件，固件文件可以为`HEX`或`BIN`文件。

## read_unprotect

关闭 FLASH 的读保护，此时将自动擦除 FLASH 上的所有内容。

## read_protect

开启 FLASH 的读保护，此时将无法读取 FLASH 的内容。
