<script setup>
import { RouterLink, RouterView } from 'vue-router'

document.addEventListener('touchstart', function (event) {
  var targetElement = event.target || event.srcElement
  targetElement.classList.add('active')
})
document.addEventListener('touchend', function (event) {
  var targetElement = event.target || event.srcElement
  targetElement.classList.remove('active')
})
</script>

<template>
  <header>
    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->

      <nav>
        <RouterLink to="/decode">Decode</RouterLink>
        <RouterLink to="/encode">Encode</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>