import getContext from 'modules/context2d.js';

const loopDuration = 3000;
const LINES = 50;
const SIZE = 800;
const context = getContext(SIZE, SIZE/2);
const canvas = context.canvas;

let prevTime;
function draw(startTime, currentTime) {
    let t = currentTime;

    canvas.width=SIZE;
    canvas.height=SIZE/2;

    for(let i=0;i<1e2;i++) {
        context.beginPath();
        context.fillStyle=['#E45','#214','#23C'][i%3];
        context.arc(10+i*20,SIZE/2/2+Math.sin(Math.cos(t%loopDuration * Math.PI *2 /loopDuration)*i)*40,6,1,0.9);
        context.fill();
    }
}

export { draw, loopDuration, canvas };

