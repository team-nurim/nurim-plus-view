<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2 class="modal-title">{{ editedMember.memberNickname }} 님의 정보</h2>
      <div class="member-info">
        <div v-if="!isEditMode">
          <div class="info-row">
            <p><strong>ID:</strong> {{ editedMember.memberId }}</p>
            <p><strong>E-mail:</strong> {{ editedMember.memberEmail }}</p>
          </div>
          <div class="info-row">
            <p><strong>이름:</strong> {{ editedMember.memberNickname }}</p>
            <p><strong>생년월일:</strong> {{ editedMember.birthDate }}</p>
          </div>
          <!-- 기타 정보들도 표시 -->
        </div>
        <div v-else>
          <!-- 수정 폼 -->
          <form @submit.prevent="updateMember" class="edit-form">
            <div class="form-group">
              <label for="memberNickname">이름</label>
              <input type="text" id="memberNickname" v-model="editedMember.memberNickname" required />
            </div>
            <!-- 다른 필드들도 수정 폼에 추가 -->
            <div class="button-group">
              <button type="submit" class="save-button">저장</button>
              <button @click="cancelEdit" class="cancel-button">취소</button>
            </div>
          </form>
        </div>
        <button v-if="!isEditMode" @click="editMode" class="edit-button">수정</button>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
 /* eslint-disable */
import axios from 'axios';

export default {
  props: {
    showModal: Boolean,
    memberData: Object,
  },
  data() {
    return {
      isEditMode: false,
      editedMember: { ...this.memberData },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    editMode() {
      this.isEditMode = true;
    },
    cancelEdit() {
      this.isEditMode = false;
      this.editedMember = { ...this.memberData };
    },
    async updateMember() {
      try {
        // 서버에 수정된 회원 정보 업데이트 요청
        await axios.put(`/api/admin/members/${this.editedMember.memberId}`, this.editedMember);
        // 부모 컴포넌트로 이벤트 전달하여 모달 닫기
        this.$emit('close-modal');
        // 성공 메시지 표시
        alert('회원 정보가 성공적으로 수정되었습니다.');
      } catch (error) {
        console.error('회원 정보 업데이트 중 오류가 발생했습니다:', error);
        // 실패 메시지 표시
        alert('회원 정보 업데이트 중 오류가 발생했습니다.');
      }
    }
  }
};
</script>

<style scoped>
/* 필요한 스타일링 코드 추가 */
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
}

.modal-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.member-info {
  font-family: Arial, sans-serif;
  color: #333;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.edit-form .form-group {
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.save-button, .cancel-button, .edit-button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.save-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  margin-right: 5px;
}

.save-button:hover {
  background-color: #0056b3;
}

.cancel-button, .edit-button {
  background-color: #ccc;
  color: #333;
  border: none;
}

.cancel-button:hover, .edit-button:hover {
  background-color: #bbb;
}
</style>
