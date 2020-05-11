import React from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom"

const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <Link style={padding} to='/blogs'> blogs </Link>
        <Link style={padding} to='/users'> users </Link>
      </div>
    )
  }

  export default Menu