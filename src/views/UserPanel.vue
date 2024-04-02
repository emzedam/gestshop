<template>
  <div id="wrapper" v-if="levelCode != null">
    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
        <label for="bank_name" class="ps-3">انتخاب بانک</label>
      <div class="ps-3 d-flex ">
        <select class="me-3" style="width:200px;cursor:pointer;" v-model="bankName">
          <option :value="null">انتخاب کنید</option>
          <option :value="bank.name" v-for="(bank , index) in banksList" :key="index">{{ bank.name }}</option>
        </select>
        <div class="mt-2" v-if="bankName != null">
            <h5>درخواست از  {{ bankName }}</h5>
        </div>
      </div>
      <div id="content">
        <div class="w-100 mt-4 px-4" v-if="formDownloadData != null && bankName != null">
          <a :href="`https://api.gestshop.ir/storage/form_file/${formDownloadData.file_name}`" target="_blank" class="btn btn-primary btn-lg text-center rounded">دانلود فرم</a>
        </div> 
        

        <!-- Begin Page Content -->
        <!-- <div class="container-fluid mt-4">
          <div class="col alert alert-success d-none" role="alert">
            اطلاعات شما تایید شده
          </div> -->
          

          
        <!-- </div> -->

        <!-- Begin Page Content -->
        <div class="container-fluid mt-4">
          <!-- DataTales Example -->
          <createMadarek 
          :bankName="bankName"
          v-if="bankName != null && levelCode.code == 1 && levelCode.state == 'create'" />
          <editMadarek 
          :bankName="bankName"
          v-if="bankName != null && levelCode.code == 1 && levelCode.state == 'update'" :requestData="levelCode.data" />
          <!-- /.container-fluid -->

          

          <createCheck v-if="levelCode.code == 2 && levelCode.state == 'create'" />
          <editCheck v-if="levelCode.code == 2 && levelCode.state == 'update'" :requestData="levelCode.data" />
         

          <div v-if="levelCode.code == 3 && levelCode.state == 'payment'" class="d-flex align-items-center justify-content-center flex-column my-5 rounded-lg border py-5">
            <p>  پرداخت مبلغ ریال 30,000,000</p>
            <button v-if="requestLoading == false" @click="payToMadrak()" class="btn btn-md btn-success" >اتصال به درگاه پرداخت</button>
            <button v-else class="btn btn-md btn-success" >در حال اتصال ... </button>
          </div>
         
          <formuploads v-if="levelCode.code == 4 && levelCode.state == 'create'" />
          <formUploadUpdate v-if="levelCode.code == 4 && levelCode.state == 'update'" :requestData="levelCode.data" />
        </div>
      </div>
    </div>
    <!-- End of Content Wrapper -->
  </div>
</template>

<script setup>
import formuploads from '@/components/userpanel/requestForms/formuploads.vue'
import formUploadUpdate from '@/components/userpanel/requestForms/formUploadUpdate.vue'
import createMadarek from '@/components/userpanel/requestForms/createMadarek.vue'
import editMadarek from '@/components/userpanel/requestForms/editMadarek.vue'
import createCheck from '@/components/userpanel/requestForms/createCheck.vue'
import editCheck from '@/components/userpanel/requestForms/editCheck.vue'

import {ref , reactive , onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { useCookies } from "vue3-cookies";
const bankName = ref(null)


const store = useStore();
const $toast = useToast();
const { cookies } = useCookies();
const levelCode = reactive({
  code: null,
  state: null,
  data: null
})
const banksList = reactive([
  {
      id: 1,
      name: "مای چک"
  },
  {
      id: 2,
      name: "نیوقسط"
  },
  {
      id: 3,
      name: "گسترش"
  },
  {
      id: 4,
      name: "گلرنگ"
  },
  {
      id: 5,
      name: "پایا"
  },
  {
      id: 6,
      name: "آشنا"
  },
  {
      id: 7,
      name: "حکمت"
  },
  {
      id: 8,
      name: "سامان"
  },
  {
      id: 9,
      name: "طراوت"
  },
  {
      id: 10,
      name: "بانک مهر"
  },
  {
      id: 11,
      name: "بانک رسالت"
  },
  {
      id: 12,
      name: "تامین اجتماعی"
  },
  {
      id: 13,
      name: "لندوکارت"
  }
])

const router = useRouter()


const requestLoading = ref(false)


const formDownloadData = ref(null)


onMounted(async () => {
  bankName.value = cookies.get("requested-bank")
  const get_level_request = await store.dispatch("get_level_request", 
  {
    token: cookies.get("UToken"),
    bank_name: cookies.get("requested-bank")
  })
  if(get_level_request.statusCode == 200){
    levelCode.code = get_level_request.statusMessage
    levelCode.state = get_level_request.state
    levelCode.data = get_level_request.data
  }else{
    levelCode.value = null
    router.push("/")
  }

  await get_downloaded_form()
})


const get_downloaded_form = async () => {
  const downloadedForm = await store.dispatch("get_downloaded_form" , {utoken: cookies.get("UToken")})
  if(downloadedForm.statusCode == 200){
    if(downloadedForm.form != null){
      formDownloadData.value = downloadedForm.form
    }else{
      formDownloadData.value = null
    }
  }
}

const payToMadrak = async () => {
  requestLoading.value = true
  const do_user_send_request = await store.dispatch("pay_to_bank" , {token: cookies.get("UToken")})
  if(do_user_send_request.statusCode == 200){
    requestLoading.value = false

    $toast.success(
      "اتصال با موفقیت انجام شد",
      {
        position: "top-left",
      }
    );

    window.location.href = do_user_send_request.location+do_user_send_request.authority;
  }else{
    requestLoading.value = false
    $toast.error(
      do_user_send_request.statusMessage,
      {
        position: "top-left",
      }
    );
  }
}




</script>
