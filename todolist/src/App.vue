<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="44" height="44" />
  </header>

  <RouterView />
</template>

<style scoped>
header {
  max-width: 100%;
  min-height: 90px;
  display: flex;
  padding: 8px 24px;
  box-shadow: 0px 3px 10px 0px #00000033;
  background-color: #ffffffb9;
  backdrop-filter: blur(5);
  justify-content: flex-start;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
