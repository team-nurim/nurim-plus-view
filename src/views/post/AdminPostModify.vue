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
                <select v-model="postData.postCategory" class="form-select" id="postCategory">
                  <!-- 현재 선택된 카테고리를 먼저 표시합니다 -->
                  <option :value="postData.postCategory">{{ postData.postCategory }}</option>
                  <!-- 나머지 카테고리를 반복하여 표시합니다 -->
                  <option v-for="category in filteredCategories" :key="category.name" :value="category.name">{{ category.name }}</option>
                </select>
              </div>
            </div>

            <div class="mb-3 row">
              <label for="postRegisterDate" class="col-md-3 col-form-label">등록일자</label>
              <div class="col-md-9">
                <input v-model="postData.postRegisterDate" type="date" class="form-control" id="postRegisterDate">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="postWriter" class="col-md-3 col-form-label">작성자</label>
              <div class="col-md-9">
                <input v-model="postData.postWriter" type="text1" class="form-control" id="postWriter" readonly>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="postContent" class="col-md-3 col-form-label">내용</label>
              <div class="col-md-9">
                <textarea v-model="postData.postContent" class="form-control" id="postContent" style="height: 200px;"></textarea>
              </div>
            </div>
            <!-- 이미지 업로드를 위한 input 요소 추가 -->
            <div class="mb-3 row">
              <label for="image" class="col-md-3 col-form-label">이미지 업로드</label>
              <div class="col-md-9">
                <input type="file" class="form-control" id="image" accept="image/*" multiple @change="handleImageUpload">
              </div>
            </div>
            <!-- 이미지 목록 표시 -->
            <div class="row">
              <div class="col-md-12">
                <div v-if="postData.postImages && postData.postImages.length > 0" class="mb-3">
                  <div class="row mb-3">
                  <label class="col-md-3 col-form-label" style="font-size: 18px; font-weight: bold;">이미지 목록</label>
                  </div>
                    <div class="image-list d-flex flex-wrap justify-content-start align-items-center">
                      <div v-for="(image, index) in postData.postImages" :key="index" class="image-item mx-2 mb-2">
                      <!-- 이미지가 유효한 URL인 경우에만 출력 -->
                      <img v-if="isImageUrl(image)" :src="image" alt="이미지" class="img-fluid" loading="lazy" style="max-width: 200px; max-height: 200px;">
                      <!-- 이미지 삭제 버튼 -->
                      <button class="btn btn-sm" @click="deleteImage(postData.postImageIds[index], $event)"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 이미지 미리보기 -->
            <div class="row">
              <div class="col-md-12">
            <div v-if="previewImages.length > 0" class="mb-3">
              <div class="row mb-3">
              <label class="col-md-3 col-form-label" style="font-size: 18px; font-weight: bold;">추가한 이미지 목록</label>
            </div>
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
      <div class="row mt-4 mb-4">
        <div class="col-md-8 offset-md-2 d-flex justify-content-center">
          <router-link to="/admin/post/list" class="btn btn-lg btn-primary me-3">목록으로</router-link>
          <!-- 수정하기 버튼에 savePost 메서드 연결 -->
          <button type="button" class="btn btn-lg btn-primary me-3" @click="showModifyModal">수정완료</button>
          <button type="button" class="btn btn-lg btn-danger" @click="showDeleteModal">삭제하기</button>
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
    <!-- 삭제 이미지 모달 -->
