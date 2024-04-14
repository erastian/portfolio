<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import gsap from "gsap";

defineProps<{
  level: number
}>()

const rating = ref<HTMLElement | any>()

onMounted(() => {
  gsap.from(rating.value.children, {
    autoAlpha: 0,
    x: +20,
    stagger: .05,
    ease: "back.out(1.7)"
  })
})
</script>

<template>
  <div ref="rating" class="ratingHolder">
    <Icon v-for="i in level" :key="i" icon="heroicons:stop-solid" width="1.25rem" height="1.25rem"></Icon>
    <Icon v-for="i in (10 - level)" :key="i" icon="heroicons:stop" width="1.25rem" height="1.25rem"></Icon>
  </div>
</template>

<style scoped>
.ratingHolder {
  display: flex;
}
</style>