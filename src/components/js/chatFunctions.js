// chatFunctions.js
import {h, nextTick, ref} from 'vue';
import {marked} from 'marked';
import {ElNotification} from 'element-plus';

export const chatMessages = ref([]); // 管理聊天消息的数组
export const text = ref(''); // 输入框

export let lastQuestion = ref('最后一个问题') // 记录最后一次问题，用于重问以及记录反馈

export function scrollToBottom() {
  let element = document.getElementById("scroll");
  element.scrollTop = element.scrollHeight;
}

export function textToHTML(content) {
    return marked(content, {
      gfm: true,
      breaks: true,
      smartypants: true,
      headerIds: false
  });
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
  text.value = '';
  lastQuestion.value = '最后一个问题';
}

export function reAsk() {
    console.log('reask')
    if (lastQuestion.value !== '最后一个问题') {
        text.value = lastQuestion.value
        // console.log(text.value)
        chat()
    } else {
        noLastQuestion()
    }
}

export function getHELP(filePath) {
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
    // console.log(text.value)
  if (!text.value.trim()) {
    emptyInput();
  } else {
    nextTick(() => {
      lastQuestion.value = text.value;
      userMessage();
      nextTick(scrollToBottom);
      botMessage("测试回答", lastQuestion, 0);
      nextTick(scrollToBottom);
    });
  }
}

// 输入框为空的提示
export function emptyInput() {
  ElNotification({
    title: '输入框为空',
    message: h('i', {style: 'color: teal'}, '输入框中应输入问题'),
    type: "error",
    position: "bottom-right"
  });
}

// 没有问过问题却点击了重新提问的提示
export function noLastQuestion() {
    ElNotification({
    title: '无法重新提问',
    message: h('i', {style: 'color: teal'}, '需要先提问过问题才能重新提问'),
    type: "error",
    position: "bottom-right"
  });
}

// 成功发送反馈的提示
export function feedbackSent() {
   ElNotification({
    title: '反馈成功',
    message: h('i', {style: 'color: teal'}, '感谢您的反馈'),
    type: "success",
    position: "top-right"
  });
}
