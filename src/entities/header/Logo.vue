<script setup lang="ts">

</script>

<template>
  <div class="logoHolder">
    I`m a
    <div class="stack" style="--stacks: 3;">
      <span style="--index: 0;">FRONTEND</span>
      <span style="--index: 1;">FRONT -ND</span>
      <span style="--index: 2;">F &nbsp; O &nbsp; &nbsp;END</span>
    </div>
    <span class="right">Developer</span>
  </div>
</template>

<style scoped>
.logoHolder {
  display: flex;
  flex-direction: column;
  color: var(--color-white);
  font-family: var(--font-menu);
}

.right {
  text-align: right;
  width: 100%;
  margin-top: -.5rem;
}

.stack {
  display: grid;
  grid-template-columns: 1fr;
  line-height: 4rem;
  font-family: var(--font-title);
}

.stack span {
  font-weight: bold;
  grid-row-start: 1;
  grid-column-start: 1;
  font-size: 4rem;
  --stack-height: calc(100% / var(--stacks) - 1px);
  --inverse-index: calc(calc(var(--stacks) - 1) - var(--index));
  --clip-top: calc(var(--stack-height) * var(--index));
  --clip-bottom: calc(var(--stack-height) * var(--inverse-index));
  clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);
  animation: stack 340ms cubic-bezier(.46, .29, 0, 1.24) 1 backwards calc(var(--index) * 120ms), glitch 2s ease infinite 2s alternate-reverse;
}

.stack span:nth-child(odd) {
  --glitch-translate: 8px;
}

.stack span:nth-child(even) {
  --glitch-translate: -8px;
}

@keyframes stack {
  0% {
    opacity: 0;
    transform: translateX(-50%);
    text-shadow: -2px 3px 0 red, 2px -3px 0 blue;
  }
  60% {
    opacity: 0.5;
    transform: translateX(50%);
  }
  80% {
    transform: none;
    opacity: 1;
    text-shadow: 2px -3px 0 red, -2px 3px 0 blue;
  }
  100% {
    text-shadow: none;
  }
}

@keyframes glitch {
  0% {
    text-shadow: -2px 3px 0 red, 2px -3px 0 blue;
    transform: translate(var(--glitch-translate));
  }
  2% {
    text-shadow: 2px -3px 0 red, -2px 3px 0 blue;
  }
  4%, 100% {
    text-shadow: none;
    transform: none;
  }
}
</style>