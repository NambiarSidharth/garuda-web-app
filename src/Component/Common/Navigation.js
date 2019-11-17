import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {logOutUser,getCurrentProfile} from "../../Store/actions/authAction"
import Notifications from "./Nofications"
class Navigation extends Component {
  logOutUser(){
    this.props.logOutUser()
  }
  componentDidMount(){
    // const uid = localStorage.getItem('uid')
    // console.log(uid)
    // if(uid){
    //   this.props.getCurrentProfile(uid)
    // }else{
    //   console.log('not logged in')
    // }
  }
    render() {
      const {isAuthenticated} = this.props.auth
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-info">
  <Link to='/' className="navbar-brand">Garuda</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      {/* <li className="nav-item active">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li> */}
      {/* <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li> */}
      {/* <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>
       */}
      {/* {!isAuthenticated?<li className="nav-item">
       <Link to='/auth'className='btn btn-primary'>Auth</Link>
        </li>:null} */}
    </ul>
    <ul className="navbar-nav mr-auto">
      {/* <li className="nav-item active">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li> */}
      {/* <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li> */}
      {/* <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>
       */}
      
    </ul >
    <ul className="navbar-nav mr-auto">
    </ul>
    <ul className="navbar-nav mr-auto">
    </ul>
    <ul className="navbar-nav mr-auto">
    </ul>
    <ul className="navbar-nav mr-auto">
    </ul>
    <ul className="navbar-nav mr-auto">
    </ul>
    <ul className="navbar-nav mr-auto">
    </ul>
    <ul className="navbar-nav mr-auto">
    </ul>
    <ul className="navbar-nav mr-auto">
    </ul>

   {<ul className="navbar-nav mr-auto ml5">
      <li className="nav-item ml5 mr2">
       <Link to='/dashboard' className='btn btn-primary hover-bg-dark-blue'>Dashboard</Link>
      </li>
      <li className="nav-item ml5 mr2">
       <Link to='/stats' className='btn btn-primary hover-bg-dark-blue'>Stats</Link>
      </li>
      <li className="nav-item ml5 mr2">
       <Link to='/reportdata' className='btn btn-primary hover-bg-dark-blue'>Inference</Link>
      </li>
    </ul>}
    {/* <form className="form-inline my-2 my-lg-0">
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}
  </div>
</nav>
<Notifications />
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
  auth:state.auth
})

export default connect(mapStateToProps,{logOutUser,getCurrentProfile})(Navigation)