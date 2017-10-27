<template>
    <!--                    开始项目之前请阅读README.md              -->
<div id="app">
  <!-- <img src="./assets/logo.png"> -->
  <transition name="fold">
    <router-view></router-view>
  </transition>
</div>
    <!--                    开始项目之前请阅读README.md              -->
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #ededed;
}

.fold-enter-active {
  animation-name: fold-in;
  animation-duration: .5s;
}

.fold-leave-active {
  animation-name: fold-out;
  animation-duration: .05s;
}

@keyframes fold-in {
  0% {
    transform: translate(100vw);
  }
  100% {
    transform: translate(0);
  }
}

@keyframes fold-out {
  0% {
    transform: translate(0);
  }
  100% {
    transform: translate(-100vw);
  }
}
</style>
