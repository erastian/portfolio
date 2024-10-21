<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Dots from "@/shared/ui/sliderDots/Dots.vue";
import { onMounted, ref, watch } from "vue";
import { gsap } from 'gsap'
import Modal from "@/shared/ui/modal/Modal.vue";
import { useAppStore } from "@/shared/stores/app";
import { storeToRefs } from "pinia";

const props = withDefaults(defineProps<{
  images: string[] | null,
  autoPlay?: boolean,
  secPerSlide?: number,
  startFrom?: number,
  projectName?: string,
  isVisible?: boolean
}>(), {
  images: null,
  autoPlay: false,
  startFrom: 0,
  secPerSlide: 3,
  isVisible: true
})

const activeSlide = ref(0)
const slideForModal = ref(0);
const showModal = ref<boolean>(false)
const isSliderActive = ref<boolean>(false);
const items = ref<HTMLCollection | null>(null);
const wrapper = ref<HTMLElement | null>(null);
const itemsCount = ref<number>(0);
const appStore = useAppStore()
const { getModalState } = storeToRefs(appStore)
const isVisible = ref(() => props.isVisible)


// console.log('images', props.images)
onMounted(() => {
  if (props.images && props.images?.length > 0) {
    items.value = wrapper.value?.children as HTMLCollection;
    itemsCount.value = wrapper.value?.children.length || 0;
    changeSlideTo(props.startFrom);
  }
})

// onUpdated(() => {
//   if (props.images && props.images?.length > 0) {
//     if (!props.isVisible) {
//       pauseSlider()
//     } else if (props.autoPlay && props.images?.length > 1) playSlider()
//   }
// })

let currentIndex: number = -1;
let animating: boolean;
const translateAmount = 30, rotateAmount = 10;

function changeSlideTo(index: number, direction: string = 'left') {
  const sections = items.value || [];
  const wrap = gsap.utils.wrap(0, sections.length);
  index = wrap(index);

  let leave: object, enter: object;

  const defaultPosition = { transform: 'none', autoAlpha: 1 };

  const tl = gsap.timeline({
    defaults: { duration: .3, ease: 'power2.inOut', autoAlpha: 0 },
    onComplete: () => {
      animating = false
    }
  });

  switch (direction) {
    case 'left':
      leave = { xPercent: -translateAmount, rotationY: -rotateAmount };
      enter = { xPercent: translateAmount, rotationY: rotateAmount };
      break;
    case 'right':
      leave = { xPercent: translateAmount, rotationY: rotateAmount };
      enter = { xPercent: -translateAmount, rotationY: -rotateAmount };
      break;
  }

  tl.fromTo(sections[index], enter, defaultPosition);

  activeSlide.value = index;

  startTime = Date.now();
  currentTime.value = 0;

  if (currentIndex > -1 || currentIndex === 0) {
    tl.to(sections[currentIndex], leave, 0).set(sections[currentIndex], { transform: 'none' });
  }

  currentIndex = index
}

let startTime = Date.now();
let timerId: NodeJS.Timeout;
const currentTime = ref(0);

function countTime() {
  if (props.autoPlay && props.isVisible && !getModalState.value) {
    const result = Date.now() - startTime;
    currentTime.value = result;

    if (result >= props.secPerSlide * 1000) {
      activeSlide.value += 1;
      changeSlideTo(activeSlide.value);
      startTime = Date.now();
      clearTimeout(timerId);
      countTime();
    } else {
      timerId = setTimeout(countTime, 100);
    }
  } else {
    return
  }
}

const pauseSlider = () => {
  isSliderActive.value = false;
  startTime = Date.now() - currentTime.value;
  clearTimeout(timerId);
}
const playSlider = () => {
  if (!showModal.value || !getModalState.value) {
    isSliderActive.value = true;
    countTime();
  }
}
const prevSlide = () => {
  changeSlideTo(currentIndex - 1, 'right');
}
const nextSlide = () => {
  changeSlideTo(currentIndex + 1, 'left');
}

const openModal = (idx: number) => {
  slideForModal.value = idx;
  useAppStore().setModalState(true)
  pauseSlider();
  showModal.value = true;
}
const closeModal = () => {
  showModal.value = false
  useAppStore().setModalState(false)
  playSlider();
  slideForModal.value = 0;
}

watch(getModalState, (t) => {
  if (props.autoPlay && props.images) {
    if (t) pauseSlider()
    else playSlider()
  }
})
watch(isVisible.value, (t) => {
  if (t) {
    if (props.autoPlay && props.images && props.images?.length > 1) playSlider();
  } else {
    pauseSlider()
  }
})

</script>

<template>
  <div v-if="props.images && props.images?.length > 0" @mouseover="pauseSlider()" @mouseleave="playSlider()"
       class="slider">
    <div ref="wrapper" class="imgWrapper">
      <div v-for="(img, idx) in props.images" :key="img" ref="items" class="imgHolder">
        <img @click="openModal(idx)" ref="image" :src="img" :alt="projectName + ' project image'">
      </div>

      <Teleport to="body" v-if="showModal">
        <Modal @closeModal="closeModal">
          <template v-slot:header>
            {{ projectName }} image
          </template>
          <template v-slot:body>
            <img :src="images?.[slideForModal]" :alt="projectName + ' project image'">
          </template>
        </Modal>
      </Teleport>
    </div>
    <div v-if="images && images?.length > 1" class="controls">
      <Icon @click="prevSlide" icon="heroicons:chevron-left-16-solid" width="2rem" height="2rem"></Icon>
      <Dots orientation="horizontal" @change-slider="changeSlideTo($event - 1)" :icon-size="1.3"
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
  justify-content: flex-start;
  height: 100%;


  .imgWrapper {
    min-height: 20rem;
    margin-bottom: .5rem;
    position: relative;
    overflow: hidden;

    .imgHolder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;

      img {
        aspect-ratio: 1 / 1;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: .5rem;
      }
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
    border-radius: .5rem;

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