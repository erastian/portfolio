<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Dots from "@/shared/ui/sliderDots/Dots.vue";
import { onUnmounted, ref } from "vue";
import gsap from 'gsap'

const props = withDefaults(defineProps<{
  images: string[] | null,
  autoPlay?: boolean,
  secPerSlide?: number,
  projectName?: string
}>(), {
  images: null,
  autoPlay: false,
  secPerSlide: 3
})
let autoPlayFnc: any

if (props.autoPlay) {
  autoPlayFnc = setInterval(() => {
    nextSlide()
  }, props.secPerSlide * 1000)
}
onUnmounted(() => {
  clearInterval(autoPlayFnc)
})

const activeSlide = ref(0)
const image = ref<HTMLElement | any>(null)

const changeSlide = (i: number, direction?: 'left' | 'right') => {
  if (direction === 'left') {
    gsap.fromTo(image.value, {
      opacity: 0,
      duration: 1,
      x: -50,
      onComplete: () => {
        activeSlide.value = i
      }
    }, {
      opacity: 1,
      duration: .5,
      x: 0
    })
  } else if (direction === 'right') {
    gsap.fromTo(image.value, {
      autoAlpha: 0,
      duration: 1,
      x: +50,
      onComplete: () => {
        activeSlide.value = i
      }
    }, {
      autoAlpha: 1,
      duration: .5,
      x: 0
    })
  } else {
    gsap.fromTo(image.value, {
      autoAlpha: 0,
      duration: 1,
      onComplete: () => {
        activeSlide.value = i
      }
    }, {
      autoAlpha: 1,
      duration: .5
    })
  }
}
const prevSlide = () => {
  if (props.images && activeSlide.value === 0) {
    changeSlide(activeSlide.value = props.images?.length - 1, 'left')
  } else {
    changeSlide(activeSlide.value - 1, 'left')
  }
}
const nextSlide = () => {
  if (props.images && activeSlide.value === props.images?.length - 1) {
    changeSlide(0, 'right')
  } else {
    changeSlide(activeSlide.value + 1, 'right')
  }
}
</script>

<template>
  <div class="slider">
    <div class="imgHolder">
      <img ref="image" :src="images?.[activeSlide]" :alt="projectName + ' project image'">
    </div>
    <div v-if="images && images?.length > 1" class="controls">
      <Icon @click="prevSlide" icon="heroicons:chevron-left-16-solid" width="2rem" height="2rem"></Icon>
      <Dots orientation="horizontal" @change-slider="changeSlide($event - 1)" :icon-size="1.3"
            :total-sliders="images?.length" :active-slide="activeSlide + 1"/>
      <Icon @click="nextSlide" icon="heroicons:chevron-right-16-solid" width="2rem" height="2rem"></Icon>
    </div>
  </div>
</template>

<style scoped>
.slider {
  display: flex;
  flex-direction: column;

  .imgHolder {
    min-width: 100%;
    min-height: 20rem;
    overflow: hidden;
    margin-bottom: .5rem;
    position: relative;
    border-radius: .5rem;
    cursor: pointer;

    img {
      aspect-ratio: 1 / 1;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .controls {
    display: flex;
    justify-content: space-between;

    svg {
      color: var(--color-not-so-so-white);
      cursor: pointer;
    }
  }
}
</style>