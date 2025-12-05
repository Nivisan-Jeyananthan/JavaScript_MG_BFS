import React from "react";

interface ISquareProps {
  value: SquareEnumType;
  onClick: (event: any) => void;
}

function Square(props: ISquareProps) {
  let backgroundPicture: string;

  switch (props.value) {
    case SquareEnum.KÄSE:
      backgroundPicture = SquareEnum.KÄSE;
      break;
    case SquareEnum.MAUER:
      backgroundPicture = SquareEnum.MAUER;
      break;
    case SquareEnum.MAUS:
      backgroundPicture = SquareEnum.MAUS;
      break;
    case SquareEnum.WEG:
      backgroundPicture = SquareEnum.WEG;
      break;
    case SquareEnum.NICHTS:
      backgroundPicture = SquareEnum.NICHTS;
      break;

    default:
      backgroundPicture = SquareEnum.NICHTS;
      break;
  }

  return (
    <div
      className={"square " + backgroundPicture}
      onClick={props.onClick}
      onContextMenu={props.onClick}
    />
  );
}

export default React.memo(Square);

export type SquareEnumType = (typeof SquareEnum)[keyof typeof SquareEnum];

export const SquareEnum = {
  MAUS: "rat",
  MAUER: "wall",
  KÄSE: "cheese",
  NICHTS: "noBackGroundImage",
  WEG: "way",
} as const;
