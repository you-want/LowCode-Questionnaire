---
theme: fancy
---

https://juejin.cn/post/7078860542026186765

## 我了解的低代码

低代码是无需编码（0代码）或通过少量代码就可以快速生成应用程序的开发平台。

通过可视化进行应用程序开发的方法，具有不同经验水平的开发人员可以通过**图形化的用户界面**，使用**拖拽组件和模型驱动的逻辑**来创建网页和移动应用程序。

那低代码所产生的好处就不言而喻了，谁用谁知道 😄

## 我的低代码心路历程

- 2017年-萌芽期，参与开发过一套政务系统，通过运营人员配置JSON数据生成政务办公系统，一套代码支持几十个不同部门的系统生成。（第一次被触动，真心觉得很神奇，内心产生低代码的萌芽...）
- 2019年-实践期，做了一个简易的活动配置项目，通过填写表单生成JSON数据，渲染生成常用的几种活动模版，简易的常规活动，市场人员自己可以配置。（开始切身去实践一些简易的场景...）
- 2020年-进阶期，在一个开源项目的基础上，二次开发出一套适合公司运营场景的活动可视化H5编辑器，可以拖拉拽配置活动页面。（此次实践，算是一次真正的低代码场景了，不仅有数据模型，还有了可视化拖拉拽...）
- 2019年～至今，自己很多参与的项目都是在写模版，使用配置JSON数据生成组件或页面。（真心觉得提效了，事情简单化了，在我的理解中，所有的页面或组件，其实都是数据模型...）
- 2022年初，开发了一套问卷平台，可以通过可视化编辑，拖拉拽生成问卷表单，快速配置出问卷页面，供采集问卷信息。（从0开始的一次真正的低代码实践，也是本文想重点说的一些内容...）

## 低码平台核心能力

低代码的平台具备的核心能力要素，我认为有四点：

- 数据模型驱动（最核心）
- 可视化开发（最核心）
- 扩展性
- 工程化

下面针对以上四点逐一分析：

### 数据模型驱动

低代码平台，能够可以通过页面上的操作进行定义组装一个数据模型，可以灵活的定义模型中的字段属性、也可以自由的组装模型，也可以进行相关数据模型的关联等。

1. 模型定义

进行数据模型的设计，保证语义化、简易化，有模型唯一标识、公共属性、私有属性、拓展属性等。

2. 模型关联

建立数据模型与数据模型之间的关系，具体表现为1对n，n对n，n对1、1对1等关联关系。

3. 数据操作

基于数据模型提供一个 CRUD 的操作，让应用能够操作该数据模型。

### 可视化开发

业务人员可以基于可视化的页面或工具能够进行简单拖拉拽、可以形成一个想要的页面。该页面可以自动部署在线上，供相关人员操作使用。

### 扩展性

是指低代码平台是否可以提供一些机制来进行扩展。（前期可以不具备，满足当前需求就行，但是在初期尽量考虑该因素，为后续提供该能力。避免后期实现要大动干戈。）

具体的扩展方式有以下三点：

1. 数据模型扩展

可以增加一些新的组件，现有数据模型可支持扩展，不影响之前的，还能满足后续的。

2. 逻辑扩展

低代码平台能否通过定义一些流程图也进行业务逻辑的扩展，来执行业务if、else的流程来做业务上的一些调用。   

3. 使用场景扩展     

低代码平台是否可以接入新的场景，在开发时期，多发散性思考，尽量多给自己留后路，可以接纳新成员、新事物。

### 工程化

低代码平台是否可以进行本地开发调试、版本控制、自动构建发布上线、免运维、监控以及数据统计的一些能力。简单来说是否在该平台上一站式配套的能力。（前期不是重点，是后期重点内容。这些东西慢慢给平台赋能，让平台具有更全面服务用户的能力）

1. 预知能力

低代码平台要能够进行本地的“开发调试”，其实就是预览，操作，查看效果等，让产物提前能够把控住。以及一些适配能力，PC、H5等。

2. 版本管理

低代码平台可以进行版本回退/恢复等操作，以及复制，开启/关闭，查看历史等能力，不会影响到发布态的产物。

3. 自动化

