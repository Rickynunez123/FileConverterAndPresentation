<script setup>
import { ref } from "vue";
import axios from "axios";
import { RouterLink } from "vue-router";
import FileSaver from "file-saver";

const visible = ref(false);
let folderName = ref("");
const success = ref(false);
const file = ref(null);
const loading = ref(false);
const errorMessage = ref(false);
const errorNoFile = ref(false);
const active = ref(false); //dropbox
const test = ref(false);

const downloadZip = async () => {
  const response = await axios.get("http://localhost:3001/download", {
    responseType: "blob",
  });
  console.log(response.data);
  FileSaver.saveAs(response.data, "file.zip");
};

const showModal = () => {
  visible.value = true;
  errorMessage.value = false;
};

const onClose = (e) => {
  loading.value = false;
  console.log(e, "I was closed.");
};

const handleOk = async () => {
  loading.value = true;
  //check if we got a file
  if (file.value == null) {
    errorNoFile.value = true;
    loading.value = false;
    visible.value = true; //box to upload
  }
  if (file.value) {
    const formData = new FormData();
    formData.append("file", file.value);
    //Assigning a value name to folderName is case the user does not give it
    if (folderName.value === "") {
      folderName.value = file.value.name
        .split(".")[0]
        .replace(/ /g, "_")
        .replace(/&/g, "and");
      formData.append("folderName", folderName.value);
      console.log("Catch error ");
    } else {
      formData.append("folderName", folderName.value);
    }
    // console.log(folderName.value);

    await axios
      .post("http://localhost:3001/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        loading.value = false;
        visible.value = false;
        // folderName.value = "";
        success.value = true;
      })
      .catch(function (error) {
        if (error.response.status === 409) {
          console.log("A folder with the same name already exists");
          errorMessage.value = true;
          test.value = true;
          loading.value = false;
          visible.value = true; //box to upload
          folderName.value = "";
        }
      });
  }
};

//Active drag and drop css
const toggleActive = () => {
  active.value = !active.value;
};

//Drag and drop file
const handleDrop = (e) => {
  file.value = e.dataTransfer.files[0];
  test.value = true;
  handleOk();
  console.log(file.value);
};

const handleUploadChange = async (e) => {
  if (e.target.files[0]) {
    file.value = e.target.files[0];
  }
};
</script>

<template>
  <div class="home">
    <div v-if="!success">
      <!--- Check if a folder with the given name already exists  -->
      <div v-if="errorMessage">
        <a-alert
          message="Error"
          description="A folder with the same name already exists"
          type="error"
          closable
          @close="onClose"
        />
      </div>

      <!--- Drop file -->
      <div class="box">
        <h1>DropZone</h1>
        <div
          @dragenter.prevent="toggleActive"
          @dragleave.prevent="toggleActive"
          @dragover.prevent
          @drop.prevent="handleDrop"
          :class="{ 'active-dropzone': active }"
          class="dropzone"
        >
          <span>Drag and Drop File</span>
          <span>OR</span>

          <button @click="showModal" class="button-12" role="button">
            Upload File
          </button>
        </div>
        <div v-if="test && !errorMessage && loading" class="spinner">
          <ASpin />
        </div>
      </div>

      <!-- Propt the chose file box    -->
      <div v-if="!errorMessage">
        <AModal
          v-model:visible="visible"
          title="Upload Slides or PDF"
          @ok="handleOk"
        >
          <!--- Check if the user provided a file  -->
          <div v-if="errorNoFile">
            <a-alert
              class="noFile"
              message="Error"
              description="You Need to Provide a File"
              type="error"
              closable
              @close="onClose"
            />
          </div>

          <!--- Promp choose file  -->
          <div v-if="!loading">
            <input
              type="file"
              accept=".ppt, .pptx, .pdf"
              @change="handleUploadChange"
            />
            <!--- Promp opened   -->
            <AInput
              v-model:value="folderName"
              placeholder="Rename Folder"
              :maxLength="20"
            />
          </div>

          <div class="spinner" v-else>
            <ASpin />
          </div>
        </AModal>
      </div>
    </div>

    <div v-if="success">
      <a-result
        class="result"
        status="success"
        title="Successfully Transformed"
        sub-title="Thank you ."
      >
        <!-- Change page -->
        <RouterLink :to="`/img/${folderName}`">
          <a-button key="console" type="primary" style="margin-right: 5px">
            Go to Images
          </a-button>
        </RouterLink>
        <a-button @click="downloadZip">Download Zip File</a-button>
      </a-result>
    </div>
  </div>
</template>

<style scoped>
input {
  margin-top: 10px;
}
.noFile {
  margin-top: 10px;
  margin-bottom: 10px;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
.result {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffff;
  display: flex;
  flex-wrap: wrap;
}
h1 {
  text-align: center;
  font-size: 68px;
  margin-bottom: 5px;
  /* color: #1d1d1f; */
  color: #252525;
  font-family: SF Pro Display,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
}

.dropzone {
  color: #86868b;
  font-size: 21px;
  line-height: 1;
  font-family: SF Pro Display,SF Pro Icons,AOS Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  /* border: 5px dashed #252525; */
  background-color: #f5f5f7;
  border-radius: 6px;
  transition: 1.5s ease all;
  box-shadow: 0px 10.5px 15px rgba(0, 0, 0, 0.1),
    inset 0px 0.5px 10.5px rgba(255, 255, 255, 0.5),
    0px 0px 0px 1.5px rgba(0, 0, 0, 0.32);
}

.box {
  margin-top: 20%;
  font-size: 16px;
  padding: 6px 18px;
  font-weight: 500;
}

.active-dropzone {
  color: #fff;
  border-color: #fff;
  background-color: rgba(27, 27, 27, 0.8);
  transition: 0.5s ease all;
}

/* CSS */
.button-12 {
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 21px;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
  border-radius: 6px;
  border: none;

  /* background: rgba(27, 27, 27, 0.522); */
  background: #0071e3;
  box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1),
    inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5),
    0px 0px 0px 0.5px rgba(0, 0, 0, 0.12);
  color: #ffff;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  font-size: 20px;
}

.button-12:focus {
  box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2),
    0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  outline: 0;
}
</style>
