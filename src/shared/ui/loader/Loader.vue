<script setup lang="ts">

import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="loader">
    <Icon icon="line-md:moon-filled-to-sunny-filled-loop-transition" width="3rem" height="3rem"></Icon>
    <div class="loadingText">loading...</div>
  </div>
</template>

<style scoped>
.loader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 30rem;
  color: var(--color-not-so-so-white);

  svg {
    opacity: .75;
  }

  .loadingText {
    margin-top: .3rem;
    font-family: var(--font-menu);
  }
}
</style>