<script setup lang="ts">
defineProps<{
  type: 'text' | 'password' | 'email',
  placeholder?: string,
}>()

const modelValue = defineModel()
</script>

<template>
  <input v-model="modelValue" :type="type" :placeholder="placeholder"/>
</template>

<style scoped>
input {
  padding: 0.5rem 1rem;
  font-family: var(--font-menu);
  background: var(--color-dark);
  color: var(--color-white);
  border: 1px solid var(--color-not-so-dark);
  border-radius: .25rem;
  filter: none;
  width: 100%;
}

input::placeholder,
input::-webkit-input-placeholder,
input::-moz-placeholder,
input:-webkit-autofill {
  background: var(--color-dark);
  color: var(--color-not-so-white)
}

input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(13, 0, 255, 0.2), inset 0 0 5px rgba(0, 64, 255, 0.1), 0 2px 0 #000;
  animation: glow 1800ms ease-out infinite alternate;
}

@keyframes glow {
  0% {
    border-color: #334499;
    box-shadow: 0 0 5px rgba(0, 89, 255, 0.46), inset 0 0 5px rgba(112, 5, 173, 0.42), 0 2px 0 #000;
  }
  100% {
    border-color: #6669ff;
    box-shadow: 0 0 20px rgba(0, 111, 255, 0.6), inset 0 0 10px rgba(161, 0, 255, 0.4), 0 2px 0 #000;
  }
}
</style>