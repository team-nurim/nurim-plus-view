<template>
  <div>
    <main class="mt-5 mb-5">
      <div class="container">
        
        <!-- 모달 팝업 -->
        <div class="black-bg" v-if="selectedPolicy">
          <div class="white-bg">
            <div class="modal-content">
              <!-- 동적으로 모달 내용 조정 -->
              <div v-if="selectedCategory === 'housing'">
                <!-- 주거지원 정보 -->
                <div class="row modal-section">
                  <p class="col-6 detail-box"><strong>사업개요</strong></p>
                  <div
                    class="col-6 info-box"
                    v-html="selectedPolicy.businessOverview"
                  ></div>
                </div>
                <div class="row modal-section">
                  <p class="col-6 detail-box"><strong>지원내용</strong></p>
                  <div
                    class="col-6 info-box"
                    v-html="selectedPolicy.supportDetails"
                  ></div>
                </div>
                <div class="row modal-section">
                  <p class="col-6 detail-box"><strong>사업구분</strong></p>
                  <div
                    class="col-6 info-box"
                    v-html="selectedPolicy.businessClassification"
                  ></div>
                </div>
                <div class="row modal-section">
                  <p class="col-6 detail-box"><strong>소득기준</strong></p>
                  <div
                    class="col-6 info-box"
                    v-html="selectedPolicy.incomeCriteria"
                  ></div>
                </div>
                <div class="row modal-section">
                  <p class="col-6 detail-box"><strong>자산기준</strong></p>
                  <div
                    class="col-6 info-box"
                    v-html="selectedPolicy.assetCriteria"
                  ></div>
                </div>
                <div class="row modal-section">
                  <p class="col-6 detail-box"><strong>결혼기준</strong></p>
                  <div
                    class="col-6 info-box"
                    v-html="selectedPolicy.marriageCriteria"
                  ></div>
                </div>
              </div>
              <div v-if="selectedCategory === 'integrated'">
                <!-- 통합지원 정보 -->
                <div class="row modal-section">
                  <p class="col-6 detail-box"><strong>사업개요</strong></p>
                  <div
                    class="col-6 info-box"
                    v-html="selectedPolicy.businessOverview"
                  ></div>
                </div>
                <div class="row modal-section">
                  <p class="col-6 detail-box"><strong>지원내용</strong></p>
                  <div
                    class="col-6 info-box"
                    v-html="selectedPolicy.supportDetails"
                  ></div>
                </div>
                <div class="row modal-section">
                  <p class="col-6 detail-box"><strong>제공유형</strong></p>
                  <div
                    class="col-6 info-box"
                    v-html="selectedPolicy.offerType"
                  ></div>
                </div>
                <div class="row modal-section">
                  <p class="col-6 detail-box"><strong>지원금액</strong></p>
                  <div
                    class="col-6 info-box"
                    v-html="selectedPolicy.paymentAmount"
                  ></div>
                </div>
                <div class="row modal-section">
                  <p class="col-6 detail-box"><strong>지원대상</strong></p>
                  <div
                    class="col-6 info-box"
                    v-html="selectedPolicy.supportTarget"
                  ></div>
                </div>
              </div>
              <!-- 공통 섹션 -->
              <div class="row modal-section">
                <p class="col-6 detail-box"><strong>사업주체</strong></p>
                <div
                  class="col-6 info-box"
                  v-html="selectedPolicy.businessEntity"
                ></div>
              </div>
              <div class="row modal-section">
                <p class="col-6 detail-box"><strong>홈페이지</strong></p>
                <div class="col-6" style="margin-left: 0.5rem">
                  <button
                    @click="websiteClick"
                    class="btn btn-primary"
                    style="
                      font-size: 1.2rem;
                      font-weight: 400;
                      width: 100%;
                      align-items: center;
                      margin-bottom: 20px;
                    "
                  >
                    바로가기
                  </button>
                </div>
              </div>
            </div>
            <button
              @click="closeModal"
              class="btn btn-primary rounded-pill"
              style="font-size: 23px; font-weight: 600"
            >
              닫기
            </button>
          </div>
        </div>

        <div class="row align-items-center">
          <div class="col mt-3 mb-5">
            <h4>이번 달 가장 인기있는 소식</h4>
          </div>
        </div>

        <!-- 최신 정책 콘텐츠 -->
        <div class="row mb-5">
          <div class="col-md-6 mb-2" v-for="post in posts" :key="post.postId">
            <!-- <router-link
            :to="{ name: 'PostView', params: { postId: post.postId } }"
            style="text-decoration: none; color: inherit"
          > -->
            <div class="card mb-3" @click="goToPostView(post)">
              <div class="row g-0">
                <div class="col-md-4">
                  <img :src="post.thumbImage" class="img-fluid rounded-start" />
                </div>
                <div class="col-md-8">
                  <div class="card-body" style="text-align: left">
                    <h6 class="card-title mb-2">{{ post.postTitle }}</h6>
                    <span class="card-text">
                      {{ post.postContent.slice(0, 30) }}
                      <span v-if="post.postContent.length > 30">...</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- </router-link> -->
          </div>
        </div>
      </div>
    </main>

    <main style="background-color: #eff7ff">
      <div class="container mb-5" style="max-width: 800px">
        <div>
          <div class="row align-items-center mt-5 mb-3">
            <div class="col mt-3 mb-2">
              <h4>한눈에 보는 정부정책</h4>
            </div>
          </div>

          <div class="d-flex flex-column justify-content-between">
            <div class="flex-grow-1">
              <div class="row align-items-center">
                <!-- 지원선택 카테고리 -->
                <div class="col-md-6 mb-3">
                  <div class="form-group row">
                    <label class="col-form-label col-5 mr-1 text-start"
                      >지원선택</label
                    >
                    <div class="col-12">
                      <select
                        class="form-select form-control-lg"
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
                <div class="col-md-6 mb-3">
                  <div class="form-group row">
                    <label class="col-form-label col-5 text-start"
                      >지역정보</label
                    >
                    <div class="col-12">
                      <select
                        class="form-select form-control-lg"
                        v-model="selectedRegion"
                        @change="handleRegionChange"
                      >
                        <option value="all">전체</option>
                        <option value="서울특별시">서울특별시</option>
                        <option value="부산광역시">부산광역시</option>
                        <option value="대구광역시">대구광역시</option>
                        <option value="인천광역시">인천광역시</option>
                        <option value="광주광역시">광주광역시</option>
                        <option value="대전광역시">대전광역시</option>
                        <option value="경기도">경기도</option>
                        <option value="충청북도">충청북도</option>
                        <option value="충청남도">충청남도</option>
                        <option value="전라남도">전라남도</option>
                        <option value="경상북도">경상북도</option>
                        <option value="경상남도">경상남도</option>
                        <option value="세종특별자치시">세종특별시</option>
                        <option value="제주특별자치도">제주특별시</option>
                        <option value="강원특별자치도">강원특별시</option>
                        <option value="전북특별자치도">전북특별시</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- 사업 구분 선택 드롭다운 -->
                <div
                  class="col-md-6 mb-3"
                  v-if="selectedCategory === 'housing'"
                >
                  <div class="form-group row">
                    <label class="col-form-label col-5 text-start"
                      >사업구분</label
                    >
                    <div class="col-12">
                      <select
                        class="form-select form-control-lg"
                        v-model="selectedBusinessClassification"
                        @change="handleBusinessClassificationChange"
                      >
                        <option value="all">전체</option>
                        <option
                          v-if="selectedCategory === 'housing'"
                          value="공공분양"
                        >
                          공공분양
                        </option>
                        <option
                          v-if="selectedCategory === 'housing'"
                          value="공공임대"
                        >
                          공공임대
                        </option>
                        <option
                          v-if="selectedCategory === 'housing'"
                          value="민간분양"
                        >
                          민간분양
                        </option>
                        <option
                          v-if="selectedCategory === 'housing'"
                          value="민간임대"
                        >
                          민간임대
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <!-- 통합지원 제공유형 옵션 추가 예시 -->
                <div
                  class="col-md-6 mb-3"
                  v-if="selectedCategory === 'integrated'"
                >
                  <div class="form-group row">
                    <label class="col-form-label col-5 text-start"
                      >제공유형</label
                    >
                    <div class="col-12">
                      <select
                        class="form-select form-control-lg"
                        v-model="selectedOfferType"
                        @change="handleOfferTypeChange"
                      >
                        <option value="all">전체</option>
                        <option
                          v-if="selectedCategory === 'integrated'"
                          value="현금지급"
                        >
                          현금지급
                        </option>
                        <option
                          v-if="selectedCategory === 'integrated'"
                          value="전자바우처"
                        >
                          전자바우처
                        </option>
                        <option
                          v-if="selectedCategory === 'integrated'"
                          value="현금지급 전자바우처"
                        >
                          현금지급 전자바우처
                        </option>
                        <option
                          v-if="selectedCategory === 'integrated'"
                          value="프로그램 서비스"
                        >
                          프로그램 서비스
                        </option>
                        <option
                          v-if="selectedCategory === 'integrated'"
                          value="기타"
                        >
                          기타
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- 사업주체 선택 드롭다운 -->
                <div class="col-md-6 mb-3">
                  <div class="form-group row">
                    <label class="col-form-label col-5 text-start"
                      >사업주체</label
                    >
                    <div class="col-12">
                      <select
                        class="form-select form-control-lg"
                        v-model="selectedBusinessEntity"
                        @change="handleBusinessEntityChange"
                      >
                        <option value="all">전체</option>
                        <option value="중앙정부">중앙정부</option>
                        <option value="지자체">지자체</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- 검색 버튼 -->
                <div class="row">
                  <button
                    class="btn btn-primary mt-4"
                    @click="fetchPolicies"
                    style="
                      border-radius: 1.5rem;
                      padding: 0.7rem;
                      margin: 0.7rem;
                    "
                  >
                    검색
                  </button>
                </div>
              </div>
              <!-- 리스트 표시 -->
              <div
                v-if="
                  selectedCategory === 'housing' ||
                  selectedCategory === 'integrated'
                "
              >
                <!-- 선택된 카테고리가 주거지원이거나 통합지원일 때에만 표시 -->
                <div v-if="filteredPolicies.length" class="mt-3">
                  <!-- filteredPolicies 배열의 길이가 0이 아닐 때만 표시 -->
                  <!-- 리스트의 개수를 보여주는 부분 -->
                  <div style="text-align: left">
                    <h5 class="text-start pl-2">
                      총 {{ filteredPolicies.length }}건
                    </h5>
                  </div>

                  <hr
                    class="mt-1"
                    style="height: 1px; background-color: #6c757d"
                  />

                  <ul class="policy-list min-vh-100 list-unstyled">
                    <li
                      v-for="(policy, index) in filteredPolicies"
                      :key="policy.id"
                      @click="selectPolicy(policy)"
                      class="text-start pl-5 fs-3"
                      style="font-size: 1rem !important"
                    >
                      {{ policy.businessOverview }}

                      <!-- 마지막 요소가 아닐 때만 hr 태그를 추가합니다 -->
                      <hr
                        v-if="index !== policies.length - 1"
                        style="height: 1px; background-color: #6c757d"
                      />
                    </li>
                  </ul>
                  <hr
                    class="mt-1"
                    style="height: 2px; background-color: #6c757d"
                  />
                  <hr
                    class="mt-1"
                    style="height: 2px; background-color: #6c757d"
                  />
                  <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                      <li
                        class="page-item"
                        :class="{ disabled: currentPage === 1 }"
                      >
                        <a class="page-link" href="#" @click="prevPage"
                          >&laquo;</a
                        >
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
                        <a class="page-link" href="#" @click="nextPage"
                          >&raquo;</a
                        >
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      member: {
        memberId: 0,
        memberEmail: "",
        memberPw: "",
        memberNickname: "",
        memberAge: "",
        gender: false,
        memberResidence: "",
        memberMarriage: false,
        memberIncome: "",
        type: false,
        memberProfileImage: "",
        expertFile: "",
      },
      posts: [],
      policies: [], // 주택 정책 데이터를 저장할 배열
      selectedCategory: null, // 카테고리 선택 초기화
      selectedRegion: "all", // 지역 선택 초기화
      selectedBusinessClassification: "all", // 사업 구분 선택 초기화
      selectedOfferType: "all", // 통합지원에서의 제공유형 선택 초기화
      selectedBusinessEntity: "all", // 사업주체 구분 선택 초기화
      selectedPolicy: null,
      currentPage: 1,
      pageSize: 20,
      pageCount: 0,
      noResultsMessage: "", // 조건에 맞는 데이터가 없을 때 사용자에게 표시될 메시지
      tempSelectedRegion: "all",
      tempSelectedBusinessClassification: "all",
      tempSelectedBusinessEntity: "all",
      tempSelectedOfferType: "all", // 임시 제공 유형
      applyFilter: false,
    };
  },
  async created() {
    const accessToken = localStorage.getItem("accessToken");

    // 페이지 생성 시 로그인 상태 확인
    if (accessToken != null) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    console.log("저장된 토큰: " + accessToken);
    console.log("로그인 여부: " + this.loggedIn);
    // 로그인 된 경우 회원 정보 불러오기
    if (this.loggedIn) {
      await this.fetchMemberInfo();
    }
  },
  mounted() {
    this.fetchMemberInfo();
    this.fetchPosts();
  },
  name: "UpdateMemberInfo",
  computed: {
    ...mapGetters(["getLoggedIn"]),
    memberNickname() {
      return this.member.memberNickname;
    },
    birateralClassification() {
      return this.selectedCategory === "housing"
        ? this.selectedBusinessClassification
        : this.selectedOfferType;
    },
    filteredPolicies() {
      if (!this.applyFilter) {
        return []; // applyFilter가 false면 필터링하지 않고 빈 배열을 반환
      }
      // 검색 버튼 클릭 후 필터링 로직 적용
      if (this.selectedCategory === "housing") {
        return this.policies.filter((policy) => {
          return (
            (this.selectedRegion === "all" ||
              policy.region === this.selectedRegion.toLowerCase().trim()) &&
            (this.selectedBusinessClassification === "all" ||
              policy.businessClassification ===
                this.selectedBusinessClassification.toLowerCase().trim()) &&
            (this.selectedBusinessEntity === "all" ||
              policy.businessEntity ===
                this.selectedBusinessEntity.toLowerCase().trim())
          );
        });
      } else if (this.selectedCategory === "integrated") {
        return this.policies.filter((policy) => {
          return (
            (this.selectedRegion === "all" ||
              policy.region === this.selectedRegion.toLowerCase().trim()) &&
            (this.selectedOfferType === "all" ||
              policy.offerType ===
                this.selectedOfferType.toLowerCase().trim()) &&
            (this.selectedBusinessEntity === "all" ||
              policy.businessEntity ===
                this.selectedBusinessEntity.toLowerCase().trim())
          );
        });
      }
      return [];
    },
  },
  watch: {
    selectedBusinessClassification(newVal, oldVal) {
      console.log(`사업 구분 변경됨: ${oldVal} -> ${newVal}`);
    },
    selectedOfferType(newVal, oldVal) {
      console.log(`제공 유형 변경됨: ${oldVal} -> ${newVal}`);
    },
  },
  methods: {
    handleRegionChange() {
      console.log("지역 정보 변경됨:", this.selectedRegion);
    },

    handleBusinessClassificationChange() {
      console.log("사업 구분 변경됨:", this.selectedBusinessClassification);
    },

    handleBusinessEntityChange() {
      console.log("사업 주체 변경됨:", this.selectedBusinessEntity);
    },
    async fetchMemberInfo() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`/api/v1/members/mypage`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 토큰 헤더에 추가
          },
        });
        // API 응답에 필요한 데이터 member에 할당
        this.member = response.data;
      } catch (error) {
        console.error("회원정보를 불러오지 못했습니다.", error);
      }
    },
    async fetchPosts() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`/api/v1/home/postList`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 토큰 헤더에 추가
            "Content-Type": `application/json`,
          },
        });
        // postId에 따라 데이터 필터링하여 할당
        this.posts = response.data.content;
      } catch (error) {
        console.error("게시물을 불러오지 못했습니다.", error);
      }
    },
    goToPostView(post) {
      // 로그인 확인
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("로그인해주세요.");
        this.$router.push("/login");
      } else {
        this.$router.push({
          name: "PostView",
          params: { postId: post.postId },
        });
      }
    },
    fetchPolicies() {
      console.log("검색 버튼 클릭됨");
      // 만약 선택된 카테고리가 없다면 알림을 표시하고 함수를 종료합니다.
      if (!this.selectedCategory) {
        alert("카테고리를 선택해주세요.");
        return;
      }

      this.applyFilter = true;

      // 콘솔에 선택된 사업 구분, 지역 정보, 사업 주체를 출력합니다.
      console.log(
        "검색 전 선택된 사업 구분:",
        this.tempSelectedBusinessClassification
      );
      console.log("검색 전 선택된 지역 정보:", this.tempSelectedRegion);
      console.log("검색 전 선택된 사업 주체:", this.tempSelectedBusinessEntity);

      // 필터를 적용하기 전에 기존에 선택된 사업 구분, 지역 정보, 사업 주체를 임시로 저장합니다.
      this.tempSelectedBusinessClassification =
        this.selectedBusinessClassification;
      this.tempSelectedRegion = this.selectedRegion;
      this.tempSelectedBusinessEntity = this.selectedBusinessEntity;
      this.tempSelectedOfferType = this.selectedOfferType;

      const accessToken = localStorage.getItem("accessToken");
      // 검색 버튼 클릭 시 로그인 상태 확인
      if (!accessToken) {
        alert("로그인해주세요.");
        this.$router.push("/login");
        return; // 로그인이 되어 있지 않으면 검색을 중단하고 로그인 페이지로 이동
      }

      const apiPath =
        this.selectedCategory === "housing"
          ? "mcihousingpolicy/housingfilter" // 주거지원의 경우
          : "mciintegratedpolicy/integratedfilter"; // 통합지원의 경우

      const params = {
        // category:
        // this.selectedCategory !== "all"
        //     ? this.selectedCategory.toLowerCase().trim()
        //     : undefined,
        region:
          this.tempSelectedRegion !== "all"
            ? this.tempSelectedRegion.toLowerCase().trim()
            : undefined,
        businessEntity:
          this.tempSelectedBusinessEntity !== "all"
            ? this.tempSelectedBusinessEntity.toLowerCase().trim()
            : undefined,
      };

      if (this.selectedCategory === "housing") {
        params.businessClassification =
          this.tempSelectedBusinessClassification !== "all"
            ? this.tempSelectedBusinessClassification.toLowerCase().trim()
            : undefined;
      } else if (this.selectedCategory === "integrated") {
        params.OfferType =
          this.tempSelectedOfferType !== "all"
            ? this.tempSelectedOfferType.toLowerCase().trim()
            : undefined;
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      axios
        .get(`http://localhost:8080/api/v1/${apiPath}`, { params, headers })
        .then((response) => {
          this.policies = response.data;
          // 실제 선택값 업데이트 및 필터 적용
          this.selectedRegion = this.tempSelectedRegion;
          this.selectedBusinessClassification =
            this.tempSelectedBusinessClassification;
          this.selectedBusinessEntity = this.tempSelectedBusinessEntity;
          this.selectedOfferType = this.tempSelectedOfferType;
          this.applyFilter = true;
        })
        .catch((error) => {
          console.error("정책 정보를 불러오는 데 실패했습니다: ", error);
          this.policies = [];
          this.pageCount = 0;
          this.noResultsMessage =
            "정책 정보를 불러오는 데 실패했습니다. 오류: " + error.message;
          this.applyFilter = false;
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
      const baseUrl = process.env.VUE_APP_API_URL || "http://localhost:8081";
      const normalizedOverview = this.selectedPolicy.businessOverview
        .toLowerCase()
        .trim();
      console.log("Website URL:", this.selectedPolicy.website);
      console.log("Normalized businessOverview:", normalizedOverview);

      if (
        this.selectedPolicy.website &&
        this.selectedPolicy.website.trim() !== ""
      ) {
        console.log("Opening website...");
        window.open(this.selectedPolicy.website, "_blank");
      } else {
        switch (normalizedOverview) {
          case "통합공공임대":
            console.log("Redirecting to integrated public rental...");
            window.location.href = `${baseUrl}/integratedPublicRental/1`;
            break;
          case "매입임대":
            window.location.href = `${baseUrl}/purchasedRental/2`;
            break;
          case "전세임대":
            window.location.href = `${baseUrl}/lumpsumleaseRental/3`;
            break;
          case "행복주택":
            window.location.href = `${baseUrl}/ahappyhouse/4`;
            break;
          case "국민임대":
            window.location.href = `${baseUrl}/nationalRental/5`;
            break;
          case "영구임대":
            window.location.href = `${baseUrl}/permanentPublicRental/6`;
            break;
          case "장기전세":
            window.location.href = `${baseUrl}/alongtermlumpsumlease/7`;
            break;
          case "공공지원민간임대":
            window.location.href = `${baseUrl}/publiclysupportedprivatelease/8`;
            break;
          case "뉴:홈공공분양일반형":
            window.location.href = `${baseUrl}/publicsale/9`;
            break;
          case "신혼희망타운":
            window.location.href = `${baseUrl}/newlywedHopeTown/10`;
            break;
          case "민간분양신혼부부 특별공급":
            window.location.href = `${baseUrl}/aspecialsupplyfornewlyweds/11`;
            break;
          case "생애최초 특별공급":
            window.location.href = `${baseUrl}/thefirstspecialsupplyinoneslife/12`;
            break;
          default:
            console.log("Redirecting to default housing policy...");
            window.location.href = `${baseUrl}/mcihousingpolicy`;
            break;
        }
      }
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
  overflow: auto; /* 내용이 넘칠 경우 스크롤 생성 */
}

.white-bg {
  width: 100%; /* 내부 박스 너비 */
  max-width: 900px;
  margin: 1rem;
  height: 90%;
  overflow-y: auto;
  padding: 20px; /* 패딩 */
  background-color: white; /* 백그라운드 컬러 */
  border-radius: 8px; /* 모서리 둥글게 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  text-align: left; /* 모든 내부 텍스트를 왼쪽으로 정렬 */
  display: flex; /* Flexbox를 사용 */
  flex-direction: column; /* 자식 요소들을 수직으로 정렬 */
  justify-content: start; /* 수직 방향의 시작 지점에서 정렬 */
}
.modal-content {
  display: flex;
  flex-direction: column;
}

.modal-section {
  display: flex;
  /* flex-direction: row; */
  align-items: flex-start;
  margin: 10px 20px;
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
  font-size: 1.2rem;
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
  font-size: 1.2rem;
  font-weight: 400;
}

.btn.detail-box {
  width: auto; /* 버튼의 너비를 내용에 맞게 조정 */
  display: inline-block; /* 버튼을 인라인 블록으로 처리 */
  cursor: pointer; /* 마우스 포인터 변경 */
  color: black; /* 글자 색상 조정 */
  text-transform: none; /* 텍스트 변형 없음 */
  box-shadow: none; /* 그림자 제거 */
}

.btn-primary {
  width: 100%;
  margin-top: 20px; /* 모달 내의 버튼과의 간격을 조정합니다. */
  align-self: center; /* 버튼을 가운데로 정렬합니다. */
}

.form-control {
  height: 50px;
}

h6 {
  font-size: 1.2rem;
}

.row {
  display: flex;
  align-items: center;
  justify-content: start;
}

.form-label {
  margin-right: 1rem; /* 레이블과 입력 필드 사이에 공간 추가 */
  width: auto; /* 필요한 만큼 너비를 자동으로 설정 */
  flex-shrink: 0; /* 화면 크기가 줄어들 때 레이블의 크기가 줄어들지 않도록 설정 */
  font-size: 1.2rem; /* 폰트 크기 조정 */
  font-weight: bold; /* 폰트 두께 조정 */
  align-self: start; /* Flex 아이템 수직 중앙 정렬 */
  margin-right: 10px; /* 오른쪽 여백 추가 */
}

.selected {
  background-color: lightblue; /* 선택한 지역의 배경색을 변경 */
  color: black; /* 선택한 지역의 글자색을 변경 */
}

.region-padding {
  padding-top: 10px;
  padding-bottom: 10px;
}

.btn-policy:focus {
  outline: none; /* 클릭 시 포커스 테두리 제거 */
}

.col-md-6 select {
  width: 100%; /* 부모 요소의 100% 너비로 설정 */
}

select option {
  font-size: 0.8rem;
}

.text-start {
  font-size: 0.9rem;
}
</style>
