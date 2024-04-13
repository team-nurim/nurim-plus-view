<template>
  <main class="mt-5">
    <div class="container">
      <h2 class="text-center mb-5">정책정보 등록</h2>
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <form>
            <!-- 입력 요소들을 중앙에 배치 -->
            <div class="mb-3 row">
              <label for="productName" class="col-md-3 col-form-label">제목</label>
              <div class="col-md-9">
                <input type="text" class="form-control" id="productName">
              </div>
            </div>
            <!-- 다른 입력 요소들도 동일하게 구성 -->
             <div class="mb-3 row">
              <label for="productName" class="col-md-3 col-form-label">등록일자</label>
              <div class="col-md-9">
                <input type="text" class="form-control" id="productName">
              </div>
            </div>
             <div class="mb-3 row">
              <label for="productName" class="col-md-3 col-form-label">작성자</label>
              <div class="col-md-9">
                <input type="text" class="form-control" id="productName">
              </div>
            </div>
             <div class="mb-3 row">
              <label for="content" class="col-md-3 col-form-label">내용</label>
              <div class="col-md-9">
                <textarea class="form-control" id="content" rows="5"></textarea>
              </div>
            </div>
             <!-- 이미지 업로드를 위한 input 요소 추가 -->
            <div class="mb-3 row">
              <label for="image" class="col-md-3 col-form-label">이미지 업로드</label>
              <div class="col-md-9">
                <input type="file" class="form-control" id="image" accept="image/*" @change="handleImageUpload">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-8 offset-md-2 d-flex justify-content-center">
          <router-link to="/admin/list" class="btn btn-lg btn-primary me-3">목록으로</router-link>
          <button type="button" class="btn btn-lg btn-primary">저장하기</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
export default {
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      // 이미지 파일을 업로드하는 로직을 작성합니다.
      console.log('Uploaded image:', file);
    }
  }
}
</script>

<style>
  /* 썸네일 이미지와 파일 업로드 요소들의 스타일링 */
  input[type="file"] {
    height: auto;
    padding: 10px;
    background-color: #f8f9fa;
    border: 1px solid #ced4da;
    border-radius: 5px;
  }
  /* 파일 업로드 요소 아래에 추가 정보를 보여주는 스타일링 */
  small {
    display: block;
    margin-top: 5px;
    color: #6c757d;
  }

  /* textarea 요소를 더 크게 만듭니다 */
  textarea {
    height: 200px; /* 원하는 크기로 조정하세요 */
    resize: vertical; /* 사용자가 크기를 조절할 수 있도록 합니다 */
  }
</style>
