<template>
    <div>
        <Header />
            <slot />

        <Footer />
    </div>
</template>

<script setup>

import Header from '@/components/statics/Header.vue'
import Footer from '@/components/statics/Footer.vue'

</script>