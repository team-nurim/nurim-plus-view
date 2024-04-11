<template>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Page</title>
    <!-- 부트스트랩 CSS 링크 추가 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0tjcO1lCWheBWTvivHQxL9aZ2zZ5aWGuXMpv7g6Aoz87NMjK0E8c5ewWPUT6o4" crossorigin="anonymous">
    <!-- 여기에 사용할 CSS 파일 링크 추가 -->

    <!-- 여기에 추가적인 헤더 요소를 추가할 수 있습니다. -->
</head>
<body>
    <div class="container">
        <h1 class="mt-5 mb-4">Admin Dashboard</h1>
        <!-- 여기에 관리자 페이지의 다양한 섹션과 요소를 추가할 수 있습니다. -->
        <!-- 예시: 사용자 관리, 채팅 기능, 통계 및 리포트, 설정 등 -->

        <!-- 예시: 사용자 관리 섹션 -->
        <div class="card mb-4">
            <div class="card-header">
                User Management
            </div>
            <div class="card-body">
                <!-- 사용자 관리 기능 추가 -->
                <!-- 예시: 사용자 목록 표시, 사용자 추가/편집/삭제 기능 제공 -->
            </div>
        </div>

        <!-- 예시: 채팅 기능 섹션 -->
        <div class="card mb-4">
            <div class="card-header">
                Chat Functionality
            </div>
            <div class="card-body">
                <!-- 채팅 기능 추가 -->
                <!-- 예시: 실시간 채팅 창, 메시지 전송 기능 제공 -->
            </div>
        </div>

        <!-- 추가적인 섹션 및 요소를 필요에 따라 추가할 수 있습니다. -->
    </div>

</body>
</html>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
export default {
    // 다른 컴포넌트 옵션들...

    mounted() {
        // 외부 스크립트 로드
        const script1 = document.createElement('script');
        script1.src = "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js";
        script1.integrity = "sha384-f4qMEXf+Q4ZVs+ROA3Uq7xZWPhsDlnD4FoU9z9pve5Ywz1Lk0B2E0N/hRT4TdgyJ";
        script1.crossorigin = "anonymous";
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js";
        script2.integrity = "sha384-F59oV3yvvlV5Iip6F25sjJRz6VJ17wDZS6v0MIV9G3IvptF4i5JF9C0qRa3RqE3U";
        script2.crossorigin = "anonymous";
        document.body.appendChild(script2);
    }
}
</script>
