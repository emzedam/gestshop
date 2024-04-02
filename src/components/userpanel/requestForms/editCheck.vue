<template>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">چک های اپلود شده</h6>
    </div>
    <div class="card-body mr-3" v-if="requestData.uploaded_checks.length != 0">
      <div class="alert alert-danger text-center" v-if="requestData.desc_state != null">
        {{ requestData.desc_state }}
      </div>
      <div class="alert alert-warning text-center" v-if="requestData.state == 0 && requestData.checkha != null">
      لطفا منتظر اعلام نتیجه درخواست از سمت مدیریت بمانید
      </div>
      <div class="row">

        <div class="col-lg-6 col-md-6" v-for="(check , index) in requestData.uploaded_checks" :key="index">
          <label :for="check.date" class="text-dark">{{ check.title }}
            <span class="btn btn-xs btn-danger" v-if="check.file == null">انتخاب نشده</span>
            <span class="btn btn-xs btn-success" v-if="check.file != null">انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                آپلود
              </span>
            </div>
            <input
              :id="check.date"
              type="file"
              class="form-control "
              ref="checkfiles"
              @change="(e) => onChangeCheckFiles(e , index)"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
          <div class="">
            <span class="fw-bold font-weight-bold text-dark">تاریخ چک :</span
            ><span>{{ check.date }}</span>
          </div>
          <div class="">
            <span class="fw-bold font-weight-bold text-dark">مبلغ چک :</span
            ><span>{{ rial_separate(check.amount) }} ريال</span>
          </div>
        </div>

      </div>

      <div class="col-lg-12 pt-3 gap-6 d-flex">
        <button v-if="uploadState == false" class="bg-success p-3 border-0 text-white ml-2" @click="doUploadChecks()">ثبت</button>
        <button v-if="uploadState == true" class="bg-success p-3 border-0 text-white ml-2" >در حال ارسال ...</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {onMounted , ref} from 'vue'
  import { useToast } from "vue-toast-notification";
  import "vue-toast-notification/dist/theme-sugar.css";
  import { useCookies } from "vue3-cookies";
  import { useStore } from "vuex";

  const store = useStore();
  const { cookies } = useCookies();
  const props = defineProps(['requestData'])
  const uploadState = ref(false)
  const $toast = useToast();
  const checkfiles = ref(null)

  onMounted(() => {
    console.log(props.requestData)
  })

  const rial_separate = (Number) => {
    Number += "";
    Number = Number.replace(",", "");
    let x = Number.split(".");
    let y = x[0];
    let z = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
    return y + z;
  }


  const onChangeCheckFiles = async (e , index) => {
    const mimtypes = ["image/png" , "image/jpg" , "image/jpeg"];
    if(mimtypes.includes(e.target.files[0].type)){
      props.requestData.uploaded_checks[index].file = e.target.files[0]
      props.requestData.uploaded_checks[index].index = index
    }else{
      props.requestData.uploaded_checks[index].file = null
      e.target.value = ''
      $toast.error(
        "پسوند فایل انتخابی غیر مجاز میباشد",
        {
          position: "top-left",
        }
      );
    }

  }

  const isAllowToUpload = () => {
    let result = false;
    props.requestData.uploaded_checks.forEach((val , index) => {
      if(val.file != null){
        result = true
      }
    })

    return result
  }

  const doUploadChecks = async (index) => {
    if(isAllowToUpload() == true){
      uploadState.value = true
      const doUpload = await store.dispatch("do_upload_checks" , {checks: props.requestData.uploaded_checks , utoken: cookies.get("UToken")})
      if(doUpload.statusCode == 200){
        clearCheckFiles()
        $toast.success(
          doUpload.statusMessage,
          {
            position: "top-left",
          }
        );
        uploadState.value = false
      }else{
        $toast.error(
          doUpload.statusMessage,
          {
            position: "top-left",
          }
        );
        uploadState.value = false
      }
    }else{
      $toast.error(
        "لطفا فایلی را جهت آپلود انتخاب کنید",
        {
          position: "top-left",
        }
      );
    }
  }



  const clearCheckFiles = () => {
    checkfiles.value.forEach((val , index) => {
      val.value = ''
    })

    props.requestData.uploaded_checks.forEach((val , index) => {
      val.file = null
    })
  }


</script>