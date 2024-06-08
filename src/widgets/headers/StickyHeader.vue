<script setup lang="ts">
import GlitchedWriter from "vue-glitched-writer";
import Menu from "@/entities/header/Menu.vue";
import gsap from "gsap";
import { onMounted, onUpdated, ref } from "vue";

const props = withDefaults(defineProps<{
  showSticky?: boolean,
  showMenu?: boolean
}>(), {
  showMenu: true
})
const stickyHeader = ref<HTMLElement | null>(null)
const tl = gsap.timeline({paused: true})

onMounted(() => {
  tl.fromTo(stickyHeader.value, {
    opacity: 0,
    y: -100,
  }, {
    opacity: 1,
    y: 0,
    duration: .5,
  })
  tl.play()
})

onUpdated(() => {
  if (props.showSticky) {
    tl.play()
  } else {
    tl.reverse()
  }
})

</script>

<template>
<div ref="stickyHeader" class="sticky-header">
  <div class="header-container">
    <div class="menuHolder">
      <RouterLink to="/" class="smallLogo" >
        <glitched-writer class="firstChild" text="ERASTIAN" appear/>
        <glitched-writer class="secondChild" text="the FrontEnd dev" appear/>
      </RouterLink>
      <Menu v-if="showMenu" :show-sticky="true"/>
    </div>
  </div>
</div>
</template>

<style scoped>
.sticky-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  .header-container {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    height: 6rem;
    padding: 0 1.5rem;
    z-index: 99;
    border-radius: 0;
    background: var(--section-background);
    width: 100%;

    &:after {
      position: absolute;
      content: "";
      bottom: 1.5rem;
      left: -20rem;
      right: -20rem;
      z-index: -1;
      height: 10%;
      width: 110%;
      margin: 0 auto;
      transform: scale(0.95);
      -webkit-filter: blur(1.7rem);
      -moz-filter: blur(1.7rem);
      -ms-filter: blur(1.7rem);
      filter: blur(1.7rem);
      background: linear-gradient(270deg, #7e0fff, #0fffc1);
      background-size: 200% 200%;
      animation: animateGlow 5s ease infinite;
    }

    .menuHolder {
      display: flex;
      justify-content: space-between;
      width: 100%;

      a {
        text-decoration: none;
        margin: auto 0;
      }

      .smallLogo .firstChild {
        text-decoration: none;
        color: var(--color-white);
        font-family: var(--font-menu);
        font-size: 3rem;
        margin: auto 0;
      }

      .smallLogo .secondChild {
        font-size: 1rem;
        text-decoration: none;
        color: var(--color-white);
        font-family: var(--font-menu);
        margin: auto 0 auto .5rem;
      }
    }
  }
}

@keyframes animateGlow {
  0% {
    background-position: 0 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0 50%
  }
}
</style>