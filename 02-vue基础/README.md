## vue
### 1. 使用vue的步骤
1. 导入引用
2. 在浏览器打开

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<div id="app">

    <div class="">
        {{message}}
    </div>
    <div class="">
        {{message}}
    </div>

</div>


<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'

    }
  })
</script>

</body>
</html>

```

### 2. 常用命令

#### 2.1 v-text
获取文本
#### 2.2 v-html
直接转义成html
#### 2.3 v-on
可以自定义一些动作
#### 2.4 v-show
控制显示隐藏，不会从dom移除
#### 2.5 v-if
进行判断,false从dom树移除
#### 2.6 v-blind

用来设置元素的属性,src title  class 等属性,
对数据进行单向的绑定

#### 2.7 v-for 
对数据进行遍历
#### 2.8 v-model 
对数据进行双向绑定

### axios 

注意数据要进行替换

```javascript
var that = this
```



### 组件

就是自己定义的组件

```html
    <cbw></cbw>

```


```javascript

var component = Vue.component("cbw",{

      template:'<li>hello world</li>'

      }
    )

```





