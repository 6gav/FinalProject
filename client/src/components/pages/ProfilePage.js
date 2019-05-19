import React, { Component } from 'react'

const CensorEmail = (email)=>{
  let at = email.indexOf('@')
  let domain = email.substr(at,email.length-at)
  let censored = email[0]
  while(censored.length<at){
    censored+="*"
  }
  return (censored+domain);
}
export class ProfilePage extends Component {

  render() {
      let user = this.props.user
      if(user == null){
          return <div>You are not logged in. Please log in to continue.</div>
      }
      let email = CensorEmail(user.email);
    return (
      <div>
        <div>
          <h1>{this.props.user.displayName}</h1>
        </div>
        <p>email: {email}</p>
        <p>uid: {user.uid}</p>
        <button onClick={this.props.LogoutUser}>Log Out</button>
      </div>
    )
  }
}

export default ProfilePage
