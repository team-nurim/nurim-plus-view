<template>
    <div>
      <h1>Housing Policies</h1>
      <ul>
        <!-- 데이터를 리스트로 표시 -->
        <li v-for="policy in policies" :key="policy.id">
          {{ policy.region }} - {{ policy.businessOverview }}
        </li>
      </ul>
    </div>
  </template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      policies: [] // 주택 정책 데이터를 저장할 배열
    }
  },
  mounted () {
    this.mcichHousingPolicies() // 컴포넌트가 마운트되면 API 호출
  },
  methods: {
    mcichHousingPolicies () {
      axios.get('http://localhost:8080/mcihousingpolicy/vuemcihousingpolicy') // API 엔드포인트
        .then(response => {
          this.policies = response.data // 응답 데이터를 policies 배열에 저장
        })
        .catch(error => {
          console.error('There was an error fetching the policies: ', error)
        })
    }
  }
}
</script>
<style>
/* CSS 스타일링 */
</style>
