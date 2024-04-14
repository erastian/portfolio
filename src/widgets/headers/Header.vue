<script setup lang="ts">
import GlitchedWriter from 'vue-glitched-writer'
import UserPic from '@/entities/header/UserPic.vue';
import Menu from "@/entities/header/Menu.vue";
import Logo from "@/entities/header/Logo.vue";

defineProps({
  showSticky: Boolean
})
</script>

<template>
  <header class="header" :class="{sticky: showSticky}">
    <div class="header-container">
      <div class="menuHolder">
        <RouterLink v-show="showSticky" to="/" class="smallLogo" >
          <glitched-writer class="firstChild" text="ERASTIAN" appear/>
          <glitched-writer class="secondChild" text="the FrontEnd dev" appear/>
        </RouterLink>
        <RouterLink v-show="!showSticky" to="/">
          <Logo/>
        </RouterLink>
        <Menu :show-sticky="showSticky"/>
      </div>
      <div v-show="!showSticky" class="logoNameHolder">
        <UserPic/>
        <div class="name">
          <glitched-writer text="m." appear/>
          <glitched-writer text="ERASTIAN" appear/>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  height: 25rem;
}
.header.sticky > .header-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: 6rem;
  padding: 0 1.5rem;
  z-index: 99;
}

.header-container {
  height: 25rem;
  background: var(--section-background); //#d77575;
  padding: 1rem 1.5rem 0;
  position: relative;
  top: 0;
  width: 100%;
  transition: 0.3s ease;
}

.header-container:after {
  position: absolute;
  content: "";
  bottom: 1.5rem;
  left: 0;
  right: 0;
  z-index: -1;
  height: 10%;
  width: 100%;
  margin: 0 auto;
  transform: scale(0.95);
  -webkit-filter: blur(1.7rem);
  -moz-filter: blur(1.7rem);
  -ms-filter: blur(1.7rem);
  filter: blur(1.7rem);
  background: linear-gradient(270deg, #0fffc1, #7e0fff);
  background-size: 200% 200%;
  animation: animateGlow 5s ease infinite;
}
@keyframes animateGlow {
  0%{background-position:0 50%}
  50%{background-position:100% 50%}
  100%{background-position:0 50%}
}
.menuHolder {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.menuHolder a {
  text-decoration: none;
  margin: auto 0;
}

.menuHolder .smallLogo .firstChild {
  text-decoration: none;
  color: var(--color-white);
  font-family: var(--font-menu);
  font-size: 3rem;
  margin: auto 0;
}

.menuHolder .smallLogo .secondChild {
  font-size: 1rem;
  text-decoration: none;
  color: var(--color-white);
  font-family: var(--font-menu);
  margin: auto 0 auto .5rem;
}

.logoNameHolder {
  display: flex;
  justify-content: space-between;
  -webkit-min-logical-height: 17rem;
  min-height: 17rem;
}

.name {
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-top: auto;
  font-family: var(--font-menu);
  color: var(--color-white);
  font-size: 6rem;
  font-weight: 100;
  line-height: 4.5rem;
}

.name span {
  margin-top: 1rem;
  margin-left: auto;
  letter-spacing: 0.25rem;
}

.name span:first-child {
  margin-right: -1.45rem;
}

.name span:last-child {
  margin-right: -0.5rem;
}

</style>