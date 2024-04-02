
<template>
  <div class="card shadow mb-4">
    <div class="alert alert-danger text-center" v-if="requestData.desc_state != null">
    {{ requestData.desc_state }}
    </div>
    <div class="alert alert-warning text-center" v-if="requestData.state == 0">
    لطفا منتظر اعلام نتیجه درخواست از سمت مدیریت بمانید
    </div>

    <div class="card-header py-3">
      <h6 class="m-0 font-weight-bold text-primary">مدارک مورد نیاز</h6>
    </div>

    <div class="card-body mr-3">
      <div class="row" :class="bankName != 'تامین اجتماعی' ? '' : 'd-none'">
        <div class="col-lg-6 col-md-6">
          <label for="mostanadat_hoviyati" class="text-dark"
            > کارت ملی متقاضی
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.mostanadat_hoviyati_state == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.mostanadat_hoviyati_state == true"
              >انتخاب شد</span
            >
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="hoviyatiFile"
              id="mostanadat_hoviyati"
              type="file"
              @change="mostanadatHoviyatiSetFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6">
          <label for="etebarsanjiAys" class="text-dark"
            >پشت کارت ملی 
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.etebarsanjiAysState == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.etebarsanjiAysState == true"
              >انتخاب شد</span
            >
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="etebarsanjiAys"
              id="etebarsanjiAys"
              type="file"
              class="form-control"
              multiple
              @change="etebarsanjiaysSetFile"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6" :class="bankName == 'طراوت' ||bankName == 'بانک مهر'  ||bankName == 'بانک رسالت'  ||bankName == 'لندوکارت' ? 'd-none' : ''">
          <label for="melliCartZamen" class="text-dark"
            >کارت ملی ضامن    
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.melli_cart_zamen_state == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.melli_cart_zamen_state == true"
              >انتخاب شد</span
            >
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="melliCartZamen"
              id="melliCartZamen"
              type="file"
              class="form-control"
              multiple
              @change="melliCartZamenSetFile"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6">
          <label for="fishvarizi" class="text-dark"
            >فیش واریزی   
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.fishVarizeState == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.fishVarizeState == true"
              >انتخاب شد</span
            >
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="fishvarizi"
              id="fishvarizi"
              type="file"
              class="form-control"
              multiple
              @change="fishVariziSetFile"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6" :class="bankName == 'نیوقسط'  ||bankName == 'مای چک' ? 'd-none' : ''">
          <label for="factorFrush" class="text-dark"
            >فاکتور فروش   
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.factorFrushState == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.factorFrushState == true"
              >انتخاب شد</span
            >
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="factorFrush"
              id="factorFrush"
              type="file"
              class="form-control"
              multiple
              @change="factorFrushSetFile"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6">
          <label for="printSeMahe" class="text-dark"
            >شناسنامه صفحه اول
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.printsemaheState == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.printsemaheState == true"
              >انتخاب شد</span
            >
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="printSeMaheFile"
              id="printSeMahe"
              type="file"
              @change="printSeMaheSetFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6" :class="bankName == 'نیوقسط'  ||bankName == 'مای چک' ? 'd-none' : ''">
          <label for="checkSayadi" class="text-dark"
            >  شناسنامه صفحه دوم
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.checkSayadiState == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.checkSayadiState == true"
              >انتخاب شد</span
            >
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="checkSayadiFile"
              id="checkSayadi"
              type="file"
              @change="checkSayadiSetFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6" :class="bankName == 'نیوقسط'  ||bankName == 'مای چک' ? 'd-none' : ''">
          <label for="bargeSana" class="text-dark"
            >شناسنامه توضیحات 
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.bargetSanaState == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.bargetSanaState == true"
              >انتخاب شد</span
            >
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="bargeSanaFile"
              id="bargeSana"
              type="file"
              @change="bargeSanaSetFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6" :class="bankName == 'نیوقسط'  ||bankName == 'مای چک' ? 'd-none' : ''">
          <label for="skunati" class="text-dark">
           سند یا اجاره نامه محل سکونت
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.checkSefidState == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.checkSefidState == true"
              >انتخاب شد</span
            >
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="checkSefidFile"
              @change="checkSefidSetFile"
              id="checkSefid"
              type="file"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6" :class="bankName == 'نیوقسط'  ||bankName == 'مای چک' ? 'd-none' : ''">
          <label for="skunati" class="text-dark"
            > سند یا اجاره نامه محل کسب مشاغل آزاد
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.skunatiState == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.skunatiState == true"
              >انتخاب شد</span
            >
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="skunatiFile"
              @change="skunatiSetFile"
              id="skunati"
              type="file"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6">
          <label for="madarekShoghli" class="text-dark"
            > اعتبارسنجا آیس (pdf)
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.madarekShoghliState == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.madarekShoghliState == true"
              >انتخاب شد</span
            >
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="madarekShoghliFile"
              type="file"
              id="madarekShoghli"
              @change="madarekShoghliSetFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6" :class="bankName == 'نیوقسط'  ||bankName == 'مای چک' ? 'd-none' : ''">
          <label for="check75" class="text-dark"
            >پرینت سه ماهه آخر حساب  
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.check75State == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.check75State == true"
              >انتخاب شد</span
            >
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="check75File"
              type="file"
              id="check75"
              @change="check75SetFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-6" :class="bankName == 'نیوقسط'  ||bankName == 'مای چک' ? 'd-none' : ''">
          <label for="mostanadatKasbokar" class="text-dark"
            > جواز یا پروانه کسب
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.mostanadatKasbokarState == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.mostanadatKasbokarState == true"
              >انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="mostanadatKasbokarFile"
              type="file"
              id="mostanadatKasbokar"
              @change="mostanadatKasbokarSetFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>




