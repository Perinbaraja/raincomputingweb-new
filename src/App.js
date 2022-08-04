import PropTypes from "prop-types"
import React from "react"

import { Switch, BrowserRouter as Router, Route } from "react-router-dom"
import { connect } from "react-redux"

// Import Routes all
import { authProtectedRoutes, publicRoutes,adminRoutes } from "./routes"

// Import all middleware
import Authmiddleware from "./routes/route"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

import fakeBackend from "./helpers/AuthType/fakeBackend"

// Activating fake backend
fakeBackend()

import { ChatProvider } from "rainComputing/contextProviders/ChatProvider"
import { useSocket } from "rainComputing/contextProviders/SocketProvider"
import ContactsGrid from "pages/Contacts/contacts-grid"
import LandingGrid from "rainComputing/pages/landing/LandingGrid"
import Admin from "rainComputing/pages/admin/Admin"

const App = () => {
  const { socket } = useSocket()

  return (
    <ChatProvider socket={socket}>
      {/* <NotificationsProvider> */}
      <React.Fragment>
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <HorizontalLayout>
                  <LandingGrid {...props} />
                </HorizontalLayout>
              )}
            />
            {publicRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
                exact
              />
            ))}

            {authProtectedRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={HorizontalLayout}
                component={route.component}
                key={idx}
                isAuthProtected={true}
                exact
              />
            ))}


            {adminRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                layout={VerticalLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
                exact
              />
            ))}
          </Switch>
        </Router>
      </React.Fragment>
      {/* </NotificationsProvider> */}
    </ChatProvider>
  )
}

export default App
