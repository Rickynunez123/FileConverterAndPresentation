<script setup>
import { defineProps } from "vue";

const props = defineProps(["name", "image", "size"]);
</script>

<template>

  <RouterLink :to="`/img/${props.name}`" >
  <div class="card">
    <button @click="$emit('button-clicked')" class="close-icon">X</button>
    <img :src="props.image" />
    <div class="card-text">
      <h2>{{ props.name }}</h2>
      <p>{{ props.size }} images...</p>
    </div>
  </div>
</RouterLink>
  
</template>

<style scoped>

.card {
  width: 310px;
  height: 350px;
  max-height: 350px;
  overflow: hidden;
  border-radius: 2%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
}

button {
  display: none;

  border: none;
  border-radius: 5px;
  opacity: 0.4;
  
}

.card:hover button {
  display: block;
}
.close-icon:hover {
  opacity: 1;

}

.card img {
  width: 100%;
  height: 190px;
  margin: 0;
}

.card .card-text {
  padding: 0 5px;
}

.card .card-text h2 {
  font-weight: bold;
}

.card .card-text p {
  color: rgb(156, 156, 156);
}


.card .close-icon {
  font-size: 15px;
  color: #cbcbcb;
  opacity: 0.6;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 3px;
}
</style>
