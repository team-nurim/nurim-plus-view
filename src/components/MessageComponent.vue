<template>
  <div class="message" :class="{'owner': isOwner}">
    <p>{{ message.text }}</p> <!-- 메시지의 텍스트를 표시 -->
  </div>
</template>

<script>
export default {
  props: {
    message: Object, // 메시지 객체를 전달받습니다.
    isOwner: Boolean // 메시지 소유자 여부를 판단합니다.
  }
};
</script>



  <!-- <script>
  export default {
    props: {
      message: Object,

      isOwner: Boolean
    }
  };
  </script> -->

  <style scoped>
  .message {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  .owner {
    background-color: #dff0d8;
    align-self: flex-end;
  }
  </style>
 <!-- 이 파일해석: fetchsupportfunds메소드로
  api데이터를 가져와 이를 메시지 배열에 저장하여
  MessageComponent를 사용하여 화면에 표시함.
  이걸 컴포넌트로 만들어 ,vue프로젝트에 포함시켜 사용하면됨 -->