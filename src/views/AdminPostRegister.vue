<template>
  <div class="mt-5">
    <div class="container">
      <h2 class="text-center mb-5">정책정보 등록</h2>
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <form>
            <div class="mb-3 row">
              <label for="memberId" class="col-md-3 col-form-label">memberId</label>
              <div class="col-md-9">
                <input v-model="postData.memberId" type="text" class="form-control" id="memberId">
              </div>
            </div>
            <!-- 입력 요소들을 중앙에 배치 -->
            <div class="mb-3 row">
              <label for="postTitle" class="col-md-3 col-form-label">제목</label>
              <div class="col-md-9">
                <input v-model="postData.postTitle" type="text" class="form-control" id="postTitle">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="postCategory" class="col-md-3 col-form-label">카테고리</label>
              <div class="col-md-9">
                <input v-model="postData.postCategory" type="text" class="form-control" id="postCategory">
              </div>
            </div>
            <!-- 다른 입력 요소들도 동일하게 구성 -->
             <div class="mb-3 row">
              <label for="postRegisterDate" class="col-md-3 col-form-label">등록일자</label>
              <div class="col-md-9">
                <input v-model="postData.postRegisterDate" type="text" class="form-control" id="postRegisterDate">
              </div>
            </div>
             <div class="mb-3 row">
              <label for="postWriter" class="col-md-3 col-form-label">작성자</label>
              <div class="col-md-9">
                <input v-model="postData.postWriter" type="text" class="form-control" id="postWriter">
              </div>
            </div>
             <div class="mb-3 row">
              <label for="postContent" class="col-md-3 col-form-label">내용</label>
              <div class="col-md-9">
                <textarea v-model="postData.postContent" class="form-control" id="postContent" rows="5"></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-8 offset-md-2 d-flex justify-content-center">
          <router-link to="/admin/post/list" class="btn btn-lg btn-primary me-3">목록으로</router-link>
  <!-- 저장하기 버튼에 savePost 메서드 연결 -->
          <button type="button" class="btn btn-lg btn-primary" @click="showModal">저장하기</button>
        </div>
      </div>
    </div>
  </div>
   <!-- 모달 -->
    <div v-if="modalVisible" class="modal fade show" tabindex="-1" role="dialog" style="display: block; background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">게시물 등록</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="hideModal"></button>
          </div>
          <div class="modal-body">
            <p>게시물을 등록하시겠습니까?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideModal">취소</button>
            <button type="button" class="btn btn-primary" @click="savePostAndHideModal">등록</button>
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
  name: 'AdminRegister',
  data () {
    return {
      postData: {
        memberId: '',
        postTitle: '', // 제목 입력 필드의 데이터
        postCategory: '',
        postRegisterDate: '', // 내용 입력 필드의 데이터
        postWriter: '', // 내용 입력 필드의 데이터
        postContent: '', // 내용 입력 필드의 데이터
      },
      modalVisible: false, // 모달의 표시 여부
    }
  },
  methods: {
    async savePost() {
      try {
        // FormData 객체 생성
        const formData = new FormData();
        // 입력 데이터 추가
        formData.append('memberId', this.postData.memberId);
        formData.append('postTitle', this.postData.postTitle);
        formData.append('postCategory', this.postData.postCategory);
        formData.append('postRegisterDate', this.postData.postRegisterDate);
        formData.append('postWriter', this.postData.postWriter);
        formData.append('postContent', this.postData.postContent);

        const accessToken = localStorage.getItem('accessToken')

        // API 호출
         const url = `http://localhost:8080/api/v1/posts/post/register/${this.postData.memberId}`;

         const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        // 성공 시 처리
        // 성공 시 alert 메시지 표시
        alert('게시물이 등록되었습니다.');
        console.log('게시물 등록 완료:', response.data);
        // 리스트 페이지로 이동
        this.$router.push('/admin/post/list');
      } catch (error) {
        console.error('게시물 등록 실패:', error);
      }
    },
    showModal() {
      this.modalVisible = true; // 모달 표시
    },
    hideModal() {
      this.modalVisible = false; // 모달 숨김
    },
    savePostAndHideModal() {
      this.savePost(); // 게시물 저장
      this.hideModal(); // 모달 숨김
    },
  }
}
</script>

<style>

  /* textarea 요소를 더 크게 만듭니다 */
  textarea {
  width: 80%; /* 전체 폭을 차지하도록 설정 */
  max-width: 80%; /* 최대 폭을 지정하여 넘치지 않도록 설정 */
  height: 300px; /* 원하는 높이로 조정하세요 */
  resize: vertical; /* 사용자가 크기를 조절할 수 있도록 합니다 */
  padding: 8px;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 5px;
  box-sizing: border-box; /* 패딩과 테두리를 포함하여 요소의 전체 크기를 계산합니다 */
}

  /* 입력 요소들의 폭을 조절합니다 */
input[type="text"] {
  width: 80%; /* 전체 폭을 차지하도록 설정 */
}

</style>
