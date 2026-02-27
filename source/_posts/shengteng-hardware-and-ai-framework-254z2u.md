---
title: 昇腾硬件与AI框架
date: '2024-08-06 11:44:27'
updated: '2024-08-12 17:21:45'
permalink: /post/shengteng-hardware-and-ai-framework-254z2u.html
comments: true
toc: true
---

# 昇腾硬件与AI框架

## 昇腾 AI 处理器

### AI 算力基础

1. 量级单位

​![量级单位](https://raw.githubusercontent.com/maniacta/picgo/main/data/image-20240806114919-9onew6t.png)​

2. 数据类型

* INT8：适用于深度学习模型的**推理运算**
* FP16：适用于深度学习模型的**训练运算**
* FP32：主要用于**高性能运算**（比如科学计算）

### 通用计算&AI 计算

* **通用计算**以 CPU 提供算力，适合**复杂逻辑计算**，如大多数通用软件，70% 以上晶体管用于**构建 Cache 和控制单元**，计算核心从几个到几十个。**适用于通用应用**：办公、数据库、数值计算（气象预测、流体仿真、电磁仿真）等。
* **AI 计算**以 GPU（NVIDIA）或 NPU（Ascend）提供算力，适合**逻辑简单，计算密集型高并发任务**，70% 以上晶体管用于**构建计算单元**，计算核心几千或上万个。**适用于特定应用**：图像识别（人脸识别、车牌识别、动作识别、物品检测、周界检测等），自然语言处理（机器翻译、语音识别、文本生成、情感分析等），搜索推荐，辅助驾驶，趋势检测等。

### 达芬奇架构

昇腾 910 单 Core 单时钟周期最大可完成 4096 次运算（$Cube=16*16*N， N=1/2/4/8/16$）

### 昇腾 910 芯片内部构成

* 通用 AI CPU
* DVPP 图像增强
* Ascend910 支持 DSA 随机数生成
* AI CORE（算力最核心部件，有多个核心）
* 内存层次

  1. Global Mem（GM）
  2. L2 Cache
  3. Local buffer（AI CORE 内部）
  4. AI CPU 等其他计算单元

### NPU 并行计算架构抽象

* AI Core 内**异步计算**过程（指令流）

  1. 标量计算单元**读取指令序列**
  2. 标量计算单元**发射指令到对应单元**
  3. 各处理单元**并行执行指令**​
* AI Core **内存搬运**过程（数据流）

  1. DMA 数据**搬入 LocalMem**
  2. 计算单元 **LocalMem 内数据完成计算，写回 LocalMem**
  3. DMA 数据**搬出到 GlobalMem**
* AI Core 内核心组件

  1. **标量计算单元：** 负责计算流程控制和地址计算
  2. **向量计算单元：** 负责向量 Tensor 数据计算
  3. **矩阵计算单元：** 负责矩阵 Cube 数据计算
  4. **DMA 搬运单元：** 负责在 LocalMem 和 GlobalMem 之间搬运数据（搬入&搬出）

‍

## CANN 框架

昇腾 CANN 全面支持业内 AI 框架（PyTorch，昇思，TensorFlow，飞桨，Caffe，Jittor 计图等），支持 GPU 生态（模型/加速库）的 API 级迁移。

Ascend C 昇腾算子编程语言支持原生开发，遵循 C/C++ 标准规范，结构化核函数编程，自动化流水线并行调度。

### 三大开发模式

* **算子开发**：开发、部署、调试，全流程工程化。
* **模型开发**：内置高性能模型，开源框架一键式迁移，通过算子原型构图。
* **应用开发**：推理应用开发，第三方框架调用，第三方 Lib 库开发

### 提升全栈辅助工具链

* **推理服务全栈工具链**：模型压缩编译部署全栈优化。
* **系统化分析工具链**：Profling&精度比对工具，快速识别瓶颈，自动优化建议。
* **AOE 智能调优工具**：计算工程自动寻优，零门槛高效率。

### AscendCL 昇腾计算语言开发接口

* **应用开发接口**：提供深度学习推理计算、图像图像预处理、单算子加速计算能力，实现对昇腾硬件计算的调用。

  |使用场景|<span data-type="text" style="color: var(--b3-font-color8);" id="">优势</span>|
  | -------------------| -----------------------------------------|
  |开发应用|高度抽象|
  |供第三方框架调用|向后兼容|
  |供第三方开发 lib 库|零感知芯片|
* **图开发**：提供<span data-type="text" id="" style="color: var(--b3-font-color8);">统一网络构图接口</span>，支持多框架，支持用户在昇腾芯片上快速部署神经网络业务。

  **支持的构图方式**：

  1. 通过算子原型构图
  2. 通过 Parser 解析为 IR 图
* **算子开发**：Ascend C 是 CANN 在算子开发场景的编程语言，原生支持 C&C++ 标准规范，<span data-type="text" id="" style="color: var(--b3-font-color8);">最大化匹配用户开发习惯</span>。

  **关键技术：**

  1. 结构化函数编程
  2. 自动化流水线并行调度
  3. CPU/NPU 孪生调试

### 昇腾计算服务层

* **昇腾算子库 AOL**：算子在硬件上的加速计算构成了加速神经网络的基础和核心！（NN 算子库、BLAS 算子库、DVPP 算子库、HCCL 算子库、AIPP 算子库）

  > NN（Neural Network）
  >
  > BLAS（Basic Linear Algebra Subprograms）
  >
  > DVPP（Digital Video Pre-Processor）
  >
  > AIPP（AI Pre-Processing）
  >
  > HCCL（Huawei Collective Communication Library）
  >

* **昇腾调优引擎 AOE**：AOE 用于在<span data-type="text" style="color: var(--b3-font-color8);" id="">推理、训练</span>等场景对<span data-type="text" style="color: var(--b3-font-color8);" id="">模型、算子、子图</span>等进行调优，充分利用硬件资源，不断提升网络的性能！

### 昇腾计算编译层

​![昇腾计算编译层](https://raw.githubusercontent.com/maniacta/picgo/main/data/image-20240806170811-zvf32zg.png)​

### 昇腾计算执行层

* **Graph Executor**：图加载，图执行。
* **AIPP**：改变图片尺寸，色域转换，归一化配置。
* **DVPP**：JPEG 编解码，PNG 解码，视频编解码，视觉预处理。
* **HCCL**：Rank 管理，梯度切分，集合通信。
* **Runtime**：会话管理，算子库管理，图状态管理，引擎管理。

### 昇腾计算基础层

* **RMS**：资源管理，负责管理与调度昇腾设备的计算、显存等关键资源。
* **CMS**：通信管理，负责提供片内、片间高效通信。
* **DMS**：设备管理，负责对昇腾设备进行配置、切分、升级、故障检测等管理。
* **DRV**：芯片 IP 驱动，负责使能硬件。
* **UTILITY**：公共服务，负责提供基础库和系统维测能力。

## Ascend C

### 算子

* 算子在**网络中定义**：算子对应网络中层或者节点的计算逻辑。
* 算子在**数学中的定义**：一个函数空间到函数空间上的映射 O：X→X。
* 广义地讲，对任何函数进行某一项操作都可以认为是一个算子。比如微分算子，不定积分算子等。
* 常见算子举例： tanh、ReLU、Conv2D 等。

### Ascend C

Ascend C 是 CANN 针对算子开发场景推出的编程语言，**原生支持 C 和 C++ 标准规范**，**最大化匹配用户开发习惯**；通过**多层接口抽象、自动并行计算、孪生调试**等关键技术，极大提高算子开发效率，助力 AI 开发者低成本完成算子开发和模型调优部署。

Ascend C 开发自定义算子的**优势**：

* C/C++ 原语编程，最大化匹配用户的开发习惯；
* 编程模型屏蔽硬件差异，编程范式提高开发效率；
* 多层级 API 封装，从简单到灵活，兼顾易用与高效；
* 孪生调试，CPU 侧模拟 NPU 侧的行为，可优先在 CPU 侧调试。

### 达芬奇算子编程的关键技术难点

* 复杂指令的语义：程序的语义如何影射到复杂的指令序列上完成？
* 核内层次化的显式 Buffer 如何分配，释放，复用？是该暴露给程序员，还是用工具来隐藏？
* 多个并行执行单元之间的流水和同步编排在单一个线程内实现。
* 并行计算算法：算子的并行切分（tiling）策略，包含多核并行切分和核内并行切分技术。

### Ascend C 编程语言设计的目标

1. 高性能：能够写出高性能算子；
2. 完备性：能够发挥芯片的能力；
3. 易于编程：易于学习理解，符合编程习惯，简化编程模型，在编程语言层面解决 3 个关键问题：地址管理，流水同步，复杂指令映射问题；
4. 易于调试；
5. 兼容性：跨代芯片的算子源码兼容，昇腾系列芯片升级时只需要对算子源码进行重新编译即可。

### Ascend C 总体思路，对 DaVinci 编程 3 个关键问题的解决方法

1. 封装：提供**多层次的稳定** API 封装。

   * 实现不同型号的核之间的代码兼容。
   * 低等级的 API 易于表达常用的语义。
   * 高等级的 API 可表达更复杂场景所需的功能。
2. 抽象：简化 Buffer 的使用。

   * 程序员依然管理了内存，但针对典型的流水方式的数据传递，设计 API 简化了难度。
3. 易于理解 TPIPE 流水编程范式解决流水并行问题，引入 Que 操作，Buffer 操作，解决流水同步问题。

### Ascend C 架构组成

​![Ascend C 架构组成](https://raw.githubusercontent.com/maniacta/picgo/main/data/image-20240807090637-c3t6fgq.png)​

## 算子开发

Ascend C 算子编程是 SPMD（Single-Program Multiple-Data）编程，SPMD 是一种常用的并行计算的方法，是提高计算速度的有效手段。

### SPMD 模型

具体到 Ascend C 编程模型中的应用，是将需要处理的数据被拆分并同时在多个计算核心上运行，从而获取更高的性能。多个 AI Core 共享相同的指令代码，每个核上的运行实例**唯一的区别是 block_idx 不同**，每个核通过不同的 block\_idx 来识别自己的身份。block 的概念类似于进程的概念，block\_idx 就是标识进程唯一性的进程 ID。并行计算过程的示意图如下图所示。

​![并行计算过程](https://raw.githubusercontent.com/maniacta/picgo/main/data/image-20240807092117-8gfxwez.png)​

下面的代码片段取自于 Ascend C Add 算子的实现代码，算子被调用时，所有的计算核心都执行相同的实现代码，入口函数的入参也是相同的。每个核上处理的数据地址需要在起始地址上增加 **GetBlockIdx()** \*BLOCK\_LENGTH（每个 block 处理的数据长度）的偏移来获取。这样也就实现了多核并行计算的数据切分。

```c++
class KernelAdd {
public:
    __aicore__ inline KernelAdd() {}
    __aicore__ inline void Init(GM_ADDR x, GM_ADDR y, GM_ADDR z)
    {
        // get start index for current core, core parallel
        xGm.SetGlobalBuffer((__gm__ half*)x + BLOCK_LENGTH * GetBlockIdx(), BLOCK_LENGTH);
        yGm.SetGlobalBuffer((__gm__ half*)y + BLOCK_LENGTH * GetBlockIdx(), BLOCK_LENGTH);
        zGm.SetGlobalBuffer((__gm__ half*)z + BLOCK_LENGTH * GetBlockIdx(), BLOCK_LENGTH);
        // pipe alloc memory to queue, the unit is Bytes
        pipe.InitBuffer(inQueueX, BUFFER_NUM, TILE_LENGTH * sizeof(half));
        pipe.InitBuffer(inQueueY, BUFFER_NUM, TILE_LENGTH * sizeof(half));
        pipe.InitBuffer(outQueueZ, BUFFER_NUM, TILE_LENGTH * sizeof(half));
    }
    ...
}


// 实现核函数
extern "C" __global__ __aicore__ void add_custom(GM_ADDR x, GM_ADDR y, GM_ADDR z)
{
    // 初始化算子类，算子类提供算子初始化和核心处理等方法
    KernelAdd op;
    // 初始化函数，获取该核函数需要处理的输入输出地址，同时完成必要的内存初始化工作
    op.Init(x, y, z);
    // 核心处理函数，完成算子的数据搬运与计算等核心逻辑
    op.Process();
}
```

### 并行计算架构抽象

Ascend C 基于硬件抽象架构进行编程， 进行屏蔽不同硬件之间的差异。

​![硬件架构抽象](https://raw.githubusercontent.com/maniacta/picgo/main/data/image-20240807151551-sjy2gwd.png "硬件架构抽象")​

AI Core 中包含**计算单元、存储单元、搬运单元**等核心组件。

#### 计算单元

* Scalar 计算单元任务是进行计算流程控制和地址计算。并把向量计算、矩阵计算、数据搬运、同步指令发射给对应单元执行。
* Vector 计算单元负责执行向量计算。
* Cube 计算单元负责执行矩阵计算。

#### 存储单元

* Local Memory：AI Core 的内部存储。

#### **搬运单元**

* DMA（Direct Memory Access）：负责在 Global Memory 和 Local Memory 之间搬运数据，包含搬运单元 MTE2（Memory Transfer Engine，数据搬入单元），MTE3（数据搬出单元）等。

#### **异步指令流**

* Scalar 计算单元读取指令序列，并把向量计算、矩阵计算、数据搬运指令发射给对应单元的指令队列；
* 向量计算单元、矩阵计算单元、数据搬运单元异步的并行执行接收到的指令。

#### **同步信号流**

* 不同的指令间有可能存在依赖关系，为了保证不同指令队列间的指令按照正确的逻辑关系执行，Scalar 计算单元也会给对应单元下发同步指令。

#### **计算数据流**

* DMA 搬入单元把数据搬运到 Local Memory；
* Vector/Cube 计算单元完成数据计算，并把计算结果写回 Local Memory；
* DMA 搬出单元把处理好的数据搬运回 Global Memory。

### TPIPE 并行计算编程范式

#### Ascend C 的并行编程范式核心要素

* 一组并行计算任务
* 通过队列实现任务之间的通信和同步
* 程序员自主表达对并行计算任务和资源的调度

#### 典型的计算范式

* 基本的 VEC 编程范式：计算任务分为 CopyIn， Compute，CopyOut
* 基本的 CUB 编程范式：计算任务分为 CopyIn，Split， Compute，Aggregate，CopyOut
* 复杂的 CUB/VEC 编程范式，通过将 CUB/VEC 的 Out/In 组合在一起的方式来实现复杂计算数据流

### Ascend C 算子编程 API

Ascend C 算子采用标准 C++ 语法和一组类库 API 进行编程

* Ascend C 类库基本 API

  1. 计算 API: 向量计算 API，矩阵计算 API
  2. 搬运 API：数据搬运 API
  3. 同步 API：队列操作 API，内存管理 API
* Ascend C 类库 API 是类 SIMD 方式，计算操作数都是 Tensor 类型：GlobalTensor 和 LocalTensor。

  * **整个 tensor 参与计算**：通过运算符重载的方式实现，支持 +, -, \*, /, |, &, \<, \>, \<\=, \>\=, \=\=, !\=，实现计算的简化表达。例如：

    ```Ascend_C
    dst=src1+src2
    ```
  * **tensor 前 n 个数据计算**：针对源操作数的连续 n 个数据进行计算并连续写入目的操作数，解决一维 tensor 的连续计算问题。例如：

    ```Ascend_C
    Add(dst, src1, src2, n);
    ```
  * **tensor 高维切分计算：**  功能灵活的计算 API，充分发挥硬件优势，支持对每个操作数的 DataBlock stride，Repeat stride，Mask 等参数的操作。
* ​![计算 API 几种计算方式的特点](https://raw.githubusercontent.com/maniacta/picgo/main/data/image-20240807164908-tsg23tn.png "计算API几种计算方式的特点")​

  #### 程序员对 Ascend C TPIPE 编程范式算子代码的理解
* 每个 Stage 的编程范式：

  * 每个 Stage 首先要获得 localMem 的内存，所以要先调用 Alloc()申请内存，或者从上游队列 Deque()一块内存数据；
  * 完成计算或者数据搬运；
  * 把第 2 步处理好数据调用 enque()入队；
  * 调用 Free()释放不再需要的内存。

## Ascend C 与 CUDA 算子编程对比

* CUDA 编程灵活性高，但 Ascend C 易用性更好

  * CUDA 核函数要对每个线程块进行管理，而 Ascend C 的核函数只对单个进程进行管理。
  * CUDA 的 shared memory 被一个线程块内多个线程共享，而 Ascend C 的 Local memory 被单个进程独占。

* Ascend C 采用 CUDA 类似的结构化核函数编程范式，降低用户学习成本
* 采用与 CUDA 相同功能模块的 Runtime 调度框架，降低用户迁移成本

  * **Runtime：** 为神经网络的任务分配提供了资源管理通道。Runtime 运行在应用程序的进程空间中，为应用程序提供了存储（Memory）管理、设备（Device）管理、执行流（Stream）管理、事件（Event）管理、核（Kernel）函数执行等功能。
  * **Task Schedule：** 运行在 Device 侧的任务调度 CPU 上，负责将 Runtime 分发 的具体任务进一步分发到 AICPU 上。它也可以通过硬件任务调度器（HWTS）把任务分配到 AI Core 上执行，并在执行完成后返回任务执行的结果给运行管理器。通常 Task Schedule 处理的主要事务有 AI Core 任务、AI CPU 任务、内存复制任务、事件记录任务、事件等待任务、清理维护（Maintenance）任务和性能分析（Profiling）任务。
* Ascend C 支持 CPU 和 NPU 孪生调试，比 CUDA 更高效

  * CUDA 官方只支持上板调试，问题定位难，性能优化难。
  * Ascend C 支持 CPU 和 NPU 孪生调试，通过 Ascend C 算子孪生调试技术，充分发挥 CPU 和 NPU 的调测优势，提升算子调试效率。

‍

## 缩略语

* **AIPP：AI Pre-Processing AI 预处理**
* **BLAS：Basic Linear Algebra Subprograms 基础线性代数程序集**
* **DVPP：Digital Video Pre-Processor 数字图像预处理**
* **HCCL：Huawei Collective Communication Library 华为集成通信算子库**
* **JIT：Just In Time 即时编译**
* **NN：Neural Network 神经网络**
* **SIMD：Single Instruction Multiple Data 单指令流多数据流**
* **SPMD：Single Program Multiple Data 单程序多数据**

‍

‍

‍
