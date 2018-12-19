import React from "react";


export default function (props) {

    let hintergrundBild;

    switch (props.value) {
      case SquareEnum.KÄSE:
        hintergrundBild = SquareEnum.KÄSE;
        break;
      case SquareEnum.MAUER:
        hintergrundBild = SquareEnum.MAUER;
        break;
      case SquareEnum.MAUS:
        hintergrundBild = SquareEnum.MAUS;
        break;
        case SquareEnum.WEG:
        
        hintergrundBild= SquareEnum.WEG;
        break;
        case SquareEnum.NICHTS:
        hintergrundBild = SquareEnum.NICHTS;
        break;
        
      default:
        hintergrundBild = SquareEnum.NICHTS;
        break;
        
    }
  
    return (
      <button className={"square " + hintergrundBild} onClick={props.onClick} onContextMenu={props.onClick} />
    );
  }
  

  export var SquareEnum = {

    MAUS : "rat",
    MAUER : "wall",
    KÄSE : "cheese",
    NICHTS : 'noBackGroundImage',
    WEG : 'way'

  };