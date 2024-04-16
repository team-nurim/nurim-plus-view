<template>
    <div class="detail-container">
      <h1>{{ community.title}}</h1>
      <div class="userInfo">
        <i class="fa-regular fa-user" style="margin-left: 5px"></i><span>{{  community.memberNickname }}</span>
        <i class="fa-solid fa-eye" style="margin-left: 10px"></i><span>{{ community.counts }}</span>
        <span class="register-date">{{formatDate (community.registerDate)}}</span>
      </div>
      <div class="content-container">
        <p>{{community.content}}</p>
      </div>
      <hr>
      <input type="text" placeholder="댓글을 입력하세요" class="search-input" style="margin-right: 5px; width: 1000px;">
      <button class="btn btn-primary">등록</button>
      <hr>
      <div class="reply-container">
        <div v-for="(reply, index) in replyList" :key="index" class="replyList">
            <span>{{ reply.replyer }}</span><span>{{ formatDate(reply.replyRegisterDate) }}</span>
        <p>{{ reply.replyText }}</p>
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
        replyList: []
      };
    },
    mounted() {
      this.axiosCommunityData()
      this.axiosReplyData()
    },
    methods: {
      async axiosCommunityData() {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/communityRead/${this.communityId}`);
          this.community = response.data;
        } catch (error) {
          console.error('게시물 정보를 불러올 수 없습니다:', error);
        }
      },
      async axiosReplyData () {
        try{
            const response = await axios.get(`http://localhost:8080/api/v1/community/${this.communityId}/replyRead`)
            this.replyList = response.data
        }catch (err) {
            console.err('게시물 아이디에 맞는 댓글 리스트를 불러올 수 없습니다:',err)
        }
      }
    }
  };
  </script>
  
  <style>
  .detail-container {
    width: 1350px;
    height: 100vh;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #000;
  }
  /*======================타이틀 스타일================*/
  .detail-container h1{
    font-weight: bold;
    display: flex;
  }
  /*=======================유저 정보 스타일=============*/
  .userInfo{
    display: flex;
  }
  .register-date {
  margin-left: auto;
}
  </style>
  