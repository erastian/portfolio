<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Button from "@/shared/ui/button/Button.vue";
import Badges from "@/entities/skills/Badges.vue";
import Rating from "@/shared/ui/rating/Rating.vue";
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { ISkill } from "@/shared/types/types";

defineProps<{
  skill: ISkill
}>()

const badgesOpen = ref<boolean>(false)
const badgesClosingSignal = ref(false)
const icon = ref<HTMLElement | any>()
const exp = ref<HTMLElement | any>()
const description = ref<HTMLElement | any>()

onMounted(() => {
  gsap.from(icon.value, {
    opacity: 0,
    ease: "power1.out",
    duration: 2
  })
  gsap.from(exp.value, {
    textContent: 0,
    duration: 2.5,
    snap: { textContent: 1 },
  })
  gsap.from(description.value, {
    autoAlpha: 0,
    x: +30
  })
})

const toggleBadges = (): void => {
  if (!badgesOpen.value) {
    badgesOpen.value = true
  } else {
    badgesClosingSignal.value = true
    setTimeout(() => {
      badgesOpen.value = false
      badgesClosingSignal.value = false
    }, 300)
  }
}
</script>

<template>
  <div class="skillHolder">
    <div ref="icon" class="skillIcon">
      <Icon :icon="skill.icon" width="4rem" height="4rem"></Icon>
    </div>
    <div class="skillName">{{ skill.tech }}</div>
    <div class="skillLevel">
      <Rating :level="skill.level"/>
    </div>
    <div class="skillExp">
      <span ref="exp">{{ skill.experience }}</span> year{{ skill.experience > 1 ? 's' : '' }}
    </div>
    <div ref="description" class="skillDescription">{{ skill.description }}</div>
    <div v-if="skill.techDetails.length > 0" class="techDetails">
      <Badges :details="skill.techDetails" v-if="badgesOpen" :closingSignal="badgesClosingSignal"/>
      <Button @click="toggleBadges" variant="arrowed">show {{ badgesOpen ? 'less' : 'more' }}</Button>
    </div>
  </div>
</template>

<style scoped>
.skillHolder {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: .5rem;
  grid-row-gap: 0.5rem;
  margin-bottom: 2rem;
  margin-left: -.8rem;


  .skillIcon {
    grid-area: 1 / 1 / 4 / 2;
    display: flex;
    margin: 0 auto;
    filter: drop-shadow(0 0 .2rem var(--color-not-so-white)) grayscale(.85);
    transition: filter .3s ease-in-out;
  }

  &:hover .skillIcon {
    filter: drop-shadow(0 0 .5rem var(--color-not-so-white)) grayscale(0);
  }

  &:hover .techDetails {
    filter: grayscale(0);
    transition: .3s ease-in-out;
  }

  .skillName, .skillLevel, .skillExp {
    font-family: var(--font-menu);
    line-height: 1.25rem;
    height: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
    font-size: 1.1rem;
  }

  .skillName {
    grid-area: 1 / 2 / 2 / 9;
  }

  .skillLevel {
    grid-area: 1 / 9 / 2 / 11;
  }

  .skillExp {
    grid-area: 1 / 11 / 2 / 13;
    text-align: end;
  }

  .skillDescription {
    grid-area: 2 / 2 / 3 / 13;
    margin: .5rem 1rem 0 0;
    font-family: var(--font-title);
  }

  .techDetails {
    grid-area: 3 / 2 / 4 / 13;
    display: flex;
    flex-direction: column;
    filter: grayscale(.8);
  }
}
</style>