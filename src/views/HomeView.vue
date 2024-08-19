<script setup>
import {ref} from 'vue'
import BotChatBox from "@/components/bot-chat-box.vue";
import UserChatBox from "@/components/user-chat-box.vue";
import {marked} from "marked";

const baseName = ref('') // 知识库选择

const text = ref('') // 输入框

const chatMessages = ref([]) // 管理聊天消息的数组

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

// 官网跳转
function openOfficialWebsite() {
  window.open('http://www.bimodeling.cn/')
}

// 发送信息
function sendMessage(type) {
  if (text.value.trim()) {
    let HTML = textToHTML(text.value)
    if (type === 0) chatMessages.value.push({type: 'bot', content: HTML})
    else chatMessages.value.push({type: 'user', content: HTML})
    text.value = '' // 清空输入框
  }
}

// 把输入框的信息转为html格式
function textToHTML(text) {
  // 将 Markdown 转换为 HTML
  let HTML = marked(text);
  // 使用正则表达式替换换行符，但不替换标题后的换行符
  HTML = HTML.replace(/(?!<h[1-6]>.*?<\/h[1-6]>)\n/g, '<br>');
  // 删除不在 HTML 标签内部的孤立 <br> 标签
  // 匹配在 <p>、<div> 或其他标签之间的 <br> 标签
  HTML = HTML.replace(/(?<!<[^>]+)>[\s\r\n]*<br>\s*(?![^<]*>)/g, '');
  return HTML
}
</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100%; width: 100%">
      <el-aside id="grand-aside" width="15vw">
        <img src="@/assets/bimodeling-logo.jpg" style="width: 100%" alt="Bimodeling logo" @click="openOfficialWebsite">
      </el-aside>
      <el-container style="height: 100%; width: 100%">
        <el-header id="grand-header">Header</el-header>
        <el-main style="padding: 0">
          <el-row :gutter="0" style="height: 100%; width: 100%">
            <el-col :span="15">
              <div class="left-container">
                <div class="pdf-container">
                  <div class="pdf-tool-bar">

                  </div>
                  <div class="pdf-content-box">

                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="9">
              <div class="right-container">
                <el-row style="">
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
                </el-row>
                <el-row style="height: 2vh">

                </el-row>
                <el-row>
                  <div class="chat-container">
                    <div class="chat-container-header">

                    </div>
                    <div class="chat-content">

                      <user-chat-box message="..."></user-chat-box>
                      <div v-for="(msg, index) in chatMessages" :key="index">
                        <user-chat-box v-if="msg.type === 'user'" :message="msg.content"/>
                        <bot-chat-box v-if="msg.type === 'bot'" :message="msg.content"/>
                      </div>
                    </div>
                    <div class="chat-tool-bar">
                      <div class="button-bar">
                        <img id="tool-bar-icon" src="@/assets/icon/刷新.png" alt="refresh"/>
                        <img id="tool-bar-icon" src="@/assets/icon/清理.png" alt="refresh"/>
                        <img id="tool-bar-icon" src="@/assets/icon/添加.png" alt="refresh"/>
                        <img id="tool-bar-icon" src="@/assets/icon/帮助.png" alt="refresh"/>
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
                        />
                      </div>
                    </div>
                    <div class="chat-footer">
                      <div class="copyright">
                        <p>Copyright © 佰模伝信息科技有限公司</p>
                      </div>
                      <div class="send">
                        <img src="@/assets/icon/发送.png" alt="send" @click="sendMessage()" style="height: 100%"/>
                      </div>
                    </div>
                  </div>

                </el-row>
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
  height: 100%;
  background-color: #51bccc;
  border-radius: 5px;
  padding-top: 1.5vh;
  padding-bottom: 1.5vh;
  justify-content: center;
  display: flex;
  transition: box-shadow 0.3s ease;
}

.setting-container:hover {
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.2);
}

.right-container {
  width: 100%;
  height: 100%;
  padding-top: 2vh;
  padding-right: 2vh;
}

.left-container {
  width: 100%;
  height: 100%;
  padding: 2vh;
}

.chat-container {
  width: 100%;
  height: 100%;
  background-color: rgb(240, 242, 246);
  border-radius: 7px;
  transition: box-shadow 0.3s ease;

  .chat-tool-bar {
    height: 30px;
    padding: 3px;
    display: flex;
    background-color: #51bccc;
    border-style: solid;
    border-width: 2px;
    border-color: #51bccc;

    .button-bar {
      display: flex;

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
  min-height: 30vh;
  max-height: 40vh;
  flex: 1; /* This makes the chat-content take up available space */
  overflow-y: auto; /* Allows vertical scrolling */
  background-color: #f2f2f2;

  border-style: solid;
  border-bottom: none;
  border-width: 2px;
  border-color: #51bccc;
}


.chat-message-container {
  border-left-style: solid;
  border-right-style: solid;
  border-width: 2px;
  border-color: #51bccc;
  height: 100%;
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
}

.send:hover {
  border-color: rgb(240, 242, 246);
  border-style: solid;
}

.send:active {
  border-color: #222222;
}

</style>