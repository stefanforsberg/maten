const schedule = [
  [
    ["Pomodoro kyckling", "Kycklinglår,Fetaost,Morötter,PassTomater"],
    ["Järpar med bulgur", "Nötfärs,Riven cheddarost,Gurka,Matyoughurt,Bulgur"],
    ["Laxbowl", "Lax,Ris,Lime,Mango (fryst),Rödkål,Morötter,Majo"],
    ["Pytt i panna", "Veg pytt,Rödbeter,Ägg"],
  ],
  [
    ["Currykyckling", "Kycklinglår,Gul lök, Mango Chutney, Ris", "https://www.arla.se/recept/currykyckling/"],
    ["Tomatsoppa och pannkakor", "Lök,Grädde,Morötter,Laktosfri mjölk", "https://www.ica.se/recept/tomatsoppa-med-krafttoast-719564/"],
    ["Pasta & köttfärssås", "Spaghetti,Nötfärs,Vitlök"],
    ["Fisktacos", "Fisktacokrydda, Lax, Grönsaker, Mangosalso, Tortilla, Guaccemole, TacoChips"],
  ],
  [
    ["Spicy Rigatonikyckling", "Rigatoni,Moz,Ruccola,Ugnsrostade grönsaker,Kyckling"],
    ["Köttbullar i tomatsås", "Nötfärs,Lök,Tomatsås,Pasta", "https://www.ica.se/recept/kottbullar-i-tomatsas-722787/"],
    ["Fetaostlax med potatis", "Lax,Potatis,Fetaost,Citron,Fryst dill", "https://www.zeta.nu/recept/fetaostfylld-lax-med-dill-och-citron/"],
    ["Libapizza", "Libabröd, Pizzasås, Salami, Vitkål"],
  ],
  [
    ["Kyckling i kokosmjölk", "Kyckling,Nudlar,Paprika,Kokosmjölk,Currypasta,Purjolök,Lime", "https://www.ica.se/recept/kyckling-i-kokosmjolk-med-nudlar-714320/"],
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

    const ingredients = Array.prototype.map
      .call(document.querySelectorAll('[data-shopping-selected="true"]'), (s) => s.dataset.shoppingIngredients.split(","))
      .flat()
      .map((s) => s.trim())
      .sort();

    ingredients.forEach((ingredient) => {
      let div = document.createElement("div");
      shoppingListListElement.appendChild(div);

      div.innerHTML += ingredient;
    });

    shoppingListElement.style.display = "block";
  });

  shoppingListElement.addEventListener("click", () => {
    shoppingListElement.style.display = "none";
  });
}

ready(() => {
  setupShoppingList();

  const today = moment();

  const weeknumber = moment(today, "DD-MM-YYYY").isoWeek();

  document.querySelector(".week").innerHTML = `Vecka ${weeknumber}`;

  const scheduleIndex = weeknumber % schedule.length;
  const nextWeekScheduleIndex = scheduleIndex === schedule.length - 1 ? 0 : scheduleIndex + 1;

  const mealsForCurrentWeek = schedule[scheduleIndex];
  const mealsForNextWeek = schedule[nextWeekScheduleIndex];

  for (var i = 0; i < mealsForCurrentWeek.length; i++) {
    const link = mealsForCurrentWeek[i][2];

    document.querySelector(`.day:nth-of-type(${i + 1}) .meal`).innerHTML = link ? `<a href="${link}" target="_blank">${mealsForCurrentWeek[i][0]}</a>` : mealsForCurrentWeek[i][0];
    document.querySelector(`.day:nth-of-type(${i + 1})`).dataset.shoppingIngredients = mealsForCurrentWeek[i][1];
  }

  let html = "";

  for (var i = 1; i < 5; i++) {
    const mealsForWeek = schedule[(scheduleIndex + i) % schedule.length];
    const weekNumberForWeek = weeknumber + i;

    html += `
      <div class="container" style="margin-top: 3%;">
        <div class="nextweek">Vecka ${weekNumberForWeek}</div>
        <div class="daymini day-1 shopping" data-shopping-ingredients="${mealsForWeek[0][1]}"><span class="name">Må</span> <span class="meal">${
      mealsForWeek[0][2] ? `<a href="${mealsForWeek[0][2]}" target="_blank">${mealsForWeek[0][0]}</a>` : mealsForWeek[0][0]
    }</span></div>
        <div class="daymini day-2 shopping" data-shopping-ingredients="${mealsForWeek[1][1]}"><span class="name">Ti</span> <span class="meal">${
      mealsForWeek[1][2] ? `<a href="${mealsForWeek[1][2]}" target="_blank">${mealsForWeek[1][0]}</a>` : mealsForWeek[1][0]
    }</span></div>
        <div class="daymini day-3 shopping" data-shopping-ingredients="${mealsForWeek[2][1]}"><span class="name">On</span> <span class="meal">${
      mealsForWeek[2][2] ? `<a href="${mealsForWeek[2][2]}" target="_blank">${mealsForWeek[2][0]}</a>` : mealsForWeek[2][0]
    }</span></div>
        <div class="daymini day-4 shopping" data-shopping-ingredients="${mealsForWeek[3][1]}"><span class="name">To</span> <span class="meal">${
      mealsForWeek[3][2] ? `<a href="${mealsForWeek[3][2]}" target="_blank">${mealsForWeek[3][0]}</a>` : mealsForWeek[3][0]
    }</span></div>
        </div>
    `;
  }

  document.getElementById("daymini-container").innerHTML = html;

  const weekDay = today.isoWeekday();
  const currentDayMeal = document.querySelector(`.day.day-${weekDay}`);

  if (currentDayMeal) {
    currentDayMeal.classList.add("selected");
  }

  document.querySelectorAll(".shopping").forEach((s) => {
    s.addEventListener("click", (e) => {
      if (e.currentTarget.dataset.shoppingSelected === "true") {
        e.currentTarget.dataset.shoppingSelected = "false";
      } else {
        e.currentTarget.dataset.shoppingSelected = "true";
      }
    });
  });
});
