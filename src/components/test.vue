<!-- ChatMessage.vue -->
<template>
    <div class="chat-message" :class="{ 'mine': isMine }">
      <span>{{ message.text }}</span>
    </div>
</template>

  <script>
  export default {
    props: ['message', 'isMine'],
  };
  </script>

  <style>
  .chat-message {
    padding: 10px;
    margin: 5px;
    border-radius: 10px;
  }
  .mine {
    background-color: #daf8cb;
  }
  </style>
