<script setup>
import {ref} from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
    default: '用户问题'
  }
})
</script>

<template>
  <div class="box-container" id="box-container-right">
    <div class="content-container">
      <div class="content">
        <div class="main-content">
          <p v-html="message"></p>
        </div>
        <div class="content-link">

        </div>
      </div>
      <!--      <div class="tool">-->
      <!--        <div class="operation">-->
      <!--          <img src="@/assets/icon/复制-灰.png" alt="copy"/>-->
      <!--        </div>-->
      <!--        <div class="evaluation">-->
      <!--          <img src="@/assets/icon/点赞-灰.png" alt="copy"/>-->
      <!--          <div style="width: 2px; height: 100%; background-color: #707070; margin: 1px 2px; border-radius: 1px"></div>-->
      <!--          <img src="@/assets/icon/点踩-灰.png" alt="copy"/>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <div class="avatar">

    </div>
  </div>
</template>

<style scoped>
.box-container {
  border-style: none;
  border-width: 1px;
  display: flex;
  padding: 10px;
}

#box-container-right {
  justify-content: right;
}

.avatar {
  border-style: solid;
  border-width: 1px;
  border-radius: 1vh;
  margin-left: 6px;
  width: 5vh;
  height: 5vh;
}

.content-container {
  padding: 0;
}

.content {
  background-color: #ffffff;
  display: flex;
  border-style: solid;
  border-width: 0px;
  border-radius: 1vh;
  min-height: 5vh;
  min-width: 90px;
  max-width: 24vw;

  .main-content {
    display: flex;
    padding: 10px 30px;
  }
}

.tool {
  border-style: none;
  border-radius: 10px;
  margin-top: 5px;
  padding: 0 3px;
  height: 20px;
  display: flex;
  justify-content: space-between;
}

.operation {
  display: flex;
}

.evaluation {
  display: flex;
}
</style>