<template>
  <div class="container">
    <!-- 모달 팝업 -->
    <div class="black-bg" v-if="selectedPolicy">
      <div class="white-bg">
        <div class="modal-content">
          <!-- 각 세부 정보를 modal-section으로 감싸기 -->
          <div class="modal-section">
            <h3 class="detail-box"><strong>사업개요</strong></h3>
            <div
              class="info-box h3"
              v-html="selectedPolicy.businessOverview"
            ></div>
          </div>

          <div class="modal-section">
            <p class="detail-box"><strong>지원내용</strong></p>
            <div class="info-box" v-html="selectedPolicy.supportDetails"></div>
          </div>

          <div class="modal-section">
            <p class="detail-box"><strong>사업구분</strong></p>
            <div
              class="info-box"
              v-html="selectedPolicy.businessClassification"
            ></div>
          </div>

          <div class="modal-section">
            <p class="detail-box"><strong>소득기준</strong></p>
            <div class="info-box" v-html="selectedPolicy.incomeCriteria"></div>
          </div>

          <div class="modal-section">
            <p class="detail-box"><strong>자산기준</strong></p>
            <div class="info-box" v-html="selectedPolicy.assetCriteria"></div>
          </div>

          <div class="modal-section">
            <p class="detail-box"><strong>결혼기준</strong></p>
            <div
              class="info-box"
              v-html="selectedPolicy.marriageCriteria"
            ></div>
          </div>

          <div class="modal-section">
            <p class="detail-box"><strong>사업주체</strong></p>
            <div class="info-box" v-html="selectedPolicy.businessEntity"></div>
          </div>

          <div class="modal-section">
            <p class="detail-box"><strong>홈페이지</strong></p>
            <!-- 버튼 클릭 이벤트에서 URL 유무에 따라 다른 동작을 수행합니다. -->
            <div class="d-flex justify-content-center" style="width: 100%">
              <button @click="websiteClick" class="btn detail-box">
                바로가기
              </button>
            </div>
          </div>
        </div>
        <button @click="closeModal" class="btn btn-secondary rounded-pill">
          닫기
        </button>
      </div>
    </div>
    <div
      class="d-flex flex-column justify-content-between"
      style="min-height: 500px"
    >
      <div class="flex-grow-1">
        <div class="row align-items-center">
          <!-- 지원선택 카테고리 -->
          <div class="col-md">
            <div class="form-group row">
              <label class="col-form-label col-5 mr-1">지원선택</label>
              <div class="col-8">
                <select
                  class="form-control form-control-lg"
                  v-model="selectedCategory"
                >
                  <option disabled selected value="">전체</option>
                  <option value="housing">주거지원</option>
                  <option value="integrated">통합지원</option>
                </select>
              </div>
            </div>
          </div>
          <!-- 지역 정보 선택 드롭다운 -->
          <div class="col-md">
            <div class="form-group row">
              <label class="col-form-label col-5">지역정보</label>
              <div class="col-8">
                <select
                  class="form-control form-control-lg"
                  v-model="selectedRegion"
                >
                  <option value="all">전체</option>
                  <option value="서울특별시">서울특별시</option>
                  <option value="부산광역시">부산광역시</option>
                  <option value="대구광역시">대구광역시</option>
                  <option value="인천광역시">인천광역시</option>
                  <option value="광주광역시">광주광역시</option>
                  <option value="대전광역시">대전광역시</option>
                  <option value="경기도<">경기도</option>
                  <option value="충청북도">충청북도</option>
                  <option value="충청남도">충청남도</option>
                  <option value="전라남도">전라남도</option>
                  <option value="경상북도">경상북도</option>
                  <option value="경상남도">경상남도</option>
                  <option value="세종특별시">세종특별시</option>
                  <option value="제주특별시">제주특별시</option>
                  <option value="강원특별시">강원특별시</option>
                  <option value="전북특별시">전북특별시</option>
                </select>
              </div>
            </div>
          </div>

          <!-- 사업 구분 선택 드롭다운 -->
          <div class="col-md">
            <div class="form-group row">
              <label class="col-form-label col-5">사업구분</label>
              <div class="col-8">
                <select
                  class="form-control form-control-lg"
                  v-model="selectedBusinessClassification"
                >
                  <option value="all">전체</option>
                  <option value="공공분양">공공분양</option>
                  <option value="공공임대">공공임대</option>
                  <option value="민간분양">민간분양</option>
                  <option value="민간임대">민간임대</option>
                </select>
              </div>
            </div>
          </div>

          <!-- 사업주체 선택 드롭다운 -->
          <div class="col-md">
            <div class="form-group row">
              <label class="col-form-label col-5">사업주체</label>
              <div class="col-8">
                <select
                  class="form-control form-control-lg"
                  v-model="selectedBusinessEntity"
                >
                  <option value="all">전체</option>
                  <option value="중앙정부">중앙정부</option>
                  <option value="지자체">지자체</option>
                </select>
              </div>
            </div>
          </div>
          <!-- 검색 버튼 -->
          <div class="col-md" style="height: 100px">
            <button
              class="btn btn-light border border-secondary mt-4"
              @click="fetchPolicies"
              style="width: 50%; height: 45%"
            >
              검색
            </button>
          </div>
          <hr class="mt-4" style="height: 4px; background-color: #6c757d" />
        </div>
        <!-- 리스트 표시 -->
        <div v-if="selectedCategory === 'housing' && filteredPolicies.length">
          <!-- 선택된 카테고리가 주거지원이고, policies 배열에 데이터가 있을 경우에만 표시 -->
          <!-- 리스트의 개수를 보여주는 부분 -->
          <div style="text-align: left">
            <h5 class="text-start pl-2">총 {{ filteredPolicies.length }}건</h5>
          </div>
          <hr class="mt-1" style="height: 2px; background-color: #6c757d" />
          <hr class="mt-1" style="height: 2px; background-color: #6c757d" />
          <ul class="policy-list min-vh-100 list-unstyled">
            <li
              v-for="(policy, index) in filteredPolicies"
              :key="policy.id"
              @click="selectPolicy(policy)"
              class="text-start pl-5 fs-3"
            >
              {{ policy.businessOverview }}
              <!-- 마지막 요소가 아닐 때만 hr 태그를 추가합니다 -->
              <hr
                v-if="index !== filteredPolicies.length - 1"
                style="height: 2px; background-color: #6c757d"
              />
            </li>
          </ul>
          <hr class="mt-1" style="height: 2px; background-color: #6c757d" />
          <hr class="mt-1" style="height: 2px; background-color: #6c757d" />
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click="prevPage">&laquo;</a>
              </li>
              <li
                class="page-item"
                v-for="page in pageCount"
                :key="page"
                :class="{ active: currentPage === page }"
              >
                <a class="page-link" href="#" @click="setPage(page)">{{
                  page
                }}</a>
              </li>
              <li
                class="page-item"
                :class="{ disabled: currentPage === pageCount }"
              >
                <a class="page-link" href="#" @click="nextPage">&raquo;</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

