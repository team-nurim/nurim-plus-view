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
      <textarea class="form-control" id="contentInput" v-model="content" rows="5" placeholder="내용을 입력하세요" style="width: 1000px; height: 500px; margin-left: auto; margin-right: auto;"></textarea>
      <span v-if="!content" style="color: red; margin-left: 10px;">내용을 입력해주세요.</span>
    </div>
    <!-- 취소하기 및 등록하기 버튼 -->
    <div class="row" style="margin-top: 20px;">
      <div class="col">
        <button class="btn btn-secondary" @click="cancel">취소하기</button>
      </div>
      <div class="col">
        <button class="btn btn-primary" @click="register" :disabled="category === '' || !title || !content">등록하기</button>
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
      category: '',
      title: '',
      content: ''
    };
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    async register(communityId) {
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
        'Content-Type': 'application/json' // JSON 형식임을 명시
      }
    });
    const createdCommunityId = response.data;

    console.log('게시물 등록 성공:', response.data);

    this.$router.push({ name: 'CommunityDetailView', params: { communityId: createdCommunityId.communityId } });
} catch (error) {
    console.error('게시물 등록 실패:', error);
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
