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
              <label for="productName" class="col-md-3 col-form-label">내용</label>
              <div class="col-md-9">
                <input type="text" class="form-control" id="productName">
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-8 offset-md-2 d-flex justify-content-center">
          <button type="button" class="btn btn-lg btn-outline-secondary me-3">취소하기</button>
          <button type="button" class="btn btn-lg btn-danger">저장하기</button>
        </div>
      </div>
    </div>
  </main>
</template>

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
</style>
