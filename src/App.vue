
<template>
  <component :is="layout" >
    <RouterView />
  </component>
</template>

<script setup>
  import { RouterLink, RouterView , useRoute  } from 'vue-router'
  import {computed , onMounted} from 'vue'

  const defaultLayout = "default"
  const route = useRoute();

  const layout = computed(() => {
    return (route.meta.layout || defaultLayout) + "-layout"
  })

</script>

<style>

</style>
