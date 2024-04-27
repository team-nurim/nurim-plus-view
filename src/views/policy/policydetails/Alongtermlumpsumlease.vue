<template>
  <div class="container mt-3">
    <h1>장기전세</h1>
    <div
      v-if="policy"
      v-html="policy.alongtermlumpsumlease"
      class="content-left"
    ></div>
    <p v-else>Loading or No data available</p>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      policy: null,
    };
  },
  async created() {
    const id = this.$route.params.id;
    const accessToken = localStorage.getItem('accessToken');
    await axios
      .get(
        `http://localhost:8080/api/v1/housingdetails/alongtermlumpsumlease/${id}`,
        {headers: {Authorization: `Bearer ${accessToken}`}}
      )
      .then((response) => {
        this.policy = response.data;
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  },
};
</script>
<style>
.content-left {
  align-items: center;
}

.content-left h2 {
  /* content-left 클래스 내의 h2 태그에 스타일 적용 */
  min-width: 100px; /* 최소 너비 설정 */
  border: none;
  background-color: #f4f4f4; /* 반투명 회색 배경 */
  padding: 5px; /* 내부 여백 */
  margin-bottom: 10px; /* 요소 사이의 간격 */
  border-radius: 8px; /* 모서리 둥글게 */
  flex-basis: 20%; /* detail-box 너비 설정 */
  flex-shrink: 0; /* 축소하지 않음 */
  text-align: center; /* 텍스트 가운데 정렬 */
}

.content-left h4 {
  text-align: center; /* 텍스트 가운데 정렬 */
}

.content-left h3 {
  text-align: center; /* 텍스트 가운데 정렬 */
}

.content-left figure {
  align-items: center;
  border-bottom: 2px #000;
}

.content-left thead{
  border-bottom: 2px solid #000;
}

.content-left th {
  text-align: center;
  padding: 20px;
}

.content-left td {
  text-align: center;
  padding: 30px;
}

.content-left table {
  width: 100%;
  align-items: center;
/*  border: 1px solid #000; /* 전체 테이블에 테두리 설정 */
/*  border-collapse: collapse; /* 테두리 겹침 방지 */
}

/* .content-left table th + th, .table td + td, .table th + td {
  border-right: 1px solid #000;
  border-left: 1px solid #000;
  border-collapse: collapse;
} */

.content-left p {
  font-size: 16px;
  align-items: center;
  text-align: center;
}

.content-left span:hover {
  transform: scale(1.5); /* 요소를 1.5배로 확대 */
  transition: transform 0.3s ease-in-out; /* 확대/축소에 대한 부드러운 전환 효과 */
}

h2:empty {
  display: none; /* 내용이 없는 h2 태그는 표시하지 않음 */
}

h4:empty {
  display: none; /* 내용이 없는 h2 태그는 표시하지 않음 */
}

.no-bullets {
  list-style-type: none; /* 불릿 제거 */
  padding: 0; /* 기본 패딩 제거 */
}
</style>
