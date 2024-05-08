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
const headline = document.querySelector('.scene__headline');
const buildingTwo = document.querySelector('#scene__building--two');
const forestSvg = document.querySelector('.forest__svg');
const deer = document.querySelector('.forest__deer');
const allClouds = document.querySelectorAll('.scene__cloud');
const water = document.querySelector('.scene__water');
const sceneThreeContainer = document.querySelector('.scene__container');
const [parOne, parTwo, parThree, parFour] = [document.querySelector('.scene__paragraph--one'), document.querySelector('.scene__paragraph--two'), document.querySelector('.scene__paragraph--three'), document.querySelector('.scene__paragraph--four')];
const sceneOneSvgs = [forestSvg, bulldozer, treesSvg, deer];
let [activeParOneOpacity, activeParTwoOpacity, forestPatchPosition, paragraphOnePosition, paragraphTwoPosition, activeParThreeOpacity, paragraphThreePosition, paragraphFourPosition, activeParFourOpacity] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let [activeParagraphThree, activeParagraphOne, activeParagraphTwo, activeParagraphFour, secondSceneInitiation, firstPhaseThree, secondPhaseTwo] = [undefined, undefined, undefined, undefined, false, false, false];

scene.removeChild(secondScene);

function InitiatesecondSceneCss() {
    //removes and appends second/city-scene
    !scene[secondSceneInitiation ? 'append' : 'removeChild'](secondScene);
    sceneOne.classList[secondSceneInitiation ? 'add' : 'remove']('scene__one--dark');
    patches.forEach(patch => patch.classList[secondSceneInitiation ? 'add' : 'remove']('forest__patch--grey'));
    buildings.forEach(building => building.classList.toggle(building.id));
    windows.forEach(window => window.classList[secondSceneInitiation ? 'add' : 'remove'](window.getAttribute('data-windows')));
}

function sceneOnePhaseTwo(event) {
    !parOne.classList.contains('scene__paragraph--oneactive') ? parOne.classList.add('scene__paragraph--oneactive') : null;
    activeParagraphOne = document.querySelector('.scene__paragraph--oneactive');
    //DONT modify below line: Very hard to figure out! Calculation value used in scss for paragraph opacity.
    activeParOneOpacity = ((((window.innerHeight / window.innerHeight * 100) - (activeParagraphOne.getBoundingClientRect().top / window.innerHeight * 100 + activeParagraphOne.getBoundingClientRect().height / window.innerHeight * 100)) / 120) * 2) * 2;
    //gives value to variables used in scssso position is done in css: To allow for scrolling without scrolling the webpage or having overflow
    !bulldozer.classList.contains('bulldozer__svg--active') ? (event.deltaY < 0 ? paragraphOnePosition++ : paragraphOnePosition--) : null;
    activeParagraphOne.style.setProperty('--paragraph-pos', `${paragraphOnePosition.toString() * 10}px`);
    activeParagraphOne.style.setProperty('--paragraph-opacity', `${activeParOneOpacity.toString()}`);
    headline.style.setProperty('--paragraph-opacity', [headline.getBoundingClientRect().top >= parOne.getBoundingClientRect().top ? 1 : 0]);
}
//gives/removes classname to second paragraph and gives values to variables used in css
function sceneOnePhaseThree(event) {
    !parTwo.classList.contains('scene__paragraph--twoactive') ? parTwo.classList.add('scene__paragraph--twoactive') : (parOne.getBoundingClientRect().top > 0 ? parTwo.classList.remove('scene__paragraph--twoactive') + (firstPhaseThree = false) : null);
    activeParagraphTwo = document.querySelector('.scene__paragraph--twoactive');
    activeParTwoOpacity = (firstPhaseThree ? ((((window.innerHeight / window.innerHeight * 100) - (activeParagraphTwo.getBoundingClientRect().top / window.innerHeight * 100 + activeParagraphTwo.getBoundingClientRect().height / window.innerHeight * 100)) / 120) * 2) * 2 : 0);
    event.deltaY < 0 ? paragraphTwoPosition++ : paragraphTwoPosition--;
    firstPhaseThree ? activeParagraphTwo.style.setProperty('--paragraph-pos', `${paragraphTwoPosition.toString() * 10}px`) : null;
    firstPhaseThree ? activeParagraphTwo.style.setProperty('--paragraph-opacity', `${activeParTwoOpacity.toString()}`) : null;
}

function sceneTwoPhaseOne(event) {
    secondSceneInitiation ? (!parThree.classList.contains('scene__paragraph--threeactive') ? parThree.classList.add('scene__paragraph--threeactive') : null) : (parThree.classList.contains('scene__paragraph--threeactive') ? parThree.classList.remove('scene__paragraph--threeactive') : null);
    secondSceneInitiation ? (event.deltaY < 0 ? paragraphThreePosition++ : paragraphThreePosition--) : null;
    secondSceneInitiation ? activeParagraphThree = document.querySelector('.scene__paragraph--threeactive') : undefined;
    activeParThreeOpacity = secondSceneInitiation ? ((((window.innerHeight / window.innerHeight * 100) - (activeParagraphThree.getBoundingClientRect().top / window.innerHeight * 100 + activeParagraphThree.getBoundingClientRect().height / window.innerHeight * 100)) / 120) * 2) * 2 : 0;
    secondSceneInitiation ? activeParagraphThree.style.setProperty('--paragraph-pos', `${paragraphThreePosition.toString() * 10}px`) : null;
    secondSceneInitiation ? activeParagraphThree.style.setProperty('--paragraph-opacity', `${activeParThreeOpacity.toString()}`) : null;
}

