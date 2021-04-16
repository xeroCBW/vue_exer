# vue_shop

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## npm 设置


```


npm config set registry http://registry.npm.taobao.org/

npm config get registry

# 安装 cnpm

npm install -g cnpm --registry=https://registry.npm.taobao.org

```


## 创建项目

```

npm install -g @vue/cli

vue init webpack xxx

npm install

npm run dev


```


## 一. 使用ElementUI


1. 安装 element-UI

```shell
npm install element-ui
```

2. 在main.js文件中导入

```shell

# 不导入css 文件会报错

import '../src/assets/css/global.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)


# 设置长宽 100%
html,body,#app{

  height: 100%;
  margin: 0%;
  padding: 0%;


}

```

3. 导入axios实现请求

```shell
# 设置baseURL

import axios from 'axios'

axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
Vue.prototype.$http = axios

```


### 二. elemet-UI 具体操作

#### 2.1 message 
用来提示消息的

```javascript
return this.$message.error("登录失败 " + res.meta.msg)
return this.$message.success("登录失败 " + res.meta.msg)
```


#### 2.2 路由导航守卫


```javascript

router.beforeEach()

```


#### 2.3 使用el-container进行布局

1. 第一个container,增加类类型home-container,全部写满

```css
.home-container{
    width: 100%;
    height: 100%;
  }

```


2. el-xxx都是类名
3. 优化header

```javascript

```

4. 设置intercepter

```javascript

axios.interceptors.request.use(config=>{

  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')

   return config
})

```

5. 获取左侧菜单的数据


```

在 created期间请求数据,来获取左侧的菜单
设置index bind 每次只会打开一个

el-menu 设置 unique-opened 每次打开会关闭其他的


```

6. 设置侧边栏折叠

```shell

关闭transition
动态设置width



```


7. 设置子路由

```shell
{
      path:'/home',
      component: Home,
      # 设置重定向到/welcome
      redirect:'/welcome',
      children:[
        {
          path:'/welcome',
          component:Welcome
        }

      ]
}

在main 设置 router-view

    
```


8. 将左侧菜单改成路由连接


````shell

el-menu 开启router 模式
将submenu 改成 sub_item.path

````

9. 实现用户管理界面

```

设置高亮激活 default-active

点击时候设置 activePath ,给当前activePath赋值
将点击的地址 放在session storage中,
刷新页面的时候,从 session storage中取出来


```
  

10. 使用面包屑


11. 使用card来绘制main的主要内容

```shell

使用山哥系统
:span="6"

:gutter 表示两者之间的间隔


```

12. 使用table 来渲染用户列表

```html


index 可以显示前面的序列号



//prop="mg_state" 这个就可以删除,
//这个到现在就没有太多作用了 
//v-model 里面已经进行了数据的绑定

<el-table-column label="状态">
  <template slot-scope="scope">
    <!--这里是使用作用域插槽-->
    <el-switch
      v-model="scope.row.mg_state">
    </el-switch>
  </template>
</el-table-column>



使用switch作为开关


```
13. 自定义操作

```shell
设置 template 

设置button

设置 宽度,宽度不够

设置 tooltip 让放在上面显示提示,设置:enterable="false",bool 需要动态绑定


```



14. 分页显示

```pagenation

设置方法和绑定数据

设置 pagesize current_num 之后要重新请求数据

```

15. 设置用户状态

```

监听swicth 开关的改变

@change="userStateChange"

userStateChange(){

}

//进行字符串的替换

var a = "cbw"
var b = `this is ${a}`
这样就直接进行字符串替换了

```
16. 实现用户搜索

```javascript

实现双向绑定queryInfo.query
在搜索按钮部分填写 getUserList
清空样式 clearable ,同时@clear ="getUserList" 绑定事件

```

17. 添加对话框

```
添加 el-dialog 

然后绑定属性 addUserDialogVisible

在click 事件处 ,直接赋值 addUserDialogVisible=false,
或者定义方法,实现 this.addUserDialogVisible = false赋值的问题

```


18. 设置对话框的内容

```shell

设置form 表单,去el-form中找
设置 rules
设置 refs

```

19. 自定义验证规则

```shell

在data中填写 checkEmail checkMobile等相关数据

```


20. 添加关闭对话框的操作

```shell

使用引用,让其重置
this.$refs.addFormRef.resetFields()

```

21. 修改用户的信息

```
将scope.row.id 数据传给 editDialog()
根据id 请求用户信息
禁用用户名这这一项 disable,让其不能编辑
其他的和 增加 类似

```

