<script setup>
import { RouterView } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
  <div>
    <HeaderComponent />

    <Suspense>
      <template #default>
        <RouterView />
      </template>
      <template #fallback>
        <div>
          <p>Loading...</p>
        </div>
      </template>
    </Suspense>
  </div>
</template>
