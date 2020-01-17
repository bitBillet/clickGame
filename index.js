
// переменные для минут, секунд, миллисекунд и счетчик при нажатии "Старт" timeCount
'use strict';
let sec = 0,
    min = 0,
    ms = 0,
    timerCount = 0,
    buttn = document.getElementById('start');
// массивы для хранения цветов и кубов по классу
let colors = ['red', 'blue', 'pink', 'yellow', 'lime', 'brown', 'green', 'purple'];
let blocks = document.getElementsByClassName('coub');
let divColor = {};
// присваиваем рандомному номеру блока цвет
for (let d = 0, c = 0; d < blocks.length; d++) {
    let randBlock = Math.floor(Math.random() * blocks.length);
    while (divColor[randBlock]) {
        randBlock = Math.floor(Math.random() * blocks.length);
    }
    if (c >= 8) c = 0;
    divColor[randBlock] = colors[c];
    c++;
}
// функция при нажатии "Старт"
function start() {
    if (timerCount == 0) {
        timerCount = 1;
        field.style.cursor = 'pointer';
        begin();
    }
}
// функция расчета и выведения в контент таймера
function begin() {
    // проверка нажатия "Старт"
    if (timerCount == 1) {
        // функция генерации миллисекунд
        let timerMs = setTimeout(function () {
            ms++;
            begin();
        }, 1);
        // генерация секунд, значение 210 взято на глаз))
        if (ms == 210) {
            ms = 0;
            sec++;
        }
        // генерация минут
        if (sec == 60) {
            sec = 0;
            min++;
        }
        let seconds = sec < 10 ? '0' + sec : sec,
            minutes = min < 10 ? '0' + min : min,
            milliseconds = ms < 10 ? '00' + ms : ms < 100 && ms > 10 ? '0' + ms : ms;
        timer.textContent = minutes + ':' + seconds + '.' + milliseconds;
    }
    // при ошибке игры обнулить счетчик
}
// переменные-счетчики для генерации цветов и клика по блокам
let clickCounter = 0;
let previousCoub = ' ';
let previousColor = ' ';

function clickCoub(i) {
    // проверка нажатия "Старт"
    if (timerCount == 1) {
        // let randColor = Math.floor(Math.random() * colors.length);
        let currentCoub = blocks[i];
        clickCounter++;
        let color = divColor[i];
        // при втором нажатии следующего куба переходить в функцию проверки куба
        if (clickCounter > 1) checkCoub(currentCoub, color);
        // при первом нажатии присвоить рандомный цвет кубу
        else {
            currentCoub.style.background = color;
        }
        // предыдущий куб, цвет
        previousCoub = currentCoub;
        previousColor = color;
    }
}
let checkCount = 1;
// функция проверки кубов на совпадение по цветам
function checkCoub(currentCoub, color) {
    // ошибка при повторном нажатии на одиночный цветной куб
    if (currentCoub.style.background) {
        return;
    }
    // проверка блока на попадание в повторный цвет
    else if (color == previousColor && checkCount % 2) {
        currentCoub.style.background = color;
        colors.splice(color, 1);
        currentCoub.onclick = " ";
        previousCoub.onclick = " ";
    }
    // действие при нажатии для очередного открытия цвета
    else if (checkCount % 2 == 0) {
        currentCoub.style.background = color;
    }
    // действие при безуспешной попытке нахождения блоку пары
    else {
        currentCoub.style.background = color;
        // обертка в связи с тем что setTimeout не видит глобальный previousCoub
        (function (previousCoub) {
            setTimeout(() => {
                currentCoub.style.background = '';
                previousCoub.style.background = '';
            }, 300);
        })(previousCoub);
    }
    checkCount++;
    // при опусташении массива с цветами вывести итоговое время и оповестить о победе
    if (colors.length == 0) {
        timerCount = 0;
        setTimeout(function () {
            alert('Вы выиграли! \n\n Затраченное время: ' + timer.textContent);
            buttn.onclick = () => false;
        }, 100);
    }
}

