<template>
  <div class="container mt-3">
    <h1>행복주택</h1>
    <div v-if="policy" v-html="policy.ahappyhouse" class="content-left"></div>
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
    const id = this.$route.params.id;
    axios
      .get(`http://localhost:8080/api/housingdetails/ahappyhouse/${id}`)
      .then((response) => {
        this.policy = response.data;
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  },
};
</script>
