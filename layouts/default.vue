<template>
  <div class="layout">
    <Navbar />
    <nuxt />
    <footer>&copy; {{ new Date().getFullYear() }} - Learning DSP (Sine Wave)</footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '@/components/Navbar.vue'

export default Vue.extend({
  components: {
    Navbar
  }
})
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  min-height: 100vh;
}

footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 60px;
  text-align: center;
}
</style>