低代码平台可以自动构建发布上线、免运维、配套监控以及数据统计的一站式能力。

## 重点来了，我这次做了什么？

**需求：** 我们要做一个低代码的问卷平台，其背景：

1. 外部平台：暴露用户信息。
2. 内部文档表单：操作复杂，无复制等功能，无法嵌入网页中。
3. 团队低代码方向的探索。

**调研：** JSON Schema + 表单数据校验 + 市场上优秀的低代码平台 + 关于拖拉拽 + 画布（具体内容也挺多的，就不在这占篇幅了，后续有机会再输出）

**JSON Schema**

JSON (JavaScript Object Notation) 缩写，JSON 是一种数据格式，具有简洁、可读性高、支持广泛的特点 JSON。通过 JSON 我们可以灵活地来表示任意复杂的数据结构。

JSON Schema 主要用于描述 JSON 数据。针对不同的应用场景，我们想约定 JSON 的数据所包含的字段、字段值得类型甚至依赖关系，那我们就需要有个规范来描述这些约束的关系。而这也是 JSON Schema 所存在的理由。

JSON Schema 本身是用 JSON 编写的, 换句话说他本身就是 JSON 文件！

JSON Schema 本质上就是结构化 json 定义

**表单数据校验**

validator工具库：

1. ajv（这个经典的开源工具，它是一个非常流行的 JSON Schema 验证工具，而且性能号称最佳，最快的 JSON Schema 验证器）
2. async-validator（异步校验，element、iView 使用的）
3. validator.js（字符串校验库）
4. joi（基于 JavaScript 对象的对象模式描述语言和验证器）
5. Superstruct（用简单和可组合的方式在 JavaScript 和 TypeScript 中校验数据）

**市场上部分优秀的低代码平台**