<!--  -->
        <div class="col-lg-6 col-md-6" :class="bankName == 'نیوقسط'  ||bankName == 'مای چک' ? 'd-none' : ''">
          <label for="added_one" class="text-dark"
            > گواهی اشتغال یا حکم کارگزینی کارمندان دولتی یا خصوصی
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.added_one == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.added_one == true"
              >انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="added_one"
              type="file"
              id="added_one"
              @change="addedOneSetFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>


        <div class="col-lg-6 col-md-6" :class="bankName == 'نیوقسط'  ||bankName == 'مای چک' ? 'd-none' : ''">
          <label for="added_two" class="text-dark"
            > آخرین فیش حقوقی کارمندان دولتی یا خصوصی
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.added_two == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.added_two == true"
              >انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="added_two"
              type="file"
              id="added_two"
              @change="addedTwoSetFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>


        <div class="col-lg-6 col-md-6" :class="bankName == 'نیوقسط'  ||bankName == 'مای چک' ? 'd-none' : ''">
          <label for="added_three" class="text-dark"
            > سابقه بیمه کارمندان خصوصی
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.added_three == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.added_three == true"
              >انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="added_three"
              type="file"
              id="added_three"
              @change="addedThreeSetFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>


        <div class="col-lg-6 col-md-6">
          <label for="added_four" class="text-dark"
            > برگه ثنا با مهر دفتر قضایی و امضا و اثر انگشت متقاضی
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.added_four == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.added_four == true"
              >انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="added_four"
              type="file"
              id="added_four"
              @change="addedFourSetFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>


        <div class="col-lg-6 col-md-6">
          <label for="added_five" class="text-dark"
            > برگه چک صیادی
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.added_five == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.added_five == true"
              >انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="added_five"
              type="file"
              id="added_five"
              @change="addedFiveSetFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
      </div>

      <div class="row" :class="bankName == 'تامین اجتماعی' ? '' : 'd-none'">
        <div class="col-lg-6 col-md-6">
          <label for="mostanadat_hoviyati" class="text-dark"
            > کارت ملی 
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.mostanadat_hoviyati_state == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.mostanadat_hoviyati_state == true"
              >انتخاب شد</span
            >
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="hoviyatiFile"
              id="mostanadat_hoviyati"
              type="file"
              @change="mostanadatHoviyatiSetFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <label for="mostanadat_hoviyati" class="text-dark"
            > فیش مستمری
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.mostanadat_hoviyati_state == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.mostanadat_hoviyati_state == true"
              >انتخاب شد</span
            >
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="hoviyatiFile"
              id="mostanadat_hoviyati"
              type="file"
              @change="mostanadatHoviyatiSetFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
      </div>

      <!-- اطلاعات ضامن -->
      <div class="row" :class="bankName != 'طراوت' ? 'd-none' : ''">
        <h5>ضامن اول</h5>
        <div class="col-lg-6 col-md-6">
          <label for="zamen_cart_melli" class="text-dark"
            > عکس کارت ملی
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.zamenAvalCartmelli == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.zamenAvalCartmelli == true"
              >انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="zamen_cart_melli"
              type="file"
              id="zamen_cart_melli"
              @change="addZamenAvalCartmelliFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <label for="zamen_fish_hogugi" class="text-dark"
            > فیش حقوقی
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.zamenAvalFishHogugi == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.zamenAvalFishHogugi == true"
              >انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="zamen_fish_hogugi"
              type="file"
              id="zamen_fish_hogugi"
              @change="addZamenAvalFishHogugiFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
      </div>
      <div class="row" :class="bankName != 'طراوت' ? 'd-none' : ''">
        <h5>ضامن دوم</h5>
        <div class="col-lg-6 col-md-6">
          <label for="zamen_dovom_cartmelli" class="text-dark"
            > عکس کارت ملی
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.zamenDovomCartmelli == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.zamenDovomCartmelli == true"
              >انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="zamen_dovom_cartmelli"
              type="file"
              id="zamen_dovom_cartmelli"
              @change="addedZamenDovomCartmelliFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
      </div>
      <!-- اطلاعات ضامن -->

      <!-- اطلاعات ضامن -->
      <div class="row" :class="bankName != 'بانک مهر'  &&bankName != 'بانک رسالت'  &&bankName != 'تامین اجتماعی'  &&bankName != 'لندوکارت'  ? 'd-none' : ''">
        <h5>ضامن اول</h5>
        <div class="col-lg-6 col-md-6">
          <label for="zamen_cart_melli" class="text-dark"
            > عکس کارت ملی
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.zamenAvalCartmelli == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.zamenAvalCartmelli == true"
              >انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="zamen_cart_melli"
              type="file"
              id="zamen_cart_melli"
              @change="addZamenAvalCartmelliFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
        <div class="col-lg-4 col-md-4">
          <label for="zamen_aval_madrakshoghli" class="text-dark"
            > مدرک شغلی
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.zamenAvalMadrakShoghli == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.zamenAvalMadrakShoghli == true"
              >انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="zamen_aval_madrakshoghli"
              type="file"
              id="zamen_aval_madrakshoghli"
              @change="addZamenAvalMadrakShoghliFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
        <div class="col-lg-4 col-md-4">
          <label for="zamen_aval_moadelsemahe" class="text-dark"
            > معدل سه ماهه
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.zamenAvalMoadelSeMahe == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.zamenAvalMoadelSeMahe == true"
              >انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="zamen_aval_moadelsemahe"
              type="file"
              id="zamen_aval_moadelsemahe"
              @change="addZamenAvalMoadelSeMaheFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
      </div>
      <div class="row" :class="bankName != 'بانک مهر'  &&bankName != 'بانک رسالت'  &&bankName != 'تامین اجتماعی'  &&bankName != 'لندوکارت'   ? 'd-none' : ''">
        <h5>ضامن دوم</h5>
        <div class="col-lg-6 col-md-6">
          <label for="zamen_dovom_cartmelli" class="text-dark"
            > عکس کارت ملی
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.zamenDovomCartmelli == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.zamenDovomCartmelli == true"
              >انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="zamen_dovom_cartmelli"
              type="file"
              id="zamen_dovom_cartmelli"
              @change="addedZamenDovomCartmelliFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
        <div class="col-lg-4 col-md-4">
          <label for="zamen_dovom_madrakshoghli" class="text-dark"
            > مدرک شغلی
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.zamenDovomMadrakShoghli == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.zamenDovomMadrakShoghli == true"
              >انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="zamen_dovom_madrakshoghli"
              type="file"
              id="zamen_dovom_madrakshoghli"
              @change="addZamenDovomMadrakShoghliFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
        <div class="col-lg-4 col-md-4">
          <label for="zamen_dovom_moadelsemahe" class="text-dark"
            > معدل سه ماهه
            <span
              class="btn btn-xs btn-danger"
              v-if="madarekState.zamenDovomMoadelSeMahe == false"
              >انتخاب نشده</span
            >
            <span
              class="btn btn-xs btn-success"
              v-if="madarekState.zamenDovomMoadelSeMahe == true"
              >انتخاب شد</span>
          </label>
          <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-sm"
                >آپلود</span
              >
            </div>
            <input
              ref="zamen_dovom_moadelsemahe"
              type="file"
              id="zamen_dovom_moadelsemahe"
              @change="addZamenDovomMoadelSeMaheFile"
              class="form-control"
              multiple
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
      </div>
      <!-- اطلاعات ضامن -->

      <div class="col-lg-12 pt-3 gap-6 d-flex">
        <button
          v-if="submitState == false"
          class="bg-success p-3 border-0 rounded text-white ml-2"
          @click="submit_madarek()"
        >
         بروزرسانی مدارک
        </button>
        <button
          v-if="submitState == true"
          type="button"
          class="bg-success p-3 border-0 rounded text-white ml-2"
        >
          در حال بروزرسانی ...
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive , onMounted } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { useStore } from "vuex";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const store = useStore();
const $toast = useToast();

