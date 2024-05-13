<script setup lang="ts">
import { IPet } from "@/shared/types/types";
import Slider from "@/shared/ui/slider/Slider.vue";

defineProps<{
  pet: IPet
}>()
</script>

<template>
  <div class="pet">
    <Slider class="images" :images="pet.images" :project-name="pet.title" :sec-per-slide="5"/>
    <div class="details">
      <div class="title">{{ pet.title }}</div>
      <div class="stack">
        Stack: <span v-for="stack in pet.stack" :key="stack">{{ stack }}</span>
      </div>
      <div v-if="pet.url || pet.gitUrl" class="urls">
        <div v-if="pet.url" class="">
          Demo: <a :href="pet.url">{{ pet.url }}</a>
        </div>
        <div v-if="pet.gitUrl" class="">
          Github: <a :href="pet.gitUrl">github</a>
        </div>
      </div>
      <div class="description">{{ pet.description }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pet {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--section-background);
  position: relative;
  flex-shrink: 0;
  min-height: 100%;
  width: 97%;
  border-radius: .5rem;

  .images {
    height: 22.5rem;
    margin-bottom: .5rem;
    min-width: 100%;
  }

  .details {
    display: flex;
    flex-direction: column;
    color: var(--color-not-so-white);
    gap: .5rem;
    padding: .5rem 1rem;
    width: 100%;
    text-align: start;

    .title {
      font-family: var(--font-menu);
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    .stack {
      display: flex;
      gap: .5rem;
      font-family: var(--font-menu);
    }

    .urls {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-family: var(--font-menu);

      a {
        text-decoration: none;
        color: var(--color-not-so-white)
      }
    }
    .description {
      font-family: var(--font-title);
    }
  }
}
</style>