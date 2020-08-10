const schedule = [
    ["Korvstroganof", "Kycklinggryta", "Friterad fisk & potatis", "Pasta & köttfärssås"],
    ["Soppa & pannkakor", "Kyckling i ugn & potatis/sallad", "Ugnstekt lax & potatis", "Yakiniku"],
    ["Korv & pasta", "Flygande Jakob", "Lax % nudelwok", "Köttbullar & potatis"]
]

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(() => {
    
    const today = moment();
    
    const weeknumber = moment(today, "DD-MM-YYYY").isoWeek();

    document.querySelector(".week").innerHTML = `Meny för vecka ${weeknumber} (${moment().format("HH mm ss")})`;



    const mealsForCurrentWeek = schedule[weeknumber % 3];

    document.querySelector(".day:nth-of-type(1) .meal").innerHTML = mealsForCurrentWeek[0];
    document.querySelector(".day:nth-of-type(2) .meal").innerHTML = mealsForCurrentWeek[1];
    document.querySelector(".day:nth-of-type(3) .meal").innerHTML = mealsForCurrentWeek[2];
    document.querySelector(".day:nth-of-type(4) .meal").innerHTML = mealsForCurrentWeek[3];

    

    const weekDay = today.isoWeekday();
    const currentDayMeal = document.querySelector(`.day.day-${weekDay}`);

    if(currentDayMeal) {
        currentDayMeal.classList.add("selected")
    }
});