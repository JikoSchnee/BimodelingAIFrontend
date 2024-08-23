<script setup>

import {ref} from "vue";

let goodButtonVisible = ref(true)
let triggerredGoodButtonVisible = ref(false)
let badButtonVisible = ref(true)
let triggerredBadButtonVisible = ref(false)

const props = defineProps({
  rawQuestion: { // 回答对应的问题，用于填写反馈
    type: String
  },
  rawMessage: {
    type: String,
    default: 'AI回答'
  },
  HTMLMessage: {
    type: String,
    default: 'AI回答'
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

// 复制到剪贴板的函数
const copyToClipboard = () => {
  if (navigator.clipboard && window.isSecureContext) {
    // 直接使用 Clipboard API
    navigator.clipboard.writeText(props.rawMessage).then(() => {
      console.log("Copied to clipboard:", props.rawMessage);
      console.log("Question:", props.rawQuestion)
    }).catch(err => {
      console.error("Failed to copy text to clipboard:", err);
    });
  } else {
    // 旧版浏览器的回退方案
    const textArea = document.createElement("textarea");
    textArea.value = props.rawMessage;
    textArea.style.position = "fixed";  // 避免页面滚动
    textArea.style.opacity = 0; // 隐藏文本域
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }
};

// TODO: 给回答点赞
function goodAnswer() {
  // 禁用按钮
  goodButtonVisible.value = false
  triggerredGoodButtonVisible.value = true
  badButtonVisible.value = false
  triggerredBadButtonVisible.value = false
}

// TODO: 回答反馈
function badAnswer() {
  // 禁用按钮
  goodButtonVisible.value = false
  triggerredGoodButtonVisible.value = false
  badButtonVisible.value = false
  triggerredBadButtonVisible.value = true
}
</script>

<template>
  <div class="box-container">
    <div class="avatar">
      <img src="../assets/avatar/bot.png" alt="bot"/>
    </div>
    <div class="content-container">
      <div class="content" :style="{maxWidth: maxWidth + 'vw'}">
        <div class="main-content">
          <p v-html="HTMLMessage"></p>
<!--          <p v-html="rawQuestion"></p>-->
        </div>
        <div class="content-link">
          <!-- 跳转链接放的位置 -->
          http://www.bimodeling.cn/
        </div>
      </div>
      <div class="tool" v-if="!isPreset">
        <div class="operation">
          <img class="icon-transition" @click="copyToClipboard" src="@/assets/icon/复制-灰.png" alt="copy"/>
        </div>
        <div class="evaluation">
          <img v-show="goodButtonVisible" @click="goodAnswer" class="icon-transition" src="@/assets/icon/点赞-灰.png" alt="copy"/>
          <img v-show="triggerredGoodButtonVisible" src="@/assets/icon/点赞-蓝.png" alt="copy"/>
          <div v-show="goodButtonVisible" style="width: 2px; height: 100%; margin: 1px 2px; border-radius: 1px"></div>
          <img v-show="badButtonVisible" @click="badAnswer" class="icon-transition" src="@/assets/icon/点踩-灰.png" alt="copy"/>
          <img v-show="triggerredBadButtonVisible" src="@/assets/icon/点踩-蓝.png" alt="copy"/>
        </div>
      </div>
      <div class="feedback">

      </div>
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
  margin-right: 6px;
  width: 4vh;
  height: 4vh;
  background-color: #666;
  display: flex;
  padding: 5px;
  user-select: none;
}

.content-container {
  padding: 0;
}

.content {
  background-color: #eee;
  display: flex;
  border-style: solid;
  border-width: 0px;
  border-radius: 1vh;
  min-height: 5vh;
  min-width: 90px;
  flex-direction: column;


  .main-content {
    display: flex;
    padding: 10px 2vw;
    word-break: break-word; /* 自动换行 */
    overflow-wrap: break-word; /* 兼容性 */
  }

  .content-link {
    border-top-style: solid;
    border-width: 1px;
    border-color: #ccc;
    display: flex;
    padding: 10px 2vw;
    word-break: break-word; /* 自动换行 */
    overflow-wrap: break-word; /* 兼容性 */
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

.icon-transition:hover {
  border-style: solid;
  border-width: 2px;
  border-color: #51bccc;
 }

</style>