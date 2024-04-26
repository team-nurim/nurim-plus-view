<template>
  <div class="register-container">
    <!-- 제목, 카테고리 입력 필드 -->
    <div class="form-group">
      <div class="col-md-1">
        <select id="categorySelect" class="form-select" name="category" style="margin-left: 175px;" v-model="category">
          <option disabled value="">카테고리</option>
          <option value="보육">보육</option>
          <option value="출산">출산</option>
          <option value="주거">주거</option>
          <option value="장례">장례</option>
        </select>
      </div>
      <label for="titleInput">제목</label>
      <input type="text" class="form-control" id="titleInput" v-model="title" placeholder="제목을 입력하세요" style="width: 1000px; margin-left: auto; margin-right: auto;">
      <span v-if="!title" style="color: red; margin-left: 10px;">제목을 입력해주세요.</span>
    </div>

    <!-- 내용 입력 필드 -->
    <div class="form-group">
      <label for="contentInput">내용</label>
      <textarea class="form-control" id="contentInput" v-model="content" rows="5" placeholder="내용을 입력하세요" style="width: 1000px; height: 250px; margin-left: auto; margin-right: auto;"></textarea>
      <span v-if="!content" style="color: red; margin-left: 10px;">내용을 입력해주세요.</span>
    </div>
    <!-- 이미지 업로드를 위한 input 요소 추가 -->
    <div class="mb-3 row justify-content-start">
    <label for="image" class="col-md-3 col-form-label text-md-end">파일첨부</label>
    <div class="col-md-9">
        <label for="image" class="fa-solid fa-camera" style="cursor: pointer; float: right;">파일첨부</label>
        <input type="file" class="form-control" id="image" accept="image/*" @change="handleImageUpload" style="display: none;">
    </div>
</div>
    <!-- 이미지 미리보기 -->
<div v-if="previewImages.length > 0" class="row">
  <div class="col-md-8 offset-md-2">
    <h3 class="text-center mb-3">미리보기</h3>
    <div class="image-list d-flex flex-wrap justify-content-start"> <!-- 이미지를 가로로 배열하기 위해 flex 속성을 이용합니다 -->
      <div v-for="(previewImage, index) in previewImages" :key="index" class="image-item mx-2 my-2" style="max-width: 200px;"> <!-- 각 이미지와 삭제 버튼을 감싸는 div 요소에 margin을 조정하여 간격을 조절합니다 -->
        <img :src="previewImage" alt="이미지" class="img-fluid mr-2" loading="lazy" style="max-width: 150px; max-height: 150px;"> <!-- 이미지 사이에 간격을 조절합니다 -->
        <button class="btn btn-sm delete-image-btn" @click="deleteImage(index)"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  </div>
</div>

    <!-- 취소하기 및 등록하기 버튼 -->
    <div class="row" style="margin-top: 20px;">
      <div class="col">
        <button class="btn btn-secondary" @click="cancel">취소하기</button>
      </div>
      <div class="col">
        <button class="btn btn-primary" @click="createBoard" :disabled="category === '' || !title || !content">등록하기</button>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import axios from 'axios';

export default {
  name: 'CommunityCreate',
  data() {
    return {
      category: '',
      title: '',
      content: '',
      imageFiles: [], // 이미지 저장하는 배열
      previewImages: [] // 이미지 미리보기를 위한 배열 선언
    };
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    async register() {
      if (this.category === '' || !this.title || !this.content) {
        alert('카테고리, 제목, 내용을 모두 입력해주세요.');
        return;
      }
      try {
        const accessToken = localStorage.getItem('accessToken');
        const url = `http://localhost:8080/api/v1/communityCreate/${accessToken}`;
        const requestData = {
          category: this.category,
          title: this.title,
          content: this.content
        };
        const response = await axios.post(url, requestData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        return response.data;
      } catch (error) {
        console.error('게시물 등록 실패:', error);
        throw error;
      }
    },
    handleImageUpload(event) {
  const newFiles = Array.from(event.target.files);
  // 기존 이미지 배열에 새로운 파일을 추가합니다.
  this.imageFiles.push(...newFiles);
  // 각 파일에 대해 미리보기 URL을 생성하고 이미지 미리보기 배열에 추가합니다.
  for (let i = 0; i < newFiles.length; i++) {
    const imageUrl = URL.createObjectURL(newFiles[i]);
    this.previewImages.push(imageUrl);
  }
},

    async axiosUploadImages(communityId) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const url = `http://localhost:8080/api/v1/communityImages/upload/${communityId}`;
        // 이미지 파일 배열을 순회하며 업로드
        for (let i = 0; i < this.imageFiles.length; i++) {
          const formData = new FormData();
          formData.append('files', this.imageFiles[i]);
          const response = await axios.post(url, formData, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('이미지 업로드 성공:', response.data);
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        throw error;
      }
    },
    cancel() {
      window.history.back();
    },
    async createBoard() {
      try {
        const registrationResponse = await this.register();
        const communityId = registrationResponse.communityId;
        // 이미지 파일이 있는 경우에만 업로드하도록 분기 처리
        if (this.imageFiles.length > 0) {
          await this.axiosUploadImages(communityId);
        }
        this.$router.push({ name: 'CommunityDetailView', params: { communityId: communityId } });
      } catch (error) {
        console.error('게시물 등록 및 이미지 업로드 실패:', error);
      }
    },
    deleteImage(index) {
      this.previewImages.splice(index, 1)

      this.imageFiles.splice(index, 1)
    }
  }
}
</script>

<style>
.register-container {
  width: 1350px;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
}
.form-control {
  width: 300px;
  height: 50px;
  border: 2px solid black;
}
</style>
