<template>
  <div>
    <h1>회원 정보 수정</h1>
    <form @submit.prevent="updateMember">
      <div class="form-group">
        <label for="memberNickname">닉네임</label>
        <input type="text" id="memberNickname" v-model="editedMember.memberNickname" required />
      </div>
      <div class="form-group">
        <label for="memberAge">나이</label>
        <input type="number" id="memberAge" v-model="editedMember.memberAge" required />
      </div>
      <div class="form-group">
        <label for="gender">성별</label>
        <select id="gender" v-model="editedMember.gender" required>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
      </div>
      <!-- 기타 회원 정보 수정 폼 요소들을 추가할 수 있습니다 -->
      <button type="submit">회원 정보 수정</button>
    </form>
  </div>
</template>

<script>
// eslint-disable-next-line
 /* eslint-disable */
import axios from 'axios';

export default {
  data() {
    return {
      memberId: null,
      editedMember: {
        memberNickname: '',
        memberAge: 0,
        gender: ''
        // 기타 회원 정보 필드 추가
      }
    };
  },
  methods: {
    async fetchMember() {
      try {
        const response = await axios.get(`/api/members/${this.memberId}`);
        this.editedMember = response.data;
      } catch (error) {
        console.error('회원 정보를 불러오는 중 오류가 발생했습니다:', error);
      }
    },
    async updateMember() {
      try {
        await axios.put(`/api/members/${this.memberId}`, this.editedMember);
        alert('회원 정보가 성공적으로 수정되었습니다.');
      } catch (error) {
        console.error('회원 정보 수정 중 오류가 발생했습니다:', error);
      }
    }
  },
  mounted() {
    this.memberId = this.$route.params.id;
    this.fetchMember();
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="number"],
select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>