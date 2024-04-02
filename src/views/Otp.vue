<template>
    <main>
	


    <!-- =======================
    About START -->
    <section class="pb-0 pb-xl-5">
        <div class="container">
            <div class="row g-4 justify-content-between align-items-center">
    
    
                <!-- Right side START -->
                <div class="col-lg-12">
                    <h2 class="mb-3 mb-lg-5">کد تایید</h2>
        
                    <!-- Features START -->
                    <div class="col-12">
                        <form class="row g-3">
                      
    
                            <!-- Name -->
                            <div class="col-md-6">
                                <label class="form-label"> کد تایید<span class="text-danger">*</span></label>
                                <input type="number" class="form-control" v-model="registerData.otp" placeholder="کد تایید ارسال شده را وارد کنید">
                            </div>

                            <div v-if="codeTimer != 0">
                                <p class="text-gray-700 text-sm"> ارسال مجدد کد تایید تا <span class="text-pink-600 mx-2 !text-md">{{ codeTimer }}</span> ثانیه دیگر </p>
                            </div>
                            <div>
                                <button
                                type="button"
                                v-if="codeTimer == 0"
                                @click="resendOtpLoading == false ? doResendOtp() : ''"
                                class="btn btn-primary btn-sm " style="width:200px;"
                            >
                                {{ resendOtpLoading == false ? 'ارسال مجدد کد تایید' : 'در حال ارسال ...' }}
                            </button>
                            </div>

    
                            <div>
                                <span>آیا شماره همراهتان اشتباه است؟</span>
                                <span>
                                    <router-link to="/register">ویرایش  کنید</router-link>
                                </span>
                            </div>
                        
    
                     
    
                            <!-- Button -->
                            <div class="col-12 text-end">
                                <a href="javascript:void(0)" v-if="loading == false" class="btn btn-primary mb-0" @click="doLogin()"> ارسال کد  </a>
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
import { ref , reactive , onMounted } from 'vue'
import {useCookies} from 'vue3-cookies'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const loading = ref(false)
const codeTimer = ref(180)
let timerInterval;
const resendOtpLoading = ref(false)
const {cookies} = useCookies()
const store = useStore()
const $toast = useToast();

const router = useRouter()
const userMobile = cookies.get("mobile")


const registerData = reactive({
    otp: null
})

const intervalFunction = () => {
    if(codeTimer.value <= 0) {
      codeTimer.value = 0
      clearInterval(timerInterval)
      return false
    }else{
      codeTimer.value--
    }
  }

  const setGlobalInterVal = () => {
    timerInterval = setInterval(intervalFunction , 1000)
  }


  onMounted(() => {
    setGlobalInterVal()
  })

const doLogin = async () => {
    if(registerData.otp != null && userMobile != null){
        loading.value = true
        const loginData = {
            otp: registerData.otp,
            mobile: userMobile
        }
        
        const snedForRegister = await store.dispatch("verify_otp_code_and_register" , loginData)
        if(snedForRegister.statusCode == 100 || snedForRegister.statusCode == 101){
            loading.value = false
            $toast.error(snedForRegister.statusMessage , {
                position: "top-left"
            });
        }else if(snedForRegister.statusCode == 200){
            loading.value = false
            cookies.set("UToken" , snedForRegister.access_token , 60*60*24 , "/");
            $toast.success("ثبت نام شما با موفقیت انجام شد" , {
                position: "top-left"
            });
            router.push("/userpanel")
        }else{
            loading.value = false
            $toast.error("خطایی رخ داده" , {
                position: "top-left"
            });
        }
    }else{
        loading.value = false
        $toast.error("کد تایید نمیتواند خالی باشد" , {
            position: "top-left"
        });
    }
}


const doResendOtp = async () => {
    if(userMobile != null){
      resendOtpLoading.value = true
      const sendOtp = await store.dispatch("send_otp" , {mobile: userMobile})
      if(sendOtp.statusCode == 200){
        resendOtpLoading.value = false
        codeTimer.value = 180
        
        setGlobalInterVal()
      }
    }else{
      router.push("/register")
    }
}

</script>