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
        <div class="d-flex flex-row p-3">
            <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="44" height="44">
            <div class="chat ml-2 p-4">
              <p>
                주제를 선택해주세요.
              </p>
              <div class="subject mt-3">
                <div class="form-check">
                  <input class="form-check-input" type="radio" value="주거지원" id="subject1" name="subject" v-model="selectedSubject">
                  <label class="form-check-label" for="subject1">
                    주거지원
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" value="양육" id="subject2" name="subject" v-model="selectedSubject">
                  <label class="form-check-label" for="subject2">
                    양육
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" value="통합지원" id="subject3" name="subject" v-model="selectedSubject">
                  <label class="form-check-label" for="subject3">
                    통합지원
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
            <img :src=member.memberProfileImage  width="44" height="44" class="rounded-circle">
          </div>
        

        <!-- 2단계 -->
        <div class="d-flex flex-row p-3" v-if="selectedSubject">
          <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="44" height="44">
          <div class="chat ml-2 p-4">
            <p>
              어디에 살고 계신가요?<br>
            </p>
            <!-- 지역구 드롭다운 / 선택 후 다음 클릭 시 hidden 처리 -->
            <div class="btn-group mt-3" style="width:100%;">
              <button type="button" class="btn btn-danger btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style="background-color:#FFF; border:none; color:#333;">
                {{ selectedRegion ? selectedRegion : '거주지역을 선택하세요.' }}
              </button>
              <ul class="dropdown-menu" style="font-size: 0.9rem;">
                <li><a class="dropdown-item" href="#" @click="selectRegion('서울특별시')">서울특별시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectRegion('부산광역시')">부산광역시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectRegion('대구광역시')">대구광역시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectRegion('인천광역시')">인천광역시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectRegion('광주광역시')">광주광역시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectRegion('대전광역시')">대전광역시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectRegion('경기도')">경기도</a></li>
                <li><a class="dropdown-item" href="#" @click="selectRegion('충청북도')">충청북도</a></li>
                <li><a class="dropdown-item" href="#" @click="selectRegion('충청남도')">충청남도</a></li>
                <li><a class="dropdown-item" href="#" @click="selectRegion('전라남도')">전라남도</a></li>
                <li><a class="dropdown-item" href="#" @click="selectRegion('경상북도')">경상북도</a></li>
                <li><a class="dropdown-item" href="#" @click="selectRegion('경상남도')">경상남도</a></li>
                <li><a class="dropdown-item" href="#" @click="selectRegion('세종특별시')">세종특별시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectRegion('제주특별시')">제주특별시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectRegion('강원특별시')">강원특별시</a></li>
                <li><a class="dropdown-item" href="#" @click="selectRegion('전북특별시')">전북특별시</a></li>                
              </ul>
            </div>

            <!-- <button class="btn-primary" @click="saveRegion">다음</button> -->
          </div>
        </div>
        
        <div v-if="selectedRegion">
          <div class="d-flex flex-row p-3 justify-content-end" >
            <div class="bg-white answer mr-2 p-4">
              <p class="text-muted">{{ selectedRegion }}</p>
            </div>
            <img :src=member.memberProfileImage  width="44" height="44" class="rounded-circle">
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
                <input type="text" class="form-control" style="height:2rem;" v-model="keyword" @keydown.enter="submitKeyword">
              </div>

              <button class="btn-primary -1" @click="submitKeyword">입력하기</button>
            </div>
          </div>
        </div>

        <div v-if="submittedKeyword">
          <div class="d-flex flex-row p-3 justify-content-end">
            <div class="bg-white answer mr-2 p-4">
              <p class="text-muted">{{ submittedKeyword }}</p>
            </div>
            <img :src=member.memberProfileImage  width="44" height="44" class="rounded-circle">
          </div>

          <!-- '정책 매칭' 링크 버튼 -->
          <div class="mt-5 mb-5">
            <button class="btn btn-primary mb-2" style="padding:0.75rem 2rem; border-radius:1.5rem;" @click="fetchResults">조회하고 지원받기</button>
          </div>
        </div>

        <!-- 검색 결과 -->
        <div v-if="selectedSubject === '주거지원' && selectedRegion != null && keyword != null && isAllSet === true" class="mt-3">
          <p class="mb-5">{{ results.length }}건이 조회되었습니다.</p>

          <div v-for="(result, index) in results" :key="index">
            <div class="card w-100 mb-3" style="padding:1rem; text-align:left;">
              <div class="card-body">
                  <h5 class="card-title">{{ result.businessOverview }}</h5>
                  <p class="card-text"><b>지역 </b>{{ result.region }} | {{ result.businessClassification }}</p>
                  <p class="card-text"><small class="text-body-secondary"><b>지급기준  </b>{{ result.marriageCriteria }}</small></p>
                  <p class="card-text"><small class="text-body-secondary"><b>소득수준  </b>{{ result.incomeCriteria }}</small></p>
              </div>
            </div>
          </div><!-- v-for -->
        </div><!-- v-if -->

        <div v-else-if="selectedSubject === '양육' && selectedRegion != null && keyword != null && isAllSet === true" class="mt-3">
          <p class="mb-5">{{ results.length }}건이 조회되었습니다.</p>

          <div v-for="(result, index) in results" :key="index">
            <div class="card w-100 mb-3" style="padding:1rem; text-align:left;">
              <div class="card-body">
                  <h5 class="card-title">{{ result.bizNm }}</h5>
                  <p class="card-text"><b>지역  </b>{{ result.sigunNm }}</p>
                  <p class="card-text">{{ result.payment }}</p>
              </div>
            </div>
          </div><!-- v-for -->
        </div><!-- v-if -->

        <div v-if="selectedSubject === '통합지원' && selectedRegion != null && keyword != null && isAllSet === true" class="mt-3">
          <p class="mb-5">{{ results.length }}건이 조회되었습니다.</p>

          <div v-for="(result, index) in results" :key="index">
            <div class="card w-100 mb-3" style="padding:1rem; text-align:left;">
              <div class="card-body">
                  <h5 class="card-title">{{ result.businessOverview }}</h5>
                  <p class="card-text"><b>주관 </b>{{ result.region }} | {{ result.businessEntity }}</p>
                  <span class="text-body-secondary"><b>지원대상  </b>{{ result.supportTarget }}</span>
                  <span class="text-body-secondary" style="color:#C8C8C8;"><b>상세  </b>{{ result.supportDetails.slice(0, 60) }}</span>
                  <span style="color:#C3C3C3;" v-if="result.supportDetails.length > 60">...</span>
              </div>
            </div>
          </div><!-- v-for -->
        </div><!-- v-if -->

      </div>
    </div><!-- container -->

  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      messages: [],
      selectedSubject: null,
      selectedRegion: null,
      submittedKeyword: '',
      results: [],
      member: {},
      isAllSet: false
    };
  },
  async mounted () {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      // 로그인 상태가 있을 경우 Vuex 상태 업데이트
      this.fetchMemberInfo()
    }
  },
  methods: {
    async fetchMemberInfo () {
      try {
        const accessToken = localStorage.getItem('accessToken')

        const response = await axios.get('/api/v1/members/mypage', {
          headers: {
            'Authorization': `Bearer ${accessToken}`   // 토큰 헤더에 추가
          }
        })
        this.member = response.data;
      } catch (error) {
        console.error('회원정보를 불러오지 못했습니다.', error);
      }
    },
    selectRegion (region) {
      this.selectedRegion = region;
    },
    selectSubject (subject) {
      this.selectedSubject = subject;
    },
    submitKeyword () {
      // 제출 버튼 클릭 시 호출되는 메서드
      // submittedKeyword에 입력한 키워드 할당
      this.submittedKeyword = this.keyword;
    },
    async fetchResults () {
      this.isAllSet = true

      try {
        let endpoint = ''
        switch (this.selectedSubject) {
          case '주거지원':
            endpoint = '/api/v1/recommend/getFilteredHousingPolicy'
            break
          case '양육':
            endpoint = '/api/v1/recommend/getFilteredChildcare'
            break
          case '통합지원':
            endpoint = '/api/v1/recommend/getFilteredIntegratedPolicy'
            break
        }
        const accessToken = localStorage.getItem('accessToken')
        const response = await axios.get(endpoint, {
          headers: {
            'Authorization': `Bearer ${accessToken}`   // 토큰 헤더에 추가
          },
          params: {
            region: this.selectedRegion,
            keyword: this.submittedKeyword
          }
        })
        this.results = response.data.content   // 결과
        console.log(this.results)

      } catch (error) {
        console.error('Error fetching results: ', error)
      }
    }
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