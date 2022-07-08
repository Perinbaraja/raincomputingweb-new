import React, { useContext, useState } from "react"
import PropTypes from "prop-types"

const UserContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("authUser"))
  const [currentUser, setCurrentUser] = useState(user)

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.any,
}
