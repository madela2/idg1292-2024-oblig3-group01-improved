const buildings = document.querySelectorAll('.scene__building');
const windows = document.querySelectorAll('.scene__window');
const scene = document.querySelector('.scene');
const secondScene = document.querySelector('.scene__second');
const trees = document.querySelectorAll('.forest__tree');
const treesSvg = document.querySelector('.forest__trees');
const sceneOne = document.querySelector('.scene__one');
const bulldozer = document.querySelector('.bulldozer__svg');
const patches = document.querySelectorAll('.forest__patch');
const leftPatchVal = document.querySelector('.forest__patch--left');
const parOne = document.querySelector('.scene__paragraph--one');
const parTwo = document.querySelector('.scene__paragraph--two');
const headline = document.querySelector('.scene__headline');
const buildingTwo = document.querySelector('#scene__building--two');
const forestSvg = document.querySelector('.forest__svg');
const deer = document.querySelector('.forest__deer');
const sceneOneSvgs = [forestSvg, bulldozer, treesSvg, deer];
let activeParOneOpacity = 0, activeParTwoOpacity = 0, forestPatchPosition = 0, paragraphOnePosition = 0,
    paragraphTwoPosition = 0;
let activeParagraphOne, activeParagraphTwo, secondSceneInitiation = false, secondPhaseThree = false;;

scene.removeChild(secondScene);

function InitiatesecondSceneCss() {
    //removes and appends second/city-scene
    !scene[secondSceneInitiation ? 'append' : 'removeChild'](secondScene);
    sceneOne.classList[secondSceneInitiation ? 'add' : 'remove']('scene__one--dark');
    patches.forEach(patch => patch.classList[secondSceneInitiation ? 'add' : 'remove']('forest__patch--grey'));
    buildings.forEach(building => building.classList.toggle(building.id));
    windows.forEach(window => window.classList[secondSceneInitiation ? 'add' : 'remove'](window.getAttribute('data-windows')));
    secondSceneInitiation ? setTimeout(() => buildingTwo.getBoundingClientRect().top / window.innerHeight * 100 === 0 ? sceneOneSvgs.forEach(el => sceneOne.removeChild(el)) : null, 4000) : sceneOne.append(forestSvg, bulldozer, treesSvg, deer);
}

function sceneOnePhaseTwo(event) {
    !parOne.classList.contains('scene__paragraph--oneactive') ? parOne.classList.add('scene__paragraph--oneactive') : null;
    activeParagraphOne = document.querySelector('.scene__paragraph--oneactive');
    //DONT modify below line: Very hard to figure out! Calculation value used in scss for paragraph opacity.
    activeParOneOpacity = ((((window.innerHeight / window.innerHeight * 100) - (activeParagraphOne.getBoundingClientRect().top / window.innerHeight * 100 + activeParagraphOne.getBoundingClientRect().height / window.innerHeight * 100)) / 120) * 2) * 2;
    //gives value to variables used in scssso position is done in css: To allow for scrolling without scrolling the webpage or having overflow
    !bulldozer.classList.contains('bulldozer__svg--active') ? (event.deltaY < 0 ? paragraphOnePosition++ : paragraphOnePosition--) : null;
    activeParagraphOne.style.setProperty('--paragraph-pos', `${paragraphOnePosition.toString() * 15}px`);
    activeParagraphOne.style.setProperty('--paragraph-opacity', `${activeParOneOpacity.toString()}`);
    headline.style.setProperty('--paragraph-opacity', [headline.getBoundingClientRect().top >= parOne.getBoundingClientRect().top ? 1 : 0]);
}
//gives/removes classname to second paragraph and gives values to variables used in css
function sceneOnePhaseThree(event) {
    !parTwo.classList.contains('scene__paragraph--twoactive') ? parTwo.classList.add('scene__paragraph--twoactive') : (parOne.getBoundingClientRect().top > 0 ? parTwo.classList.remove('scene__paragraph--twoactive') + (secondPhaseThree = false) : null);
    activeParagraphTwo = document.querySelector('.scene__paragraph--twoactive');
    activeParTwoOpacity = (secondPhaseThree ? ((((window.innerHeight / window.innerHeight * 100) - (activeParagraphTwo.getBoundingClientRect().top / window.innerHeight * 100 + activeParagraphTwo.getBoundingClientRect().height / window.innerHeight * 100)) / 120) * 2) * 2 : 0);
    event.deltaY < 0 ? paragraphTwoPosition++ : paragraphTwoPosition--;
    secondPhaseThree ? activeParagraphTwo.style.setProperty('--paragraph-pos', `${paragraphTwoPosition.toString() * 15}px`) : null;
    secondPhaseThree ? activeParagraphTwo.style.setProperty('--paragraph-opacity', `${activeParTwoOpacity.toString()}`) : null;
}

document.addEventListener('wheel', (event) => {
    const patchPosition = (forestPatchPosition = forestPatchPosition > 0 ? 0 : forestPatchPosition).toString() * 25;
    leftPatchVal.getBoundingClientRect().left < -10 ? (event.deltaY < 0 ? forestPatchPosition++ : forestPatchPosition--) : sceneOnePhaseTwo(event);
    secondPhaseThree ? sceneOnePhaseThree(event) : null;
    //creating variables to be used in scss
    patches.forEach(patch => patch.style.setProperty('--patch-pos', `${patchPosition}px`));
    //calls function "InitiatesecondSceneCss" and sets "secondSceneInitiation" to false depending on paragraph one position
    ((parTwo.getBoundingClientRect().top + parTwo.getBoundingClientRect().height) / window.innerHeight * 100) > 0 && secondSceneInitiation === true ? (secondSceneInitiation = false) + InitiatesecondSceneCss() : null;
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.target === parOne && !entry.isIntersecting && entry.target.getBoundingClientRect().top < 0) {
            bulldozer.classList.add('bulldozer__svg--active');
            trees.forEach(tree => tree.classList.add(tree.getAttribute('data-tree')));
        }
        if (entry.target === parTwo && !entry.isIntersecting && entry.target.getBoundingClientRect().top < 0) {
            secondSceneInitiation = true;
            InitiatesecondSceneCss();
        }
        (bulldozer.getBoundingClientRect().left / window.innerWidth) * 100 > 100 ? bulldozer.classList.remove('bulldozer__svg--active') + (secondPhaseThree = true) : null;
    });
},
    {
        root: null,
        rootMargin: '0px',
        threshold: 0
    });

observer.observe(parOne);
observer.observe(bulldozer);
observer.observe(parTwo)