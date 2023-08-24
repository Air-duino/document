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

### write_flash 命令参数

`write_flash`命令有如下参数：

1. `--erase-all`或者`-e`，作用是在烧录的时候擦除全部flash，建议添加。
2. `--no-progress`或者`-p`，作用是在下载的时候禁止显示进度条。

:::tip

若MCU中已刷入过其他固件，烧录新固件时请务必加上`-e`擦除参数。

:::

## read_unprotect

关闭 FLASH 的读保护，此时将自动擦除 FLASH 上的所有内容。

## read_protect

开启 FLASH 的读保护，此时将无法读取或写入 FLASH 的内容。

## read_flash <芯片FLASH地址> <读取长度> <固件文件>

向 FLASH 的指定地址开始，读取固件存入对应文件，固件文件只能为`BIN`文件。

### read_flash 命令参数

`read_flash`命令有如下参数：

1. `--overwrite`或者`-o`，作用是如果文件已存在，则覆盖文件，否则拒绝继续读取。
2. `--no-progress`或者`-p`，作用是在下载的时候禁止显示进度条。
