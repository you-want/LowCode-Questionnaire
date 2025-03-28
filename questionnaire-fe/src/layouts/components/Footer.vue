<template>
  <div class="footer">
    <div class="service-tips">
      <div class="service-tips-line" />
      <span class="service-tips-text">{{ layout.footer.text1 }}</span>
      <div class="service-tips-line" />
    </div>
    <div class="copyright">
      {{ layout.footer.text2 }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutConfig } from '@/store/helpers/layoutHelpers'

const layout = useLayoutConfig()
</script>

<style lang="less" scoped>
.footer {
  padding: 16px 16px;
  margin: 48px 0 24px;
  margin: 0px 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 1.4;
  }
  .service-tips {
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 1.4;
    .service-tips-text {
      margin: 0 5px;
    }
    .service-tips-line {
      display: inline-block;
      width: 50px;
      height: 1px;
      background: rgb(202, 202, 202);
      vertical-align: middle;
    }
  }
}
</style>
