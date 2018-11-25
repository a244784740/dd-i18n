# dd-i18n
English | [简体中文](./README_zh.md)
# use
```
npm i dd-i18n

import DI18n from 'dd-i18n';

var di18n = new DI18n({
  // System current language
  local: 'zh-CN',
  // Default language for translation
  defaultLang: 'zh-CN',
  // Language pack
  messages
})
```
## dd-i18n Analysis
* dl:According to the incoming string, get the corresponding translation. If the language package is not set, return the incoming string.

* dEvent:Global observer method object

   * dEvent.trigger make an announcement  
   ```
   this.dEvent.trigger('lang','en');
   ```
   * dEvent.listen Subscription message
   ```
   this.dEvent.listen('lang',msg => {
        console.log(msg);  // Print en
  });
   ```
## Language pack format
```
var messages = {
  'zh-CN': {
      helloWorld: '你好世界',
      youtoo: {
          msg: '你也是'
      },
      this: {
          di18n:{
              trans: '国际化翻译'
          }
      },
      list: {
          today: '今天',
          acquired: '后天',
          time: '时间'
      }
  }, 
  'zh-HK': {
      helloWorld: '你好世界',
      youtoo: {
          msg: '你也是'
      },
      this: {
          di18n:{
              trans: '國際化翻譯'
          }
      },
      list: {
          today: '今天',
          acquired: '後天',
          time: '時間'
      }
  }, 
  'en': {
      helloWorld: 'Hello world',
      youtoo: {
          msg: 'You too'
      },
      this: {
          di18n:{
              trans: 'International translation'
          }
      },
      list: {
          today: 'today',
          acquired: 'acquired',
          time: 'time'
      }
  }
}
```

## js Use in

```
var di18n = new DI18n({
  // System current language
  local: 'zh-CN',
  // Default language for translation
  defaultLang: 'zh-CN',
  // Language pack
  messages
})
// Set the current system language
di18n.local = 'en'; 
console.log(di18n.dl('你好世界'));//Hello world

```


## Use in vue

### main.js
```
Vue.prototype.$di18n = di18n;
Vue.prototype.dl = di18n.dl;
Vue.prototype.dEvent = di18n.dEvent;
```
### Hello.vue
```
// Usage in the template
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <span>{{dl('国际化翻译')}}</span>
    </div>
    <br><br>
    <ul>
      <li v-for="item in list" :key="item.id">
        {{item.name}}
      </li>
    </ul>

    <div>
      <el-radio-group v-model="lang">
        <el-radio :label="'zh-CN'">中文-简体</el-radio>
        <el-radio :label="'en'">英语</el-radio>
        <el-radio :label="'zh-HK'">中文-繁体</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: this.dl('你好世界'),
      lang: 'zh-CN',
      list: [
        {
          id: 1,
          name: this.dl('今天'),
          flag: true
        },
        {
          id: 2,
          name: this.dl('后天'),
          flag: false
        },
        {
          id:3,
          name: this.dl('时间'),
          flag: true
        }
      ]
    }
  },
  mounted() {
    // Subscription message
    this.dEvent.listen('lang', msg => {
      this.msg = this.dl('你好世界');
      this.list = [
        {
          id: 1,
          name: this.dl('今天'),
          flag: true
        },
        {
          id: 2,
          name: this.dl('后天'),
          flag: false
        },
        {
          id:3,
          name: this.dl('时间'),
          flag: true
        }
      ];
    })
  },
  watch:{
    lang:function(newLang,oldLang) {

      this.$di18n.local = newLang;
      // make an announcement
      this.dEvent.trigger('lang',newLang);
    }
  }
}
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```

