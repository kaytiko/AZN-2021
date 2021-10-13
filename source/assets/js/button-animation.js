function buttonSplit (button) {
    let buttonAll = document.querySelectorAll(button);
    buttonAll.forEach(button => button.innerHTML = '<span>' + button.textContent.trim().split('').join('</span><span>') + '</span>')
}


document.addEventListener('DOMContentLoaded', function() {
    if (window.matchMedia("(min-width:720px)").matches){
        buttonSplit('.link-animate');
    }
})
