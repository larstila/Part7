import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Link } from "react-router-dom"
import { Navbar, Nav,Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'



  
const Menu = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">        
          <Nav.Item>
            <Link to='/blogs'> Blogs </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to='/users'> Users </Link>
          </Nav.Item>
          <Button className="btn btn-primary hBack" onClick={() => history.goBack()}>Back</Button>
        <Nav.Item>{user.name} logged in <Button onClick={handleLogout}>Logout</Button></Nav.Item>
      </Navbar>
    </div>
  )
}

export default Menu