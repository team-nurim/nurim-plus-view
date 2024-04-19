<template>
    <div class="detail-container">
      <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>{{ errorMessage }}</p>
        <span class="close" @click="closeModal">&times;</span>
      </div>
    </div>
      <h1>{{ community.title}}
      <div style="padding: 10px 0; float: right; margin-right: 30px;">
                  <div class="dropdown">
                    <svg width="5" height="15" id="dropdownMenuButton" xmlns="http://www.w3.org/2000/svg" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="pointer-events: all;">
                      <circle cx="2.5" cy="2.5" r="2" fill="black"/>
                      <circle cx="2.5" cy="7.5" r="2" fill="black"/>
                      <circle cx="2.5" cy="12.5" r="2" fill="black"/>
                    </svg>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="min-width: auto;">
                      <li><a class="dropdown-item" href="#">게시물 수정</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" @click="deleteCommunity">게시물 삭제</a></li>
                    </ul>
                  </div>
                </div>
                </h1>
      <div class="userInfo">
        <i class="fa-regular fa-user" style="margin-left: 5px"></i><span>{{  community.memberNickname }}</span>
        <i class="fa-solid fa-eye" style="margin-left: 10px"></i><span>{{ community.counts }}</span>
        <span class="register-date" style="margin-right: 10px;">작성일:{{formatDate (community.registerDate)}}</span>
      </div>
      <hr>
      <div class="content-container" style="font-size: 17px; text-align: left;">
        <p>{{community.content}}</p>
      </div>
      <hr>
      <input type="text" placeholder="댓글을 입력하세요" class="search-input" style="margin-right: 5px; width: 1000px;">
      <button class="btn btn-primary">등록</button>
      <hr>
      <div class="reply-container">
  <div v-for="(reply, index) in replyList" :key="index" class="replyList">
    <div class="reply-header">
      <div class="reply-info">
        <p class="replyer">{{ reply.replyer }}</p>
        <span class="reply-date">{{ formatDate(reply.replyRegisterDate) }}</span>
      </div>
      <div class="reply-actions">
        <button class="btn btn-sm" @click="editReply(index)"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="btn btn-sm" @click="deleteReply(index)"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
    <div class="reply-content">
      <p class="reply-text">{{ reply.replyText }}</p>
    </div>
  </div>
</div>
</div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'CommunityDetailView',
    props: ['communityId'],
    data() {
      return {
        community: [],
        replyList: [],
        showModal: false,
        errorMessage:''
      };
    },
    mounted() {
      this.axiosCommunityData()
      this.axiosReplyData()
      window.scrollTo(0, 0)
    },
    methods: {
      openModal(){
        this.showModal = true
      },
      closeModal() {
        this.showModal = false
      },
      async axiosCommunityData() {
        try {
          const accessToken = localStorage.getItem('accessToken')
          const response = await axios.get(`http://localhost:8080/api/v1/communityRead/${this.communityId}`,{
          headers: {
            'Authorization': `Bearer ${accessToken}`
        }})
          this.community = response.data;
        } catch (error) {
          console.error('게시물 정보를 불러올 수 없습니다:', error);
        }
      },
      async axiosReplyData () {
        try{
          const accessToken = localStorage.getItem('accessToken')
            const response = await axios.get(`http://localhost:8080/api/v1/community/${this.communityId}/replyRead`,{
          headers: {
            'Authorization': `Bearer ${accessToken}`
        }})
            this.replyList = response.data
        }catch (error) {
            console.error('게시물 아이디에 맞는 댓글 리스트를 불러올 수 없습니다:',error)
        }
      },
      async deleteCommunity () {
        try{
          const accessToken = localStorage.getItem('accessToken')
          if(!accessToken){
            throw new Error('삭제할 권한이 없습니다.')
          }
          const response = await axios.delete(`http://localhost:8080/api/v1/communityDelete/${this.communityId}`,{
          headers: {
            'Authorization': `Bearer ${accessToken}`
        }})
        }catch (error) {
          this.errorMessage = '삭제할 권한이 없습니다.'
          console.error('게시물을 지울 수 없습니다:',error)
          this.openModal()
        }
      }
    }
  };
  </script>
  
  <style>
  /*모달 스타일 */
  .modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 12%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
/* =================전체 컨테이너 스타일============== */
  .detail-container {
    width: 1350px;
    height: 100vh;
    margin-left: auto;
    margin-right: auto;
    /* border: 1px solid #000; */
  }
  /*======================타이틀 스타일================*/
  .detail-container h1{
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }
  /*=======================유저 정보 스타일=============*/
  .userInfo{
    display: flex;
  }
  .register-date {
  margin-left: auto;
}
/*===================게시글 내용========================*/
.content-container p{
  font-family: 'Noto Sans KR', sans-serif;
}
/*댓글 스타일*/
.reply-container {
  margin-top: 20px;
}

.replyList {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.reply-header {
  display: flex;
  justify-content: space-between;
}

.reply-info {
  display: flex;
}

.reply-actions {
  display: flex;
  align-items: center;
}

.replyer {
  font-weight: bold;
}

.reply-date {
  margin-left: 10px;
  color: #666;
}

.reply-actions button {
  margin-left: 5px;
}
.reply-text{
  display: flex;
}


  </style>
  