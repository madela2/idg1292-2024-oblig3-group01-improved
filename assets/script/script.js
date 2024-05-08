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
const [parOne, parTwo, parThree, parFour] = [document.querySelector('#scene__paragraph--one'), document.querySelector('#scene__paragraph--two'), document.querySelector('#scene__paragraph--three'), document.querySelector('#scene__paragraph--four')];
const sceneOneSvgs = [forestSvg, bulldozer, treesSvg, deer];
const plantChbx = document.querySelector(".planes__checkbox");
const seed = document.querySelector(".planes__seed");
const seedPath = seed.querySelector(".planes__path");
const sThreeP_two = document.querySelector(".scene__third--second");
const sThreeP_three = document.querySelector(".scene__third--third");
let [activeParOneOpacity, activeParTwoOpacity, forestPatchPosition, paragraphOnePosition, paragraphTwoPosition, activeParThreeOpacity, paragraphThreePosition, paragraphFourPosition, activeParFourOpacity] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let [activeParagraphThree, activeParagraphOne, activeParagraphTwo, activeParagraphFour, secondSceneInitiation, firstPhaseThree, secondPhaseTwo] = [undefined, undefined, undefined, undefined, false, false, false];
let scrollable = true;

scene.removeChild(secondScene);

function InitiatesecondSceneCss() {
    //It appends the drawing of the second scene, not not affecting any text so it can be read by screenreaders regardless.
    !scene[secondSceneInitiation ? 'append' : 'removeChild'](secondScene);

    //adds/removes "dark" modifier to first scene BEM classname: making background darker in scss when scene2 is initated.
    sceneOne.classList[secondSceneInitiation ? 'add' : 'remove']('scene__one--dark');

    //adds/removes "grey" modifier to first scene BEM classname: giving forest patches have less opacity in scss when added.
    patches.forEach(patch => patch.classList[secondSceneInitiation ? 'add' : 'remove']('forest__patch--grey'));

    //Makes all building-id's become BEM modifier classname: for scss animation
    buildings.forEach(building => building.classList.toggle(building.id));

    //gives window their modifier for scss animation
    windows.forEach(window => window.classList[secondSceneInitiation ? 'add' : 'remove'](window.getAttribute('data-windows')));
}

function sceneOnePhaseTwo(event) {
    //gives paragraph 1 their BEM modifer name
    !parOne.classList.contains(parOne.id) ? parOne.classList.add(parOne.id) : null;

    //Makes sure that paragraph 1 is only affected when it has the correct classname
    activeParagraphOne = document.querySelector('.scene__paragraph--one');

    //gives "activeParOneOpacity" numbered value to be used in variable sent to scss
    activeParOneOpacity = ((((window.innerHeight / window.innerHeight * 100) - (activeParagraphOne.getBoundingClientRect().top / window.innerHeight * 100 + activeParagraphOne.getBoundingClientRect().height / window.innerHeight * 100)) / 120) * 2) * 2;

    //gives value to variables used in scssso position is done in css: To allow for scrolling without scrolling the webpage or having overflow.
    //makes sure it can only be affected and done after bulldozer does not have modifier "active"
    !bulldozer.classList.contains('bulldozer__svg--active') ? (event.deltaY < 0 ? paragraphOnePosition++ : paragraphOnePosition--) : null;

    //creates variable with dynamic value which is accessed and managed in scss
    activeParagraphOne.style.setProperty('--paragraph-pos', `${paragraphOnePosition.toString() * 10}px`);
    activeParagraphOne.style.setProperty('--paragraph-opacity', `${activeParOneOpacity.toString()}`);
    headline.style.setProperty('--paragraph-opacity', [headline.getBoundingClientRect().top >= parOne.getBoundingClientRect().top ? 1 : 0]);
}
//gives/removes classname to second paragraph and gives values to variables used in css
function sceneOnePhaseThree(event) {
    //gives paragraph 2 their BEM modifer name
    !parTwo.classList.contains(parTwo.id) ? parTwo.classList.add(parTwo.id) : (parOne.getBoundingClientRect().top > 0 ? parTwo.classList.remove(parTwo.id) + (firstPhaseThree = false) : null);

    //Makes sure that paragraph 2 is only affected when it has the correct classname
    activeParagraphTwo = document.querySelector('.scene__paragraph--two');

    //same as in sceneOnePhaseTwo
    activeParTwoOpacity = (firstPhaseThree ? ((((window.innerHeight / window.innerHeight * 100) - (activeParagraphTwo.getBoundingClientRect().top / window.innerHeight * 100 + activeParagraphTwo.getBoundingClientRect().height / window.innerHeight * 100)) / 120) * 2) * 2 : 0);

    //increases/decrease value of variables used for value stored in variable sent to and accessed in scss
    event.deltaY < 0 ? paragraphTwoPosition++ : paragraphTwoPosition--;
    firstPhaseThree ? activeParagraphTwo.style.setProperty('--paragraph-pos', `${paragraphTwoPosition.toString() * 10}px`) : null;
    firstPhaseThree ? activeParagraphTwo.style.setProperty('--paragraph-opacity', `${activeParTwoOpacity.toString()}`) : null;
}

