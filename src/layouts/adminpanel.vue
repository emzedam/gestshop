<template>
    <div id="wrapper">
        <admin-aside />
        <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->
            <div id="content">
                <admin-navbar />
                <slot />
            </div>

            <admin-footer />
        </div>

    </div>
</template>

<script setup>
import AdminAside from '@/components/statics/adminAside.vue'
import AdminNavbar from '@/components/statics/adminNavbar.vue'
import AdminFooter from '@/components/statics/adminFooter.vue'

</script>

<style scoped>
@import url("../assets/css/sb-admin-2.min.css");
</style>

