<template>
  <main class="mt-2">
     <div class="containerpostread">
       <div class="row mb-3">
         <div class="col-md-7">
           <h2 class="text">{{ postRead.postTitle }}</h2>
         </div>
         <div class="col-md-5">
          <router-link :to="`/admin/post/modify/${postRead.postId}`" class="btn btn-lg btn-primary me-3">수정하기</router-link>
         </div>
       </div>
       <div class="row">
         <div class="col-md-8 offset-md-2">
           <form>
             <!-- 입력 요소들을 중앙에 배치 -->
             <div class="mb-3 row border">
               <label for="postTitle" class="col-md-3 col-form-label border">제목</label>
               <div class="col-md-9 border">
                 <p class="form-control-plaintext" style="font-size: 18px; font-weight: bold;">{{ postRead.postTitle }}</p>
               </div>
             </div>
             <div class="mb-3 row border">
               <label for="postTitle" class="col-md-3 col-form-label border">카테고리</label>
               <div class="col-md-9 border">
                 <p class="form-control-plaintext" style="font-size: 18px; font-weight: bold;">{{ postRead.postCategory }}</p>
               </div>
             </div>
             <!-- 다른 입력 요소들도 동일하게 구성 -->
             <div class="mb-3 row border">
               <label for="postRegisterDate" class="col-md-3 col-form-label border">등록일자</label>
               <div class="col-md-9 border">
                 <p class="form-control-plaintext" style="font-size: 18px; font-weight: bold;">{{ postRead.postRegisterDate }}</p>
               </div>
             </div>
             <div class="mb-3 row border">
               <label for="postWriter" class="col-md-3 col-form-label border">작성자</label>
               <div class="col-md-9 border">
                 <p class="form-control-plaintext" style="font-size: 18px; font-weight: bold;">{{ postRead.postWriter }}</p>
               </div>
             </div>
             <div class="mb-3 row border">
               <label for="postContent" class="col-md-3 col-form-label border">내용</label>
               <div class="col-md-9 border">
                 <p class="form-control-plaintext" style="font-size: 18px; font-weight: bold;">{{ postRead.postContent }}</p>
               </div>
             </div>
             <!-- 이미지 목록 표시 -->
             <div class="col-md-12">
               <div v-if="postRead.postImages && postRead.postImages.length > 0" class="mb-3 row">
                 <div v-for="(image, index) in postRead.postImages" :key="index" class="image-thumbnail">
                   <!-- 이미지가 유효한 URL인 경우에만 출력 -->
                   <img v-if="isImageUrl(image)" :src="image" alt="이미지" class="image-thumbnail" loading="lazy" style="max-width: 100%; height: auto;">
                 </div>
               </div>
             </div>
           </form>
         </div>
       </div>
     </div>
     <div class="row mt-4 mb-4">
       <div class="col-md-8 offset-md-2 d-flex justify-content-center">
         <router-link to="/admin/post/list" class="btn btn-lg btn-primary me-3">목록으로</router-link>
         <router-link :to="`/admin/post/modify/${postRead.postId}`" class="btn btn-lg btn-primary me-3">수정하기</router-link>
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
       // this.axiosAdminPostImage();
     },
     methods: {
       async axiosAdminPostRead(postId) {
         try {
           const accessToken = localStorage.getItem('accessToken')
 
           const response = await axios.get(`http://localhost:8080/api/v1/posts/post/read/${postId}`, {
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${accessToken}`
           }});
           this.postRead = response.data;
           console.log('이미지 불로오기 성공:', this.postRead.postImages);
         } catch (error) {
            // this.$store.commit('setLoggedIn', this.loggedIn)
            // this.$router.push('/admin/login');
            console.error('Failed to fetch post details:', error);
         }
       },
   isImageUrl(url) {
     if (typeof url !== 'string') return false; // URL이 문자열이 아닌 경우 false 반환
     return url.startsWith("http") && (url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".gif"));
   }
     },
   };
 </script>
 
 <style scoped>
   /* 컨테이너 스타일링 */
   .containerpostread {
    max-width: 1400px; /* 최대 너비 설정 */
    margin: 0 auto; /* 가운데 정렬을 위해 margin 추가 */
     padding: 50px;
     border-radius: 15px;
     background-color: #f8f9fa;
     box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1); /* 그림자 효과 수정 */
   }
 
   /* 제목 스타일링 */
   h2 {
     color: rgb(91, 93, 95);
     font-weight: bold;
     text-align: center;
     text-transform: uppercase;
     margin-bottom: 30px; /* 하단 여백 조정 */
   }
 
   /* 입력 요소 스타일링 */
   .border {
     border: 2px solid #0056b3;
     border-radius: 10px;
     padding: 20px;
     background-color: #ffffff;
   }
 
   /* 버튼 스타일링 */
   .btn-primary {
     background-color: #0056b3;
     border-color: #0056b3;
     border-radius: 10px;
     padding: 15px 30px; /* 내부 여백 수정 */
     font-size: 1.2rem;
   }
 
   /* 버튼 호버 효과 */
   .btn-primary:hover {
     background-color: #003f7f; /* 호버 시 배경색 변경 */
     transform: scale(1.05); /* 조금 확대되는 효과 추가 */
   }
 
   .image-list {
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
 }
 
 .image-item {
   margin: 10px;
 }
 
 .image-item img {
   max-width: 200px;
   max-height: 200px;
 }
 </style>
 
 