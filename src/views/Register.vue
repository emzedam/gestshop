<template>
    <main>
	


    <!-- =======================
    About START -->
    <section class="pb-0 pb-xl-5">
        <div class="container">
            <div class="row g-4 justify-content-between align-items-center">
    
    
                <!-- Right side START -->
                <div class="col-lg-12">
                    <h2 class="mb-3 mb-lg-5">ثبت نام</h2>
        
                    <!-- Features START -->
                    <div class="col-12">
                        <form class="row g-3">
                      
    
                            <!-- Name -->
                            <div class="col-md-6">
                                <label class="form-label">نام و نام خانوادگی<span class="text-danger">*</span></label>
                                <input type="text" class="form-control" v-model="registerData.name" placeholder="نام و نام خانوادگی را وارد کنید">
                            </div>
    
                            <!-- Mobile -->
                            <div class="col-md-6">
                                <label class="form-label">موبایل <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" v-model="registerData.mobile" placeholder="شماره موبایل را وارد کنید">
                            </div>
    
                     
    
                            <!-- Date of birth -->
                            <div class="col-md-6">
                                <label class="form-label">کد ملی<span class="text-danger">*</span></label>
                                <input type="text" class="form-control" v-model="registerData.codemelli" placeholder="کد ملی را وارد کنید" >
                            </div>

                            <div class="col-md-6">
                                <label class="form-label"> گذرواژه<span class="text-danger">*</span></label>
                                <input type="password" class="form-control" v-model="registerData.password" placeholder="گذرواژه  را وارد کنید" >
                            </div>
    
                            <div class="col-md-6">
                                <label class="form-label">کد نمایندگی<span class="text-danger ms-2">(اختیاری)</span></label>
                                <input type="text" class="form-control" v-model="registerData.reseller_code" placeholder="کد نمایندگی را وارد کنید" >
                            </div>

                            <div>
                                <span>آیا از قبل ثبت نام کردید ؟</span>
                                <span>
                                    <router-link to="/login">ورود  کنید</router-link>
                                </span>
                            </div>
                        
    
                     
    
                            <!-- Button -->
                            <div class="col-12 text-end">
                                <a href="javascript:void(0)" v-if="loading == false" class="btn btn-primary mb-0" @click="doRegister()"> ثبت نام </a>
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
import {ref , reactive , onMounted} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import {useCookies} from 'vue3-cookies'

const $toast = useToast();
const router = useRouter();
const {cookies} = useCookies()
const store = useStore();
const loading = ref(false);

const registerData = reactive({
    name: null,
    mobile: null,
    codemelli: null,
    password: null,
    reseller_code: null
})


const doRegister = async () => {
    loading.value = true
    
    const sendOtpForRegister = await store.dispatch("send_otp" , registerData)
    if(sendOtpForRegister.statusCode == 200){
        cookies.set("mobile" , sendOtpForRegister.mobile , 3600 , "/");
        loading.value = false
        router.push("/otp")
        $toast.success(sendOtpForRegister.statusMessage , {
            position: "top-left"
        });
    }else if(sendOtpForRegister.statusCode == 100){
        loading.value = false
        $toast.error(sendOtpForRegister.statusMessage , {
            position: "top-left"
        });
    }else{
        loading.value = false
        $toast.error(sendOtpForRegister.statusMessage , {
            position: "top-left"
        });
    }
}






</script>