<script setup>
// 官网跳转
import CategoryChooser from "@/components/categoryChooser.vue";

function openOfficialWebsite() {
  window.open('http://www.bimodeling.cn/')
}
</script>

<template>
      <el-aside id="grand-aside" width="15vw">
        <img src="@/assets/bimodeling-logo.jpg" style="width: 100%" alt="Bimodeling logo" @click="openOfficialWebsite">
        <div style="height: 26px"></div>
        <category-chooser name="知识库问答" link="/"></category-chooser>
        <category-chooser name="数据库问答" link="/database"></category-chooser>
        <category-chooser name="示例"></category-chooser>
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