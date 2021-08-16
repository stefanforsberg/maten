const schedule = [
    [
        ["Kyckling i ugn", "Kycklingfile,Pommes,Grönsaker i ugn,God sallad"],
        ["Lax & nudelwok", "Lax,Wokgrönsaker,Lime,Soja,Sweet chili sås,Nudlar"],
        ["Pasta & köttfärssås", "Spaghetti,Nötfärs,Vitlök"],
        ["Korvstroganof", "Falukorv,Matyoghurt,Lök"], 
    ],
    [
        ["Köttbullar & potatis", "Nötfärs,Potatis,Mellangrädde,Lingonsylt,Ägg"],
        ["Pomodoro kyckling", "Kycklinglår,Fetaost,Morötter,PassTomater"], 
        ["Stekt lax, potatis & sås", "Lax,Potatis,Sås till laxen"], 
        ["Korv med tomatsås", "Korv, Tomatsås, Pasta"]
    ],
    [
        ["Kyckling med apelsin", "Kyckling,Apelsin,Grädde,Brocolli,Potatis"], 
        ["Lax & mangosallad", "Lax,Ris,Lime,Mango (fryst)"], 
        ["Stekt potatis, ägg & bacon", "Ägg, bacon"],
        ["Köttbullar i tomatsås", "Nötfärs,Lök,Tomatsås,Pasta", "https://www.ica.se/recept/kottbullar-i-tomatsas-722787/"],
    ],
    [
        ["Pasta kikärtor", "Kikärtor,Tomatsås,Kapris,Smör,Parmesan"], 
        ["Järpar med bulgur", "Nötfärs,Riven cheddarost,Gurka,Matyoughurt,Bulgur"],
        ["Spicy Rigatonikyckling", "Rigatoni,Moz,Ruccola,Ugnsrostade grönsaker,Kyckling"], 
        ["Koreanska wraps", "Fläsk,Tortilla,Kimchi,Tonkatsu", "https://www.koket.se/tonkatsu-japansk-schnitzel-med-kramig-kalsallad"], 
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
        .map(s => s.trim())
        .sort();

        console.log(ingridients.sort())

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

    const scheduleIndex = weeknumber % schedule.length;
    const nextWeekScheduleIndex = scheduleIndex === (schedule.length-1) ? 0 : scheduleIndex+1;

    const mealsForCurrentWeek = schedule[scheduleIndex];
    const mealsForNextWeek = schedule[nextWeekScheduleIndex]

    for(var i = 0; i < mealsForCurrentWeek.length; i++) {

        const link =  mealsForCurrentWeek[i][2];

        document.querySelector(`.day:nth-of-type(${i+1}) .meal`).innerHTML = link ? `<a href="${link}" target="_blank">${mealsForCurrentWeek[i][0]}</a>` : mealsForCurrentWeek[i][0];
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