

# Vue基础

## el 与 data 的两种写法

### el有2种写法

1. 创建Vue实例对象的时候配置el属性
2. 先创建Vue实例，随后再通过`vm.$mount('#root')`指定el的值

### data有2种写法

1. 对象式：`data： { }`
2. 函数式：`data() { return { } }`

如何选择：**到组件时，组件的data必须使用函数，否则会报错**



### 一个重要的原则

**由Vue管理的函数，一定不要写箭头函数，否则 this 就不再是Vue实例了**



### 案例

~~~js
<script type="text/javascript">
    Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

    // el的两种写法
    // const v = new Vue({
    // 	//el:'#root', // 第一种写法
    // 	data: {
    // 		name:'xiaohuowa'
    // 	}
    // })
    // console.log(v)
    // v.$mount('#root') // 第二种写法

    // data的两种写法
    new Vue({
        el: '#root',
        // data的第一种写法：对象式
        // data:{
        // 	name:'xiaohuowa'
        // }

        //data的第二种写法：函数式
        data() {
            console.log('@@@', this) // 此处的this是Vue实例对象
            return {
                name: 'cess'
            }
        }
    })
</script>
~~~



## 数据代理

> 通过vm对象来代理data对象中属性的操作（读/写）
>
> 好处：更加方便的操作data中的数据

