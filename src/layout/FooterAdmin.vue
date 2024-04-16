<template>
  <footer class="mt-5 py-5">
    <div class="container text-center">
      <div class="row" style="color: white;">
        <div class="col-md-4">
          <h5>About Us</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="col-md-4">
          <h5>Contact</h5>
          <ul class="list-unstyled">
            <li>Address: 1234 Main St, City, Country</li>
            <li>Phone: +1234567890</li>
            <li>Email: info@example.com</li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Follow Us</h5>
          <ul class="list-inline">
            <li class="list-inline-item"><a href="#"><i class="fab fa-facebook-f"></i></a></li>
            <li class="list-inline-item"><a href="#"><i class="fab fa-twitter"></i></a></li>
            <li class="list-inline-item"><a href="#"><i class="fab fa-instagram"></i></a></li>
          </ul>
        </div>
      </div>
      <hr>
      <p style="color: white;">&copy; 2024 Your Company. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterAdmin'
}
</script>
<style>
    footer {
        background: #444444; /* 그라데이션 배경 */
        padding: 30px 0;
          color: white; /* Text color */
    }

    footer a {
        color: #ffffff; /* 링크 색상 */
    }
    .h5{
      color: white;
    }
</style>
