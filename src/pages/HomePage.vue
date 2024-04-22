<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide, ref } from "vue";
import gsap from 'gsap'
import Header from "@/widgets/headers/Header.vue";
import Skills from "@/widgets/sections/Skills.vue";
import Projects from "@/widgets/sections/Projects.vue";
import Pets from "@/widgets/sections/Pets.vue";
import Contacts from "@/widgets/sections/Contacts.vue";
import Footer from "@/widgets/footer/Footer.vue";

const currentSection = ref<String | null>('')
const sections = ref<HTMLElement | any>(null)
const showSticky = ref<Boolean>(false)

provide('currentSection', currentSection)

onMounted(() => {
  sections.value = document.querySelectorAll('.section')
  window.addEventListener('scroll', updateScroll)
  updateScroll()

  gsap.from([ '.section' ], {
    delay: .3,
    duration: 1,
    autoAlpha: 0,
    y: +100,
    stagger: .3,
    ease: "back.out(1.7)",
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScroll)
})

function updateScroll() {
  sections.value.forEach((section: HTMLElement) => {
    let top = window.scrollY;
    let offset = section.offsetTop - 150;
    let height = section.offsetHeight
    let id = section.getAttribute('id')

    if (top >= offset && top < offset + height) {
      currentSection.value = id
    }
    if (top < 200) {
      currentSection.value = ''
    }
    showSticky.value = top > 350;
  })
}
</script>

<template>
  <Header :show-sticky="showSticky"/>
  <Skills title="stack" id="stack"/>
  <Projects title="projects" id="projects"/>
  <Pets title="pets" id="pets"/>
  <Contacts title="contacts" id="contacts"/>
  <Footer class="footer"/>
</template>

<style scoped>

</style>
