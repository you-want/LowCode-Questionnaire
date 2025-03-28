<template>
  <a-dropdown style="display: inline-block">
    <div class="user-info">
      <a-avatar>{{ userInfo.name.substr(0,1) }}</a-avatar>
      <span class="user-name-info">
        <span>{{ userInfo.name || '游客' }}</span>
        <span style="color: #999;font-size: 12px">{{ roleName }}</span>
      </span>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>退出登录</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { useUserInfo } from '@/store/helpers/userHelpers'

const { userInfo, roleName } = useUserInfo()
</script>

<style lang="less">
.user-info {
  color: white;
  display: inline-block;
  cursor: pointer;
  .user-name-info {
    text-align: left;
    display: inline-flex;
    flex-direction: column;
    margin-left: 12px;
    vertical-align: middle;
    span {
      line-height: 1.3;
    }
  }
}
</style>
