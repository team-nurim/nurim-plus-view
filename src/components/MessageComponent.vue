<!-- MessageComponent.vue -->
<template>
  <div class="message-item" :class="{ 'owner': isOwner }" @click="handleMessageClick">
    <p>{{ message.text }}</p>
    <!-- 체크박스 추가 -->
    <div v-if="showCheckbox">
      <input
        type="checkbox"
        :id="`checkbox-${message.id}`"
        v-model="isSelected"
        @change="onCheckboxChange"
      >
      <label :for="`checkbox-${message.id}`">{{ message.label }}</label>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    message: Object,  // 메시지 객체를 전달받습니다.
    isOwner: Boolean,  // 메시지 소유자 여부를 판단합니다.
    showCheckbox: Boolean, // 체크박스 보여줄지 말지 결정
  },
  data() {
    return {
      isSelected: false,  // 체크박스 선택 상태
      childCare: [],
      policy: []
    };
  },
  methods: {
    handleMessageClick() {
      this.$emit('message-click', this.message);
    },
    onCheckboxChange(event) {
      this.$emit('selection-changed', { id: this.message.id, selected: event.target.checked });
    }
  }
};
</script>


 <style scoped>
.message {
  max-width: 80%; /* 메시지의 최대 너비를 제한 */
  padding: 10px; /* 패딩을 추가 */
  margin: 5px 10px; /* 간격을 설정 */
  border-radius: 18px; /* 모서리를 둥글게 처리 */
  background-color: #4ee137;/* 기본 배경색 */
  word-wrap: break-word; /* 긴 텍스트가 있을 때 자동으로 줄바꿈 */
  box-sizing: border-box;
  align-self: flex-start; /* 기본적으로 왼쪽 정렬 */
}
.owner {
  background-color: #b6b6e8;
  align-self: flex-end; /* isOwner가 true인 경우 오른쪽으로 배치합니다. */
}
</style>
