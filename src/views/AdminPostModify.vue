<template>
  <main class="mt-5">
    <div class="container">
      <h2 class="text-center mb-5">정책정보 수정</h2>
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <form>
            <!-- 입력 요소들을 중앙에 배치 -->
            <div class="mb-3 row">
              <label for="postTitle" class="col-md-3 col-form-label">제목</label>
              <div class="col-md-9">
                <input v-model="postData.postTitle" type="text1" class="form-control" id="postTitle">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="postCategory" class="col-md-3 col-form-label">카테고리</label>
              <div class="col-md-9">
                <input v-model="postData.postCategory" type="text1" class="form-control" id="postCategory">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="postRegisterDate" class="col-md-3 col-form-label">등록일자</label>
              <div class="col-md-9">
                <input v-model="postData.postRegisterDate" type="text1" class="form-control" id="postRegisterDate">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="postWriter" class="col-md-3 col-form-label">작성자</label>
              <div class="col-md-9">
                <input v-model="postData.postWriter" type="text1" class="form-control" id="postWriter">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="postContent" class="col-md-3 col-form-label">내용</label>
              <div class="col-md-9">
                <textarea v-model="postData.postContent" class="form-control" id="postContent" rows="5"></textarea>
              </div>
            </div>
            <!-- 이미지 업로드를 위한 input 요소 추가 -->
            <!-- <div class="mb-3 row">
              <label for="image" class="col-md-3 col-form-label">이미지 업로드</label>
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
          <!-- 수정하기 버튼에 savePost 메서드 연결 -->
          <button type="button" class="btn btn-lg btn-primary me-3" @click="showModifyModal">수정하기</button>
          <button type="button" class="btn btn-lg btn-danger" @click="showDeleteModal">삭제</button>
        </div>
      </div>
    </div>
  </main>
  <!-- 수정 모달 -->
    <div v-if="modifyModalVisible" class="modal fade show" tabindex="-1" role="dialog" style="display: block; background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">게시물 수정</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="hideModal"></button>
          </div>
          <div class="modal-body">
            <p>게시물을 수정하시겠습니까?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideModal">취소</button>
            <button type="button" class="btn btn-primary" @click="modifyPostAndHideModal">수정</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 삭제 모달 -->
    <div v-if="deleteModalVisible" class="modal fade show" tabindex="-1" role="dialog" style="display: block; background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">게시물 삭제</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="hideModaldelete"></button>
          </div>
          <div class="modal-body">
            <p>게시물을 삭제하시겠습니까?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideModaldelete">취소</button>
            <button type="button" class="btn btn-danger" @click="deletePostAndHideModal">삭제</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
// eslint-disable-next-line
/* eslint-disable */
export default {
  name: 'AdminModify',
  props: ['postId'],

  data() {
    return {
      postData: {
        postTitle: '',
        postCategory: '',
        postRegisterDate: '',
        postWriter: '',
        postContent: '',
      },
      imageFile: null,
      modifyModalVisible: false, // 모달의 표시 여부
      deleteModalVisible : false,
    }
  },

  mounted() {
    this.fetchData(this.postId);
  },

  methods: {
    async fetchData(postId) {
      try {
        const tokenValue = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhYWFhQGdtYWlsLmNvbSI6IjExMTExMSIsImlhdCI6MTcxMzQyNzg0MiwiZXhwIjoxNzEzNTE0MjQyfQ.IaWEtqm1S2OFi7_JmQXJqICEuI84emCTuOMXRFVKfyM';

        let url = `http://localhost:8080/api/v1/posts/post/read/${postId}`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${tokenValue}`
          }});

        const responseData = response.data;

        // API 응답에서 필요한 데이터를 추출하여 postData에 할당합니다.
        this.postData.postTitle = responseData.postTitle;
        this.postData.postCategory = responseData.postCategory;
        this.postData.postRegisterDate = responseData.postRegisterDate;
        this.postData.postWriter = responseData.postWriter;
        this.postData.postContent = responseData.postContent;
      } catch (err) {
        console.error('데이터를 불러올 수 없습니다.', err);
      }
    },

    async modifyPost() {
      try {
        const formData = new FormData();
        formData.append('postTitle', this.postData.postTitle);
        formData.append('postCategory', this.postData.postCategory);
        formData.append('postRegisterDate', this.postData.postRegisterDate);
        formData.append('postWriter', this.postData.postWriter);
        formData.append('postContent', this.postData.postContent);

        if (this.imageFile) {
          formData.append('image', this.imageFile);
        }

        const tokenValue = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhYWFhQGdtYWlsLmNvbSI6IjExMTExMSIsImlhdCI6MTcxMzQyNzg0MiwiZXhwIjoxNzEzNTE0MjQyfQ.IaWEtqm1S2OFi7_JmQXJqICEuI84emCTuOMXRFVKfyM';
        const url = `http://localhost:8080/api/v1/posts/post/update/${this.postId}`;

        const response = await axios.put(url, formData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenValue}`
          }
        });
         // 성공 시 alert 메시지 표시
        alert('게시물이 수정되었습니다.');
        console.log('게시물 수정 완료:', response.data);
        // 조회 페이지로 이동
        this.$router.push(`/admin/post/read/${this.postId}`);
      } catch (error) {
        console.error('게시물 수정 실패:', error);
      }
    },
    async deletePost() {
      try {
        const tokenValue = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhYWFhQGdtYWlsLmNvbSI6IjExMTExMSIsImlhdCI6MTcxMzQyNzg0MiwiZXhwIjoxNzEzNTE0MjQyfQ.IaWEtqm1S2OFi7_JmQXJqICEuI84emCTuOMXRFVKfyM';

        const url = `http://localhost:8080/api/v1/posts/post/${this.postId}`;
        const response = await axios.delete(url, {
          headers: {
            'Authorization': `Bearer ${tokenValue}`
          }
        });
        // 삭제 후 성공 메시지 출력
        alert('게시물이 성공적으로 삭제되었습니다.');
        console.log('게시물 삭제 완료:', response.data);
        // 삭제 후 리스트 페이지로 리다이렉트
        this.$router.push('/admin/post/list');
      } catch (error) {
        console.error('게시물 삭제 실패:', error);
      }
    //  수정모달
    },
    showModifyModal() {
      this.modifyModalVisible  = true; // 모달 표시
    },
    hideModal() {
      this.modifyModalVisible  = false; // 모달 숨김
    },
    modifyPostAndHideModal() {
      this.modifyPost(); // 게시물 저장
      this.hideModal(); // 모달 숨김
    },
    //  삭제모달
    showDeleteModal() {
      this.deleteModalVisible  = true; // 모달 표시
    },
    hideModaldelete() {
      this.deleteModalVisible  = false; // 모달 숨김
    },
    deletePostAndHideModal() {
      this.deletePost(); // 게시물 삭제
      this.hideModal(); // 모달 숨김
    },
    handleImageUpload(event) {
      this.imageFile = event.target.files[0];
      console.log('Uploaded image:', this.imageFile);
    }
  }
}
</script>

<style>
/* 파일 업로드 요소와 추가 정보 스타일링 */
input[type="file"] {
  width: 80%;
  padding: 8px;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 5px;
  box-sizing: border-box;
}

/* textarea 요소를 더 크게 만듭니다 */
textarea {
  width: 80%;
  max-width: 80%;
  height: 200px;
  resize: vertical;
  padding: 8px;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 5px;
  box-sizing: border-box;
}

/* 입력 요소들의 폭을 조절합니다 */
input[type="text1"] {
  width: 80%;
}
</style>
