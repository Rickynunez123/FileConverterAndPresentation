<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import CardFolderComponent from "./CardFolderComponent.vue";


const folders = ref(null);
const folderWFiles = ref(null);
const currentFolder = ref("");
const searchValue = ref("");
const page = ref(1);
const active = ref(false);
const decreaseButton = ref(true);

//get array of folders for the props
const response = await axios.get("http://localhost:3001/folders?limit=20");
folders.value = response.data.folders;



//pagination
watch(page, async () => {
  const res = await axios.get(
    `http://localhost:3001/folders?limit=20&offset=${page.value * 1}`
  );
  folders.value = res.data.folders;

  //disable decrease button
  if(page.value <= 1){
    decreaseButton.value = true;
  }
  else{
    //enable
    decreaseButton.value = false;
  }
  //disable increase button
  if(folders.value.length < 20){
    //disable
    active.value = true;
  }
  else{
    //enable
    active.value = false;
  }
});

//search
watch(searchValue, async () => {
  const response = await axios.get("http://localhost:3001/folders?");
  folders.value = await response.data.folders;
  folders.value =  response.data.folders.filter((folder) =>
    folder.toLowerCase().includes(searchValue.value.toLowerCase())
  );
});

//get request to get everything about the folders
const arryFolder = await axios.get("http://localhost:3001/foldersInfo");
folderWFiles.value = arryFolder.data.resultFolders;



const onFolderClick = (folder) => {
  if (folder !== "") {
    currentFolder.value = folder;
  } else {
    folder = "no";
    currentFolder.value = folder;
  }
};



</script>

<template>
  <div>
    <div class="container">
      <input
        v-model.trim="searchValue"
        type="text"
        placeholder="Search..."
        class="input-group"
      />
    </div>
    <div class="options-container">
      <div class="container">
        <CardFolderComponent
          data-aos="fade-down"
          v-for="folder in folders"
          @button-clicked="doSomething(folder)"
          :key="folder"
          :image="`http://localhost:3001/result/${folder}/${arryFolder.data.resultFolders[folder][0]}`"
          :name="folder"
          :size="`${arryFolder.data.resultFolders[folder].length}`"
          @click="onFolderClick(folder)"
        />
      </div>
      <div 
      
      class="button-container">
        <button 
        :class = "{'dicrement-button-container': decreaseButton}"
        @click="page--">&lt;</button>
        <button 
        :class = "{'increment-button-container': active}"
        @click="page++"></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* align elements vertically */
  gap: 30px;
  font-size: 13px;
}

.options-container {
  /* Size of the container */
  max-width: 80%;
  margin: 0 auto; /* center horizontally */
  display: flex;
  flex-direction: column;
  align-items: center; /* align elements horizontally */
  justify-content: center; /* align elements vertically */
  flex-wrap: wrap;
  margin-top: 60px;
}

.input-group {
  box-shadow: 1px 1px 30px rgba(0, 0, 0, 0.175);
  border: 0;
  margin: 4rem auto;
  width: 400px;
  max-width: 670px;
  height: 40px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* align elements vertically */
  margin-top: 30px;
}

input {
  border-radius: 30px;
  border: 1px solid #ccc;
  outline: 0;
  padding: 1.5rem 3.5rem;
  margin-top: 50px;
}

.button-container {
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 20px;
}
.increment-button-container {
  opacity: 0.4;
  pointer-events: none;
}

.dicrement-button-container{
  opacity: 0.4;
  pointer-events: none;
}
.button-container  button {
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin: 0 5px;
  cursor: pointer;
  background-color: rgb(222, 220, 220) ;
  transition: 0.3s;
}
button:hover {
  background-color: rgb(172, 172, 172);
}

.card .close-icon {
  font-size: 15px;
  color: #cbcbcb;
  opacity: 0.6;
  cursor: pointer;
  position: absolute;
  top: px;
  right: 3px;
}


</style>
