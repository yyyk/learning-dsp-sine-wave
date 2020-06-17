<template>
  <nav class="nav">
    <div class="nav__button" @click="toggleNav">&#62; Table of Contents</div>
    <div :class="['nav__list-container', { active: active }]">
      <ul class="nav__list">
        <li v-for="m of menu" :key="m.path" class="list__item">
          <nuxt-link
            :to="m.path === '/index' ? '/' : m.path"
            exact-active-class="current"
            exact
          >
            {{ m.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  data: () => ({
    active: false
  }),
  computed: {
    ...mapGetters(['menu'])
  },
  mounted() {
    this.$nuxt.$on('menu-close', () => {
      if (this.active) {
        this.active = false
      }
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('menu-close')
  },
  methods: {
    toggleNav() {
      this.active = !this.active
    }
  }
})
</script>

<style lang="scss" scoped>
.nav {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: $background-color;
  border-bottom: 1px solid #2c3e50;
  z-index: 10;
  padding: 16px;
  text-align: left;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
}

.nav__button {
  cursor: pointer;
}

.nav__list-container {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;

  &.active {
    max-height: 100vh;
  }
}

.nav__list {
  list-style: none;
  margin: 24px 0 8px;

  .list__item {
    & + .list__item {
      margin-top: 16px;
    }

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }

      &.current {
        text-decoration: none;
        cursor: default;
        pointer-events: none;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
}
</style>
