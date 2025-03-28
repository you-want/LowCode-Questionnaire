<template>
  <a-breadcrumb
    :routes="breadRoutes"
    :style="{padding: '10px 20px', color: `${props.color}!impotant`}"
    v-show="breadRoutes.length > 1"
  >
    <template
      #separator
    >
      <RightOutlined :style="{color: props.color}" />
    </template>
    <template #itemRender="{ route, routes }">
      <span
        v-if="routes.indexOf(route) === routes.length - 1"
        :style="{color: props.color}"
      >
        {{ route.breadcrumbName }}
      </span>
      <router-link
        v-else
        :to="{name:`${route.name}`}"
        :style="{color: props.color}"
      >
        {{ route.breadcrumbName }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>

<script lang="ts">
import { RightOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

function useBread () {
  const route = useRoute()
  const breadRoutes = computed(
    () => route
      .matched
      .slice(1)
      .map((item) => (
        {
          name: item.name,
          breadcrumbName: item.meta ? item.meta.title : ''
        }
      ))
  )
  return breadRoutes
}
</script>
<script lang="ts" setup>
const breadRoutes = useBread()
const props = defineProps({
  color: {
    type: String,
    default: '#999'
  }
})
</script>
