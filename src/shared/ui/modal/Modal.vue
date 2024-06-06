<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onBeforeUnmount, onMounted } from "vue";

const emit = defineEmits([
  'closeModal'
])
onMounted(() => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      close()
    }
  })
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      close()
    }
  })
})
function close() {
  emit('closeModal')
}
</script>

<template>
  <div class="modal-backdrop" @click="close">
    <div class="modal" @click.stop>
      <header class="modal-header">
        <slot name="header"></slot>
        <button @click="close" type="button" class="btn-close">
          <Icon icon="heroicons:x-mark"></Icon>
        </button>
      </header>
      <section class="modal-body">
        <slot name="body"></slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}

.modal {
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  min-width: 25rem;
  max-width: 80vh;
  max-height: 100vh;
  border: 1px solid var(--color-not-so-dark);
  animation: animateShadow 2s ease-in-out infinite;
  position: relative;
}

.modal:before,
.modal:after {
  content: "";
  position: absolute;
  background: linear-gradient(270deg, #0fffc1, #7e0fff);
  background-size: 200% 200%;
  width: 100%;
  height: 100%;
  z-index: -1;
  animation: animate 50s linear infinite;
  transform: scale(90%);
}

.modal:after {
  filter: blur(3.75rem);
  -webkit-filter: blur(3.75rem);
  -moz-filter: blur(3.75rem);
  -ms-filter: blur(3.75rem);
}

@keyframes animate {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 300% 0;
  }

  100% {
    background-position: 0 0;
  }
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header,
.modal-body,
.modal-footer {
  background: var(--color-dark);
}

.modal-header {
  position: relative;
  border-bottom: 1px solid var(--color-not-so-dark);
  color: var(--color-not-so-white);
  justify-content: space-between;
  font-family: var(--font-menu);
  padding: 0.5rem 1rem;
  display: flex;
  font-size: 1.25rem;
}

.modal-footer {
  border-top: 1px solid var(--color-not-so-dark);
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;

}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #0fb186;
  background: transparent;
  margin: .5rem .5rem 0 0;

  svg {
    transition: 0.3s ease;
  }

  &:hover svg {
    color: #0afcbf;
    transform: rotate(90deg);
  }
}
</style>