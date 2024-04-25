<template>
  <div>
    <h1>Admin: 회원관리</h1>
    <div class="search-bar">
      <select v-model="searchCategory">
        <option value="memberId">작성자(ID)</option>
        <option value="memberNickname">이름</option>
        <option value="joinDate">회원종류</option>
      </select>
      <input type="text" v-model="searchQuery" placeholder="Search" @keyup.enter="searchMembers" />
      <button class="search-button" @click="searchMembers">검색</button>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="sort-box">
        <select v-model="sortBy" @change="sortMembers">
          <option value="memberId">작성자(ID)</option>
          <option value="memberNickname">이름순</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>작성자(ID)</th>
            <th>이메일</th>
            <th>회원 이름</th>
            <th>나이</th>
            <th>회원 종류</th>
            <th>조회</th>
            <th>선택</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="displayedMembers.length === 0">
            <tr>
              <td colspan="8">데이터가 없습니다.</td>
            </tr>
          </template>
          <tr v-for="(member, index) in displayedMembers" :key="index">
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ member.memberId }}</td>
            <td>{{ member.memberEmail }}</td>
            <td>{{ member.memberNickname }}</td>
            <td>{{ member.memberAge }}</td>
            <td>{{ member.type }}</td>
            <td><button class="blue-button" @click="openModal(member)">조회</button></td>
            <td>
              <input type="checkbox" :id="'checkbox-' + member.memberId" v-model="selectedMembers" :value="member" class="checkbox" />
              <label :for="'checkbox-' + member.memberId" class="custom-checkbox"></label>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button class="blue-button" @click="fetchPreviousPage" :disabled="currentPage === 1">Previous</button>
        <span v-for="page in displayedPages" :key="page">
          <button class="blue-button" @click="fetchPage(page)">{{ page }}</button>
        </span>
        <button class="blue-button" @click="fetchNextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
      <div class="select-all">
        <button class="blue-button" @click="selectAllMembers">전체 선택</button>
      </div>
      <div class="delete-button">
        <button class="red-button" @click="confirmDelete">탈퇴</button>
      </div>
    </div>
    <!-- 모달 부분 -->
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="info-box" style="text-align: center;">
          <h2 style="color: black; margin-top: 10px;">{{ selectedMember.memberNickname }} 님의 정보</h2>
          <!-- 수정 버튼 추가 -->
          <div class="edit-button">
            <button class="blue-button" @click="openEditForm">수정</button>
          </div>
        </div>
        <table class="member-info">
          <tr>
            <td>ID</td>
            <td>{{ selectedMember.memberId }}</td>
          </tr>
          <tr>
            <td>E-mail</td>
            <td>{{ selectedMember.memberEmail }}</td>
          </tr>
          <tr>
            <td>이름</td>
            <td>{{ selectedMember.memberNickname }}</td>
          </tr>
          <tr>
            <td>나이</td>
            <td>{{ selectedMember.memberAge }}</td>
          </tr>
          <tr>
            <td>성별</td>
            <td>{{ selectedMember.gender }}</td>
          </tr>
          <tr>
            <td>주소</td>
            <td>{{ selectedMember.memberResidence }}</td>
          </tr>
          <tr>
            <td>결혼여부</td>
            <td>{{ selectedMember.memberMarriage }}</td>
          </tr>
          <tr>
            <td>가입일</td>
            <td>{{ selectedMember.joinDate }}</td>
          </tr>
          <tr>
            <td>월소득</td>
            <td>{{ selectedMember.memberIncome }}</td>
          </tr>
          <tr>
            <td>전문가 변경</td>
            <td>{{ selectedMember.type }}</td>
          </tr>
        </table>
        <!-- 수정 폼 부분 -->
        <div v-if="showEditForm" class="edit-form">
          <h2>회원 정보 수정</h2>
          <form @submit.prevent="submitForm">
            <label for="name">이름:</label>
            <input type="text" id="name" v-model="selectedMember.memberNickname" required />
            <label for="email">E-Mail:</label>
            <input type="text" id="email" v-model="selectedMember.memberEmail" />
            <label for="memberAge">나이:</label>
            <input type="text" id="memberAge" v-model="selectedMember.memberAge" />
            <label for="gender">성별:</label>
            <input type="text" id="gender" v-model="selectedMember.gender" />
            <label for="memberResidence">주소:</label>
            <input type="text" id="memberResidence" v-model="selectedMember.memberResidence" />
            <label for="memberMarriage">결혼여부:</label>
            <input type="text" id="memberMarriage" v-model="selectedMember.memberMarriage" />
            <label for="memberIncome">월소득:</label>
            <input type="text" id="memberIncome" v-model="selectedMember.memberIncome" />
            <label for="isExpert">전문가 변경:</label>
            <input type="text" id="isExpert" v-model="selectedMember.type" />
            <!-- 수정 버튼 대신 저장 버튼 사용 -->
            <button type="button" class="blue-button" @click="saveForm">저장</button>
            <button type="button" class="red-button" @click="closeEditForm">취소</button>
          </form>
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
      loading: false,
      searchQuery: '',
      searchCategory: 'memberNickname',
      membersList: [],
      selectedMembers: [],
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      sortBy: 'memberId',
      showModal: false,
      selectedMember: null,
      showEditForm: false,
      searchQuery: '',
    searchCategory: 'memberNickname', // 초기 검색 카테고리 설정
    };
  },
  computed: {
    displayedMembers() {
  if (!this.membersList) {
    return []; // membersList가 정의되지 않은 경우 빈 배열 반환
  }
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = Math.min(startIndex + this.pageSize, this.membersList.length);
  return this.membersList.slice(startIndex, endIndex);
},
    displayedPages() {
      let startPage;
      let endPage;

      if (this.totalPages <= 5) {
        startPage = 1;
        endPage = this.totalPages;
      } else {
        if (this.currentPage >= this.totalPages) {
          startPage = Math.max(1, this.totalPages - 4);
          endPage = this.totalPages;
        } else {
          startPage = this.currentPage - 2;
          endPage = Math.min(startPage + 4, this.totalPages);
        }
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    }
  },
  mounted() {
    this.fetchMembers(1);
  },
  methods: {
    async fetchMembers(page) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    this.loading = true;
    this.membersList = [];
    const response = await axios.get(`http://localhost:8080/api/v1/members/admin/members?page=${page - 1}&size=${this.pageSize}&sortBy=${this.sortBy}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    this.membersList = response.data.content;
    this.totalPages = response.data.totalPages;
    this.currentPage = page;
    this.loading = false;
  } catch (error) {
    console.error('멤버를 조회할 수 없습니다:', error);
  }
},

async searchMembers() {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`http://localhost:8080/api/v1/members/admin/members?${this.searchCategory}=${this.searchQuery}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      this.membersList = response.data.content;
      this.totalPages = response.data.totalPages;
      this.currentPage = 1; // 검색 결과의 첫 페이지로 설정
    } catch (error) {
      console.error('멤버를 검색할 수 없습니다:', error);
    }
  },

    fetchPreviousPage() {
      if (this.currentPage > 1) {
        this.fetchMembers(this.currentPage - 1);
      }
    },
    fetchPage(page) {
      this.fetchMembers(page);
    },
    fetchNextPage() {
      const nextPage = this.currentPage + 1;
      if (nextPage <= this.totalPages) {
        const lastItemIndex = this.currentPage * this.pageSize - 1;
        const lastItemId = this.membersList[lastItemIndex].memberId;
        this.fetchMembers(nextPage, lastItemId);
      }
    },
    searchMembers() {
      console.log(`Searching members with query: ${this.searchQuery} in category: ${this.searchCategory}`);
    },

    searchMembers() {
      console.log(`Searching members with query: ${this.searchQuery} in category: ${this.searchCategory}`);
    },

    openModal(member) {
      this.selectedMember = member;
      this.showModal = true;
    },
    selectAllMembers() {
      this.selectedMembers = this.selectedMembers.length === this.membersList.length ? [] : [...this.membersList];
    },

    selectAllMembers() {
      this.selectedMembers = this.selectedMembers.length === this.membersList.length ? [] : [...this.membersList];
    },

    confirmDelete() {
  if (this.selectedMembers.length === 0) {
    console.warn('삭제할 회원을 선택해주세요.');
    return;
  }

  if (confirm('선택한 회원을 탈퇴하시겠습니까?')) {
    const accessToken = localStorage.getItem('accessToken');
    const deletePromises = this.selectedMembers.map(member => {
      axios.delete(`http://localhost:8080/api/v1/admin/${member.memberId}`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(`${member.memberId} 님의 탈퇴가 성공적으로 처리되었습니다.`);
      }).catch(error => {
        console.error('서버 응답 에러:', error.response ? error.response.data : error.message);
        throw error;
      });
    });

    Promise.all(deletePromises)
      .then(() => {
        // 선택된 회원 목록에서 삭제
        this.membersList = this.membersList.filter(member => !this.selectedMembers.includes(member));
        this.selectedMembers = [];
      })
      .catch(error => {
        console.error('회원 탈퇴 중 오류가 발생했습니다:', error);
      });
    }
  },
    sortMembers() {
  // sortBy 값에 따라 회원 목록을 정렬합니다.
  // memberId: 작성자(ID)순, joinDate: 가입일순, memberNickname: 이름순
  switch (this.sortBy) {
    case 'memberId':
      this.membersList.sort((a, b) => a.memberId - b.memberId);
      break;
    case 'memberNickname':
      this.membersList.sort((a, b) => a.memberNickname.localeCompare(b.memberNickname));
      break;
    default:
      break;
  }
},
    closeModal() {
      this.showModal = false;
      this.selectedMember = null;
      this.showEditForm = false;
    },
    goToUpdatePage() {
      this.showEditForm = true;
    },
    // async submitForm() {

    //     const accessToken = localStorage.getItem('accessToken');
    //     const updateData = {
    //       memberNickname: this.selectedMember.memberNickname,
    //       memberEmail: this.selectedMember.memberEmail,
    //       memberAge: this.selectedMember.memberAge,
    //       gender: this.selectedMember.gender,
    //       memberResidence: this.selectedMember.memberResidence,
    //       memberMarriage: this.selectedMember.memberMarriage,
    //       memberIncome: this.selectedMember.memberIncome,
    //       isExpert: this.selectedMember.isExpert
    //     }
    //     const response = await axios.put(`http://localhost:8080/api/v1/members/${this.selectedMember.memberId}`, updateData,{
    //       headers: {
    //         'Authorization': `Bearer ${accessToken}`,
    //         'Content-Type': 'application/json'
    //       }
    // });

    //     }).then(response => {
    //       console.log('회원 정보가 성공적으로 수정되었습니다:', response.data);
    //       this.closeModal(); // 모달 닫기
    //       this.fetchMembers(this.currentPage); // 조회 페이지 갱신
    //     }).catch(error => {
    //       console.error('회원 정보 수정 중 오류가 발생했습니다:', error);
    //     });
    //   }
    // },
    async submitForm() {
      try {
        const updateData = {
          memberAge: this.selectedMember.memberAge,
          gender: this.selectedMember.gender,
          memberResidence: this.selectedMember.memberResidence,
          memberMarriage: this.selectedMember.memberMarriage,
          memberIncome: this.selectedMember.memberIncome,
          type: this.selectedMember.type
        };
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.put(`http://localhost:8080/api/v1/admin/${this.selectedMember.memberId}`, updateData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': `application/json`
          }
        });
        console.log('회원 정보 수정 성공: ', response.data);
        this.closeModal(); // 모달 닫기
        this.fetchMembers(this.currentPage); // 조회 페이지 갱신
      } catch (error) {
        console.log('회원 정보 수정 실패: ', error)
      }
    },

    async fetchMembers(page) {
  try {
    const accessToken = localStorage.getItem('accessToken');
    this.loading = true;
    this.membersList = [];
    const response = await axios.get(`http://localhost:8080/api/v1/members/admin/members?page=${page - 1}&size=${this.pageSize}&sortBy=${this.sortBy}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });
    this.membersList = response.data.content;
    this.totalPages = response.data.totalPages;
    this.currentPage = page;
    this.loading = false;
  } catch (error) {
    console.error('멤버를 조회할 수 없습니다:', error);
  }
},

    // 수정 폼 열기
    openEditForm() {
      this.showEditForm = true;
    },
    // 수정 폼 닫기
    closeEditForm() {
      this.showEditForm = false;
    },
    // 저장 버튼 클릭 시 처리
    saveForm() {
      this.submitForm();
      this.closeEditForm(); // 확인 메시지는 여기서 표시하지 않음
    }
  }
};
</script>


<style scoped>
.search-bar {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.search-bar select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.search-bar input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  flex: 1;
}

.search-bar .search-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 8px 16px;
  transition: background-color 0.3s;
}

.search-bar .search-button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}
th {
  background-color: #f2f2f2;
}
.blue-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;
  transition: background-color 0.3s;
}
.blue-button:hover {
  background-color: #0056b3;
}
.red-button {
  background-color: #dc3545; /* 빨간색 */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;
  transition: background-color 0.3s;
}
.red-button:hover {
  background-color: #c82333; /* 진한 빨간색 */
}
.sort-box {
  float: right;
  margin-bottom: 10px;
}
.sort-box select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.pagination {
  margin-top: 20px;
}
.pagination button {
  margin-right: 5px;
}
.select-all {
  float: right;
  margin-top: 10px;
}
.delete-button {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}

/* 모달 스타일링 */
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* 모달 내 테이블 스타일링 */
.member-info {
  width: 100%;
  font-family: Arial, sans-serif; /* 폰트 변경 */
  color: #333; /* 글씨 색상 변경 */
  background-color: #f9f9f9; /* 배경색 변경 */
}

.member-info td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.member-info tr:last-child td {
  border-bottom: 1px solid #ddd;
}

.info-box {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 20px; /* 박스와 테이블 사이 간격 조절 */
  max-width: 300px; /* 최대 너비 설정 */
}

.info-box h2 {
  font-size: 18px; /* 제목 폰트 크기 조정 */
  color: black;
  text-align: center; /* 가운데 정렬 */
  margin-top: 10px; /* 제목과 상단 간격 조절 */
}

/* 수정 버튼 스타일 */
.edit-button {
  text-align: center;
  margin-top: 20px;
}

.edit-button .blue-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 10px;
  transition: background-color 0.3s;
}

.edit-button .blue-button:hover {
  background-color: #0056b3;
}

/* 수정 폼 스타일 */
.edit-form {
  margin-top: 20px;
}

.edit-form label {
  display: block;
  margin-bottom: 5px;
}

.edit-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

.edit-form button {
  margin-right: 10px;
}
</style>