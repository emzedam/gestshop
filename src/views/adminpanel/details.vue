<template>
  <div>
    <!-- Begin Page Content -->
    <div class="container-fluid" v-if="requestData != null">
      <!-- Page Heading -->

      <!-- DataTales Example -->
      <div class="card shadow mb-4">
        <div
          class="card-header py-3 d-flex align-items-center justify-content-between"
        >
          <h6 class="m-0 font-weight-bold text-primary">جزئیات درخواست</h6>
          <button class="btn btn-warning btn-sm" v-if="requestData.state == 0">
            درخوست در انتظار تایید ...
          </button>
          <button class="btn btn-success btn-sm" v-if="requestData.state == 1">
            درخواست تایید شد
          </button>
          <button class="btn btn-danger btn-sm" v-if="requestData.state == 2">
            درخواست رد شد
          </button>
        </div>
        <div class="card-body">
          <div
            class="alert alert-danger p-2 text-center"
            v-if="requestData.desc_state != null"
          >
            {{ requestData.desc_state }}
          </div>
          <div class="row gap-4">
            <div class="col-lg-6 col-md-12">
              <span class="fw-bold font-weight-bold text-dark"
                >نام و نام خوانوادگی :</span
              ><span>{{ requestData.user.name }}</span>
            </div>
            <div class="col-lg-6 col-md-12">
              <span class="fw-bold font-weight-bold text-dark">کد ملی :</span
              ><span>{{ requestData.user.codemelli }}</span>
            </div>
            <div class="col-lg-6 col-md-12">
              <span class="fw-bold font-weight-bold text-dark"
                >شماره موبایل :</span
              ><span>{{ requestData.user.mobile }}</span>
            </div>
            <div class="col-lg-6 col-md-12">
              <span class="fw-bold font-weight-bold text-dark"
                >مبلغ درخواستی :</span
              ><span>{{ rial_separate(requestData.request_amount) }}</span>
            </div>
            <div class="col-lg-6 col-md-12">
              <span class="fw-bold font-weight-bold text-dark">
                دوره بازگشت :</span
              ><span>{{ requestData.return_period }} ماهه</span>
            </div>
            <div class="col-lg-6 col-md-12">
              <span class="fw-bold font-weight-bold text-dark">
                گام پرداخت :</span
              ><span>{{ requestData.payment_step }} ماهه</span>
            </div>
            <div class="col-lg-6 col-md-12">
              <span class="fw-bold font-weight-bold text-dark">
                کل سود پرداختی :</span
              ><span>{{ rial_separate(requestData.total_Interest) }} ريال</span>
            </div>
            <div class="col-lg-6 col-md-12">
              <span class="fw-bold font-weight-bold text-dark">
                جمع باز پرداخت :</span
              ><span>{{ rial_separate(requestData.total_payment) }} ريال</span>
            </div>
            <div class="col-lg-6 col-md-12">
              <span class="fw-bold font-weight-bold text-dark">
                مبلغ هر قسط :</span
              ><span
                >{{ rial_separate(requestData.monthly_payment) }} ريال</span
              >
            </div>

            <!-- DataTales Example -->
            <div class="card shadow mt-4" v-if="requestData != null">
              <div
                class="card-header py-3 d-flex align-items-center justify-content-between"
              >
                <h6 class="m-0 font-weight-bold text-primary">
                  مدارک اپلود شده
                </h6>
                <!-- <button class="btn btn-warning btn-sm" v-if="madarekData.state == 0">مدارک در انتظار تایید ...</button>
          <button class="btn btn-success btn-sm" v-if="madarekData.state == 1"> مدارک تایید شد </button>
          <button class="btn btn-danger btn-sm" v-if="madarekData.state == 2"> مدارک رد شد</button> -->
              </div>

              <div class="card-body">
                <div class="row flex">
                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold">کارت ملی </label>
                    <div
                      v-if="requestData.mostanadat_hoviyati != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(item, index) in requestData.mostanadat_hoviyati"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>


                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold"> کارت ملی ضامن </label>
                    <div
                      v-if="requestData.cartMelliZamen != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(item, index) in requestData.cartMelliZamen"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>


                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold"> فیش واریزی   </label>
                    <div
                      v-if="requestData.fishVarizi != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(item, index) in requestData.fishVarizi"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>


                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold"> فاکتور فروش    </label>
                    <div
                      v-if="requestData.factorFrush != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(item, index) in requestData.factorFrush"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>



                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold">پشت کارت ملی</label>
                    <div
                      v-if="requestData.etebarsanji_ays != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(item, index) in requestData.etebarsanji_ays"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>

                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold"
                      > شناسنامه صفحه اول
                    </label>
                    <div
                      v-if="requestData.print_se_mah != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(item, index) in requestData.print_se_mah"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>

                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold">  شناسنامه صفحه دوم  </label>
                    <div
                      v-if="requestData.check_sayadi != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(item, index) in requestData.check_sayadi"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>

                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold">شناسنامه توضیحات</label>
                    <div
                      v-if="requestData.barge_sana != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(item, index) in requestData.barge_sana"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>

                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold">سند یا اجاره نامه محل سکونت</label>
                    <div
                      v-if="requestData.check_sefid != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(item, index) in requestData.check_sefid"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>

                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold">سند یا اجاره نامه محل کسب مشاغل آزاد</label>
                    <div
                      v-if="requestData.mostanadat_skunati != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(item, index) in requestData.mostanadat_skunati"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>

                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold">اعتبار سنجی آیس</label>
                    <div
                      v-if="requestData.madarek_shoghli != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(item, index) in requestData.madarek_shoghli"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>

                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold">پرینت سه ماهه آخر حساب</label>
                    <div
                      v-if="requestData.check_75_miliun != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(item, index) in requestData.check_75_miliun"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>

                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold"
                      >جواز یا پروانه کسب</label
                    >
                    <div
                      v-if="requestData.mostanadat_kasbo_kar != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(
                          item, index
                        ) in requestData.mostanadat_kasbo_kar"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>


                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold"
                      >گواهی اشتغال یا حکم کارگزینی کارمندان دولتی یا خصوصی </label
                    >
                    <div
                      v-if="requestData.added_one_file != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(
                          item, index
                        ) in requestData.added_one_file"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>

                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold"
                      >آخرین فیش حقوقی کارمندان دولتی یا خصوصی </label
                    >
                    <div
                      v-if="requestData.added_two_file != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(
                          item, index
                        ) in requestData.added_two_file"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>

                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold"
                      >سابقه بیمه کارمندان خصوصی</label
                    >
                    <div
                      v-if="requestData.added_three_file != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(
                          item, index
                        ) in requestData.added_three_file"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>


                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold"
                      > برگه ثنا با مهر قضایی و امضا و اثر انگشت متقاضی </label
                    >
                    <div
                      v-if="requestData.added_four_file != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(
                          item, index
                        ) in requestData.added_four_file"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>


                  <div class="col-lg-3 col-md-3 mt-4" style="height: 200px">
                    <label for="" class="font-bold"
                      > برگ چک صیادی </label
                    >
                    <div
                      v-if="requestData.added_five_file != null"
                      style="
                        width: 119px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <a
                        :href="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        target="_blank"
                        style="width: 53px; height: 57px"
                        v-for="(
                          item, index
                        ) in requestData.added_five_file"
                        :key="index"
                      >
                        <img
                          v-if="
                            item.type == 'image/jpg' ||
                            item.type == 'image/png' ||
                            item.type == 'image/jpeg' ||
                            item.type == 'image/webp'
                          "
                          class="w-100 h-100 rounded object-fit-cover border"
                          :src="`https://api.gestshop.ir/storage/madarek_files/${item.file}`"
                        />
                        <p v-else>PDF</p>
                      </a>
                    </div>
                    <div v-else>خالی !</div>
                  </div>


                  <div class="col-lg-12 mt-5">
                    <label for="" class="fw-bold font-weight-bold text-dark">
                      دلیل رد درخاست
                    </label>
                    <textarea
                      class="w-100 h-25 mb-2"
                      name="text"
                      v-model="reject_madarek_description"
                      id=""
                      cols="30"
                      rows="10"
                    ></textarea>

                    <button
                      @click="verify_madarek()"
                      class="bg-success p-3 border-0 text-white ml-2 rounded"
                    >
                      تایید مدارک
                    </button>
                    <button
                      @click="rejection_madarek()"
                      class="bg-danger p-3 border-0 text-white rounded"
                    >
                      رد مدارک
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.container-fluid -->

            <div class="mt-8">
              <label class="form-label" for="customFile"
                >فرم های مورد نیاز را اپلود کنید
                <span
                  v-if="file_container == null"
                  class="btn btn-danger btn-sm mr-3"
                  >فایلی انتخاب نشده</span
                ><span v-else class="btn btn-success btn-sm mr-3"
                  >فایل انتخاب شد</span
                ></label
              >
              <input
                type="file"
                ref="uploadfile"
                @change="do_set_upload_file"
                class="form-control"
                id="customFile"
              />
              <div class="d-flex align-items-center justify-content-start">
                <button
                  v-if="uploadLoadingState == false"
                  class="btn btn-success btn-md mt-3"
                  @click="do_send_for_upload()"
                >
                  آپلود فایل
                </button>
                <button
                  v-if="uploadLoadingState == true"
                  type="button"
                  class="btn btn-success btn-md mt-3"
                >
                  در حال ارسال ...
                </button>

                <button
                  class="btn btn-md btn-danger mt-3 mr-2"
                  @click="remove_already_file()"
                  v-if="has_already_file != null"
                >
                  حذف فایل قبلی
                </button>
                <button
                  class="btn btn-md btn-primary mt-3 mr-2"
                  @click="do_download_file()"
                  v-if="has_already_file != null"
                >
                  دانلود فایل قبلی
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.container-fluid -->

    <div class="container-fluid">
      <!-- Page Heading -->

      <div class="card shadow mb-4" v-if="checkData != null">
        <div
          v-if="checkData.checkha != null"
          class="card-header py-3 d-flex align-items-center justify-content-between"
        >
          <h6 class="m-0 font-weight-bold text-primary">چک های اپلود شده</h6>
          <button class="btn btn-warning btn-sm" v-if="checkData.state == 0">
            چک ها در انتظار تایید ...
          </button>
          <button class="btn btn-success btn-sm" v-if="checkData.state == 1">
            چک ها تایید شد
          </button>
          <button class="btn btn-danger btn-sm" v-if="checkData.state == 2">
            چک ها رد شد
          </button>
        </div>
        <div class="card-body" v-if="checkData.checkha != null">
          <div class="row flex gap-4">
            <div
              class="col-lg-3 col-md-3 mt-4"
              style="height: 200px"
              v-for="(check, index) in checkData.checkha"
              :key="index"
            >
              <label for="" class="font-bold">{{ check.title }}</label>
              <img
                class="w-100 h-100 object-fit-cover rounded border"
                :src="`https://api.gestshop.ir/storage/check_files/${check.file}`"
                alt=""
              />
              <div class="position-absolute top-50 right-5 mr-5">
                <a
                  target="_blank"
                  :href="`https://api.gestshop.ir/storage/check_files/${check.file}`"
                  class="btn btn-primary btn-md"
                  >دانلود</a
                >
              </div>
            </div>
            <div class="col-lg-12 mt-4">
              <label for="" class="fw-bold font-weight-bold text-dark"
                >دلیل رد درخاست</label
              >
              <textarea
                class="w-100 h-25 mb-2"
                name="text"
                v-model="reject_checks_description"
                cols="30"
                rows="10"
              ></textarea>

              <button
                class="bg-success p-3 border-0 text-white ml-2 rounded"
                @click="verify_checks()"
              >
                تایید چک ها
              </button>
              <button
                class="bg-danger p-3 border-0 text-white rounded"
                @click="rejection_checks()"
              >
                رد چک ها
              </button>
            </div>
          </div>
        </div>
      </div>





      <div class="card shadow mb-4" v-if="contractData != null">
        <div
          class="card-header py-3 d-flex align-items-center justify-content-between"
        >
          <h6 class="m-0 font-weight-bold text-primary">فرم های اپلود شده</h6>
          <button class="btn btn-warning btn-sm" v-if="contractData.state == 0">
            اطلاعات  در انتظار تایید ...
          </button>
          <button class="btn btn-success btn-sm" v-if="contractData.state == 1">
            اطلاعات تایید شد
          </button>
          <button class="btn btn-danger btn-sm" v-if="contractData.state == 2">
            اطلاعات رد شده
          </button>
        </div>
        <div class="card-body">
          <div class="row flex gap-4">
            <div
              class="col-lg-3 col-md-3 mt-4"
              style="height: 200px"
            >
              <label for="" class="font-bold">فرم اول</label>
              <img
                class="w-100 h-100 object-fit-cover rounded border"
                :src="`https://api.gestshop.ir/storage/contract_files/${contractData.form_one}`"
                alt=""
              />
              <div class="position-absolute top-50 right-5 mr-5">
                <a
                  target="_blank"
                  :href="`https://api.gestshop.ir/storage/contract_files/${contractData.form_one}`"
                  class="btn btn-primary btn-md"
                  >دانلود</a
                >
              </div>
            </div>


            <div
              class="col-lg-3 col-md-3 mt-4"
              style="height: 200px"
            >
              <label for="" class="font-bold">فرم دوم</label>
              <img
                class="w-100 h-100 object-fit-cover rounded border"
                :src="`https://api.gestshop.ir/storage/contract_files/${contractData.form_two}`"
                alt=""
              />
              <div class="position-absolute top-50 right-5 mr-5">
                <a
                  target="_blank"
                  :href="`https://api.gestshop.ir/storage/contract_files/${contractData.form_two}`"
                  class="btn btn-primary btn-md"
                  >دانلود</a
                >
              </div>
            </div>


            <div
              class="col-lg-3 col-md-3 mt-4"
              style="height: 200px"
            >
              <label for="" class="font-bold">فرم سوم</label>
              <img
                class="w-100 h-100 object-fit-cover rounded border"
                :src="`https://api.gestshop.ir/storage/contract_files/${contractData.form_three}`"
                alt=""
              />
              <div class="position-absolute top-50 right-5 mr-5">
                <a
                  target="_blank"
                  :href="`https://api.gestshop.ir/storage/contract_files/${contractData.form_three}`"
                  class="btn btn-primary btn-md"
                  >دانلود</a
                >
              </div>
            </div>


            <div
              class="col-lg-3 col-md-3 mt-4"
              style="height: 200px"
            >
              <label for="" class="font-bold">فرم چهارم</label>
              <img
                class="w-100 h-100 object-fit-cover rounded border"
                :src="`https://api.gestshop.ir/storage/contract_files/${contractData.form_four}`"
                alt=""
              />
              <div class="position-absolute top-50 right-5 mr-5">
                <a
                  target="_blank"
                  :href="`https://api.gestshop.ir/storage/contract_files/${contractData.form_four}`"
                  class="btn btn-primary btn-md"
                  >دانلود</a
                >
              </div>
            </div>


            <div
              class="col-lg-3 col-md-3 mt-4"
              style="height: 200px"
            >
              <label for="" class="font-bold">فرم پنجم</label>
              <img
                class="w-100 h-100 object-fit-cover rounded border"
                :src="`https://api.gestshop.ir/storage/contract_files/${contractData.form_five}`"
                alt=""
              />
              <div class="position-absolute top-50 right-5 mr-5">
                <a
                  target="_blank"
                  :href="`https://api.gestshop.ir/storage/contract_files/${contractData.form_five}`"
                  class="btn btn-primary btn-md"
                  >دانلود</a
                >
              </div>
            </div>


            <div
              class="col-lg-3 col-md-3 mt-4"
              style="height: 200px"
            >
              <label for="" class="font-bold">فرم ششم</label>
              <img
                class="w-100 h-100 object-fit-cover rounded border"
                :src="`https://api.gestshop.ir/storage/contract_files/${contractData.form_six}`"
                alt=""
              />
              <div class="position-absolute top-50 right-5 mr-5">
                <a
                  target="_blank"
                  :href="`https://api.gestshop.ir/storage/contract_files/${contractData.form_six}`"
                  class="btn btn-primary btn-md"
                  >دانلود</a
                >
              </div>
            </div>


            <div
              class="col-lg-3 col-md-3 mt-4"
              style="height: 200px"
            >
              <label for="" class="font-bold">فرم هفتم</label>
              <img
                class="w-100 h-100 object-fit-cover rounded border"
                :src="`https://api.gestshop.ir/storage/contract_files/${contractData.form_seven}`"
                alt=""
              />
              <div class="position-absolute top-50 right-5 mr-5">
                <a
                  target="_blank"
                  :href="`https://api.gestshop.ir/storage/contract_files/${contractData.form_seven}`"
                  class="btn btn-primary btn-md"
                  >دانلود</a
                >
              </div>
            </div>


            <div
              class="col-lg-3 col-md-3 mt-4"
              style="height: 200px"
            >
              <label for="" class="font-bold">فرم هشتم</label>
              <img
                class="w-100 h-100 object-fit-cover rounded border"
                :src="`https://api.gestshop.ir/storage/contract_files/${contractData.form_eight}`"
                alt=""
              />
              <div class="position-absolute top-50 right-5 mr-5">
                <a
                  target="_blank"
                  :href="`https://api.gestshop.ir/storage/contract_files/${contractData.form_eight}`"
                  class="btn btn-primary btn-md"
                  >دانلود</a
                >
              </div>
            </div>


            <div
              class="col-lg-3 col-md-3 mt-4"
              style="height: 200px"
            >
              <label for="" class="font-bold">فرم نهم</label>
              <img
                class="w-100 h-100 object-fit-cover rounded border"
                :src="`https://api.gestshop.ir/storage/contract_files/${contractData.form_nine}`"
                alt=""
              />
              <div class="position-absolute top-50 right-5 mr-5">
                <a
                  target="_blank"
                  :href="`https://api.gestshop.ir/storage/contract_files/${contractData.form_nine}`"
                  class="btn btn-primary btn-md"
                  >دانلود</a
                >
              </div>
            </div>


            <div
              class="col-lg-3 col-md-3 mt-4"
              style="height: 200px"
            >
              <label for="" class="font-bold">فرم دهم</label>
              <img
                class="w-100 h-100 object-fit-cover rounded border"
                :src="`https://api.gestshop.ir/storage/contract_files/${contractData.form_ten}`"
                alt=""
              />
              <div class="position-absolute top-50 right-5 mr-5">
                <a
                  target="_blank"
                  :href="`https://api.gestshop.ir/storage/contract_files/${contractData.form_ten}`"
                  class="btn btn-primary btn-md"
                  >دانلود</a
                >
              </div>
            </div>


            <div class="col-lg-12 mt-4">
              <label for="" class="fw-bold font-weight-bold text-dark"
                >دلیل رد درخاست</label
              >
              <textarea
                class="w-100 h-25 mb-2"
                name="text"
                v-model="reject_contract_description"
                cols="30"
                rows="10"
              ></textarea>

              <button
                class="bg-success p-3 border-0 text-white ml-2 rounded"
                @click="verify_contracts()"
              >
                تایید اطلاعات 
              </button>
              <button
                class="bg-danger p-3 border-0 text-white rounded"
                @click="rejection_contracts()"
              >
                رد اطلاعات 
              </button>
            </div>
          </div>
        </div>
      </div>




      <div class="card shadow mb-4">
        <div
          class="card-header py-3 d-flex align-items-center justify-content-between"
        >
          <h6 class="m-0 font-weight-bold text-primary">
            مشخص کردن تاریخ و تعداد چک ها
          </h6>
          <button class="btn btn-danger btn-md" @click="add_check()">
            اضافه کردن
          </button>
        </div>
        <div class="card-body">
          <div class="row" v-if="check_objects.length != 0">
            <div
              class="col-lg-6 col-md-6 border p-3 mt-2 rounded"
              v-for="(check, index) in check_objects"
              :key="index"
            >
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm"
                    >عنوان چک :</span
                  >
                </div>
                <input
                  type="text"
                  v-model="check.title"
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm"
                    >تاریخ چک :</span
                  >
                </div>
                <input
                  type="text"
                  v-model="check.date"
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm"
                    >مبلغ چک :</span
                  >
                </div>
                <input
                  type="text"
                  v-model="check.amount"
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
              <div class="w-100 d-flex justify-content-end">
                <button
                  class="btn btn-danger btn-sm"
                  @click="remove_check(index)"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
          <div
            v-else
            class="mt-2 w-100 d-flex align-items-center justify-content-center"
          >
            <h5 class="text-danger text-bold">دکمه اضافه کردن را فشار دهید</h5>
          </div>

          <button
            v-if="checkDateState == false"
            @click="submit_save_check_date_time()"
            class="bg-success mt-4 p-3 border-0 text-white rounded"
          >
            ثبت اطلاعات
          </button>
          <button
            v-if="checkDateState == true"
            class="bg-success mt-4 p-3 border-0 text-white rounded"
          >
            در حال ارسال ...
          </button>

          <div class="col-lg-12 mt-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, toRaw } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCookies } from "vue3-cookies";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();
