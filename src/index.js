import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "./i18n"
import { Provider } from "react-redux"

import store from "./store"
import { SocketProvider } from "rainComputing/contextProviders/SocketProvider"
import { NotificationsProvider } from "rainComputing/contextProviders/NotificationsProvider"

const app = (
  <Provider store={store}>
    <SocketProvider>
      <NotificationsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificationsProvider>
    </SocketProvider>
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()
