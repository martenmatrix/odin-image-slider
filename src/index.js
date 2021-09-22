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

function createArrowButtonEventListener() {
    function getNewIndex(e) {
        const getCurrentIndex = () => {
            const currentImageDIV = document.querySelector('.slides .selected');
            const indexOfCurrentImage = getIndexOfChildren(imageSlides, currentImageDIV);
            return indexOfCurrentImage;
        };

        let newIndex = getCurrentIndex();
        const isRightButton = () => e.currentTarget.classList.contains('right');
        if (isRightButton()) newIndex += 1;
        if (!isRightButton()) newIndex -= 1;

        const maxIndex = imageSlides.length - 1;
        if (newIndex > maxIndex) newIndex = 0;
        if (newIndex < 0) newIndex = maxIndex;
        return newIndex;
    }

    function executeRequestedSwitch(e) {
        const newIndex = getNewIndex(e);
        setSlide(newIndex);
    }

    leftArrowButton.addEventListener('click', executeRequestedSwitch);
    rightArrowButton.addEventListener('click', executeRequestedSwitch);
}

function init() {
    createMenuButtons();
    // mark first button selected as first image is shown on startup
    markButtonSelected(0);
    createSelectButtonEventListener();
    createArrowButtonEventListener();
}

init();