const route = useRoute();
const store = useStore();
const { cookies } = useCookies();
const requestData = ref(null);
const contractData = ref(null);
const checkData = ref(null);
const file_container = ref(null);
const uploadLoadingState = ref(false);
const uploadfile = ref(null);
const has_already_file = ref(null);
const reject_description = ref(null);
const reject_madarek_description = ref(null);
const reject_checks_description = ref(null);
const reject_contract_description = ref(null);

let check_objects = ref([]);
const checkDateState = ref(false);

onMounted(async () => {
  const get_request_detail = await store.dispatch("get_request_details_by_id", {
    id: route.params.id,
    atoken: cookies.get("AToken"),
  });
  if (get_request_detail.statusCode == 200) {
    requestData.value = get_request_detail.request;
    console.log(requestData.value);
  } else {
    requestData.value = null;
  }

  await get_has_alreay_file();
  await get_contracts();
  await get_check_dates();
});

const rial_separate = (Number) => {
  Number += "";
  Number = Number.replace(",", "");
  let x = Number.split(".");
  let y = x[0];
  let z = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
  return y + z;
};

const do_set_upload_file = (e) => {
  const mimtypes = ["text/plain", "application/pdf"];
  if (e.target.files.length != 0) {
    if (mimtypes.includes(e.target.files[0].type)) {
      file_container.value = e.target.files[0];
    } else {
      file_container.value = null;
      e.target.value = "";
      $toast.error("پسوند فایل مجاز برای آپلود نیست", {
        position: "top-left",
      });
    }
  } else {
    file_container.value = null;
    e.target.value = "";
  }
};

