const schedule = [
    [
        ["Kyckling i ugn", "Kycklingfile,Pommes,Grönsaker i ugn,God sallad"],
        ["Lax & mangosallad", "Lax,Ris,Lime,Mango (fryst)"], 
        ["Pasta & köttfärssås", "Spaghetti,Nötfärs,Vitlök"],
        ["Soppa & pannkakor", "Kelda thai,Kelda tomat,Sylt,Mjölk,Ägg"],
    ],
    [
        ["Flygande Jakob", "Kyckling,Jordnötter,Mellangrädde,Bacon,Lök"], 
        ["Lax & nudelwok", "Lax,Wokgrönsaker,Lime,Soja,Sweet chili sås"],
        ["Köttbullar & potatis", "Nötfär,Potatis,Mellangrädde,Lingonsylt,Ägg"],
        ["Korv med tomatsås", "Korv, Tomatsås, Pasta"]
    ],
    [
        ["Pomodoro kyckling", "Kycklinglår,Fetaost,Morötter,Tomatsås"], 
        ["Ugnstekt lax & potatis", "Lax,Potatis,Rom,Rödlök,Lätt fraiche"], 
        ["Järpar med bulgur", "Nötfärs,Riven cheddarost,Gurka,Matyoughurt,Bulgur"],
        ["Korvstroganof", "Kalkonkorv,Matyoghurt,Lök"], 
    ]
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

        document.querySelector(`.day:nth-of-type(${i+1}) .meal`).innerHTML = mealsForCurrentWeek[i][0];
        document.querySelector(`.daymini:nth-of-type(${i+1}) .meal`).innerHTML = mealsForNextWeek[i][0];

        document.querySelector(`.day:nth-of-type(${i+1})`).dataset.shoppingIngridients = mealsForCurrentWeek[i][1];
        document.querySelector(`.daymini:nth-of-type(${i+1})`).dataset.shoppingIngridients = mealsForNextWeek[i][1];
    }

    const weekDay = today.isoWeekday();
    const currentDayMeal = document.querySelector(`.day.day-${weekDay}`);

    if(currentDayMeal) {
        currentDayMeal.classList.add("selected")
    }
});