const schedule = [
  [
    ["Pomodoro kyckling", "Kycklinglår,Fetaost,Morötter,PassTomater"],
    ["Järpar med bulgur", "Nötfärs,Riven cheddarost,Gurka,Matyoughurt,Bulgur"],
    ["Lax & mangosallad", "Lax,Ris,Lime,Mango (fryst)"],
    ["Pytt i panna", "Veg pytt,Rödbeter,Ägg"],
  ],
  [
    ["Kyckling i kokosmjölk", "Kyckling,Nudlar,Paprika,Kokosmjölk,Currypasta,Purjolök", "https://www.ica.se/recept/kyckling-i-kokosmjolk-med-nudlar-714320/"],
    ["Köttbullar i tomatsås", "Nötfärs,Lök,Tomatsås,Pasta", "https://www.ica.se/recept/kottbullar-i-tomatsas-722787/"],
    ["Stekt lax, potatis & sås", "Lax,Potatis,Sås till laxen"],
    ["Korvstroganof", "Falukorv,Matyoghurt,Lök"],
  ],
  [
    ["Spicy Rigatonikyckling", "Rigatoni,Moz,Ruccola,Ugnsrostade grönsaker,Kyckling"],
    ["Lax & nudelwok", "Lax,Wokgrönsaker,Lime,Soja,Sweet chili sås,Nudlar"],
    ["Köttbullar & potatis", "Nötfärs,Potatis,Mellangrädde,Lingonsylt,Ägg"],
    ["Quinoabiffar med pommes", "Quinoza,Creme fre,Pommes,Fetaost"],
  ],
  [
    ["Pasta & köttfärssås", "Spaghetti,Nötfärs,Vitlök"],
    ["Teriyakikyckling med ris", "Kycklingfile,Ris,Teriyakisås,Spenat", "https://www.ica.se/recept/kyckling-teriyaki-med-ris-och-minimajs-723152/"],
    ["Korv med potatismos", "Korv, Potatis"],
    ["Pasta kikärtor", "Kikärtor,Tomatsås,Kapris,Smör,Parmesan"],
  ],
];

function ready(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function setupShoppingList() {
  const shoppingListElement = document.querySelector(".shopping-list");

  const shoppingListListElement = document.querySelector(".shoppinglist-container");

  document.querySelector(".showshopping").addEventListener("click", () => {
    shoppingListListElement.textContent = "";

    const ingridients = Array.prototype.map
      .call(document.querySelectorAll('[data-shopping-selected="true"]'), (s) => s.dataset.shoppingIngridients.split(","))
      .flat()
      .map((s) => s.trim())
      .sort();

    ingridients.forEach((ingridient) => {
      let div = document.createElement("div");
      shoppingListListElement.appendChild(div);

      div.innerHTML += ingridient;
    });

    shoppingListElement.style.display = "block";
  });

  shoppingListElement.addEventListener("click", () => {
    shoppingListElement.style.display = "none";
  });

  document.querySelectorAll(".shopping").forEach((s) => {
    s.addEventListener("click", (e) => {
      if (e.currentTarget.dataset.shoppingSelected === "true") {
        e.currentTarget.dataset.shoppingSelected = "false";
      } else {
        e.currentTarget.dataset.shoppingSelected = "true";
      }
    });
  });
}

ready(() => {
  setupShoppingList();

  const today = moment();

  const weeknumber = moment(today, "DD-MM-YYYY").isoWeek();

  document.querySelector(".week").innerHTML = `Vecka ${weeknumber}`;

  document.querySelector(".nextweek").innerHTML = `Vecka ${weeknumber + 1}`;

  const scheduleIndex = weeknumber % schedule.length;
  const nextWeekScheduleIndex = scheduleIndex === schedule.length - 1 ? 0 : scheduleIndex + 1;

  const mealsForCurrentWeek = schedule[scheduleIndex];
  const mealsForNextWeek = schedule[nextWeekScheduleIndex];

  for (var i = 0; i < mealsForCurrentWeek.length; i++) {
    const link = mealsForCurrentWeek[i][2];

    document.querySelector(`.day:nth-of-type(${i + 1}) .meal`).innerHTML = link ? `<a href="${link}" target="_blank">${mealsForCurrentWeek[i][0]}</a>` : mealsForCurrentWeek[i][0];
    document.querySelector(`.daymini:nth-of-type(${i + 1}) .meal`).innerHTML = mealsForNextWeek[i][0];

    document.querySelector(`.day:nth-of-type(${i + 1})`).dataset.shoppingIngridients = mealsForCurrentWeek[i][1];
    document.querySelector(`.daymini:nth-of-type(${i + 1})`).dataset.shoppingIngridients = mealsForNextWeek[i][1];
  }

  const weekDay = today.isoWeekday();
  const currentDayMeal = document.querySelector(`.day.day-${weekDay}`);

  if (currentDayMeal) {
    currentDayMeal.classList.add("selected");
  }
});
