<script setup lang="ts">
import { nextTick, onMounted, provide, ref } from "vue";
import gsap from 'gsap'
import Header from "@/widgets/headers/Header.vue";
import Skills from "@/widgets/sections/Skills.vue";
import Projects from "@/widgets/sections/Projects.vue";
import Pets from "@/widgets/sections/Pets.vue";
import Contacts from "@/widgets/sections/Contacts.vue";
import Footer from "@/widgets/footer/Footer.vue";
import StickyHeader from "@/widgets/headers/StickyHeader.vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Analytics } from '@vercel/analytics/vue'

gsap.registerPlugin(ScrollTrigger)


const currentSection = ref<String | null>('')
const sections = ref<HTMLElement[] | any>(null)
const showSticky = ref<Boolean>(false)
const initialSticky = ref<Boolean>(false)
const tl = gsap.timeline({ paused: true })


provide('currentSection', currentSection)

onMounted(() => {
  sections.value = gsap.utils.toArray('.section');

  sections.value.forEach((section: HTMLElement) => {
    ScrollTrigger.create({
      trigger: section,
      start: '100 180',
      end: '80% top',
      // markers: true,
      toggleActions: "restart none none none",
      onUpdate: () => {
        showSticky.value = currentSection.value === 'stack' || currentSection.value === 'projects' || currentSection.value === 'pets' || currentSection.value === 'contacts' || window.innerWidth < 970;
        if (showSticky.value) initialSticky.value = true;
      },
      onEnter: () => {
        currentSection.value = section.getAttribute('id')
      },
      onEnterBack: () => {
        currentSection.value = section.getAttribute('id')
      },
      onLeave: () => {
        if (window.scrollY < 350) {
          currentSection.value = ''
          showSticky.value = false
        }
      },
      onLeaveBack: () => {
        if (window.scrollY < 350) {
          currentSection.value = ''
          showSticky.value = false
        }
      }
    })
  })


  tl.from([ '.section' ], {
    delay: .3,
    duration: 1,
    autoAlpha: 0,
    y: +100,
    stagger: .3,
    ease: "back.out(1.7)",
    onComplete: () => {
      ScrollTrigger.refresh()
    }
  })


  nextTick(() => {
    tl.play()
  })
})

</script>

<template>
  <Analytics/>
  <Header id="header" :show-sticky="showSticky"/>
  <StickyHeader v-if="initialSticky" :show-sticky="showSticky"/>
  <Skills title="stack" id="stack"/>
  <Projects title="projects" id="projects"/>
  <Pets title="pets" id="pets"/>
  <Contacts title="contacts" id="contacts"/>
  <Footer/>
</template>

<style scoped>

</style>