const do_send_for_upload = async () => {
  if (file_container.value != null) {
    uploadLoadingState.value = true;
    const uploadFile = await store.dispatch("do_upload_file", {
      file: file_container.value,
      atoken: cookies.get("AToken"),
    });
    if (uploadFile.statusCode == 200) {
      file_container.value = null;
      uploadfile.value.value = "";
      uploadLoadingState.value = false;
      $toast.success(uploadFile.statusMessage, {
        position: "top-left",
      });
      await get_has_alreay_file();
    } else {
      file_container.value = null;
      uploadfile.value.value = "";
      uploadLoadingState.value = false;
      $toast.error(uploadFile.statusMessage, {
        position: "top-left",
      });
    }
  } else {
    $toast.error("لطفا فایلی را جهت آپلود انتخاب کنید", {
      position: "top-left",
    });
  }
};

const get_has_alreay_file = async () => {
  const get_file = await store.dispatch(
    "get_has_already_file",
    cookies.get("AToken")
  );
  if (get_file.statusCode == 200) {
    has_already_file.value = get_file.file;
  } else {
    has_already_file.value = null;
  }
};

const do_download_file = () => {
  window.location.href =
    "https://api.gestshop.ir/storage/form_file/" +
    has_already_file.value.file_name;
};

const remove_already_file = async () => {
  if (confirm("آیا از حذف فایل قبلی مطعن هستید ؟")) {
    const removefile = await store.dispatch(
      "remove_alredy_file",
      cookies.get("AToken")
    );
    if (removefile.statusCode == 200) {
      $toast.success(removefile.statusMessage, {
        position: "top-left",
      });
      has_already_file.value = null;
    }
  }
};

