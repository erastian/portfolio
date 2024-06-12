<script setup lang="ts">
import Badge from "@/shared/ui/badge/Badge.vue";
import { onMounted, ref, watch } from "vue";
import gsap from "gsap";
import { IDetail } from "@/shared/types/types";

const props = defineProps<{
  details: IDetail[],
  closingSignal: boolean
}>()

const badges = ref<HTMLElement | any>()

onMounted(() => {
  gsap.fromTo(badges.value, {
    height: 0,
    opacity: 0
  }, {
    height: 'auto',
    duration: .3,
    opacity: 1
  })
  gsap.from(badges.value.children, {
    autoAlpha: 0,
    x: +20,
    stagger: .05,
    ease: "back.out(1.7)",
    delay: .35
  })
})
watch(() => props.closingSignal, () => {
  gsap.to(badges.value.children, {
    x: +20,
    opacity: 0,
    duration: .1
  })
  gsap.to(badges.value, {
    height: 0,
    duration: .2,
    delay: .1,
  })
})
</script>

<template>
  <div ref="badges" class="detailsBadges">
    <Badge v-for="detail in details" :color="detail.color" :name="detail.name" :icon="detail.icon"/>
  </div>
</template>

<style scoped>
.detailsBadges {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem .5rem;
  margin-top: 1rem;
}
</style>