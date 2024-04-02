<template>
    <main>
	


    <!-- =======================
    About START -->
    <section class="pb-0 pb-xl-5">
        <div class="container">
            <div class="row g-4 justify-content-between align-items-center">
    
    
                <!-- Right side START -->
                <div class="col-lg-12">
                    <h2 class="mb-3 mb-lg-5"> ورود به پنل مدیریت </h2>
        
                    <!-- Features START -->
                    <div class="col-12">
                        <form class="row g-3">
                      
                            <!-- Mobile -->
                            <div class="col-md-6">
                                <label class="form-label">نام کاربری <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" v-model="loginData.username" placeholder="نام کاربری خود را وارد کنید">
                            </div>
    
                     
    
                            <!-- Date of birth -->
                            <div class="col-md-6">
                                <label class="form-label"> گذرواژه<span class="text-danger">*</span></label>
                                <input type="password" class="form-control" v-model="loginData.password" placeholder="گذرواژه را وارد کنید" >
                            </div>

    
                        
                            <!-- Button -->
                            <div class="col-12 text-end">
                                <a href="javascript:void(0)" v-if="loading == false" class="btn btn-primary mb-0" @click="doLogin()">  ورود </a>
                                <a href="javascript:void(0)" v-if="loading == true" class="btn btn-primary mb-0">در حال ارسال ...</a>
                            </div>
                        </form>
                    
                    </div>
                    <!-- Features END -->
    
                </div>
                <!-- Right side END -->
            </div>
        </div>
    </section>
    <!-- =======================
    About END -->
    
    
    
    
    
    
    
    
    <!-- =======================
    Download app START -->
    <DownloadApp />
    <!-- =======================
    Download app END -->
    
    </main>
</template>

<script setup>
import DownloadApp from '@/components/content/DownloadApp.vue'
import {ref , reactive} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import {useCookies} from 'vue3-cookies'


const router = useRouter()
const store = useStore()
const $toast = useToast()
const {cookies} = useCookies()

const loginData = reactive({
    username: null,
    password: null
})

const loading = ref(false)

const doLogin = async () => {
    if(loginData.username != null && loginData.password != null){
        loading.value = true
        const sendDataForLogin = await store.dispatch("admin_login_with_password" , loginData);
        if(sendDataForLogin.statusCode == 101 || sendDataForLogin.statusCode == 102 || sendDataForLogin.statusCode == 103 || sendDataForLogin.statusCode == 401){
            loading.value = false
            $toast.error(sendDataForLogin.statusMessage , {
                position: "top-left"
            })
        }else if(sendDataForLogin.statusCode == 200){
            loading.value = false
            cookies.set("AToken" , sendDataForLogin.access_token , 60*60*24 , "/")
            $toast.success("به پنل مدیریت  قسط شاپ خوش آمدید" , {
                position: "top-left"
            })

            router.push("/admin/panel")
        }else{
            loading.value = false
            $toast.error("خطایی رخ داده" , {
                position: "top-left"
            })
        }
    }else{
        $toast.error("لطفا با دقت همه فیلد هارا پر کنید" , {
            position: "top-left"
        })
    }
}

</script>