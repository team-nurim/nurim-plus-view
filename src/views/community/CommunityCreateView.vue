<template>
    <div class="register-container">
      <!-- 제목, 카테고리 입력 필드 -->
      <div class="form-group">
        <div class="col-md-1">
          <select id="categorySelect" class="form-select" name="category" style="margin-left: 175px;" v-model="selectedCategory">
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
        <textarea class="form-control" id="contentInput" v-model="content" rows="5" placeholder="내용을 입력하세요" style="width: 1000px; height: 500px; margin-left: auto; margin-right: auto;"></textarea>
        <span v-if="!content" style="color: red; margin-left: 10px;">내용을 입력해주세요.</span>
      </div>
  
      <!-- 회원 ID 입력 필드 -->
      <div class="form-group">
        <label for="memberIdInput">회원 ID</label>
        <input type="text" class="form-control" id="memberIdInput" v-model="memberId" placeholder="회원 ID를 입력하세요" style="width: 300px; margin-left: auto; margin-right: auto;">
      </div>
  
      <!-- 취소하기 및 등록하기 버튼 -->
      <div class="row" style="margin-top: 20px;">
        <div class="col">
          <button class="btn btn-secondary" @click="cancel">취소하기</button>
        </div>
        <div class="col">
          <button class="btn btn-primary" @click="register" :disabled="selectedCategory === '' || !title || !content">등록하기</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CommunityCreate',
    data() {
      return {
        selectedCategory: '',
        title: '',
        content: '',
        memberId: ''
      };
    },
    mounted () {
        window.scrollTo(0, 0)
    },
    methods: {
      async register() {
        if (this.selectedCategory === '' || !this.title || !this.content) {
          alert('카테고리, 제목, 내용을 모두 입력해주세요.');
          return;
        }
  
        try {
          const response = await axios.post(`http://localhost:8080/api/v1/communityCreate/${this.memberId}`);
        } catch (error) {
          console.error('게시물 등록불가:', error);
        }
      },
      cancel() {
        window.history.back();
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
  