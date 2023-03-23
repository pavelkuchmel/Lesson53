let body = document.body;
let div1 = document.getElementById('div1');
let container1 = document.getElementById('container1');
let container2 = document.getElementById('container2');
let container3 = document.getElementById('container3');
let isDrag = false;
let xDiffInDiv;
let yDiffInDiv;
let startingLeft;
let startingTop;
let startingBottom;
let startingRight;
let color;

function rdmInt(min, max){
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function rdmColor(){
    return 'rgb(' + rdmInt(0, 255) + ',' + rdmInt(0, 255) + ',' + rdmInt(0, 255) + ')';
}

function rdmDivPosition(){
    div1.style.left = rdmInt(body.offsetWidth / 2, body.offsetWidth - div1.offsetWidth) + 'px';
    div1.style.top = rdmInt(50, body.offsetHeight - 50) + 'px';
}

function checkDivPos (){
    for (let i in document.getElementsByClassName('container')) {
        let containerClientRect = document.documentElement.getElementsByClassName('container')[i].getBoundingClientRect();
        let div1ClientRect = div1.getBoundingClientRect();
        if (containerClientRect.left <= div1ClientRect.left &&
            containerClientRect.top <= div1ClientRect.top &&
            containerClientRect.bottom >= div1ClientRect.bottom &&
            containerClientRect.right >= div1ClientRect.right
        ){
            if (document.getElementsByClassName('container')[i].style.backgroundColor === div1.style.backgroundColor) {
                console.log(document.getElementsByClassName('container')[i])
                window.location.reload();
                break;
            }
            else{
                /*div1.style.left = startingLeft;
                div1.style.right = startingRight;
                div1.style.top = startingTop;
                div1.style.bottom = startingBottom;*/
                rdmDivPosition();
                break;
            }
        }
    }
}

color = rdmColor();

div1.style.backgroundColor = color;

container1.style.backgroundColor = rdmColor();
container2.style.backgroundColor = rdmColor();
container3.style.backgroundColor = rdmColor();
document.getElementById('container' + rdmInt(1, 3)).style.backgroundColor = color;

container2.style.top = body.getClientRects()[0].bottom / 2 - container2.offsetHeight / 2 - Math.floor(body.getClientRects()[0].top) + 'px';
container3.style.top = body.getClientRects()[0].bottom - container2.offsetHeight - Math.floor(body.getClientRects()[0].top) - 2 + 'px';

rdmDivPosition();

/*div1.style.left = rdmInt(body.offsetWidth / 2, body.offsetWidth - div1.offsetWidth) + 'px';
div1.style.top = rdmInt(50, body.offsetHeight - 50) + 'px';*/

/*startingLeft = div1.style.left;
startingTop = div1.style.top;
startingBottom = div1.style.bottom;
startingRight = div1.style.right;*/

body.addEventListener('mouseup', function (){
    isDrag = false;
    checkDivPos();
});

div1.addEventListener('mousedown', function (event){
    if (!isDrag) {
        xDiffInDiv = event.x - div1.getBoundingClientRect().left;
        yDiffInDiv = event.y - div1.getBoundingClientRect().top;
    }
    //console.log(xDiffInDiv);
    //console.log(yDiffInDiv);
    isDrag = true;
    /*startingLeft = div1.style.left;
    startingTop = div1.style.top;
    startingBottom = div1.style.bottom;
    startingRight = div1.style.right;*/
    event.stopPropagation();
});

body.addEventListener('mousemove', function (event) {
    if (isDrag){
        div1.style.left = event.x - body.getClientRects()[0].left - xDiffInDiv + 'px';
        div1.style.top = event.y - body.getClientRects()[0].top - yDiffInDiv + 'px';
    }
});