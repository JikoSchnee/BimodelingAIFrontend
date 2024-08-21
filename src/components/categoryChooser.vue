<script setup>
import router from "@/router/index.js";

const props = defineProps({
  name:{
    type: String,
    default: "类型"
  },
  link:{
    type: String,
    default: "/database"
  },
  active:{
    type: Boolean
  }
})

function jumpToLink() {
  // router.push(props.link)
}
</script>

<template>

  <div :class="['container', { 'container2': props.active }]" @click="jumpToLink">
    <div class="content">
      {{ name }}
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 40px;
  width: 100%;
  border-radius: 1vh;
  justify-content: start;
  align-items: center;
  display: flex;
  padding: 15px;
  margin-bottom: 0.5vh;
  background-color: #ddd;
  user-select: none;
}

.container:hover {
  background-color: #bbb;
}

.container:active {
  background-color: #666;
}


.container:active::after {
  background-color: #51bccc;
  color: white;
}
</style>