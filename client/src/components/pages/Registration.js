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
        var x = document.forms[form_name][input_names[i]];
        
        if (x.value == "") {
            
            alert(`${x.placeholder} must be filled out`);
            return false;
        }
    }
}

const formvalues = 'reg_pass,reg_email,reg_username,reg_pass_check'.split(',')
export class Registration extends Component {
    state={
        email:'',
        username:'',
        password:'',
        visiblePassword:false
    }
    togglePassword = () => {
        this.setState({visiblePassword:!this.state.visiblePassword})
    }


    SubmitRegistration = (e) =>{
        e.preventDefault()

        let {email,username,password}=this.state
        let passConfirm = this.state['confirm password']
        
        if(!ValidateForm('registration_form',formvalues)){
            return
        }


        if(password == passConfirm){
            console.log('password was correctly entered')
            console.log(`Username: ${username}\nEmail:${email}\nUnencrypted Password:${password}`)
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
            <form name ="registration_form" className="Register" style={RegisterLayout}>
                <p style={formInputContainer}><input name='reg_email'       type="text"     onChange={this.onFormChange}    placeholder="email" style={formInputLayout}/></p>
                <p style={formInputContainer}><input name='reg_username'    type="text"     onChange={this.onFormChange}    placeholder="username" style={formInputLayout}/></p>
                <p style={formInputContainer}><input name='reg_pass'        type={this.state.visiblePassword?"text":"password"} onChange={this.onFormChange} placeholder="password" style={formInputLayout}/></p>
                <p style={formInputContainer}>
                    <input name='reg_pass_check' type={this.state.visiblePassword?"text":"password"}     placeholder="confirm password" onChange={this.onFormChange} style={formInputLayout}/> 
                    <input name='cbx_toggle_pass'type='checkbox' checked={this.state.visiblePassword} onChange={this.togglePassword}/>
                    Show Password</p>
                <input name='reg_submit' type = 'submit' onClick={this.SubmitRegistration} text='Submit' style={formSubmitLayout}/>
            </form>
        </fieldset>
        
        <fieldset style={fieldSetLayout}>
            <legend>Sign In</legend>
            <form className="Register" style={RegisterLayout}>
                <p style={formInputContainer}><input type="text" placeholder="email or username" onChange={this.onFormChange} style={formInputLayout}/></p>
                <p style={formInputContainer}>
                    <input type={this.state.visiblePassword?"text":"password"} placeholder="password" onChange={this.onFormChange} style={formInputLayout}/> 
                    <input type='checkbox' checked={this.state.visiblePassword} onChange={this.togglePassword}/>
                    Show Password</p>
            </form>
        </fieldset>
      </div>
    )
  }
}

export default Registration