1. [h5-Dooring](https://github.com/MrXujiang/h5-Dooring) （React、Ant-design）
2. [百度-amis](https://gitee.com/baidu/amis) [文档](https://baidu.gitee.io/amis/zh-CN/docs/index) [例子](https://aisuda.github.io/amis-editor-demo/#/hello-world)（React）  
3. [vue-layout](https://github.com/jaweii/Vue-Layout) （Vue）
4. [阿里巴巴-formily](https://github.com/alibaba/formily) （React、Ant Design） 
5. 阿里巴巴-alist
6. [luban(鲁班 H5)](https://github.com/ly525/luban-h5) （Ant Design、Vue）
7. [Sparrow](https://github.com/sparrow-js/sparrow)（基于Vue、Element-ui）
8. [wti-form](https://github.com/qq20004604/wti-form)（低代码表单组件，基于 Element-ui 二次开发）
9. [JeecgBoot](https://github.com/jeecgboot/jeecg-boot)（Ant Design、Vue）
10. [diboot](https://gitee.com/dibo_software/diboot)（Ant Design、Vue）
11. [Variant Form](https://www.vform666.com/)（Vue Element） 
12. GrapesJS —— craft.js (GrapesJS 是一款国外的页面编辑器框架)

**关于拖拽**

1. [vuedraggable](https://github.com/SortableJS/Vue.Draggable)（它是基于Sortable.js实现的 Vue 拖拽插件）
2. [vue-draggable-resizable](https://github.com/mauricius/vue-draggable-resizable)（vue、控件可以自定义进行大小拖拽）
3. HTML5原生拖拽/拖放 Drag & Drop （也有很多低代码库是自己使用的HTML5的原生api）
4. [easy-drag](https://github.com/junqiuzhang/easy-drag)（原生js）
5. [carddragger](https://github.com/dwanda/dragComponent)（Vue）
6. [react-dragable](https://github.com/react-grid-layout/react-draggable) 和 [react-resiable](https://github.com/react-grid-layout/react-resizable) 两个库来实现拖拽和缩放  
7. [rc-drag](https://github.com/MrXujiang/rc-drag)（React）
8. [@shopify/draggable](https://github.com/Shopify/draggable) （原生js start多，用户多）
9. [react-dnd](https://react-dnd.github.io/react-dnd/)（React）

**画布模块**

一般画布的比例设置大多以 16:9 或者 4:3 两种比例居多。

**调研后获得的信息**

「所有」低代码平台必然只能采用「声明式」代码，这也是为什么所有低代码平台都会有内置的「DSL」。

[DSL](https://en.wikipedia.org/wiki/Domain-specific_language) 即「Domain Specific Language」，中文一般译为「领域特定语言」，一种为特定领域设计的，具有受限表达性的编程语言。

非常适合使用 DSL 的场景：

* 重复性工作多
* 沟通成本大，参加角色多
* 业务非常清楚细节

前面说到前端界面低代码是比较容易，但交互及逻辑处理却很难，目前常见有三种方案：

* 使用图形化编程 https://scratch.mit.edu/
* 固化交互行为
* 使用 JavaScript

除了弹框之外还有发起请求、打开链接、刷新其它组件等，使用固化交互行为有下面两个优点：

* 可以可视化编辑
* 整合度高，比如弹框里可以继续使用配置，通过嵌套实现复杂的交互逻辑

但这个方案最大的缺点是灵活性受限，只能使用组件内置的行为。

为什么大家几乎全都使用 JSON？我觉得有两方面原因：

* 低代码平台编辑器几乎都是基于 Web 实现，JavaScript 可以方便操作 JSON。
* JSON 可以支持双向编辑，它的读取和写入是一一对应的。

以下是几个比较典型的低代码可视化平台需求:

-     出码能力(即源码下载功能)
-     组件交互(即组件支持业务中常用的链接跳转，弹窗交互，自定义事件等)
-     数据源管理(即用户创建的不同页面拥有共享数据的能力，不同组件之间也有共享数据的能力)
-     组件商店(即用户可以自主生产组件，定义组件，接入组件数据的能力)
-     布局能力(即用户可以选择不同的布局方案来设计页面)
-     常用功能集成(页面截图，微信分享，debug能力)

**方案：** 制定自己实现方案（编辑器布局交互设计，数据模型设计等）

![sheji.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/699cfd5d82564405b4e681562ca1ba4f~tplv-k3u1fbpfcp-zoom-1.image)

1、左侧 物料区（一个组件选择区，提供使用者选择需要的组件）

组件库
  
-     先封装问卷常用的组件，Input、Select、Radio、Checkbox 等

模版库（前期可以先不考虑）

-     先定制常用问卷模版
-     ...其他组件库可以后续扩展
  
2、中间 编辑区（一个编辑画布，提供使用者拖拽排序页面预览、以及各种操作）

头部工具栏

-     撤销undo、恢复redo 功能。保存每一步操作，可用类数组结构或者 栈的数据结构
-     设备响应式 PC、Pad、H5。设置不同的宽度，加上设备外形背景图片
-     组件层次结构树（暂时可不做）遍历节点，用树形 Tree 组件实现
-     清空，清空画布，可重新开始
-     预览 获取配置的 JSON， 用 render 组件渲染出页面
-     导入JSON （暂时可不做）导入符合 数据格式的 JSON 数据。涉及代码编辑器，可采用 ACE 开源库
-     导出JSON（暂时可不做 获取配置的 JSON，涉及代码编辑器，可采用 ACE 开源库
-     导出代码（暂时可不做） 生成 html 文件 或者 .vue 文件，写好模版，采用字符串拼接的方式。最后加入配置数据， 涉及代码编辑器，可采用 ACE 开源库
-     生成SFC （暂时可不做）涉及代码编辑器，可采用 ACE 开源库

编辑面板（画布）

-     可以使用 Vue 的 `<component :is="componentId"></component>` 动态组件的方式，和 拖拽组件库实现。

3、右侧 配置区

-     单个组件的一些属性值的设置，可设置一些常用的可配置的属性，form表单 + 可以使用 vue 的 `<component :is="componentId"></component>` 动态组件的方式
-     表单设置，表单的属性设置，也是开放常用，经常变动的属性，技术同上。
-     关联设置
-     问卷设置

![问卷架构.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b67d42796eff4463b3d3bcc08c350bfb~tplv-k3u1fbpfcp-zoom-1.image)

用户在左侧组件区域选择组件添加到编辑区域，通过动态组件特性渲染出每个元素组件。基本思路以及项目规划已成，那就接下来开干，逢山开路，遇水架桥...

**技术选型：** Vue3 + Vite2 + TS + Antd + Nest

Vue3 + Vite2 + TS 目前在前端市场比较火，新技术。也学习了一段时间，刚好新项目，可以实践一下！

[Ant Design Vue](https://2x.antdv.com/index-cn) 因为组内现有大部分项目都是使用的该UI库，尽量保持统一，所以继续采用AntD。

Nest 属于前端 ts 大趋势下深度使用注解特性并提供各种增强开发体验的框架，它提供了一套完整的解决方案，包含了认证、数据库、路由、http 状态码、安全、配置、请求等开箱即用的技术。（非本文重点，暂不做详细介绍）

**编辑器的实现思路是：**

编辑器生成页面 JSON 数据，服务端负责存取 JSON 数据，渲染时从服务端取数据 JSON 交给前端模板处理。

整体代码结构：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4f65b28939e4cbf93af33f7788a7ecc~tplv-k3u1fbpfcp-zoom-1.image)

**前端需要做的事：**

1. 设计每个组件对应的数据模型
2. 编写左侧组件库的单个组件模版
3. 组件的拖拉拽处理
4. 画布区的渲染模版
5. 画布操作区的操作
6. 组件对应的属性设置配置
7. 关联信息设置配置
8. 问卷设置配置
9. 数据管理操作
10. 数据进行可视化分析

### 组件对应的数据模型

思路源于2020年之前的一个项目，感兴趣的可以去了解一下 [分享地址](https://github.com/RainyNight9/you-want)

```js
const inputJson = {
  tag: 'input', // 标签，用 tag 比 type 更语义化，同时空出 type 留有大用
  tagName: '单行输入框',
  key: '', // 前端自动生成, 提交表单的值对应的key，也是组件唯一性标识
  formItemProps: { // 支持 AntD Form 的 Form.Item 参数配置 https://2x.antdv.com/components/form-cn
    label: '单行输入框的label' // 标题（必须）
  },
  nodeProps: { // 支持 AntD Form 的 每个组件节点 参数配置。如：input https://2x.antdv.com/components/input-cn
    value: '' // 默认值
  },
  hidden: false // 组件的 true/false 隐藏
}
```

其他组件数据模型类似，不一一展示了。

这里有个关键点：**key 的生成（唯一性）**，习惯找后端要这个，这次和后端没关系了，要不到了！只能前端自己生成，😢

1. 按照 一个固定的 字符 + 下标index（或者 length+1）（在删除/移动位置的操作中就会出现不再唯一）
2. 按照当前时间戳作为key（唯一性保证了，但太长，以及显得不专业）
3. 随机数（全数字，且也显得稍微不专业）
4. 改进上述方案，规定下随机字符串

```js
export const getRandomCode = (length: number) => {
  const data = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let nums = ''
  for (let i = 0; i < length; i++) {
    const r = parseInt(Math.random() * 61 + '')
    nums += data[r]
  }
  return nums
}
```

### 单个组件模版开发

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec361390f80f401e9c14e4e251124bae~tplv-k3u1fbpfcp-zoom-1.image)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9060a1945b884dc8b445fd9b8d80bcad~tplv-k3u1fbpfcp-zoom-1.image)

input-widget.vue 内容如下：

```ts
<template>
  <FormItem
    :form-item-props="widget.formItemProps"
    :widget="widget"
    :purpose="purpose"
  >
    <a-input
      v-bind="widget.nodeProps"
      :allow-clear="true"
      placeholder="请输入"
      v-model:value="formData[widget.key]"
      @change="inputChange"
    />
  </FormItem>
</template>>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from 'vue'
import FormItem from './form-item.vue'
import Common from './common'

export default defineComponent({
  name: 'InputWidget',
  components: { FormItem },
  props: {
    widget: { type: Object, default: () => {} },
    purpose: { type: String, default: 'render' }
  },
  setup (props, context) {
    const instance = getCurrentInstance()
    const { valueChange, getFormData } = Common(instance, props)
    const inputChange = (e: any) => {
      valueChange(e.target.value)
    }
    const formData: { [key: string]: any } = computed(getFormData)
    return {
      formData,
      inputChange
    }
  }
})
</script >
```

主要基本就是定制化开发你的单个组件，以及考虑组件的拓展性。代码太多，就不一一展示，其他类似。

### 组件的拖拉拽

因为用的是 Vue3 框架，就采用了对应的比较成熟的 [vuedraggable](https://github.com/SortableJS/Vue.Draggable) 解决方案。

```html
<!-- 物料模板列表 -->
<draggable
    v-model="widgets"          // 拖拽列表数据源
    :options="{ 
      group:{ 
              name: 'dragGroup',   // 可拖拽列组，相同表名可相互推拽
              pull: 'clone'    // 拖拽模板物料，复制到目标列表
            }, 
            sort: false        // 是否可推拽排序
    }"  
    :clone="handleClone"       // 复制模板物料执行方法 
    animation="300"            // 动画延迟
    >
    <div
      v-for="(item, index) in widgets"
      :key="index"
      class="control-widgets-item"
    >
      <span>{{ item.tagName }}</span>
    </div>
</draggable>
```

### 画布区的渲染模版

此处就需要一个 Render 方案，把拖拉拽选取的组件的对应数据模型 组装成一个大的 JSON，再把 JSON 通过编写好的模版渲染成需要的页面。组件这块用 Vue 的[动态组件](https://v3.cn.vuejs.org/guide/component-dynamic-async.html#%E5%9C%A8%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-keep-alive) `<component :is="componentId"></component>` 实现。

```html
<!--画布区面板-->
<draggable
    :list="getWidgetList"
    item-key="key"
    v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
    tag="transition-group"
    :component-data="{ name: 'fade' }"
    handle=".drag-handler"
    @end="onDragEnd"
    @add="onDragAdd"
    @update="onDragUpdate"
    :move="checkMove"
  >
    <template #item="{ element: widget, index }">
      <component
        :is="getWidgetName(widget)"
        purpose="drag"
        :widget="widget"
        :key="widget.key"
        :parent-list="getWidgetList"
        :index-of-parent-list="index"
      />
    </template>
  </draggable>
```

### 组件对应的属性设置配置

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de409557639044e19471f3b92e9bc3a1~tplv-k3u1fbpfcp-zoom-1.image)

也是通过配置对应的 JSON 数据，直接用 form-render 组件去渲染。

### 关联信息设置配置

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5ab1ffb44674d44939d5a9c7f9bddc3~tplv-k3u1fbpfcp-zoom-1.image)

做一个关联配置的表单，可以配置关联之后的某一项的显示/隐藏，或者跳转。

### 问卷设置配置

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c10f678d8d542febecec6c77f0e8488~tplv-k3u1fbpfcp-watermark.image?)

也是通过配置对应的 JSON 数据，直接用 form-render 组件去渲染。

### 数据管理操作

我考虑的可以有两种方式：

1. 自己维护类 class，用来增删改查数据。
2. 直接使用Vue状态管理工具 [Vuex](https://vuex.vuejs.org/zh/)

第一种需要我自己实现那个类，哎，有限的时间似乎差点意思。第二种直接使用就好了，开箱即用！State、Getter、Mutation、Action、Module...

### 数据进行可视化分析

目前版本仅做了数据量统计以及数据统计结果下载，后期会完善其功能。

## 最终编辑器的效果

编辑器面板：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c897a97e5af341538213ac74ad0aa495~tplv-k3u1fbpfcp-zoom-1.image)

预览面板：


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c98b53439f58449d9b772feef5e9d1ec~tplv-k3u1fbpfcp-watermark.image?)

H5面板：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/686b91290e6d4a0983edd59728b9a9a2~tplv-k3u1fbpfcp-zoom-1.image)

最后用户访问到的：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9901a7116bd4158914fde404dd12a84~tplv-k3u1fbpfcp-zoom-1.image)

## 总结

本次只是对低代码的一次初步尝试，技术扩展，后续争取做更多的有意义的实践。

低代码现在也是一种潮流，至于为什么？个人认为它应该算是程序界一次“工业革命”吧。打个比方：织布机器让普通工人也能生产出高质量的布匹，同时产量、效率等方面都有质的飞越。那低代码平台就是我们研发的那台“织布机”。说多也就那么回事，自己体会吧！