22. 确认弹框

```shell
使用messagebox 来尝试

一般带有$ 都是全局组件
  


```


23. 设置不同颜色的标签

```
使用 v-if v-else-if v-else

<el-tag v-if="scope.row.level === '0'">一级</el-tag>
<el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
<el-tag type="warning" v-else>三级</el-tag>
```

24. 设置每列展开

```

<el-table-column type="expand"></el-table-column>
```



25. 实现多级权限

```

总共有25 个格栅, 一级占用5个,二三级占用19 个
二三层再进行划分:分成 6 18 = 1:3 比例划分掉


```

26. 设置最小宽度

```

min-width: 1366px;

```

27. 设置居中对齐

```css

.vcenter{
  display: flex;
  align-items: center;

}
```


28. 设置权限删除

```
el-tag 可以设置 closable
close 是点击事件


$confirm


使用messagebox 的confirm 来确定删除


```


29. 展示分配权限

```shell

使用树形展示
复选框 ,唯一id

<el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id"></el-tree>

使用递归,获取选中的权限,然后放到一个数组中去

监听对话框的关闭事件,每次关闭就清空对会话框


getCheckedKeys

getHalfCkeckedKeys

```

30.点击为角色分配权限

```

为树形控件加一个引用,treeRef

在data 中定义一个role_id ,用于临时存储

```

31. 渲染分类

```

tree-table 进行渲染
每一行定义一个 template
每一个template 使用数据时候,用的是scope.row

```


32. 设置级联选择

```

需要设置一系列的东西,来定义

设置一大堆参数

```

33. 设置计算属性


```

computed(){
 
}
其他地方可以直接访问该属性

get 请求要加params post 不需要

```


34. 动态添加标签


```
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>


在 每个item 中动态添加 item.inputVisiable = false tem.inputValue = false 


tag 的删除和增加 都是在 更新数组元素个数


```

35. 创建过滤器,设置时间格式

```

Vue.filter('dateFormat',function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  //月份是从0 开始计算的
  const m = (dt.getMonth() + 1 +'').padStart(2,'0') // 不足的地方以0 来进行填充
  const d = (dt.getDate() + '').padStart(2,'0') // 不足的地方以0 来进行填充

  const hh = (dt.getHours() + '').padStart(2,'0')
  const mm = (dt.getMinutes() + '').padStart(2,'0')
  const ss = (dt.seconds() + '').padStart(2,'0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

})

```





36. 设置进度条居中

```
align-cente


```

37. 设置 tabs


```
设置左边显示文本

:tab-position="'left'"


```


38. 阻止切换

```

beforeTabLeave

看 index  0 1 


tab-click
被选中


```


39. 图片上传

```

注意设置 上传的请求头
上传组件没有使用axios

```


40. 文本编辑器

```


//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//使用VueQuillEditor
Vue.use(VueQuillEditor)

<!--富文本编辑器-->
<quill-editor v-model="addGoodsForm.goods_introduce">
</quill-editor>

本质是一个str


<p>xxx</p>


```



49. 使用深拷贝,导入lodash包

```
import _ from 'lodash'



双向绑定的数据,不要随意改变其性质,例如array 变成 str ,这样类型不匹配容易报错

```


50. 省市级联选择

```

注意级联选择使用 cascader 时候 v-model 不要使用 :model 这个是绑定

导入 2016 的省市数据

```


51. message 和 confrim 都默认使用 vue自带的了

```

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.firm

```


52. 使用 timeline

```
time-line 默认是2.6 版本以后才出来的

```


53. echarts 使用

```

在 mounted dom 确定下来后,才渲染

将 两个对象进行合并

lodash.merge
```

54. 动态设置图标

```
[
1:'xxx'
2:'yyy'
]

iconObj[i]
```


55. computed 计算属性 相对来说性能更高

```

method 方法会计算多次
computed 只有更新后才会调用

```

56. 清空控制台

```

console.clear()


```



56. 安装less

```

npm install less@3.9.0 --save-dev

npm install less-loader@4.1.0 --save-dev
```



### 项目的上线和优化

1. 生成打包报告

```
npm install babel-plugin-transform-remove-console --save-dev

//移除 console
"plugins": ["transform-vue-jsx", "transform-runtime","transform-remove-console"]

npm run build 打包



vue-cli-service build --report


```


2. 第三方库使用CDN

3. Elemnt-UI 按需加载

4. 懒路由加载

5. 首页内容定制



### 上线


```



```

