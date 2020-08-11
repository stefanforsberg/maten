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

    document.querySelector(".week").innerHTML = `Vecka ${weeknumber} (<a href="javascript:document.location.reload()">🔄</a>)`;

    document.querySelector(".nextweek").innerHTML = `Vecka ${weeknumber+1}`;

    const scheduleIndex = weeknumber % 3;
    const nextWeekScheduleIndex = scheduleIndex === (schedule.length-1) ? 0 : scheduleIndex+1;

    const mealsForCurrentWeek = schedule[scheduleIndex];
    const mealsForNextWeek = schedule[nextWeekScheduleIndex]

    for(var i = 0; i < mealsForCurrentWeek.length; i++) {
        document.querySelector(`.day:nth-of-type(${i+1}) .meal`).innerHTML = mealsForCurrentWeek[i];
        document.querySelector(`.daymini:nth-of-type(${i+1}) .meal`).innerHTML = mealsForNextWeek[i];
    }

    const weekDay = today.isoWeekday();
    const currentDayMeal = document.querySelector(`.day.day-${weekDay}`);

    if(currentDayMeal) {
        currentDayMeal.classList.add("selected")
    }
});