![image-20221209154534569](https://s2.loli.net/2023/10/18/ghqKv35oW8tlQ4Y.png)

### 为什么知道vue中用了数据代理

在data中定义的属性，直接被放到vm对象身上了，而且在浏览器调试的时候显示的是`(...)`的形式，可以知道是通过`Object.defineProperty方法`将data的属性挂载到vm对象身上了，通过vm来访问这些属性实际上**调用了getter方法来获得data中属性**，这就是数据代理

![image-20221209152815311](https://s2.loli.net/2023/10/18/hBPx948CwuZkEYN.png)



### 什么是数据代理

![image-20221209152027572](https://s2.loli.net/2023/10/18/wzxbkCKFJMNPHE7.png)

在编码的时候，在vm对象身上会存入data数据，vue底层会创建一个`_data`对象来接收这个data数据（`_data`内部实际上还实现了[数据劫持](# 简易模拟对数据的监测（对象）- 数据劫持)相关操作，为了当data数据变化之后，映射到页面）

- 如果对`vm.属性名`进行**获取**，实际上通过 **getter** 会获取到`_data内部`的属性，也就是`data`里面的属性
- 如果对`vm.属性名`进行**修改**，实际上通过 **setter** 修改了`_data内部`的属性，也就是`data`里面的属性也会变化（触发数据劫持之后，页面也跟着变化）



### 基本原理

通过`Object.defineProperty方法`将 data 对象中的属性添加到 vm 对象上，为配置到vm中的属性添加getter和setter，在getter和setter内部操作data中对应的属性。







## 事件

### 事件修饰符

Vue中的事件修饰符

1. `prevent`	阻止默认事件（常用）
2. `stop`		阻止事件冒泡（常用）
3. `once`		事件只触发一次（常用）
4. `capture`	使用事件的捕获模式
5. `self`		只有`event.target`是当前操作的元素时才触发事件
6. `passive`	事件的默认行为立即执行，无需等待事件回调执行完毕



修饰符可以连续写，比如可以这么用：`@click.prevent.stop="showInfo"`



~~~html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <script src="../js/vue.min.js"></script>
        <style>
            .list {
                width: 200px;
                height: 200px;
                background-color: pink;
                /* auto 可以加滚轮 */
                overflow: auto;
            }

            .list li {
                width: 100px;
                height: 100px;
            }
        </style>
    </head>

    <body>
        <div id="root">

            <!-- 4. capture 事件在捕获阶段触发 -->
            <div @click.capture="show(0)">
                <!-- 1. 阻止默认事件 通过连写，既阻止冒泡又阻止默认事件 -->
                <a href="https://www.baidu.com" @click.stop.prevent="show">点我事件(阻止默认事件)</a>
                <!-- 2. 阻止冒泡 -->
                <div @click.stop="show">点我事件(冒泡)</div>
                <!-- 3. 事件只触发一次 -->
                <div @click.once="show">点我事件(只有一次)</div>
                <div @click.stop="show">点我事件(冒泡)</div>

                <div @click="show(1)">点我事件(先捕获外层)</div>
            </div>


            <!-- 5.self 只有触发点击事件的target是自己才会触发事件 -->
            <div @click.self="showInfo" style="height: 80px;background-color: pink;">
                <div @click="showInfo" style="background-color: green;">点我事件，只有点我才算</div>
            </div>

            <!-- scroll 是监听滚动条的变化的，只要滚动条有变动就触发事件 -->
            <!-- <ul @scroll="move" class="list"> -->
            <!-- wheel是监听鼠标滚轮变化的，只要鼠标滚轮在滚动就触发事件，不管滚动条位置 -->
            <!-- 加了 passive 之后，事件默认行为立即执行，不用等待回调执行完毕再执行了 -->
            <ul @wheel.passive="move" class="list">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
        </div>
        <script>
            Vue.config.production = false;
            const vm = new Vue({
                el: "#root",
                data: {},
                methods: {
                    show(e) {
                        // e.stopPropagation(); // 阻止冒泡传统写法
                        // e.preventDefault(); // 阻止默认事件传统写法
                        alert("Show" + e);
                    },
                    showInfo(event) {
                        console.log(event.target);
                    },
                    move() {
                        // 默认会先处理这个回调，然后才会滚动页面
                        for (let i = 0; i < 100000; i++) {
                            console.log('在滚动了');
                        }
                        console.log('计算完成');
                    }
                },
            });
        </script>
    </body>

</html>
~~~





### 键盘事件

> 键盘上的每个按键都有自己的名称和编码，例如：Enter（13）。而Vue还对一些常用按键起了别名方便使用

1. Vue中常用的按键别名
   - 回车`enter`
   - 删除`delete`捕获“删除”和“退格”键
   - 退出`esc`
   - 空格`space`
   - 换行`tab`
     -  **特殊**：因为按下tab的时候，已经触发了tab的事件，会从当前元素上移开焦点，所以当用`keyup`的时候，实际上已经失去了焦点了，所以必须`配合keydown去使用`

   - 上`up`
   - 下`down`
   - 左`left`
   - 右`right`

2. Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为`kebab-case`**（多单词小写短横线写法，如`caps-lock`）**
3. 系统修饰键（用法特殊）ctrl，alt，shift，meta（meta就是win键）
   1. 配合`keyup`使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发
      - 可以指定某些组合才能触发，比如指定 **ctr+y** 使用 `@keyup.ctrl.y`
   2. 配合`keydown`使用：正常触发事件
4. 也可以使用keyCode去指定具体的按键（不推荐）
5. **Vue.config.keyCodes.自定义键名 = 键码**，可以去定制按键别名（不推荐）





## computed计算属性

1. 定义：要用的属性不存在，需要通过 **已有属性 **计算得来
2. 原理：底层借助了`Objcet.defineproperty()`方法提供的**getter和setter**
3. `get函数`什么时候执行？
   1. 初次读取时会执行一次
   2. 当依赖的数据发生改变时会被再次调用
4. 优势：**与methods实现相比，内部有缓存机制（复用），效率更高，调试方便** 
5. 备注
   - 计算属性最终会出现在vm上，直接读取使用即可
   - 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变
   - 如果计算属性确定**不考虑修改**，可以使用计算属性的[简写形式](# 计算属性的简写)



### 计算属性写法

~~~html
<body>
    <div id="root">
        请输入姓：<input type="text" v-model:value="xing" name="" id="xing"> <br><br>
        请输入名：<input type="text" v-model="ming" name="" id="ming">
        <p id="box">{{ fullName }}</p>
    </div>

    <script>
        Vue.config.production = false;
        const vm = new Vue({
            el: '#root',
            data: {
                xing: '张',
                ming: '三'
            },
            computed: {
                fullName: {
                    get() {
                        // console.log(this); // this还是vm
                        let lastName = this.xing.slice(0, 3)
                        return lastName + '-' + this.ming;
                    },
                    set(value) {
                        const arr = value.split('-')
                        this.xing = arr[0]
                        this.ming = arr[1]
                    }
                }
            }
        })
    </script>
</body>
~~~





### 计算属性的简写

> 如果确定了计算属性==只读不改==，可以用简写

~~~html
<body>
    <div id="root">
        请输入姓：<input type="text" v-model:value="xing" name="" id="xing"> <br><br>
        请输入名：<input type="text" v-model="ming" name="" id="ming">
        <p id="box">{{ fullName }}</p>
    </div>

    <script>
        Vue.config.production = false;
        const vm = new Vue({
            el: '#root',
            data: {
                xing: '张',
                ming: '三'
            },
            computed: {
                // 完整写法
                /* fullName: {
                    get() {
                        // console.log(this); // this还是vm
                        let lastName = this.xing.slice(0, 3)
                        return lastName + '-' + this.ming;
                    },
                    set(value) {
                        const arr = value.split('-')
                        this.xing = arr[0]
                        this.ming = arr[1]
                    }

                } */
                
                // 确定不修改的情况下用简写
                /* fullName: function(){
                        let lastName = this.xing.slice(0, 3)
                        return lastName + '-' + this.ming;
                }, */

                // 再简一点
                fullName(){  // 函数直接当get来用了
                    let lastName = this.xing.slice(0, 3)
                    return lastName + '-' + this.ming;
                },
            }
        })
    </script>
</body>
~~~







## 侦听属性（监视属性）

### 天气案例

实现点击按钮切换天气显示

- 通过计算属性来修改



~~~html
<div id="root">
    <h2>今天天气很 {{ info }}</h2>
    <!-- 绑定事件的时候可以写成@xxx="yyy" 的形式，yyy可以写一些简单的语句-->
    <!-- 只在一些简单的操作的时候可以这么写，复杂操作理论上也可以，但是不推荐 -->
    <!-- <button @click="isHot = !isHot">点我切换天气</button> -->
    <button @click="changeHot">点我切换天气</button>
</div>

<script>
    Vue.config.production = false;
    const vm = new Vue({
        el: '#root',
        data: {
            isHot: true
        },
        methods: {
            changeHot() {
                this.isHot = !this.isHot;
            },
        },
        computed: {
            info() {
                return this.isHot ? '炎热' : '凉爽'
            }
        }
    })
</script>
~~~





### 监视属性基本用法

#### watch监视属性

1. 当被监视的属性变化时，回调函数（handler）自动调用，进行相关操作
2. 监视的属性必须存在，才能进行监视，**既可以监视data，也可以监视计算属性**
3. 配置项属性`immediate默认false`，改为 true，则初始化时调用一次 `handler(newValue,oldValue)`方法
   - ==注意：==`newValue,oldValue`的顺序固定的，如果只写一个的话默认就是新的，参数名任意都行

4. 监视有两种写法
   1. 创建Vue时传入`watch: {}`配置
   2. 创建vm实例之后通过`vm.$watch()`监视：`vm.$watch('属性', {回调})`



#### 通过监视属性来实现天气案例

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <h2>今天天气很 {{ info }}</h2>
        <button @click="changeHot">点我切换天气</button>
    </div>

    <script>
        Vue.config.production = false;
        const vm = new Vue({
            el: '#root',
            data: {
                isHot: true
            },
            methods: {
                changeHot() {
                    this.isHot = !this.isHot;
                },
            },
            computed: {
                info() {
                    return this.isHot ? '炎热' : '凉爽'
                }
            },
            watch: {
                isHot: {
                    // immediate改为true表示初始化的时候就调用handler
                    immediate: true,
                    // 在监视的属性（isHot）发生改变的时候，handler被调用
                    handler(oldValue, newValue) {
                        console.log('isHot: ' + oldValue, newValue);
                    }
                }
            }
        })
        // 在写完vm对象之后，如果要添加监视的话也可以
        // 回调里面内容正常写就行
        /* vm.$watch('isHot', {
            immediate: true,
            handler(oldValue, newValue) {
                console.log('isHot: ' + oldValue, newValue);
            }
        }); */
    </script>
</body>

</html>
~~~





#### 深度监视

1. Vue中的`watch`**默认不监测对象内部值的改变**（一层）
2. 在watch中配置`deep:true`可以监测对象内部值的改变（多层）

> 注意：
>
> 1. **Vue自身可以监测对象内部值的改变**，但Vue提供的**watch默认不可以**
> 2. 使用watch时根据监视数据的具体结构，决定是否采用深度监视



#### 深度监视案例

~~~html
<div id="root">
    <h2>今天天气很 {{ info }}</h2>
    <button @click="changeHot">点我切换天气</button>
    <hr>
    <h2>a的值是 {{numbers.a}}</h2>
    <button @click="numbers.a++">a++</button>
    <hr>
    <h2>b的值是 {{numbers.b}}</h2>
    <button @click="numbers.b++">b++</button>
</div>

<script>
    Vue.config.production = false;
    const vm = new Vue({
        el: '#root',
        data: {
            isHot: true,
            numbers: {
                a: 1,
                b: 1,
            }
        },
        methods: {
            changeHot() {
                this.isHot = !this.isHot;
            },
        },
        computed: {
            info() {
                return this.isHot ? '炎热' : '凉爽'
            }
        },
        watch: {
            isHot: {
                immediate: true,
                handler(oldValue, newValue) {
                    console.log('isHot: ' + oldValue, newValue);
                }
            },
            // 监视多级结构中的某个属性的变化
            /* 'numbers.a': {
                    handler(oldValue, newValue) {
                        console.log('a: ' + oldValue, newValue);
                    }
                } */
            // 如果只用上面这个方法来监视单个属性的话，那一百个属性就要写一百个监视
            // 可以通过深度监视来监视多级结构中的所有属性的变化
            numbers: {
                deep: true,  // 如果为false的话，那么监视的是numbers这个对象，而不会监视对象内部的数据
                handler() {
                    console.log('numbers 被修改了');
                }
            }
        }
    })
</script>
~~~





#### 监视属性简写

> 如果监视属性除了`handler`没有其他配置项的话，可以进行简写

~~~html
<div id="root">
    <h2>今天天气很 {{ info }}</h2>
    <button @click="changeHot">点我切换天气</button>
</div>

<script>
    Vue.config.production = false;
    const vm = new Vue({
        el: '#root',
        data: {
            isHot: true,
        },
        methods: {
            changeHot() {
                this.isHot = !this.isHot;
            },
        },
        computed: {
            info() {
                return this.isHot ? '炎热' : '凉爽'
            }
        },
        watch: {
            // 完整写法
            /* isHot: {
                    // immediate: true,  // 立即执行handler
                    // deep: true, // 深度监视
                    handler(oldValue, newValue) {
                        console.log('isHot: ' + oldValue, newValue);
                    }
                }, */
            // 如果只有handler的话，可以简写
            /* isHot(oldValue, newValue) {
                    console.log('isHot: ' + oldValue, newValue);
                } */
        }
    })

    // 完整写法
    /* vm.$watch('isHot', {
            // immediate: true,  // 立即执行handler
            // deep: true, // 深度监视
            handler(oldValue, newValue) {
                console.log('isHot: ' + oldValue, newValue);
            }
        }); */

    // 如果只有handler的话，可以简写
    vm.$watch('isHot', function (oldValue, newValue) {
        console.log('isHot: ' + oldValue, newValue, this);
    });

    // 不能用箭头函数，会改变this（默认是指向vue对象的），往上级找会找到window
    vm.$watch('isHot', (oldValue, newValue) => {
        console.log('isHot: ' + oldValue, newValue, this);
    });

</script>
~~~







### 监视属性vs计算属性

1. `computed`能完成的功能，`watch`都可以完成
2. `watch`能完成的功能，`computed`不一定能完成
   - 例如`watch`可以进行异步操作



==两个重要的小原则==

1. **所有被Vue管理的函数**，最好**写成普通函数**，这样 this 的指向才是vm或组件实例对象
2. **所有不被Vue所管理的函数**（定时器的回调函数、ajax 的回调函数等、Promise 的回调函数），最好写成**箭头函数**，这样 this 的指向才是vm或组件实例对象



~~~html
<div id="root">
    请输入姓：<input type="text" v-model:value="xing" name="" id="xing"> <br><br>
    请输入名：<input type="text" v-model="ming" name="" id="ming">
    <p id="box">{{ fullName }}</p>
</div>

<script>
    Vue.config.production = false;
    const vm = new Vue({
        el: '#root',
        data: {
            xing: '张',
            ming: '三',
            fullName: ''
        },
        computed: {
        },
        watch: {
            xing: {
                immediate: true,
                handler() {
                    // 延迟一秒再更新页面
                    setTimeout(() => {
                        this.fullName = this.xing + '-' + this.ming
                    }, 1000);
                }
            },
            ming(newValue) {
                this.fullName = this.xing + '-' + this.ming
            }
        }
    })
</script>
~~~





## 绑定样式

### 绑定class / style样式

> ==样式对象==中的 **key**，必**须是存在的 CSS 属性**，如 fontSize，backgroundColor 等。

绑定class写法：

`:class="xxx"`，xxx 可以是字符串、数组、对象

- **字符串写法**适用于：类名不确定，要动态获取 

- **数组写法**适用于：要绑定多个样式，个数不确定，名字也不确定 

- **对象写法**适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用

绑定style写法：

1. `:style="[a,b]"`其中a、b是**样式对象**
2. `:style="{fontSize: xxx}"`其中 xxx 是动态值



案例：

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .basic {
            width: 200px;
            height: 100px;
            border: 1px solid #333;
        }

        .happy {
            background-color: pink;
        }

        .sad {
            background-color: white;
        }

        .normal {
            background-color: gray;
        }

        .xiaohuowa1 {
            background-color: orange;
        }

        .xiaohuowa2 {
            font-size: 30px;
        }

        .xiaohuowa3 {
            border-radius: 20px;
        }
    </style>
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <!-- 绑定class样式-字符串写法，适用于：样式类名不确定，需要动态指定 -->
        <div class="basic" :class="mood" @click="changeMood">{{ name }}</div> <br><br>

        <!-- 绑定class样式-array写法，适用于：要绑定多个样式，个数不确定，名字也不确定  -->
        <div class="basic" :class="classArr">{{ name }}</div> <br><br>

        <!-- 绑定class样式-对象写法，适用于：要绑定的样式个数确定、名字也确定，但要动态决定用不用  -->
        <div class="basic" :class="classObj">{{ name }}</div> <br><br>

        <!-- 绑定style样式--对象写法 -->
        <div class="basic" :style="styleObj">{{ name }}</div> <br><br>
        <!-- 绑定style样式--数组写法，数组里面也是放对象 -->
        <div class="basic" :style="styleArr">{{ name }}</div> <br><br>

    </div>
    <script>
        Vue.config.production = false;
        new Vue({
            el: '#root',
            data: {
                name: '小火娃',
                mood: '',
                classArr: ['xiaohuowa1', 'xiaohuowa2', 'xiaohuowa3'],
                classObj: {
                    xiaohuowa2: false,
                    xiaohuowa3: false,
                },
                styleObj: {
                    fontSize: '60px',
                },
                styleObj2: {
                    color: 'yellow'
                },
                styleArr: [
                    {
                        fontSize: '60px',
                    },
                    {
                        color: 'yellow'
                    },
                ]
            },
            methods: {
                changeMood() {
                    const moodArr = ['happy', 'normal', 'sad']
                    let index = Math.floor(Math.random() * 3)
                    this.mood = moodArr[index]
                }
            },
        })
    </script>
</body>

</html>
~~~





## 条件渲染

> v-if 相对 v-show 来说可能效率会稍低一些

### ==v-if==

- 写法 跟正常 if else 语法类似

  1. `v-if="表达式"`
  1. `v-else-if="表达式"`
  1. `v-else`

- 适用于：
  - **切换频率较低**的场景，因为不展示的DOM元素**直接被移除**

- 注意：
  - v-if可以和v-else-if，v-else一起使用，但要求结构**不能被打断**

### ==v-show==

- 写法
  - `v-show="表达式"`
- 适用于
  - 切换频率较高的场景
- 特点：
  - 不展示的DOM元素未被移除，仅仅是使用样式隐藏掉(`display: none`)

> 备注：
>
> 使用`v-if`的时，元素可能无法获取到，而使用`v-show`一定可以获取到
>
> 因为可能经过一些操作之后`v-if`的判断为false了，dom就消失了，而`v-show`dom不会消失



### ==template标签==

不影响结构，页面html中不会有此标签，但只能配合v-if，不能配合v-show





### 案例

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <!-- 使用v-show做条件渲染 -->
        <div v-show="showFlag">{{name}}</div>
        <div v-show="1 === 1">show，通过判断来实现</div>

        <!-- 使用v-if做条件渲染 -->
        <div v-if="showFlag">{{name}}</div>
        <div v-if="1 === 1">if，通过判断来实现</div>

        <!-- v-if配合 v-else-if 和 v-else -->
        <button @click="count++">点我count++</button>
        <div v-if="count == 1">count为1</div>
        <div v-else-if="count == 2">count为2</div>
        <div v-else-if="count == 3">count为3</div>
        <div v-else>{{count}}</div>

        <!-- v-if 配合 template -->
        <!-- template最终渲染出来就没了 -->
        <template v-if="count == 5">
            <div>大家好</div>
            <div>我是{{name}}</div>
            <div>{{count}}</div>
        </template>
    </div>
    <script>
        Vue.config.production = false;
        new Vue({
            el: '#root',
            data: {
                name: 'xiaohuowa',
                showFlag: false,
                count: 0,
            }
        })
    </script>
</body>

</html>
~~~





## 列表渲染

### v-for指令

用于展示列表数据

语法：

`<li v-for="(item, index) of items" :key="index">`

这里**key**可以是index，更好的是遍历对象的**唯一标识**

可遍历：

- 数组
- 对象
- 字符串（用的少）
- 指定次数（用的少）



#### 基本列表应用

![image-20221224192307463](https://s2.loli.net/2023/10/18/79dsoULBE3YcSK1.png)

![image-20221224192314127](https://s2.loli.net/2023/10/18/tEdPNqYjfgyumI8.png)

~~~html
<body>
    <div id="root">
        <h2>遍历列表</h2>
        <ul>
            <li v-for="(p,index) in personList" :key="index">
                <!-- {{p}} --- {{index}} -->
                {{index+1}} - {{p.name}} - {{p.age}}
            </li>
        </ul>

        <h2>遍历对象</h2>
        <ul>
            <li v-for="(value,k) in phone" :key="k">
                {{k}} - {{value}}
            </li>
        </ul>

        <h2>遍历字符串</h2>
        <ul>
            <li v-for="(char,index) in str" :key="index">
                {{index}} - {{char}}
            </li>
        </ul>

        <h2>遍历指定次数</h2>
        <ul>
            <li v-for="(number,index) in 10" :key="index">
                {{index}} - {{number}}
            </li>
        </ul>
    </div>
    <script>
        Vue.config.production = false;
        new Vue({
            el: '#root',
            data: {
                personList: [
                    { 'id': '188', 'name': 'John', 'age': 18 },
                    { 'id': '189', 'name': 'Jack', 'age': 19 },
                    { 'id': '199', 'name': 'Billy', 'age': 17 },
                ],
                phone: {
                    brand: 'xiaomi',
                    price: '3999',
                    color: 'black'
                },
                str: 'hello world'
            }
        })
    </script>
</body>
~~~





### key原理

==面试题：==react / vue中的key有什么作用？（key的内部原理）

#### 虚拟DOM中key的作用：

- key是虚拟DOM中对象的标识，当数据发生变化时，Vue会根据新数据生成新的虚拟DOM，随后Vue进行新虚拟DOM与旧虚拟DOM的差异比较，比较规则如下

#### 对比规则

- 旧虚拟DOM中**找到了**与新虚拟DOM**相同的key**
  1. 若虚拟DOM中内容没变, 直接使用之前的真实DOM
  2. 若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM
- 旧虚拟DOM中**未找到**与新虚拟DOM**相同的key**
  1. 创建新的真实DOM，随后渲染到到页面

#### 用index作为key可能会引发的问题

1. 若对数据进行逆序添加、逆序删除等**破坏顺序操作**，会产生没有必要的真实DOM更新 ==> 界面效果没问题，但**效率低**
2. 若结构中还包含**输入类的DOM**：会产生**错误DOM更新** ==> 界面有问题

#### 开发中如何选择key？

1. 最好使用每条数据的唯一标识作为key，比如 id、手机号、身份证号、学号等唯一值
2. 如果不存在对数据的逆序添加、逆序删除等破坏顺序的操作，仅用于渲染列表，使用index作为key是没有问题的



#### 案例

~~~html
<body>
    <div id="root">
        <h2>遍历列表</h2>
        <button @click="add">点我添加一个新人</button>
        <ul>
            <!-- 不会做出改变原有dom顺序的操作，或者仅用于页面显示的时候可以用index -->
            <!-- <li v-for="(p,index) in personList" :key="index"> -->
            <li v-for="(p,index) in personList" :key="p.id">
                {{p.name}} - {{p.age}} - <input type="text">
            </li>
        </ul>
    </div>
    <script>
        Vue.config.production = false;
        new Vue({
            el: '#root',
            data: {
                personList: [
                    { 'id': '188', 'name': 'John', 'age': 18 },
                    { 'id': '189', 'name': 'Jack', 'age': 19 },
                    { 'id': '199', 'name': 'Billy', 'age': 17 },
                ],
            },
            methods: {
                add() {
                    this.personList.unshift({
                        'id': '200',
                        'name': '老王',
                        'age': '28',
                    })
                }
            },
        })
    </script>
</body>
~~~





### 列表过滤

> 实现简易的模糊搜索功能

~~~html
<body>
    <div id="root">
        <h2>遍历列表</h2>
        <input type="text" placeholder="输入关键字查询" v-model="keyWord">
        <ul>
            <li v-for="(p,index) in resList" :key="p.id">
                {{p.name}} - {{p.age}}
            </li>
        </ul>
    </div>
    <script>
        Vue.config.production = false;
        // watch 的方法
        /* new Vue({
            el: '#root',
            data: {
                keyWord: '',
                personList: [
                    { 'id': '188', 'name': '马冬梅', 'age': 18 },
                    { 'id': '189', 'name': '周冬雨', 'age': 19 },
                    { 'id': '199', 'name': '周杰伦', 'age': 17 },
                    { 'id': '200', 'name': '温兆伦', 'age': 17 },
                ],
                resList: []
            },
            // 用watch的方法
            watch: {
                keyWord: {
                    immediate: true,  // 第一次自动过滤一遍，可以给 resList 赋值
                    handler(val) {
                        this.resList = this.personList.filter((p) => {
                            // 空串在字符串中的第 0 位
                            return p.name.indexOf(val) !== -1;
                        })
                    }
                }
            },
        }) */

        // 计算属性的方法
        new Vue({
            el: '#root',
            data: {
                keyWord: '',
                personList: [
                    { 'id': '188', 'name': '马冬梅', 'age': 18 },
                    { 'id': '189', 'name': '周冬雨', 'age': 19 },
                    { 'id': '199', 'name': '周杰伦', 'age': 17 },
                    { 'id': '200', 'name': '温兆伦', 'age': 17 },
                ],
            },

            // 用计算属性的方法
            computed: {
                resList() {
                    return this.resList = this.personList.filter((p) => {
                        // 空串在字符串中的第 0 位
                        return p.name.indexOf(this.keyWord) !== -1;
                    })
                }
            }
        })
    </script>
</body>
~~~









### 列表排序

> 在简易的模糊搜索基础上实现按年龄的排序
>
> 实现原理：
>
> 给定一个`sortType`用来区分排序的类型，点击按钮之后修改它的值，在排序的时候对这个`sortType`进行判断之后按照对应的排序要求排序即可



~~~html
<body>
    <div id="root">
        <h2>遍历列表</h2>
        <input type="text" placeholder="输入关键字查询" v-model="keyWord">
        <button @click="sortType = 1">升序</button>
        <button @click="sortType = 2">降序</button>
        <button @click="sortType = 0">原顺序</button>
        <ul>
            <li v-for="(p,index) in resList" :key="p.id">
                {{p.name}} - {{p.age}}
            </li>
        </ul>
    </div>
    <script>
        Vue.config.production = false;
        new Vue({
            el: '#root',
            data: {
                keyWord: '',
                sortType: 0,
                personList: [
                    { 'id': '188', 'name': '马冬梅', 'age': 18 },
                    { 'id': '189', 'name': '周冬雨', 'age': 19 },
                    { 'id': '199', 'name': '周杰伦', 'age': 17 },
                    { 'id': '200', 'name': '温兆伦', 'age': 20 },
                ],
            },

            // 用计算属性的方法
            computed: {
                resList() {
                    const arr = this.resList = this.personList.filter((p) => {
                        // 空串在字符串中的第 0 位
                        return p.name.indexOf(this.keyWord) !== -1;
                    })
                    if (this.sortType) {
                        arr.sort((a, b) => {
                            return this.sortType == 1 ? a.age - b.age : b.age - a.age
                        })
                    }
                    return arr
                }
            }
        })
    </script>
</body>
~~~





### Vue数据监听的一个问题

修改列表里的对象的属性可以监听到，但是将列表里的一个对象整个替换掉就不认了

~~~html
<body>
    <div id="root">
        <h2>小问题</h2>
        <button @click="changeMa">点我更新马冬梅</button>
        <ul>
            <li v-for="(p,index) in personList" :key="p.id">
                {{p.name}} - {{p.age}}
            </li>
        </ul>

    </div>
    <script>
        Vue.config.production = false;
        let personList = [
            { 'id': '188', 'name': '马冬梅', 'age': 18 },
            { 'id': '189', 'name': '周冬雨', 'age': 19 },
            { 'id': '199', 'name': '周杰伦', 'age': 17 },
            { 'id': '200', 'name': '温兆伦', 'age': 20 },
        ]
        const vm = new Vue({
            el: '#root',
            data: {
                personList
            },
            methods: {
                changeMa() {
                    this.personList[0] = { 'id': '188', 'name': '马小梅', 'age': 88 }
                }
            },
        })
    </script>
</body>
~~~





### Vue的数据监测过程（数据劫持）

看似vue会执行 `vm._data = data`操作，让`_data`里面的数据和data保持一致，但是在这之前还执行了一步，就是给data的各个属性绑定上`get / set方法`，这样当修改了这些属性的时候vue会重新解析模板，生成新的虚拟 DOM，刷新dom

为什么要加工 data

- 这样就可以做响应式： 例如当我们修改了 data 中的 name 属性，name 的 setter 就会被调用。在 setter 中调用了一个方法，会重新解析模板，生成新的虚拟 DOM，diff 对比，更新页面，从而实现对数据的监视。 

vue不仅进行数据劫持将`data`进行加工，还进行了[数据代理](# 数据代理)，将`data`的属性直接放到`vm`上方便操作



#### 简易模拟对数据的监测（对象）- 数据劫持

> 1. 给出`data`数据
> 2. 给一个`Observer`观察者构造方法
>    - 这个构造方法需要传入一个对象
>    - 遍历传入对象的所有key，并给观察者实例绑定上同名key，以及对应的`get/set方法`
>      - `get方法`返回的是传入对象的对应key的值
>      - `set方法`修改的是传入对象的对应key的值
> 3. 创建一个变量叫`vm`
> 4. 实例化观察者
>    - 实例化的时候传入`data`
>    - 实例化之后将观察者实例重新赋值给`data`
> 5. 给`vm`绑定一个叫`_data` 属性，属性值为观察者实例
>    - 因为`data`已经被观察者实例赋值了，所以`vm._data === data`为true
>    - 此时对`_data`数据的修改就会被监视到了



~~~html
<script>
    let data = {
        'name': 'zs',
        'age': 18
    }

    const obs = new Observer(data)
    let vm = {}
    vm._data = data = obs  // 把原来的也改掉，这样 vm._data === data 就为 true 了

    function Observer(obj) {
        const keys = Object.keys(obj);
        for (let key of keys) {
            // console.log(key);
            // 给观察者示例绑定上和 data 同名的属性以及对应get / set
            Object.defineProperty(this, key, {
                get() {
                    return obj[key];
                },
                set(val) {
                    console.log(`${key}被修改了`);
                    obj[key] = val;
                }
            });
        }
    }

</script>
~~~





### Vue.set

> 注意：
>
> 1. 读取一个对象中不存在的属性，是 `undefined`，不报错
> 2. 如果直接读取vm身上一个不存在的属性，会报错
> 3. 如果一个属性值是 `undefined`，**Vue 不会把他展示到页面上**

如需给后添加的属性做响应式，使用如下API：

- `Vue.set(target，propertyName/index，value)`
- `vm.$set(target，propertyName/index，value)`

~~~html
<body>
    <div id="root">
        <h2>学生信息</h2>
        <button @click="addSex">点我添加性别属性</button>
        <h3>名字:{{student.name}}</h3>
        <h3 v-show="student.sex">性别:{{student.sex}}</h3>
        <h2>朋友信息</h2>
        <ul>
            <li v-for="(f, index) in student.friends" :key="index">
                {{f.name}} - {{f.age}}
            </li>
        </ul>
        set方法:{{$set}}
    </div>
    <script>
        Vue.config.production = false;
        const vm = new Vue({
            el: '#root',
            data: {
                student: {
                    name: 'zhangsan',
                    friends: [
                        { 'name': 'lisi', 'age': 18 },
                        { 'name': 'Jack', 'age': 19 },
                    ]
                }
            },
            methods: {
                addSex() {
                    // 1.可以通过Vue直接添加
                    // Vue.set(this.student, 'sex', '男');
                    // 2.也可以通过vue实例添加
                    this.$set(this.student, 'sex', '男')
                }
            },
        })
    </script>
</body>
~~~







### Vue监视数据总结

#### 1. vue会监视data中所有层次的数据。



#### 2. 如何监测对象中的数据？

通过setter实现监视，且要在new Vue时就传入要监测的数据，后追加的属性，Vue默认不做响应式处理

如需给后添加的属性做响应式，请使用如下API：

- `Vue.set(target，propertyName/index，value)`
- `vm.$set(target，propertyName/index，value)`



#### 3. 如何监测数组中的数据？

通过包裹数组更新元素的方法实现，本质就是做了两件事：

1. 调用原生对应的方法对数组进行更新。
2. 重新解析模板，进而更新页面。

#### 4. 在Vue修改数组中的某个元素一定要用如下方法：

1. 使用以下这些API，这些操作数组的方法都修改了原数组，vue通过[这个](# 3. 如何监测数组中的数据？)方法完成数据以及页面更新。如果是用一些不能修改原数组的方法（比如filter），那么可以将新数组赋值给旧数组实现响应式
   1. push()
   2. pop()
   3. shift()
   4. unshift()
   5. splice()
   6. sort()
   7. reverse()
2. `Vue.set()` 或` vm.$set()`
   	



#### 5. 注意

特别注意：

1. `Vue.set()` 和 `vm.$set() `不能给vm 或 vm的根数据对象 添加属性！！！
2. 数据劫持数据代理都离不开`Object.defineProperty`
3. vue没有对`_data`中的数组中的每一项直接设置getter / setter，所以**不能通过索引直接进行修改操作！（如果这么做的话，数据会修改，但是Vue监测不到，页面也就不会变）**但是vue会给数组中的对象里面正常设置getter / setter，所以可以通过`vm._data.Obj.arr[0].property = 'xxx'`形式进行修改


> 注意：
>
> 1. 读取一个对象中不存在的属性，是 `undefined`，不报错
> 2. 如果直接读取vm身上一个不存在的属性，会报错
> 3. 如果一个属性值是 `undefined`，**Vue 不会把他展示到页面上**





#### 6. 总结案例

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../js/vue.js"></script>
</head>

<body>
    <div id="root">
        <h2>学生信息</h2>

        <button @click="incrAge">年龄+1岁</button> <br>
        <button @click="addSex">添加性别属性</button> <br>
        <button @click="shiftFriend">在列表首位添加一个朋友</button> <br>
        <button @click="changeFirstFriendName">修改第一个朋友名字为：张三</button> <br>
        <button @click.once="pushHobby">添加一个爱好：打篮球</button> <br>
        <button @click="changeFirstHobby">修改第一个爱好为：rap</button> <br>

        <h3>名字:{{student.name}}</h3>
        <h3>年龄:{{student.age}}</h3>
        <h3 v-if="student.sex">性别:{{student.sex}}</h3>
        <h3>爱好</h3>
        <ul>
            <li v-for="(h, index) in student.hobby" ::key="index">
                {{h}}
            </li>
        </ul>
        <h2>朋友信息</h2>
        <ul>
            <li v-for="(f, index) in student.friends" :key="index">
                {{f.name}} -- {{f.age}}
            </li>
        </ul>
    </div>
    <script>
        Vue.config.production = false;
        const vm = new Vue({
            el: '#root',
            data: {
                student: {
                    name: 'zhangsan',
                    age: 20,
                    hobby: [
                        '抽烟',
                        '喝酒',
                    ],
                    friends: [
                        { 'name': 'zhangsan', 'age': 18 },
                        { 'name': 'wangwu', 'age': 20 },
                    ]
                }
            },
            methods: {
                incrAge() {
                    this.student.age++;
                },
                addSex() {
                    // Vue.set(this.student, 'sex', 'male')  // 方案一
                    this.$set(this.student, 'sex', 'male')  // 方案二
                },
                shiftFriend() {
                    const friend = { 'name': '老王', 'age': 28 }
                    this.student.friends.unshift(friend)
                },
                changeFirstFriendName() {
                    /* const friend = this.student.friends[0]
                    friend.name = '张三'
                    this.student.friend.slice(0, 1, friend) */

                    // 简单的写法
                    this.student.friends[0].name = '张三'
                },
                pushHobby() {
                    this.student.hobby.push('打篮球')
                },
                changeFirstHobby() {
                    // this.student.hobby.splice(0, 1, 'Rap')  // 方案一
                    // Vue.set(this.student.hobby, 0, 'Rap')  // 方案二
                    this.$set(this.student.hobby, 0, 'Rap')  // 方案三
                },
            },
        })
    </script>
</body>

</html>
~~~







## 收集表单数据

1. 若：`<input type="text"/>`，则v-model**收集的是value值**，用户输入的就是value值。
2. 若：`<input type="radio"/>`，则v-model**收集的是value值**，且要给标签配置value值。
3. 若：`<input type="checkbox"/>`
   1. **没有配置input的value属性**，那么**收集的就是checked**（勾选true or 未勾选false，是布尔值）
   2. 配置input的value属性:
      - v-model的**初始值是非数组**，那么收集的就是checked（勾选true or 未勾选false，是布尔值）
      - v-model的**初始值是数组**，那么收集的的就是value组成的数组



### v-model的三个修饰符：

1. lazy：失去焦点再收集数据
2. number：输入字符串转为有效的数字
3. trim：输入首尾空格过滤





## 过滤器**（Vue3 已经移除）**

### 定义：

**对要显示的数据进行特定格式化后再显示**（适用于一些简单逻辑的处理）。

### 语法：

1. 注册过滤器
   1. 在vue实例化之前，可以注册全局过滤器
      - `Vue.filter(name,callback)` 
   2. 在实例化vue的时候，可以注册局部过滤器
      -  `new Vue{filters:{}}`
2. 使用过滤器：`{{ xxx | 过滤器名}} ` 或 ` v-bind:属性 = "xxx | 过滤器名"`（这种用的非常少）

### 备注：

1. 过滤器也可以接收额外参数（默认接收到的形参一定是管道前面的参数），多个过滤器也可以串联
2. 过滤器并没有改变原本的数据, 是产生新的对应的数据



### 案例

> 在[bootCDN](https://www.bootcdn.cn/)可以找到很多有用的库，本案例引用了[dayjs (v1.11.7) ](https://www.bootcdn.cn/dayjs/)，相对于[moment.js](https://www.bootcdn.cn/moment.js/)库体积小一点



![image-20221225162737452](https://s2.loli.net/2023/10/18/9ehGPwTKm4aSE2J.png)



~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="../js/vue.js"></script>
    <script src="../js/dayjs.js"></script>
</head>

<body>
    <div id="root">
        现在时间戳：{{time}} <br><br>
        现在时间格式化：{{formatTime}}<br><br>
        现在时间格式化：{{getFormatTime()}}<br><br>
        现在时间格式化（过滤器方式）：{{ time | timeFormatter }}<br><br>
        现在时间格式化（过滤器链式调用方式）：{{ time | timeFormatter | getFourChar }}<br><br>
        现在时间格式化（过滤器方式传参方式）：{{ time | timeFormatter('YYYY-MM-DD') }}<br><br>
        现在时间格式化（全局过滤器不传参方式）：{{ time | MyTimeFilter }}<br><br>
        现在时间格式化（全局过滤器方式传参方式）：{{ time | MyTimeFilter('YYYY-MM-DD') }}<br><br>
    </div>
    <script>
        Vue.config.production = false;
        Vue.filter('MyTimeFilter', function (val, pattern = 'YYYY-MM-DD HH:mm:ss') {
            return dayjs(val).format(pattern)
        })
        new Vue({
            el: '#root',
            data: {
                time: 1671955434505
            },
            // 通过计算属性方式
            computed: {
                formatTime() {
                    return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            // 通过method方式
            methods: {
                getFormatTime() {
                    return dayjs(this.time).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            // 通过过滤器方式，这种方式配置的是局部过滤器
            filters: {
                timeFormatter(val, pattern = 'YYYY-MM-DD HH:mm:ss') {
                    return dayjs(val).format(pattern)
                },
                getFourChar(val) {
                    return val.slice(0, 4)
                }
            }
        })
    </script>
</body>

</html>
~~~





## 内置指令

### 之前学过的指令： 

1. `v-bind`	单向绑定解析表达式，可简写为:
2. `v-model`	双向数据绑定
3. `v-for`		遍历数组 / 对象 / 字符串
4. `v-on`		绑定事件监听，可简写为@
5. `v-show`	条件渲染 (动态控制节点是否展示)
6. `v-if`		条件渲染（动态控制节点是否存存在）
7. `v-else-if`	条件渲染（动态控制节点是否存存在）
8. `v-else`	条件渲染（动态控制节点是否存存在）





###  v-text 指令v-html 指令

#### v-text指令

##### 作用：

向其所在的节点中渲染文本内容 

只是纯文本，即使文本中有标签结构也不会解析的。

##### 与插值语法的区别：

`v-text`**会替换掉**节点中的内容，`{{xxx}}`则不会，更灵活



#### **v-html 指令**

##### 作用：

向指定节点中渲染包含html结构的内容 

##### 与插值语法的区别： 

1. `v-html`**会替换掉**节点中所有的内容，`{{xxx}}`则不会
2. `v-html`**可以识别html结构**

##### ⛔严重注意

==v-html有安全性问题！！！==

1. 在网站上动态渲染任意html是非常危险的，**容易导致 XSS 攻击**
2. 一定要在可信的内容上使用v-html，永远不要用在用户提交的内容上！！！





#### 小案例

![image-20221225215757202](https://s2.loli.net/2023/10/18/cA1ZRFhzdnqb9fI.png)

~~~html
<body>
    <div id="root">
        <p v-text="str1"></p>
        <p v-html="str2"></p>
    </div>
    <script>
        Vue.config.production = false;
        new Vue({
            el: '#root',
            data: {
                str1: '<h2>hello</h2>',
                str2: '<h2>hello</h2>',
            }
        })
    </script>
</body>
~~~



### v-cloak 指令（没有值）

v-cloak指令直接卸载标签里面（没有值）

1. **本质是一个特殊属性**，Vue实例创建完毕并接管容器后，**会删掉v-cloak属性**
2. **使用css配合v-cloak**可以解决网速慢时页面展示出还未被vue解析的模板（例如`{{xxx}}`）的问题

~~~html
<title>v-cloak指令</title>

<style>
    [v-cloak] {
        display:none;
    }
</style>

<div id="root">
    <h2 v-cloak>{{ name }}</h2>
</div>

// 够延迟5秒收到vue.js
<script type="text/javascript" src="http://localhost:8080/resource/5s/vue.js"></script>

<script type="text/javascript">
    console.log(1)
    Vue.config.productionTip = false
    new Vue({
        el:'#root',
        data:{name:'cess'}
    })
</script>
~~~





### v-once 指令（没有值）

`v-once`所在节点在**初次动态渲染后**，就**视为静态内容**了 

以后数据的改变**不会引起**`v-once`所在结构的**更新**，可以**用于优化性能**

~~~html
<title>v-once指令</title>
<script type="text/javascript" src="../js/vue.js"></script>

<div id="root">
    <h2 v-once>初始化的n值是: {{n}}</h2>
    <h2>当前的n值是: {{n}}</h2>
    <button @click="n++">点我n+1</button>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false
    new Vue({ el: '#root', data: {n:1} })
</script>
~~~



### v-pre 指令（没有值）

跳过`v-pre`所在节点的编译过程

可利用它跳过

1. 没有使用指令语法
2. 没有使用插值语法的节点

作用：会加快编译





## 自定义指令

### 局部自定义指令

通过`directives`来配置自定义指令

两种方式

1. ~~~js
   new Vue({															
       directives:{ 
           指令名:配置对象 
       }   
   })
   ~~~

2. ~~~js
   new Vue({															
       directives:{ 
           指令名:回调函数 
       }   
   })
   ~~~



### 全局自定义指令

~~~js
Vue.directive(指令名, 配置对象)
或
Vue.directive(指令名, 回调函数)


Vue.directive('fbind', {
    // 指令与元素成功绑定时（一上来）
    bind(element, binding) {	// element就是DOM元素，binding就是要绑定的
        element.value = binding.value
    },
    // 指令所在元素被插入页面时
    inserted(element, binding) {
        element.focus()
    },
    // 指令所在的模板被重新解析时
    update(element, binding) {
        element.value = binding.value
    }
})
~~~





### 总结

==所有指令函数中的this都是指window对象==

> - `element` 是真实 DOM，可以 `console.dir(element)` 或者 `console.log(element instanceof HTMLElement)`  进行验证
> - `binding`就是要绑定的对象，它包含以下属性
>   - `name`
>   - `value`
>   - `oldValue`
>   - `expression`
>   - `arg`
>   - `modifiers`
>   - ...



配置对象中常用的3个回调函数 

1. `bind(element, binding)`
   - 指令与元素成功绑定时调用
2. `inserted(element, binding)`
   - 指令所在元素被插入页面时调用
3. `update(element, binding)`
   - 指令所在模板结构被重新解析时调用

> 直接写回调函数的形式，相当于是把配置对象中的①和③整合了，因为①和③经常是一样的代码，如果要关注元素被插入页面时这个时间点的话，就用配置对象形式明确写出



备注

1. 指令定义时不加`v-`，但使用时（写标签里的时候）要加`v-`
2. 指令名如果是多个单词，要使用**kebab-case命名方式（短横杠连接）**，不要用**camelCase命名（小驼峰）**  





### 小案例

~~~html
<body>
    <div id="root">
        <h2>正常n:{{n}}</h2>
        <h2>两倍n:<span v-double="n"></span></h2>
        <button @click="n++">点我n+1</button>
        <input type="text" v-focus-bind:value="n">
    </div>
    <script>
        Vue.config.production = false;

        // 全局自定义指令
        /* Vue.directive('focus-bind', {
            // 指令与元素成功绑定时（一上来）
            bind(element, binding) {
                element.value = binding.value
                console.log('binding');
            },
            // 指令所在元素被插入页面时
            inserted(element, binding) {
                element.focus()
                console.log('inserted');
            },
            // 指令所在的模板被重新解析时
            update(element, binding) {
                element.value = binding.value
                console.log('updated');
            },
        }) */

        new Vue({
            el: '#root',
            data: {
                n: 1
            },
            directives: {
                // double函数何时会被调用？
                // 1.指令与元素成功绑定时（一上来） 2.指令所在的模板被重新解析时
                double(element, binding) {
                    // element 是真实DOM，binding是
                    console.log(element, binding);
                    element.innerText = binding.value * 2;
                },
                // 要让输入框绑定n的同时获得焦点
                // 局部自定义指令
                'focus-bind': {
                    // 指令与元素成功绑定时（一上来）
                    bind(element, binding) {
                        element.value = binding.value
                        console.log('binding');
                    },
                    // 指令所在元素被插入页面时
                    inserted(element, binding) {
                        element.focus()
                        console.log('inserted');
                    },
                    // 指令所在的模板被重新解析时
                    update(element, binding) {
                        element.value = binding.value
                        console.log('updated');
                    },
                }
            }
        })
    </script>
</body>
~~~







## 生命周期

> 又名**生命周期回调函数**、**生命周期函数**、**生命周期==钩子==**

### 是什么

Vue在**关键时刻**帮我们调用的一些特殊名称的函数

生命周期函数的**名字不可更改**，但函数的具体**内容**是程序员**根据需求编写**的

生命周期函数中的` this 指向是vm或组件实例对象`

![生命周期](https://s2.loli.net/2023/10/18/Wi4hmCtlEncqs75.png)



### 八个生命周期

> 八个生命周期钩子可以分为四对
>
> 除了生命周期表中出现的八个钩子，还有三个钩子分别为：[activated、deactivated](# 11.两个新的生命周期钩子)和[$nextTick](# $nextTick)



1. 🏀数据监测、数据代理初始化前后
   1. 1️⃣`beforeCreate`
      - 此时刚初始化完生命周期、事件，但是==数据代理还没开始==
   2. 进行数据监测和数据代理
   3. 2️⃣`created`
      - 数据监测、数据代理完成，可以通过vm访问到`data`的数据和`methods`中的方法了
   4. 在`created`之后Vue开始解析模板，**生成虚拟DOM放入内存**。此时页面还不能显示解析好的内容！
2. 🏀挂载前后
   1. 3️⃣`beforeMount`
      - 此时页面还是**未经Vue编译的结构**
      - 此时操作DOM都是无效的（因为挂载完就会更新页面）
   2. 将内存中的 虚拟DOM **转为真实DOM插入页面**
   3. 4️⃣`mounted`
      - 此时页面已经**经过Vue编译的结构**
      - 对DOM的操作均有效了（不建议自己手动操作DOM）
      - 可以进行开启定时器、发送网络请求、订阅消息、绑定自定义事件等初始化操作
3. 🏀更新前后（只要有更新就会进来）
   1. 5️⃣`beforeUpdate`
      - 此时数据是更新后的，但页面还没来得及更新，==所以`beforeUpdate`是数据页面不同步的一步==
   2. 执行完`beforeUpdate`钩子之后，会生成新的虚拟DOM，**跟旧虚拟DOM进行比较**，之后完成页面更新。即：Model -> View的更新
   3. 6️⃣`updated`
      - 此时页面更新完毕，页面和数据保持同步
4. 🏀销毁前后
   1. 7️⃣`beforeDestory`
      - 这个时候，vm中的所有 data、methods、指令等**均还可用**
      - 一般在这个时候进行：关闭定时器、取消订阅消息、解绑自定义事件等收尾操作
      - （此时操作数据已经没有意义了，因为不会再回头去更新了）
   2. 清除监视属性、组件、自定义事件监听器
   3. 8️⃣destoryed`
      - （一般没啥用...）





### 总结

#### 常用的生命周期钩子

1. `mounted`
   - 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等初始化操作 
2. `beforeDestroy`
   - 清除定时器、解绑自定义事件、取消订阅消息等收尾工作 



#### 关于销毁Vue实例

1. 销毁后借助Vue开发者工具看不到任何信息
2. 销毁后自定义事件会失效，但**原生DOM事件依然有效**
3. 一般不会在beforeDestroy操作数据，因为即便操作数据，也**不会再触发更新流程了**





## 组件

### 传统写法和组件化对比

传统写法

![image](https://s2.loli.net/2023/10/18/eiw6H4aJESUXnvx.png)

Vue组件化

![image (1)](https://s2.loli.net/2023/10/18/hNQMJR13EYxVFtn.png)



### 模块概念

> 是向外提供特定功能的 js 程序，一般就是一个 js 文件



#### 为什么要用模块

js 文件很多很复杂



#### 模块作用

复用、简化 js 的编写，提高 js 运行效率



### 组件概念

> 用来实现**局部**功能的**代码和资源**的**集合**（包括html/css/js/image…）



#### 为什么要用组件

一个界面的功能很复杂



#### 作用

复用编码，简化项目编码，提高运行效率

### 模块化

当应用中的 js 都以模块来编写的，那这个应用就是一个模块化的应用

### 组件化

当应用中的功能都是多组件的方式来编写的，那这个应用就是一个组件化的应用





### 非单文件组件

#### 非单文件组件和单文件组件

非单文件组件：一个文件中**包含有 n 个组件**

单文件组件：一个文件中只包含有 **1 个**组件



#### 基本使用

##### Vue中使用组件的三大步骤 

###### 1. 定义组件

使用`Vue.extend(options)`创建

其中`options`和`new Vue(options)`时传入的options**几乎一样**，但也有点区别

区别：

1. **`el`不要写**
   - 因为最终所有的组件都要经过一个vm的管理，**由vm中的el才决定服务哪个容器**
2. `data`**必须写成函数**，避免组件被复用时，数据存在引用关系
   - vue中data必须是函数是为了保证组件的独立性和可复用性，data是一个函数，组件实例化的时候这个函数将会被调用，**返回一个对象**，计算机会给这个对象分配一个内存地址，**实例化几次就分配几个内存地址**，他们的**地址都不一样**，所以每个组件中的数据**不会相互干扰**，改变其中一个组件的状态，其它组件不变
   - 通过在`data`里面 return 一个对象来完成功能



~~~js
const student = Vue.extend({
    template: `
                <div>
                    我是{{name}} <br><br>
                    我今年 {{age}} 岁    
                </div>
            `,
    data() {
        return {
            name: 'xiaohuowa',
            age: 18
        }
    }
})
~~~



###### 2. 注册组件

- 局部注册：

`new Vue()`的时候options传入`components选项`

- 全局注册：

`Vue.component('组件名',组件)`



注意：

注册组件一定要写在定义好的组件**下方**，不然会报错（未注册）

###### 3. 使用组件

编写组件标签如` <school></school> `





##### 基本使用案例

![image-20221227135624898](https://s2.loli.net/2023/10/18/V6iHLhr8getAavO.png)

~~~html
<body>
    <div id="root">
        <student></student>
        <hr>
        <student></student>
    </div>
    <script>
        Vue.config.production = false;

        const student = Vue.extend({
            template: `
                <div>
                    我是{{name}} <br><br>
                    我今年 {{age}} 岁    
                </div>
            `,
            data() {
                return {
                    name: 'xiaohuowa',
                    age: 18
                }
            }
        })


        new Vue({
            el: '#root',
            components: {
                // student: student
                // 以上可以用js语法简写
                student
            }
        })
    </script>
</body>
~~~





### 组件注意事项

#### 关于组件名

##### 一个单词组成

1. 第一种写法（首字母小写）：`school`
2. 第二种写法（首字母大写）：`School`

##### 多个单词组成

1. 第一种写法（kebab-case 命名）：`my-school`
2. 第二种写法（CamelCase 命名）：`MySchool`（需要Vue脚手架支持）

##### 备注

组件名尽可能**回避HTML中已有的元素名称**，例如：h2、H2都不行

可以使用**name配置项**指定组件在开发者工具中呈现的名字

![image-20221227140038781](https://s2.loli.net/2023/10/18/75TrPKQdeLN4FGa.png)

~~~js
const student = Vue.extend({
    name: 'xiaohuowaMsg',  // 通过在这写name配置开发者工具的显示名字
    template: `
                <div>
                    我是{{name}} <br><br>
                    我今年 {{age}} 岁    
                </div>
            `,
    data() {
        return {
            name: 'xiaohuowa',
            age: 18
        }
    }
})


new Vue({
    el: '#root',
    components: {
        // student: student
        // 以上可以用js语法简写
        student
    }
})
~~~



#### 关于组件标签 

1. 第一种写法-双标签：`<school></school>`
2. 第二种写法-单标签：`<school/>`（**需要Vue脚手架支持**）
   - 不使用脚手架时，<school/>会导致后续组件不能渲染



#### 组件定义简写方式

`const school = Vue.extend(options)`可简写为`const school = options`

因为父组件components引入的时候会自动调用extend



#### 案例

##### 单标签的问题

![image-20221227142045395](https://s2.loli.net/2023/10/18/1fNpUDsCmuPT7Wi.png)

写了三遍，但是只用了一遍

![image-20221227142034615](https://s2.loli.net/2023/10/18/MBbhUDiS4Jvzm68.png)

~~~html
<body>
    <div id="root">
        <my-student></my-student>

        <!-- <my-student> 这样可以，在开发者工具里显示的是 MyStudent </my-student> -->

        <!-- <My-student>这么写会报错</My-student> -->
        <!-- <My-Student>这么写会报错</My-Student> -->
        <!-- <MyStudent>这么写会报错</MyStudent> -->

        <!-- <h2>简单环境下单标签会出问题</h2>
        <student />
        <student />
        <student />
        <student /> -->
    </div>
    <script>
        Vue.config.production = false;

        const student = Vue.extend({
            template: `
                <div>
                    hello 全局注册的 {{name}}    
                </div>
                    `,
            data() {
                return {
                    name: 'xiaohuowa'
                }
            }
        })

        // 以上写法的简写
        /* const student = {
            template: `
                <div>
                    hello 全局注册的 {{name}}    
                </div>
            `,
            data() {
                return {
                    name: 'xiaohuowa'
                }
            }
        } */


        new Vue({
            el: '#root',
            data: {

            },
            components: {
                'my-student': student
                // 局部注册
                /* 'student': {
                    template: `
                        <div>
                            hello 局部注册的 {{name}}    
                        </div>
                     `,
                    data() {
                        return {
                            name: 'xiaohuowa'
                        }
                    }
                } */
            }
        })
    </script>
</body>
~~~







### 组件嵌套







![image-20221227203427908](https://s2.loli.net/2023/10/18/oOCMlZ2QRTLhIwE.png)

~~~html
<body>
    <div id="root">
        <!-- <app></app> -->
    </div>
    <script>
        Vue.config.production = false;

        const student = Vue.extend({
            template: `
                <div>
                    hello  {{name}}    
                </div>
            `,
            data() {
                return {
                    name: 'xiaohuowa'
                }
            }
        })

        const school = Vue.extend({
            template: `
                <div>
                    学校名称 {{name}} 
                    <student></student>   
                </div>
                    `,
            data() {
                return {
                    name: 'School'
                }
            },
            components: {
                student
            }
        })

        const app = Vue.extend({
            template: `
                <div>
                    <school></school>                    
                </div>
            `,
            components: {
                school
            }
        });

        new Vue({
            // 如果在这边直接写 template 展示app的话，页面都不用了
            template: `
                <div>
                    <app></app>    
                </div>
            `,
            el: '#root',
            components: {
                app
            }
        })
    </script>
</body>

~~~







### VueComponent

#### 本质

`app`组件本质是一个名为`VueComponent的构造函数`称为组件实例对象，且不是程序员定义的，而是` Vue.extend() `生成的

#### 实例化 

> 写标签之后，Vue解析完就创建实例对象

只需要写 `<app/> `或 `<app></app>`，Vue 解析时会帮我们创建 app组件的实例对象，即Vue帮我们执行的`new VueComponent(options) `

#### 每次调用的都是不同的

每次调用`Vue.extend`，返回的都是一个`全新的VueComponent`，即不同组件是不同的对象

#### 关于 this 指向 

1. 组件配置中 data函数、methods中的函数、watch中的函数、computed中的函数 它们的 **this 均是 VueComponent实例对象**
2. `new Vue(options)`配置中：data函数、methods中的函数、watch中的函数、computed中的函数 **它们的 this 均是 Vue实例对象**







### 一个重要的内置关系

> 一个重要的内置关系：`VueComponent.prototype.__proto__ === Vue.prototype`
>
> 1. `prototype`：显示原型对象
> 2. `__proto__`：隐式原型对象
>
> 为什么要有这个关系？
>
> - 让组件实例对象（vc）可以访问到 Vue原型上的属性、方法



![image (2)](https://s2.loli.net/2023/10/18/bUQimI6AqdWvujF.png)





### 单文件组件

把一个组件的html、css、js等写在一个`.vue`的文件中，通过一个老大哥`App.vue`来统一管理所有的小弟。

编写一个`main.js`，用于引入vue和`App.vue`，创建vm



##### Student.vue

~~~vue
<template>
    <div class="demo">
        <h2>学生名字： {{ name }}</h2>
        <h2>学生年龄：{{ age }}</h2>
    </div>
</template>

<script>
export default {
    name: 'Student',
    data: {
        name: '小火娃',
        addr: 18
    },
}
</script>

~~~



##### School.vue

~~~vue

<template>
<div class="demo">
    <h2>学校名字： {{ name }}</h2>
    <h2>地址：{{ addr }}</h2>
    </div>
</template>

<script>
    /* const School = Vue.extend({
  data: {
    name: 'bjdx',
    addr: '北京'
  },
})
export default School; */

    // 简写一点
    /* export default Vue.extend({
  data: {
    name: 'bjdx',
    addr: '北京'
  },
}) */

    // 再简写一点
    export default {
        name: 'School',
        data: {
            name: 'bjdx',
            addr: '北京'
        },
    }
</script>

<style>
    .demo {
        background-color: pink;
    }
</style>
~~~



##### App.vue

~~~vue

<template>
    <div>
        <Student></Student>
        <School></School>
    </div>
</template>

<script>
import School from './School.vue'
import Student from './Student.vue'
export default {
    name: 'App',
    components: {
        School, Student
    }
}
</script>

<style>

</style>
~~~



##### main.js

~~~js

import App from "./App";

Vue.config.production = false;
new Vue({
    el: "#root",
    template: `<App></App>`,
    components: { App },
    data: {},
});

~~~





# CLI 脚手架

## 基本使用

Vue脚手架是Vue官方提供的标准化开发工具（开发平台）



### 下载

如果下载缓慢请配置npm淘宝镜像`npm config set registry http://registry.npm.taobao.org`

全局安装` @vue/cli npm install -g @vue/cli`

切换到创建项目的目录，使用命令创建项目`vue create xxx`

选择使用vue的版本

### 常用命令

启动项目`npm run serve`

打包项目`npm run build`

暂停项目 `Ctrl+C`

> Vue脚手架隐藏了所有webpack相关的配置，若想查看具体的webpack配置，请执行
>
> `vue inspect > output.js`





### 脚手架文件结构

~~~
.文件目录
├── node_modules 
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   └── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── README.md: 应用描述文件
└── package-lock.json: 包版本控制文件
~~~



#### src/main.js

~~~js
// 该文件是整个项目的入口文件

import Vue from 'vue'				// 引入Vue
import App from './App.vue'	// 引入App组件，它是所有组件的父组件

Vue.config.productionTip = false

new Vue({
	el:'#app',
  render: h => h(App),			// render函数完成了这个功能：将App组件放入容器中
})// .$mount('#app')
~~~



#### public/index.html

~~~html
<!DOCTYPE html>
<html lang="">
    <head>
        <meta charset="UTF-8">
      
        <!-- 针对IE浏览器的特殊配置，含义是让IE浏览器以最高渲染级别渲染页面 -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
      
        <!-- 开启移动端的理想端口 -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
        <!-- 配置页签图标 <%= BASE_URL %>是public所在路径，使用绝对路径 -->
        <link rel="icon" href="<%= BASE_URL %>favicon.ico">
      
        <!-- 配置网页标题 -->
        <title><%= htmlWebpackPlugin.options.title %></title>
    </head>
    <body>
      
      	<!-- 当浏览器不支持js时，noscript中的元素就会被渲染 -->
      	<noscript>
      		<strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    		</noscript>
          
        <!-- 容器 -->
        <div id="app"></div>
    </body>
</html>
~~~



### 执行大致流程

`main.js`（入口文件）->`app.vue`-> 各小组件 -> 找到容器root



### render函数

~~~js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  el:'#app',
  // render函数功能：将App组件放入容器中
  // 简写形式
  render: h => h(App),
  // 完整形式
  // render(createElement){
  //   return createElement(App)
  // }
})
~~~



#### 关于render函数引入的vue文件

`vue.js`与`vue.runtime.xxx.js`的区别 

- `vue.js` 是**完整版**的Vue，包含：核心功能+模板解析器
  - 完整版缺点：
    1. 体积大
    2. 开发项目完成后，存在冗余的模板解析模板代码
- `vue.runtime.xxx.js` 是运行版的Vue，只包含核心功能，**没有模板解析器**
  - `esm` 就是 支持ES6 module（模块化）

> 因为 `vue.runtime.xxx.js` 没有模板解析器，所以不能使用`template配置项`，需要使用`render函数`接收到的`createElement`函数去指定具体内容



### vue.config.js 配置文件

`vue inspect > output.js`可以查看到Vue脚手架的默认配置（输出出来给自己看的，在里面修改是无效的）

#### 修改一些配置

使用`vue.config.js`可以对脚手架进行个性化定制，和package.json**同级**目录，详见[配置参考 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/config/#vue-config-js)



例如

~~~js
module.exports = {
  pages: {
    index: {
      entry: 'src/index/main.js' // 入口
    }
  },
  lineOnSave: false	// 关闭语法检查
}
~~~











## 一些属性

### ref

> 可以当成是标签的`id`，当`ref`加在子组件上时会获取到子组件的组件实例对象
>
> 如果通过`id`的方式获取子组件的话，获取的也是真实DOM



`ref`被用来给元素或子组件注册引用信息（id的替代者）

1. 应用在**html标签**上获取的是真实**DOM**元素
2. 应用在**组件标签**上获取的是组件实例对象**vc**

使用方式 

打标识：`<h1 ref="xxx"></h1>`或`<School ref="xxx"></School>`

获取：`this.$refs.xxx`



~~~vue
<template>
  <div>
    <h1 ref="title">hello world</h1>
    <School ref="sch" />
    <!-- 脚手架环境下单标签没问题 -->
    <!-- <School /> -->
    <!-- <School /> -->
    <button @click="showDom">点我输出DOM</button>
  </div>
</template>

<script>
// 引入学校组件
import School from './components/School'
export default {
  name: 'App',
  components: { School },
  methods: {
    showDom() {
      console.log(this)  // this指向的是App这个组件实例对象
      console.log(this.$refs.title)  // 获取真实 DOM 对象，类似于 id 的用法
      console.log(this.$refs.sch)  // 获取 School 的组件实例对象，如果通过id获取的话只能获取School标签的静态内容  
    }
  },
}
</script>
~~~





### props

> `props`让组件接收外部传过来的数据 

#### 传递数据

> 父组件给子组件传递数据

`<Demo name="xxx" :age="18"/>`

这里`age`前加`:`是因为默认会传字符串，加了冒号相当于是`v-bind`简写，表示动态绑定数据，此时双引号不再表示字符串的意思，而是执行双引号内的内容从而得出一个结果，通过`v-bind`使得里面的18是数字number类型



#### 接收数据

> 在子组件中接收数据

##### 第一种方式（只接收）

`props:['name', 'age'] `

#####  第二种方式（限制类型）

`props:{name:String, age:Number}`

#####  第三种方式（限制类型、限制必要性、指定默认值）

~~~js
props: {
    name: {
        type: String,  // 类型
        required: true,  // 必要性
        default: 'xiaohuowa'  // 默认值
    }
}
~~~



#### 注意

`props`是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告

若业务需求确实需要修改，**那么请复制props的内容到data中，然后去修改data中的数据**





#### 案例

##### Student.vue

~~~vue
<template>
  <div>
    <h2>学生姓名：{{ name }}</h2>
    <h2>年龄：{{ age + 1 }}</h2>
    <h2>性别：{{ sex }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    return {
    }
  },
  // 第一种
  // props: ['name', 'age', 'sex']

  // 第二种
  /*   props: {
      name: String,
      age: Number,
      sex: String
    } */

  // 第三种
  props: {
    name: {
      type: String,
      required: true,
      default: '张三'
    },
    age: {
      type: Number,
      required: true,
      // default: 100  一般和 required 不一起写，因为只要有 required 了，这行就不起作用了
    },
    sex: {
      type: String,
      default: '女'
    },
  }
}
</script>
~~~



##### App.vue

~~~vue
<template>
  <div>
    <!-- 加冒号可以让这里的 age 变为 number -->
    <!-- <Student name="xiaohuowa" :age="19" sex="男" /> -->

    <!-- 默认传参 -->
    <Student name="xiaohuowa" :age="19" />
  </div>
</template>

<script>
import Student from './components/Student'
export default {
  name: 'App',
  components: { Student },
}
</script>

~~~



### mixin

功能：可以把多个组件**共用的配置**提取成一个混入对象 

使用方式：

1. 定义混入

   - ~~~js
     const mixin = {
         data() {....},
         methods: {....}
         ....
     }
     ~~~

2. 使用混入

   1. 先引入，然后选下面的一种来使用
   2. 全局混入`Vue.mixin(xxx)`
   3. 局部混入配置项中多加一个：`mixins:['xxx']`
      - 就算只有一个混入也得写成数组形式



#### 注意

1. 组件和混入对象含有**同名选项**时，这些选项将以恰当的方式进行**“合并”**，在发生冲突时以**组件为主**
2. **同名生命周期钩子**将合并为一个**数组**，因此**都将被调用**。
   - 混入对象的钩子将在组件自身钩子**之前**调用**（混入优先被调用）**




#### 案例

> 这个案例编写了一个`minin.js`里面包含了组件共用的配置，通过`export`暴露
>
> - 可以在`main.js`中引入做全局的
> - 也可以在各个`vue`子组件里面局部引入

##### main.js

~~~js
// 引入Vue
import Vue from "vue";
// 引入App
import App from "./App";

// 关闭Vue的生产提示
Vue.config.productionTip = false;

// 全局混入
import { hunhe } from "./maxin";
Vue.mixin(hunhe);

// 创建vm
new Vue({
    el: "#app",
    render: (h) => h(App),
});

~~~



##### maxin.js

~~~js
export const hunhe = {
    methods: {
        showName() {
            alert(this.name);
        },
    },
};
~~~



##### App.vue

~~~vue
<template>
  <div>
    <Student />
    <hr>
    <School />
  </div>
</template>

<script>
import Student from './components/Student'
import School from './components/School'

export default {
  name: 'App',
  components: { Student, School },
}
</script>

~~~



##### Student.vue

~~~vue
<template>
  <div>
    <h2>学生姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="showName">点我提示名字</button>
  </div>
</template>

<script>
// 局部混入
// import { hunhe } from '../maxin'

export default {
  name: 'Student',
  data() {
    return {
      name: 'xiaohuowa',
      age: 18
    }
  },
  // mixins: [hunhe]
}
</script>
~~~



##### School.vue

~~~vue
<template>
  <div>
    <h2>学校名：{{ name }}</h2>
    <h2>地址：{{ addr }}</h2>
    <button @click="showName">点我提示名字</button>
  </div>
</template>

<script>
// 局部混入
// import { hunhe } from '../maxin'

export default {
  name: 'Student',
  data() {
    return {
      name: '清华大学',
      addr: '北京'
    }
  },
  // mixins: [hunhe]
}
</script>
~~~





### plugin

#### 功能

用于增强Vue

定义插件是把想要在Vue原型实现的定义写在一起，组成一个模块化的整体，能够容易实现复用

#### 本质

包含`install方法`的一个对象

`install`的**第一个参数**是**Vue**，第二个以后的参数是插件使用者传递的数据



#### 定义插件

定义一个包含全局过滤器、全局指令、全局混入以及Vue原型上加实例方法的插件

~~~js
export default {
    install(Vue) {
        // 第一个参数就是Vue构造函数
        // console.log(Vue);

        // 过滤器
        Vue.filter("mySlice", function (value) {
            return value.slice(0, 4);
        });

        // 自定义指令
        Vue.directive("fbind", {
            bind(element, binding) {
                element.value = binding.value;
                // console.log(binding);
            },
            inserted(element, binding) {
                element.focus();
            },
            update(element, binding) {
                element.value = binding.value;
            },
        });

        // 混入
        Vue.mixin({
            data() {
                return {
                    x: 100,
                    y: 99,
                };
            },
        });

        // 给Vue原型对象上加方法
        Vue.prototype.hello = function () {
            alert("hello world");
        };
    },
};

~~~





#### 使用插件

`Vue.use()`（可传多个参数）

##### main.js

~~~js
// 引入Vue
import Vue from "vue";
// 引入App
import App from "./App";

// 关闭Vue的生产提示
Vue.config.productionTip = false;

//引入和使用插件
import plugin from "./plugin";
Vue.use(plugin);

// 创建vm
new Vue({
    el: "#app",
    render: (h) => h(App),
});

~~~

##### Student.vue

~~~vue
<template>
  <div>
    <h2>学生姓名：{{ name | mySlice }}</h2>
    <h2>年龄：{{ age }}</h2>
    <input type="text" v-fbind="age"> <br><br>
    <button @click="showMsg">点我弹窗了</button>
  </div>
</template>

<script>

export default {
  name: 'Student',
  data() {
    return {
      name: 'xiaohuowa',
      age: 18
    }
  },
  methods: {
    showMsg() {
      this.hello()
    }
  }
}
</script>
~~~







### scoped

#### 作用：

让样式在局部生效，防止冲突

#### 写法：

在`style`标签中加上`scoped`即可

`<style scoped>`



#### 注意

style标签还可以加`lang`属性，可以指定是`less`还是`css`，使用less需要有`less-loader`

通过`npm i less-loader`安装



#### 通过npm查询一些包的版本信息

##### 查看webpack版本：

`npm view webpack versions`



##### 查看less-loader版本：

`npm view less-loader versions`





#### 案例

School.vue

~~~vue

<template>
  <div class="school">
    <h2>学校名：{{ name }}</h2>
    <h2 class="haha">地址：{{ addr }}</h2>
  </div>
</template>

<script>

export default {
  name: 'School',
  data() {
    return {
      name: '清华大学',
      addr: '北京'
    }
  },
}
</script>

<style lang="less" scoped>
.school {
  background-color: skyblue;

  .haha {
    font-size: 10px;
    color: red;
  }
}
</style>
~~~





## todoList案例

### 组件化编码流程

1. 拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突
2. 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用
   - 一个组件在用：放在组件自身即可
   - 一些组件在用：放在他们共同的父组件上（==状态提升==）
3. 实现交互：从绑定事件开始
   - 注意：数据在哪里操作数据的方法就在哪里

### `props`适用于

父组件 ==> 子组件 通信

子组件 ==> 父组件 通信（要求父组件先给子组件一个函数，**相当于是父亲提前给儿子个手机，说有事打电话**）



### 注意

使用`v-model`时要切记：`v-model`绑定的值**不能**是`props`传过来的值，因为`props`**是不可以修改的** 

`props`传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但**不推荐这样做**





## webStorage

1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器端通过` Window.sessionStorage `和 `Window.localStorage` 属性来实现本地存储机制。

3. 相关API：

   1. ```xxxxxStorage.setItem('key', 'value');```
      	该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

   2. ```xxxxxStorage.getItem('person');```

      ​		该方法接受一个键名作为参数，返回键名对应的值。

   3. ```xxxxxStorage.removeItem('key');```

      ​		该方法接受一个键名作为参数，并把该键名从存储中删除。

   4. ``` xxxxxStorage.clear()```

      ​		该方法会清空存储中的所有数据。

4. 备注：

   1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
   2. LocalStorage存储的内容，需要手动清除才会消失。
      1. 手动清除1：引导点击某些按钮触发删除
      2. 手动清除2：手动清除浏览器数据
   3. ```xxxxxStorage.getItem(xxx)```如果xxx对应的value获取不到，那么getItem的返回值是null。
   4. ```JSON.parse(null)```的结果依然是null。





## 组件的自定义事件

1. 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（<span style="color:red">事件的回调在A中</span>）。

3. 绑定自定义事件：

   1. 第一种方式，在父组件中：```<Demo @eventName="test"/>```  或 ```<Demo v-on:eventName="test"/>```

   2. 第二种方式，在父组件中：

      - 给子组件`< School ref="school"/> `；`this.$refs.school先拿到子组件实例对象vc ;  .\$on('事件名'，方法)，相当于监听该事件，当事件触发时，执行方法回调(**这种方式可以不用在一开始就给子组件绑定自定义事件**)


      ```js
      <Demo ref="schol"/>
      ......
      methods() {
          test(){
              ......
          }
      },
      mounted(){
         this.$refs.school.$on('eventName',this.test)
      }
      ```

   3. 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。

4. **触发**自定义事件：```this.$emit('eventName',数据)```		

5. **解绑**自定义事件```this.$off('eventName')```

   1. 参数可以写成数组形式表示：解绑数组列举的自定义事件

   2. 参数可以不写，表示：解绑所有自定义事件

6. 组件上也可以绑定原生DOM事件，需要使用```native```修饰符。

   1. 不写`native`的话，即使名字是原生DOM事件，也会被当成是自定义事件

7. 注意：通过```this.$refs.xxx.$on('atguigu',回调)```绑定自定义事件时，回调<span style="color:red">要么配置在methods中</span>，<span style="color:red">要么用箭头函数</span>，否则this指向会出问题！



#### 案例

##### App.vue

~~~vue
<template>
  <div>
    <Student />
    <hr>
    <School v-on:haha.once="getSchoolName" />
    <School @haha="getSchoolName" />
    <hr>
    <School ref="school" />
  </div>
</template>

<script>
import Student from './components/Student'
import School from './components/School'

export default {
  name: 'App',
  components: { Student, School },
  methods: {
    getSchoolName(name) {
      console.log('App接收到 ', name);
    }
  },
  mounted() {
    setTimeout(() => {
      // $once 表示只能触发一次，$on 表示绑定事件，可以触发多次
      this.$refs.school.$once('haha', this.getSchoolName)
    }, 3000);
  },
}
</script>

~~~





##### School.vue

~~~vue
<template>
  <div class="school">
    <h2>学校名：{{ name }}</h2>
    <h2 class="haha">地址：{{ addr }}</h2>
    <h2>n的值为 {{ n }}</h2>
    <button @click="addN">点我n++</button>
    <button @click="sendSchoolName">点我发送学校名给App</button>
    <button @click="endEvent">点我解绑 haha 事件</button>
    <button @click="toDeath">点我销毁School组件实例对象</button>
  </div>
</template>

<script>

export default {
  name: 'School',
  data() {
    return {
      name: '清华大学',
      addr: '北京',
      n: 0
    }
  },
  methods: {
    addN() {
      console.log("addN 方法被调用了");
      this.n++
    },
    sendSchoolName() {
      this.$emit('haha', this.name)
    },
    endEvent() {
      // this.$off('haha') // 只解绑这一个自定义事件
      // this.$off(['haha']) // 通过数组的方式可以解绑多个自定义事件
      this.$off() // 不写形参的方式，自定义事件全部解绑
    },
    toDeath() {
      console.log('寄了');
      this.$destroy()
    }
  }
}
</script>

<style lang="less" scoped>
.school {
  background-color: skyblue;

  .haha {
    font-size: 10px;
    color: red;
  }
}
</style>
~~~



## 全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 安装全局事件总线：

   ```js
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```

3. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods: {
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
        // 以上回调也可以用箭头函数直接写在里面，如下
        // this.$bus.$on('xxxx', () => {.....})
      }
      ```

   2. 提供数据：```this.$bus.$emit('xxxx',数据)```

4. 最好在`beforeDestroy钩子`中，用$off去解绑<span style="color:red">当前组件所用到的</span>事件。



## 消息订阅与发布（pubsub）

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 使用步骤：

   1. 安装pubsub：```npm i pubsub-js```

   2. 引入: ```import pubsub from 'pubsub-js'```

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A组件自身。</span>

      - 注意，订阅消息的回调，**第一个参数是消息名字，第二个参数才是传来的数据**


      ```js
      methods: {
        demo(msgName, data){......}
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }
      ```

   4. 提供数据：```pubsub.publish('xxx',数据)```

   5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(pid)```去<span style="color:red">取消订阅。</span>



## $nextTick

> **这是一个生命周期钩子**
>
> [生命周期](# 八个生命周期)

1. 语法：```this.$nextTick(回调函数)```
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。



#### 优化todoList里的MyItem.vue

点击编辑按钮的时候触发`editItem`方法，此时用到`this.$nextTick`，先渲染页面，再执行

输入框失去焦点时触发`blurEdit`方法

~~~vue
<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @click="change(todo.id)" />
      <span v-show="!todo.isEdit" @dblclick="editItem(todo)">{{ todo.title }}</span>
      <input type="text" v-show="todo.isEdit" :value="todo.title" @keyup.enter="blurEdit(todo, $event)"
        @blur="blurEdit(todo, $event)" ref="titleInputText">
    </label>
    <button class="btn btn-danger" @click="deleteTodo(todo.id)">删除</button>
    <button class="btn btn-edit" v-show="!todo.isEdit" @click="editItem(todo)">编辑</button>
  </li>
</template>

<script>
import pubsub from 'pubsub-js';

export default {
  name: 'MyItem',
  props: ['todo'],
  methods: {
    // 勾选完成单个
    change(id) {
      this.$bus.$emit('changeStatus', id)
    },
    // 删除某个todo
    deleteTodo(id) {
      if (confirm("Are you sure you want to delete")) {
        pubsub.publish('deleteItem', id)
      }
    },
    // 输入框失去焦点，修改title
    blurEdit(todo, e) {
      // console.log(e.target.value);
      todo.isEdit = false;
      if (!e.target.value.trim()) return alert('修改不能为空！')
      this.$bus.$emit('updateItem', todo.id, e.target.value)
    },
    // 点击编辑按钮
    editItem(todo) {
      if (todo.hasOwnProperty('isEdit')) {
        todo.isEdit = true
      } else {
        this.$set(todo, 'isEdit', true)
      }
      // 输入框自动获取焦点
      this.$nextTick(function () {
        this.$refs.titleInputText.focus()
      })
    },
  }
}
</script>
~~~







## Vue封装的过度与动画

1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。

2. 图示：

   - ![image](https://s2.loli.net/2023/10/18/ofwBmXzcxLd5NkS.png) 

3. 写法：

   1. 准备好样式：

      - 元素进入的样式：
        1. `v-enter`：进入的起点
        2. `v-enter-activ`e：进入过程中
        3. `v-enter-to`：进入的终点
      - 元素离开的样式：
        1. `v-leave`：离开的起点
        2. `v-leave-active`：离开过程中
        3. `v-leave-to`：离开的终点
      - 注意：进入起点和离开终点、进入终点和离开起点可以看做是一组来写

   2. 使用```<transition>```包裹要过度的元素，并配置**name**属性：

      ```vue
      <transition name="hello">
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```

   3. 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。



### 自己写动画

~~~vue
<template>
  <div>
    <button @click="isShow = !isShow">显示 / 隐藏</button>
    <transition>
      <h2 v-show="isShow" class="go">你好啊！</h2>
    </transition>
    <transition name="fast" appear>
      <h2 v-show="isShow" class="go">你好啊！（快速版）</h2>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      isShow: true,
    }
  },

}
</script>

<style scoped>
h2 {
  background-color: orange;
}

.v-enter-active {
  animation: comeGo 0.3s
}

.fast-leave-active {
  animation: comeGo 0.3s reverse
}

.fast-enter-active {
  animation: comeGo 1s linear
}

.v-leave-active {
  animation: comeGo 1s linear reverse
}

@keyframes comeGo {
  from {
    transform: translateX(-100%)
  }

  to {
    transform: translateX(0%)
  }
}
</style>
~~~





### 自己写过渡

~~~vue
<template>
  <div>
    <button @click="isShow = !isShow">显示 / 隐藏</button>
    <transition-group>
      <h2 v-show="!isShow" key="1">你好啊！</h2>
      <h2 v-show="isShow" key="2">小火娃！</h2>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'GuoDu',
  data() {
    return {
      isShow: true,
    }
  },

}
</script>

<style scoped>
h2 {
  background-color: orange;
}

/* 进入开始，离开结束 */
.v-enter,
.v-leave-to {
  transform: translateX(-100%);
}

/* 进入结束，离开开始 */
.v-enter-to,
.v-leave {
  transform: translateX(0);
}


/* 进入过渡，离开过渡 */
.v-enter-active,
.v-leave-active {
  transition: 1s linear;
}
</style>
~~~



### 借助第三方库实现动画

> [Animate.css | A cross-browser library of CSS animations.](https://animate.style/)
>
> 安装第三方库：` npm i animate.css `
>
> 使用：直接引用就可以  ` import 'animate.css'`

~~~vue
<template>
  <div>
    <button @click="isShow = !isShow">显示 / 隐藏</button>
    <transition-group name="animate__animated animate__bounce" enter-active-class="animate__lightSpeedInRight"
      leave-active-class="animate__lightSpeedOutLeft">
      <h2 v-show="!isShow" key="1">你好啊！</h2>
      <h2 v-show="isShow" key="2">小火娃！</h2>
    </transition-group>
  </div>
</template>

<script>
import 'animate.css'

export default {
  name: 'GuoDu',
  data() {
    return {
      isShow: true,
    }
  },

}
</script>

<style scoped>
h2 {
  background-color: orange;
}
</style>
~~~







## ue脚手架配置代理

### 方法一

​	在`vue.config.js`中添加如下配置：

```js
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

1. **优点：**配置简单，请求资源时直接发给前端（8080）即可。
2. **缺点：**不能配置多个代理，不能灵活的控制请求是否走代理。
3. **工作方式：**若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （**优先匹配前端资源**）

### 方法二

​	编写`vue.config.js`配置具体代理规则：

```js
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时（表示代理服务器会撒谎了，目标服务器问：你是什么端口的啊？代理服务器会回答和目标一样的端口），服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。





### Demo

`vue.config.js`配置

~~~js
module.exports = {
    lintOnSave: false,
    // 开启代理服务器（方式一）
    /* devServer: {
        proxy: "http://localhost:5000",
    }, */
    // 开启代理服务器（方式二）
    devServer: {
        proxy: {
            "/tt": {
                target: "http://localhost:5000",
                pathRewrite: { "^/tt": "" },
                // ws: true,  // 默认也是true，用于支持websocket
                // changeOrigin: true,  // 默认也是true，表示代理服务器会撒谎
            },
            "/demo": {
                target: "http://localhost:5001",
                pathRewrite: { "^/demo": "" },
                // ws: true,
                // changeOrigin: true,
            },
        },
    },
};

~~~



## vue-resource（了解即可）

vue项目常用的两个Ajax库

1. `axios`：通用的Ajax请求库，官方推荐，效率高
2. `vue-resource`：vue插件库，vue 1.x使用广泛，官方已不维护

下载`vue-resource`库

~~~ 
npm i vue-resource
~~~

使用插件：

~~~js
// 引入插件
import vueResource from "vue-resource";
// 使用插件
Vue.use(vueResource);
~~~

发请求：

~~~js
methods: {
    getUsers(){
        //请求前更新List的数据
        this.$bus.$emit('updateListData',
                        {isLoading:true,errMsg:'',users:[],isFirst:false})
        // 就这里和axios不一样，其他部分都一样
        this.$http.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
            response => {
                console.log('请求成功了')
                //请求成功后更新List的数据
                this.$bus.$emit('updateListData',
                                {isLoading:false,errMsg:'',users:response.data.items})
            },
            error => {
                //请求后更新List的数据
                this.$bus.$emit('updateListData',
                                {isLoading:false,errMsg:error.message,users:[]})
            }
        )
    }
}
~~~





## 插槽

1. 作用：让**父组件**可以**向子组件指定位置**插入**html**结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

   1. 默认插槽：

      ```vue
      父组件中：
              <Category>
                 <div>html结构1</div>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot>插槽默认内容...</slot>
                  </div>
              </template>
      ```

   2. 具名插槽：

      1. 父组件指明放入子组件的哪个插槽`slot="footer"`，如果是**template标签**可以写成`v-slot:footer`，二者是新旧API区别


      ```vue
      父组件中：
              <Category>
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
      
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot name="center">插槽默认内容...</slot>
                     <slot name="footer">插槽默认内容...</slot>
                  </div>
              </template>
      ```

   3. 作用域插槽：

      1. 理解：<span style="color:red">数据在组件（子组件）的自身，但根据数据生成的结构需要组件的使用者（父组件）来决定。</span>（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

      2. 注意：父组件使用插槽的时候一定要用`<template>`标签包裹起来内容，在标签里通过`scope`来获得一个对象，对象内是子组件传来的数据

      3. `slot-scope` 和 `scope` 就是新旧 API 的差别，用哪个都行。

      4. 具体编码：

         ```vue
         父组件中：
         		<Category>
         			<template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
         					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
         
         		<Category>
         			<template slot-scope="scopeData">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
         			</template>
         		</Category>
         
         		<Category>
                     <!-- 解构赋值拿到数据 -->
         			<template slot-scope="{games}">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in games" :key="g">{{g}}</h4>
         			</template>
         		</Category>
         
         
         子组件中：
                 <template>
                     <div>
                         <slot :games="games"></slot>
                     </div>
                 </template>
         		
                 <script>
                     export default {
                         name:'Category',
                         props:['title'],
                         //数据在子组件自身
                         data() {
                             return {
                                 games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                             }
                         },
                     }
                 </script>
         ```

   



## Vuex

### 版本对应关系

vue2中要用vuex的3版本，vue3中要用vuex的4版本。我们现在使用的是vue2所以我们使用 npm i vuex@3来安装。

### 1.概念

​		在Vue中实现**集中式**状态（数据）管理的一个**Vue插件**，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且**适用于任意组件间通信**。

![vuex](https://s2.loli.net/2023/10/18/Htn1reVahINGcYj.png)

### 2.何时使用？

​		多个组件需要共享数据时

### 3.搭建vuex环境

> 在脚手架中会先扫描所有的import按照编写顺序进行编译（优先执行import），所以必须在`store/index.js`里面引入一下Vue，然后使用插件
>
> 这样在`main.js`中只需要引入store即可

1. 创建文件：```src/store/index.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)
   
   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state
   })
   ```

2. 在```main.js```中创建vm时传入```store```配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
   ```

###    4.基本使用

1. 初始化数据、配置```actions```、配置```mutations```，操作文件```store.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
   	jia(context,value){
   		// console.log('actions中的jia被调用了',miniStore,value)
   		context.commit('JIA',value)
   	},
   }
   
   const mutations = {
       //执行加
   	JIA(state,value){
   		// console.log('mutations中的JIA被调用了',state,value)
   		state.sum += value
   	}
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state,
   })
   ```

2. 组件中读取vuex中的数据：```$store.state.sum```

   1. 模板中**不加** this

   2. 在js脚本中要**加 this**

3. 组件中修改vuex中的数据：```$store.dispatch('action中的方法名',数据)``` 或 ```$store.commit('mutations中的方法名',数据)```

   >  备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```





### 5.getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

   1. **注意：**getters里面得写`return`

2. 在```store.js```中追加```getters```配置

   ```js
   ......
   
   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：```$store.getters.bigSum```



### 6.四个map方法的使用

1. <strong>mapState方法：</strong>用于帮助我们映射```state```中的数据为计算属性

   ```js
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
            // 计算属性名字 和 state 里的变量名一致才能用数组形式
       ...mapState(['sum','school','subject']),
   },
   ```

2. <strong>mapGetters方法：</strong>用于帮助我们映射```getters```中的数据为计算属性

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
            // 计算属性名字 和 getters 里的变量名一致才能用数组形式
       ...mapGetters(['bigSum'])
   },
   ```

3. <strong>mapActions方法：</strong>用于帮助我们生成与```actions```对话（dispatch）的方法，即：包含```$store.dispatch(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
            // 方法名字 和 actions 里的函数名一致才能用数组形式
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. <strong>mapMutations方法：</strong>用于帮助我们生成与```mutations```对话（commit）的方法，即：包含```$store.commit(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
            // 方法名字 和 mutations 里的函数名一致才能用数组形式
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> ==备注：==`mapActions`与`mapMutations`使用时，若需要传递参数需要：**在模板中绑定事件时传递好参数**，否则参数是事件对象。



### 7.模块化+命名空间

~~~
new Vuex,Store({
    moudles:{}
})
moudles中的数据保存在 store 的 state 对象中
~~~



1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改```store.js```

   - 通过`namespaced:true`开启命名空间


   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取`state`数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取`getters`数据：

   - ==注意：==因为getters里面是以对象形式存的，所以拿的时候要用key去拿，但是key又不能包含斜杠，所以**要通过中括号的形式拿getters里的数据**


   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用`dispatch`

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用`commit`

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```



#### 改造store的`index.js`

##### count.js

采用默认暴露方式暴露不同文件的配置项

~~~js
export default {
    namespaced: true,
    actions: {
        jiaOdd(context, value) {
            if (context.state.sum % 2) {
                context.commit("JIA", value);
            }
        },
        jiaWait(context, value) {
            setTimeout(() => {
                context.commit("JIA", value);
            }, 1000);
        },
    },
    mutations: {
        JIA(state, value) {
            // console.log("mutations, ", state, value);
            state.sum += value;
        },
        JIAN(state, value) {
            // console.log("mutations, ", state, value);
            state.sum -= value;
        },
    },
    state: { sum: 0, addr: "中国", subject: "Vue" },
    getters: {
        bigSum(context) {
            // console.log(context);
            return context.sum * 2;
        },
    },
};
~~~



##### person.js

~~~js
export default {
    namespaced: true,
    actions: {
        addPersonLin(context, value) {
            if (value.name.indexOf("林") === 0) {
                context.commit("ADD_PERSON", value);
            } else {
                alert("添加的必须姓林");
            }
        },
    },
    mutations: {
        ADD_PERSON(state, value) {
            state.personList.unshift(value);
        },
    },
    state: { personList: [{ id: "001", name: "John" }] },
    getters: {
        getFirstName(context) {
            return context.personList[0].name;
        },
    },
};

~~~



##### index.js

> 通过引入store包下的其他组件的vuex js文件可以实现分文件管理

~~~js
import Vue from "vue";
import Vuex from "vuex";

import countAbout from "./count";
import personAbout from "./person";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        countAbout: countAbout,
        personAbout: personAbout,
    },
});

~~~



 ## 路由

1. 理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。
2. 前端路由：key是路径，value是组件。

### 1.基本使用

1. 安装vue-router，命令：```npm i vue-router```

   - 注意版本对应关系：
     - Vue2对应router3：`npm i vue-router@3`

     - Vue3对应router4：`npm i vue-router`

2. 应用插件：```Vue.use(VueRouter)```

3. 编写router配置项:

   ```js
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入Luyou 组件
   import About from '../components/About'
   import Home from '../components/Home'
   
   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
   	routes:[
   		{
   			path:'/about',
   			component:About
   		},
   		{
   			path:'/home',
   			component:Home
   		}
   	]
   })
   
   //暴露router
   export default router
   ```

4. 实现切换（active-class可配置高亮样式）

   - `<router-link></router-link>`浏览器会被替换为a标签

   - `active-class`可配置高亮样式


   ```vue
   <router-link active-class="active" to="/about">About</router-link>
   ```

5. 指定展示位置

   ```vue
   <router-view></router-view>
   ```

### 2.几个注意点

1. 路由组件通常存放在```pages / views```文件夹，一般组件通常存放在```components```文件夹。
2. 通过切换，“隐藏”了的路由组件，**默认是被销毁掉的**，需要的时候再去挂载。
3. 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
4. 整个应用**只有一个router**，可以通过组件的```$router```属性获取到。
   - `$router`是用来操作路由，`$route`是用来获取路由信息
   - `$router`是VueRouter的一个实例，他包含了所有的路由，包括路由的跳转方法，钩子函数等，也包含一些子对象（例如history）
   - `$route`是一个跳转的路由对象（路由信息对象），每一个路由都会有一个$route对象，是一个局部的对象。


### 3.多级路由（多级路由）

1. 配置路由规则，使用children配置项：

   ```js
   routes:[
   	{
   		path:'/about',
   		component:About,
   	},
   	{
   		path:'/home',
   		component:Home,
   		children:[ //通过children配置子级路由
   			{
   				path:'news', //此处一定不要写：/news
   				component:News
   			},
   			{
   				path:'message',//此处一定不要写：/message
   				component:Message
   			}
   		]
   	}
   ]
   ```

2. 跳转（要写完整路径）：

   ```vue
   <router-link to="/home/news">News</router-link>
   ```

### 4.路由的query参数

> 注意：to前面**要加冒号**，表示参数是js代码

1. 传递参数

   ```vue
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

2. 接收参数：

   ```js
   $route.query.id
   $route.query.title
   ```

### 5.命名路由

1. 作用：可以简化路由的跳转。

   - 路径太长的时候可以起到简化作用

   - 简化后的`to`**一定要配置成对象形式**

2. 如何使用

   1. 给路由命名：

      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                            name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

   2. 简化跳转：

      ```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		   id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```

### 6.路由的params参数

1. 配置路由，声明接收params参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >
       跳转
   </router-link>
   ```

   > 特别注意：路由携带params参数时，若使用to的对象写法，则**不能使用path配置项**，==必须==**使用name配置！**

3. 接收参数：

   ```js
   $route.params.id
   $route.params.title
   ```

### 7.路由的props配置

​	作用：让路由组件更方便的收到参数

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件（因为传递的是死数据，所以用得少）
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件（功能强大，params 和 query 传的参数都可以用props接收）
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

### 8.```<router-link>```的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```
   1. ```push```是追加历史记录
   2. ```replace```是替换当前记录（只是替换了当前的，当前的前面那些记录不会受到影响）。路由跳转时候默认为```push```

3. 如何开启```replace```模式：
   - 正常写法：`<router-link :replace="true" ...>News</router-link>`
   - 简写：`<router-link replace ...>News</router-link>`


总结：浏览记录本质是一个栈，默认push，点开新页面就会在栈顶追加一个地址。后退，栈顶指针向下移动。改为replace就是不追加，而将当前栈顶地址替换

### 9.编程式路由导航



1. 作用：不借助```<router-link> ```实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```js
   //$router的两个API
   this.$router.push({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.replace({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退
   ```

### 10.缓存路由组件

切换一个组件原来的组件就会被销毁

- `include`表示缓存的组件，在展示组件的`<router-view></router-view>`标签的外侧包裹
- `exclude` 意思 除了这些组件，其他的保持挂载。

这里的 `include` 和 `exclude` 是组件中的`name`

要写多个可以写`:include='['News', 'Person']'`

1. 缓存路由组件作用：让不展示的路由组件保持挂载，不被销毁。

2. 具体编码：

   ```vue
   <keep-alive include="News"> 
       <router-view></router-view>
   </keep-alive>
   ```

### 11.两个新的生命周期钩子

[生命周期](# 八个生命周期)

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 注意：要使用这两个钩子一定要保证在组件展示位置`<router-view></router-view>`外面使用了缓存标签，对当前组件保持挂载才行！
   - activated和deactivated是配合keep-alive一起使用的
     activated和deactivated没有keep-alive的时候是不会被触发的
     在存在keep-alive的时候可以将activated当作created进行使用
     deactivated是组件销毁的时候触发，此时的destory是不执行的

3. 具体名字：
   1. ```activated```路由组件被激活时触发。
   2. ```deactivated```路由组件失活时触发。

### 12.路由守卫

> 1、前置路由守卫 => 组件内路由守卫beforeRouterEnter  => 后置路由守卫 =>
>
> 2、=> 已挂载mounted (如果有缓存机制就只执行一次)=> 组件被激活activated => 组件内路由守卫beforeRouterLeave

1. 作用：对路由进行权限控制

2. 分类：全局守卫、独享守卫、组件内守卫

3. 全局守卫:

   - > 在 `route`配置中的 `meta` 是路由的**元数据**，可以自定义一些数据放进meta中，比如说是否需要权限校验、页签标题等等，用于后续的判断。
     >
     > beforeEach有三个参数，to表示要跳转到的路由组件，from表示当前的路由组件，next表示进行跳转命令。
     >
     > afterEach中没有 next 了，因为到达后置路由意味着，前置路由的判断一定通过了


   ```js
   //全局前置守卫：初始化时执行、每次路由切换前执行
   router.beforeEach((to,from,next)=>{
   	console.log('beforeEach',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
   			next() //放行
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next() //放行
   	}
   })
   
   //全局后置守卫：初始化时执行、每次路由切换后执行
   router.afterEach((to,from)=>{
   	console.log('afterEach',to,from)
   	if(to.meta.title){ 
   		document.title = to.meta.title //修改网页的title
   	}else{
   		document.title = 'vue_test'
   	}
   })
   ```

4. 独享守卫:

   - > 独享路由守卫**没有后置**
     >
     > 要想对某个路由进行限制，在路由里面写一个单独的路由守卫称为`beforeEnter(to,from,next)`,剩下的逻辑与`beforeEach`一样 

     


   ```js
   beforeEnter(to,from,next){
   	console.log('beforeEnter',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){
   			next()
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next()
   	}
   }
   ```

5. 组件内守卫：

   - > 前面的全局后置守卫是路由切换后被调用，这里组件内的离开守卫是离开该组件时调用，注意这个区别。

   ```js
   //进入守卫：通过路由规则，进入该组件时被调用
   beforeRouteEnter (to, from, next) {
   },
   //离开守卫：通过路由规则，离开该组件时被调用
   beforeRouteLeave (to, from, next) {
   }
   ```


### 13.路由器的两种工作模式



1. 对于一个url来说，什么是hash值？
   -  #及其后面的内容就是hash值。
2. `hash值`不会包含在 `HTTP 请求`中，即：**hash值不会带给服务器**。
3. hash模式：
   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
4. history模式：
   1. 地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。





## UI组件库

































