import React from "react"
import { Redirect } from "react-router-dom"
//Demo

// // Pages Component
import Chat from "../pages/Chat/Chat"

// // File Manager
// import FileManager from "../pages/FileManager/index"

// Profile
// import UserProfile from "../pages/Authentication/user-profile"

// Pages Calendar
// import Calendar from "../pages/Calendar/index"

// //Tasks

// //Projects
import ProjectsGrid from "../pages/Projects/projects-grid"
import ProjectsList from "../pages/Projects/projects-list"
import ProjectsOverview from "../pages/Projects/ProjectOverview/projects-overview"
import ProjectsCreate from "../pages/Projects/projects-create"

// //Ecommerce Pages

//Email

//Invoices

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

//  // Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Login2 from "../pages/AuthenticationInner/Login2"
import Register1 from "../pages/AuthenticationInner/Register"
import Register2 from "../pages/AuthenticationInner/Register2"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import Recoverpw2 from "../pages/AuthenticationInner/Recoverpw2"
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword"
import ForgetPwd2 from "../pages/AuthenticationInner/ForgetPassword2"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"
import LockScreen2 from "../pages/AuthenticationInner/auth-lock-screen-2"
import ConfirmMail from "../pages/AuthenticationInner/page-confirm-mail"
import ConfirmMail2 from "../pages/AuthenticationInner/page-confirm-mail-2"

import TwostepVerification from "../pages/AuthenticationInner/auth-two-step-verification"
import TwostepVerification2 from "../pages/AuthenticationInner/auth-two-step-verification-2"

import ContactsList from "../pages/Contacts/ContactList/contacts-list"
import ContactsProfile from "../pages/Contacts/ContactsProfile/contacts-profile"

//Demo

//popup
import Popup from "../pages/popup/index"

//Landingpage
import LandingPage from "pages/Contacts/landingPage"

//Custom
import RcChat from "rainComputing/pages/Chat"
import RainRegister from "rainComputing/pages/auth/Register"
import RainLogin from "rainComputing/pages/auth/Login"
import UserProfile from "rainComputing/pages/user/Profile"

const authProtectedRoutes = [
  //Crypto

  //chat
  { path: "/chat", component: Chat },

  //Projects
  { path: "/projects-grid", component: ProjectsGrid },
  { path: "/projects-list", component: ProjectsList },
  { path: "/projects-overview", component: ProjectsOverview },
  { path: "/projects-overview/:id", component: ProjectsOverview },
  { path: "/projects-create", component: ProjectsCreate },
  //Blog

  // Contacts
  // { path: "/contacts-grid", component: ContactsGrid },
  { path: "/contacts-list", component: ContactsList },
  { path: "/contacts-profile", component: ContactsProfile },

  //Custom Pages
  { path: "/rc-chat", component: RcChat },
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  // { path: "/", exact: true, component: () => <Redirect to="/contacts-grid" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/popup", component: Popup },

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-login-2", component: Login2 },
  { path: "/pages-register", component: Register1 },
  { path: "/pages-register-2", component: Register2 },
  { path: "/page-recoverpw", component: Recoverpw },
  { path: "/page-recoverpw-2", component: Recoverpw2 },
  { path: "/pages-forgot-pwd", component: ForgetPwd1 },
  { path: "/auth-recoverpw-2", component: ForgetPwd2 },
  { path: "/auth-lock-screen", component: LockScreen },
  { path: "/auth-lock-screen-2", component: LockScreen2 },

  { path: "/auth-two-step-verification", component: TwostepVerification },
  { path: "/auth-two-step-verification-2", component: TwostepVerification2 },

  // { path: "/", component: LandingPage },

  //CUSTOM COMPONENTS
  { path: "/register", component: RainRegister },
  { path: "/login", component: RainLogin },
]

export { authProtectedRoutes, publicRoutes }