const props = defineProps(['requestData' , 'bankName'])


onMounted(() => {
  if(props.bankName != null){
    madarekFiles.bank_name = props.bankName
  }
})

const madarekState = reactive({
  mostanadat_hoviyati_state: false,
  etebarsanjiAysState: false,
  melli_cart_zamen_state: false,
  factorFrushState: false,
  fishVarizeState: false,
  printsemaheState: false,
  checkSayadiState: false,
  bargetSanaState: false,
  checkSefidState: false,
  skunatiState: false,
  madarekShoghliState: false,
  check75State: false,
  mostanadatKasbokarState: false,
  added_one: false,
  added_two: false,
  added_three: false,
  added_four: false,
  added_five: false,
  // zamenStates
  zamenAvalCartmelli: false,
  zamenAvalFishHogugi: false,
  zamenDovomCartmelli: false,
  zamenAvalMadrakShoghli: false,
  zamenAvalMoadelSeMahe: false,
  zamenDovomMadrakShoghli: false,
  zamenDovomMoadelSeMahe: false,
  fishMostamaryState: false
});

const madarekFiles = reactive({
  hoviyatiFile: [],
  etebarsanjiAys: [],
  cartMelliZamen: [],
  factorFrush: [],
  fishVarizi: [],
  printSeMaheFile: [],
  checkSayadiFile: [],
  bargeSanaFile: [],
  checkSefidFile: [],
  skunatiFile: [],
  madarekShoghliFile: [],
  check75File: [],
  mostanadatKasbokarFile: [],
  addedOneFile: [],
  addedTwoFile: [],
  addedThreeFile: [],
  addedFourFile: [],
  addedFiveFile: [],
  // zamenStates

  zamenAvalCartmelliFile: [],
  zamenAvalFishHogugiFile: [],
  zamenDovomCartmelliFile: [],
  zamenAvalMadrakShoghliFile: [],
  zamenAvalMoadelSeMaheFile: [],
  zamenDovomMadrakShoghliFile: [],
  zamenDovomMoadelSeMaheFile: [],
  fishMostamaryFile: []
});

