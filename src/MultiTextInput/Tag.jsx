import React from "react"

export class Tag extends React.Component {
  render() {
    return (
      <span 
        style={{
          padding: ".25em .5em", 
          backgroundColor: "#c8af78",
          margin: "5px",
          color: "white",
          display: "inline-block"
        }}>
        {this.props.children}
        <span
          style={{
            marginLeft: "10px", 
            textDecoration: "none",
          }}>
          x
        </span>
      </span>
    )
  }
}