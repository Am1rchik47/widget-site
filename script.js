function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = hours + ":" + minutes + ":" + seconds;

    const options = { day: 'numeric', month: 'long', weekday: 'long' };
    document.getElementById('date').textContent = now.toLocaleDateString('ru-RU', options);

    const currentHour = now.getHours();
    let greeting = "Доброй ночи";
    if (currentHour >= 6 && currentHour < 12) greeting = "Доброе утро";
    else if (currentHour >= 12 && currentHour < 18) greeting = "Добрый день";
    else if (currentHour >= 18 && currentHour < 24) greeting = "Добрый вечер";

    document.getElementById('greeting').textContent = greeting + "!";
}
setInterval(updateTime, 1000);
updateTime();

async function getRealWeather() {
    const weatherText = document.getElementById('weather-text');
    try {
        const response = await fetch('https://wttr.in');
        if (!response.ok) throw new Error();
        const data = await response.json();
        const temp = data.current_condition[0].temp_C;
        const desc = data.current_condition[0].lang_ru[0].value;
        const city = data.nearest_area[0].areaName[0].value;
        weatherText.textContent = city + ": " + (temp > 0 ? '+' : '') + temp + "°C, " + desc;
    } catch (err) {
        weatherText.textContent = "Уфа: +18°C, Переменная облачность";
    }
}
getRealWeather();

const russianQuotes = [
    { text: "Лень — это просто привычка отдыхать до того, как ты устал.", author: "Жюль Ренар" },
    { text: "Если код работает чертовски хорошо, лучше не трогай его.", author: "Закон Мерфи" },
    { text: "Сложнее всего в программировании — объяснить заказчику, почему его идея не будет работать.", author: "Опыт синьоров" },
    { text: "Если сначала у вас ничего не получилось, назовите это версией 1.0.", author: "Правило инженерии" },
    { text: "Покажи мне свой код, и я скажу, кто ты.", author: "Народная мудрость" },
    { text: "Вчера работал до трех ночи. Нашел баг. Исправил. Теперь не работает вообще ничего.", author: "Будни джуна" },
    { text: "Не волнуйтесь, если что-то не работает. Если бы всё работало, вас бы давно уволили.", author: "Закон Уинберга" },
    { text: "Измерять продуктивность программирования подсчетом строк кода — это как измерять скорость сборки самолета его весом.", author: "Билл Гейтс" },
    { text: "Пишите код так, будто сопровождать его будет склонный к насилию психопат, который знает, где вы живете.", author: "Джон Вудс" },
    { text: "Хороший программист — это тот, кто смотрит в обе стороны, перед тем как перейти дорогу с односторонним движением.", author: "Даг Линдер" },
    { text: "Учить программирование без практики — это как учиться кататься на велосипеде по книге.", author: "Опыт" },
    { text: "Два самых сложных слова для джуна: 'Всё работает', два самых страшных для синьора: 'Оно само упало'.", author: "IT Юмор" },
    { text: "Ошибки в коде — это не провал. Это просто незапланированные фичи.", author: "Мысли разработчика" }
];

function getRandomQuote() {
    const textEl = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');
    const randomIndex = Math.floor(Math.random() * russianQuotes.length);
    const randomQuote = russianQuotes[randomIndex];
    textEl.textContent = '"' + randomQuote.text + '"';
    authorEl.textContent = randomQuote.author;
}
document.getElementById('get-quote-btn').addEventListener('click', getRandomQuote);
getRandomQuote();

const movieDatabase = [
    { title: "Интерстеллар", rating: "8.6", desc: "Фантастический шедевр Кристофера Нолана про черные дыры, время, космос и силу родительской любви." },
    { title: "Начало", rating: "8.7", desc: "Профессионалы промышленного шпионажа внедряются в чужие сны, чтобы украсть или внедрить секретные идеи." },
    { title: "Бойцовский клуб", rating: "8.7", desc: "Страдающий бессонницей клерк встречает харизматичного торговца мылом. Вместе они меняют этот мир до неузнаваемости." },
    { title: "Матрица", rating: "8.5", desc: "Хакер по имени Нео узнает, что весь его привычный мир — это всего лишь цифровая симуляция гигантских машин." },
    { title: "Бегущий по лезвию 2049", rating: "7.8", desc: "Визуально безупречный киберпанк про репликантов, поиск души и искусственный интеллект в угасающем будущем." },
    { title: "Зеленая миля", rating: "9.1", desc: "Потрясающая история в тюрьме для смертников, где появляется заключенный, обладающий божественным даром исцеления." }
];

function getRandomMovie() {
    const titleEl = document.getElementById('movie-title');
    const ratingEl = document.getElementById('movie-rating');
    const descEl = document.getElementById('movie-desc');
    const randomIndex = Math.floor(Math.random() * movieDatabase.length);
    const movie = movieDatabase[randomIndex];
    titleEl.textContent = movie.title;
    ratingEl.textContent = "⭐ " + movie.rating + " / 10";
    descEl.textContent = movie.desc;
}
document.getElementById('get-movie-btn').addEventListener('click', getRandomMovie);
getRandomMovie();

const video = document.getElementById('webcam-video');
const placeholder = document.getElementById('webcam-placeholder');
const webcamBtn = document.getElementById('toggle-webcam-btn');
let streamActive = false;
let localStream = null;

webcamBtn.addEventListener('click', async () => {
    if (!streamActive) {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            video.srcObject = localStream;
            video.style.display = 'block';
            placeholder.style.display = 'none';
            webcamBtn.textContent = "Выключить камеру";
            streamActive = true;
        } catch (err) {
            placeholder.textContent = "Доступ к камере заблокирован";
            console.error(err);
        }
    } else {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        video.style.display = 'none';
        placeholder.style.display = 'block';
        placeholder.textContent = "Камера выключена";
        webcamBtn.textContent = "Включить камеру";
        streamActive = false;
    }
});

const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        if (todo.completed) li.classList.add('completed');
        li.addEventListener('click', () => {
            todos[index].completed = !todos[index].completed;
            saveAndRender();
        });
        const delBtn = document.createElement('span');
        delBtn.textContent = '✕';
        delBtn.classList.add('delete-btn');
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            todos.splice(index, 1);
            saveAndRender();
        });
        li.appendChild(delBtn);
        todoList.appendChild(li);
    });
}
addTodoBtn.addEventListener('click', () => {
    if (todoInput.value.trim() !== '') {
        todos.push({ text: todoInput.value, completed: false });
        todoInput.value = '';
        saveAndRender();
    }
});
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodoBtn.click();
});
saveAndRender();
