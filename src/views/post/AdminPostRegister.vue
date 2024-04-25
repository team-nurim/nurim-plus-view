<template>
  <div class="mt-5">
    <div class="container">
      <h2 class="text-center mb-5">정책정보 등록</h2>
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <form>
            <!-- <div class="mb-3 row">
              <label for="memberId" class="col-md-3 col-form-label">memberId</label>
              <div class="col-md-9">
                <input v-model="postData.memberId" type="text" class="form-control" id="memberId">
              </div>
            </div> -->
            <!-- 입력 요소들을 중앙에 배치 -->
            <div class="mb-3 row">
              <label for="postTitle" class="col-md-3 col-form-label">제목</label>
              <div class="col-md-9">
                <input v-model="postData.postTitle" type="textreg" class="form-control" id="postTitle">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="postCategory" class="col-md-3 col-form-label">카테고리</label>
              <div class="col-md-9">
                <input v-model="postData.postCategory" type="textreg" class="form-control" id="postCategory">
              </div>
            </div>
            <!-- 다른 입력 요소들도 동일하게 구성 -->
             <div class="mb-3 row">
              <label for="postRegisterDate" class="col-md-3 col-form-label">등록일자</label>
              <div class="col-md-9">
                <input v-model="postData.postRegisterDate" type="date" class="form-control" id="postRegisterDate">
              </div>
            </div>
             <div class="mb-3 row">
              <label for="postWriter" class="col-md-3 col-form-label">작성자</label>
              <div class="col-md-9">
                <input v-model="postData.postWriter" type="textreg" class="form-control" id="postWriter" readonly>
              </div>
            </div>
             <div class="mb-3 row">
              <label for="postContent" class="col-md-3 col-form-label">내용</label>
              <div class="col-md-9">
                <textarea v-model="postData.postContent" class="form-control" id="postContent" style="height: 390px;"></textarea>
              </div>
            </div>
            <!-- 이미지 업로드를 위한 input 요소 추가 -->
            <div class="mb-3 row">
              <label for="image" class="col-md-3 col-form-label">이미지 업로드</label>
              <div class="col-md-9">
                <input type="file" class="form-control" id="image" accept="image/*" multiple @change="handleImageUpload">
              </div>
            </div>
            <!-- 이미지 미리보기 -->
            <div class="row mb-4">
              <div class="col-md-12">
            <div v-if="previewImages.length > 0" class="mb-3">
              <label class="col-md-3 mb-3 col-form-label" style="font-size: 18px; font-weight: bold;">이미지 미리보기</label>
              <div class="image-list d-flex flex-wrap justify-content-start align-items-center">
                <div v-for="(previewImage, index) in previewImages" :key="index" class="image-item mx-2 mb-2">
                    <img :src="previewImage" alt="미리보기 이미지" class="img-fluid" loading="lazy" style="max-width: 200px; max-height: 200px;">
                    <button type="button" class="btn btn-sm" @click="removePreviewImage(index)"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row mb-5">
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
        // memberId: '',
        postTitle: '', // 제목 입력 필드의 데이터
        postCategory: '',
        postRegisterDate: '', // 내용 입력 필드의 데이터
        postWriter: '', // 내용 입력 필드의 데이터
        postContent: '', // 내용 입력 필드의 데이터
        postId:'',
      },
      imageFile: [],
      previewImages: [], // 이미지 파일들의 미리보기 URL을 저장할 배열
      modalVisible: false, // 모달의 표시 여부
    }
  },
  mounted() {
    this.setPostWriter(); // 컴포넌트가 마운트될 때 작성자 정보 설정
  },
  methods: {
    setPostWriter() {
      const adminNickname = localStorage.getItem('getLoggedIn'); // 로컬 스토리지에서 관리자 닉네임 가져오기
      if (adminNickname) {
        this.postData.postWriter = adminNickname; // 작성자 정보 설정
      } else {
        // 닉네임이 없으면 기본 값으로 설정
        this.postData.postWriter = '관리자'; 
      }
    },
    async savePost() {
      try {
        // FormData 객체 생성
        const formData = new FormData();
        // 입력 데이터 추가
        // formData.append('memberId', this.postData.memberId);
        formData.append('postTitle', this.postData.postTitle);
        formData.append('postCategory', this.postData.postCategory);
        formData.append('postRegisterDate', this.postData.postRegisterDate);
        formData.append('postWriter', this.postData.postWriter);
        formData.append('postContent', this.postData.postContent);

        const accessToken = localStorage.getItem('accessToken')

        // API 호출
         const url = `http://localhost:8080/api/v1/posts/post/register/${accessToken}`;

         const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${accessToken}`
          }
        });
        return response.data; // 게시물 정보 반환
        
      } catch (error) {
        console.error('게시물 등록 실패:', error);
      }
    },
     async uploadImage(postId) {
      const formData = new FormData();
      // 이미지 파일들의 배열을 FormData에 추가
      for (let i = 0; i < this.imageFile.length; i++) {
        formData.append('files', this.imageFile[i]);
      }
      formData.append('postId', postId); // 수정된 부분

      try {
        console.log('Uploaded image:', this.imageFile);
        console.log('postId 왔는지 확인 : ', postId);
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.post(`http://localhost:8080/api/v1/posts/post/upload/${postId}`, formData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        // this.imageFile = response.data.uuid;
      } catch (error) {
        console.log('업로드 실패 이유:', this.imageFile)
        console.error('이미지 업로드 실패:', error);
      }
    },
    
    handleImageUpload(event) {
  // 파일 선택 창이 열렸을 때의 파일 개수를 저장합니다.
  const initialFileCount = this.imageFile.length;

  // 선택된 파일이 있는지 확인
  if (event.target.files && event.target.files.length > 0) {
    // 선택된 파일을 배열로 가져옴
    const files = event.target.files;
    // 각 파일을 FormData에 추가하고 미리보기 배열에 추가
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // 이미지 파일을 미리보기 배열에 추가
      this.imageFile.push(file);
      this.previewImages.push(URL.createObjectURL(file));
    }
    // 인풋 요소에 남은 이미지들을 설정
    const inputElement = document.getElementById('image');
    const combinedImages = [...this.imageFile]; // 새로 업로드한 이미지만 있는 배열로 복사
    inputElement.value = ''; // 인풋 요소의 값 초기화

    // 기존 이미지와 새로 업로드한 이미지를 모두 포함한 파일 리스트를 만듭니다.
    const fileList = new DataTransfer();
    combinedImages.forEach(file => {
      fileList.items.add(file); // 각 파일을 FileList에 추가
    });
    inputElement.files = fileList.files; // FileList를 인풋 요소의 files 속성에 설정
    this.$forceUpdate(); // 컴포넌트 강제 업데이트
  } else {
    // 파일 선택 창에서 취소를 눌렀을 때의 로직을 수행합니다.
    // 이전에 선택한 파일들이 있는지 확인하고, 있으면 초기화하지 않습니다.
    if (initialFileCount === 0) {
      // 이전에 선택한 파일이 없으면 선택한 파일 없음으로 초기화합니다.
      this.imageFile = [];
      this.previewImages = [];
    }
  }
},
    removePreviewImage(index) {
      // 미리보기 이미지를 삭제하면 실행될 로직
      this.imageFile.splice(index, 1); // 이미지 파일 배열에서 삭제
      this.previewImages.splice(index, 1); // 미리보기 배열에서 삭제
      // 인풋 요소에 남은 이미지들을 설정
      const inputElement = document.getElementById('image');
      const remainingImages = this.imageFile.map(file => file); // 파일 배열을 복사하여 사용
      inputElement.value = ''; // 인풋 요소의 값 초기화

      // FileList 객체 생성
      const fileList = new DataTransfer();
      remainingImages.forEach(file => {
      fileList.items.add(file); // 각 파일을 FileList에 추가
      });
      inputElement.files = fileList.files; // FileList를 인풋 요소의 files 속성에 설정
      this.$forceUpdate(); // 컴포넌트 강제 업데이트
    },

    showModal() {
      this.modalVisible = true; // 모달 표시
    },
    hideModal() {
      this.modalVisible = false; // 모달 숨김
    },
   async savePostAndHideModal() {
      try {
        // 필수 입력값 확인
    if (!this.postData.postTitle || !this.postData.postCategory || !this.postData.postRegisterDate || !this.postData.postContent) {
      alert('모든 필수 입력값을 입력해주세요.');
      this.hideModal();
      return; // 필수 입력값이 비어있으면 함수 종료
    }
        const registerResponse = await this.savePost();
        const postId = registerResponse.postId;

        await this.uploadImage(postId);
        this.$router.push({ name: 'AdminPostRead', params: { postId: postId } });
        // 성공 시 처리
        // 성공 시 alert 메시지 표시
        alert('게시물이 등록되었습니다.');
        console.log('게시물 등록 완료:', response.data);
        // console.log('token :', accessToken)
        this.hideModal();
        // 리스트 페이지로 이동
        // this.$router.push('/admin/post/list');
      } catch(error) {
        console.error('이미지 업로드 실패 이유:', error);
      }
    }
  }
}
</script>

<style>
/* textarea 요소를 더 크게 만듭니다 */
textarea {
  width: 100%;
  resize: vertical; /* 사용자가 크기를 조절할 수 있도록 합니다 */
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 0.3rem;
  box-sizing: border-box; /* 패딩과 테두리를 포함하여 요소의 전체 크기를 계산합니다 */
}

/* ============푸터 디자인===================== */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
