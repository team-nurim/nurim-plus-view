<template>
    <div class="chat-window">
      <message-component
        v-for="msg in messages"
        :key="msg.id"
        :message="msg"
        :isOwner="msg.senderId === currentUserId"
      />
    </div>
  </template>
  <script>
  import SupportFund from '@/components/SupportFund.vue';
  import axios from 'axios';
  export default {
    components: {
      SupportFund
    },
    data() {
      return {
        supportFunds: []
      };
    },
    created() {
      this.fetchSupportFunds();
    },
    methods: {
      fetchSupportFunds() {
        axios.get('/api/v1/support/list')
          .then(response => {
            this.supportFunds = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };
  </script>
<!-- <script>
import MessageComponent from '@/components/MessageComponent.vue'

export default {
  components: {
    MessageComponent
  },
   data() {
    return {
      messages: [
        { id: 1, text: '안녕하세요! 정책찾아드리기에 잘오셨습니다.', senderId: 'user123' },
        { id: 2, text: '20대 신혼부부에 맞는 정책을 찾아줘!', senderId: 'user456' },
        { id: 3, text: '네! 입력하신 정보를 봐선', senderId: 'user123' },
        { id: 4, text: '2번 선택할게', senderId: 'user456' },
        { id: 1, text: '', senderId: 'user123' },
        { id: 2, text: '...', senderId: 'user456' },
        { id: 1, text: '호출을 받아와야', senderId: 'user123' },
        { id: 2, text: '큰 의미가 있겠는데', senderId: 'user456' },
        { id: 1, text: '호출을 받아와야', senderId: 'user123' },
        { id: 2, text: '큰 의미가 있겠는데', senderId: 'user456' },
      ], // 가상의 메시지 목록
      currentUserId: 'user123' // 현재 사용자의 ID
    };
  },
};
</script> -->
<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  max-height: 600px;
  overflow-y: auto;
}
</style>


