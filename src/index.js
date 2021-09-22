const imageSlides = document.querySelectorAll('.slides .slide');
const leftArrowButton = document.querySelector('.img-slider .arrow.left');
const rightArrowButton = document.querySelector('.img-slider .arrow.right');
const slideNavigationDIV = document.querySelector('.current-slide-navigation');

function getIndexOfChildren(allChildren, currentChild) {
    const index = Array.prototype.indexOf.call(allChildren, currentChild);
    return index;
}

function createMenuButtons() {
    const menuButtonInnerHTML = '<div class="navigation-button"></div>';
    imageSlides.forEach(() => { slideNavigationDIV.innerHTML += menuButtonInnerHTML; });
}

function unmarkButtonSelected() {
    const oldSelectedButton = document.querySelector('.current-slide-navigation .selected');
    oldSelectedButton.classList.remove('selected');
}

function markButtonSelected(index) {
    const selectedButton = slideNavigationDIV.children[index];
    selectedButton.classList.add('selected');
}

function removeSlides() {
    imageSlides.forEach((slide) => slide.classList.remove('selected'));
}

function showSlide(index) {
   const slidesDIV = document.querySelector('.slides');
   const imageDIVtoShow = slidesDIV.children[index];
   imageDIVtoShow.classList.add('selected');
}

function setSlide(index) {
    removeSlides();
    showSlide(index);
    unmarkButtonSelected();
    markButtonSelected(index);
}

function createSelectButtonEventListener() {
    function getClickedMenuButton(e) {
        const clickedButton = e.target.closest('.navigation-button');
        if (clickedButton === null) return;

        const allButtons = slideNavigationDIV.children;
        const indexOfButton = getIndexOfChildren(allButtons, clickedButton);

        setSlide(indexOfButton);
    }

    slideNavigationDIV.addEventListener('click', getClickedMenuButton);
}

function moveRight(currentIndex, maxIndex) {
    let newIndex = currentIndex + 1;
    if (newIndex > maxIndex) newIndex = 0;

    setSlide(newIndex);
}

function moveLeft(currentIndex, maxIndex) {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = maxIndex;

    setSlide(newIndex);
}

function getCurrentIndex() {
    const currentImageDIV = document.querySelector('.slides .selected');
    const indexOfCurrentImage = getIndexOfChildren(imageSlides, currentImageDIV);
    return indexOfCurrentImage;
};

function createArrowButtonEventListener() {
    function setNewIndex(e) {
        const currentIndex = getCurrentIndex();
        const maxIndex = imageSlides.length - 1;
        const isRightButton = () => e.currentTarget.classList.contains('right');
        if (isRightButton()) moveRight(currentIndex, maxIndex);
        if (!isRightButton()) moveLeft(currentIndex, maxIndex);
    }

    leftArrowButton.addEventListener('click', setNewIndex);
    rightArrowButton.addEventListener('click', setNewIndex);
}

function init() {
    createMenuButtons();
    // mark first button selected as first image is shown on startup
    markButtonSelected(0);
    createSelectButtonEventListener();
    createArrowButtonEventListener();

    setInterval(() => {
        const currentIndex = getCurrentIndex();
        const allSlides = imageSlides.length - 1;
        moveRight(currentIndex, allSlides);
    }, 5000);
}

init();
