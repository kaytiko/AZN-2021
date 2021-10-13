document.addEventListener('DOMContentLoaded', function () {
    let introCircle = document.querySelector('.intro__circle');
    let introStar = document.querySelector('.intro__star');

    document.addEventListener('mousemove', parallax);

    function normalizeOffset(offset, dimension) {
        return ((2 / dimension) * offset) + 1;
    }

    function parallax(e) {
        let normal = {
            x: normalizeOffset(e.clientX, window.innerWidth),
            y: normalizeOffset(e.clientY, window.innerHeight)
        }

        introCircle.style.left = `${Math.floor(normal.x * 150 + 160)}px`;
        introCircle.style.bottom = `${Math.floor(-normal.y * 150 + 285)}px`;
        introStar.style.left = `${Math.floor(normal.x * 70 + 260)}px`;
        introStar.style.bottom = `${Math.floor(-normal.y * 70 + 165)}px`;
    }
});