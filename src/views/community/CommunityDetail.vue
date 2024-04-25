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
                      <li><a class="dropdown-item" @click="modifybutton(community)">게시물 수정</a></li>
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
        <div v-if="community.communityImages && community.communityImages.length > 0">
        <div v-for="(image, index) in community.communityImages" :key="index">
            <img :src="image" alt="Community Image">
        </div>
    </div>
    <p>{{community.content}}</p>
  <div class="text-center">
  <button class="btn" style="border:1px solid #333; border-radius:1.2rem; padding: 0.3rem 1rem;" :class="liked ? 'liked' : ''" @click="toggleLike(community)">
    <i v-if="liked" class="fa-solid fa-heart"></i> <!-- 좋아요가 됐을 때 -->
    <i v-else class="fa-regular fa-heart"></i> <!-- 좋아요가 아직 안 됐을 때 -->
    {{ community.recommend }}
  </button>
</div>
      </div>
      <hr>
      <input type="text"  v-model="newReply" placeholder="댓글을 입력하세요" class="search-input" style="margin-right: 5px; width: 1000px;" @keyup.enter="submitReply">
      <button class="btn btn-primary" @click="submitReply">등록</button>
      <hr>
      <div class="reply-container">
  <div v-for="(reply, index) in replyList" :key="index" class="replyList">
    <div class="reply-header">
      <div class="reply-info">
        <p class="replyer">{{ reply.memberNickname }}</p>
        <span class="reply-date">{{ formatDate(reply.replyRegisterDate) }}</span>
      </div>
      <div class="reply-actions">
        <button class="btn btn-sm" @click="toggleEditMode(reply)"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="btn btn-sm" @click="deleteReply(reply.replyId)"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
    <div class="reply-content">
      <template v-if="!reply.editMode">
      <p class="reply-text">{{ reply.replyText }}</p>
      </template>
      <template v-else>
        <input type="text" v-model="reply.editedText" rows="3" cols="50" style="width: 93.3%; float: left; border: none; outline: none; border-bottom: 1px solid #ccc;" >
      <button class="btn btn-sm" @click="saveEdit(reply)">수정</button>
      <button class="btn btn-sm" @click="cancelEdit(reply)">취소</button>
    </template>
    </div>
  </div>
</div>
</div>
  </template>
  
  <script>
import axios from 'axios';
import { TrackOpTypes } from 'vue';
  export default {
    name: 'CommunityDetailView',
    props: ['communityId'],
    data() {
      return {
        community: [],
        replyList: [],
        showModal: false,
        errorMessage:'',
        newReply:'',
        showEditModal: false,
        editedReplyText: '',
        editingReplyIndex: null,
        liked: false
      };
    },
    mounted() {
      this.axiosCommunityData()
      this.axiosReplyData()
      window.scrollTo(0, 0)
      this.isLiked()
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
          const response = await axios.delete(`http://localhost:8080/api/v1/communityDelete/${this.communityId}/${accessToken}`,{
          headers: {
            'Authorization': `Bearer ${accessToken}`
        }})
        this.$router.push("/community")
        }catch (error) {
          this.errorMessage = '작성자만 삭제할 수 있습니다.'
          alert(this.errorMessage)
        }
      },
      async submitReply() {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        `http://localhost:8080/api/v1/replyCreate/${this.communityId}/${accessToken}`,
        { replyText: this.newReply },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('댓글 등록 성공:', response.data);
      this.axiosReplyData();
      this.newReply = '';
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    }
  },
  async deleteReply(replyId){
    try{
      const accessToken = localStorage.getItem('accessToken')
      const response = await axios.delete(
        `http://localhost:8080/api/v1/replyDelete/${this.communityId}/${replyId}/${accessToken}`,{
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }})
        this.axiosReplyData();
    }catch (error){
      console.error('댓글 삭제 실패',error)
      this.errorMessage = '댓글 작성자만 삭제할 수 있습니다.'
      alert(this.errorMessage)
    }
  },
  toggleEditMode(reply){
    const currentUserEmail = localStorage.getItem('memberEmail')
    if(reply.memberEmail === currentUserEmail){
    reply.editMode = !reply.editMode

    if(reply.editMode){
      reply.editedReplyText = reply.replyText
    }
    }else{
      alert('댓글 작성자만 수정할 수 있습니다.')
    }
  },
  async saveEdit(reply) {
    try {
      const accessToken = localStorage.getItem('accessToken');
      // 수정된 내용을 서버에 업데이트합니다.
      const response = await axios.put(
        `http://localhost:8080/api/v1/replyUpdate/${reply.replyId}/${accessToken}`,
        { replyText: reply.editedText },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('댓글 수정 성공:', response.data);
      this.successMessage = '댓글 수정 성공'
      alert(this.successMessage)
      reply.replyText = reply.editedText;
      reply.editMode = false;
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      this.errorMessage = '댓글 작성자만 수정할 수 있습니다.'
      alert(this.errorMessage)
    }
  },
  cancelEdit(reply){
    reply.editMode = false;
    reply.editedText = '';
  },
  modifybutton(community) {
    const currentUser = community.memberEmail
    console.log('이메일 오심????????????????',currentUser)
    const currentUserEmail = localStorage.getItem('memberEmail')
    console.log('이메일 오냐ㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑ',currentUserEmail)
  if(currentUser === currentUserEmail){
    this.$router.push({ name: 'CommunityUpdate', params: { communityId: community.communityId, communityImages: community.communityImages } })
  }else{
    alert('게시물 작성자만 수정 가능합니다.')
  }
},
  async likeCommunity (community) {
    try{
    const accessToken = localStorage.getItem('accessToken')
    const response = await axios.post(`http://localhost:8080/api/v1/community/${community.communityId}/like/${accessToken}`,
    {},
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }})
      console.log('좋아요 성공')
      this.isLiked(community.communityId);
  }catch(error){
    console.error('좋아요 오류:', error)
  }
},
  async cancelLike (community) {
    try{
      const accessToken = localStorage.getItem('accessToken')
      const response = await axios.delete(`http://localhost:8080/api/v1/community/${community.communityId}/cancelLike/${accessToken}`,{
        headers: {
        'Authorization': `Bearer ${accessToken}`
      }})
      console.log('좋아요 취소')
      this.isLiked(community.communityId);
    }catch(error){
      console.error('좋아요가 왜 취소안될까..?:',error)
    }
  },
  async isLiked(community){
    try{
      const accessToken = localStorage.getItem('accessToken')
      const response = await axios.get(`http://localhost:8080/api/v1/community/${this.communityId}/isLiked/${accessToken}`,
      {
        headers:{
          'Authorization': `Bearer ${accessToken}`
        }})
        console.log('좋아요 상태 확인',response.data)
        this.liked = response.data
    }catch(error){
      console.error('좋아요 상태 확인불가:',error);
      this.liked = false //에러ㅅ 좋아요 상태를 false로 간주한다. 최소 좋아요는 안했을테니까..
    }
  },
  async toggleLike(community) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (this.liked) {
          // 좋아요 취소
          await axios.delete(`http://localhost:8080/api/v1/community/${community.communityId}/cancelLike/${accessToken}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
        } else {
          // 좋아요
          await axios.post(`http://localhost:8080/api/v1/community/${community.communityId}/like/${accessToken}`, {}, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
        }
        // 상태 업데이트
        await this.isLiked();
        await this.axiosCommunityData();
      } catch (error) {
        console.error('좋아요 처리 중 오류:', error);
      }
    }
    }
  }
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
.btnliked{
  border: 1px solid #ccc;
}

  </style>
  