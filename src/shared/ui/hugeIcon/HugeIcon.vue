<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";

const props = defineProps<{
  title: string,
  icon?: string,
  url: string,
  color?: string
}>()

const mainColor = computed(() => props.color ? props.color : "var(--color-not-so-so-white)")
</script>

<template>
  <a class="icon" :href="url" target="_blank">
    <Icon v-if="icon" :icon="icon" width="5rem" height="5rem"/>
    <Icon v-else icon="heroicons:code-bracket" width="5rem" height="5rem"/>
    <span>{{ title }}</span>
  </a>
</template>

<style scoped lang="scss">
.icon {
  --blur: 1.75rem;
  --box-blur: calc(.5 * var(--blur));
  --glow: v-bind(mainColor);
  --size: 12rem;

  align-items: center;
  border-radius: .5rem;
  border: 4px solid currentColor;
  box-shadow: inset 0 0 0 .125rem rgba(0, 0, 0, .15),
  0 0 0 .125rem rgba(0, 0, 0, .15),
  inset 0 0 var(--box-blur) var(--glow),
  0 0 var(--box-blur) var(--glow);
  color: v-bind(mainColor);
  text-decoration: none;
  display: inline-flex;
  flex-direction: column;
  height: var(--size);
  width: var(--size);
  justify-content: space-around;
  transition: .3s ease-in-out;

  &:hover {
    filter: drop-shadow(0 0 .5rem var(--color-not-so-dark));

    svg {
      filter: drop-shadow(0 0 .4rem var(--color-not-so-dark));
    }

    span {
      filter: drop-shadow(0 0 .15rem var(--color-not-so-dark));
    }
  }

  svg {
    filter: drop-shadow(0 0 .15rem var(--glow));
    transition: .3s ease-in-out;
  }

  span {
    font-family: var(--font-menu);
    font-size: 1.125rem;
    transition: .3s ease-in-out;
  }
}
</style>