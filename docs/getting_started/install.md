---
title: 安装
---

此文档旨在介绍关于 `AirMCU` 的相关安装方式。

## Arduino IDE 的安装

Arduino IDE支持Windows、Mac OS X及Linux等平台，下载地址为[Software > Arduino](https://www.arduino.cc/en/software)，本文仅介绍Windows下的安装方式，其他系统大同小异，请读者自行研究，接下来针对两种方式分别介绍如何安装。

:::note

Windows系统下的IDE有EXE安装版和ZIP压缩包免安装版。EXE安装版需要按步骤安装，ZIP压缩包免安装版解压后即可使用（但不会在桌面建立IDE启动图标），后者无须管理员权限也可运行使用。

:::

### Windows下exe版本安装

在[Software > Arduino](https://www.arduino.cc/en/software)可以获取最新的IDE目前版本是2.10，点击如图所示的区域，下载exe版本安装包。

:::tip

注：现在大部分电脑都是64位因此可以直接下载最新版本，对于32位的电脑可以在页面下翻，选择老版本进行下载安装。

:::

![image-20230609164109637](img/image-20230609164109637.png)

选择`JUST DOWNLOAD`仅下载，根据网速等待片刻即可下载完成。

![image-20230609164252675](img/image-20230609164252675.png)

双击安装包进行安装，点击我同意。

![image-20230609164821984](img/image-20230609164821984.png)

仅为自己安装即可。

![image-20230609164900031](img/image-20230609164900031.png)

默认安装位置不用动，直接点击安装，稍等一会就可以安装好了。

![image-20230609164926761](img/image-20230609164926761.png)

最后点击完成即可。

![image-20230609165202809](img/image-20230609165202809.png)

### windows下zip版本安装

在[Software > Arduino](https://www.arduino.cc/en/software)可以获取最新的IDE目前版本是2.10，点击如图所示的区域，下载zip版本免安装包。

:::tip

注：现在大部分电脑都是64位因此可以直接下载最新版本，对于32位的电脑可以在页面下翻，选择老版本进行下载安装。

:::

![image-20230612140840851](img/image-20230612140840851.png)

下载完成以后直接解压即可，双击解压后的文件夹中的`Arduino_IDE.exe`即可运行。为了方便日后使用，可以右键添加到开始菜单或者在桌面创建快捷方式。

![image-20230617205905523](img/image-20230617205905523.png)

#### 修改语言

首次安装默认语言为英文，可以点击`File/Preference`。

![image-20230612140357459](img/image-20230612140357459.png)

在Language选项卡下拉，选择语言为`中文（简体）`。点击右下角OK，IDE将自动重启，语言将切换为中文。

![image-20230612140452011](img/image-20230612140452011.png)

## 安装 AirMCU 支持包

### 添加开发板地址

点击Arduino IDE左上角的**文件**-**首选项**

![1](img/2023-05-08-23-12-46.png)

在**其它开发板管理器地址**中输入AirMCU的地址：

```log
https://arduino.luatos.com/package_air_cn_index.json
```

:::tip

海外用户可以使用这个：

```log
https://github.com/Air-duino/Arduino-pack-json-ci/releases/download/Nightly/package_air_index.json
```

:::

![2](img/2023-05-08-23-13-35.png)

![3](img/2023-05-08-23-16-50.png)

### 安装开发板

在**开发板管理器**中搜索**Air MCU**

![4](img/2023-05-08-23-18-51.png)

安装最新版即可

:::tip

安装过程需要安装多个工具链，可能会稍慢，请耐心等待

:::

---

接下来可以继续查看下一章节，进行开发测试