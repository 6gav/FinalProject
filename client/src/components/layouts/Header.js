import React from 'react'
import { Link } from 'react-router-dom'
import { link } from 'fs';

export default function Header(props) {
    const linkStyle = {
        color:'#fff',
        textDecoration: 'none'
    }
    const headerStyle = {
        background: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '10px',
    }
    const authuser = props.hasAuthuser()
  return (
      
    <header style={headerStyle}>
        <h1>Final Project</h1>
        <Link style={linkStyle} to="/">Home</Link> |
        <Link style={linkStyle} to="/about"> About</Link> |
        <Link style={linkStyle} to={authuser?"/profile":"/signin"}>{authuser?" My Profile":" Sign in"}</Link>
        
        
    </header>
  )
}
