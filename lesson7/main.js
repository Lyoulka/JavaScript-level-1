// Глобальные переменные
var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var SNAKE_SPEED = 300; // Интервал между перемещениями змейки
var NEW_BARRIER_TIME = 5000;
var snake = []; // Сама змейка
var direction = 'y+'; // Направление движения змейки
var oldDirection = 'y+'; // Старое направление движения змейки
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var score = 0; // Результат
var resultTxt ;
var barrier;   
var count = 0;


prepareGameField(); // Генерация поля

var wrap = document.getElementsByClassName('wrap')[0];
// Подгоняем размер контейнера под игровое поле
if (16 * (FIELD_SIZE_X + 1) < 200) {
    wrap.style.width = '200px';
}
else {
    wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
}
//сохраняем результат
resultTXT = document.getElementById('result');
// Событие кнопки Новая игра
document.getElementById('snake-new-game').addEventListener('click', startGame);
// Отслеживание клавиш клавиатуры
addEventListener('keydown', changeDirection);

/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
    // Создаём таблицу
    var game_table = document.createElement('table');
    game_table.classList.add('game-table');
    // Генерация поля
    for (var i = 0; i < FIELD_SIZE_Y; i++) {
        // Создаём строки
        var row = document.createElement('tr');
        for (var j = 0; j < FIELD_SIZE_X; j++) {
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;
            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }
    document.getElementById('snake-field').appendChild(game_table);
}

/**
 * Старт игры
 */
function startGame() {
    for(var i = 0; i < FIELD_SIZE_X; i++) {         //Если это не первая игра - очищаем поле от еды,
        for(var j = 0; j < FIELD_SIZE_Y; j++) {     //препятствий и змеи.
            var cell2 = document.getElementsByClassName('cell-' + i + '-' + j)[0];
            cell2.classList.remove('snake-unit', 'food-unit', 'barriers');
        }
    }
    // Игра началась
    gameIsRunning = true;
    // СБрос предыдущей игры
    direction = 'y+'; // Направление движения змейки
    oldDirection = 'y+'; // Старое направление движения змейки
    score = 0; // Результат
    for (var i = 0; i < snake.length; i++) {
        snake[i].classList.remove('snake-unit');
    }
    snake = [];
    var units = document.querySelectorAll('.food-unit');
    for (i = 0; i < units.length; i++) {
        units[i].classList.remove('food-unit');
    }
    // Начало новой игры
    clearInterval(snake_timer);
    respawn();
    snake_timer = setInterval(move, SNAKE_SPEED);
    setTimeout(createFood, 5000);
    barrier = setInterval(createBarrier, NEW_BARRIER_TIME ); //Генерируем препятствия
    count ++ ;
    resultTXT.innerHTML = 'Начали!';  
}

/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2
    // Respawn змейки из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);
    // Голова змейки
    var snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_head.classList.add('snake-unit');
    snake_head.setAttribute('data_y', start_coord_y.toString());
    snake_head.setAttribute('data_x', start_coord_x.toString());
    // Тело змейки
    var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y + 1) + '-' + start_coord_x)[0];
    snake_tail.classList.add('snake-unit');
    snake.push(snake_tail);
    snake.push(snake_head);
}

/**
 * Движение змейки
 */
function move() {
    var new_unit; // Новый элемент
    var coord_y = parseInt(snake[snake.length - 1].getAttribute('data_y'));
    var coord_x = parseInt(snake[snake.length - 1].getAttribute('data_x'));
    // Определяем новую точку
    switch (direction) {
        case'x-':
            new_unit = document.querySelector('.cell-' + (coord_y) + '-' + (coord_x -= 1));
            break;
        case'x+':
            new_unit = document.querySelector('.cell-' + (coord_y) + '-' + (coord_x += 1));
            break;
        case'y-':
            new_unit = document.querySelector('.cell-' + (coord_y += 1) + '-' + (coord_x));
            break;
        case'y+':
            new_unit = document.querySelector('.cell-' + (coord_y -= 1) + '-' + (coord_x));
            break;
    }



    // Проверка что new_unit не часть змейки и не выход за границы
    if (snake.indexOf(new_unit) === -1 && new_unit !== null && !new_unit.classList.contains('barriers')) {
        // Добавление новой части змейки
        snake[snake.length - 1].removeAttribute('data_y');
        snake[snake.length - 1].removeAttribute('data_x');
        new_unit.classList.add('snake-unit');
        snake.push(new_unit);
        snake[snake.length - 1].setAttribute('data_y', coord_y.toString());
        snake[snake.length - 1].setAttribute('data_x', coord_x.toString());
        // Проверяем, надо ли убрать хвост
        if (!haveFood(new_unit)) {
            snake.splice(0, 1)[0].classList.remove('snake-unit');
        
        }
    }
    else {
        finishTheGame();
    }
    oldDirection = direction;
}

/**
 * Проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {
    if (unit.classList.contains('food-unit')) {
        unit.classList.remove('food-unit');
        createFood();
        score++;
        resultTXT.innerHTML = 'Ваш результат : ' + (score);
        return true;
    }
    return false;
}
/**
 * Создание еды
 */
function createFood() {
    var foodCreated = false;
    while (!foodCreated) {
        // Рандом
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);
        // Проверка на змейку
        var food_cell = document.querySelector('.cell-' + (food_y) + '-' + (food_x));
        if (!food_cell.classList.contains('snake-unit')) {
            food_cell.classList.add('food-unit');
            foodCreated = true;
        }
    }
}

/**
 * Изменение направления движения змейки
 * @param e
 */
function changeDirection(e) {
    switch (e.keyCode) {
        case 37: // Стрелка влево
            if (oldDirection !== 'x+') {
                direction = 'x-';
            }
            break;
        case 38: // Стрелка вверх
            if (oldDirection !== 'y-') {
                direction = 'y+';
            }
            break;
        case 39: // Стрелка вправо
            if (oldDirection !== 'x-') {
                direction = 'x+';
            }
            break;
        case 40: // Стрелка вниз
            if (oldDirection !== 'y+') {
                direction = 'y-';
            }
            break;
    }
}
function createBarrier() { //Создаем препятствия.

        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var barrierCell = document.getElementsByClassName('cell-' + food_x + '-' + food_y)[0];

        if(!barrierCell.classList.contains('snake-unit') && !barrierCell.classList.contains('food-unit')) {
            barrierCell.classList.add('barriers');
            if (++count > 10 ) {                    //Если препятствий больше 10 случайно удаляем одно из существующих.
              var a = document.getElementsByClassName('barriers');
              var b = Math.floor(Math.random() * a.length);
              a[b].classList.remove('barriers');
            }
        }
}
/**
 * Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    clearInterval(barrier);
    if (score < FIELD_SIZE_X * FIELD_SIZE_Y - 2) {
        alert('Вы проиграли!\nВаш результат: ' + score.toString());
    }
    else {
        alert('Поздравляем! Вы выиграли!\nВы заполнили змейкой всё поле!\nВаш результат: ' + score.toString())
    }
}