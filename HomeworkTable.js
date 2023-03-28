let body = document.body;
let table = document.getElementById('table');
let targetNum = document.getElementById('target');
let currentNum = document.getElementById('current');
let current = false;
let phantom = false;

function rdmInt(min, max){
    return Math.floor(min + Math.random() * (max + 1 - min));
}

targetNum.innerText = rdmInt(50, 100);

function findCloseOnTarget(){
    let n = false;
    for (const i in document.getElementsByTagName('TD')) {
        if (document.getElementsByTagName('TD')[i].tagName === 'TD'){
            if (!n){
                n = document.getElementsByTagName('TD')[i];
            }
            else {
                if (Math.abs(parseInt(document.getElementsByTagName('TD')[i].innerText) - parseInt(targetNum.innerText)) <= Math.abs(parseInt(n.innerText) - parseInt(targetNum.innerText))){
                    n = document.getElementsByTagName('TD')[i];
                }
            }
        }
    }
    currentNum.innerText = n.innerText;
}

findCloseOnTarget();

addEventListener('mousedown', function (event){
    event.preventDefault();
    event.stopPropagation();
    let clicked = document.elementFromPoint(event.pageX, event.pageY);
    if (clicked.tagName === 'TD'){
        clicked.style.backgroundColor = 'gray';
        current = clicked;
        phantom = document.createElement('div');
        phantom.style.width = clicked.offsetWidth + 'px';
        phantom.style.height = clicked.offsetHeight + 'px';
        phantom.style.opacity = '0.8';
        phantom.innerText = clicked.innerText;
        phantom.style.top = event.pageY - clicked.offsetHeight / 2 + 'px';
        phantom.style.left = event.pageX - clicked.offsetWidth / 2 + 'px';
    }
    if (phantom){
        body.appendChild(phantom);
    }
});

addEventListener('mousemove', function (event){
    if (phantom){
        phantom.style.top = event.pageY - phantom.offsetHeight / 2 + 'px';
        phantom.style.left = event.pageX - phantom.offsetWidth / 2 + 'px';
        phantom.style.zIndex = '-1';
        let lowerElement = document.elementFromPoint(event.pageX, event.pageY);
        phantom.style.zIndex = '1';
        if (lowerElement.tagName === 'TD' && phantom.innerText !== lowerElement.innerText) {
            //currentNum.innerText = parseInt(phantom.innerText) + parseInt(lowerElement.innerText);
        }
    }
});

addEventListener('mouseup', function (event){
    event.stopPropagation();
    let tdArray = document.getElementsByTagName('td');
    phantom.style.zIndex = '-1';
    let lowerElement = document.elementFromPoint(event.pageX, event.pageY);
    phantom.style.zIndex = '1';
    if (lowerElement.tagName === 'TD' && lowerElement !== current) {
        lowerElement.innerText = parseInt(phantom.innerText) + parseInt(lowerElement.innerText);
        current.innerText = rdmInt(1, 20);
    }
    for (const i in tdArray) {
        if (tdArray[i].tagName === 'TD') {
            tdArray[i].style.backgroundColor = 'white';
        }
    }
    findCloseOnTarget();
    if (phantom){
        body.removeChild(phantom);
        phantom = false;
    }
    if (current){
        current = false;
    }
});

