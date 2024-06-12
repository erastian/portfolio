<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  name: string,
  color?: string,
  icon?: string
}>()
</script>

<template>
  <div class="detail">
    <div class="detailIcon" :style="{'background-color': color ? color : '#6f6f6f'}">
      <Icon v-if="icon" :icon="icon" width="3rem" height="3rem"></Icon>
      <Icon v-else icon="heroicons:code-bracket" width="2rem" height="2rem"></Icon>
    </div>
    <div class="detailName">{{ name }}</div>
  </div>
</template>

<style scoped>
.detail {
  border: 1px solid #7005AD6B;
  border-radius: .5rem;
  display: flex;
  cursor: default;
  flex: 0 0 auto;

  &:hover {
    animation: glow 1800ms ease-out infinite alternate;
  }

  .detailIcon {
    margin: 0;
    position: relative;
    width: 2.4rem;
    border-radius: .5rem 0 0 .5rem;

    svg {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: drop-shadow(0 0 .3rem var(--color-not-so-so-white));
    }
  }

  .detailName {
    padding: .5rem .5rem .4rem;
    font-family: var(--font-menu);
  }
}

@keyframes glow {
  0% {
    border-color: #334499;
    box-shadow: 0 0 5px rgba(0, 89, 255, 0.46), inset 0 0 5px rgba(112, 5, 173, 0.42), 0 2px 0 #000;
  }
  100% {
    border-color: #6669ff;
    box-shadow: 0 0 20px rgba(0, 111, 255, 0.6), inset 0 0 10px rgba(161, 0, 255, 0.4), 0 2px 0 #000;
  }
}
</style>