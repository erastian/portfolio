<script setup lang="ts">
import Header from "@/widgets/headers/Header.vue";
import GlitchedWriter from "vue-glitched-writer";
import { Icon } from "@iconify/vue";

</script>

<template>
  <Header :show-sticky="true" :show-menu="false"/>
  <div class="section">
    <glitched-writer class="sectionTitle" :text="'#' + '404'" appear/>
    <div class="sectionContent">
      <Icon icon="line-md:emoji-neutral" width="4rem" height="4rem"></Icon>
      <div>
        <glitched-writer text="whooops" preset="zalgo" appear/>
      </div>
      <div>Page not found</div>
    </div>
  </div>
</template>

<style scoped>
.section {
  margin-top: -20rem;

  .sectionContent {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 25rem;

    svg, div {
      color: var(--color-not-so-so-white);
    }

    div {
      font-family: var(--font-menu);
      font-size: 2rem;
      line-height: 2.5rem;
      margin-top: 1rem;

      span {
        font-size: 1.5rem;
      }
    }
  }
}
</style>