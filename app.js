// Getting Element
const cardContainer = document.querySelector("#cardContainer");
const modalContainer = document.querySelector("#modalContainer");
const modalDiv = document.createElement("dialog");
const error = document.querySelector("#error");

// Search function
const search = () => {
  const searchMenu = document.getElementById("searchMenu").value;
  searchMenu.value = "";
  if (searchMenu === "") {
    error.innerText = "Enter Category plz";
  } else {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMenu}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayMenu(data.meals));
  }
};

// Menu
const displayMenu = (recipes) => {
  if (recipes === null) {
    cardContainer.innerHTML = `<p class="text-4xl text-center my-14 text-slate-300 font-bold"><q>sorry not found!</q> </p>`;
  } else {
    recipes.forEach((recipe) => {
      const cardDiv = document.createElement("div");
      cardDiv.innerHTML = `<figure class="max-w-sm cursor-pointer mx-auto"  onclick="mealDetails(${recipe.idMeal})">                
                <img class="rounded-3xl" src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                  <figcaption class="w-full text-lg text-center font-semibold text-gray-800 ">
                   <p class="my-2">${recipe.strMeal}</p>
                  </figcatpion>
              </figure>  `;
      cardContainer.appendChild(cardDiv);
    });
  }
};

const mealDetails = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => recipe(data.meals));
};

//  Modal
const recipe = (items) => {
  if (items) {
    modalDiv.show();
    items.forEach((item) => {
      modalDiv.classList.add("modal");
      modalDiv.innerHTML = `
<div class="modal-content rounded-xl p-6 mx-auto md:grid md:grid-cols-2 md:space-x-14 ">
  <figure class="max-w-md cursor-pointer mx-auto"   ">                
    <figcaption class="w-full text-lg text-left font-semibold text-gray-800  md:text-2xl ">
      <p class="my-2 md:mb-10">${item.strMeal}</p>
    </figcatpion>
     <img class="rounded-3xl md:rounded-none" src="${item.strMealThumb}" alt="${
        item.strMeal
      }">
  </figure>
 <div>
   <div class=" my-5 space-x-2">
    <button type="button" class="p-1  text-sm  text-slate-300 focus:outline-none bg-gray-800 rounded-lg focus:bg-slate-300 focus:text-gray-800 md:rounded-none lg:text-lg lg:p-2" onclick="getElementById('instructions').classList.toggle('hidden'),getElementById('ingredients').classList.add('hidden')">Instructions</button>
    <button type="button" class="p-1  text-sm  text-slate-300 focus:outline-none bg-gray-800 rounded-lg md:rounded-none lg:text-lg lg:p-2" onclick="getElementById('ingredients').classList.toggle('hidden'),getElementById('instructions').classList.add('hidden')">Ingredients</button>
    <button type="button" class="p-1  text-sm  text-slate-300 focus:outline-none bg-gray-800 rounded-lg md:rounded-none lg:text-lg lg:p-2">
      <a target="_blank" href="${item.strYoutube}">Video</a>
    </button>
   </div>
   <article id="instructions" class="hidden px-1 text-justify">
   <details>
     <summary class="text-sm lg:text-lg">${item.strInstructions.slice(
       350
     )}</summary>
  <p class="text-sm lg:text-lg">${item.strInstructions.slice(-350)}</p>
</details>
 
   </article>
   <ul id="ingredients" class="hidden">
  <li>${item.strIngredient1}</li>
        <li>${item.strIngredient2}</li>
        <li>${item.strIngredient3}</li>
        <li>${item.strIngredient4}</li>
        <li>${item.strIngredient5}</li>
        <li>${item.strIngredient6}</li>
        <li>${item.strIngredient7}</li>
        <li>${item.strIngredient8}</li>
        <li>${item.strIngredient9}</li>
        <li>${item.strIngredient10}</li>
   </ul>

   <button class="p-1.5 my-5 text-sm text-white focus:outline-none bg-red-700 rounded-lg  md:rounded-none lg:text-lg md:p-2" onclick="modalDiv.close()">close modal</button>
  </div>
</div>
`;
      modalContainer.appendChild(modalDiv);
    });
  }
};
