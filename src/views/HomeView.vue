<!-- // eslint-disable-next-line
/* eslint-disable */ -->
<template>
  <main>

    <div class="container mt-5">

      <div class="main-title mb-5">
        <h1>신혼이어서 가능한 모든 것</h1>
        <p class="mt-3 mb-3">지금 받을 수 있는<br>정부 지원 정책을 알아보세요.</p>
        <button class="btn btn-primary" style="padding:0.75rem 1.5rem; border-radius:1.5rem;" @click="goToRecommend">조회하고 지원받기</button>
      </div>

      <div class="mt-4">
        <img src="../assets/main_01.png" alt="main">
      </div>

      <!-- 커뮤니티 리뷰 영역 -->
      <div class="review-section mt-5 mb-5">
        <div class="row">

          <!-- card -->
          <div class="col-md-4" v-for="community in communityList.slice(0, 3)" :key="community.id">
            <div class="card-review justify-content-center" style="margin-bottom:1rem; text-align: left; padding: 1.2rem;">
              <div class="card-body">
                <h6 class="card-title mb-3">{{ community.title }}</h6>
                <p class="card-text">{{ community.content.slice(0, 100) }} <span v-if="community.content.length > 100">...</span></p>
                <p class="card-subtitle mb-2" style="color:#8FBDFC;">{{ community.memberNickname }}</p>
              </div>
            </div>
          </div>

        </div><!-- row end -->
      </div><!-- review section end -->

      <!-- 2단 카드 레이아웃 -->
      <div class="row" style="margin:4rem 0;">

        <div class="col-md-6 d-flex" style="padding:0 1rem 0 0;">
          <div class="card" style="margin-bottom:1rem; border-radius: 1rem; border:none; background-color:#F0F0F0; text-align:left; padding:1.2rem 1.2rem 0 1.2rem;">
            <div class="card-body" style="padding-bottom:0;">
              <h6 class="card-title mb-4">신혼부부라면 누구나,<br>궁금했던 정부 지원 조회</h6>
              <img src="../assets/2.jpg" style="max-width:100%; height:auto; bottom:0;">
            </div>
          </div>
        </div>

        <div class="col-md-6" style="padding:0;">
          <div class="d-grid">
            <div class="card" style="margin-bottom:1rem; border-radius: 1rem; border:none; background-color:#F0F0F0; text-align:left; padding:1.2rem 1.2rem 0 1.2rem;">
              <div class="card-body" style="padding-bottom:0;">
                <h6 class="card-title mb-4">놓치면 아까운 지원 정책<br>꼼꼼히 알려드려요</h6>
                <img src="../assets/main_01.png" style="max-width: 100%; height: auto;">
              </div>
            </div>
            <div class="card" style="margin-bottom:1rem; border-radius: 1rem; border:none; background-color:#F0F0F0; text-align:left; padding:1.2rem 1.2rem 0 1.2rem;">
              <div class="card-body" style="padding-bottom:0;">
                <h6 class="card-title mb-4">신혼부부 정책 대상자<br>2분이면 조회 완료!</h6>
                <img src="../assets/main_01.png" style="max-width: 100%; height: auto;">
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- 최신 정책 콘텐츠 -->
      <div class="post-contents mt-5 mb-5">
        <h4 class="mb-5">최신 정책 정보</h4>

        <div class="row">
          <div class="col-md-3" v-for="post in postList" :key="post.id">
            <div class="card" style="margin-right:1rem; margin-bottom:1.4rem; border:none; text-align: left; padding-left: 0;">
              <img :src=post.thumbImage class="card-img-top" style="height: 100%; object-fit: cover;">
              <div class="card-body" style="padding-left: 0;">
                <h5 class="card-title mb-2">
                  {{ post.postTitle.slice(0, 24) }}
                  <span v-if="post.postContent.length > 30">...</span>
                </h5>
                <p class="card-text">
                  {{ post.postContent.slice(0, 60) }}
                  <span v-if="post.postContent.length > 60">...</span>
                </p>
                <!-- <router-link :to="{ name: 'PostView', params: { postId: post.id }}" class="btn btn-primary">정책 보러가기</router-link> -->
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- 문의 영역 -->
      <div class="inquiry-section mt-5 mb-5">
        <h4 class="mb-5">가장 많이 본 문의</h4>

        <div class="row">
          <!-- card -->
          <div class="col-md-4" v-for="(popular, index) in popularList.slice(0, 3)" :key="index">
            <div class="card-inquiry justify-content-center" style="margin-bottom:1rem; text-align: left; padding: 1.2rem;">
              <div class="card-body">
                <div class="row mb-3">
                  <div class="col-auto">
                    <img :src=popular.memberProfileImage width="44" height="44" class="rounded-circle">
                  </div>
                  <div class="col">
                    <h4 class="card-title">{{ popular.memberNickname }}</h4>
                    <span class="card-subtitle mb-2" style="color:#B4B4B4;">
                      {{ popular.registerDate.slice(0, 10) }}
                      </span>
                  </div>
                </div>
                <p class="card-text mt-2">
                  {{ popular.content.slice(0, 100) }}
                  <span v-if="popular.content.length > 60">...</span>
                  </p>
              </div>
            </div>
          </div>

        </div><!-- row end -->
      </div><!-- 문의 section end -->

</div>

  </main>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  name: 'HomeView',
  data () {
    return {
      postList: [],
      currentPage: 0,
      itemsPerPage: 4,
      selectedCategory: '전체',
      popularList: [],
      communityList: []
    };
  },
  async created () {
    await this.fetchCommunity()
    await this.fetchPosts()
    await this.fetchPopular()
  },
  methods: {
    async fetchPosts () {
      try {
        const response = await axios.get('/api/v1/home/postList');
        this.postList = response.data.content;

      } catch (err) {
        console.error('리스트를 불러 올 수 없습니다.', err);
      }
    },
    async fetchPopular () {
      try {
        const response = await axios.get('/api/v1/home/popularCommunityList');
        this.popularList = response.data;

      } catch (err) {
        console.error('리스트를 불러 올 수 없습니다.', err);
      }
    },
    async fetchCommunity () {
      try {
        const response = await axios.get('/api/v1/home/communityList');
        this.communityList = response.data.content;

      } catch (err) {
        console.error('리스트를 불러 올 수 없습니다.', err);
      }
    },
    goToRecommend () {
      this.$router.push('/recommend')
    }
  }
}
</script>

<style>
.review-section {
  align-content: left;
}

.review-section .card-review {
  align-content: left;
  margin: 0;
  background-color: #2F80ED;
  border-radius: 1rem;
  color: #FFF;
}

.card-review p {
  font-size: 0.8rem;
}

.card-title {
  font-size: 1.2rem;
}

.btn-primary {
  display: block;
}

.card-inquiry {
  border: 1px solid #E0E0E0;
  border-radius: 1rem;
  margin: 0 auto;
}

p {
  font-size: 0.9rem;
  line-height: 1.6;
}

span {
  font-size: 0.8rem;
}
</style>



