<!-- MessageComponent.vue -->
<template>
  <div class="message" @click="$emit('message-click', message)">
    <p>{{ message.text }}</p>
  </div>
</template>
<!-- 나머지 스크립트 및 스타일은 이전과 동일 -->

<script>
export default {
  props: {
    message: Object, // 메시지 객체를 전달받습니다.
    isOwner: Boolean // 메시지 소유자 여부를 판단합니다.
  },

  methods: {
    handleMessageClick() {
      // 클릭 이벤트 발생 시 부모 컴포넌트로 메시지와 함께 이벤트를 전달합니다.
      this.$emit('message-click', this.message);
    },
    toggleCheckbox() {
      // 체크박스 상태 토글 및 이벤트 전파
      this.isSelected = !this.isSelected;
      this.$emit('checkbox-toggled', { id: this.message.id, selected: this.isSelected });
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
 <!-- 이 파일해석: fetchsupportfunds메소드로
  api데이터를 가져와 이를 메시지 배열에 저장하여
  MessageComponent를 사용하여 화면에 표시함.
  이걸 컴포넌트로 만들어 ,vue프로젝트에 포함시켜 사용하면됨 -->