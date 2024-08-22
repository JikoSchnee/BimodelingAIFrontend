<script setup>

const props = defineProps({
  rawMessage: {
    type: String,
    default: '用户问题'
  },
  HTMLMessage: {
    type: String,
    default: '用户问题'
  },
  isPreset: { // 是否是预设的发言
    type: Boolean,
    default: false
  },
  maxWidth: {
    type: Number,
    default: 24
  }

})
</script>

<template>
  <div class="box-container" id="box-container-right">
    <div class="content-container">
      <div class="content" :style="{maxWidth: maxWidth + 'vw'}">
        <div class="main-content">
          <p v-html="HTMLMessage"></p>
        </div>
        <div class="content-link">

        </div>
      </div>
    </div>
    <div class="avatar">
      <img src="../assets/avatar/user.png" alt="user"/>
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
  border-style: none;
  border-width: 1px;
  border-radius: 1vh;
  margin-left: 6px;
  width: 4vh;
  height: 4vh;
  background-color: #999;
  display: flex;
  padding: 4px;
  user-select: none;
}

.content-container {
  padding: 0;
  display: flex;
}

.content {
  background-color: #51bccc;
  display: flex;
  border-style: solid;
  border-width: 0px;
  border-radius: 1vh;
  min-height: 5vh;

  justify-content: start;

  .main-content {
    padding: 10px 2vw;
    word-break: break-word; /* 自动换行 */
  overflow-wrap: break-word; /* 兼容性 */
  }
  p {
    color: #fff;
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