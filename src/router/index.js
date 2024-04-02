import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Otp from '../views/Otp.vue'
import UserPanel from '../views/UserPanel.vue'
import PayOk from '../views/PayOk.vue'

// admin panel
import AdminPanel from '../views/adminpanel/adminPanel.vue'
import AdminLogin from '../views/adminpanel/adminLogin.vue'
import AdminPanelCredentials from '../views/adminpanel/credentials.vue'
import AdminPanelCredentialDetails from '../views/adminpanel/details.vue'
import AdminFailedRequests from '../views/adminpanel/failedRequests.vue'
import AdminVerifiedRequests from '../views/adminpanel/verifiedRequests.vue'

import store from '@/stores'
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import api from '@/axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        guestAuth: true
      }
    },
    {
      path: '/otp',
      name: 'otp',
      component: Otp,
      meta: {
        guestAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guestAuth: true
      }
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: About,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/userpanel',
      name: 'userpanel',
      component: UserPanel,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/payok',
      name: 'payok',
      component: PayOk,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/admin/panel',
      name: 'adminpanel',
      component: AdminPanel,
      meta: {
        require_admin_auth: true,
        layout: 'adminpanel'
      }
    },
    {
      path: '/admin/login',
      name: 'adminlogin',
      component: AdminLogin,
      meta: {
        guest_admin_auth: true,
      }
    },
    {
      path: '/admin/requests',
      name: 'adminpanelrequests',
      component: AdminPanelCredentials,
      meta: {
        require_admin_auth: true,
        layout: 'adminpanel'
      }
    },
    {
      path: '/admin/details/:id',
      name: 'adminrequestdetails',
      component: AdminPanelCredentialDetails,
      meta: {
        require_admin_auth: true,
        layout: 'adminpanel'
      }
    },
    {
      path: '/admin/requests/verified',
      name: 'adminrequestverified',
      component: AdminVerifiedRequests,
      meta: {
        require_admin_auth: true,
        layout: 'adminpanel'
      }
    },
    {
      path: '/admin/requests/failed',
      name: 'adminrequestfailed',
      component: AdminFailedRequests,
      meta: {
        require_admin_auth: true,
        layout: 'adminpanel'
      }
    }
  ]
})





router.beforeEach(async (to, from) => {
  

  if (cookies.get('UToken') != null) {
    const authuser = await api.post('/users/me', {}, {
        headers: { Authorization: "Bearer " + cookies.get('UToken') }
    }).catch((error) => {
      if(error.response.status == 401){
        return { name: 'login' }
      }
    })

   
    if (authuser.data) {
      if (Object.keys(authuser.data).length != 0) {
        await store.commit('set_user_info_with_token', authuser.data)
      }
    }
    
    
  }


  if (cookies.get('AToken') != null) {
    const authadmin = await api.post('/admins/me', {}, {
        headers: { Authorization: "Bearer " + cookies.get('AToken') }
    }).catch((error) => {
      if(error.response.status == 401){
        return { name: 'adminlogin' }
      }
    })

   
    if (authadmin.data) {
      if (Object.keys(authadmin.data).length != 0) {
        await store.commit('set_admin_info_with_token', authadmin.data)
      }
    }
  }



  // See if any of the matched routes has meta "requiresAuth"
  if (to.meta.require_admin_auth && store.getters.get_authadmin == null) {
    return { name: 'adminlogin' }
  }else if(to.meta.guest_admin_auth && store.getters.get_authadmin != null){
    return { name: 'adminpanel' }
  }

  if (to.meta.requiresAuth && store.getters.get_authuser == null) {
    return { name: 'login' }
  }else if(to.meta.guestAuth && store.getters.get_authuser != null){
    return { name: 'userpanel' }
  }

 
});

export default router
