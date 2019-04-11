import React, { Component } from 'react'
import './ChoicePrompt.css'
export default class ChoicePrompt extends Component {

    handleClick = (choice)=>{
        if(this.props.choice.callback){
          this.props.choice.callback()
          //console.log(`You clicked on: ${choice.Action.text}`)
        }
        if(this.props.OnChoice){
          this.props.OnChoice(choice)
        }
        if(choice.Action)
          {
            //console.log(this.props)
          let b = true;
          if(b){
            
            fetch('/api/responsePrompt', {
              method: 'POST',
              headers:{
                'Content-Type':'Application/json',
              },
              body: JSON.stringify({
                choice:choice
              })
            }).then(function(response) {
              return response.json();
              
            }).then(function(json) {
              console.log(json)
            }).catch(function(error) {
              console.log(error);
            });
          }
            if(choice.event){
              
              console.log("ev found")
              choice.event()
            }
          else
          {
            //console.log(choice)
          }
        }
    }
  render() {
    let choices = this.props.choice.choices
    return (
      <div className="Prompt">
        <form >
            <div>
                <p className="PromptMessage">{this.props.choice.question}</p>
                </div>
                <div>
                    
                    {
                      
                        choices.map((choice) =>{
                        return <input name="prompt_button" style={{backgroundColor:"darkcyan",textAlign:"center",margin:`5% ${choices.length==1?'30':'5'}%`,padding:"5% 8%", width:"40%"}} type="button" value={choice.Action.text} onClick={()=>{this.handleClick(choice);}}/>
                        
                    })}

                    </div>
        </form>
      </div>
    )
  }
}
