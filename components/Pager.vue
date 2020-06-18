<template>
  <div class="pager">
    <nuxt-link
      v-if="prev"
      :to="prev.path === '/index' ? '/' : prev.path"
      exact
      prefetch
      class="prev"
    >
      &#60;
      <span class="link-text">To the previous chapter</span>
    </nuxt-link>
    <nuxt-link v-if="next" :to="next.path" exact prefetch class="next">
      <span class="link-text">To the next chapter</span> &#62;
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { PageLink } from '@/types/Pager'

export default Vue.extend({
  props: {
    prev: {
      type: Object,
      default: null
    } as PropOptions<PageLink | null>,
    next: {
      type: Object,
      default: null
    } as PropOptions<PageLink | null>
  }
})
</script>

<style lang="scss" scoped>
.pager {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px;

  & + .pager {
    margin-top: 16px;
  }

  .prev,
  .next {
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      .link-text {
        text-decoration: underline;
      }
    }
  }

  .next {
    margin-left: auto;
  }

  // TODO: hide in mobile
  // .link-text {
  // }
}
</style>