function sceneTwoPhaseTwo(event) {
    secondPhaseTwo ? (!parFour.classList.contains('scene__paragraph--fouractive') ? parFour.classList.add('scene__paragraph--fouractive') : null) : (parFour.classList.contains('scene__paragraph--fouractive') ? parFour.classList.remove('scene__paragraph--fouractive') : null);
    secondPhaseTwo ? (event.deltaY < 0 ? paragraphFourPosition++ : paragraphFourPosition--) : null;
    secondPhaseTwo ? activeParagraphFour = document.querySelector('.scene__paragraph--fouractive') : undefined;
    activeParFourOpacity = secondPhaseTwo ? ((((window.innerHeight / window.innerHeight * 100) - (activeParagraphFour.getBoundingClientRect().top / window.innerHeight * 100 + activeParagraphFour.getBoundingClientRect().height / window.innerHeight * 100)) / 120) * 2) * 2 : 0;
    secondPhaseTwo ? activeParagraphFour.style.setProperty('--paragraph-pos', `${paragraphFourPosition.toString() * 10}px`) : null;
    secondPhaseTwo ? activeParagraphFour.style.setProperty('--paragraph-opacity', `${activeParFourOpacity.toString()}`) : null;
}

function sceneTwoPhaseThree(par) {
    const pTop = (par.getBoundingClientRect().top + par.getBoundingClientRect().height) / window.innerHeight * 100 < 0;
    const list = secondScene.classList.contains('scene__second--disabled');
    pTop && !list ? secondScene.classList.add('scene__second--disabled') + patches.forEach(patch => patch.classList.remove('forest__patch--grey')) + sceneOne.classList.remove('scene__one--dark') : null;
    !pTop && list ? secondScene.classList.remove('scene__second--disabled') + patches.forEach(patch => patch.classList.add('forest__patch--grey')) + sceneOne.classList.add('scene__one--dark') : null;

}

document.addEventListener('wheel', (event) => {
    const patchPosition = (forestPatchPosition = forestPatchPosition > 0 ? 0 : forestPatchPosition).toString() * 25;
    leftPatchVal.getBoundingClientRect().left < -30 ? (event.deltaY < 0 ? forestPatchPosition++ : forestPatchPosition--) : sceneOnePhaseTwo(event);
    firstPhaseThree ? sceneOnePhaseThree(event) : null;
    patches.forEach(patch => patch.style.setProperty('--patch-pos', `${patchPosition}px`));
    secondSceneInitiation ? sceneTwoPhaseOne(event) : sceneTwoPhaseOne(event);
    secondPhaseTwo ? sceneTwoPhaseTwo(event) : sceneTwoPhaseTwo(event);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const parOneEntry = entry.target === parOne && !entry.isIntersecting && entry.target.getBoundingClientRect().top < 0;
        parOneEntry ? bulldozer.classList.add('bulldozer__svg--active') + trees.forEach(el => el.classList.add(el.getAttribute('data-tree'))) : null;
        entry.target === parOne && !parOne.isIntersecting && parOne.getBoundingClientRect().top + parOne.getBoundingClientRect().height > 0 ? trees.forEach(tree => tree.hasAttribute('data-tree') && tree.classList.contains(tree.getAttribute('data-tree')) ? tree.classList.remove(tree.getAttribute('data-tree')) : null) : null;
        const parTwoEntry = entry.target === parTwo && parTwo.getBoundingClientRect().top < 0;
        parTwoEntry ? (!entry.isIntersecting ? secondSceneInitiation = true : secondSceneInitiation = false) + InitiatesecondSceneCss() : null;
        (bulldozer.getBoundingClientRect().left / window.innerWidth) * 100 > 100 ? bulldozer.classList.remove('bulldozer__svg--active') + (firstPhaseThree = true) : null;
        const parThreeTop = parThree.getBoundingClientRect().top + parThree.getBoundingClientRect().height;
        water.classList[parThreeTop < 0 ? 'add' : 'remove']('scene__water--active');
        secondPhaseTwo = parThreeTop < 0 ? true : false;
        allClouds.forEach(cloud => cloud.classList[parThreeTop < 0 ? 'add' : 'remove']('scene__cloud--active'));
        parFour.isIntersecting ? sceneTwoPhaseThree(parFour) : sceneTwoPhaseThree(parFour);
    });
},
    {
        root: null,
        rootMargin: '0px',
        threshold: 0
    });

observer.observe(parOne);
observer.observe(bulldozer);
observer.observe(parTwo);
observer.observe(parThree);
observer.observe(parFour);