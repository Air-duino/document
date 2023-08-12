---
title: SPI
icon: object-group
---

## 关于

SPI，即Serial Peripheral Interface Bus（串行外设接口），是一种用于芯片通信的同步串行通信接口规范，主要应用于单片机系统中。类似I²C。 这种接口首先由摩托罗拉公司于20世纪80年代中期开发，后发展成了行业规范。它的典型应用有闪存、EEPROM、SD卡与液晶显示器。

SPI设备之间使用全双工模式通信，是一个主机和一个或多个从机的主从模式。主机负责初始化帧，这个数据传输帧可以用于读与写两种操作，片选线路可以从多个从机选择一个来响应主机的请求。

有时SPI接口被称作四线式接口，这是为了与其他不同线制的数据传输接口加以区分。SPI准确来讲应为“同步串行接口”，但是它又与同步串行接口协议（SSI）是完全不同的两种协议。虽然SSI也是一个四线式同步通信协议，但是它使用差分信号，而且仅提供一个单工通信信道。于此相对地，SPI是一个单主机多从机的通信接口。

SPI是一种事实标准，也就是说这种规范没有对应的技术标准。因此各个厂家生产的SPI器件配置不一样，不一定有互操作性。 

## Arduino API 参考

[SPI Reference](https://www.arduino.cc/reference/en/language/functions/communication/spi/)

[SPI Description](https://docs.arduino.cc/learn/communication/spi)

## AirMCU 专用API

AirMCU SPI 库已经过修改，可以在不停止 SPI 接口的情况下管理多个 CS 引脚。

我们为用户提供了 3 种关于 CS 引脚管理的可能性：

- CS 引脚在传输数据之前由用户代码直接管理（如 Arduino SPI 库）
- 或者用户将 CS pin 号提供给库 API，库自行管理 CS pin（参见下面的示例）
- 或者用户使用链接到 SPI 外设的硬件 CS 引脚

### SPIClass::SPIClass(uint8_t mosi, uint8_t miso, uint8_t sclk, uint8_t ssel)

构造函数，用于初始化 SPI 外设，参数为 SPI 外设的引脚号。

- `mosi`：MOSI 引脚号
- `miso`：MISO 引脚号
- `sclk`：SCLK 引脚号
- `ssel`：CS 引脚号，该引脚必须是硬件 CS 引脚。如果配置该引脚，片选将由 SPI 外设管理。请勿在参数中使用带有 CS 引脚的 API 函数。

### void SPIClass::begin(uint8_t _pin)

初始化 SPI 外设。

- `_pin`：CS 引脚号，由 SPI 库管理。

### void beginTransaction(uint8_t pin, SPISettings settings)

允许使用其他参数配置SPI。这些新参数保存在关联的 CS 引脚上。

- `pin`：CS 引脚号，由 SPI 库管理。
- `settings`：SPI 设置，包括速率、位顺序和数据模式。

### void endTransaction(uint8_t pin)

删除 CS 引脚和关联的 SPI 设置

- `pin`：CS 引脚号，由 SPI 库管理。

::: note
使用 `begin()` 或 `beginTransaction()` 初始化 SPI 实例后，必须调用以下函数。
如果要管理多个设备，可以多次调用 `beginTransaction()`，并在参数中包含不同的 CS 引脚。
然后，您可以使用不同的 CS 引脚调用以下函数，而无需再次调用 `beginTransaction()`（直到调用 `end()` 或 `endTransaction()`）。
:::

:::note
如果模式设置为 SPI_CONTINUE，CS 引脚将保持启用状态。使用多个 CS 引脚时要小心。
:::


### byte transfer(uint8_t pin, uint8_t _data, SPITransferMode _mode = SPI_LAST)

写入/读取一个字节

- `pin`： CS 引脚，由 SPI 库管理
- `data`：要写入的参数
- `mode`：（可选）如果 SPI_LAST mode CS 引脚复位， SPI_CONTINUE mode CS 引脚保持启用状态。返回接收到的数据

### uint16_t transfer16(uint8_t pin, uint16_t _data, SPITransferMode _mode = SPI_LAST)

写/读半字

- `pin`： CS 引脚，由 SPI 库管理
- `data`：要写入的参数
- `mode`：（可选）如果 SPI_LAST mode CS 引脚复位， SPI_CONTINUE mode CS 引脚保持启用状态。返回接收到的数据

### void transfer(uint8_t pin, void *_buf, size_t _count, SPITransferMode _mode = SPI_LAST)

写入/读取几个字节。仅使用一个缓冲区来写入和读取数据

- `pin`： CS 引脚，由 SPI 库管理
- `buf`：指向要写入的数据的指针
- `count`：要写入/读取的数据数量
- `mode`：（可选）如果 SPI_LAST mode CS 引脚复位， SPI_CONTINUE mode CS 引脚保持启用状态。

### void transfer(byte _pin, void *_bufout, void *_bufin, size_t _count, SPITransferMode _mode = SPI_LAST)

写入/读取几个字节。一个用于输出数据的缓冲区，一个用于输入数据的缓冲区

- `pin`： CS 引脚，由 SPI 库管理
- `bufout`：指向要写入的数据的指针
- `bufin`：指向要读取的数据的指针
- `count`：要写入/读取的数据数量
- `mode`：（可选）如果 SPI_LAST mode CS 引脚复位， SPI_CONTINUE mode CS 引脚保持启用状态。

### 例子

这是使用 CS 引脚管理的示例：

```cpp
#include <SPI.h>
//            MOSI  MISO  SCLK
SPIClass SPI_3(PC12, PC11, PC10);

void setup() {
  SPI_3.begin(2); //Enables the SPI_3 instance with default settings and attaches the CS pin  
  SPI_3.beginTransaction(1, settings); //Attaches another CS pin and configure the SPI_3 instance with other settings  
  SPI_3.transfer(2, 0x52); //Transfers data to the first device
  SPI_3.transfer(1, 0xA4); //Transfers data to the second device. The SPI_3 instance is configured with the right settings  
  SPI_3.end() //SPI_3 instance is disabled
}
```

## 更改默认 SPI 实例引脚

还可以使用下列 API 更改 `SPI` 实例使用的默认引脚：

- `void setMISO(uint32_t miso)`
- `void setMOSI(uint32_t mosi)`
- `void setSCLK(uint32_t sclk)`
- `void setSSEL(uint32_t ssel)`
- `void setMISO(PinName miso)`
- `void setMOSI(PinName mosi)`
- `void setSCLK(PinName sclk)`
- `void setSSEL(PinName ssel)`

::: warning
这些 API 必须在调用 `begin()` 之前调用。
:::

