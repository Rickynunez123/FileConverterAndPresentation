<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <nav class="nav">
      <RouterLink class="nav__brand" to="/">
        <!-- <img class="g__image" src="../24G_Logo.png" alt="" /> -->
      </RouterLink>
      <ul class="list nav__list">
        <li v-if="$route.path !== '/'" class="nav__item">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li v-if="$route.path !== '/folders'" class="nav__item">
          <RouterLink to="/folders">Files</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 1rem;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
}
.nav__item {
  padding: 0.5rem 1rem;
  margin-top: 0.55rem;

  display: flex;
  align-items: center;
  justify-content: center;
}

.nav__list {
  width: auto;
  display: flex;
  max-height: 100%;
  opacity: 1;
}

.list__item {
  padding-left: 0.5rem;
  margin-bottom: 1rem;
}
/* Change the color of the links */
.nav__item > a {
  color: #d2d0db;
  transition: color 0.3s;
  display: flex;
  justify-content: center;
}

.nav__item > a:hover {
  color: #ffff;
}

.g__image {
  width: 60px;
  height: auto;
}

.list {
  list-style: none;
  padding-left: 0;
  display: flex;
  justify-content: center;
  padding-left: 0.5rem;
  margin-bottom: 1rem;
}
</style>
