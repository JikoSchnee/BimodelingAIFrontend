<script setup>
import {h, nextTick, ref} from 'vue'
import BotChatBox from "@/components/bot-chat-box.vue";
import UserChatBox from "@/components/user-chat-box.vue";
import {marked} from "marked";
import {ElNotification} from "element-plus";
import Aside from "@/components/main/Aside.vue";
import Header from "@/components/main/Header.vue";
import {
  chat,
  userMessage,
  botMessage,
  clearDialog,
  getHELP,
  textToHTML,
  scrollToBottom,
  chatMessages,
  text
} from "../components/js/chatFunctions.js";

const baseName = ref('') // 知识库选择

const sendButtonVisible = ref(true) // 发送按钮可见性

const options = [
  {
    value: '商务部知识库',
    label: '商务部知识库',
  },
  {
    value: '技术部知识库',
    label: '技术部知识库',
  },
  {
    value: '建发知识库',
    label: '建发知识库',
  },
]

</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100%; width: 100%">
      <Aside/>
      <el-container style="height: 100%; width: 100%">
        <Header id="grand-header"/>
        <el-header id="grand-header" style="height: 0; padding: 0; margin: 0">
          <!-- 不能删-->
        </el-header>
        <el-main style="padding: 0">
          <el-row :gutter="0" style="height: 100%; width: 100%">
            <el-col :span="15">
              <div class="left-container">
                <div class="pdf-container">
                  <div class="pdf-tool-bar">
                    <!-- TODO: pdf工具 -->
                  </div>
                  <div class="pdf-content-box">
                    <!-- TODO: pdf渲染 -->
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="9">
              <div class="right-container">
                  <div class="setting-container">
                    <!--                  <h1>-->
                    <!--                    选择知识库-->
                    <!--                  </h1>-->
                    <el-select v-model="baseName"
                               placeholder="请选择一个知识库"
                               style="width: 90%"
                               no-data-text="暂无知识库">
                      <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      />
                    </el-select>
                  </div>

                <div class="chat-container">
                  <div class="chat-container-header">

                  </div>
                  <div id="scroll" class="chat-content">
                    <bot-chat-box
                        HTMLMessage="您好，我是佰模伝AI知识库助手，请问有什么可以为您效劳的？<br>点击下方工具栏的问号获取<u>帮助</u>。"
                        :isPreset="true"
                        rawMessage="您好，我是佰模伝AI知识库助手，请问有什么可以为您效劳的？点击下方工具栏的问号获取帮助"/>
                    <!--                      <user-chat-box HTMLMessage="..."></user-chat-box>-->
                    <!--                      <bot-chat-box />-->
                    <div v-for="(msg, index) in chatMessages" :key="index" :style="{ display: 'flex' }">
                      <!-- bot-chat-box 在最左边 -->
                      <div v-if="msg.type === 'bot'" style="justify-content: start; flex: 1;">
                        <bot-chat-box :maxWidth="40" :HTMLMessage="msg.HTMLMessage" :isPreset="msg.isPreset"
                                      :rawMessage="msg.rawMessage" :rawQuestion='msg.rawQuestion'/>
                      </div>

                      <!-- user-chat-box 在最右边 -->
                      <div v-if="msg.type === 'user'" style="justify-content: end; flex: 1;">
                        <user-chat-box :maxWidth="40" :HTMLMessage="msg.HTMLMessage" :isPreset="msg.isPreset"
                                       :rawMessage="msg.rawMessage"/>
                      </div>
                    </div>
                  </div>
                  <div class="chat-tool-bar">
                    <div class="button-bar">
                      <el-tooltip
                          class="box-item"
                          effect="light"
                          content="重新提问"
                          placement="top-start"
                      >
                        <img id="tool-bar-icon" src="@/assets/icon/刷新.png" alt="refresh"/>
                      </el-tooltip>
                      <el-tooltip
                          class="box-item"
                          effect="light"
                          content="清空对话"
                          placement="top-start"
                      >
                        <img @click="clearDialog" id="tool-bar-icon" src="@/assets/icon/清理.png" alt="refresh"/>
                      </el-tooltip>
                      <el-tooltip
                          class="box-item"
                          effect="light"
                          content="添加文档（未启用）"
                          placement="top-start"
                      >
                        <img id="tool-bar-icon" src="@/assets/icon/添加.png" alt="refresh"/>
                      </el-tooltip>
                      <el-tooltip
                          class="box-item"
                          effect="light"
                          content="使用说明"
                          placement="top-end"
                      >
                        <img @click="getHELP('src/preset/知识库问答说明.md')" id="tool-bar-icon"
                             src="@/assets/icon/帮助.png" alt="refresh"/>
                      </el-tooltip>
                    </div>
                  </div>
                  <div class="chat-message-container">
                    <div class="character">
                      <el-input
                          v-model="text"
                          style="width: 100%; height: 100%;"
                          type="textarea"
                          maxlength="1000"
                          placeholder="请输入问题"
                          show-word-limit
                          :autosize="{ minRows: 6, maxRows: 8}"
                          resize="none"
                      />
                    </div>
                  </div>
                  <div class="chat-footer">
                    <div class="copyright">
                      <p>Copyright © 佰模伝信息科技有限公司</p>
                    </div>
                    <div class="send" @click="chat">
                      <img src="../assets/icon/send.png" alt="send" style="height: 100%"/>
                    </div>
                  </div>
                </div>


              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <!--  <div class="grand-container">-->

  <!--  </div>-->
