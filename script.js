const schedule = [
    ["Korvstroganof", "Kycklinggryta", "Friterad fisk & potatis", "Pasta & köttfärssås"],
    ["Soppa & pannkakor", "Kyckling i ugn & potatis", "Ugnstekt lax & potatis", "Yakiniku"],
    ["Korv & pasta", "Flygande Jakob", "Lax % nudelwok", "Köttbullar & potatis"]
]

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function setupShoppingList() {

    const shoppingListElement = document.querySelector(".shopping-list");

    const shoppingListListElement = document.querySelector(".shoppinglist-container");

    document.querySelector(".showshopping").addEventListener("click", () => {
        
        shoppingListListElement.textContent = '';
        
        const ingridients = Array.prototype.map.call(document.querySelectorAll('[data-shopping-selected="true"]'), (s) => 
            s.dataset.shoppingIngridients.split(",")
        )
        .flat()
        .sort();

        ingridients.forEach(ingridient => {
            let div = document.createElement('div');
            shoppingListListElement.appendChild(div);

            div.innerHTML += ingridient;
        })

        
        shoppingListElement.style.display = 'block';
    })

    shoppingListElement.addEventListener("click", () => {
        shoppingListElement.style.display = 'none';
    })

    document.querySelectorAll(".shopping").forEach((s) => {
        s.addEventListener("click", (e)=> {
            
            if(e.currentTarget.dataset.shoppingSelected === "true") {
                e.currentTarget.dataset.shoppingSelected = "false";
            } else {
                e.currentTarget.dataset.shoppingSelected = "true";
            }
        })
    });
}

ready(() => {
    
    setupShoppingList();

    const today = moment();
    
    const weeknumber = moment(today, "DD-MM-YYYY").isoWeek();

    document.querySelector(".week").innerHTML = `Vecka ${weeknumber}`;

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