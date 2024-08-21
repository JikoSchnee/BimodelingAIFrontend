<script setup>
// 官网跳转
import CategoryChooser from "@/components/categoryChooser.vue";
import {nextTick, reactive} from "vue";
import router from "@/router/index.js";

function openOfficialWebsite() {
  window.open('http://www.bimodeling.cn/')
}

const address = reactive(
    [
  {
    name: '知识库问答',
    link: '/',

  },
  {
    name: '数据库问答',
    link: '/database',

  },
      {
        name: 'test',
        link: '/test',
        default: true
      }
]
)

function setActive(index) {
  // 先更新 active 状态
  address.forEach((item, i) => {
    item.active = i === index;
  });

  // 使用 Vue 的 $nextTick 确保 DOM 更新后再导航
  nextTick(() => {
    router.push(address[index].link);
  });
}
</script>

<template>
      <el-aside id="grand-aside" width="15vw">
        <img src="@/assets/bimodeling-logo.jpg" style="width: 100%" alt="Bimodeling logo" @click="openOfficialWebsite">
        <div style="height: 26px"></div>
        <div v-for="(msg, index) in address" :key="index">
          <category-chooser @click="setActive(index)" :name="msg.name" :link="msg.link" :active="msg.active"/>
        </div>
<!--        <div style="background-color: #67c23a; flex: 1"></div>-->
      </el-aside>
</template>

<style scoped>
#grand-aside {
  display: flex;
  flex-direction: column;
  background-color: rgb(240, 242, 246);
  padding: 30px;
}
</style>