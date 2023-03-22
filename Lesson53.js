let body = document.body;
let div1 = document.getElementById('div1');
let isDrag = false;

body.addEventListener('mouseup', function (event){
    isDrag = false;
    console.log(isDrag);
});

div1.addEventListener('mousedown', function (event){
    isDrag = true;
    console.log(isDrag);
});

body.addEventListener('mousemove', function (event) {
    if (isDrag){
        div1.style.left = event.x - div1.offsetWidth / 2 + 'px';
        div1.style.top = event.y - div1.offsetHeight / 2 +'px';
    }
})