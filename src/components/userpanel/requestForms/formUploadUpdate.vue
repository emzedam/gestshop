<template>
  <div class="card shadow mb-4" v-if="requestData != null">
    <div class="card-header py-3" >
      <h6 class="m-0 font-weight-bold text-primary">بروزرسانی فرم قرارداد</h6>
    </div>
    <div class="card-body mr-3" >
      <div class="alert alert-danger text-center" v-if="requestData.desc_state != null">
        {{ requestData.desc_state }}
      </div>
      <div class="alert alert-warning text-center" v-if="requestData.state == 0">
      لطفا منتظر اعلام نتیجه درخواست از سمت مدیریت بمانید
      </div>
      <div class="row">

        <div class="col-lg-6 col-md-6">
          <label for="formone" class="text-dark">
            فرم اول
            <span class="btn btn-xs btn-danger" v-if="form_check.form_one == null" >انتخاب نشده</span>
            <span class="btn btn-xs btn-success" v-if="form_check.form_one != null">انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                آپلود
              </span>
            </div>
            <input
              id="formone"
              type="file"
              class="form-control "
              ref="formoneref"
              @change="onChangeformOne"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6">
          <label for="formtwo" class="text-dark">
            فرم دوم
            <span class="btn btn-xs btn-danger" v-if="form_check.form_two == null" >انتخاب نشده</span>
            <span class="btn btn-xs btn-success" v-if="form_check.form_two != null">انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                آپلود
              </span>
            </div>
            <input
              id="formtwo"
              type="file"
              class="form-control"
              @change="onChangeformTwo"
              ref="formtworef"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>


        <div class="col-lg-6 col-md-6">
          <label for="formthree" class="text-dark">
            فرم سوم
            <span class="btn btn-xs btn-danger" v-if="form_check.form_three == null" >انتخاب نشده</span>
            <span class="btn btn-xs btn-success" v-if="form_check.form_three != null">انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                آپلود
              </span>
            </div>
            <input
              id="formthree"
              type="file"
              class="form-control"
              @change="onChangeformThree"
              ref="formthreeref"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>


        <div class="col-lg-6 col-md-6">
          <label for="formfour" class="text-dark">
            فرم چهارم
            <span class="btn btn-xs btn-danger" v-if="form_check.form_four == null" >انتخاب نشده</span>
            <span class="btn btn-xs btn-success" v-if="form_check.form_four != null">انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                آپلود
              </span>
            </div>
            <input
              id="formfour"
              type="file"
              class="form-control"
              @change="onChangeformFour"
              ref="formfourref"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>


        <div class="col-lg-6 col-md-6">
          <label for="formfive" class="text-dark">
            فرم پنجم
            <span class="btn btn-xs btn-danger" v-if="form_check.form_five == null" >انتخاب نشده</span>
            <span class="btn btn-xs btn-success" v-if="form_check.form_five != null">انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                آپلود
              </span>
            </div>
            <input
              id="formfive"
              type="file"
              class="form-control"
              @change="onChangeformFive"
              ref="formfiveref"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>


        <div class="col-lg-6 col-md-6">
          <label for="formsix" class="text-dark">
            فرم ششم
            <span class="btn btn-xs btn-danger" v-if="form_check.form_six == null" >انتخاب نشده</span>
            <span class="btn btn-xs btn-success" v-if="form_check.form_six != null">انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                آپلود
              </span>
            </div>
            <input
              id="formsix"
              type="file"
              class="form-control"
              @change="onChangeformSix"
              ref="formsixref"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>


        <div class="col-lg-6 col-md-6">
          <label for="formseven" class="text-dark">
            فرم هفتم
            <span class="btn btn-xs btn-danger" v-if="form_check.form_seven == null" >انتخاب نشده</span>
            <span class="btn btn-xs btn-success" v-if="form_check.form_seven != null">انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                آپلود
              </span>
            </div>
            <input
              id="formseven"
              type="file"
              class="form-control"
              @change="onChangeformSeven"
              ref="formsevenref"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>


        <div class="col-lg-6 col-md-6">
          <label for="formeight" class="text-dark">
            فرم هشتم
            <span class="btn btn-xs btn-danger" v-if="form_check.form_eight == null" >انتخاب نشده</span>
            <span class="btn btn-xs btn-success" v-if="form_check.form_eight != null">انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                آپلود
              </span>
            </div>
            <input
              id="formeight"
              type="file"
              class="form-control"
              @change="onChangeformEight"
              ref="formeightref"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>


        <div class="col-lg-6 col-md-6">
          <label for="formnine" class="text-dark">
            فرم نهم
            <span class="btn btn-xs btn-danger" v-if="form_check.form_nine == null" >انتخاب نشده</span>
            <span class="btn btn-xs btn-success" v-if="form_check.form_nine != null">انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                آپلود
              </span>
            </div>
            <input
              id="formnine"
              type="file"
              class="form-control"
              @change="onChangeformNine"
              ref="formnineref"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>


        <div class="col-lg-6 col-md-6">
          <label for="formten" class="text-dark">
            فرم دهم
            <span class="btn btn-xs btn-danger" v-if="form_check.form_ten == null" >انتخاب نشده</span>
            <span class="btn btn-xs btn-success" v-if="form_check.form_ten != null">انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm">
                آپلود
              </span>
            </div>
            <input
              id="formten"
              type="file"
              class="form-control"
              @change="onChangeformTen"
              ref="formtenref"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>

      </div>

      <div class="col-lg-12 pt-3 gap-6 d-flex">
        <button @click="upload_form_gharardad()" class="bg-success p-3 border-0 text-white ml-2" v-if="requestLoading == false" >بروزرسانی</button>
        <button v-if="requestLoading == true" class="bg-success p-3 border-0 text-white ml-2" >در حال بروزرسانی ...</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useCookies } from "vue3-cookies";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { useStore } from "vuex";
