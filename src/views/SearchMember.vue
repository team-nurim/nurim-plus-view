<template>
  <div>
    <h1>회원 검색</h1>
    <input type="text" v-model="searchKeyword" placeholder="검색어를 입력하세요" />
    <div v-if="loading" class="loader">로딩 중...</div>
    <div v-else>
      <div v-if="filteredMembers.length === 0">
        검색 결과가 없습니다.
      </div>
      <div v-else>
        <div v-for="member in filteredMembers" :key="member.memberId" class="member-card">
          <p>닉네임: {{ member.memberNickname }}</p>
          <p>이메일: {{ member.memberEmail }}</p>
          <p>나이: {{ member.memberAge }}</p>
          <!-- 추가적인 회원 정보들을 표시할 수 있습니다 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import axios from 'axios';

export default {
  data() {
    return {
      members: [],
      loading: false,
      searchKeyword: ''
    };
  },
  methods: {
    async fetchMembers() {
      this.loading = true;
      try {
        const response = await axios.get('/api/admin/members');
        this.members = response.data;
      } catch (error) {
        console.error('회원 목록을 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    filteredMembers() {
      if (!this.searchKeyword) {
        return this.members;
      }
      return this.members.filter(member =>
        member.memberNickname.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
  },
  mounted() {
    this.fetchMembers();
  }
};
</script>

<style scoped>
.member-card {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.member-card p {
  margin: 5px 0;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
