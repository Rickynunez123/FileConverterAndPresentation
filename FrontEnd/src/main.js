import { createApp } from "vue";
import App from "./App.vue";
import naive from "naive-ui";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import router from "./router";
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

AOS.init({
    duration: 500,
    easing: 'ease-in-out-sine'
  });

  

app
.use(AOS)
.use(naive)
.use(Antd)
.use(router)
.mount('#app')
