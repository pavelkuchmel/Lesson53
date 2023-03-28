let p1 = document.getElementById('p1');
let p2 = document.getElementById('p2');
var draggedElement = false;
var phantomElement = false;
document.onmousedown = function(e){
    e.preventDefault();
    var clickedElement = document.elementFromPoint(e.clientX, e.clientY);
    if(clickedElement.className.indexOf('item') > -1){
        clickedElement.style.opacity = '0.5';
        draggedElement = clickedElement;
    }
}
document.onmousemove = function(e){
    if(draggedElement){
        if(!phantomElement){
            phantomElement = document.createElement('div');
            phantomElement.style.backgroundColor = draggedElement.style.backgroundColor;
            phantomElement.style.left = e.pageX - draggedElement.offsetWidth/2 + 'px';
            phantomElement.style.top = e.pageY - draggedElement.offsetHeight/2 + 'px';
            phantomElement.className = "phantom";
            document.body.appendChild(phantomElement);
        }
        else {
            phantomElement.style.left = e.pageX-phantomElement.offsetWidth/2 + 'px';
            phantomElement.style.top = e.pageY-phantomElement.offsetHeight/2 + 'px';
            phantomElement.style.zIndex = '-1';
            var lowerElement = document.elementFromPoint(e.clientX, e.clientY);
            phantomElement.style.zIndex = '1';
            /*console.log(lowerElement != null);
            console.log(lowerElement != draggedElement);
            console.log(lowerElement.className.indexOf('item'));*/
            if(lowerElement != null && lowerElement != draggedElement && lowerElement.className.indexOf('item') > -1){
                /*console.log(lowerElement.previousElementSibling);
                console.log(window.list.lastChild)
                console.log("lowerElement == window.list.lastChild: " + (lowerElement == window.list.lastChild));
                console.log("e.pageY > (lowerElement.offsetTop + lowerElement.offsetHeight/2): " + (e.pageY > (lowerElement.offsetTop + lowerElement.offsetHeight/2)));
                console.log("lowerElement.offsetTop + lowerElement.offsetHeight/2: " + (lowerElement.offsetTop + lowerElement.offsetHeight/2))
                p1.innerHTML = lowerElement.offsetTop + lowerElement.offsetHeight/2;
                p2.innerHTML = e.pageY;*/
                if(lowerElement == window.list.lastElementChild && e.pageY > (lowerElement.offsetTop + lowerElement.offsetHeight/2)){
                    window.list.removeChild(draggedElement);
                    window.list.appendChild(draggedElement);
                }
                else {
                    //console.log('lowerElement.previousElementSibling: ' + lowerElement.previousElementSibling.style.backgroundColor)
                    //console.log('lowerElement: ' + lowerElement.style.backgroundColor);
                    //console.log('lowerElement.nextElementSibling: ' + lowerElement.nextElementSibling.style.backgroundColor)
                    if(e.pageY > (lowerElement.offsetTop + lowerElement.offsetHeight)){
                        if(lowerElement.previousElementSibling == draggedElement){
                            window.list.removeChild(draggedElement);
                            window.list.insertBefore(draggedElement, lowerElement.nextElementSibling);
                        }
                    }
                    else {
                        window.list.removeChild(draggedElement);
                        window.list.insertBefore(draggedElement, lowerElement);
                    }
                }
            }
        }
    }
}
document.onmouseup = function(e){
    if(draggedElement){
        draggedElement.style.opacity = '1';
        draggedElement = false;
    }
    if(phantomElement){
        document.body.removeChild(phantomElement);
        phantomElement = false;
    }
}