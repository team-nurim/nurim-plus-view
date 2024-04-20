<template>
  <div>
    <h1>회원 상세 정보</h1>
    <div v-if="loading" class="loader">로딩 중...</div>
    <div v-else>
      <div v-if="member">
        <p>닉네임: {{ member.memberNickname }}</p>
        <p>이메일: {{ member.memberEmail }}</p>
        <p>나이: {{ member.memberAge }}</p>
        <!-- 추가적인 회원 정보들을 표시할 수 있습니다 -->
      </div>
      <div v-else>
        해당 회원을 찾을 수 없습니다.
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      member: null,
      loading: false
    };
  },
  methods: {
    async fetchMember() {
      this.loading = true;
      try {
        const memberId = this.$route.params.id;
        const response = await axios.get(`/api/admin/members/${memberId}`);
        this.member = response.data;
      } catch (error) {
        console.error('회원 정보를 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchMember();
  }
};
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