const store = useStore();
const $toast = useToast();
const { cookies } = useCookies();
const form_check = reactive({
  form_one:   null,
  form_two:   null,
  form_three: null,
  form_four:  null,
  form_five:  null,
  form_six:   null,
  form_seven: null,
  form_eight: null,
  form_nine:  null,
  form_ten:   null
});
const requestLoading = ref(false);

const props = defineProps(['requestData'])

const formoneref = ref(null)
const formtworef = ref(null)
const formthreeref = ref(null)
const formfourref = ref(null)
const formfiveref = ref(null)
const formsixref = ref(null)
const formsevenref = ref(null)
const formeightref = ref(null)
const formnineref = ref(null)
const formtenref = ref(null)

const onChangeformOne = async (e , index) => {
  const mimtypes = ["image/png" , "image/jpg" , "image/jpeg" , "image/webp"];
  if(mimtypes.includes(e.target.files[0].type)){
    form_check.form_one = e.target.files[0]
  }else{
    form_check.form_one = null
    e.target.value = ''
    $toast.error(
      "پسوند فایل انتخابی غیر مجاز میباشد",
      {
        position: "top-left",
      }
    );
  }
}



const onChangeformTwo = async (e) => {
  const mimtypes = ["image/png" , "image/jpg" , "image/jpeg"  , "image/webp"];
  if(mimtypes.includes(e.target.files[0].type)){
    form_check.form_two = e.target.files[0]
  }else{
    form_check.form_two = null
    e.target.value = ''
    $toast.error(
      "پسوند فایل انتخابی غیر مجاز میباشد",
      {
        position: "top-left",
      }
    );
  }
}


const onChangeformThree = async (e) => {
  const mimtypes = ["image/png" , "image/jpg" , "image/jpeg"  , "image/webp"];
  if(mimtypes.includes(e.target.files[0].type)){
    form_check.form_three = e.target.files[0]
  }else{
    form_check.form_three = null
    e.target.value = ''
    $toast.error(
      "پسوند فایل انتخابی غیر مجاز میباشد",
      {
        position: "top-left",
      }
    );
  }
}

const onChangeformFour = async (e) => {
  const mimtypes = ["image/png" , "image/jpg" , "image/jpeg"  , "image/webp"];
  if(mimtypes.includes(e.target.files[0].type)){
    form_check.form_four = e.target.files[0]
  }else{
    form_check.form_four = null
    e.target.value = ''
    $toast.error(
      "پسوند فایل انتخابی غیر مجاز میباشد",
      {
        position: "top-left",
      }
    );
  }
}

