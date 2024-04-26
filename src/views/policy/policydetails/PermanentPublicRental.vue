<template>
  <div class="container mt-3">
    <h1>영구임대</h1>
    <div
      v-if="policy"
      v-html="policy.permanentPublicRental"
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
        `http://localhost:8080/api/v1/housingdetails/permanentPublicRental/${id}`,
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
  text-align: left; /* 모든 텍스트를 왼쪽으로 정렬 */
}

.content-left h2 {
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

h2:empty {
  display: none; /* 내용이 없는 h2 태그는 표시하지 않음 */
}

.no-bullets {
  list-style-type: none; /* 불릿 제거 */
  padding: 0; /* 기본 패딩 제거 */
}
</style>
