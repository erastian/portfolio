<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = defineProps<{
  activeSlide: number,
  totalSliders: number,
  orientation: 'horizontal' | 'vertical',
  iconSize: number,
}>()

const emit = defineEmits<{
  (event: 'changeSlider', index: number): void
}>();

const changeSliderTo = (i) => {
  if (i === props.activeSlide) return;
  emit('changeSlider', i)
}
</script>

<template>
  <div class="dots" :class="orientation">
    <template v-for="i in totalSliders" :key="i">
      <Icon @click="changeSliderTo(i)" v-if="activeSlide === i" icon="heroicons:stop-solid"
            :width="(iconSize + 'rem')" :height="(iconSize + 'rem')"></Icon>
      <Icon @click="changeSliderTo(i)" v-else icon="heroicons:stop" :width="(iconSize + 'rem')"
            :height="(iconSize + 'rem')"></Icon>
    </template>
  </div>
</template>

<style scoped>
.dots {
  display: flex;
  color: var(--color-not-so-so-white);
  padding: 0 1.5rem;
  gap: .1rem;

  &.vertical {
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  &.horizontal {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  svg {
    cursor: pointer;
    transition: .3s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>