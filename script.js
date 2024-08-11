const schedule = [
  [
    ["Panerad fisk", "Panerad fisk,remouladsås,potatis"],
    ["Pomodoro kyckling", "Kycklinglår,Fetaost,Morötter,PassTomater"],
    ["Kyckling i kokosmjölk", "Kyckling,Nudlar,Paprika,Kokosmjölk,Currypasta,Purjolök,Lime", "https://www.ica.se/recept/kyckling-i-kokosmjolk-med-nudlar-714320/"],
    ["Hamburgare", "Frysta hamburgare,Hamburgebröd"],
  ],
  [
    ["Kyckling- och potatisgryta med curry", "Potatis,Röd paprika,Kyckling,Kokosmjölk", "https://www.ica.se/recept/kyckling-och-potatisgryta-med-curry-713333/"],
    ["Pasta & köttfärssås", "Spaghetti,Nötfärs,Vitlök"],
    ["Laxbowl", "Lax,Ris,Lime,Mango (fryst),Rödkål,Morötter,Majo"],
    ["Kycklinggyros", "Kycklinggyros,Fetaost,Rödkål,Vitlökssås,Gyrosbröd"],
  ],
  [
    ["Köttbullar & potatis", "Nötfärs,Potatis,Mellangrädde,Lingonsylt,Ägg"],
    ["Pasta kikärtor", "Kilkärtor,Tomatsås,Kapris,Smör,Parmesan"],
    ["Lax & nudelwok", "Lax,Wokgrönsaker,Lime,Soja,Sweet chili sås,Nudlar"],
    ["Korv med bröd", "Korv,bröd"],
  ],
  [
    ["Fetaostlax med potatis", "Lax,Potatis,Fetaost,Citron,Fryst dill", "https://www.zeta.nu/recept/fetaostfylld-lax-med-dill-och-citron/"],
    ["Pasta & köttfärssås", "Spaghetti,Nötfärs,Vitlök"],
    ["Currykyckling", "Kycklinglår,Gul lök, Mango Chutney, Ris,Syrad grädde", "https://www.arla.se/recept/currykyckling/"],
    ["Pastapesto", "Pesto,Fetaost"],
  ],
  [
    ["Korv med potatismos", "Korv, Potatis"],
    ["Spicy Rigatonikyckling", "Rigatoni,Moz,Ruccola,Ugnsrostade grönsaker,Kyckling"],
    ["Fisktacos", "Fisktacokrydda, Lax, Grönsaker, Mangosalso, Tortilla, Guaccemole, TacoChips"],
    ["Quesadillas", "Riven cheddaros,Tortillas"],
  ],

  // ["Pytt i panna", "Veg pytt,Rödbeter,Ägg"],
  // ["Quinoabiffar med pommes", "Quinoza,Creme fre,Pommes,Fetaost"],
  // ["Köttbullar i tomatsås", "Nötfärs,Lök,Tomatsås,Pasta", "https://www.ica.se/recept/kottbullar-i-tomatsas-722787/"],
  // ["Libapizza", "Libabröd, Pizzasås, Salami, Vitkål"],
  // ["Teriyakikyckling med ris", "Kycklingfile,Ris,Teriyakisås,Spenat", "https://www.ica.se/recept/kyckling-teriyaki-med-ris-och-minimajs-723152/"],
  // ["Tomatsoppa och pannkakor", "Lök,Grädde,Morötter,Laktosfri mjölk", "https://www.ica.se/recept/tomatsoppa-med-krafttoast-719564/"],
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

const handleSwipe = () => {

  const carouselWrapper = document.querySelector('#swiper-wrapper');
  const carouselItems = document.querySelectorAll('.day-wrapper');

  const totalItems = carouselItems.length;
  let currentIndex = 0;

  document.querySelector('body').addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].screenX
  });

  document.querySelector('body').addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].screenX
    handleGesture();
  });

  document.querySelectorAll('.swipe-left').forEach(x => {
    x.addEventListener('click', (e) => {
      swipeLeft()
    });
  })

  document.querySelectorAll('.swipe-right').forEach(x => {
    x.addEventListener('click', (e) => {
      swipeRight()
    });
  })

  const swipeLeft = () => {
    currentIndex = (currentIndex + 1) % totalItems;
    showItem(currentIndex);
  }

  const swipeRight = () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showItem(currentIndex);
  }

  function showItem(index) {
    if (index >= 0 && index < totalItems) {
      carouselWrapper.style.transform = `translateX(-${index * 100}%)`;
    }
  }

  function handleGesture() {
    if (startX - endX > 50) {
      swipeLeft()
    } else if (endX - startX > 50) {
      swipeRight()
    }
  }
}

ready(() => {
  setupShoppingList();



  const today = moment();

  const weeknumber = moment(today, "DD-MM-YYYY").isoWeek();

  const scheduleIndex = weeknumber % schedule.length;

  let html = "";

  for (var i = 0; i < 5; i++) {
    const mealsForWeek = schedule[(scheduleIndex + i) % schedule.length];
    const weekNumberForWeek = weeknumber + i;

    let daysHtml = ""
    for (var d = 0; d < 4; d++) {
      daysHtml += `
      
      <div class="day day-${d + 1} shopping" data-shopping-ingredients="${mealsForWeek[d][1]}">
        <span class="meal">${mealsForWeek[d][2] ? `<a href="${mealsForWeek[0][2]}" target="_blank">${mealsForWeek[d][0]}</a>` : mealsForWeek[d][0]}</span>
      </div>`
    }

    html += `
   
      <div class="day-wrapper">

        <div class="day-heading">
          <a href="#" style="text-align: left;" class="swipe-right">&nbsp;</a>
          <span style="text-align: center">Vecka ${weekNumberForWeek}</span>
          <a href="#" style="text-align: right;"  class="swipe-left">&nbsp;</a>
        </div>
        
        ${daysHtml}
      </div>
     
    `;
  }

  document.getElementById("swiper-wrapper").innerHTML = html;

  const weekDay = today.isoWeekday();
  const currentDayMeal = document.querySelector(`.day-${weekDay}`);

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

  handleSwipe()

  document.getElementById("calendar").addEventListener("click", () => {
    document.getElementById("calendar-container").style.display = 'block'
    document.getElementById("recipie-container").style.display = 'none'
  })

  document.getElementById("recipie").addEventListener("click", () => {
    document.getElementById("calendar-container").style.display = 'none'
    document.getElementById("recipie-container").style.display = 'block'
  })

});
