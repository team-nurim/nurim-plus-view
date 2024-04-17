<template>
  <main class="mt-5">
    <div class="container">
      <h2 class="text-center mb-5">{{ postRead.postTitle }}</h2>
      <div class="row">
  <div class="col-md-8 offset-md-2">
          <form>
            <!-- 입력 요소들을 중앙에 배치 -->
            <div class="mb-3 row border">
              <label for="postTitle" class="col-md-3 col-form-label border">제목</label>
              <div class="col-md-9 border">
                <p class="form-control-plaintext">{{ postRead.postTitle }}</p>
              </div>
            </div>
            <!-- 다른 입력 요소들도 동일하게 구성 -->
            <div class="mb-3 row border">
              <label for="postRegisterDate" class="col-md-3 col-form-label border">등록일자</label>
              <div class="col-md-9 border">
                <p class="form-control-plaintext">{{ postRead.postRegisterDate }}</p>
              </div>
            </div>
            <div class="mb-3 row border">
              <label for="postWriter" class="col-md-3 col-form-label border">작성자</label>
              <div class="col-md-9 border">
                <p class="form-control-plaintext">{{ postRead.postWriter }}</p>
              </div>
            </div>
            <div class="mb-3 row border">
              <label for="postContent" class="col-md-3 col-form-label border">내용</label>
              <div class="col-md-9 border">
                <p class="form-control-plaintext">{{ postRead.postContent }}</p>
              </div>
            </div>
            <!-- 이미지 업로드를 위한 input 요소 추가 -->
            <div class="mb-3 row border">
              <label for="image" class="col-md-3 col-form-label border">이미지</label>
              <div class="col-md-9 border">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-8 offset-md-2 d-flex justify-content-center">
        <router-link to="/admin/post/list" class="btn btn-lg btn-primary me-3">목록으로</router-link>
        <router-link :to="`/admin/post/modify/${postId}`" class="btn btn-lg btn-primary me-3">수정하기</router-link>
      </div>
    </div>
  </main>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
  import axios from 'axios';

  export default {
    name: 'AdminPostRead',
    props: ['postId'], // postId를 props로 받아옵니다.
    data() {
      return {
        postRead: {}, // 단일 게시물 정보를 담을 객체
      };
    },
    mounted() {
      // props로 전달받은 postId를 사용하여 API 요청을 보냅니다.
      this.axiosAdminPostRead(this.postId);
    },
    methods: {
      async axiosAdminPostRead(postId) {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/posts/post/read${postId}`);
          this.postRead = response.data;
        } catch (error) {
          console.error('Failed to fetch post details:', error);
        }
      },
    },
  };
</script>

<style scoped>
  /* Additional styling for enhanced presentation */
  .container {
    background-color: transparent; /* 배경색을 투명하게 설정하여 배경을 없앱니다 */
    padding: 0; /* 여백을 없앱니다 */
    border-radius: 0; /* 테두리 반경을 없앱니다 */
    max-width: 900px; /* 최대 너비 설정 */
    margin: 0 auto; /* 가운데 정렬 */
    border: none; /* 테두리를 없앱니다 */
  }

  h2 {
    color: #007bff;
    font-weight: bold; /* 글꼴 굵기 설정 */
    text-align: center; /* 가운데 정렬 */
  }

  .table {
    border-collapse: collapse; /* 테이블 셀 경계 설정 */
    width: 200%; /* 테이블 너비 설정 */
  }

  .table th, .table td {
    border: 1px solid #dee2e6; /* 셀 테두리 스타일 설정 */
    padding: 8px; /* 셀 내부 여백 설정 */
    text-align: left; /* 텍스트 정렬 설정 */
  }

  .table th {
    background-color: #f2f2f2; /* 테이블 헤더 배경색 설정 */
  }

  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    border-radius: 5px; /* 버튼 모서리 둥글게 */
    padding: 10px 20px; /* 내부 여백 조정 */
    font-size: 1.2rem; /* 글꼴 크기 설정 */
    transition: background-color 0.3s ease; /* 변화 효과 설정 */
  }

  .btn-primary:hover {
    background-color: #0056b3;
  }

  /* Added styling for borders */
  .border {
    border: 1px solid #dee2e6;
  }
</style>
