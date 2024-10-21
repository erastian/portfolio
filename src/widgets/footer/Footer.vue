<script setup lang="ts">
import gsap from 'gsap'
import { nextTick, onMounted, ref } from 'vue';
import GlitchedWriter from 'vue-glitched-writer';
import Loader from '@/shared/ui/loader/Loader.vue';
import { getExtra } from '@/shared/api/useExtra';
import { IExtra } from '@/shared/types/types';
import { Icon } from '@iconify/vue';

const isLoading = ref<Boolean>(true)
const extraData = ref<IExtra[] | null>(null)
const extraContent = ref<HTMLElement | any>(null)
const tl = gsap.timeline({ duration: 1, delay: .5, paused: true })

onMounted(() => {
  try {
    isLoading.value = true
    getExtra().then(data => extraData.value = data).finally(() => {
      isLoading.value = false;

      nextTick(() => {
        tl.from(extraContent.value?.children, {
          autoAlpha: 0,
          scale: .95,
          stagger: .15,
        })
        tl.play()
      })
    })
  } catch (e) {
    console.log(e)
  }
})

</script>

<template>
  <div ref="footer" class="section">
    <glitched-writer class="sectionTitle" :text="'#' + 'last but not least'" appear/>

    <div v-if="isLoading" ref="section" class="sectionContent">
      <Loader/>
    </div>
    <div v-else class="footer">
      <div ref="extraContent" class="content">
        <div class="extra" v-for="extra in extraData" :key="extra.id" :title="extra.title">
          <Icon :icon="extra.icon" width="2rem" height="2rem"></Icon>
          <div>{{ extra.description }}</div>
        </div>
      </div>
      <div class="copyrights">
        <div
            title="Dear fellas, please, if you want to copy this, copy it with your own hands to better understand this code or maybe for some improvements, instead of just copypaste it. Warmly regards)">
          personal Portfolio created by
        </div>
        <div><a href="https://www.linkedin.com/in/erastian/" target="_blank">Megg Erastian</a> @ {{ new Date().getFullYear() }}</div>
      </div>
      <div class="aurora">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer {
  min-height: 5rem;
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  border-radius: .5rem .5rem 0 0;
  //background: var(--section-background-transparent);
  background: var(--section-background);

  .content {
    display: flex;
    flex-wrap: wrap;
    min-height: 25rem;
    color: var(--color-not-so-white);
    padding: 1rem 1.5rem;
    width: 100%;
    align-content: flex-start;
    gap: 1rem;
    justify-content: space-between;

    .extra {
      display: flex;
      flex: 0 0 auto;
      width: 30%;
      font-family: var(--font-menu);
      font-size: 1rem;
      gap: 1rem;
      justify-content: flex-start;
      align-items: center;
      min-height: 2rem;

      svg {
        width: 2.5rem;
        height: 2rem;
      }

      div {
        margin: auto 0;
        flex: 0 0 75%;
      }
    }

  }

  .copyrights {
    display: flex;
    justify-content: space-between;
    color: var(--color-gray);
    margin: auto 2rem 1rem;
    font-family: var(--font-menu);
    font-size: .875rem;
    a {
      color: inherit;
      text-decoration: none;
    }
  }


  .aurora {
    --diameter: 50vmax;
    position: absolute;
    opacity: .5;

    div {
      position: absolute;
      width: .001vmin;
      height: .001vmin;
      border-radius: 50%;
      opacity: .25;

      &:nth-child(2) {
        box-shadow: 0 0 var(--diameter) var(--diameter) rgba(255, 0, 255, 0.75);
        animation: hue 10s 0s linear infinite, move1 19s 0s linear infinite;
      }

      &:nth-child(3) {
        box-shadow: 0 0 var(--diameter) var(--diameter) rgba(255, 255, 255, 0.75);
        animation: hue 15s 0s linear infinite, move2 25s 0s linear infinite;
      }

      &:nth-child(4) {
        box-shadow: 0 0 var(--diameter) var(--diameter) rgba(0, 255, 255, 0.75);
        animation: hue 20s 0s linear infinite, move3 15s 0s linear infinite;
        opacity: .2;
      }
    }

    @keyframes hue {
      0% {
        filter: hue-rotate(0deg);
      }
      100% {
        filter: hue-rotate(360deg);
      }
    }

    @keyframes move1 {
      0% {
        top: 0;
        left: 50vw;
      }
      25% {
        left: 0;
      }
      50% {
        top: 100vh;
      }
      75% {
        left: 100vw;
      }
      100% {
        top: 0;
        left: 50vw;
      }
    }

    @keyframes move2 {
      0% {
        top: 50vh;
        left: 100vw;
      }
      25% {
        top: 100vh;
      }
      50% {
        left: 0;
      }
      75% {
        top: 0;
      }
      100% {
        top: 50vh;
        left: 100vw;
      }
    }

    @keyframes move3 {
      0% {
        top: 100vh;
        left: 50vw;
      }
      25% {
        left: 100vw;
      }
      50% {
        top: 0;
      }
      75% {
        left: 0;
      }
      100% {
        top: 100vh;
        left: 50vw;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .content {
      .extra {
        width: 47%
      }
    }
  }
}
</style>