import React from "react";

// Admin Imports
import MainDashboard from "./Pages/admin/default";
import NFTMarketplace from "./Pages/admin/marketplace";
import Profile from "./Pages/admin/profile";
import DataTables from "./Pages/admin/tables";
// import RTLDefault from "./Pages/rtl/default";

// Auth Imports
// import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: "",
    component: MainDashboard, // Pass the reference without JSX
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: "",
    component: NFTMarketplace, // Pass the reference without JSX
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: MdBarChart,
    path: "data-tables",
    component: DataTables, // Pass the reference without JSX
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: "",
    component: Profile, // Pass the reference without JSX
  },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "sign-in",
  //   icon: <MdLock className="h-6 w-6" />,
  //   component: SignIn, // Pass the reference without JSX
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: RTLDefault, // Pass the reference without JSX
  // },
];

export default routes;
