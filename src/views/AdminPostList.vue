<template>
  <main class="mt-3">
    <div class="container">
      <div class="row mb-2 d-flex justify-content-center">
          <h3 class="mt-3" style="font-weight: bold">정책정보관리</h3>
        <div class="col-12 d-flex justify-content-center">
          <!-- 카테고리 선택 드롭다운 -->
          <select class="form-select form-select mt-3" style="width: 500px;" @change="handleCategoryChange($event)">
             <option value="전체">전체</option>
  <option value='보육'>보육</option>
  <option value="출산/양육">출산/양육</option>
  <option value="주거">주거</option>
  <option value="장례">장례</option>
          </select>
        </div>
        <div class="d-flex justify-content-end mt-2">
           <a href="/admin/post/register">
            <button class="btn btn-dark" style="background-color: white; color: black;">정책정보 등록</button>
          </a>
        </div>
      </div>
      <!-- 게시물 테이블 -->
      <div class="table-responsive mt-3 d-flex justify-content-center">
        <table class="table" style="background-color: white;">
          <!-- 테이블 헤더 -->
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">카테고리</th>
              <th scope="col">등록일자</th>
              <th scope="col">작성자</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <!-- 게시물 목록 표시 -->
          <tbody style="background-color: white;">
            <tr v-for="(post, index) in postList" :key="index">
              <td>
                <div style="padding: 10px 0;">{{ post.postId }}</div>
              </td>
              <td>
                <div style="padding: 10px 0;">
                  <router-link style="text-decoration: none; color: black;" :to="`read/${post.postId}`">{{ post.postTitle }}</router-link>
                </div>
              </td>
              <td>
                <div style="padding: 10px 0;">{{ post.postCategory }}</div>
              </td>
              <td>
                <div style="padding: 10px 0;">{{ post.postRegisterDate }}</div>
              </td>
              <td>
                <div style="padding: 10px 0;">{{ post.postWriter }}</div>
              </td>
              <td>
                <div style="padding: 10px 0;">
                  <div class="dropdown">
                    <svg width="5" height="15" id="dropdownMenuButton" xmlns="http://www.w3.org/2000/svg" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="pointer-events: all;">
                      <circle cx="2.5" cy="2.5" r="2" fill="black"/>
                      <circle cx="2.5" cy="7.5" r="2" fill="black"/>
                      <circle cx="2.5" cy="12.5" r="2" fill="black"/>
                    </svg>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="min-width: auto;">
                      <li><a class="dropdown-item" href="#">게시물 수정</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" href="#">게시물 삭제</a></li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 페이지네이션 -->
      <div class="d-flex justify-content-center mt-3">
        <button class="btn btn-white mr-2" @click="prevPage" :disabled="currentPage === 0">이전</button>
        <div v-for="pageNumber in totalPages" :key="pageNumber">
          <button class="btn btn-dark mr-2" @click="goToPage(pageNumber)" :class="{ 'btn-white': currentPage === pageNumber }">{{ pageNumber }}</button>
        </div>
        <button class="btn btn-white" @click="nextPage" :disabled="currentPage === totalPages -1">다음</button>
      </div>
    </div>
  </main>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import axios from 'axios';
export default {

  name: 'AdminList',
  data () {
    return {
      postList: [],
      currentPage: 0,
      totalPages: 0,
      itemsPerPage: 10,
      selectedCategory: '전체', // 선택된 카테고리를 저장하는 변수 추가
    };
  },
  mounted() {
    this.axiosAdminPostList();
  },
  methods: {
    async axiosAdminPostList(category = '전체') {
      try {
        let url = `http://localhost:8080/api/v1/posts/post/list?page=${this.currentPage}&size=${this.itemsPerPage}`;
        if(category !== '전체') {
          url = `http://localhost:8080/api/v1/posts/post/${category}?page=${this.currentPage}&size=${this.itemsPerPage}`;
        }
        const response = await axios.get(url);
        this.postList = response.data.content;
        this.totalPages = response.data.totalPages;
      } catch (err) {
        console.error('리스트를 불러 올 수 없습니다.', err);
      }
    },
    async selectCategory(category) {
      this.selectedCategory = category;
      await this.axiosAdminPostList(category);
    },
   goToPage(pageNumber) {
  this.currentPage = pageNumber-1;
  this.axiosAdminPostList(this.selectedCategory); // Pass the selected category
},
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.axiosAdminPostList(this.selectedCategory);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.axiosAdminPostList(this.selectedCategory);
      }
    },
    handleCategoryChange(event) {
        const category = event.target.value;
    this.selectCategory(category);
    }
  },
};
</script>

<style>

</style>