const request = reactive({
  request_amount: null,
  return_period: null,
  payment_step: null,
  monthly_payment: null,
  total_Interest: null,
  total_payment: null
});

const hoviyatiFile = ref(null);
const etebarsanjiAys = ref(null);
const printSeMaheFile = ref(null);
const checkSayadiFile = ref(null);
const bargeSanaFile = ref(null);
const checkSefidFile = ref(null);
const skunatiFile = ref(null);
const madarekShoghliFile = ref(null);
const check75File = ref(null);
const mostanadatKasbokarFile = ref(null);
const added_one = ref(null);
const added_two = ref(null);
const added_three = ref(null);
const added_four = ref(null);
const added_five = ref(null);
const melliCartZamen = ref(null);
const fishvarizi = ref(null);
const factorFrush = ref(null);

const zamen_cart_melli = ref(null);
const zamen_fish_hogugi = ref(null);
const zamen_dovom_cartmelli = ref(null);
const zamen_aval_madrakshoghli = ref(null);
const zamen_aval_moadelsemahe = ref(null);
const zamen_dovom_madrakshoghli = ref(null);
const zamen_dovom_moadelsemahe = ref(null);


const submitState = ref(false);



const addZamenAvalCartmelliFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.zamenAvalCartmelliFile = [...madarekFiles.zamenAvalCartmelliFile , finalFile];;
        madarekState.zamenAvalCartmelli = true;
      } else {
        e.target.value = "";
        madarekFiles.zamenAvalCartmelliFile = [];
        madarekState.zamenAvalCartmelli = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.zamenAvalCartmelliFile = [];
    madarekState.zamenAvalCartmelli = false;
  }
};

const addZamenAvalFishHogugiFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.zamenAvalFishHogugiFile = [...madarekFiles.zamenAvalFishHogugiFile , finalFile];;
        madarekState.zamenAvalFishHogugi = true;
      } else {
        e.target.value = "";
        madarekFiles.zamenAvalFishHogugiFile = [];
        madarekState.zamenAvalFishHogugi = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.zamenAvalFishHogugiFile = [];
    madarekState.zamenAvalFishHogugi = false;
  }
};

const addedZamenDovomCartmelliFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.zamenDovomCartmelliFile = [...madarekFiles.zamenDovomCartmelliFile , finalFile];;
        madarekState.zamenDovomCartmelli = true;
      } else {
        e.target.value = "";
        madarekFiles.zamenDovomCartmelliFile = [];
        madarekState.zamenDovomCartmelli = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.zamenDovomCartmelliFile = [];
    madarekState.zamenDovomCartmelli = false;
  }
};

const addZamenAvalMadrakShoghliFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.zamenAvalMoadelSeMaheFile = [...madarekFiles.zamenAvalMoadelSeMaheFile , finalFile];;
        madarekState.zamenAvalMadrakShoghli = true;
      } else {
        e.target.value = "";
        madarekFiles.zamenAvalMoadelSeMaheFile = [];
        madarekState.zamenAvalMadrakShoghli = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.zamenAvalMoadelSeMaheFile = [];
    madarekState.zamenAvalMadrakShoghli = false;
  }
};

const addZamenAvalMoadelSeMaheFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.zamenAvalMoadelSeMaheFile = [...madarekFiles.zamenAvalMoadelSeMaheFile , finalFile];;
        madarekState.zamenAvalMoadelSeMahe = true;
      } else {
        e.target.value = "";
        madarekFiles.zamenAvalMoadelSeMaheFile = [];
        madarekState.zamenAvalMoadelSeMahe = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.zamenAvalMoadelSeMaheFile = [];
    madarekState.zamenAvalMoadelSeMahe = false;
  }
};

const addZamenDovomMadrakShoghliFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.zamenDovomMadrakShoghliFile = [...madarekFiles.zamenDovomMadrakShoghliFile , finalFile];;
        madarekState.zamenDovomMadrakShoghli = true;
      } else {
        e.target.value = "";
        madarekFiles.zamenDovomMadrakShoghliFile = [];
        madarekState.zamenDovomMadrakShoghli = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.zamenDovomMadrakShoghliFile = [];
    madarekState.zamenDovomMadrakShoghli = false;
  }
};

const addZamenDovomMoadelSeMaheFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.zamenDovomMoadelSeMaheFile = [...madarekFiles.zamenDovomMoadelSeMaheFile , finalFile];;
        madarekState.zamenDovomMoadelSeMahe = true;
      } else {
        e.target.value = "";
        madarekFiles.zamenDovomMoadelSeMaheFile = [];
        madarekState.zamenDovomMoadelSeMahe = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.zamenDovomMoadelSeMaheFile = [];
    madarekState.zamenDovomMoadelSeMahe = false;
  }
};



const mostanadatHoviyatiSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.hoviyatiFile = [...madarekFiles.hoviyatiFile , finalFile];;
        madarekState.mostanadat_hoviyati_state = true;
      } else {
        e.target.value = "";
        madarekFiles.hoviyatiFile = [];
        madarekState.mostanadat_hoviyati_state = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.hoviyatiFile = [];
    madarekState.mostanadat_hoviyati_state = false;
  }
};


const melliCartZamenSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.cartMelliZamen = [...madarekFiles.cartMelliZamen , finalFile];;
        madarekState.melli_cart_zamen_state = true;
      } else {
        e.target.value = "";
        madarekFiles.cartMelliZamen = [];
        madarekState.melli_cart_zamen_state = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.cartMelliZamen = [];
    madarekState.melli_cart_zamen_state = false;
  }
};


const factorFrushSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.factorFrush = [...madarekFiles.factorFrush , finalFile];;
        madarekState.factorFrushState = true;
      } else {
        e.target.value = "";
        madarekFiles.factorFrush = [];
        madarekState.factorFrushState = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.factorFrush = [];
    madarekState.factorFrushState = false;
  }
};


const fishVariziSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.fishVarizi = [...madarekFiles.fishVarizi , finalFile];;
        madarekState.fishVarizeState = true;
      } else {
        e.target.value = "";
        madarekFiles.fishVarizi = [];
        madarekState.fishVarizeState = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.fishVarizi = [];
    madarekState.fishVarizeState = false;
  }
};


const etebarsanjiaysSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.etebarsanjiAys = [...madarekFiles.etebarsanjiAys , finalFile];
        madarekState.etebarsanjiAysState = true;
      } else {
        e.target.value = "";
        madarekFiles.etebarsanjiAys = [];
        madarekState.etebarsanjiAysState = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.etebarsanjiAys = [];
    madarekState.etebarsanjiAysState = false;
  }
};

const printSeMaheSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.printSeMaheFile = [...madarekFiles.printSeMaheFile , finalFile];
        madarekState.printsemaheState = true;
      } else {
        e.target.value = "";
        madarekFiles.printSeMaheFile = [];
        madarekState.printsemaheState = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.printSeMaheFile = [];
    madarekState.printsemaheState = false;
  }
};

const checkSayadiSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.checkSayadiFile = [...madarekFiles.checkSayadiFile , finalFile];
        madarekState.checkSayadiState = true;
      } else {
        e.target.value = "";
        madarekFiles.checkSayadiFile = [];
        madarekState.checkSayadiState = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.checkSayadiFile = [];
    madarekState.checkSayadiState = false;
  }
};

const bargeSanaSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.bargeSanaFile = [...madarekFiles.bargeSanaFile , finalFile];
        madarekState.bargetSanaState = true;
      } else {
        e.target.value = "";
        madarekFiles.bargeSanaFile = [];
        madarekState.bargetSanaState = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.bargeSanaFile = [];
    madarekState.bargetSanaState = false;
  }
};

const checkSefidSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.checkSefidFile = [...madarekFiles.checkSefidFile , finalFile];
        madarekState.checkSefidState = true;
      } else {
        e.target.value = "";
        madarekFiles.checkSefidFile = [];
        madarekState.checkSefidState = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.checkSefidFile = [];
    madarekState.checkSefidState = false;
  }
};

const skunatiSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.skunatiFile = [...madarekFiles.skunatiFile , finalFile];
        madarekState.skunatiState = true;
      } else {
        e.target.value = "";
        madarekFiles.skunatiFile = [];
        madarekState.skunatiState = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.skunatiFile = [];
    madarekState.skunatiState = false;
  }
};

const madarekShoghliSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.madarekShoghliFile = [...madarekFiles.madarekShoghliFile , finalFile];
        madarekState.madarekShoghliState = true;
      } else {
        e.target.value = "";
        madarekFiles.madarekShoghliFile = [];
        madarekState.madarekShoghliState = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.madarekShoghliFile = [];
    madarekState.madarekShoghliState = false;
  }
};

const check75SetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.check75File = [...madarekFiles.check75File , finalFile];
        
        madarekState.check75State = true;
      } else {
        e.target.value = "";
        madarekFiles.check75File = [];
        madarekState.check75State = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.check75File = [];
    madarekState.check75State = false;
  }
};

const mostanadatKasbokarSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.mostanadatKasbokarFile = [...madarekFiles.mostanadatKasbokarFile , finalFile];
        madarekState.mostanadatKasbokarState = true;
      } else {
        e.target.value = "";
        madarekFiles.mostanadatKasbokarFile = [];
        madarekState.mostanadatKasbokarState = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.mostanadatKasbokarFile = [];
    madarekState.mostanadatKasbokarState = false;
  }
};

const addedOneSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.addedOneFile = [...madarekFiles.addedOneFile , finalFile];
        madarekState.added_one = true;
      } else {
        e.target.value = "";
        madarekFiles.addedOneFile = [];
        madarekState.added_one = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.addedOneFile = [];
    madarekState.added_one = false;
  }
};

const addedTwoSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.addedTwoFile = [...madarekFiles.addedTwoFile , finalFile];
        madarekState.added_two = true;
      } else {
        e.target.value = "";
        madarekFiles.addedTwoFile = [];
        madarekState.added_two = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.addedTwoFile = [];
    madarekState.added_two = false;
  }
};

const addedThreeSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.addedThreeFile = [...madarekFiles.addedThreeFile , finalFile];
        madarekState.added_three = true;
      } else {
        e.target.value = "";
        madarekFiles.addedThreeFile = [];
        madarekState.added_three = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.addedThreeFile = [];
    madarekState.added_three = false;
  }
};

const addedFourSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.addedFourFile = [...madarekFiles.addedFourFile , finalFile];
        madarekState.added_four = true;
      } else {
        e.target.value = "";
        madarekFiles.addedFourFile = [];
        madarekState.added_four = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.addedFourFile = [];
    madarekState.added_four = false;
  }
};

const addedFiveSetFile = (e) => {
  let file = e.target.files;
  if (file.length != 0) {
    for (let i = 0; i < file.length; i++) {
      let finalFile = file[i];
      const mimtypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/webp",
        "application/pdf",
      ];
      if (mimtypes.includes(finalFile.type)) {
        madarekFiles.addedFiveFile = [...madarekFiles.addedFiveFile , finalFile];
        madarekState.added_five = true;
      } else {
        e.target.value = "";
        madarekFiles.addedFiveFile = [];
        madarekState.added_five = false;
        $toast.error("پسوند فایل انتخابی غیر مجاز میباشد", {
          position: "top-left",
        });
      }
    }
  } else {
    e.target.value = "";
    madarekFiles.addedFiveFile = [];
    madarekState.added_five = false;
  }
};

