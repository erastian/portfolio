<script setup lang="ts">
import { IButton } from "@/shared/types/types";

withDefaults(defineProps<IButton>(), {
  variant: 'link',
  disabled: false,
  type: 'button',
})
</script>

<template>
  <button @click="onClick" :class="variant" :type="type" :disabled="disabled || loading">
    <slot>Button</slot>
  </button>
</template>

<style scoped lang="scss">
button {
  padding: .5rem 1rem;
  font-family: var(--font-menu);
  font-size: 1.1rem;
  border-radius: .25rem;
  cursor: pointer;

  &.link{
    padding: 0;
  }

  &.glitch {
    position: relative;
    color: var(--color-white);
    background-color: var(--color-dark);

    &:hover {
      animation: glitch-bg .2s steps(3) forwards;
      color: var(--color-dark);

      &::after {
        content: '_:O_ :> P_R ___D:__';
        position: absolute;
        background-color: var(--color-not-so-white);
        width: 100%;
        left: 0;
        top: 0;
        z-index: 99;
        padding: 0.5rem 0;
        border-radius: .25rem;
        animation: glitch 1s steps(10) forwards;
        box-shadow: -5px 5px 0px #000;
      }
    }
  }

  &.arrowed {
    width: 100%;
    position: relative;
    background: none;
    border: none;
    color: var(--color-not-so-so-white);
    transition: 0.3s ease;
    filter: drop-shadow(0 0 .5rem var(--color-not-so-dark));

    &:before,
    &:after {
      content: '';
      position: absolute;
      border-top: 1px solid var(--color-dark-gray);
      width: calc(50% - 4rem);
      top: 50%;
      filter: drop-shadow(0 0 .5rem var(--color-not-so-dark));
      transition: 0.3s ease;
    }
    &:before {
      left: 0
    }
    &:after {
      right: 0
    }

    &:hover {
      color: var(--color-not-so-white);
      filter: drop-shadow(0 0 .5rem var(--color-not-so-so-white));

      &:before,
      &:after {
        border-color: var(--color-gray);
      }
    }
  }
}


@keyframes glitch-bg {
  0% {
    background-color: #0ca480;
  }
  10% {
    background-color: var(--color-dark);
  }
  100% {
    filter: none;
    background-color: #fff;
  }
}

@keyframes glitch {
  0% {
    transform: translateX(-30px);
    clip: rect(-3px, 300px, 0px, 0px);
  }
  5% {
    clip: rect(0px, 300px, 0px, 0px);
  }
  10% {
    clip: rect(-3px, 300px, 0px, 0px);
  }
  15% {
    clip: rect(-3px, 300px, 0px, 0px);
  }
  20% {
    clip: rect(100px, 300px, 100px, 0px);
  }
  25% {
    clip: rect(0px, 300px, 200px, 0px);
  }
  30% {
    clip: rect(100px, 300px, 0px, 0px);
  }
  35% {
    clip: rect(0px, 300px, 200px, 0px);
  }
  40% {
    clip: rect(100px, 300px, 0px, 0px);
  }
  45% {
    background-color: var(--color-not-so-white);
    clip: rect(-3px, 300px, 0px, 0px);
  }
  50% {
    transform: translateX(30px);
    background-color: #0ca480;
    clip: rect(100px, 450px,100px, 0px);
  }
  75% {
    background-color: var(--color-not-so-white);
    clip: rect(0px, 450px, 0px, 0px);
  }
  80% {
    clip: rect(100px, 450px, 100px, 0px);
  }
  85% {
    clip: rect(0px, 450px, 0px, 0px);
  }
  90% {
    clip: rect(0px, 450px, 0px, 0px);
  }
  95% {
    clip: rect(0px, 450px, 0px, 0px);
  }
  100% {
    clip: rect(0px, 450px, 0px, 0px);
  }
}
</style>