<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container justify-content-center">
      <router-link class="navbar-brand" to="/admin/list" style="font-size: 36px; margin-bottom: 10px;">NurimPlus</router-link> <!-- Increased font size and added margin-bottom -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/list" style="margin-right: 10px; font-weight: bold;">정책정보 페이지</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/home" style="margin-right: 10px; font-weight: bold;">회원관리 페이지</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="margin-right: 10px;">
              로그인
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" to="/product-list">회원가입</router-link></li>
              <li><router-link class="dropdown-item" to="/product-detail">마이페이지</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link class="dropdown-item" to="/product-registration">로그아웃</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
