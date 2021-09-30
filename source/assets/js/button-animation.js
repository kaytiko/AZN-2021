function buttonSplit (button) {
    let buttonAll = document.querySelectorAll(button);
    console.log(buttonAll);

    buttonAll.forEach(button => button.innerHTML = '<span>' + button.textContent.trim().split('').join('</span><span>') + '</span>')
}


document.addEventListener('DOMContentLoaded', function() {
    buttonSplit('.link-animate');
})
