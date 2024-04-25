<template>
  <main class="mt-5 mb-5">
    <div class="container">


      <!-- 타이틀 이미지 -->
      <div class="mb-5" style="margin:0; padding:0;">
        <img :src="post.postImages && post.postImages.length > 0 ? post.postImages[0] : ''" width="100%">
      </div>

      <div style="text-align:left;">
        <div class="mb-5">
          <button class="btn btn-outline-secondary btn-sm mb-3" style="border-radius:1.5rem; padding: 0.2rem 1rem;">{{ post.postCategory }}</button>
          <h4 class="text-center mb-3 text-start">{{ post.postTitle }}</h4>
          <p class="form-control-plaintext">{{ post.postRegisterDate }}</p>
        </div>

        <div>
            <p class="form-control-plaintext">{{ post.postContent }}</p>
        </div>
      </div>

      <!-- 본문 이미지 -->
      <div class="mb-3" v-if="post.postImages && post.postImages.length > 1">
        <img v-for="(image, index) in post.postImages.slice(1)" :key="index" :src="image" width="100%">
      </div>

      <div class="col d-flex text-end mt-3 mb-5">
        <button type="button" class="btn btn-outline-dark" @click="goToList">목록</button>
      </div>

    </div>
  </main>
</template>
<script>
import axios from 'axios'

export default {
  name: 'PostView',
  props: ['postId'], // postId를 props로 받아옵니다.
  // components: {},
  data () {
    return {
      post: {}
    }
  },
  mounted () {
    this.fetchPost(this.postId)
  },
  methods: {
    async fetchPost (postId) {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const response = await axios.get(`/api/v1/posts/post/read/${this.postId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        this.post = response.data

      } catch (err) {
        console.error('게시물을 불러 올 수 없습니다.', err)
      }
    },
    goToList () {
      this.$router.push('/policy')
    }
  }
}
</script>

<style scoped>
</style>