const verify_request = async () => {
  if (confirm("آیا از تایید این درخواست مطمعن هستید ؟")) {
    const verifyRequest = await store.dispatch("verify_request_data", {
      requetId: route.params.id,
      atoken: cookies.get("AToken"),
    });
    if (verifyRequest.statusCode == 200) {
      $toast.success(verifyRequest.statusMessage, {
        position: "top-left",
      });
    }
  }
};

const rejection_request = async () => {
  if (confirm("آیا از رد این درخواست مطمعن هستید ؟")) {
    if (reject_description.value != null) {
      const rejectRequest = await store.dispatch("reject_request_data", {
        requetId: route.params.id,
        reject_desc: reject_description.value,
        atoken: cookies.get("AToken"),
      });
      if (rejectRequest.statusCode == 200) {
        reject_description.value = null;
        $toast.success(rejectRequest.statusMessage, {
          position: "top-left",
        });
      }
    } else {
      $toast.error("لطفا دلیل رد این درخواست را به کاربر ارائه دهید", {
        position: "top-left",
      });
    }
  }
};

const get_contracts = async () => {
  const get_contract = await store.dispatch("get_contract_details", {
    id: route.params.id,
    atoken: cookies.get("AToken"),
  });
  if (get_contract.statusCode == 200) {
    contractData.value = get_contract.contract;
    console.log(contractData.value)
  } else {
    contractData.value = null;
  }
};