function sceneTwoPhaseOne(event) {
    //gives BEM name to paragraph 3
    secondSceneInitiation ? (!parThree.classList.contains(parThree.id) ? parThree.classList.add(parThree.id) : null) : (parThree.classList.contains(parThree.id) ? parThree.classList.remove(parThree.id) : null);

    //same as in sceneOnePhaseThree: increase value sent to scss variable
    secondSceneInitiation ? (event.deltaY < 0 ? paragraphThreePosition++ : paragraphThreePosition--) : null;

    //makes sure activeParagraphThree is only refering to paragraph 3 when relevant
    secondSceneInitiation ? activeParagraphThree = document.querySelector('.scene__paragraph--three') : undefined;

    //same as in sceneOnePhaseThree
    activeParThreeOpacity = secondSceneInitiation ? ((((window.innerHeight / window.innerHeight * 100) - (activeParagraphThree.getBoundingClientRect().top / window.innerHeight * 100 + activeParagraphThree.getBoundingClientRect().height / window.innerHeight * 100)) / 120) * 2) * 2 : 0;
    secondSceneInitiation ? activeParagraphThree.style.setProperty('--paragraph-pos', `${paragraphThreePosition.toString() * 10}px`) : null;
    secondSceneInitiation ? activeParagraphThree.style.setProperty('--paragraph-opacity', `${activeParThreeOpacity.toString()}`) : null;
}

function sceneTwoPhaseTwo(event) {
    //gives BEM name to paragraph 4
    secondPhaseTwo ? (!parFour.classList.contains(parFour.id) ? parFour.classList.add(parFour.id) : null) : (parFour.classList.contains(parFour.id) ? parFour.classList.remove(parFour.id) : null);

    //same as in sceneTwoPhaseOne: increase/descrease value of variable and sending to scss
    secondPhaseTwo ? (event.deltaY < 0 ? paragraphFourPosition++ : paragraphFourPosition--) : null;

    //makes sure activeParagraphFour is only refering to paragraph 4 when relevant
    secondPhaseTwo ? activeParagraphFour = document.querySelector('.scene__paragraph--four') : undefined;

    activeParFourOpacity = secondPhaseTwo ? ((((window.innerHeight / window.innerHeight * 100) - (activeParagraphFour.getBoundingClientRect().top / window.innerHeight * 100 + activeParagraphFour.getBoundingClientRect().height / window.innerHeight * 100)) / 120) * 2) * 2 : 0;

    //sending variable to scss
    secondPhaseTwo ? activeParagraphFour.style.setProperty('--paragraph-pos', `${paragraphFourPosition.toString() * 10}px`) : null;
    secondPhaseTwo ? activeParagraphFour.style.setProperty('--paragraph-opacity', `${activeParFourOpacity.toString()}`) : null;
}


//function for managing scene two part three and scene three
function scTwoPthreeScThree(par) {

    //setting boolean pTop(paragraph top) to be true only when paragraph top+height is less than 0
    const pTop = (par.getBoundingClientRect().top + par.getBoundingClientRect().height) / window.innerHeight * 100 < 0;

    //used as a boolean: true when secondScene contains modifier "disabled"
    const list = secondScene.classList.contains('scene__second--disabled');

    //if pTtop = true and list = false it will add modifier to "secondScene" + "sceneThreeContainer" and remove modifier from patches + sceneOne
    pTop && !list ? secondScene.classList.add('scene__second--disabled') + sceneThreeContainer.classList.add('scene__container--active') + patches.forEach(patch => patch.classList.remove('forest__patch--grey')) + sceneOne.classList.remove('scene__one--dark') : null;

    //oposite of above line
    !pTop && list ? secondScene.classList.remove('scene__second--disabled') + sceneThreeContainer.classList.remove('scene__container--active') + (plantChbx.checked = false) + patches.forEach(patch => patch.classList.add('forest__patch--grey')) + sceneOne.classList.add('scene__one--dark') : null;

    //removes modifers when checkbox is unchecked
    !plantChbx.checked ? seed.classList.remove("planes__seed--active") + seedPath.classList.remove("planes__path--active") + sThreeP_two.classList.remove("scene__third--active") + sThreeP_three.classList.remove("scene__third--enabled") : null;

}

