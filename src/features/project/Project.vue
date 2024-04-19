<script setup lang="ts">
import { IProject } from "@/shared/types/types";
import Slider from "@/shared/ui/slider/Slider.vue";
import { nextTick, onMounted, onUpdated, ref } from "vue";
import gsap from "gsap";

defineProps<{
  project: IProject
}>()


const leftElements = ref<HTMLElement[] | any>()
const rightElements = ref<HTMLElement[] | any>()
const projectTitles = ref<HTMLElement | any>()

onMounted(() => {
  leftElements.value = document.querySelectorAll('.projectDetails > div > div:first-child')
  rightElements.value = document.querySelectorAll('.projectDetails > div > div:last-child')

  const timeline = gsap.timeline({ duration: 1, delay: .5, paused: true })
  timeline.to(projectTitles.value, { opacity: 1, duration: .5 }, .5)
  timeline.from('.imgSlider', { opacity: 0, scale: .9, duration: .5 }, .3)
  timeline.fromTo(leftElements.value, { opacity: 0, x: -30 }, { opacity: 1, x: 0, }, .6)
  timeline.fromTo(rightElements.value, { opacity: 0, x: 20, }, { opacity: 1, x: 0, }, .7)

  nextTick(() => {
    timeline.play()
  })
})

onUpdated(() => {
  const timeline = gsap.timeline({ duration: 1 })
  timeline.fromTo(projectTitles.value, { opacity: 0 }, { autoAlpha: 1, duration: .3 }, .5)
  timeline.from('.imgSlider', { opacity: 0, scale: .9, duration: .2 }, .5)
  timeline.fromTo(leftElements.value, { opacity: 0, x: -30 }, { opacity: 1, x: 0, }, .6)
  timeline.fromTo(rightElements.value, { opacity: 0, x: 20, }, { opacity: 1, x: 0, }, .7)
})
</script>

<template>
  <div class="projectHolder">
    <Slider class="imgSlider" :images="project.images" :projectName="project.title"
            :auto-play="true" :sec-per-slide="5"/>

    <div class="project">
      <div ref="projectTitles" class="projectTitles">
        <div class="title">{{ project.title }}</div>
        <div class="statusLink">
          <div v-if="project.link" class="link">
            <a :href="project.link" target="_blank">{{ project.link }}</a>
          </div>
          <div class="status">{{ project.status }}</div>
        </div>
      </div>
      <div class="projectDetails">
        <div class="projectGoal">
          <div>Project Goal:</div>
          <div class="">{{ project.goal }}</div>
        </div>
        <div class="projectDescription">
          <div class="">Description:</div>
          <div class="" v-html="project.description"></div>
        </div>
        <div class="projectResponsibilities">
          <div>My responsibilities:</div>
          <div class="">{{ project.responsibilities }}</div>
        </div>
        <div class="projectStack">
          <div>Stack:</div>
          <div class="">{{ project.prj_stack }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projectHolder {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;

  .imgSlider {
    flex: 0 0 20rem;
    min-height: fit-content;
  }

  .project {
    background: var(--section-background);
    color: var(--color-not-so-white);
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: 1rem 1.5rem 1rem .5rem;
    overflow: hidden;


    .projectTitles {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      align-items: flex-end;
      opacity: 0;

      .title {
        font-family: var(--font-menu);
        font-size: 1.25rem;
        font-weight: 500;
        margin: auto 0;
        cursor: default;
      }

      .statusLink {
        display: flex;
        gap: 2rem;

        .link {
          display: flex;

          a {
            color: var(--color-not-so-white);
            text-decoration: none;
            cursor: pointer;
            font-family: var(--font-menu);
            margin: auto 0;
            transition: .3s ease-in-out;

            &:hover {
              color: var(--color-white);
              filter: drop-shadow(0 0 .2rem var(--color-not-so-white));
            }
          }
        }

        .status {
          border: 1px solid rgba(127, 1, 196, 0.42);
          background-color: #7005AD6B;
          border-radius: .3rem;
          padding: .25rem .5rem;
          font-family: var(--font-menu);
          font-weight: 500;
          cursor: default;
        }
      }
    }

    .projectDetails {
      display: flex;
      flex-direction: column;
      gap: .75rem;
      line-height: 1.25rem;

      & div {
        display: flex;
        flex-direction: row;
        align-items: baseline;
      }

      & div > div:first-child {
        display: flex;
        flex: 0 0 12rem;
        justify-content: flex-end;
        align-items: flex-start;
        font-family: var(--font-menu);
        font-weight: 500;
        margin-right: .5rem;
      }

      & div > div:not(:first-child) {
        font-family: var(--font-title);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
}
</style>