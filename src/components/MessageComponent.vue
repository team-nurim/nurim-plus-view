<!-- MessageComponent.vue -->
<template>
  <div class="message-item" :class="{ 'owner': isOwner }">
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
    message: Object,
    isOwner: Boolean,
    showCheckbox: Boolean,
  },
  data() {
    return {
      isSelected: false,
    };
  },
  methods: {
    onCheckboxChange() {
      // 이벤트를 상위 컴포넌트로 전달
      this.$emit('selection-changed', { id: this.message.id, selected: this.isSelected });
    }
  }
};
</script>

<style scoped>
.message-item {
  max-width: 80%;
  padding: 10px;
  margin: 5px 10px;
  border-radius: 18px;
  background-color: #4ee137;
  word-wrap: break-word;
  box-sizing: border-box;
  align-self: flex-start;
}
.owner {
  background-color: #b6b6e8;
  align-self: flex-end;
}
</style>
