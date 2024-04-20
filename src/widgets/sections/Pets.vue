<script setup lang="ts">
import GlitchedWriter from "vue-glitched-writer";
import Loader from "@/shared/ui/loader/Loader.vue";
import { onMounted, ref } from "vue";
import { getPets } from "@/shared/api/usePets";
import { IPet } from "@/shared/types/types";

defineProps({
  title: String
})

const isLoading = ref<Boolean>(false)
const petsData = ref<IPet[]>()

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
    <div v-else class="sectionContent">
      <div v-for="pet in petsData"> {{ pet }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>