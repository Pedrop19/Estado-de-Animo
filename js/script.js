let mainElement = document.querySelector("main");

let sadButtonElement = document.getElementById("sadButton");
let regularButtonElement = document.getElementById("regularButton");
let goodButtonElement = document.getElementById("happyButton");

sadButtonElement.addEventListener('click', () => setPencil("Sad"))
regularButtonElement.addEventListener('click', () => setPencil("Regular"))
goodButtonElement.addEventListener('click', () => setPencil("Good"))

const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];
const daysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];

let monthCounter = 9;
let yearCounter = 2023;
let currentDate = new Date(`${yearCounter}-${monthCounter}-1`);

function addMonth() {
    let monthElement = document.createElement("div");
    monthElement.classList.toggle("month");

    let titleMonthElement = document.createElement("h4");
    titleMonthElement.innerText = monthNames[monthCounter - 1];
    monthElement.appendChild(titleMonthElement);

    let daysElement = document.createElement("div");
    daysElement.classList.toggle("days");

    // INSERTAR PRIMERA FILA: L ... D
    daysOfWeek.forEach((day) => {
        let dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.innerText = day;
        daysElement.appendChild(dayElement);
    });

    let gaps = currentDate.getDay();

    if (gaps === 0) {
        gaps = 7;
    }

    for (let gap = 1; gap < gaps; gap++) {
        let gapElement = document.createElement("div");
        daysElement.appendChild(gapElement);
    }

    // INSERTAR DÍAS DEL MES
    //El primer parámetro indica el mes de forma natural -> 1 enero, 2 febrero...
    let numDaysMonth = getDaysInMonth(
        currentDate.getMonth() + 1,
        currentDate.getFullYear()
    );
    for (let day = 1; day <= numDaysMonth; day++) {
        let dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.addEventListener('click', setFormDay);
        dayElement.innerText = day;

        if ((gaps + day) % 7 == 0 || (gaps + day) % 7 == 1) {
            dayElement.classList.toggle("green");
        }
        daysElement.appendChild(dayElement);
    }

    monthElement.appendChild(daysElement);
    mainElement.appendChild(monthElement);
}

let currentColorPencil;


function setPencil(mood) {
    switch (mood) {
        case "Good":
            currentColorPencil = "😁";
            break;
        case "Regular":
            currentColorPencil = "😑";
            break;
        case "Sad":
            currentColorPencil = "😔";
            break;
    }
}

function getDaysInMonth(month, year) {
    //El día 0 es el último día del anterior mes
    return new Date(year, month, 0).getDate();
}

function setFormDay(e){
    e.target.innerHTML = currentColorPencil;
}


let monthsOfCalendar = 9;
for (let index = 0; index <= monthsOfCalendar; index++) {
    addMonth();
    monthCounter++;
    if (monthCounter === 13) {
        monthCounter = 1;
        yearCounter++;
    }
    currentDate = new Date(`${yearCounter}-${monthCounter}-1`);
}

