<template>
  <!-- Begin Page Content -->
  <div class="container-fluid">
    <!-- Page Heading -->

    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">
          درخواست های اعتبار سنجی
        </h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table
            class="table table-bordered"
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th>نام ونام خوانوادگی</th>
                <th>کدملی</th>
                <th>شماره موبایل</th>
                <th>مبلغ درخواستی</th>
                <th>وضعیت درخواست</th>
                <th>جزئیات</th>
              </tr>
            </thead>

            <tbody v-if="requests.length != 0">
              <tr v-for="(request , index) in requests" :key="index">
                <td>{{ request.user.name }}</td>
                <td>{{ request.user.codemelli }}</td>
                <td>{{ request.user.mobile }}</td>
                <td>{{ rial_separate(request.request_amount) }} ريال</td>
                <td>
                    <span class="btn btn-warning btn-sm"  v-if="request.final_state == 0">در انتظار تایید ...</span>
                    <span class="btn btn-success btn-sm" v-if="request.final_state == 1">تایید شده</span>
                    <span class="btn btn-danger btn-sm"  v-if="request.final_state == 2">رد شده</span>
                </td>
                <td>
                    <router-link :to="`/admin/details/${request.id}`">جزئیات بیشتر</router-link>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td class="text-center" colspan="7">داده ای یافت نشد !</td>
                </tr>
            </tbody>

          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- /.container-fluid -->
</template>

<script setup>
import {onMounted , ref} from 'vue'
import {useStore} from 'vuex'
import {useCookies} from 'vue3-cookies'

const {cookies} = useCookies()
const store = useStore()
const requests = ref([])

onMounted(async () => {
    const credentials = await store.dispatch("get_user_credentials" , cookies.get("AToken"))
    if(credentials.statusCode == 200){
        requests.value = credentials.requests
    }
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




</script>

<style scoped>
@import url("../../assets/css/sb-admin-2.min.css");
</style>
