import React from 'react'

export default function About(props) {
  let version = props.version;
  return (
    <React.Fragment>
    <h1>About</h1>
    <h2>
      Current version: {version}
    </h2>
    <p>
      The purpose of this application is to serve as
      the Full Sail University capstone project for 
      the authors of the project. 
    </p>
    </React.Fragment>

  )
}
