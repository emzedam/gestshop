<template>
    <main>
	


    <!-- =======================
    About START -->
    <section class="pb-0 pb-xl-5 bg-primary text-white">
        <div class="container py-5">
            <div class="row g-4 justify-content-center align-items-center">
                درخواست شما با موفقیت ثبت شد ، لطفا منتظر تایید اطلاعاتتان توسط مدیریت بمانید
            </div>
            <div class="w-100 d-flex align-items-center justify-content-center text-center mt-4">
                <router-link to="/userpanel" class="btn btn-white btn-md text-primary text-center">بازگشت به حساب کاربری</router-link>
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
</script>