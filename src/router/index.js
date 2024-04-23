// eslint-disable-next-line
/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import JoinStep01 from "../views/join/JoinStep01.vue";
import LoginView from "../views/LoginView.vue";
import MciHousingPolicy from "../views/MciHousingPolicy.vue";
// import MciIntegratedPolicy from "../views/MciIntegratedPolicy";
import IntegratedPublicRental from "../views/IntegratedPublicRental.vue";
import PurchasedRental from "../views/PurchasedRental.vue";
import LumpsumleaseRental from "../views/LumpsumleaseRental.vue";
import Ahappyhouse from "../views/Ahappyhouse.vue";
import NationalRental from "../views/NationalRental.vue";
import PermanentPublicRental from "../views/PermanentPublicRental.vue";
import Alongtermlumpsumlease from "../views/Alongtermlumpsumlease.vue";
import Publiclysupportedprivatelease from "../views/Publiclysupportedprivatelease.vue";
import Publicsale from "../views/Publicsale.vue";
import NewlywedHopeTown from "../views/NewlywedHopeTown.vue";
import Aspecialsupplyfornewlyweds from "../views/Aspecialsupplyfornewlyweds.vue";
import Thefirstspecialsupplyinoneslife from "../views/Thefirstspecialsupplyinoneslife.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/join",
    name: "join",
    component: JoinStep01,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/mcihousingpolicy",
    name: "MciHousingPolicy",
    component: MciHousingPolicy,
    // {
    //   path: "/mciintegratedpolicy",
    //   name: "MciintegratedPolicy",
    //   component: MciIntegratedPolicy,
    // },
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
