import Dashboard from "views/Dashboard.jsx";
import Icons from "views/Icons.jsx";
import Map from "views/Map.jsx";
import Notifications from "views/Notifications.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import UserProfile from "views/UserProfile.jsx";
import Leading from 'views/Leading.jsx'
import Beem from 'views/Beem.jsx';

var routes = [
  {
    path: "/beem",
    name: "Beem",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-controller",
    component: Beem,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/map",
    name: "Map",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/network",
    name: "Networks",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-planet",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/campaign",
    name: "Campaign",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-user-run",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/leading",
    name: "Leading",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-chat-33",
    component: Leading,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/admin"
  }
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   rtlName: "ار تي ال",
  //   icon: "tim-icons icon-world",
  //   component: Rtl,
  //   layout: "/rtl"
  // }
];
export default routes;
