<template>
  <div class="chat-container">
    <message-list :messages="messages"/>
    <message-input @send="handleSendMessage"/>
  </div>
</template>

<script>
import MessageList from '@/components/MessageList.vue';
import MessageInput from '@/components/MessageInput.vue';
import axios from 'axios';

export default {
  components: {
    MessageList,
    MessageInput
  },
  data() {
    return {
      messages: [],
      currentUserId: 'user123'
    };
  },
  methods: {
    handleSendMessage(text) {
      // 사용자 입력을 messages 배열에 추가하고 서버에 쿼리를 보냄
      this.addMessage(text, this.currentUserId);
      this.fetchDataFromServer(text);
    },
    addMessage(text, senderId) {
      // 메시지를 messages 배열에 추가하는 함수
      const newMessage = { id: this.messages.length + 1, text, senderId };
      this.messages.push(newMessage);
    },
    fetchDataFromServer(query) {
      // 서버에 데이터를 요청하는 함수
      axios.post('http://localhost:8080/findAll', { query })
        .then(response => {
          // 서버로부터 받은 데이터를 메시지로 추가
          response.data.forEach(item => {
            this.addMessage(`${item.biz_nm} - ${item.payment}`, 'supportBot');
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }
};
</script>

<style>
/* 메시지 목록 스타일 */
.message-list {
  padding: 1rem;
  overflow-y: auto;
}

/* 메시지 항목 스타일 */
.message-item {
  display: flex;
  max-width: 80%;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 15px;
  background: #e5e5ea; /* 기본 배경색 */
}

/* 현재 사용자의 메시지 스타일 */
.message-item.owner {
  margin-left: auto;
  background: #d4edda; /* 현재 사용자 배경색 */
}

/* 다른 사용자의 메시지 스타일 */
.message-item:not(.owner) {
  margin-right: auto;
  background: #f8f9fa; /* 다른 사용자 배경색 */
}
</style>

