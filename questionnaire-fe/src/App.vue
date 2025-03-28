<template>
  <a-config-provider :locale="locale">
    <app-config-provider>
      <router-view />
    </app-config-provider>
  </a-config-provider>
</template>

<script lang="ts" setup>
import locale from 'ant-design-vue/es/locale/zh_CN'
import AppConfigProvider from '@/components/provider/AppProvider'
</script>
