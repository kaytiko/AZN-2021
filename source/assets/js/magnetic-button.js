const magneticElement = document.querySelectorAll('.magnetic-element');
const strength = 50;

magneticElement.forEach((elm) => {
    elm.addEventListener('mousemove', moveMagnet);
    elm.addEventListener('mouseout', function(event) {
      TweenMax.to(event.currentTarget, 1, {x: 0, y: 0, ease: Power4.easeOut})
    });
});

function moveMagnet(event) {
    const magnetButton = event.currentTarget;
    let bounding = magnetButton.getBoundingClientRect();
  
    TweenMax.to( magnetButton, 1, {
      x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * strength,
      y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * strength,
      ease: Power4.easeOut
    })
};