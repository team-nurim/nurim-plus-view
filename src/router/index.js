// eslint-disable-next-line
/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import JoinView from "../views/join/JoinView.vue";
import LoginView from "../views/LoginView.vue";
import Mypage from "../views/mypage/Mypage.vue";
import UpdateMemberInfo from "../views/mypage/UpdateMemberInfo.vue";
import UpdateMemberInfo2 from "../views/mypage/UpdateMemberInfo2.vue";
import SwitchAccount from "../views/mypage/SwitchAccount.vue";
import RecommendMain from "../views/RecommendMain.vue";
import Recommend from "../views/Recommend.vue";
import PostView from "../views/policy/PostView.vue";
import CommunityView from "../views/community/Community.vue";
import CommunityDetailView from "../views/community/CommunityDetail.vue";
import CommunityCreateView from "../views/community/CommunityCreateView.vue";
import CommunityUpdate from "../views/community/CommunityUpdate.vue";

import MciHousingPolicy from "../views/MciHousingPolicy.vue";
import IntegratedPublicRental from "../views/policy/policydetails/IntegratedPublicRental.vue";
import PurchasedRental from "../views/policy/policydetails/PurchasedRental.vue";
import LumpsumleaseRental from "../views/policy/policydetails/LumpsumleaseRental.vue";
import Ahappyhouse from "../views/policy/policydetails/Ahappyhouse.vue";
import NationalRental from "../views/policy/policydetails/NationalRental.vue";
import PermanentPublicRental from "../views/policy/policydetails/PermanentPublicRental.vue";
import Alongtermlumpsumlease from "../views/policy/policydetails/Alongtermlumpsumlease.vue";
import Publiclysupportedprivatelease from "../views/policy/policydetails/Publiclysupportedprivatelease.vue";
import Publicsale from "../views/policy/policydetails/Publicsale.vue";
import NewlywedHopeTown from "../views/policy/policydetails/NewlywedHopeTown.vue";
import Aspecialsupplyfornewlyweds from "../views/policy/policydetails/Aspecialsupplyfornewlyweds.vue";
import Thefirstspecialsupplyinoneslife from "../views/policy/policydetails/Thefirstspecialsupplyinoneslife.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/join",
    name: "join",
    component: JoinView,
  },
  {
    path: "/mypage",
    name: "mypage",
    component: Mypage,
  },
  {
    path: "/updateMemberInfo",
    name: "updateMemberInfo",
    component: UpdateMemberInfo,
  },
  {
    path: "/community",
    name: "community",
    component: CommunityView,
  },
  {
    path: "/community/:communityId",
    name: "CommunityDetailView",
    component: CommunityDetailView,
    props: true,
  },
  {
    path: "/CommunityCreate",
    name: "CommunityCreate",
    component: CommunityCreateView,
  },
  {
    path: "/CommunityUpdate/:communityId",
    name: "CommunityUpdate",
    component: CommunityUpdate,
    props: true,
  },
  {
    path: "/updateMemberInfo2",
    name: "updateMemberInfo2",
    component: UpdateMemberInfo2,
  },
  {
    path: "/switchAccount",
    name: "switchAccount",
    component: SwitchAccount,
  },
  {
    path: "/post/read/:postId",
    name: "PostView",
    component: () => import("../views/policy/PostView.vue"),
    props: true,
  },
  {
    path: "/mcihousingpolicy",
    name: "MciHousingPolicy",
    component: MciHousingPolicy,
  },
  {
    path: "/integratedPublicRental/:id",
    name: "IntegratedPublicRental",
    component: IntegratedPublicRental,
  },
  {
    path: "/purchasedRental/:id",
    name: "PurchasedRental",
    component: PurchasedRental,
  },
  {
    path: "/lumpsumleaseRental/:id",
    name: "LumpsumleaseRental",
    component: LumpsumleaseRental,
  },
  {
    path: "/ahappyhouse/:id",
    name: "Ahappyhouse",
    component: Ahappyhouse,
  },
  {
    path: "/nationalRental/:id",
    name: "NationalRental",
    component: NationalRental,
  },
  {
    path: "/permanentPublicRental/:id",
    name: "PermanentPublicRental",
    component: PermanentPublicRental,
  },
  {
    path: "/alongtermlumpsumlease/:id",
    name: "Alongtermlumpsumlease",
    component: Alongtermlumpsumlease,
  },
  {
    path: "/publiclysupportedprivatelease/:id",
    name: "Publiclysupportedprivatelease",
    component: Publiclysupportedprivatelease,
  },
  {
    path: "/publicsale/:id",
    name: "Publicsale",
    component: Publicsale,
  },
  {
    path: "/newlywedHopeTown/:id",
    name: "NewlywedHopeTown",
    component: NewlywedHopeTown,
  },
  {
    path: "/aspecialsupplyfornewlyweds/:id",
    name: "Aspecialsupplyfornewlyweds",
    component: Aspecialsupplyfornewlyweds,
  },
  {
    path: "/thefirstspecialsupplyinoneslife/:id",
    name: "Thefirstspecialsupplyinoneslife",
    component: Thefirstspecialsupplyinoneslife,
  },
  {
    path: "/recommend-main",
    name: " RecommendMain",
    component: () => import("../views/RecommendMain.vue"),
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: () => import("../views/Recommend.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
