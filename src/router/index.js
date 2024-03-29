import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthStore from '../store-cold/auth/index.js'

// Routes
import Museums from '../views/Museums.vue'
import Home from '../views/Home/Home.vue'
import Usuaris from '../views/Usuaris.vue'
import AddMuseum from '../views/AddMuseum.vue'
import Login from '../views/Login/Login.vue'
import Expositions from '../views/Expositions.vue'
import Obres from '../views/Obres.vue'
import AddExpo from '../views/AddExposition.vue'
import AddObra from '../views/AddObra.vue'
import ObraEdit from '../views/ObraEdit.vue'
import ExpoEdit from '../views/ExpoEdit.vue'
import MuseumEdit from '../views/MuseumEdit.vue'
import InfoUser from '../views/InfoUser.vue'
import Quizzes from '../views/Quizzes.vue'
import AddQuizz from '../views/AddQuizz.vue'
import EditQuizz from '../views/EditQuizz.vue'
Vue.use(VueRouter)

const ifAuthenticated = (to, from, next) => {
  if (AuthStore.isAuthenticated()) {
    next()
    return
  }
  AuthStore.clearAuthData();
  next('/login');
  next()
  return
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/usuaris',
    name: 'Usuaris',
    component: Usuaris,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/usuaris/:userId',
    name: 'InfoUser',
    component: InfoUser,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/museums',
    name: 'Museums',
    component: Museums,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/museums/add',
    name: 'AddMuseum',
    component: AddMuseum,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/museums/:id_museu/edit',
    name: 'MuseumEdit',
    component: MuseumEdit,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/museums/:id_museu',
    name: 'expositions',
    component: Expositions,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/museums/:id_museu/:id_exposition/edit',
    name: 'ExpoEdit',
    component: ExpoEdit,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/museums/:id_museu/:id_exposition',
    name: 'obres',
    component: Obres,
    beforeEnter: ifAuthenticated,
  },
  {
  path: '/museums/:id_museu/add',
  name: 'AddExpo',
  component: AddExpo,
  beforeEnter: ifAuthenticated,
  },
  {
    path: '/museums/:id_museu/:id_exposition/add',
    name: 'AddObra',
    component: AddObra,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/museums/:id_museu/:id_exposition/:id_obra/edit',
    name: 'ObraEdit',
    component: ObraEdit,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/quizzes',
    name: 'Quizzes',
    component: Quizzes,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/quizzes/add',
    name: 'AddQuizz',
    component: AddQuizz,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/quizzes/:id_quizz',
    name: 'EditQuizz',
    component: EditQuizz,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
