<template>
  <!-- =======================
    About START -->
  <section class="pb-0 pb-xl-5">
    <div class="container text-center mb-3 mt-3">
        <div class="p-10 mb-5">
            <h3 class="text-center"> لیست بانک ها </h3>
        </div>
        <div class="row align-items-start">
            <div class="col mb-4" v-for="(bank , index) in banksList" :key="index">
                <div class="card text-center border">
                    <div class="card-body">
                        <h5 class="card-title">{{ bank.name }}</h5>
                        <button type="button" @click="doRequest(bank.name)" class="btn btn-primary btn-sm">مشاهده</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </section>
  <!-- =======================
    About END -->
</template>

<script>
export default {
    name: "About",
    data() {
        return {
            banksList: [
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
            ]
        }
    },
    computed: {
        authuser(){
            return this.$store.getters.get_authuser
        } 
    },
    methods: {
        doRequest(bank_name) {
            this.$cookies.set("requested-bank", bank_name, 60*60*24)
            this.$router.push("/userpanel")
        }
    }
}



</script>
