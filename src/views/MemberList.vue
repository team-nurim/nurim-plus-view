<template>
  <div>
    <h1>전체 회원 리스트</h1>
    <input type="text" v-model="searchKeyword" placeholder="검색어를 입력하세요" />
    <div class="member-container">
      <div v-if="loading" class="loader">로딩 중...</div>
      <div v-else>
        <table>
          <thead>
            <tr>
              <th>닉네임</th>
              <th>이메일</th>
              <th>나이</th>
              <!-- 추가적인 카테고리 제목을 추가할 수 있습니다 -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in filteredMembers" :key="member.memberId">
              <td>{{ member.memberNickname }}</td>
              <td>{{ member.memberEmail }}</td>
              <td>{{ member.memberAge }}</td>
              <!-- 추가적인 회원 정보를 표시할 수 있습니다 -->
            </tr>
          </tbody>
        </table>
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
.member-container {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