const verify_madarek = async () => {
  if (confirm("آیا از تایید این مدارک مطمعن هستید ؟")) {
    const verifyMadarek = await store.dispatch("verify_madarek_data", {
      requetId: route.params.id,
      atoken: cookies.get("AToken"),
    });
    if (verifyMadarek.statusCode == 200) {
      $toast.success(verifyMadarek.statusMessage, {
        position: "top-left",
      });
    }
  }
};

const rejection_madarek = async () => {
  if (confirm("آیا از رد این مدارک مطمعن هستید ؟")) {
    if (reject_madarek_description.value != null) {
      const rejectMadarek = await store.dispatch("reject_madarek_data", {
        requetId: route.params.id,
        reject_desc: reject_madarek_description.value,
        atoken: cookies.get("AToken"),
      });
      if (rejectMadarek.statusCode == 200) {
        reject_madarek_description.value = null;
        $toast.success(rejectMadarek.statusMessage, {
          position: "top-left",
        });
      }
    } else {
      $toast.error("لطفا دلیل رد این مدارک را به کاربر ارائه دهید", {
        position: "top-left",
      });
    }
  }
};

const add_check = () => {
  check_objects.value = [
    ...check_objects.value,
    {
      title: null,
      date: null,
      amount: null,
      file: null,
    },
  ];
};

