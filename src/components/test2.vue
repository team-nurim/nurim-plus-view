
<!-- ChatWindow.vue -->
<template>
    <div class="chat-window">
      <chat-message 
        v-for="message in message" 
        :key="message.id" 
        :message="message" 
        :isMine="message.senderId === currentUserId"
      ></chat-message>
    </div>
</template>
  
  <script>
  import ChatMessage from './ChatMessage.vue';
  
  export default {
    components: {
      ChatMessage
    },
    data() {
      return {
        messages: [], // 실제 채팅 메시지들의 배열
        currentUserId: 'user123' // 예시로 사용자 ID를 설정
      };
    },
    // 메시지를 가져오고 새로운 메시지를 추가하는 메서드들...
  };
  </script>
  