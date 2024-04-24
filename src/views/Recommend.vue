<template>
  <main style="background-color: #F5F5F5;">
    
    <div class="container mt-5 mb-5">
      <div style="padding:0;">


        <div class="d-flex flex-row p-3">
          <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="44" height="44">
          <div class="chat ml-2 p-4">
            <p>
              몇 가지 정보만 알려주시면<br>
              적합한 지원정책을 알려드릴게요.
            </p>
          </div>
        </div>
        
        <!-- 1단계 -->
        <div class="d-flex flex-row p-3" v-if="true">
          <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="44" height="44">
          <div class="chat ml-2 p-4">
            <p>
              어디에 살고 계신가요?<br>
            </p>
            <!-- 지역구 드롭다운 / 선택 후 다음 클릭 시 hidden 처리 -->
            <div class="btn-group mt-3" style="width:100%;">
              <button type="button" class="btn btn-danger btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style="background-color:#FFF; border:none; color:#333;">
                {{ selectedLocation ? selectedLocation : '거주지역을 선택하세요.' }}
              </button>
              <ul class="dropdown-menu" style="font-size: 0.9rem;">
                <li><a class="dropdown-item" href="#" @click="selectLocation('서울특별시')">서울특별시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectLocation('부산광역시')">부산광역시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectLocation('대구광역시')">대구광역시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectLocation('인천광역시')">인천광역시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectLocation('광주광역시')">광주광역시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectLocation('대전광역시')">대전광역시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectLocation('경기도')">경기도</a></li>
                <li><a class="dropdown-item" href="#" @click="selectLocation('충청북도')">충청북도</a></li>
                <li><a class="dropdown-item" href="#" @click="selectLocation('충청남도')">충청남도</a></li>
                <li><a class="dropdown-item" href="#" @click="selectLocation('전라남도')">전라남도</a></li>
                <li><a class="dropdown-item" href="#" @click="selectLocation('경상북도')">경상북도</a></li>
                <li><a class="dropdown-item" href="#" @click="selectLocation('경상남도')">경상남도</a></li>
                <li><a class="dropdown-item" href="#" @click="selectLocation('세종특별시')">세종특별시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectLocation('제주특별시')">제주특별시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectLocation('강원특별시')">강원특별시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectLocation('전북특별시')">전북특별시</a></li>                
              </ul>
            </div>

            <!-- <button class="btn-primary" @click="saveLocation">다음</button> -->
          </div>
        </div>
        
        <div v-if="selectedLocation">
          <div class="d-flex flex-row p-3 justify-content-end" >
            <div class="bg-white answer mr-2 p-4">
              <p class="text-muted">{{ selectedLocation }}</p>
            </div>
            <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png" width="44" height="44">
          </div>
          
          <!-- 2단계 -->
          <div class="d-flex flex-row p-3">
            <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="44" height="44">
            <div class="chat ml-2 p-4">
              <p>
                주제를 선택해주세요.
              </p>
              <div class="subject mt-3">
                <div class="form-check">
                  <input class="form-check-input" type="radio" value="주거지원" id="subject1" @change="selectSubject('주거지원')">
                  <label class="form-check-label" for="subject1">
                    주거지원
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" value="출산" id="subject2" @change="selectSubject('출산')">
                  <label class="form-check-label" for="subject2">
                    출산
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" value="양육" id="subject3" @change="selectSubject('양육')">
                  <label class="form-check-label" for="subject3">
                    양육
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" value="보육" id="subject4" @change="selectSubject('보육')">
                  <label class="form-check-label" for="subject4">
                    보육
                  </label>
                </div>
              </div>

              <!-- <button class="btn-primary" @click="saveSubject">다음</button> -->

            </div>
          </div>
        </div>


        <div v-if="selectedSubject">
          <div class="d-flex flex-row p-3 justify-content-end">
            <div class="bg-white answer mr-2 p-4">
              <p class="text-muted">{{ selectedSubject }}</p>
            </div>
            <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png" width="44" height="44">
          </div>

          <!-- 3단계 -->
          <div class="d-flex flex-row p-3">
            <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="44" height="44">
            <div class="chat ml-2 p-4">
              <p>
                선택하신 주제와 관련하여<br>
                관심있는 키워드를 입력하세요.
              </p>
              <!-- 키워드 입력필드 -->
              <div class="input-group input-group-sm mt-3 mb-3">
                <input type="text" class="form-control" style="height:2rem;" v-model="keyword">
              </div>

              <button class="btn-primary" @click="submitKeyword">입력하기</button>
            </div>
          </div>
        </div>

        <div v-if="submittedKeyword">
          <div class="d-flex flex-row p-3 justify-content-end">
            <div class="bg-white answer mr-2 p-4">
              <p class="text-muted">{{ submittedKeyword }}</p>
            </div>
            <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png" width="44" height="44">
          </div>

          <!-- '정책 매칭' 링크 버튼 -->
          <div class="mt-5 mb-5">
            <button class="btn btn-primary mb-2" style="padding:0.75rem 2rem; border-radius:1.5rem;" @click="getResult">조회하고 지원받기</button>
          </div>
        </div>
        
      </div>
    </div>

  </main>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      messages: [],
      selectedLocation: null,
      selectedSubject: null,
      submittedKeyword: ''
    };
  },
  methods: {
    selectLocation(location) {
      this.selectedLocation = location;
    },
    selectSubject(subject) {
      this.selectedSubject = subject;
    },
    submitKeyword() {
      // 제출 버튼 클릭 시 호출되는 메서드
      // submittedKeyword에 입력한 키워드 할당
      this.submittedKeyword = this.keyword;
    },
  }
}
</script>

<style scoped>
.container {
  max-width: 820px;
  min-height: 520px;
}
.card{
	width: 300px;
	border: none;
	border-radius: 1rem;
}
.chat{
	border: none;
	background: #E2FFE8;
	font-size: 0.85rem;
	border-radius: 1rem;
  text-align: left;
  background-color: #CCE5FF;
}

.bg-white{
	font-size: 0.85rem;
	border-radius: 1rem;
}
.dot{
	font-weight: bold;
}
.form-control{
	border-radius: 12px;
	border: 1px solid #F0F0F0;
	font-size: 8px;
}
.form-control:focus{
	box-shadow: none;
	}
.form-control::placeholder{
	font-size: 8px;
	color: #C4C4C4;
}
p {
  margin: 0;
}
.btn-primary {
  border: none;
  margin-top: 0.3rem;
  padding: 0.3rem 0.8rem;
  border-radius: 0.3rem;
  width: 100%;
  color: #FFF;
  font-weight: 400;
}
footer {
  margin: 0;
}
</style>