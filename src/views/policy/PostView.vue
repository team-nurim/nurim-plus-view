<template>
  <main class="mt-5 mb-5">

    <div class="container">
      
      <h2 class="text-center mb-5">postRead.postTitle</h2>

      <div class="border">
        <p class="form-control-plaintext">postRead.postCategory</p>
      </div>

      <div class="border">
        <p class="form-control-plaintext">postRead.postRegisterDate</p>
      </div>

      <div class="mb-5" style="margin:0; padding:0;">
        <img src="https://www.korea.kr/newsWeb/resources/attaches/2023.12/18/4d1dfe2ada4785a5db8d04cc16db9bb0.jpg">
      </div>

      <div class="row">
        <p class="form-control-plaintext">postRead.postContent</p>
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
    }
  }
}
</script>

<style scoped>
</style>

