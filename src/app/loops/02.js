import getContext from 'modules/context2d.js';
const SIZE = 500;
const context = getContext(SIZE,SIZE);
const canvas = context.canvas;

let x = 0;

function draw() {
    // set up initial variables
    var ctx = context;
    x++;
      ctx.clearRect(0,0,SIZE,SIZE);
     
    function drawCircle(x){
      ctx.beginPath();
      ctx.arc(x,250,10,0,2*Math.PI);
      ctx.fillStyle="red";
      ctx.fill();
    }


    drawCircle(x%SIZE);
}

export { draw, canvas };

