import {SquareEnum} from './SquareFile';

export default function(array) {
  //OpenQueue & ClosedQueue are lists with objects.
  // These objects contain x,y props.
  var OpenQueue = [],
    ClosedQueue = [],
    pfad = [],
    rueckgabePfad =[];

  var StartNode = { x: 0, y: 0 };
  var Endnode = { x: 0, y: 0 };
  

  //Get mouse and cheese pos and save as start and end-Nodes.
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === SquareEnum.MAUS) {
        StartNode.x = j;
        StartNode.y = i;
      } else if (array[i][j] === SquareEnum.KÄSE) {
        Endnode.x = j;
        Endnode.y = i;
      }
    }
  }


  OpenQueue.push(StartNode);
  // First time the Startnode will be dequeued
  while (OpenQueue.length !== 0) 
  {
    var newObjekt = OpenQueue.splice(0, 1)[0];
  

    // the newObject is the Goalobj. return the path of it
    if (newObjekt.x === Endnode.x && newObjekt.y === Endnode.y)
    {
      rueckgabePfad.push(Endnode);
      while(rueckgabePfad[rueckgabePfad.length-1].x !== StartNode.x || rueckgabePfad[rueckgabePfad.length-1].y !== StartNode.y){
     rueckgabePfad.push(findPredecessorOfPredecessor(pfad,rueckgabePfad[rueckgabePfad.length-1]));
      }
      return rueckgabePfad;
    }
    
  

    for (let neighbor of getNeighbor(array, newObjekt)) 
    {
      //Filter saves the items which have the same condition in a arraylist.
      if (ClosedQueue.filter(n => n.x === neighbor.x && n.y === neighbor.y).length > 0) 
      {
        continue;
      }

      if (isInQueue(ClosedQueue, neighbor)) 
      {
        continue;
      }

      if (!isInQueue(OpenQueue, neighbor)) 
      {

          //distanz = ((x2 - x1)^2 + (y2 - y1)^2)
      pfad.push({ xFrom : newObjekt.x , yFrom : newObjekt.y,xTo: neighbor.x,yTo:neighbor.y}) ;
        OpenQueue.push(neighbor);
      }
    }
    ClosedQueue.push(newObjekt);
  }

  return [ ];
}

// if current node has the same x and y as one of  the nodes in the array true else false.
function isInQueue(queue, TestingNode) {
  for (let NodeInArray of queue) {
    if (TestingNode.x === NodeInArray.x && TestingNode.y === NodeInArray.y) {
      return true;
    }
  }
  return false;
}

function getNeighbor(array, CurrentNode) {
  let { x, y } = CurrentNode;

  var newArray = [];
  if (x - 1 >= 0 && array[y][x - 1] !== SquareEnum.MAUER) {
    newArray.push({ x: x - 1, y });
  }
  if (x + 1 < array[y].length && array[y][x + 1] !== SquareEnum.MAUER) {
    newArray.push({ x: x + 1, y });
  }
  if (y + 1 < array.length && array[y + 1][x] !== SquareEnum.MAUER) {
    newArray.push({ x, y: y + 1 });
  }
  if (y - 1 >= 0 && array[y - 1][x] !== SquareEnum.MAUER) {
    newArray.push({ x, y: y - 1 });
  }

  return newArray;
}



function findPredecessorOfPredecessor(pfad,predecessor){
  for (let ElementInPfad of pfad) {

  
  if(ElementInPfad.xTo === predecessor.x && ElementInPfad.yTo ===  predecessor.y){
    return {x : ElementInPfad.xFrom, y : ElementInPfad.yFrom};
  }

}


}
