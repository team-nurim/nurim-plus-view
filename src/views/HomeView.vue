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

      <!-- 리뷰 영역 -->
      <div class="review-section mt-5 mb-5">
        <div class="row">

          <!-- card -->
          <div class="col-md-4" v-for="community in communityList.slice(0, 3)" :key="community.id">
            <div class="card-review justify-content-center" style="margin-bottom:1rem; text-align: left; padding: 1.2rem;">
              <div class="card-body">
                <h7 class="card-title mb-2">{{ community.title }}</h7>
                <p class="card-text">{{ community.content.slice(0, 100) }} <span v-if="community.content.length > 100">...</span></p>
                <p class="card-subtitle mb-2" style="color:#8FBDFC;">{{ community.memberNickname }}</p>
              </div>
            </div>
          </div>

        </div><!-- row end -->
      </div><!-- review section end -->

      <!-- 최신 정책 콘텐츠 -->
      <div class="post-contents mt-5 mb-5">
        <h4 class="mb-1">최신 정책 정보</h4>

        <div class="row">
          <div class="col-md-3" v-for="post in postList" :key="post.id">
            <div class="card" style="margin-right:1rem; margin-bottom:1rem; border:none; text-align: left; padding-left: 0;">
              <img src="../assets/logo.png" class="card-img-top" alt="...">
              <div class="card-body" style="padding-left: 0;">
                <h5 class="card-title">{{ post.postTitle }}</h5>
                <p class="card-text">
                  {{ post.postContent.slice(0, 60) }}
                  <span v-if="post.postContent.length > 60">...</span>
                </p>
                <router-link to="#" class="btn btn-primary">정책 보러가기</router-link>
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
                <div class="row">
                  <div class="col-auto">
                    <img src="https://github.com/mdo.png" width="44" height="44" class="rounded-circle">
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
    await this.fetchPosts()
    await this.fetchPopular()
    await this.fetchCommunity()
  },
  methods: {
    async fetchPosts (category = '전체') {
      try {
        let url = `http://localhost:8080/api/v1/posts/post/list?page=${this.currentPage}&size=${this.itemsPerPage}`;
        if(category !== '전체') {
          url = `http://localhost:8080/api/v1/posts/post/${category}?page=${this.currentPage}&size=${this.itemsPerPage}`;
        }
        const response = await axios.get(url);
        this.postList = response.data.content;

      } catch (err) {
        console.error('리스트를 불러 올 수 없습니다.', err);
      }
    },
    async fetchPopular () {
      try {
        const response = await axios.get('/api/v1/popular');
        this.popularList = response.data;

      } catch (err) {
        console.error('리스트를 불러 올 수 없습니다.', err);
      }
    },
    async fetchCommunity () {
      try {
        const response = await axios.get('/api/v1/communityList');
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
}

span {
  font-size: 0.8rem;
}
</style>