<script setup lang="ts">

</script>

<template>
  <div class="wrapper">
    <div class="glitch red"></div>
    <div class="glitch blue"></div>
    <div class="glitch green"></div>
  </div>
</template>

<style scoped>

.wrapper {
  margin: auto auto 0 1rem;
  min-height: 15rem;
  min-width: 15rem;
  position: relative;
  border-radius: 100%;
  overflow: hidden;
  will-change: translate;
  clip-path: circle(50% at 50% 50%);
}
.wrapper:hover .glitch {
  transform: translate(0, 0);
  animation: none;
  filter: grayscale(0.2);
}

.glitch {
  width: 100%;
  height: 100%;
  background-size: cover, 130%;
  position: absolute;
  transition: all .2s cubic-bezier(.41, .12, .75, 1.47);
  background-position: 50% 50%;
  background-image: url('/userpic.png');
  mix-blend-mode: screen;
  background-blend-mode: darken;
  filter: grayscale(0.5);

  &.red {
    background-color: red;
    transform: translate(-2px, -5px);
    animation: phase 12s infinite 0.5s;
  }

  &.blue {
    background-color: blue;
    transform: translate(3px, 6px);
    animation: glitchUp 5s infinite 1s;
    border-radius: 100%;
  }

  &.green {
    background-color: green;
    transform: translate(-3px, 0);
    animation: glitchRight 3s infinite;
  }
}

@keyframes phase {
  0%, 100% {
    transform: translate(0, 0)
  }
  50% {
    transform: translate(3px, -3px)
  }
}

@keyframes glitchUp {
  0%, 10%, 19%, 25% {
    transform: translate(0, 0);
  }
  20% {
    transform: translate(0, -25px);
  }
}

@keyframes glitchRight {
  0%, 12%, 14%, 23%, 25%, 100% {
    transform: translate(0, 0);
  }
  13% {
    transform: translate(220px, 0px);
  }
  24% {
    transform: translate(-69px, 0);
  }
}

</style>