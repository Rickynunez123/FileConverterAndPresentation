<script setup>
import { defineProps } from "vue";

const props = defineProps(["image", "name"]);
</script>

<template>
    <img
      :src="props.image"
      alt=""
      data-aos="fade-left"
      data-aos-anchor="#example-anchor"
      data-aos-offset="500"
      data-aos-duration="500"
    />
</template>

<style scoped>
p {
  font-size: 10px;
}

img {
  opacity: 1;
  background-color: white;
  width: auto;
  height: 70vh;
  margin: 0;
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
