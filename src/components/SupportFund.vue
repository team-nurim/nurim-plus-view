<template>
    <div class="support-fund">
      <h3>{{ fund.name }}</h3>
      <p>{{ fund.description }}</p>
      <!-- 여기에 필요한 정보 더 표시 -->
    </div>
</template>
  
  <script>
  export default {
    props: {
      fund: Object
    }
  };
  </script>
  
  <style scoped>
  .support-fund {
    /* // */
  }
  </style>
  