# Vue3 模板文档

## 1. 说明

模板是使用[vue3](https://v3.cn.vuejs.org/) + [vite](https://cn.vitejs.dev/) + [ts](https://www.tslang.cn/docs/home.html) + [ant-design-vue 2.0](https://2x.antdv.com/docs/vue/introduce-cn/)搭建的一套pc端模板，包含了通用的一些基础设施，比如：eslint、commitlint、ant-design集成、axios请求工具封装、vue-router、vuex、布局组件、表格组件、公共类型等。文档将对关键部分进行说明。

## 2. 结构

- .env

.env文件夹是环境变量文件存放的地方，默认包含了公共环境变量（.env）、开发环境变量（.env.development）、生产环境变量（`.env.production`）。开发过程中也可以添加自己的环境变量，这需要在 `npm script` 中添加`--mode env`名称参数，同时在.env下添加.env.env名称文件

vite环境变量需要遵守[文档](https://cn.vitejs.dev/guide/env-and-mode.html)约定添加，变量名称必需以VITE_APP_开头，代码中以 `import.meta.env.xxx`读取，如果想获得代码提示，则需要在src/vite-env.d.ts中添加对应的类型声明

- .husky

模板使用[husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged) + [commitlint](https://commitlint.js.org/#/)进行代码提交校验。.husky文件夹下的文件是husky创建的对应的git钩子，可以参照husky文档添加需要的钩子

- .eslintrc.js

eslint的配置文件，可以自行添加需要的配置

- lintstagedrc.json

lintstaged配置文件，可以添加需要的配置

- commitlint.config.js

commitlint配置文件

- src/api

接口请求相关代码，可以参照demo.ts文件添加接口请求函数，接口函数可以单独引入到组件中，也可以统一由index.ts导出

- src/assets

资源文件夹

- src/components

通用组件文件夹

- src/composables

组合函数文件夹，保存通用的组合函数

- src/constants

常量文件夹，全局通用的常量

- src/layouts

布局组件，布局配置文件夹，这里包含了所有布局相关的东西，目前有带菜单的布局组件、空白布局组件、面包屑、全局页脚、左侧布局组件、logo组件、菜单组件、导航组件、顶部菜单组件、用户信息组件等

- src/plugins

全局插件文件夹，这里可以存放全局通用的一些插件，目前有对ant-design的按需引用插件

- src/router

路由文件夹，这里包含了路由的实例化代码和路由表配置代码，所有路由相关的配置应该存放在这里

- src/store

vuex文件夹，这里包含了vuex相关的所有代码，其中helpers文件夹是对store引用的一些帮助函数，可以减少组件中代码的复杂度

- src/styles

样式文件夹，这里存放全局样式文件

- src/types

ts类型文件夹，这里是全局通用的类型文件比如api、antd相关的类型定义

- src/utls

全局工具函数，一些通用的工具函数存放在这里，现在有axios、storage相关的封装

- src/views

页面组件文件夹，所有页面组件、页面子组件、页面组件资源存放在这里

- src/env.d.ts

环境变量类型文件，所有环境变量的添加需要在这里定义对应的类型

- src/shims-vue.d.ts

vue相关的api类型定义

- src/vite-env.d.ts

vite中，import.meta.env的定义

## 3. 组件

### 3.1 MenuLayout

带菜单的布局组件，可以包含左侧菜单、顶部菜单、底部页脚，需要导航和菜单的页面在路由配置中可以配置这个组件。组件所有配置都在`src/layouts/layout.config.ts`文件中

| 属性           | 说明                                     | 类型      | 默认值    | 是否必须 |
| ------------ | -------------------------------------- | ------- | ------ |:----:|
| menuType     | 菜单类型，可选值: 'left' \| 'top' \| 'topLeft' | string  | 'left' | √    |
| logo         | 是否在左侧菜单顶部显示logo, 可选值：true \| false     | boolean | true   | √    |
| breadcrumb   | 是否显示面包屑, 可选值：true \| false             | boolean | true   | √    |
| theme        | 顶部及左侧菜单主题，可选值：'dark' \| 'light'        | string  | 'dark' | √    |
| footer.show  | 是否显示底部页脚，可选值: true \| false            | boolean | true   | √    |
| footer.text1 | 页脚文案第一行                                | string  | -      | √    |
| footer.text2 | 页脚文案第二行                                | string  | -      | √    |

### 3.2 BasicLayout

空白的路由组件，不需要菜单和导航的可以用这个组件

### 3.3 Menu

菜单组件

**组件属性**

| 属性           | 说明                                              | 类型       | 默认值      | 是否必须 |
| ------------ | ----------------------------------------------- | -------- | -------- |:----:|
| data         | 菜单数据，树状，结构见下表                                   | object[] | -        | √    |
| theme        | 主题，可选值：'dark' \| 'light'                        | string   | 'dark'   | √    |
| collapsed    | 是否折叠                                            | boolean  | false    | √    |
| mode         | 菜单样式，可选值："horizontal" \| "vertical" \| "inline" | string   | 'inline' | √    |
| selectedKeys | 选中的菜单key                                        | string[] | -        | ×    |
| itemClick    | 点击回调                                            | function | -        | ×    |



**data结构**

| 属性         | 说明       | 类型              | 是否必须 |
| ---------- | -------- | --------------- |:----:|
| path       | 菜单路由     | string          | √    |
| name       | 菜单路由名称   | string          | √    |
| meta.title | 菜单文案     | string          | √    |
| meta.icon  | 菜单前面的小图标 | ant-design icon | ×    |
| children   | 子菜单      | object[]        | ×    |

### 3.4 AppProvider

布局配置组件，将布局配置注入到子组件中

| 属性     | 说明                              | 类型     | 是否必须 |
| ------ | ------------------------------- | ------ |:----:|
| config | 配置json，默认获取layout.confg.ts里面的配置 | object | ×    |

### 3.5 AppTable

表格组件，基于ant-design表格封装，支持通过配置生成筛选条件、表格、分页等。

**属性**

组件属性可以完全跟ant-design-vue组件库中的表格属性保持一致，传给AppTable的属性，将会透传给表格组件。以下属性是必须或者特定属性。

| 属性           | 说明                                                                         | 类型                        | 默认值                                                                                        | 是否必须 |
| ------------ | -------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------ |:----:|
| columns      | 表格列json，属性同antd 表格的[columns](https://2x.antdv.com/components/table-cn#API) | object[]                  | -                                                                                          | √    |
| dataSource   | 表格数据，同antd表格dataSource                                                     | object[]                  | -                                                                                          | √    |
| rowKey       | 行key，同antd 的rowKey                                                         | string                    | 'id'                                                                                       | √    |
| actions      | 操作按钮，详见下表                                                                  | ITableAction[] \| boolean | [<br/>    { title: '编辑', event: 'edit' },<br/>    { title: '删除', event: 'delete' }<br/>  ] | ×    |
| querys       | 表格筛选条件，详见下表                                                                | ITableQuerys[] \| boolean | false                                                                                      | ×    |
| fetchHandler | 数据请求函数                                                                     | async Function            | -                                                                                          | ×    |

**actions属性**

| 属性    | 说明                                                    | 类型                 | 是否必须 |
| ----- | ----------------------------------------------------- | ------------------ |:----:|
| title | 按钮文字                                                  | string             | √    |
| event | 按钮点击事件, 值是函数时，将直接调用函数，值是字符串时，将抛出以该值为名称的事件             | Function \| string | ×    |
| icon  | 按钮，传入ant-design按钮组件, 传入该值时，按钮将以图标形式展现，文字将以tooltip方式显示 | Component          | ×    |

**querys属性**

| 属性            | 说明                                                                              | 类型                                 | 是否必须 |
| ------------- | ------------------------------------------------------------------------------- | ---------------------------------- |:----:|
| type          | 类型，可选值："select" \| "input" \| "radio" \| "date" \| "dateRange" \| "inputSearch" | string                             | √    |
| name          | 键名                                                                              | string                             | √    |
| label         | 标签文案                                                                            | string                             | ×    |
| rules         | 校验规则，同async validator                                                           | ValidationRule \| ValidationRule[] | ×    |
| placeholder   | 占位符                                                                             | string                             | ×    |
| value         | 默认值                                                                             | any                                | ×    |
| options       | 下拉框选项，当type为select的时候必填                                                         | array                              | ×    |
| options.key   | 下拉框键                                                                            | string\|number                     | √    |
| options.label | 下拉框标签文案                                                                         | label                              | √    |