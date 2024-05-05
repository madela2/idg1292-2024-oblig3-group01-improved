//This is a temp script. ONLY for testing to be implemented into observer later
//IMPORTANT! DO NOT MODIFY for anything else than scene two!

const buildings = document.querySelectorAll('.scene__building');
const windows = document.querySelectorAll('.scene__window');
const scene = document.querySelector('.scene');
const secondScene = document.querySelector('.scene__second');
const road = document.querySelector('.scene__road');
const sceneFloor = document.querySelector('#scene__floor--active');
const water = document.querySelector('.scene__water');
let initiated = false;

//for intersectional observer
let number = 0
let secondSceneInitiation = false;
const textBox = document.querySelector('.textBox')

scene.removeChild(secondScene);
sceneFloor.removeChild(road);

function InitiatesecondSceneCss() {
    //removes and appends second/city-scene into <div class="scene">
    scene[secondSceneInitiation ? 'append' : 'removeChild'](secondScene);

    //gives all buildings the correct classname for css keyframe animation.
    //first activates the "floor" of the scene, then the buildings
    buildings.forEach(building => {
        setTimeout(() => {
            building.classList.toggle(building.id);
        }, building.id === 'scene__floor--active' ? 0 : 300);
    });

    if (secondSceneInitiation) {
        setTimeout(() => {
            sceneFloor.append(road)
        }, 2000);
        setTimeout(() => {
            road.classList.add(`${road.className}--active`)
        }, 2010);
        setTimeout(() => {
            water.classList.add(`${water.className}--active`)
        }, 3500);
    } else {
        water.classList.remove('scene__water--active')
        road.classList.remove(`scene__road--active`)
        sceneFloor.removeChild(road);
    }

    //initiates windows by adding names to classlist when relevant. Removes when going back
    windows.forEach(window => {
        if (secondSceneInitiation) {
            setTimeout(() => {
                window.classList.add(window.getAttribute('data-windows'));
            }, 1000);
            setTimeout(() => {
                window.classList.add('scene__window--active');
            }, 2500);
        }
        else {
            window.classList.remove(window.getAttribute('data-windows'));
            window.classList.remove(window.getAttribute('scene__window--active'));
        }
    });
}

//making the text scrollable without causing the webpage to scroll
document.addEventListener('wheel', (event) => {
    event.deltaY < 0 ? number++ : number--;
    const position = number.toString() * 8;
    //check that this is accepted. if not, find a different way of doing it.
    textBox.style.setProperty('--y-pos', `${position}px`);
});


//initiates second scene when text from previous scene is scrolled out of window on (top only)
const secondObserver = new IntersectionObserver((entry) => {
    //managing bolean so that "removechild" initiated further up does not happen before element has been appended
    textBox.getBoundingClientRect().top < 0 ? initiated = true : null;

    //managing bolean which is used in function running scene 2
    secondSceneInitiation = textBox.getBoundingClientRect().top <= 0 ? true : false;
    initiated ? (!entry[0].isIntersecting ? InitiatesecondSceneCss() : InitiatesecondSceneCss()) : null;
},
    {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    });
secondObserver.observe(textBox);