const submit_madarek = async () => {
  if(madarekFiles.hoviyatiFile != null ||
  madarekFiles.etebarsanjiAys != null ||
  madarekFiles.printSeMaheFile != null ||
  madarekFiles.checkSayadiFile != null ||
  madarekFiles.bargeSanaFile != null ||
  madarekFiles.checkSefidFile != null ||
  madarekFiles.skunatiFile != null || 
  madarekFiles.madarekShoghliFile != null || 
  madarekFiles.check75File != null || 
  madarekFiles.mostanadatKasbokarFile != null){
    submitState.value = true;

    const send_madarek = await store.dispatch("update_madarek_files", {
      madarek: madarekFiles,
      utoken: cookies.get("UToken"),
    });
    
    if (send_madarek.statusCode == 200) {
      clearFiles();
      submitState.value = false;
      $toast.success(send_madarek.statusMessage, {
        position: "top-left",
      });
    } else {
      submitState.value = false;
      $toast.error(send_madarek.statusMessage, {
        position: "top-left",
      });
    }

  }else{
    submitState.value = false
    $toast.error(
      "لطفا آیتمی را جهت بروزرسانی تغییر دهید",
      {
        position: "top-left",
      }
    );
  }

  
    
};

const clearFiles = () => {
  madarekFiles.hoviyatiFile = null;
  madarekFiles.etebarsanjiAys = null;
  madarekFiles.printSeMaheFile = null;
  madarekFiles.checkSayadiFile = null;
  madarekFiles.bargeSanaFile = null;
  madarekFiles.checkSefidFile = null;
  madarekFiles.skunatiFile = null;
  madarekFiles.madarekShoghliFile = null;
  madarekFiles.check75File = null;
  madarekFiles.mostanadatKasbokarFile = null;
  madarekFiles.aadedOneFile = null;
  madarekFiles.aadedTwoFile = null;
  madarekFiles.aadedThreeFile = null;
  madarekFiles.aadedFourFile = null;
  madarekFiles.aadedFiveFile = null;
  madarekFiles.cartMelliZamen = null;
  madarekFiles.factorFrush = null;
  madarekFiles.fishVarizi = null;

  


  melliCartZamen.value.value = "";
  fishvarizi.value.value = "";
  factorFrush.value.value = "";
  hoviyatiFile.value.value = "";
  etebarsanjiAys.value.value = "";
  printSeMaheFile.value.value = "";
  checkSayadiFile.value.value = "";
  bargeSanaFile.value.value = "";
  checkSefidFile.value.value = "";
  skunatiFile.value.value = "";
  madarekShoghliFile.value.value = "";
  check75File.value.value = "";
  mostanadatKasbokarFile.value.value = "";
  added_one.value.value = ""
  added_two.value.value = ""
  added_three.value.value = ""
  added_four.value.value = ""
  added_five.value.value = ""
  

  madarekState.melli_cart_zamen_state = false;
  madarekState.factorFrushState = false;
  madarekState.fishVarizeState = false;
  madarekState.mostanadat_hoviyati_state = false;
  madarekState.etebarsanjiAysState = false;
  madarekState.printsemaheState = false;
  madarekState.checkSayadiState = false;
  madarekState.bargetSanaState = false;
  madarekState.checkSefidState = false;
  madarekState.skunatiState = false;
  madarekState.madarekShoghliState = false;
  madarekState.check75State = false;
  madarekState.mostanadatKasbokarState = false;
  madarekState.added_one = false
  madarekState.added_two = false
  madarekState.added_three = false
  madarekState.added_four = false
  madarekState.added_five = false
};
</script>