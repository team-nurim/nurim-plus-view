<!-- 부모 컴포넌트 -->
<template>
  <div>
    <div class="chat-window">
      <message-component
        v-for="msg in messages"
        :key="msg.id"
        :message="msg"
        :isOwner="msg.senderId === currentUserId"
        @message-click="handleMessageClick"
        @selection-changed="handleSelectionChange"
      />
    </div>
  </div>
</template>

<script>
import MessageComponent from '@/components/MessageComponent.vue'

export default {
  components: {
    MessageComponent
  },
  data() {
    return {
      allMessages: [
        { id: 1, text: '안녕하세요! 정책찾아드리기에 잘오셨습니다.', senderId: 'user123' },
        { id: 1, text: '귀하가 기혼이시군요!, 이런정책은 어떠세요?.', senderId: 'user123' },
        { id: 2, text: '선택하세요', senderId: 'user456' , showCheckbox: false },
        // ... 다른 초기 메시지들
      ],
      followUpMessages: [ // 사용자 선택 후에 표시될 메시지들
        { id: 3, text: '1번 선택한 정책입니다.', senderId: 'user123' },
        { id: 4, text: '2번 선택한 정책입니다.', senderId: 'user123' },
        { id: 5, text: '3번 선택한 정책입니다.', senderId: 'user123' },
      ],
      messages: [], // 화면에 표시될 메시지들
      currentUserId: 'user123',
      messageDisplayIndex: 0,
      timer: null,
      showOptions: false, // 체크박스 옵션을 표시할지 여부
      selectedOptions: [], // 사용자가 선택한 옵션들
    };
  },
  mounted() {
    this.displayMessagesSequentially();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    displayMessagesSequentially() {
      if (this.messageDisplayIndex < this.allMessages.length) {
        const messageToAdd = { ...this.allMessages[this.messageDisplayIndex] };
        // 'user123'은 왼쪽, 'user456'은 오른쪽에 메시지를 배치합니다.
        messageToAdd.isOwner = messageToAdd.senderId === 'user456'; // id가 2인 것으로 가정합니다.
        this.messages.push(messageToAdd);
        this.messageDisplayIndex++;
        if (this.messageDisplayIndex < this.allMessages.length) {
          this.timer = setTimeout(this.displayMessagesSequentially, 1000);
        } else {
          // 메시지 표시가 끝나면 체크박스 옵션을 표시합니다.
          this.showOptions = true;
        }
      }
    },
    submitSelection() {
      this.showOptions = false; // 체크박스 옵션 숨기기
      // 선택된 옵션에 따른 후속 메시지 표시
      const selectedMessages = this.followUpMessages.filter(
        msg => this.selectedOptions.includes(msg.id)
      );
      this.messages = this.messages.concat(selectedMessages);
      // 필요하다면 후속 메시지도 순차적으로 표시할 수 있습니다.
    },
    handleSelectionChange({ id, selected }) {
    if (selected) {
      if (!this.selectedOptions.includes(id)) {
        this.selectedOptions.push(id);
      }
    } else {
      this.selectedOptions = this.selectedOptions.filter(optionId => optionId !== id);
    }
  }
  }
};
</script>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 모든 자식 요소를 왼쪽 정렬합니다 */
  max-height: 600px;
  overflow-y: auto;
}
</style>
