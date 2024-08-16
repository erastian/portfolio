<script setup lang="ts">
import GlitchedWriter from "vue-glitched-writer";
import Loader from "@/shared/ui/loader/Loader.vue";
import { onMounted, ref } from "vue";
import { IContact } from "@/shared/types/types";
import HugeIcon from "@/shared/ui/hugeIcon/HugeIcon.vue";
import { getContacts } from "@/shared/api/useContacts";

defineProps({
  title: String
})

const isLoading = ref<Boolean>(false)
const contactsData = ref<IContact[]>()

onMounted(() => {
  try {
    isLoading.value = true
    getContacts().then((data) => contactsData.value = data).finally(() => isLoading.value = false)
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <div class="section contacts">
    <glitched-writer class="sectionTitle" :text="'#' + title" appear/>
    <div v-if="isLoading" ref="section" class="sectionContent">
      <Loader/>
    </div>
    <div v-else class="sectionContent">
      <HugeIcon v-for="contact in contactsData"
                :key="contact.id"
                :icon="contact.icon"
                :title="contact.title"
                :url="contact.url"
                :color="contact.color"
      />
    </div>
  </div>
</template>

<style scoped>
.section.contacts {
  min-height: 25rem;
}
.sectionContent {
  min-height: 16rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, max-content));
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem;
  justify-content: space-evenly;
  justify-items: center;
  align-content: space-evenly;
  align-items: center;
}
</style>