<template>
  <main class="mt-5">
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
  <!-- 저장하기 버튼에 savePost 메서드 연결 -->
          <button type="button" class="btn btn-lg btn-primary" @click="savePost">저장하기</button>
        </div>
      </div>
    </div>
  </main>
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
      imageFile: null // 이미지 파일을 저장할 변수
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

        // 이미지 파일 추가
        if (this.imageFile) {
          formData.append('image', this.imageFile);
        }

        const tokenValue = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTM0Mjc1NjUsImlhdCI6MTcxMzM0MTE2NSwibWVtYmVyRW1haWwiOiIxMjMifQ.xLszpRcdF7uUqzctsRqqqc2kulrBdGNR7O2k_ieW6x0';


        // API 호출
        // URL 문자열 템플릿으로 변경하고 adminId 변수를 넣어줌
         const url = `http://localhost:8080/api/v1/posts/post/register/${this.postData.memberId}`;

         const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenValue}`
          }
        });
        
        // 성공 시 처리
        console.log('게시물 등록 완료:', response.data);
      } catch (error) {
        console.error('게시물 등록 실패:', error);
      }
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
  /* 썸네일 이미지와 파일 업로드 요소들의 스타일링 */
  input[type="file"] {
    width: 85%; /* 전체 폭을 차지하도록 설정 */
    padding: 8px;
    background-color: #f8f9fa;
    border: 1px solid #ced4da;
    border-radius: 5px;
    box-sizing: border-box; /* 패딩과 테두리를 포함하여 요소의 전체 크기를 계산합니다 */
  }

  /* 파일 업로드 요소 스타일링 */
  input[type="file"] {
    padding: 8px;
    background-color: #f8f9fa;
    border: 1px solid #ced4da;
    border-radius: 5px;
  }

  /* textarea 요소를 더 크게 만듭니다 */
  textarea {
  width: 85%; /* 전체 폭을 차지하도록 설정 */
  max-width: 85%; /* 최대 폭을 지정하여 넘치지 않도록 설정 */
  height: 150px; /* 원하는 높이로 조정하세요 */
  resize: vertical; /* 사용자가 크기를 조절할 수 있도록 합니다 */
  padding: 8px;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 5px;
  box-sizing: border-box; /* 패딩과 테두리를 포함하여 요소의 전체 크기를 계산합니다 */
}

  /* 입력 요소들의 폭을 조절합니다 */
input[type="text"] {
  width: 85%; /* 전체 폭을 차지하도록 설정 */
}
</style>
