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
      console.log(this.props)
    return (
      <div className="Prompt">
        <form >
            <div>
                <p className="PromptMessage">{this.props.choice.question}</p>
                </div>
                <div>
                    
                    {
                        this.props.choice.choices.map((choice) =>{
                        return <input className="PromptButton" type="button" value={choice.Action.text} onClick={()=>{this.handleClick(choice);}}/>
                    })}
                    </div>
        </form>
      </div>
    )
  }
}
