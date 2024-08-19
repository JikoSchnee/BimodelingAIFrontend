<script setup>
import {ref} from 'vue'

const value = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100%; width: 100%">
      <el-aside id="grand-aside" width="15vw">
        <img src="@/assets/bimodeling-logo.jpg" style="width: 100%" alt="Bimodeling logo">
      </el-aside>
      <el-container style="height: 100%; width: 100%">
        <el-header id="grand-header">Header</el-header>
        <el-main style="padding: 0">
          <el-row gutter="0" style="height: 100%; width: 100%">
            <el-col :span="15">
              <div class="left-container">
                pdf
              </div>
            </el-col>
            <el-col :span="9">
              <div class="right-container">
                <el-row style="">
                  <div class="setting-container">
                    <!--                  <h1>-->
                    <!--                    选择知识库-->
                    <!--                  </h1>-->
                    <el-select v-model="value"
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
                      <!--                        <div style="height: 200vh; width: 100%; background-color: #9dd1ed">-->

                      <!--                        </div>-->
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

                    </div>
                    <div class="chat-footer">

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
  padding-top: 2vh;
  padding-left: 2vh;
}

.chat-container {
  width: 100%;
  height: 100%;
  background-color: rgb(240, 242, 246);
  border-radius: 7px;
  transition: box-shadow 0.3s ease;
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
  background-color: rgb(240, 242, 246);

  border-style: solid;
  border-bottom: none;
  border-width: 2px;
  border-color: #51bccc;
}

.chat-tool-bar {
  height: 30px;
  padding: 3px;
  display: flex;
  background-color: #51bccc;
  border-style: solid;
  border-width: 2px;
  border-color: #51bccc;
}

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

.chat-message-container {
  height: 18vh;
  border-left-style: solid;
  border-right-style: solid;
  border-width: 2px;
  border-color: #51bccc;
}

.chat-footer {
  height: 30px;
  background-color: #51bccc;
  border-style: solid;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  border-width: 2px;
  border-color: #51bccc;
}


</style>