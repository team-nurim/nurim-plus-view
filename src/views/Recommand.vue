<template>
  <div class="chat-window">
    <div v-for="msg in messages" :key="msg.id" class="message-card" :class="{ 'owner': msg.senderId === currentUserId }">
      <div class="message-content">
        <p>{{ msg.text }}</p>
        <div v-if="msg.options.length" class="options-group">
          <div v-for="option in msg.options" :key="option.id">
            <input type="radio" :id="`option-${option.id}`" :value="option.id" v-model="selectedOption">
            <label :for="`option-${option.id}`">{{ option.text }}</label>
          </div>
          <!-- '다음' 버튼은 첫 번째 메시지에서만 보이지 않도록 설정 -->
        <button v-if="msg.id !== 1 || selectedOption" @click="submitSelection">다음</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      messages: [
        { id: 1, senderId: 'system', text: '먼저 지역을 선택해주세요!', options: [
          { id: 'seoul', text: '특별시' },
          { id: 'gyeonggi', text: '경기도' },
          { id: 'busan', text: '광역시' },
          { id: 'jeju', text: '특별자치도' }
        ]}
      ],
      currentUserId: 'user123',
      selectedOption: null
    };
  },
  methods: {
    submitSelection() {
      let nextMsg = {
        id: this.messages.length + 1,
        senderId: 'system',
        text: '',
        options: []
      };

      switch (this.selectedOption) {
        case 'seoul':
        case 'gyeonggi':
        case 'busan':
        case 'jeju':
          nextMsg.options = [
            { id: 'male', text: '남성' },
            { id: 'female', text: '여성' }
          ];
          nextMsg.text = `지역 선택: ${this.selectedOption}`;
          break;
        case 'male':
        case 'female':
          nextMsg.options = [
            { id: '20s', text: '20대' },
            { id: '30s', text: '30대' },
            { id: '40s', text: '40대' },
            { id: '50s', text: '50대 이상' }
          ];
          nextMsg.text = `성별 선택: ${this.selectedOption}`;
          break;
        case '20s':
        case '30s':
        case '40s':
        case '50s':
          this.fetchAdditionalInfo();
          return;
      }

      this.messages.push(nextMsg);
      this.selectedOption = null; // 선택 초기화
    },
    handleOptionChange() {
      // 선택이 변경되면 여기에서 추가 로직을 구현할 수 있습니다.
    },
    fetchAdditionalInfo() {
      const accessToken = localStorage.getItem('accessToken');
      axios.get('/api/v1/recommend/childCare', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(response => {
        this.processResponse(response.data);
      }).catch(error => {
        console.error('API 호출 에러:', error);
      });
    },
    processResponse(data) {
      this.messages.push(...data.map(item => ({
        id: this.messages.length + 1,
        text: `지역: ${item.sigunNm}, 사업명: ${item.bizNm}, 지원금액: ${item.payment}`,
        options: []
      })));
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