const remove_check = (index) => {
  check_objects.value.splice(index, 1);
};

const submit_save_check_date_time = async () => {
  if (check_objects.value.length != 0) {
    checkDateState.value = true;
    const createCheckDats = await store.dispatch("create_check_dates", {
      requetId: route.params.id,
      checks: check_objects.value,
      atoken: cookies.get("AToken"),
    });
    if (createCheckDats.statusCode == 200) {
      checkDateState.value = false;
      $toast.success(createCheckDats.statusMessage, {
        position: "top-left",
      });
    }
  } else {
    checkDateState.value = false;
    $toast.error("لطفا چکی را اضافه کنید", {
      position: "top-left",
    });
  }
};

const get_check_dates = async () => {
  const get_check = await store.dispatch("get_check_date_details", {
    requetId: route.params.id,
    atoken: cookies.get("AToken"),
  });

  if (get_check.statusCode == 200) {
    checkData.value = get_check.check;
    if (get_check.check.uploaded_checks.length != 0) {
      get_check.check.uploaded_checks.forEach((val, index) => {
        check_objects.value = [...check_objects.value, toRaw(val)];
      });
      // check_objects.value = get_check.check.uploaded_checks
    }
  } else {
    check_objects.value = [];
  }
};

const verify_checks = async () => {
  if (confirm("آیا از تایید این چک ها مطمعن هستید ؟")) {
    const verifyChecks = await store.dispatch("verify_checks_data", {
      requetId: route.params.id,
      atoken: cookies.get("AToken"),
    });
    if (verifyChecks.statusCode == 200) {
      $toast.success(verifyChecks.statusMessage, {
        position: "top-left",
      });
    }
  }
};

