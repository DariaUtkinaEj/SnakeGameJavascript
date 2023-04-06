let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

let speed = 200;

const buttonEasy = document.querySelector('.button.easy');
const buttonNormal = document.querySelector('.button.normal');
const buttonHard = document.querySelector('.button.hard');
const buttonExtreme = document.querySelector('.button.extreme');

buttonEasy.addEventListener('click', function(e) {
    speed = 1000;
    clearInterval(interval);
    interval = setInterval(() => {
        move();
    }, speed);
});

buttonNormal.addEventListener('click', function(e) {
    speed = 500;
    clearInterval(interval);
    interval = setInterval(() => {
        move();
    }, speed);
});

buttonHard.addEventListener('click', function(e) {
    speed = 200;
    clearInterval(interval);
    interval = setInterval(() => {
        move();
    }, speed);
});

buttonExtreme.addEventListener('click', function(e) {
    speed = 80;
    clearInterval(interval);
    interval = setInterval(() => {
        move();
    }, speed);
});

for (let i=1; i<101; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x = 1,
    y = 10;

for (i=0; i<excel.length; i++) {
    if (x>10) {
        x=1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;
}

function generateSnake() {
    let posX = Math.round(Math.random() * (10-3) + 3);
    let posY = Math.round(Math.random() * (10-1) + 1);
    return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0] - 2) + '"][posY = "' + coordinates[1] + '"]')];

for (let i = 0; i<snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');

let mouse;

function createMouse() {
    function generateMouse() {
        let posX = Math.round(Math.random() * (10-3) + 3);
        let posY = Math.round(Math.random() * (10-1) + 1);
        return [posX, posY];
    }

    let mouseCoordinates = generateMouse();
    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');

    while(mouse.classList.contains('snakeBody') || mouse.classList.contains('mouse')) {
        let mouseCoordinates = generateMouse();
        mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
    }

    mouse.classList.add('mouse');
}

createMouse();

let direction = 'right';
let steps = true;

let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
margin: auto;
margin-top: 40px;
font-size: 30px;
display:block;
`;

let score = 0;
input.value = `Ваши очки: ${score}`;

function move() {
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');
    snakeBody.pop();
    
    if (direction == 'right') {
        if (snakeCoordinates[0] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if (direction == 'left') {
        if (snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if (direction == 'up') {
        if (snakeCoordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]+1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
        }
    } else if (direction == 'down') {
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] -1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
        }
    }
    
    if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
        mouse.classList.remove('mouse');
        let a = snakeBody[snakeBody.length-1].getAttribute('posX');
        let b = snakeBody[snakeBody.length-1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createMouse();
        score++;
        input.value = `Ваши очки: ${score}`;
    }

    if (snakeBody[0].classList.contains('snakeBody')) {
        setTimeout(() => {
            alert(`Game Over! Ваши очки: ${score}`);
        }, 200);

        clearInterval(interval);
        snakeBody[0].style.background = 'url(scream.jpeg) center no-repeat';
        snakeBody[0].style.backgroundSize = "cover";
    }

    if (direction === 'right') {
        snakeBody[0].classList.add('head');
        snakeBody[0].classList.add('direction-right');
    }

    if (direction === 'left') {
        snakeBody[0].classList.add('head');
        snakeBody[0].classList.add('direction-left');
    }

    if (direction === 'up') {
        snakeBody[0].classList.add('head');
        snakeBody[0].classList.add('direction-up');
    }

    if (direction === 'down') {
        snakeBody[0].classList.add('head');
        snakeBody[0].classList.add('direction-down');
    }

    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
    }

    steps = true;
}

// let interval = setInterval(move, 300);

let interval = setInterval(() => {
    move();
}, speed);

window.addEventListener('keydown', function (e) {
    e.preventDefault();
    if (steps = true) {
        if (e.keyCode == 37 && direction!= 'right') {
            const head = document.querySelector('.head');
            head.classList.remove('direction-right');
            head.classList.add('direction-left');
            head.classList.remove('direction-up');
            head.classList.remove('direction-down');
            direction = 'left';
            steps = false;
        }
        else if (e.keyCode == 38 && direction!= 'down') {
            const head = document.querySelector('.head');
            head.classList.remove('direction-right');
            head.classList.remove('direction-left');
            head.classList.add('direction-up');
            head.classList.remove('direction-down');
            direction = 'up';
            steps = false;
        }
        else if (e.keyCode == 39 && direction!= 'left') {
            const head = document.querySelector('.head');
            head.classList.add('direction-right');
            head.classList.remove('direction-left');
            head.classList.remove('direction-up');
            head.classList.remove('direction-down');
            direction = 'right';
            steps = false;
        }
        else if (e.keyCode == 40 && direction!= 'up') {
            const head = document.querySelector('.head');
            head.classList.remove('direction-right');
            head.classList.remove('direction-left');
            head.classList.remove('direction-up');
            head.classList.add('direction-down');
            direction = 'down';
            steps = false;
        }
    }
   
});

