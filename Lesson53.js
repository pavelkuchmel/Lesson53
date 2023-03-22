let body = document.body;
let div1 = document.getElementById('div1');
let container1 = document.getElementById('container1');
let container2 = document.getElementById('container2');
let container3 = document.getElementById('container3');
let isDrag = false;
let color;

function rdmInt(min, max){
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function rdmColor(){
    return 'rgb(' + rdmInt(0, 255) + ',' + rdmInt(0, 255) + ',' + rdmInt(0, 255) + ')';
}

color = rdmColor();

div1.style.backgroundColor = color;

container1.style.backgroundColor = rdmColor();
container2.style.backgroundColor = rdmColor();
container3.style.backgroundColor = rdmColor();
document.getElementById('container' + rdmInt(1, 3)).style.backgroundColor = color;

container2.style.top = body.getClientRects()[0].bottom / 2 - container2.offsetHeight / 2 - body.getClientRects()[0].top + 'px';
container3.style.top = body.getClientRects()[0].bottom - container2.offsetHeight - body.getClientRects()[0].top + 'px';

div1.style.left = rdmInt(body.offsetWidth / 2, body.offsetWidth - div1.offsetWidth) + 'px';
div1.style.top = rdmInt(50, body.offsetHeight - 50) + 'px';

body.addEventListener('mouseup', function (){
    isDrag = false;
    console.log(isDrag);
});

div1.addEventListener('mousedown', function (event){
    isDrag = true;
    console.log(isDrag);
    event.stopPropagation();
});

body.addEventListener('mousemove', function (event) {
    if (isDrag){
        div1.style.left = event.x - body.getClientRects()[0].left - div1.offsetWidth / 2 + 'px';
        div1.style.top = event.y - body.getClientRects()[0].top - div1.offsetHeight / 2 +'px';
    }
});