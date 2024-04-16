<template>
  <main class="mt-5">
    <div class="container">
      <h2 class="text-center mb-5">정책정보 상세보기</h2>
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <form>
            <!-- 입력 요소들을 중앙에 배치 -->
            <div class="mb-3 row">
              <label for="postTitle" class="col-md-3 col-form-label">제목</label>
              <div class="col-md-9">
              <p class="form-control-plaintext">{{ postRead.postTitle }}</p>
              </div>
            </div>
            <!-- 다른 입력 요소들도 동일하게 구성 -->
             <div class="mb-3 row">
              <label for="postRegisterDate" class="col-md-3 col-form-label">등록일자</label>
              <div class="col-md-9">
              <p class="form-control-plaintext">{{ postRead.postRegisterDate }}</p>
             </div>
            </div>
             <div class="mb-3 row">
              <label for="postWriter" class="col-md-3 col-form-label">작성자</label>
              <div class="col-md-9">
                <p class="form-control-plaintext">{{ postRead.postWriter }}</p>
              </div>
            </div>
             <div class="mb-3 row">
              <label for="postContent" class="col-md-3 col-form-label">내용</label>
              <div class="col-md-9">
                <p class="form-control-plaintext">{{ postRead.postContent }}</p>
              </div>
            </div>
             <!-- 이미지 업로드를 위한 input 요소 추가 -->
            <!-- <div class="mb-3 row">
              <label for="image" class="col-md-3 col-form-label">이미지</label>
              <div class="col-md-9">
                <input type="file" class="form-control" id="image" accept="image/*" @change="handleImageUpload">
              </div>
            </div> -->
          </form>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-8 offset-md-2 d-flex justify-content-center">
          <router-link to="/admin/post/list" class="btn btn-lg btn-primary me-3">목록으로</router-link>
  <!-- 저장하기 버튼에 savePost 메서드 연결 -->
          <button type="button" class="btn btn-lg btn-primary">수정하기</button>
        </div>
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