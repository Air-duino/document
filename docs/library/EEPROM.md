---
title: EEPROM
icon: 
---

## 简介

EEPROM 是一种存储器，其值在电路板断电时保留。在 AirMCU 中，没有内置的 EEPROM，但是可以使用 Flash 模拟 EEPROM。一般来说，我们采用内置 flash 的最后一个 page 扇区（或者是其它可擦写的最小单位）来模拟。

## API

要使用此库，请在代码顶部包含头文件：

```cpp
#include <EEPROM.h>
```

### read()

从 EEPROM 读取一个字节。

```cpp
EEPROM.read(address)
```

- `address`：要读取的地址，从 0 开始。
- 返回值：读取的字节。

#### 示例

```cpp
#include <EEPROM.h>

int a = 0;
int value;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  value = EEPROM.read(a);

  Serial.print(a);
  Serial.print("\t");
  Serial.print(value);
  Serial.println();

  a = a + 1;

  if (a == 512)
    a = 0;

  delay(500);
}
```

### write()

将一个字节写入 EEPROM。

```cpp
EEPROM.write(address, value)
```

- `address`：要写入的地址，从 0 开始。
- `value`：要写入的值。

#### 示例

```cpp
#include <EEPROM.h>

void setup()
{
  for (int i = 0; i < 255; i++)
    EEPROM.write(i, i);
}

void loop()
{
}
```

### update()

将一个字节写入 EEPROM，但仅在值不同的情况下才写入。

```cpp
EEPROM.update(address, value)
```

- `address`：要写入的地址，从 0 开始。
- `value`：要写入的值。

#### 示例

```cpp
#include <EEPROM.h>

void setup()
{
  for (int i = 0; i < 255; i++) {
    // this performs as EEPROM.write(i, i)
    EEPROM.update(i, i);
  }
  for (int i = 0; i < 255; i++) {
    // write value "12" to cell 3 only the first time
    // will not write the cell the remaining 254 times
    EEPROM.update(3, 12);
  }
}

void loop()
{
}
```

### get()

从 EEPROM 读取一个值。

```cpp
EEPROM.get(address, value)
```

- `address`：要读取的地址，从 0 开始。
- `value`要读取的数据，可以是原始类型（例如 float）或自定义结构。
- 返回值：对传入数据的引用

#### 示例

```cpp
#include <EEPROM.h>

struct MyObject{
  float field1;
  byte field2;
  char name[10];
};

void setup(){

  float f = 0.00f;   //Variable to store data read from EEPROM.
  int eeAddress = 0; //EEPROM address to start reading from

  Serial.begin( 9600 );
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  Serial.print( "Read float from EEPROM: " );

  //Get the float data from the EEPROM at position 'eeAddress'
  EEPROM.get( eeAddress, f );
  Serial.println( f, 3 );  //This may print 'ovf, nan' if the data inside the EEPROM is not a valid float.

  // get() can be used with custom structures too.
  eeAddress = sizeof(float); //Move address to the next byte after float 'f'.
  MyObject customVar; //Variable to store custom object read from EEPROM.
  EEPROM.get( eeAddress, customVar );

  Serial.println( "Read custom object from EEPROM: " );
  Serial.println( customVar.field1 );
  Serial.println( customVar.field2 );
  Serial.println( customVar.name );
}

void loop(){ /* Empty loop */ }
```

### put()

将一个值写入 EEPROM。

```cpp
EEPROM.put(address, value)
```

- `address`：要写入的地址，从 0 开始。
- `value`要写入的数据，可以是原始类型（例如 float）或自定义结构。
- 返回值：对传入数据的引用

::: note
注意：此函数使用 EEPROM.update() 执行写入，因此如果值没有更改，则不会重写该值。
:::

#### 示例

```cpp
#include <EEPROM.h>

struct MyObject {
  float field1;
  byte field2;
  char name[10];
};

void setup() {

  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  float f = 123.456f;  //Variable to store in EEPROM.
  int eeAddress = 0;   //Location we want the data to be put.

  //One simple call, with the address first and the object second.
  EEPROM.put(eeAddress, f);

  Serial.println("Written float data type!");

  /** Put is designed for use with custom structures also. **/

  //Data to store.
  MyObject customVar = {
    3.14f,
    65,
    "Working!"
  };

  eeAddress += sizeof(float); //Move address to the next byte after float 'f'.

  EEPROM.put(eeAddress, customVar);
  Serial.print("Written custom data type! \n\nView the example sketch eeprom_get to see how you can retrieve the values!");
}

void loop() {   /* Empty loop */ }
```

### EEPROM[]

EEPROM[] 是一个重载了`EEPROM`类的`operator[]`运算符，可以像数组一样使用。

该运算符允许像数组一样使用标识符。使用这种方法可以直接读写 EEPROM 单元。

```cpp
EEPROM[address]
```

- `address`：要读取的地址，从 0 开始。
- 返回值：EEPROM 自身的引用

#### 示例

```cpp
#include <EEPROM.h>

void setup(){

  unsigned char val;

  //Read first EEPROM cell.
  val = EEPROM[ 0 ];

  //Write first EEPROM cell.
  EEPROM[ 0 ] = val;

  //Compare contents
  if( val == EEPROM[ 0 ] ){
    //Do something...
  }
}

void loop(){ /* Empty loop */ }
```

### length()

该函数返回一个无符号整数，其中包含 EEPROM 中的单元数。

```cpp
EEPROM.length()
```

- 返回值：EEPROM 中的单元数。类型为`unsigned int`。