document.addEventListener('wheel', (event) => {
    //Managing scrolling so it cannot be done when 3rd scene is initiated: avoid having text keep going up.
    scrollable = (parFour.getBoundingClientRect().top + parFour.getBoundingClientRect().height) / window.innerHeight * 100 < -40 && event.deltaY > 0 ? false : true;
    if (scrollable) {

        //gives patchPosition the value
        const patchPosition = (forestPatchPosition = forestPatchPosition > 0 ? 0 : forestPatchPosition).toString() * 25;

        //increase/descrease value of "forestPatchPosition" depending on scroll and making sure it cannot go past certain points
        leftPatchVal.getBoundingClientRect().left < -40 ? (event.deltaY < 0 ? forestPatchPosition++ : forestPatchPosition--) : sceneOnePhaseTwo(event);
        firstPhaseThree ? sceneOnePhaseThree(event) : null;

        //Sends variable to scss for movable patches so it is managed in scss
        patches.forEach(patch => patch.style.setProperty('--patch-pos', `${patchPosition}px`));

        //calls functions when booleans are either true or false. Bool state and effect is managed in functions
        secondSceneInitiation ? sceneTwoPhaseOne(event) : sceneTwoPhaseOne(event);
        secondPhaseTwo ? sceneTwoPhaseTwo(event) : sceneTwoPhaseTwo(event);
    }
});

const observer = new IntersectionObserver((entries) => {

    //making sure it separates the entries
    entries.forEach((entry) => {

        //setting boolean parOneEntry to be true when following conditions are met
        const parOneEntry = entry.target === parOne && !entry.isIntersecting && entry.target.getBoundingClientRect().top < 0;

        //gives BEM names to elements when parOneEntry = true
        parOneEntry ? bulldozer.classList.add('bulldozer__svg--active') + trees.forEach(el => el.classList.add(el.getAttribute('data-tree'))) : null;
        entry.target === parOne && !parOne.isIntersecting && parOne.getBoundingClientRect().top + parOne.getBoundingClientRect().height > 0 ? trees.forEach(tree => tree.hasAttribute('data-tree') && tree.classList.contains(tree.getAttribute('data-tree')) ? tree.classList.remove(tree.getAttribute('data-tree')) : null) : null;

        //parTwoEntry true when conditions are met
        const parTwoEntry = entry.target === parTwo && parTwo.getBoundingClientRect().top < 0;

        //calls function "InitiatesecondSceneCss" when all conditions are met and manages boolean
        parTwoEntry ? (!entry.isIntersecting ? secondSceneInitiation = true : secondSceneInitiation = false) + InitiatesecondSceneCss() : null;

        //removes modifier from bulldozer when it has gone out of the screen on the left side  +  manages boolean "firstPhaseThree"
        (bulldozer.getBoundingClientRect().left / window.innerWidth) * 100 > 100 ? bulldozer.classList.remove('bulldozer__svg--active') + (firstPhaseThree = true) : null;

        //parThreeTop = top value + height of parThree.
        const parThreeTop = parThree.getBoundingClientRect().top + parThree.getBoundingClientRect().height;

        //adds/removes modifier depending on parThreeTop
        water.classList[parThreeTop < 0 ? 'add' : 'remove']('scene__water--active');

        //manages boolean "secondPhaseTwo" depending on "parThreeTop" value
        secondPhaseTwo = parThreeTop < 0 ? true : false;

        //adds/removes modifier depending on "parThreeTop" value
        allClouds.forEach(cloud => cloud.classList[parThreeTop < 0 ? 'add' : 'remove']('scene__cloud--active'));

        //calls scTwoPthreeScThree
        parFour.isIntersecting ? scTwoPthreeScThree(parFour) : scTwoPthreeScThree(parFour);
    });
},
    {
        root: null,
        rootMargin: '0px',
        threshold: 0
    });

//eventlistener for checkbox. adding modifiers when checked
plantChbx.addEventListener("change", () => {
    if (plantChbx.checked) {
        seed.classList.add("planes__seed--active");
        seedPath.classList.add("planes__path--active");
        sThreeP_two.classList.add("scene__third--active");
        sThreeP_three.classList.add("scene__third--enabled");
    }
});

observer.observe(parOne);
observer.observe(bulldozer);
observer.observe(parTwo);
observer.observe(parThree);
observer.observe(parFour);