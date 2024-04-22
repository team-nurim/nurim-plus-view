<template>
    <div id="app">
      <!-- 나머지 코드 -->

      <!-- 모달 섹션 -->
      <div class="modal-overlay" v-if="showModal">
        <div class="modal-content">
          <div class="modal-header">
            <span class="notification-icon">‼️</span>
          </div>
          <div class="modal-body">
            <p class="alert-message">“추가 정보가 필요해요.. 추가정보가 있으면 빨리 알려드릴게요!”</p>
          </div>
          <div class="modal-footer">
            <button class="interview-button" @click="closeModal">뒤로가기</button>
          </div>
        </div>
      </div>
      <!-- 나머지 코드 -->
    </div>
  </template>

  <script>
  export default {
    name: 'ModalComponent',
    data() {
      return {
        showModal: true, // 모달 상태를 제어하기 위한 데이터
      };
    },
    methods: {
      closeModal() {
        this.showModal = false; // 모달 닫기 메소드
      }
    }
  };
  </script>

  <style scoped>
  /* 모달 오버레이 및 컨텐츠 스타일링 */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 15px;
    width: 90%;
    max-width: 400px;
    text-align: center;
  }

  .notification-icon {
    font-size: 2em;
  }

  .alert-message {
    font-size: 1.2em;
    margin: 20px 0;
  }

  .interview-button {
    width: 80%;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #ff4d4d;
    color: white;
    margin: 0 auto;
    display: block;
  }

  /* 나머지 스타일 코드 */
  </style>
