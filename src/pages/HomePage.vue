<script setup lang="ts">
import { nextTick, onMounted, onUpdated, provide, ref, watch } from "vue";
import gsap from 'gsap'
import Header from "@/widgets/headers/Header.vue";
import Skills from "@/widgets/sections/Skills.vue";
import Projects from "@/widgets/sections/Projects.vue";
import Pets from "@/widgets/sections/Pets.vue";
import Contacts from "@/widgets/sections/Contacts.vue";
import Footer from "@/widgets/footer/Footer.vue";
import StickyHeader from "@/widgets/headers/StickyHeader.vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRoute } from "vue-router";

gsap.registerPlugin(ScrollTrigger)


const currentSection = ref<String | null>('')
const sections = ref<HTMLElement[] | any>(null)
const content = ref<HTMLElement[] | any>(null)
const showSticky = ref<Boolean>(false)
const initialSticky = ref<Boolean>(false)
const tl = gsap.timeline({ paused: true })
const route = useRoute();


provide('currentSection', currentSection)

onMounted(() => {
  // currentSection.value = String(route.hash.split('#')[1])
  sections.value = gsap.utils.toArray('.section');

  sections.value.forEach((section: HTMLElement, i: number) => {
    ScrollTrigger.create({
      // containerAnimation: scrollContainer,
      trigger: section,
      start: "100 180",
      end: "bottom top",
      markers: true,
      toggleActions: "play none none none",
      onToggle: self => {
        self.isActive
        // console.log('toggle', self)
      },

      // onUpdate: () => {
      //   // currentSection.value = section.getAttribute('id')
      //   showSticky.value = currentSection.value === 'stack' || currentSection.value === 'projects' || currentSection.value === 'pets' || currentSection.value === 'contacts';
      //   if (showSticky.value) initialSticky.value = true;
      //   console.log('HomePage: onUpdate', currentSection.value)
      // },
      onEnter: () => {
        currentSection.value = section.getAttribute('id')
        initialSticky.value = true;
        console.log('HomePage: onEnter', currentSection.value)
      },
      onEnterBack: () => {
        currentSection.value = section.getAttribute('id')
        console.log('HomePage: onEnterBack', currentSection.value)
      },
      // onLeave: () => {
      //   if (window.scrollY < 350) {
      //     currentSection.value = ''
      //     showSticky.value = false
      //   }
      //   console.log('HomePage: onLeave', currentSection.value)
      // },
      onLeaveBack: () => {
        if (window.scrollY < 350) {
          currentSection.value = ''
          showSticky.value = false
        }
        console.log('HomePage: OnLeaveBack', currentSection.value, window.scrollY)
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
    ScrollTrigger.refresh()
    tl.play()
  })
})

// watch(() => route.hash, (newHash, oldHash) => {
//   console.log(newHash, oldHash)
// }, {
//   immediate: true,
//   deep: true
// })
</script>

<template>
  <Header id="header" :show-sticky="showSticky"/>
  <StickyHeader v-if="initialSticky" :show-sticky="showSticky"/>
  <div ref="content" class="content">
    <Skills title="stack" id="stack"/>
    <Projects title="projects" id="projects"/>
    <Pets title="pets" id="pets"/>
    <Contacts title="contacts" id="contacts"/>
    <Footer/>
  </div>
</template>

<style scoped>

</style>
