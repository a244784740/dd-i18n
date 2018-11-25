// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import DI18n from 'dd-i18n';
import messages from './language';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


var di18n = new DI18n({
  // 当前语言
  local: 'zh-CN',
  // 默认语言
  defaultLang: 'zh-CN',
  // 语言包
  messages
})

Vue.prototype.$di18n = di18n;
Vue.prototype.dl = di18n.dl;
Vue.prototype.dEvent = di18n.dEvent;

di18n.local = 'en';
console.log(di18n.dl('你好世界'));
di18n.local = 'zh-CN';

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
