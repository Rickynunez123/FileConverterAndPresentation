<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import CardComponent from "./CardComponent.vue";
import { RouterLink, useRoute } from "vue-router";

const slides = ref(null);
const page = ref(1);
const route = useRoute();
const decreaseButton = ref(true);
const active = ref(false);
const size = ref(0);

//make the request to the folder
const response = await axios.get(
  `http://localhost:3001/img?limit=1&folderName=${route.params.id}`
);

//get size
const responseSize = await axios.get(
  `http://localhost:3001/img?limit=100&folderName=${route.params.id}`
);
size.value = responseSize.data.pngFiles.length;
if(size.value === 1){
  active.value = true;
}

//the same but with a variable instead of img
slides.value = response.data;

//this returns the image
watch(page, async () => {
  const res = await axios.get(
    `http://localhost:3001/img?limit=1&offset=${page.value * 1}&folderName=${
      route.params.id
    }`
  );

  slides.value = res.data.pngFiles;
  console.log(size.value);
  if (size.value === page.value) {
    active.value = true;
  } else {
    active.value = false;
  }

  //disable decrease button
  if (page.value <= 1) {
    decreaseButton.value = true;
  } else {
    //enable
    decreaseButton.value = false;
  }
});
</script>

<template>
  <div class="container">
    <div class="cards">
      <CardComponent
        v-for="slide in slides"
        :key="slide"
        :image="`http://localhost:3001/result/${route.params.id}/${slide}`"
        :name="slide"
      />
    </div>
    <div class="button-container">
      <button
        :class="{ 'dicrement-button-container': decreaseButton }"
        @click="page--"
      >
        &lt;
      </button>
      <button :class="{ 'increment-button-container': active }" @click="page++">
        >
      </button>
    </div>
    <RouterLink class="back" to="/folders"> Back </RouterLink>
  </div>
</template>

<style scoped>
.container {
  background-color: rgb(27, 26, 26);

  width: 100vw;
  height: 93vh;
  left: 0;
  text-align: center;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
}

.back {
  position: fixed;
  bottom: 10px;
  right: 10px;
  color: antiquewhite;
}
.cards {
  /* max-width: 700px; */
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
.cards h3 {
  font-weight: bold;
}
.cards p {
  font-size: 10px;
}
.button-container {
  display: flex;
  justify-content: center;
  padding-top: 30px;
}
.button-container button {
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin: 0 5px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: rgb(255, 255, 255);
}

.increment-button-container {
  opacity: 0.4;
  pointer-events: none;
}

.dicrement-button-container {
  opacity: 0.4;
  pointer-events: none;
}
</style>
