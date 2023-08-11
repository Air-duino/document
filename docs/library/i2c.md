---
title: I2C
icon: tag
---

## 关于

I2C（Inter-Integrated Circuit）/TWI（Two-wire Interface）是一种广泛使用的串行通信，用于短距离连接设备。这是用于连接传感器、EEPROM、RTC、ADC、DAC、显示器、OLED 以及许多其他设备和微控制器的最常见外设之一。

这种串行通信被视为低速总线，多个设备可以连接在同一条两线总线上，每个设备都有一个唯一的 7 位地址（最多 128 个设备）。这两根线称为SDA（串行数据线）和SCL（串行时钟线）。

::: note
SDA 和SCL 线需要上拉电阻。有关电阻值和工作电压的更多详细信息，请参阅器件数据表。
:::

AirMCU I2C 库基于 [Arduino Wire 库](https://www.arduino.cc/en/reference/wire)，并实现了更多 API，如本文档中所述。

## I2C 模式

I2C 可用于两种不同的模式：

- 主模式

  - 在此模式下，AirMCU 生成时钟信号并发起与从设备的通信。

- 从模式

  - 从机模式，时钟由主设备产生，如果目的地址与目的设备相同则响应主设备。

## I2C 通用 API

以下是主模式和从模式下使用的常用功能。

### begin

该函数用于使用默认配置启动外设。

```cpp
bool begin();
```

如果外设正确初始化，此函数将返回 `true` 。

### setSDA

该函数用于设置 SDA 引脚。

```cpp
void setSDA(uint32_t pin);
```

- `pin`：SDA 引脚。

或者

```cpp
void setSDA(PinName sda)
```

### setSCL

该函数用于设置 SCL 引脚。

```cpp
void setSCL(uint32_t pin);
```

- `pin`：SCL 引脚。

或者

```cpp
void setSCL(PinName scl)
```

::: warning
`setSDA` 和 `setSCL` 函数必须在 `begin` 函数之前调用。
:::

### setClock

该函数用于设置 I2C 时钟频率。

```cpp
void setClock(uint32_t frequency);
```

- `frequency`：I2C 时钟频率。

### write

该函数将数据写入缓冲区。

```cpp
size_t write(uint8_t data);
```

- `data`：要写入的数据。

或者

```cpp
size_t write(const uint8_t *data, size_t len);
```

- `data`：要写入的数据。
- `len`：要写入的数据数量。

### end

该函数用于停止 I2C 通信。

```cpp
void end();
```

调用 `end` 后，您需要再次使用 `begin` 以再次初始化I2C驱动程序。

## I2C 主模式 

该模式用于启动与从机的通信。

### 基本用法：

要开始在 Arduino 上使用 I2C 主模式，第一步是将 `Wire.h` 头文件引入到你的代码中。

```cpp
#include <Wire.h>
```

现在，我们可以通过调用 begin 函数来开始外设配置。

```cpp
Wire.begin();
```

通过使用不带任何参数的 `begin` ，所有设置都将使用默认值完成。如需自行设置值，请参阅函数说明。

调用 `begin` 后，我们可以通过调用 `beginTransmission` 并传递 I2C 从机地址来开始传输：

```cpp
Wire.beginTransmission(address);
```

要将一些字节写入从设备，请使用 `write` 函数。

```cpp
Wire.write(data);
```

您可以使用 `write` 函数传递不同的数据类型。

要结束传输，请使用 `endTransmission` 函数。

::: note
`write` 函数不会直接写入从设备，而是添加到I2C缓冲区。为此，您需要使用 endTransmission 函数将缓冲的字节发送到从设备。
:::

```cpp
Wire.endTransmission();
```

调用 `endTransmission` 后，I2C缓冲区中存储的数据将被传输到从设备。

现在您可以请求从从设备读取数据。 `requestFrom` 将要求通过提供地址和大小来读取所选设备的数据。

```cpp
Wire.requestFrom(I2C_DEV_ADDR, SIZE);
```

`readBytes` 将读取它。

```cpp
Wire.readBytes(temp, error);
```

## I2C 主机 API

以下是 I2C 主机 API。这些功能仅用于主模式。

### begin

您可以使用不带任何参数的 `begin` 函数来使用所有默认值。

```cpp
bool begin();
```

或者，您可以指定您使用的 SDA 和 SCL 引脚。

```cpp
bool begin(uint32_t sda, uint32_t scl);
```

### beginTransmission

该函数用于启动 I2C 传输。

```cpp
void beginTransmission(uint8_t address);
```

该函数用于启动与从设备的通信过程。在将消息写入缓冲区之前，通过传递从属 `address` 来调用此函数。

### endTransmission

使用i2c write写入缓冲区后，使用函数 `endTransmission` 将消息发送到 `beginTransmission` 函数上定义的从设备地址。

```cpp
uint8_t endTransmission(bool stopBit = true);
```

- `stopBit`：如果为 `true` ，则发送停止位。

在没有 `sendStop` 的情况下调用此函数相当于 `sendStop = true` 。

```cpp
uint8_t endTransmission(void);
```

该函数将返回错误代码。

### requestFrom

要从从设备读取，请使用 `requestFrom` 函数。

```cpp
uint8_t requestFrom(uint8_t address, uint8_t quantity, uint32_t iaddress, uint8_t isize, uint8_t sendStop)
```

- `address`：从设备地址。
- `quantity`：要读取的字节数。
- `iaddress`：内部地址。
- `isize`：内部地址大小。
- `sendStop`：如果为 `true` ，则发送停止位。

或者，您可以使用

```cpp
uint8_t requestFrom(uint8_t address, uint8_t quantity, uint8_t sendStop)
```

此函数将调用 `requestFrom` ，并将 `iaddress` 和 `isize` 设置为 `0` 。

或者，您可以使用

```cpp
uint8_t requestFrom(uint8_t address, uint8_t quantity)
```

此函数将调用 `requestFrom` ，并将 `iaddress` 和 `isize` 设置为 `0` ，并将 `sendStop` 设置为 `true` 。

### 示例应用程序

以下是如何在主模式下使用 I2C 的示例。

```cpp
#include "Wire.h"

#define I2C_DEV_ADDR 0x55

uint32_t i = 0;

void setup() {
  Serial.begin(115200);
  Serial.setDebugOutput(true);
  Wire.begin();
}

void loop() {
  delay(5000);

  //Write message to the slave
  Wire.beginTransmission(I2C_DEV_ADDR);
  Wire.printf("Hello World! %u", i++);
  uint8_t error = Wire.endTransmission(true);
  Serial.printf("endTransmission: %u\n", error);
  
  //Read 16 bytes from the slave
  uint8_t bytesReceived = Wire.requestFrom(I2C_DEV_ADDR, 16);
  Serial.printf("requestFrom: %u\n", bytesReceived);
  if((bool)bytesReceived){ //If received more than zero bytes
    uint8_t temp[bytesReceived];
    Wire.readBytes(temp, bytesReceived);
    log_print_buf(temp, bytesReceived);
  }
}
```

## I2C 从机模式

该模式用于接受来自主机的通信。

### 基本用法

要开始在 Arduino 上使用 I2C 作为从模式，第一步是将 `Wire.h` 头文件引入到你的代码中。

```cpp
#include <Wire.h>
```

在调用 `begin` 之前，我们必须创建两个回调函数来处理与主设备的通信。

```cpp
Wire.onReceive(onReceive);
```

和

```cpp
Wire.onRequest(onRequest);
```

`onReceive` 将根据从属设备读取请求处理来自主设备的请求， `onRequest` 将处理对主设备的应答。

现在，我们可以通过使用设备地址调用 `begin` 函数来开始外设配置。

```cpp
Wire.begin(I2C_DEV_ADDR);
```

通过使用不带任何参数的 `begin` ，所有设置都将使用默认值完成。如需自行设置值，请参阅函数说明。

## I2C 从机 API

### begin

在从机模式下，必须通过传递从机地址来使用 `begin` 函数。

```cpp
void TwoWire::begin(uint8_t address, bool generalCall, bool NoStretchMode)
```

- `address`：从机地址。
- `generalCall`：如果为 `true` ，则启用广播地址。
- `NoStretchMode`：如果为 `true` ，则禁用时钟拉伸。

### onReceive

`onReceive` 函数用于定义从主机接收到的数据的回调。

```cpp
void onReceive(cb_function_receive_t callback);
```

### onRequest

`onRequest` 函数用于定义要发送到主机的数据的回调。

```cpp
void onRequest(cb_function_request_t callback);
```

### 示例应用程序

以下是如何在从模式下使用 I2C 的示例。

```cpp
#include <Wire.h>

#define I2C_ADDR  2

void setup()
{
  Wire.begin(I2C_ADDR);         // join i2c bus with address #4
  Wire.onRequest(requestEvent); // register event
  Wire.onReceive(receiveEvent); // register event
  Serial.begin(9600);           // start serial for output
}

void loop()
{
  //empty loop
}

// function that executes whenever data is received from master
// this function is registered as an event, see setup()
void receiveEvent(int howMany)
{
  while(1 < Wire.available()) // loop through all but the last
  {
    char c = Wire.read();     // receive byte as a character
    Serial.print(c);          // print the character
  }
  int x = Wire.read();        // receive byte as an integer
  Serial.println(x);          // print the integer
}

// function that executes whenever data is requested by master
// this function is registered as an event, see setup()
void requestEvent()
{
  Wire.write("hello\n");  // respond with message of 6 bytes
                          // as expected by master
}

```

## 进阶用法

默认情况下，只有一个 Wire 实例可用，它使用了默认的I2C引脚，具体可以参考开发板的手册。要使用第二个 I2C 端口，应在代码中在 `setup()` 函数之前声明 `TwoWire` 对象：

```cpp
#include <Wire.h>

TwoWire Wire2(SDA_PIN, SCL_PIN);

void setup() {
  Wire2.begin(); 
}

void loop() {
  Wire2.beginTransmission(0x71);
  Wire2.write('v');
  Wire2.endTransmission();
  delay(1000);
}
```

### 默认 I2C 引脚

默认 I2C 接口引脚在 `PeripheralPins.c` 文件中配置。

示例（对于文件 PeripheralPins.c 中的 `AIR001_DEV`）：

```c
#ifdef HAL_I2C_MODULE_ENABLED
WEAK const PinMap PinMap_I2C_SDA[] = {
  {PA_2,  I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF12_I2C)},
  {PA_7,  I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF12_I2C)},
  {PA_9,  I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF12_I2C)},
  {PA_10, I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF6_I2C)},
  {PA_12, I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF6_I2C)},
  {PB_7, I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF6_I2C)},
  {PB_8, I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF12_I2C)},
  {PF_0, I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF12_I2C)},
  {NC,    NP,   0}
};
#endif

#ifdef HAL_I2C_MODULE_ENABLED
WEAK const PinMap PinMap_I2C_SCL[] = {
  {PA_3,  I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF12_I2C)},
  {PA_8,  I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF12_I2C)},
  {PA_9, I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF6_I2C)},
  {PA_10, I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF12_I2C)},
  {PA_11, I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF6_I2C)},
  {PB_6, I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF6_I2C)},
  {PB_8, I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF6_I2C)},
  {PF_1, I2C, AIR_PIN_DATA(AIR_MODE_AF_OD, GPIO_NOPULL, GPIO_AF12_I2C)},
  {NC,    NP,   0}
};
#endif
```

### 重新定义I2C引脚

因为它们被定义为 WEAK，所以您可以在代码文件中重新定义它们，而不是更改 `PeripheralPins.c` 文件中的值。您还可以使用 `AIR_PIN_DATA()` 的第二个参数启用/禁用内部上拉电阻。

### I2C 缓冲区管理

默认情况下，I2C 缓冲区都在 Arduino API 上对齐：32 字节。

但是我们最多可以传输 255 个字节：

- 在主模式下：RX 和 TX 缓冲区将在需要时自动增长，彼此独立，并且独立于其他 I2C 实例。

    从应用程序的角度来看无事可做。

- 在从模式下：借助开关 I2C_TXRX_BUFFER_SIZE ，可以使用 hal_conf_extra.h 或 build_opt.h （在编译时）静态重新定义 RX 和 TX 缓冲区大小

    所有 I2C 实例都受此编译开关更改的影响。

