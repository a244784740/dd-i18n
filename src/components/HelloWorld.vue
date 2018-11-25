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