const onChangeformFive = async (e) => {
  const mimtypes = ["image/png" , "image/jpg" , "image/jpeg"  , "image/webp"];
  if(mimtypes.includes(e.target.files[0].type)){
    form_check.form_five = e.target.files[0]
  }else{
    form_check.form_five = null
    e.target.value = ''
    $toast.error(
      "پسوند فایل انتخابی غیر مجاز میباشد",
      {
        position: "top-left",
      }
    );
  }
}


const onChangeformSix = async (e) => {
  const mimtypes = ["image/png" , "image/jpg" , "image/jpeg"  , "image/webp"];
  if(mimtypes.includes(e.target.files[0].type)){
    form_check.form_six = e.target.files[0]
  }else{
    form_check.form_six = null
    e.target.value = ''
    $toast.error(
      "پسوند فایل انتخابی غیر مجاز میباشد",
      {
        position: "top-left",
      }
    );
  }
}

const onChangeformSeven = async (e) => {
  const mimtypes = ["image/png" , "image/jpg" , "image/jpeg"  , "image/webp"];
  if(mimtypes.includes(e.target.files[0].type)){
    form_check.form_seven = e.target.files[0]
  }else{
    form_check.form_seven = null
    e.target.value = ''
    $toast.error(
      "پسوند فایل انتخابی غیر مجاز میباشد",
      {
        position: "top-left",
      }
    );
  }
}

const onChangeformEight = async (e) => {
  const mimtypes = ["image/png" , "image/jpg" , "image/jpeg"  , "image/webp"];
  if(mimtypes.includes(e.target.files[0].type)){
    form_check.form_eight = e.target.files[0]
  }else{
    form_check.form_eight = null
    e.target.value = ''
    $toast.error(
      "پسوند فایل انتخابی غیر مجاز میباشد",
      {
        position: "top-left",
      }
    );
  }
}

const onChangeformNine = async (e) => {
  const mimtypes = ["image/png" , "image/jpg" , "image/jpeg"  , "image/webp"];
  if(mimtypes.includes(e.target.files[0].type)){
    form_check.form_nine = e.target.files[0]
  }else{
    form_check.form_nine = null
    e.target.value = ''
    $toast.error(
      "پسوند فایل انتخابی غیر مجاز میباشد",
      {
        position: "top-left",
      }
    );
  }
}

const onChangeformTen = async (e) => {
  const mimtypes = ["image/png" , "image/jpg" , "image/jpeg"  , "image/webp"];
  if(mimtypes.includes(e.target.files[0].type)){
    form_check.form_ten = e.target.files[0]
  }else{
    form_check.form_ten = null
    e.target.value = ''
    $toast.error(
      "پسوند فایل انتخابی غیر مجاز میباشد",
      {
        position: "top-left",
      }
    );
  }
}


const upload_form_gharardad = async () => {
  if(form_check.form_one != null || 
  form_check.form_two != null ||
  form_check.form_three != null ||
  form_check.form_four != null ||
  form_check.form_five != null ||
  form_check.form_six != null ||
  form_check.form_seven != null ||
  form_check.form_eight != null ||
  form_check.form_nine != null ||
  form_check.form_ten != null){
    requestLoading.value = true

    const formuploadStore = await store.dispatch("do_upload_form_contract" , {form_check: form_check , utoken: cookies.get("UToken"),})
    if(formuploadStore.statusCode == 200){
      clearData()
      requestLoading.value = false
      $toast.success(
        formuploadStore.statusMessage,
        {
          position: "top-left",
        }
      );
    }else{
      requestLoading.value = false
      $toast.error(
        formuploadStore.statusMessage,
        {
          position: "top-left",
        }
      );
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


const clearData = () => {
  formoneref.value.value = ''
  formtworef.value.value = ''
  formthreeref.value.value = ''
  formfourref.value.value = ''
  formfiveref.value.value = ''
  formsixref.value.value = ''
  formsevenref.value.value = ''
  formeightref.value.value = ''
  formnineref.value.value = ''
  formtenref.value.value = ''


  form_check.form_one = null 
  form_check.form_two = null
  form_check.form_three = null
  form_check.form_four = null
  form_check.form_five = null
  form_check.form_six = null
  form_check.form_seven = null
  form_check.form_eight = null
  form_check.form_nine = null
  form_check.form_ten = null
}
</script>
