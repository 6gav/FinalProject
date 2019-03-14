import React from 'react'
import { Link } from 'react-router-dom'
import { link } from 'fs';

export default function Header(props) {
    const linkStyle = {
        color:'#fff',
        textDecoration: 'none'
    }
    const headerStyle = {
        position:'relative',
        flex:'1',
        width: '100vw',
        background: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '10px',
    }
    const authuser = props.hasAuthuser()
  return (
      
    <header style={headerStyle}>
        <h1>Final Project</h1>
        <Link name='btn_home'    style={linkStyle} to="/">Home</Link> |
        <Link name='btn_about'   style={linkStyle} to="/about"> About</Link> |
        <Link name='btn_sign_in'  style={linkStyle} to={authuser?"/profile":"/signin"}>{authuser?" My Profile":" Sign in"}</Link>
    </header>
  )
}
