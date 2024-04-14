<script setup lang="ts">
import { inject, reactive, ref } from "vue";
import Modal from '@/shared/ui/modal/Modal.vue'
import Input from '@/shared/ui/input/Input.vue'
import Button from '@/shared/ui/button/Button.vue'

defineProps({
  showSticky: Boolean
})

const currentSection = inject('currentSection')
const menuState = reactive({
  currentSection
})
const showModal = ref(false)
const email = ref('')
const password = ref('')

const login = () => {
  console.log(email.value, password.value)
}

function openModal() {
  showModal.value = !showModal.value
}
</script>

<template>
  <ul class="menu" :class="{sticky: showSticky}">
    <li>
      <RouterLink to="#stack" :class="{active: menuState.currentSection === 'stack'}">.stack()</RouterLink>
    </li>
    <li>
      <RouterLink to="#projects" :class="{active: menuState.currentSection === 'projects'}">.projects()</RouterLink>
    </li>
    <li>
      <RouterLink to="#pets" :class="{active: menuState.currentSection === 'pets'}">.pets()</RouterLink>
    </li>
    <li>
      <RouterLink to="#contacts" :class="{active: menuState.currentSection === 'contacts'}">.contacts()</RouterLink>
    </li>
    <li>
      <Button :on-click="openModal" variant="link">@</Button>
    </li>
  </ul>

  <Teleport to="body" v-if="showModal">
    <Modal @closeModal="showModal = false">
      <template v-slot:header>
        Authenticate please
      </template>
      <template v-slot:body>
        <form class="loginForm" autocomplete="off">
          <Input v-model="email" type="email" placeholder="Enter email..."/>
          <Input v-model="password" type="password" placeholder="Enter pwd..."/>
        </form>
      </template>
      <template v-slot:footer>
        <Button variant="glitch" :on-click="login">LOGIN</Button>
      </template>
    </Modal>
  </Teleport>
</template>

<style scoped lang="scss">
.menu {
  display: flex;
  list-style: none;
  gap: .85rem;
  font-family: var(--font-menu);
  margin-top: 1.75rem;
}

.menu.sticky {
  margin: auto 0;
}

.menu button {
  background: none;
  border: none;
  font-family: var(--font-menu);

  &:hover {
    cursor: pointer;
  }
}

.menu a,
.menu button {
  text-decoration: none;
  color: var(--color-white);
  font-weight: 500;
  font-size: 1.2rem;
  position: relative;
  letter-spacing: .1rem;
  display: inline-block;
  padding-bottom: .3rem;
  z-index: 1;

  &.active {
    font-weight: 900;
    animation: neon 1.5s ease-in-out infinite alternate;
    transition: 0.3s ease;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    visibility: hidden;
    opacity: 0;
  }

  &:before {
    background-color: #00ffff;
    z-index: -1;
  }

  &:after {
    background-color: #ff00ff;
    z-index: -2;
  }

  &:hover {
    &:before {
      opacity: 1;
      visibility: visible;
      animation: fade-ani 0.3s linear, line-glitchy 0.3s ease-in-out 0.1s infinite;
    }

    &:after {
      opacity: 1;
      visibility: visible;
      animation: fade-ani 0.3s linear, line-glitchy 0.1s ease infinite reverse;
    }
  }
}

.loginForm {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@keyframes line-glitchy {
  0% {
    transform: translate(-1px, 1px);
  }
  25% {
    transform: translate(-1px, -1px);
  }
  50% {
    transform: translate(1px, 1px);
  }
  75% {
    transform: translate(1px, -1px);
  }
  100% {
    transform: translate(-1px, 1px);
  }
}

@keyframes fade-ani {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes neon {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #228dff,
    0 0 70px #228dff, 0 0 80px #228dff, 0 0 100px #228dff, 0 0 150px #228dff;
  }
  to {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #228dff,
    0 0 35px #228dff, 0 0 40px #228dff, 0 0 50px #228dff, 0 0 75px #228dff;
  }
}
</style>