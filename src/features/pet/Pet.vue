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
        Stack: <span v-for="(stack, i) in pet.stack" :key="stack">{{ stack }}{{i === pet.stack.length - 1 ? '.' : ','}}</span>
      </div>
      <div v-if="pet.url || pet.gitUrl" class="urls">
        <div v-if="pet.url" class="">
          Demo: <a target="_blank" :href="pet.url">{{ pet.url }}</a>
        </div>
        <div v-if="pet.gitUrl" class="">
          Github: <a target="_blank" :href="pet.gitUrl">{{ pet.gitUrl }}</a>
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
      flex-wrap: wrap !important;

      span {
        font-family: var(--font-title);
        align-self: end;
        color: var(--color-not-so-so-white);
      }
    }

    .urls {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-family: var(--font-menu);
      gap: .5rem;

      a {
        text-decoration: none;
        font-family: var(--font-title);
        color: var(--color-not-so-so-white)
      }
    }

    .description {
      margin-top: .5rem;
      font-family: var(--font-title);
      color: var(--color-not-so-so-white)
    }
  }
}
</style>