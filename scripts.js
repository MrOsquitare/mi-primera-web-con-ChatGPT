const slider = document.querySelector('.slider');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

slider.addEventListener('mousedown', startDrag);
slider.addEventListener('touchstart', startDrag);
slider.addEventListener('mouseup', endDrag);
slider.addEventListener('touchend', endDrag);
slider.addEventListener('mousemove', drag);
slider.addEventListener('touchmove', drag);

function startDrag(event) {
    if (event.type === 'touchstart') {
        startPos = event.touches[0].clientX;
    } else {
        startPos = event.clientX;
        event.preventDefault();
    }
    isDragging = true;
    animationID = requestAnimationFrame(animation);
}

function drag(event) {
    if (isDragging) {
        const currentPosition = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function endDrag() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    const threshold = 100; // Umbral de desplazamiento para cambiar de diapositiva

    if (Math.abs(currentTranslate - prevTranslate) > threshold) {
        if (currentTranslate > prevTranslate) {
            currentIndex -= 1;
        } else {
            currentIndex += 1;
        }
    }

    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex >= 5) {
        currentIndex = 4;
    }

    setPositionByIndex();
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -100;
    prevTranslate = currentTranslate;
    slider.style.transform = `translateX(${currentTranslate}%)`;
}

function animation() {
    slider.style.transform = `translateX(${currentTranslate}%)`;
    if (isDragging) requestAnimationFrame(animation);
}