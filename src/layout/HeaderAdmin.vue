<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container justify-content-center">
      <a href="/admin/post/list" class="navbar-brand" style="font-size: 36px; margin-bottom: 10px;">NurimPlus</a> <!-- Increased font size and added margin-bottom -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a href="/admin/post/list" class="nav-link" style="margin-right: 10px; font-weight: bold;">정책정보 페이지</a>
          </li>
          <li class="nav-item">
            <a href="/home" class="nav-link" style="margin-right: 10px; font-weight: bold;">회원관리 페이지</a>
          </li>
          <li class="nav-item">
            <a href="/admin/login" class="nav-link" style="margin-right: 10px;">로그아웃</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    getListInfoPageLink () {
      return '/admin/post/list'
    }
  }
}
</script>