</template>

<style scoped>
.colored-box {
  height: 100%;
  width: 100%;
  display: flex;
}

#grand-aside {
  background-color: rgb(240, 242, 246);
  padding: 30px;
}

#grand-header {
  height: 8vh;
  background-color: #51bccc;
  padding: 20px
}

.setting-container {
  width: 100%;
  height: 8%;
  background-color: #51bccc;
  border-radius: 5px;
  padding-top: 1.5vh;
  padding-bottom: 1.5vh;
  justify-content: center;
  align-items: center;
  display: flex;
  transition: box-shadow 0.3s ease;
}

.setting-container:hover {
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
}

.right-container {
  width: 100%;
  height: 92vh;
  padding-top: 2vh;
  padding-bottom: 2vh;
  padding-right: 2vh;
  //display: flex;
  flex-direction: column;
}

.left-container {
  width: 100%;
  height: 100%;
  padding: 2vh;
}

.chat-container {
  padding-top: 2vh;
  flex: 1;
  width: 100%;
  height: 92%;
  background-color: rgb(255, 255, 255);
  border-radius: 7px;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;


  .chat-tool-bar {
    height: 30px;
    padding: 3px;
    display: flex;
    background-color: #51bccc;
    border-style: solid;
    border-width: 2px;
    border-color: #51bccc;
    user-select: none;

    .button-bar {
      display: flex;
      width: 1px;

      #tool-bar-icon {
        margin-right: 8px;
      }

      #tool-bar-icon:hover {
        border-style: solid;
        border-color: #f2f2f2;
        border-width: 2px;
      }

      #tool-bar-icon:active {
        border-color: rgb(51, 48, 48);
      }
    }
  }
}

.chat-container:hover {
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
}

.chat-container-header {
  height: 30px;
  background-color: #51bccc;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;

}

.chat-content {

  flex: 1; /* This makes the chat-content take up available space */
  overflow-y: auto; /* Allows vertical scrolling */
  background-color: #ffffff;
  display: flex;
  flex-direction: column;

  border-style: solid;
  border-bottom: none;
  border-width: 2px;
  border-color: #51bccc;
}


.chat-message-container {
  height: max-content;
  border-left-style: solid;
  border-right-style: solid;
  border-width: 2px;
  border-color: #51bccc;
  display: flex;
}

.chat-footer {
  height: 30px;
  background-color: #51bccc;
  border-style: solid;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  border-width: 2px;
  border-color: #51bccc;
  justify-content: space-between;
  display: flex;

  .copyright {
    margin-left: 5px;

    p {
      color: white;
    }
  }

}

.pdf-container {
  border-style: solid;
  border-width: 2px;
  border-radius: 5px;
  border-color: #51bccc;
  width: 100%;
  height: 100%;
  display: flex;
  transition: box-shadow 0.3s ease;

  .pdf-tool-bar {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    width: 30px;
    height: 100%;
    background-color: #51bccc;
  }

  .pdf-content-box {
    height: 100%;
    background-color: rgb(240, 242, 246);
  }
}

.pdf-container:hover {
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
}

.character {
  height: 100%;
  width: 100%;
  display: flex;
}

.send {
  border-width: 2px;
  border-radius: 1vh;
  display: flex;
  padding: 2px;
  width: 10%;
  height: 100%;
  background-color: #192fdd;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  user-select: none;
}

.send:hover {
  border-color: rgb(240, 242, 246);
  border-style: solid;
}

.send:active {
  border-color: #222222;
}

</style>