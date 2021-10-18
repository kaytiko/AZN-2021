const element = document.querySelector("#cursor");
const targetElement = document.querySelectorAll('.target-element')


class Cursor {
    constructor(el) {
        this.el = el;
        this.bind();
    }

    bind() {
        window.addEventListener('mousemove', this.move.bind(this), false);
    }

    move(e) {
        const cursorPosition = {
            left: e.clientX,
            top: e.clientY
        }

        TweenMax.to(this.el, 0.3, {
            left: cursorPosition.left,
            top: cursorPosition.top
        })
    }
}

const cursor = new Cursor(element);
targetElement.forEach(elm => {
    elm.addEventListener("mouseover", function () {
        element.classList.remove("not-active");
        element.classList.add("cursor--expanded");
    });
    elm.addEventListener("mouseleave", function () {
        element.classList.remove("cursor--expanded");
        element.classList.add("not-active");
    });
});