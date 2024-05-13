<script setup lang="ts">
import GlitchedWriter from "vue-glitched-writer";
import Loader from "@/shared/ui/loader/Loader.vue";
import { onMounted, ref } from "vue";
import { getPets } from "@/shared/api/usePets";
import { IPet } from "@/shared/types/types";
import Pet from "@/features/pet/Pet.vue";
import { Icon } from "@iconify/vue";
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

defineProps({
  title: String
})

const isLoading = ref<Boolean>(false)
const petsData = ref<IPet[]>()
const carousel = ref<HTMLElement | any>(null)
const breakpoints = ref({
  768: {
    itemsToShow: 2
  },
  1042: {
    itemsToShow: 3
  }
})


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
const next = () => {
  carousel.value.next()
}
const prev = () => {
  carousel.value.prev()
}
</script>

<template>
  <div class="section">
    <glitched-writer class="sectionTitle" :text="'#' + title" appear/>
    <div v-if="isLoading" ref="section" class="sectionContent">
      <Loader/>
    </div>
    <div v-else class="petsSectionContent">
      <Carousel ref="carousel" :wrap-around="true" :breakpoints="breakpoints" :class="petsData && petsData?.length > 3 ? 'short' : ''">
        <Slide v-for="pet in petsData" :pet="pet">
          <Pet :pet="pet"/>
        </Slide>
      </Carousel>
      <div class="controls">
        <div @click="prev" v-if="petsData && petsData?.length > 3" class="left">
          <Icon icon="heroicons:chevron-left" width="2rem" height="2rem"></Icon>
        </div>
        <div @click="next" v-if="petsData && petsData?.length > 3" class="right">
          <Icon icon="heroicons:chevron-right" width="2rem" height="2rem"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.petsSectionContent {
  display: flex;
  position: relative;
  justify-content: center;

  .carousel {
    width: 100%;
    z-index: 10;

    &.short {
      width: calc( 100% - 4rem );
    }
  }

  .controls {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 100%;

    .left,
    .right {
      cursor: pointer;
      display: flex;
      justify-items: center;
      align-items: center;
      color: var(--color-not-so-white);
      border-radius: .3rem;
      position: relative;
      transition: .3s ease-in-out;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 10%, var(--color-not-so-dark) 50%, rgba(255, 255, 255, 0) 90%);
        z-index: 1;
        opacity: 0;
        transition: .3s ease-in-out;
      }

      svg {
        z-index: 2;
      }

      &:hover {
        color: var(--color-white);

        &::before {
          opacity: .5;
        }

        svg {
          filter: drop-shadow(0 0 .5rem var(--color-not-so-so-white));
          z-index: 2;
        }
      }
    }

    .left {
      margin-right: .5rem;
    }

    .right {
      margin-left: .5rem;
    }
  }
}
</style>