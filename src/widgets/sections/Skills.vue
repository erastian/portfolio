<script setup lang="ts">
import GlitchedWriter from "vue-glitched-writer";
import gsap from "gsap";
import { nextTick, onMounted, ref } from "vue";
import { getSkills } from "@/shared/api/useSkills";
import { ISkill } from "@/shared/types/types";
import Skill from "@/features/skill/Skill.vue";
import Loader from "@/shared/ui/loader/Loader.vue";

defineProps({
  title: String
})
const skillsData = ref<ISkill[]>([])
const section = ref<HTMLElement | any>(null)
const isLoading = ref<Boolean>(false)
const tl = gsap.timeline({ duration: 1, delay: .2, paused: true })

onMounted(() => {
  try {
    isLoading.value = true
    getSkills().then((data) => skillsData.value = data).finally(() => {
      isLoading.value = false

      nextTick(() => {
        tl.from(section.value.children, {
          autoAlpha: 0,
          y: +50,
          stagger: .2,
          ease: "back.out(1.7)",
        })
        tl.play()
      })

    })
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <div class="section">
    <glitched-writer class="sectionTitle" :text="'#' + title" appear/>
    <div ref="section" class="sectionContent">
      <Loader v-if="isLoading"/>
      <Skill v-else v-for="skill in skillsData" :key="skill.id" :skill="skill"/>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
