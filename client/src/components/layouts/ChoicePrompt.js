import React, { Component } from 'react'
import './ChoicePrompt.css'
export default class ChoicePrompt extends Component {

    handleClick = (choice)=>{
        //this.props.choice(target)
        if(choice.event){
          choice.event()
        }else{
          console.log("No ev found")
          console.log(choice)
        }
    }
  render() {
    let choices = this.props.choice.choices
      console.log(this.props)
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
                        /*
                        .PromptButton{
    background-color: darkcyan;
    text-align: center;
    margin:  5%;
    padding: 5% 8%;
    width: 40%;
} */
                    })}

                    </div>
        </form>
      </div>
    )
  }
}
