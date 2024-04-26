//This is a temp script. ONLY for testing to be implemented into observer later

//IMPORTANT! DO NOT MODIFY for anything else than scene two!

const buildings = document.querySelectorAll('.scene__building');
const windows = document.querySelectorAll('.scene__window');
const checkBox = document.querySelector('#testbox');
const scene = document.querySelector('.scene');
const secondScene = document.querySelector('.scene__second');
const road = document.querySelector('.scene__road');
const sceneFloor = document.querySelector('#scene__floor--active');
const water = document.querySelector('.scene__water');

scene.removeChild(secondScene);
sceneFloor.removeChild(road);

checkBox.addEventListener('change', () => {
    //removes and appends second/city-scene into <div class="scene">
    scene[checkBox.checked ? 'append' : 'removeChild'](secondScene);

    //gives all buildings the correct classname for css keyframe animation.
    //first activates the "floor" of the scene, then the buildings
    buildings.forEach(building => {
        setTimeout(() => {
            building.classList.toggle(building.id);
        }, building.id === 'scene__floor--active' ? 0 : 300);
    });

    if (checkBox.checked) {
        setTimeout(() => {
            sceneFloor.append(road)
        }, 2000);
        setTimeout(() => {
            road.classList.add(`${road.className}--active`)
        }, 2010);
        setTimeout(() => {
            water.classList.add(`${water.className}--active`)
        }, 9000);
    } else {
        water.classList.remove('scene__water--active')
        road.classList.remove(`scene__road--active`)
        sceneFloor.removeChild(road);
    }

    windows.forEach(window => {
        setTimeout(() => {
            window.classList[checkBox.checked ? 'add' : 'remove'](window.getAttribute('data-windows'));
        }, 1000);
        setTimeout(() => {
            window.classList[checkBox.checked ? 'add' : 'remove']('scene__window--active');
        }, 2500)
    });
});