const rejection_checks = async () => {
  if (confirm("آیا از رد این چک ها مطمعن هستید ؟")) {
    if (reject_checks_description.value != null) {
      const rejectChecks = await store.dispatch("reject_checks_data", {
        requetId: route.params.id,
        reject_desc: reject_checks_description.value,
        atoken: cookies.get("AToken"),
      });
      if (rejectChecks.statusCode == 200) {
        reject_checks_description.value = null;
        $toast.success(rejectChecks.statusMessage, {
          position: "top-left",
        });
      }
    } else {
      $toast.error("لطفا دلیل رد این چک ها را به کاربر ارائه دهید", {
        position: "top-left",
      });
    }
  }
};


const verify_contracts = async () => {
  if (confirm("آیا از تایید این اطلاعات  مطمعن هستید ؟")) {
    const verifyContracts = await store.dispatch("verify_contracts_data", {
      requetId: route.params.id,
      atoken: cookies.get("AToken"),
    });
    if (verifyContracts.statusCode == 200) {
      $toast.success(verifyContracts.statusMessage, {
        position: "top-left",
      });
    }
  }
};

const rejection_contracts = async () => {
  if (confirm("آیا از رد این اطلاعات  مطمعن هستید ؟")) {
    if (reject_contract_description.value != null) {
      const rejectContract = await store.dispatch("reject_contracts_data", {
        requetId: route.params.id,
        reject_desc: reject_contract_description.value,
        atoken: cookies.get("AToken"),
      });
      if (rejectContract.statusCode == 200) {
        reject_contract_description.value = null;
        $toast.success(rejectContract.statusMessage, {
          position: "top-left",
        });
      }
    } else {
      $toast.error("لطفا دلیل رد این اطلاعات را به کاربر ارائه دهید", {
        position: "top-left",
      });
    }
  }
};
</script>

<style scoped>
@import url("../../assets/css/sb-admin-2.min.css");
</style>
