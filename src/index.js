import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from "./BoardFile.js";





class Game extends React.Component {
  x = 5;
  y = 5;

  constructor(props) {
    super();
    this.state = {
      widthOfSquare: this.x,
      lengthOfSquare: this.y
    };
    this.valueInputWidth = this.valueInputWidth.bind(this);
    this.valueInputLength = this.valueInputLength.bind(this);
    this.doStatus = this.doStatus.bind(this);
  }
  //returns the width as x
  valueInputWidth(widthOfSquare) 
  {
    this.x = Number.parseInt(widthOfSquare.target.value);
  }

  //returns the length as y
  valueInputLength(lengthOfSquare) 
  {
    this.y = Number.parseInt(lengthOfSquare.target.value);
  }


  //sets the state of widthOfSquare and lengthOfSquare
  doStatus()
  {
    this.setState({widthOfSquare:this.x,lengthOfSquare:this.y});
  }

  
  
  
// calls obj class Bord and creates buttons etc.
  render() 
  {
    return (
      <>
      <div>
        
          
          Width :
          <input onChange={this.valueInputWidth} type={"number"}/>
          <br />
          Length :
          <input onChange={this.valueInputLength} type={"number"}/>
          <input type="button" onClick={this.doStatus} value="Submit" />
        </div>

        <div className="game">
          <div className="game-board">
            <Board key={this.state.widthOfSquare+':'+this.state.lengthOfSquare} widthSquare={this.state.widthOfSquare} lengthSqaure={this.state.lengthOfSquare} />
          </div>
        </div>
      </>
    );
  }
}





// ========================================

ReactDOM.render(<Game />, document.getElementById("root"))