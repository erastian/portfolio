<script setup lang="ts">
import { IProject } from "@/shared/types/types";
import Slider from "@/shared/ui/slider/Slider.vue";
import { Icon } from "@iconify/vue";

defineProps<{
  project: IProject
}>()
</script>

<template>
  <div class="projectHolder">
    <Slider v-if="project.images?.length > 0" class="imgSlider" :images="project.images" :projectName="project.title" :auto-play="true" :sec-per-slide="5"/>
    <div v-else class="imgSlider imgCap">
      <Icon icon="heroicons:photo" width="4rem" height="4rem"></Icon>
      <div class="text">
        <div>Sorry, but</div>
        <div>no available images in</div>
        <div>{{ project.title }} project</div>
      </div>
    </div>
    <div class="project">
      <div class="projectTitles">
        <div class="title">{{ project.title }}</div>
        <div class="statusLink">
          <div v-if="project.link" class="link">
            <a :href="project.link" target="_blank">{{ project.link }}</a>
          </div>
          <div class="status">{{ project.status }}</div>
        </div>
      </div>
      <div class="projectGoal">
        <span>Goal:</span>{{ project.goal }}
      </div>
      <div class="projectDescription" v-html="project.description"></div>
      <div class="projectResponsibilities">
        <span>My responsibilities:</span>{{ project.responsibilities }}
      </div>
      <div class="projectStack">
        <span>Stack:</span>{{ project.prj_stack }}
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

  .imgCap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-not-so-so-white);
    background: var(--section-background);

    svg {
      margin-bottom: 1rem;
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: .1rem
    }
  }

  .project {
    background: var(--section-background);
    color: var(--color-not-so-white);
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    gap: .75rem;
    padding: 1rem 1.5rem 1rem .5rem;

    & span {
      font-family: var(--font-menu);
      font-weight: 500;
      margin-right: .5rem;
    }

    .projectTitles {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      align-items: flex-end;

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

    .projectDescription:before {
      content: 'Description:';
      font-family: var(--font-menu);
    }
  }
}
</style>