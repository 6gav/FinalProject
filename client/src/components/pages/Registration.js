import React, { Component } from 'react'

const RegisterLayout = 
{
    position:'relative',
    background:'#444',
    padding: '0px 10px 5px 5px'
},
formInputLayout=
{
    width: '300px',
    float: 'left',
    textAllign: 'left',
    fontWeight: 'bold'
},
formInputContainer={
    padding: '15px 0px 0px 5px',
},
formSubmitLayout={
    position:'absolute',
    bottom:'0',
    right:'0',
    padding: '5px 5px 5px 5px',
    margin: '10px 10px',
},
fieldSetLayout={
    background:'#ccc'
},
pageLayout={
    position: 'relative',
    background:'#eee',
    height:'100vh',
    width:'100vw',
}

const InsertHTML = (element,where,text) => {
    var el = document.getElementsByName(element)[0]
    if(el){
        el.insertAdjacentText(where,text)
    }
    else{
        console.log(`no html element named ${element}`)
    }
}
const ValidateForm = (form_name,input_names) =>{
    for(let i = 0; i < formvalues.length;i++)
    {
        var x = toString((document.forms[form_name][input_names[i]]).value);
        
        if (x == "") {
            
            alert(`${x.placeholder} must be filled out`);
            return false;
        }
    }
    return true
}

const formvalues = 'reg_pass,reg_email,reg_username,reg_pass_check'.split(',')
export class Registration extends Component {
    state={
        email:'',
        username:'',
        password:'',
        'confirm password':'',
        "username":'',
        visiblePassword:false
    }
    togglePassword = () => {
        this.setState({visiblePassword:!this.state.visiblePassword})
    }

    SubmitLogin = (e) =>{
        e.preventDefault()

        let {password} = this.state
        let account_name = this.state.username

        if(!ValidateForm('login_form',['log_pass','log_cbx_toggle_pass'])){
            return
        }
        let email = '', username = ''
        if(account_name.includes('@')){
            email=account_name
        }else{
            username = account_name
        }
        fetch('/api/loginUser', {
            method: 'POST',
            headers:{
                'Content-Type':'Application/json',
            },
            body: JSON.stringify({
                email:email,
                username:username,
                password:password,
            })
          
          }).then(function(response) {
             return response.json();
          
          }).then(function(json) {
            console.log(json)
          }).catch(function(error) {
            console.log(error);
          });
    }
    SubmitRegistration = (e) =>{
        e.preventDefault()

        let {email,username,password}=this.state
        let passConfirm = this.state['confirm password']
        
        if(!ValidateForm('registration_form',formvalues)){
            return
        }

        if(password === passConfirm){
            if(password.length < 5){
                alert('password is too short')
                return;
            }
            if(!email.includes("@",) && email.includes(".")){
                alert('email is not valid')
                return;
            }

            fetch('/api/registerUser', {
                method: 'POST',
                headers:{
                    'Content-Type':'Application/json',
                },
                body: JSON.stringify({
                    email:email,
                    username:username,
                    password:password,
                })
              
              }).then(function(response) {
                 return response.json();
              
              }).then(function(json) {
                console.log(json)
              }).catch(function(error) {
                console.log(error);
              });
        }
        else{
            //password was incorrect
            //InsertHTML('reg_pass','afterend','<p className="Alert"><b><font color="red">Passwords do not match.</font></b></p>')
        }
    }

    onFormChange = (e) => {
        e.preventDefault()
        this.setState({[e.target.placeholder]:e.target.value})
    }
  render() {
    return (
      <div style={pageLayout}>
        <fieldset style={fieldSetLayout}>
            <legend>Register Here</legend>
            <form name ="registration_form" className="Register" style={RegisterLayout} onSubmit={this.SubmitRegistration}>
                <p style={formInputContainer}><input name='reg_email'       type="text"     onChange={this.onFormChange}    placeholder="email" style={formInputLayout}/></p>
                <p style={formInputContainer}><input name='reg_username'    type="text"     onChange={this.onFormChange}    placeholder="username" style={formInputLayout}/></p>
                <p style={formInputContainer}><input name='reg_pass'        type={this.state.visiblePassword?"text":"password"} onChange={this.onFormChange} placeholder="password" style={formInputLayout}/></p>
                <p style={formInputContainer}>
                    <input name='reg_pass_check' type={this.state.visiblePassword?"text":"password"}     placeholder="confirm password" onChange={this.onFormChange} style={formInputLayout}/> 
                    <input name='reg_cbx_toggle_pass'type='checkbox' checked={this.state.visiblePassword} onChange={this.togglePassword}/>
                    Show Password</p>
                <input name='reg_submit' type = 'submit'  value='Submit' style={formSubmitLayout}/>
            </form>
        </fieldset>
        
        <fieldset style={fieldSetLayout}>
            <legend>Sign In</legend>
            <form name='login_form' className="Login" style={RegisterLayout}>
                <p style={formInputContainer}><input name = 'log_email_username' type="text" placeholder="username" onChange={this.onFormChange} style={formInputLayout}/></p>
                <p style={formInputContainer}>
                    <input name='log_pass' type={this.state.visiblePassword?"text":"password"} placeholder="password" onChange={this.onFormChange} style={formInputLayout}/> 
                    <input name='log_cbx_toggle_pass'type='checkbox' checked={this.state.visiblePassword} onChange={this.togglePassword}/>
                    Show Password</p>
            </form>
        </fieldset>
      </div>
    )
  }
}

export default Registration
