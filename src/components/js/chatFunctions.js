// chatFunctions.js
import { nextTick, ref } from 'vue';
import { marked } from 'marked';
import { ElNotification } from 'element-plus';

export const chatMessages = ref([]); // 管理聊天消息的数组
export const text = ref(''); // 输入框

export function scrollToBottom() {
  let elmnt = document.getElementById("scroll");
  elmnt.scrollTop = elmnt.scrollHeight;
}

export function textToHTML(content) {
  let HTML = marked(content, {
    gfm: true,
    breaks: true,
    smartypants: true,
    headerIds: false
  });
  return HTML;
}

export function userMessage(type) {
  if (text.value.trim()) {
    let HTML = textToHTML(text.value);
    if (type === 0) chatMessages.value.push({type: 'bot', HTMLMessage: HTML, rawMessage: text.value});
    else chatMessages.value.push({type: 'user', HTMLMessage: HTML, rawMessage: text.value});
    text.value = ''; // 清空输入框
  }
}

export function botMessage(content, lastQuestion, isPreset) {
  if (content.trim()) {
    let HTML = textToHTML(content);
    if (isPreset === 1) chatMessages.value.push({type: 'bot', HTMLMessage: HTML, isPreset: true, rawMessage: content});
    else chatMessages.value.push({type: 'bot', HTMLMessage: HTML, isPreset: false, rawMessage: content, rawQuestion: lastQuestion});
  }
}

export function clearDialog() {
  chatMessages.value = [];
}

export function getHELP() {
  const filePath = 'src/preset/数据库问答说明.md';
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(markdownContent => {
      botMessage(markdownContent, "", 1);
      nextTick(scrollToBottom);
    });
}

export function chat() {
  if (!text.value.trim()) {
    emptyInput();
  } else {
    nextTick(() => {
      const lastQuestion = text.value;
      userMessage();
      nextTick(scrollToBottom);
      botMessage("测试回答", lastQuestion, 0);
      nextTick(scrollToBottom);
    });
  }
}

export function emptyInput() {
  ElNotification({
    title: '输入框为空',
    message: h('i', {style: 'color: teal'}, '输入框中应输入问题'),
    type: "error",
    position: "bottom-right"
  });
}
