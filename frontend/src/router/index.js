import { createRouter, createWebHistory } from 'vue-router'
import store from "../store/index";
import Home from '../views/Home.vue'
import sinup from "../views/sinup.vue";
import user from "../views/user.vue";
import postUser from "../components/userComopo/postUser.vue";
import allLike from "../components/userComopo/allLike.vue";
import allDisLike from "../components/userComopo/allDisLike.vue";
import allinfo from "../components/userComopo/allinfo.vue";
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title:"Home"
    }
  },{
    path: '/sinup',
    name: 'sinup',
    component: sinup,
    meta:{
      title:"sinup"
    },

  },{
    path: '/user',
    name: 'user',
    component: user,
    meta:{
      title:"user"
    },
    children:[{
      path:"/user",
      component:postUser,
      name:'postUser',
      props:{destination:"envoyer"}
    },{
      path:"/user", 
      component:allLike,
      name:'allLike',
      props:{destination:"aimé"}
    },{
      path:"/user",
      component:allDisLike,
      name:'allDisLike',
      props:{destination:"pas aimer"}
    },{
      path:"/user",
      component:allinfo,
      name:'allinfo',
    }]
    
  },
  {
     path: '/:pathMatch(.*)', redirect: '/' 
    
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.afterEach((to)=>{
  if (to.path == "/user" && store.state.login == false) {
    router.push('/sinup')
  }
  if (to.path == "/" && store.state.login == false) {
    router.push('/sinup')
  }
})
export default router