<div v-if="deleteModalImageVisible" class="modal fade show" tabindex="-1" role="dialog" style="display: block; background-color: rgba(0, 0, 0, 0.5);">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">이미지 삭제 확인</h5>
        <button type="button" class="btn-close" aria-label="Close" @click="hideDeleteImageModal"></button>
      </div>
      <div class="modal-body">
        <p>이미지를 삭제하시겠습니까?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="hideDeleteImageModal">취소</button>
        <button type="button" class="btn btn-danger confirm-delete-btn" @click="confirmDeleteImage">삭제</button>
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
        postImages: [] ,// postImages 속성 추가
        postImageIds: [],
      },
      categories: [ // Update the variable name to 'categories'
      { id: 1, name: '보육' },
      { id: 2, name: '출산' },
      { id: 3, name: '주거' },
      { id: 4, name: '장례' }
    ],
      imageFile: [],
      previewImages: [],
      modifyModalVisible: false, // 모달의 표시 여부
      deleteModalVisible : false,
      deleteModalImageVisible : false,
      // deletedImages: [], // 삭제된 이미지를 저장할 배열 추가
    }
  },
  computed: {
  filteredCategories() {
    // 현재 선택된 카테고리와 중복되지 않은 카테고리만 필터링하여 반환합니다.
    return this.categories.filter(category => category.name !== this.postData.postCategory);
  }
},

  mounted() {
    this.fetchData(this.postId);
  },

  methods: {
    async fetchData(postId) {
      try {
        const accessToken = localStorage.getItem('accessToken')

        const url = `http://localhost:8080/api/v1/posts/post/read/${postId}`;

        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }});

        const responseData = response.data;
        console.log(responseData.postImages);
        console.log(responseData.postImageIds);

        // API 응답에서 필요한 데이터를 추출하여 postData에 할당합니다.
        this.postData.postTitle = responseData.postTitle;
        this.postData.postCategory = responseData.postCategory;
        this.postData.postRegisterDate = responseData.postRegisterDate;
        this.postData.postWriter = responseData.postWriter;
        this.postData.postContent = responseData.postContent;
        this.postData.postImages = responseData.postImages;
        this.postData.postImageIds = responseData.postImageIds;

      } catch (err) {
        console.error('데이터를 불러올 수 없습니다.', err);
      }
    },

    async modifyPost() {
      try {
        const formData = new FormData();
        // 이미지가 삭제된 후의 postImages를 formData에 추가
        formData.append('postImages', JSON.stringify(this.postData.postImages));
        formData.append('postTitle', this.postData.postTitle);
        formData.append('postCategory', this.postData.postCategory);
        formData.append('postRegisterDate', this.postData.postRegisterDate);
        formData.append('postWriter', this.postData.postWriter);
        formData.append('postContent', this.postData.postContent);

        // if (this.imageFile) {
        //   formData.append('image', this.imageFile);
        // }

        const accessToken = localStorage.getItem('accessToken')
        const url = `http://localhost:8080/api/v1/posts/post/update/${this.postId}`;

        const response = await axios.put(url, formData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
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
        const accessToken = localStorage.getItem('accessToken')

        const url = `http://localhost:8080/api/v1/posts/post/${this.postId}`;
        const response = await axios.delete(url, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
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
    if (this.imageFile && this.imageFile.length > 0) { // 이미지를 등록한 경우에만 업로드 수행
      this.uploadImage(this.postId); // 이미지 저장
    }
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
    showDeleteImageModal() {  // 이미지 삭제 모달
    this.deleteModalImageVisible = true;
    },
    confirmDeleteImage(){
    this.deleteModalImageVisible = false;
    },
    hideDeleteImageModal(){
    this.deleteModalImageVisible = false;
    },
    handleImageUpload(event) {
      // 선택된 파일이 있는지 확인
    if (event.target.files && event.target.files.length > 0) {
      // 선택된 파일을 배열로 가져옴
      const files = event.target.files;
      // 각 파일을 FormData에 추가
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
    
      async uploadImage(postId) {
        const formData = new FormData();
        for (let i = 0; i < this.imageFile.length; i++) {
          formData.append('files', this.imageFile[i]);
        }
        // formData.append('postId', this.postId); // 수정된 부분

        try {
          console.log('Uploaded image:', this.imageFile);
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
    isImageUrl(url) {
    if (typeof url !== 'string') return false; // URL이 문자열이 아닌 경우 false 반환
    return url.startsWith("http") && (url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".gif"));
  },

 async deleteImage(postImageId, event) {
  try {
    event.preventDefault(); // 기본 동작 방지

    // 모달을 띄웁니다.
    this.showDeleteImageModal();

    // 모달에서 "삭제" 버튼을 누를 때 이미지를 삭제합니다.
    const confirmDelete = await new Promise((resolve, reject) => {
      this.$nextTick(() => {
        const confirmButton = document.querySelector('.btn-danger.confirm-delete-btn');
        confirmButton.addEventListener('click', () => resolve(true));
      });
    });

    if (confirmDelete) {
      // postImageId를 사용하여 이미지를 삭제합니다.
      const accessToken = localStorage.getItem('accessToken');

      const url = `http://localhost:8080/api/v1/posts/post/delete/images/${postImageId}`;
      
      const response = await axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      // 성공적으로 이미지가 삭제되면 화면에서도 해당 이미지를 제거합니다.
      const index = this.postData.postImageIds.indexOf(postImageId);
      if (index !== -1) {
        this.postData.postImageIds.splice(index, 1);
        this.postData.postImages.splice(index, 1);
      }

      console.log('이미지 삭제 완료:', postImageId);
      alert('이미지가 성공적으로 삭제되었습니다.');
      
      return response;
    }
  } catch (error) {
    console.error('이미지 삭제에 실패했습니다:', error);
    throw error;
  }
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
input[type="date"] {
  width: 80%;
}
select.form-select {
  width: 80%;
}

</style>
