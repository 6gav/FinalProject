import React from 'react'


const RefButton = (props) =>
{
    return (
        <div className={props.className}>
            <div className="LinkContainer">
                <a className="button" href={props.href}>{props.text}</a>
            </div>
        </div>
    )
}

export default RefButton;