<!-- 부모 컴포넌트 -->
<template>
  <div class="chat-window">
    <div
      v-for="msg in messages"
      :key="msg.id"
      class="message-card"
      :class="{ 'owner': msg.senderId === currentUserId }"
    >
      <div class="message-content">
        <p>{{ msg.text }}</p>
        <p v-if="msg.details">{{ msg.details }}</p>
        <!-- 라디오 버튼 옵션을 렌더링합니다 -->
        <div v-if="msg.options" class="options-group">
          <div v-for="option in msg.options" :key="option.id">
            <input type="radio"
                   :name="`optionGroup-${msg.id}`"
                   :id="`option-${option.id}`"
                   :value="option.id"
                   v-model="selectedOption"
                   @change="handleOptionChange">
            <label :for="`option-${option.id}`">{{ option.text }}</label>
          </div>
        </div>
        <!-- 다음 버튼을 렌더링합니다 -->
        <button v-if="msg.options" @click="submitSelection(msg)">다음</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // 이 라인을 추가하세요

export default {
  data() {
    return {
      allMessages: [
        { id: 1, text: '안녕하세요! 정책찾아드리기에 잘오셨습니다.', senderId: 'user123' },
        { id: 2, text: '먼저, 거주하시는 지역을 선택해주세요.', senderId: 'user123', options: [
          { id: 'seoul', text: '특별시' },
          { id: 'busan', text: '경기도' },
          { id: 'seoul', text: '광역시' },
          { id: 'busan', text: '특별자치도' },
        ] }
      ],
      messages: [],
      currentUserId: 'user123',
      selectedOption: null
    };
  },
  mounted() {
    this.messages = this.allMessages;
  },
  methods: {
    submitSelection(msg) {
      // 다음 질문이나 정보를 로딩
      axios.get(`/api/childcare`) // 스프링부트 서버의 API를 호출합니다.
        .then(response => {
          // API로부터 받은 데이터를 messages 배열에 추가하여 화면에 표시합니다.
          this.messages.push(...response.data.map(item => ({
            id: item.id,
            text: `지역: ${item.sigunNm}, 사업명: ${item.bizNm}, 지원금액: ${item.payment}`,
            senderId: 'system'
          })));
        })
        .catch(error => {
          console.error('API 호출 에러:', error);
        });
    },
    handleOptionChange() {
      // 추가적인 변화 처리가 필요한 경우 여기에 구현
    }
  }
};
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
