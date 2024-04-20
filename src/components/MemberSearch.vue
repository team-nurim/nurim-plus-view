<template>
  <div>
    <h1>전체 회원 리스트</h1>
    <input type="text" v-model="searchKeyword" placeholder="검색어를 입력하세요" />
    <div class="member-container">
      <div v-if="loading" class="loader">로딩 중...</div>
      <div v-else>
        <div class="member-table">
          <div class="member-header">
            <div class="member-cell">닉네임</div>
            <div class="member-cell">이메일</div>
            <div class="member-cell">나이</div>
          </div>
          <div v-for="member in filteredMembers" :key="member.memberId" class="member-row">
            <div class="member-cell">{{ member.memberNickname }}</div>
            <div class="member-cell">{{ member.memberEmail }}</div>
            <div class="member-cell">{{ member.memberAge }}</div>
          </div>
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
.member-container {
  margin-top: 20px;
}

.member-table {
  width: 100%;
  border-collapse: collapse;
}

.member-header {
  background-color: #f0f0f0;
  font-weight: bold;
}

.member-cell {
  padding: 10px;
  border: 1px solid #ddd;
}

.member-row {
  display: flex;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
