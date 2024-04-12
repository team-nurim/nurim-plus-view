<template>
  <main class="mt-3">
    <div class="container">
      <div class="row mb-2 d-flex justify-content-center">
          <h3 class="mt-3" style="font-weight: bold">정책정보관리</h3> <!-- 큰 글씨로 AdminPage 표시 -->
        <div class="col-12 d-flex justify-content-center"> <!-- 부모 요소에 가운데 정렬을 적용합니다. -->
          <select class="form-select form-select mt-3" style="width: 500px;">
            <option selected>선택</option>
            <option value="1">주거</option>
            <option value="2">보육</option>
            <option value="3">양육</option>
          </select>
        </div>
        <!-- 버튼 추가 -->
        <div class="d-flex justify-content-end mt-2">
           <a href="/admin/register"> <!-- 링크를 추가 -->
            <button class="btn btn-dark" style="background-color: white; color: black;">정책정보 등록</button>
          </a>
        </div>
      </div>
        <div class="table-responsive mt-3 d-flex justify-content-center">
        <table class="table" style="background-color: white;"> <!-- 테이블의 배경색을 흰색으로 변경 -->
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">카테고리</th>
              <th scope="col">등록일자</th>
              <th scope="col">작성자</th>
              <th scope="col"></th> <!-- 없애면 이상해짐 -->
            </tr>
          </thead>
          <tbody style="background-color: white;"> <!-- 모든 줄의 배경색을 흰색으로 변경 -->
  <tr v-for="item in itemList" :key="item.id">
    <td>
      <div style="padding: 10px 0;">{{ item.id }}</div>
    </td>
    <td>
      <div style="padding: 10px 0;">{{ item.title }}</div>
    </td>
    <td>
      <div style="padding: 10px 0;">{{ item.category }}</div>
    </td>
    <td>
      <div style="padding: 10px 0;">{{ item.date }}</div>
    </td>
    <td>
      <div style="padding: 10px 0;">{{ item.author }}</div>
    </td>
    <td>
      <div style="padding: 10px 0;">
        <!-- 드롭다운 버튼 추가 -->
        <div class="dropdown">
          <svg width="5" height="15" id="dropdownMenuButton" xmlns="http://www.w3.org/2000/svg" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="pointer-events: all;">
            <circle cx="2.5" cy="2.5" r="2" fill="black"/>
            <circle cx="2.5" cy="7.5" r="2" fill="black"/>
            <circle cx="2.5" cy="12.5" r="2" fill="black"/>
          </svg>
          <!-- 드롭다운 메뉴 -->
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="min-width: auto;">
            <li><a class="dropdown-item" href="#">게시물 수정</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">게시물 삭제</a></li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
</tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
export default {
  data () {
    return {
      itemList: [ // 예시 데이터 배열
        { id: 1, title: '보육정책 관련 4월', category: '보육', date: '2024-04-10', author: 'LeeHanJo' },
        { id: 2, title: '보육정책 관련 4월', category: '보육', date: '2024-04-10', author: 'LeeHanJo' },
        { id: 3, title: '보육정책 관련 4월', category: '보육', date: '2024-04-10', author: 'LeeHanJo' },
        { id: 4, title: '보육정책 관련 4월', category: '보육', date: '2024-04-10', author: 'LeeHanJo' },
        { id: 5, title: '보육정책 관련 4월', category: '보육', date: '2024-04-10', author: 'LeeHanJo' },
        { id: 6, title: '보육정책 관련 4월', category: '보육', date: '2024-04-10', author: 'LeeHanJo' },
        { id: 7, title: '보육정책 관련 4월', category: '보육', date: '2024-04-10', author: 'LeeHanJo' },
        { id: 8, title: '보육정책 관련 4월', category: '보육', date: '2024-04-10', author: 'LeeHanJo' },
        { id: 9, title: '보육정책 관련 4월', category: '보육', date: '2024-04-10', author: 'LeeHanJo' },
        { id: 10, title: '보육정책 관련 4월', category: '보육', date: '2024-04-10', author: 'LeeHanJo' },
        { id: 11, title: '보육정책 관련 4월', category: '보육', date: '2024-04-10', author: 'LeeHanJo' },
        { id: 12, title: '보육정책 관련 4월', category: '보육', date: '2024-04-10', author: 'LeeHanJo' },
        { id: 13, title: '보육정책 관련 4월', category: '보육', date: '2024-04-10', author: 'LeeHanJo' },
        { id: 14, title: '보육정책 관련 4월', category: '보육', date: '2024-04-10', author: 'LeeHanJo' },
        { id: 15, title: '보육정책 관련 4월', category: '보육', date: '2024-04-10', author: 'LeeHanJo' }
      ],
    }
  },
}
</script>

<style>

</style>