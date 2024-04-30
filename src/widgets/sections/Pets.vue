<script setup lang="ts">
import GlitchedWriter from "vue-glitched-writer";
import Loader from "@/shared/ui/loader/Loader.vue";
import { onMounted, ref } from "vue";
import { getPets } from "@/shared/api/usePets";
import { IPet } from "@/shared/types/types";
import Pet from "@/features/pet/Pet.vue";
import gsap from "gsap";

defineProps({
  title: String
})

const isLoading = ref<Boolean>(false)
const petsData = ref<IPet[]>()
const wrapper = ref<HTMLElement | any>(null)
const pets = gsap.utils.toArray(wrapper.value.children)
console.log(pets)

onMounted(() => {
  try {
    isLoading.value = true
    getPets().then((data) => petsData.value = data)
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="section">
    <glitched-writer class="sectionTitle" :text="'#' + title" appear/>
    <div v-if="isLoading" ref="section" class="sectionContent">
      <Loader/>
    </div>
    <div v-else ref="wrapper" class="petsSectionContent">
      <Pet v-for="pet in petsData" :pet="pet"></Pet>
    </div>
  </div>
</template>

<style scoped>
.petsSectionContent {
  display: flex;
  position: relative;
  overflow: hidden;
  min-height: 15rem;
  gap: 1rem;
}
</style>