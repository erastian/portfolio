<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Loader from "@/shared/ui/loader/Loader.vue";
import GlitchedWriter from "vue-glitched-writer";
import { getProjects } from "@/shared/api/useProjects";
import Project from "@/features/project/Project.vue";
import { IProject } from "@/shared/types/types";
import Dots from "@/shared/ui/sliderDots/Dots.vue";
import { gsap } from "gsap";

defineProps({
  title: String
})

const isLoading = ref<Boolean>(false)
const projectsData = ref<IProject[]>()
const activeProject = ref<number>(1)

onMounted(() => {
  try {
    isLoading.value = true
    getProjects().then((data) => projectsData.value = data)
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
})

const changeSlider = (id: number): void => {
  activeProject.value = id
}

const calcDelay = computed(() => {
  return (projectsData.value?.at(activeProject.value - 1)?.images?.length ?? 0) * 5 || 10
})
let timerFunction = gsap.timeline({
  repeat: -1,
  repeatDelay: calcDelay.value + 5,
  delay: calcDelay.value + 5
})
timerFunction.call(() => {
  if (projectsData.value && activeProject.value < projectsData.value?.length) {
    activeProject.value++
    changeSlider(activeProject.value)
  } else if (projectsData.value && activeProject.value === projectsData.value?.length) {
    activeProject.value = 1
    changeSlider(activeProject.value)
  }
})
</script>

<template>
  <div class="section">
    <glitched-writer class="sectionTitle" :text="'#' + title" appear/>
    <div v-if="isLoading" ref="section" class="sectionContent">
      <Loader/>
    </div>
    <div v-else class="projectSectionContent">
      <Dots @change-slider="changeSlider($event)" :active-slide="activeProject"
            :total-sliders="projectsData?.length || 0" orientation="vertical" :icon-size="1.5"/>
      <Project :project="projectsData ? projectsData[activeProject - 1] : []"/>
    </div>
  </div>
</template>

<style scoped>
.projectSectionContent {
  display: flex;
  flex-direction: row;


}
</style>