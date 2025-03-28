<template>
  <router-link
    to="/"
    class="logo-wrapper"
    :title="title"
  >
    <img
      class="logo-icon"
      src="@/assets/logo.png"
      :alt="title"
    >
    <span
      class="logo-title"
      v-if="showTitle"
    >{{ title }}</span>
  </router-link>
</template>

<script lang="ts" setup>
import { TITLE_SUFFIX } from '@/constants/common'
import { ref } from 'vue'
defineProps({
  showTitle: {
    type: Boolean,
    default: true
  }
})
const title = ref(TITLE_SUFFIX)
</script>

<style lang="less">
.logo-wrapper {
  width: 100%;
  height: 64px;
  line-height: 0;
  padding: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .logo-icon{
    width: 40px;
    height: 40px;
  }
  .logo-title {
    font-size: 20px;
    font-weight: 600;
    color: white;
    margin-left: 16px;
  }
}

</style>
