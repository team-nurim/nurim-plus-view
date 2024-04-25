<template>
  <div class="chat-window">
    <!-- Only the active message will display its options -->
    <div v-for="(msg, index) in messages" :key="msg.id" class="message-card" :class="{ 'owner': msg.senderId === currentUserId }">
      <div class="message-content">
        <p>{{ msg.text }}</p>
        <div v-if="index === activeMessageIndex" class="options-group">
          <div v-for="option in msg.options" :key="option.id">
            <input type="radio" :id="`option-${option.id}`" :value="option.id" v-model="selectedOption" @change="handleOptionChange">
            <label :for="`option-${option.id}`">{{ option.text }}</label>
          </div>
          <!-- '다음' 버튼 will only show when an option is selected -->
          <button v-if="selectedOption" @click="submitSelection">다음</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
export default {
  data() {
    return {
      // Initialize with only the first message active
      messages: [
        { id: 1, text: '안녕하세요! 정책찾아드리기에 잘오셨습니다.', options: getInitialOptions() }
      ],
      currentUserId: 'user123',
      selectedOption: null,
      activeMessageIndex: 0
    };
  },
  methods: {
    submitSelection() {
      // Move to next step or fetch additional info if end of flow
      if (this.activeMessageIndex === 0) {
        this.updateMessageForGender();
      } else if (this.activeMessageIndex === 1) {
        this.updateMessageForAge();
      } else {
        this.fetchAdditionalInfo();
      }
      this.selectedOption = null; // Clear selection
    },
    handleOptionChange() {
      // You can add additional logic for option change if needed
    },
    updateMessageForGender() {
      const genderOptions = [
        { id: 'male', text: '남성' },
        { id: 'female', text: '여성' }
      ];
      this.addNewMessage('성별을 선택해주세요.', genderOptions);
    },
    updateMessageForAge() {
      const ageOptions = [
        { id: '20s', text: '20대' },
        { id: '30s', text: '30대' },
        { id: '40s', text: '40대' },
        { id: '50s', text: '50대 이상' }
      ];
      this.addNewMessage('연령대를 선택해주세요.', ageOptions);
    },
    addNewMessage(text, options) {
      this.messages.push({ id: this.messages.length + 1, text, options });
      this.activeMessageIndex++;
    },
    fetchAdditionalInfo() {
      // ... Axios API call and response handling
    },
    processResponse(data) {
      // ... Process and display the information from API response
    },

  }
};

function getInitialOptions() {
  return [
    { id: 'seoul', text: '특별시' },
    { id: 'gyeonggi', text: '경기도' },
    { id: 'busan', text: '광역시' },
    { id: 'jeju', text: '특별자치도' }
  ];
}
</script>

<style scoped>
.chat-window {
  max-width: 600px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}
.message-card {
  border-bottom: 1px solid #e0e0e0;
  padding: 20px;
  background-color: #fff;
  transition: background-color 0.3s;
}
.message-card:hover {
  background-color: #f9f9f9;
}
.message-content {
  background-color: #f4f4f7;
  padding: 15px;
  border-radius: 8px;
}
.options-group {
  margin-top: 10px;
}
.owner .message-content {
  background-color: #d4edda;
}
button {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}
</style>
