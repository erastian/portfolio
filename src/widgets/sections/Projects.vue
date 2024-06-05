<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import Loader from "@/shared/ui/loader/Loader.vue";
import GlitchedWriter from "vue-glitched-writer";
import { getProjects } from "@/shared/api/useProjects";
import Project from "@/features/project/Project.vue";
import { IProject } from "@/shared/types/types";
import Dots from "@/shared/ui/sliderDots/Dots.vue";
import { gsap } from "gsap";
import { useAppStore } from "@/shared/stores/app";
import { storeToRefs } from "pinia";

defineProps({
  title: String
})

const isLoading = ref<Boolean>(true)
const projectsData = ref<IProject[]>()
const activeProject = ref<number>(1)
const appStore = useAppStore()
const { getModalState } = storeToRefs(appStore)


onMounted(() => {
  try {
    isLoading.value = true
    getProjects().then(data => projectsData.value = data).finally(() => isLoading.value = false)
  } catch (e) {
    console.log(e)
  }
})

const changeSlider = (id: number): void => {
  activeProject.value = id
}

const calcDelay = computed(() => {
  return (projectsData.value?.at(activeProject.value - 1)?.images?.length ?? 0) * 5 || 10
})
const timerFunction = gsap.timeline({
  repeat: -1,
  repeatDelay: calcDelay.value + 5,
  delay: calcDelay.value + 5
})
timerFunction.call(() => {
  if (!getModalState.value) {
    if (projectsData.value && activeProject.value < projectsData.value?.length) {
      activeProject.value++
      changeSlider(activeProject.value)
    } else if (projectsData.value && activeProject.value === projectsData.value?.length) {
      activeProject.value = 1
      changeSlider(activeProject.value)
    }
  }
})
const pauseSlider = () => {
  timerFunction.pause()
}

const playSlider = () => {
  timerFunction.resume()
}
onUpdated(() => {
  if (getModalState.value) timerFunction.pause()
  else timerFunction.restart(true)
})

watch(getModalState, (t) => {
  if (t) timerFunction.pause()
  else timerFunction.resume()
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
      <Project v-for="project in projectsData" v-show="project.id === activeProject" :key="project.id"
               :active-project="activeProject" :project="project" @mouseover="pauseSlider()"
               @mouseleave="playSlider()"/>
    </div>
  </div>
</template>

<style scoped>
.projectSectionContent {
  display: flex;
  flex-direction: row;


}
</style>