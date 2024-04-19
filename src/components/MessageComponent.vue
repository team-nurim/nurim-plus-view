 <!-- eslint-disable  -->
<template>
    <div class="message" :class="{'owner': isOwner}">
      <p>{{ message.text }}</p>
    </div>
</template>

  <script>
  export default {
    props: {
      message: Object,

      isOwner: Boolean
    }
  };
  </script>

  <style scoped>
  .message {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  .owner {
    background-color: #dff0d8;
    align-self: flex-end;
  }
  </style>
