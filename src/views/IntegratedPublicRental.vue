<template>
  <div class="container mt-3">
    <h1>통합공공임대</h1>
    <div
      v-if="policy"
      v-html="policy.integratedPublicRental"
      class="content-left"
    ></div>
    <p v-else>Loading or No data available</p>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      policy: null,
    };
  },
  created() {
    const id = this.$route.params.id; // URL에서 ID를 추출
    axios
      .get(
        `http://localhost:8080/api/v1/housingdetails/integratedPublicRental/${id}`
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
  text-align: left; /* 모든 텍스트를 왼쪽으로 정렬 */
}

.content-left h2 {
  /* content-left 클래스 내의 h2 태그에 스타일 적용 */
  min-width: 100px; /* 최소 너비 설정 */
  border: 1px solid #cccccc; /* 회색 테두리 */
  background-color: rgba(192, 192, 192, 0.5); /* 반투명 회색 배경 */
  padding: 5px; /* 내부 여백 */
  margin-bottom: 10px; /* 요소 사이의 간격 */
  border-radius: 8px; /* 모서리 둥글게 */
  flex-basis: 20%; /* detail-box 너비 설정 */
  flex-shrink: 0; /* 축소하지 않음 */
  text-align: center; /* 텍스트 가운데 정렬 */
}

.content-left span:hover {
  transform: scale(1.5); /* 요소를 1.5배로 확대 */
  transition: transform 0.3s ease-in-out; /* 확대/축소에 대한 부드러운 전환 효과 */
}

h2:empty {
  display: none; /* 내용이 없는 h2 태그는 표시하지 않음 */
}

.no-bullets {
  list-style-type: none; /* 불릿 제거 */
  padding: 0; /* 기본 패딩 제거 */
}
</style>
