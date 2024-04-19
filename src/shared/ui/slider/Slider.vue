<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Dots from "@/shared/ui/sliderDots/Dots.vue";
import { onMounted, onUnmounted, onUpdated, ref } from "vue";
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


const activeSlide = ref(0)
const image = ref<HTMLElement | any>(null)
const animBreaker = ref<boolean>(false)

const timerFunction = gsap.timeline({ repeat: -1, repeatDelay: props.secPerSlide, delay: props.secPerSlide })
timerFunction.call(() => {
  nextSlide()
})

const changeSlide = (i: number, direction?: 'left' | 'right') => {
  const calcDirection = (): number => {
    if (direction === 'left') {
      return -350
    } else if (direction === 'right') {
      return +350
    } else return 0
  }

  gsap.to(image.value, {
    startAt: {
      x: 0,
      opacity: 1
    },
    opacity: 0,
    x: calcDirection() * -1,
    duration: .2,
    ease: "power1.in",
    onComplete: () => {
      activeSlide.value = i
    }
  })
  gsap.to(image.value, {
    startAt: {
      x: calcDirection(),
    },
    autoAlpha: 1,
    duration: .5,
    delay: .2,
    x: 0,
    ease: "power1.out"
  })
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

onMounted(() => {
  if (props.autoPlay) {
    timerFunction.play()
  }
})
onUpdated(() => {
  if (!props.images) {
    activeSlide.value = 0
    animBreaker.value = true
    timerFunction.kill()
  } else if (props.images && animBreaker.value) {
    activeSlide.value = 0
    animBreaker.value = false
    timerFunction.restart(true)
  }
})

onUnmounted(() => {
  timerFunction.kill()
})
</script>

<template>
  <div v-if="images && images?.length > 0" @mouseover="timerFunction.pause()" @mouseleave="timerFunction.play()"
       class="slider">
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
  <div v-else class="slider">
    <div class="imgCap">
      <Icon icon="heroicons:photo" width="4rem" height="4rem"></Icon>
      <div class="text">
        <div>Sorry, but</div>
        <div>no available images in</div>
        <div>{{ props.projectName }} project</div>
      </div>
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

  .imgCap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-not-so-so-white);
    background: var(--section-background);
    height: 100%;
    max-height: 25rem;

    svg {
      margin-bottom: 1rem;
    }

    .text {
      font-family: var(--font-menu);
      font-size: .95rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: .1rem;
      color: var(--color-gray);
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