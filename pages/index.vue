<template>
  <div class="page page--intro">
    <nuxt-content v-if="doc" :document="doc" />
    <Pager :prev="prev" :next="next" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import WavePlot from '@/components/WavePlot.vue'
import Pager from '@/components/Pager.vue'

export default Vue.extend({
  components: {
    // eslint-disable-next-line vue/no-unused-components
    WavePlot,
    Pager
  },
  async asyncData({ $content }) {
    const slug = 'index'
    const [prev, next] = await $content('')
      .only(['title', 'path'])
      .sortBy('page')
      .surround(slug)
      .fetch()
    const doc = await $content(slug).fetch()
    return {
      doc,
      prev,
      next
    }
  },
  mounted() {
    this.$nuxt.$emit('menu-close')
    if (window && (window as any).MathJax) {
      ;(window as any).MathJax.Hub.Queue([
        'Typeset',
        (window as any).MathJax.Hub
      ])
    }
  }
})
</script>
