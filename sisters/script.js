const circle = document.querySelector('.circle');
const scrollbar = document.querySelector('.scrollbar');
let dragging = false;
let startY = 0;
let startTop = 0;

function updateCircle() {
    const maxTop = scrollbar.offsetHeight - circle.offsetHeight;
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    circle.style.top = scrollPercent * maxTop + 'px';
}

circle.addEventListener('mousedown', (e) => {
    dragging = true;
    startY = e.clientY;
    startTop = parseFloat(circle.style.top) || 0;
});

document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const maxTop = scrollbar.offsetHeight - circle.offsetHeight;
    const newTop = Math.max(0, Math.min(maxTop, startTop + e.clientY - startY));
    circle.style.top = newTop + 'px';
    
    const scrollPercent = newTop / maxTop;
    window.scrollTo(0, scrollPercent * (document.body.scrollHeight - window.innerHeight));
});

document.addEventListener('mouseup', () => {
    dragging = false;
});

window.addEventListener('scroll', updateCircle);
window.addEventListener('load', updateCircle);