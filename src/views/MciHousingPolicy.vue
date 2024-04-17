// eslint-disable-next-line
/* eslint-disable */
<template>
    <div class="housing-policies">
      <h1>Housing Policies</h1>
      <div class="cards-container">
        <!-- 카드 형태로 데이터 표시 -->
        <div class="card" v-for="policy in policies" :key="policy.id">
          <div class="card-image"><!-- 이미지 삽입 --></div>
          <div class="card-content">
            <h2>{{ policy.region }}</h2>
            <p>{{ policy.businessOverview }}</p>
          </div>
        </div>
      </div>
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
  .housing-policies {
    text-align: center;
  }
  
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }
  
  .card {
    width: 300px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .card-image {
    height: 200px;
    background-color: #f4f4f4;
  }
  
  .card-content {
    padding: 16px;
  }
  
  .card-content h2 {
    margin-top: 0;
  }
  </style>