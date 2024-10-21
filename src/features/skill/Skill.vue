<script setup lang="ts">
import { Icon } from '@iconify/vue';
import Button from '@/shared/ui/button/Button.vue';
import Badges from '@/entities/skills/Badges.vue';
import Rating from '@/shared/ui/rating/Rating.vue';
import { nextTick, onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ISkill } from '@/shared/types/types';

defineProps<{
  skill: ISkill
}>()

const badgesOpen = ref<boolean>(false)
const badgesClosingSignal = ref(false)
const icon = ref<HTMLElement | any>()
const exp = ref<HTMLElement | any>()
const description = ref<HTMLElement | any>()
const tl = gsap.timeline({ paused: true })

onMounted(() => {
  tl.from(icon.value, {
    opacity: 0,
    ease: 'power1.out',
    duration: 2
  }, 1)
  tl.from(exp.value, {
    textContent: 0,
    duration: 2.5,
    snap: { textContent: 1 },
  }, 1)
  tl.from(description.value, {
    autoAlpha: 0,
    x: +30
  }, 1)
  nextTick(() => {

    tl.play()
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

const computeExp = (exp: number): number => {
  return Math.round((Math.floor(Date.now() / 1000) - exp) / 60 / 60 / 24 / 365)
}
</script>

<template>
  <div class="skillHolder">
    <div ref="icon" class="skillIcon">
      <Icon :icon="skill.icon" width="4rem" height="4rem"></Icon>
    </div>
    <div class="skillName">{{ skill.tech }}</div>
    <div class="skillLevel" title="Level of technology proficiency">
      <Rating :level="skill.level"/>
    </div>
    <div class="skillExp"
         title="How long have I been familiar with the technology (The useful usage time of the technology is of course lower)">
      <span ref="exp">{{ computeExp(skill.experience) }}</span> year{{ computeExp(skill.experience) > 1 ? 's' : '' }}
    </div>
    <div ref="description" class="skillDescription" v-html="skill.description"></div>
    <div v-if="skill.techDetails.length > 0" class="techDetails">
      <Badges :details="skill.techDetails" v-if="badgesOpen" :closingSignal="badgesClosingSignal"/>
      <Button @click="toggleBadges" variant="arrowed">show {{ badgesOpen ? 'less' : 'more' }}</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
    font-size: .975rem;
    line-height: 1.175rem;

    &:deep(a) {
      cursor: pointer;
      text-decoration: none;
      color: var(--color-not-so-white);
      font-family: var(--font-menu);
      font-weight: 700;
      transition: color .3s ease-in-out;

      &:hover {
        text-decoration: underline;
        color: var(--color-white);
        filter: drop-shadow(0 0 .5rem var(--color-not-so-so-white));
      }
    }

  }

  .techDetails {
    grid-area: 3 / 2 / 4 / 13;
    display: flex;
    flex-direction: column;
    filter: grayscale(.8);
  }
}

@media screen and (max-width: 1000px) {
  .skillHolder {
    .skillIcon {
      grid-area: 1 / 1 / 2 / 3;
    }

    .skillName {
      grid-area: 1 / 3 / 2 / 8;
      text-align: left;
    }

    .skillLevel {
      grid-area: 1 / 8 / 2 / 11;
    }

    .skillExp {
      grid-area: 1 / 11 / 2 / 13;
    }

    .skillDescription {
      grid-area: 2 / 1 / 3 / 13;
      margin: .5rem 1rem 0;
    }
    .techDetails {
      grid-area: 3 / 1 / 4 / 13;
      margin: 0 1rem;
    }
  }
}
</style>