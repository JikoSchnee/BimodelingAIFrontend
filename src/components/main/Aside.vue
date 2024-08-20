<script setup>
// 官网跳转
function openOfficialWebsite() {
  window.open('http://www.bimodeling.cn/')
}
</script>

<template>
      <el-aside id="grand-aside" width="15vw">
        <img src="@/assets/bimodeling-logo.jpg" style="width: 100%" alt="Bimodeling logo" @click="openOfficialWebsite">
      </el-aside>
</template>

<style scoped>

</style>