// eslint-disable-next-line /* eslint-disable */
<script>
import axios from "axios";

export default {
  data() {
    return {
      policies: [], // 주택 정책 데이터를 저장할 배열
      selectedCategory: null, // 카테고리 선택 초기화
      selectedRegion: "all", // 지역 선택 초기화
      selectedBusinessClassification: "all", // 사업 구분 선택 초기화
      selectedBusinessEntity: "all", // 사업주체 구분 선택 초기화
      selectedPolicy: null,
      currentPage: 1,
      pageSize: 20,
      pageCount: 0,
      noResultsMessage: "", // 조건에 맞는 데이터가 없을 때 사용자에게 표시될 메시지
      displayPolicies: false, // 리스트 표시 제어를 위한 변수
    };
  },
  computed: {
    filteredPolicies() {
      if (!Array.isArray(this.policies) || this.policies.length === 0) {
        console.log("No policies or policies array is empty."); // 로그: 데이터 배열이 비었는지 확인
        return [];
      }

      let result = this.policies; // 전체 정책 배열 복사
      console.log("Initial policies count:", this.policies.length); // 초기 데이터 개수 로그

      // 지역에 따른 필터링
      if (this.selectedRegion !== "all") {
        result = result.filter((policy) => {
          const match = policy.region === this.selectedRegion;
          console.log(`Filtering by ${this.selectedRegion}: ${match}`); // 각 지역별 필터링 결과 로그
          return match;
        });
      }

      // 사업 구분에 따른 필터링, 데이터베이스 값에 맞춰 필터링
      if (this.selectedBusinessClassification !== "all") {
        result = result.filter((policy) => {
          const match =
            policy.businessClassification ===
            this.selectedBusinessClassification;
          console.log(
            `Filtering by ${this.selectedBusinessClassification}: ${match}`
          );
          return match;
        });
      }

      // 사업 주체에 따른 필터링, 데이터베이스 값에 맞춰 필터링
      if (this.selectedBusinessEntity !== "all") {
        result = result.filter((policy) => {
          const match = policy.businessEntity === this.selectedBusinessEntity;
          console.log(`Filtering by ${this.selectedBusinessEntity}: ${match}`);
          return match;
        });
      }
      console.log("Filtered policies count:", result.length); // 필터링 후 데이터 개수 로그
      console.log("Filtered policies:", result); // 필터링된 결과 로그
      return result;
    },
  },
  methods: {
    fetchPolicies() {
      if (!this.selectedCategory) return; // 카테고리가 선택되지 않은 경우 요청을 보내지 않음
      this.loading = true;
      const params = {};
      if (this.selectedCategory !== "all") {
        params.category = this.selectedCategory;
      }
      if (this.selectedRegion !== "all") {
        params.region = this.selectedRegion;
      }
      if (this.selectedBusinessClassification !== "all") {
        params.businessClassification = this.selectedBusinessClassification;
      }
      if (this.selectedBusinessEntity !== "all") {
        params.businessEntity = this.selectedBusinessEntity;
      }

      axios
        .get(
          `http://localhost:8080/api/${
            this.selectedCategory === "housing"
              ? "mcihousingpolicy"
              : "integratedpolicy"
          }/housingfilter`,
          {
            params,
          }
        )
        .then((response) => {
          console.log("Received data:", response.data); // 로그로 데이터 확인
          if (Array.isArray(response.data) && response.data.length > 0) {
            this.policies = response.data;
            this.pageCount = Math.ceil(this.policies.length / this.pageSize);
            this.noResultsMessage = "";
            console.log("Data is an array with length:", response.data.length);
            console.log("First item in the data:", response.data[0]);
          } else {
            this.policies = [];
            this.pageCount = 0;
            this.noResultsMessage = "조건에 맞는 정책을 찾을 수 없습니다.";
            // 데이터가 반환되지 않은 경우의 로직
            console.log("No data returned or data is not an array.");
          }
        })
        .catch((error) => {
          console.error("Error fetching the policies: ", error);
          this.noResultsMessage =
            "정책 정보를 불러오는 데 실패했습니다. 오류: " + error.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    selectPolicy(policy) {
      this.selectedPolicy = policy; // 선택된 정책을 저장
      console.log("Policy selected:", this.selectedPolicy);
    },
    closeModal() {
      this.selectedPolicy = null; // 모달을 닫고 selectedPolicy를 null로 설정
      console.log("Modal closed and policy deselected.");
    },
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    setPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    // 버튼 클릭 시 실행되는 메서드
    websiteClick() {
      // selectedPolicy에 website URL이 있다면 해당 주소로 이동
      if (this.selectedPolicy.website) {
        window.open(this.selectedPolicy.website, "_blank");
      } else {
        // URL이 없다면 사용자 정의 View 페이지로 이동
        this.$router.push("/custom-view"); // 'custom-view'는 사용자 정의 뷰의 경로로 변경해야 합니다.
      }
    },
  },
  watch: {
    selectedCategory() {
      this.displayPolicies = false; // 카테고리 변경 시 자동으로 리스트를 숨깁니다
    },
  },
};
</script>
<style scoped>
.black-bg {
  position: fixed; /* 고정 위치 */
  top: 0; /* 상단부터 */
  left: 0; /* 좌측부터 */
  width: 100%; /* 전체 너비 */
  height: 100%; /* 전체 높이 */
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검은색 배경 */
  display: flex; /* Flexbox를 사용하여 자식 요소를 중앙에 위치 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  z-index: 1000; /* 다른 요소 위에 표시 */
}

.white-bg {
  width: 50%; /* 내부 박스 너비 */
  height: auto;
  padding: 20px; /* 패딩 */
  background-color: white; /* 백그라운드 컬러 */
  border-radius: 8px; /* 모서리 둥글게 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  text-align: left; /* 모든 내부 텍스트를 왼쪽으로 정렬 */
  display: flex; /* Flexbox를 사용 */
  flex-direction: column; /* 자식 요소들을 수직으로 정렬 */
  justify-content: start; /* 수직 방향의 시작 지점에서 정렬 */
  overflow: auto; /* 내용이 넘칠 경우 스크롤 생성 */
}
.modal-content {
  display: flex;
  flex-direction: column;
}

.modal-section {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 20px; /* 섹션 간 간격 조정 */
}

.detail-box {
  min-width: 150px; /* 최소 너비 설정 */
  border: 1px solid #cccccc; /* 회색 테두리 */
  background-color: rgba(192, 192, 192, 0.5); /* 반투명 회색 배경 */
  padding: 5px; /* 내부 여백 */
  margin-bottom: 10px; /* 요소 사이의 간격 */
  border-radius: 8px; /* 모서리 둥글게 */
  flex-basis: 20%; /* detail-box 너비 설정 */
  flex-shrink: 0; /* 축소하지 않음 */
  text-align: center;
}

.info-box {
  flex-grow: 1; /* 남은 공간을 채우도록 설정 */
  background-color: rgba(255, 255, 255, 0.8); /* 약간의 투명도 */
  padding: 10px; /* 패딩 */
  margin-bottom: 10px; /* 요소간 간격 */
  border-radius: 5px; /* 둥근 모서리 */
  overflow-wrap: break-word; /* 긴 텍스트 줄바꿈 */
  flex-grow: 1; /* 남은 공간을 채우도록 설정 */
  margin-left: 10px; /* detail-box와의 간격 */
}

.btn.detail-box {
  width: auto; /* 버튼의 너비를 내용에 맞게 조정 */
  display: inline-block; /* 버튼을 인라인 블록으로 처리 */
  cursor: pointer; /* 마우스 포인터 변경 */
  color: black; /* 글자 색상 조정 */
  text-transform: none; /* 텍스트 변형 없음 */
  box-shadow: none; /* 그림자 제거 */
}
</style>
