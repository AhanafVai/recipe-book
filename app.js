// Getting Element
const cardContainer = document.querySelector("#cardContainer");
const modalContainer = document.querySelector("#modalContainer");
const modalDiv = document.createElement("dialog");
const error = document.querySelector("#error");
const btn = document.getElementById("searchBtn");

// Filter function
const category = async () => {
  cardContainer.innerHTML = "";
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`;
  const res = await fetch(url);
  const data = await res.json();
  displayMenu(data.meals);
};

const area = async () => {
  cardContainer.innerHTML = "";
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian`;
  const res = await fetch(url);
  const data = await res.json();
  displayMenu(data.meals);
};

// Search function
const search = async () => {
  cardContainer.innerHTML = "";
  const searchMenu = document.getElementById("searchMenu").value;
  if (searchMenu === "") {
    error.innerHTML = `<p class="text-base text-red-500 text-right mr-10 mt-2">Empty value not excepted</p>`;
  } else {
    error.innerHTML = "";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMenu}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMenu(data.meals);
  }
};

// event listener
document.getElementById("searchMenu").addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    search();
  }
});
btn.addEventListener("click", () => {
  search();
});

// Menu
const displayMenu = (recipes) => {
  if (!recipes) {
    const loader = document.createElement("div");
    loader.innerHTML = `<!-- spinner -->
<div class="flex justify-center my-10" role="status">
    <svg  aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>`;
    cardContainer.appendChild(loader);
  }
  document.getElementById("searchMenu").value = "";
  if (recipes === null) {
    cardContainer.innerHTML = `<p class="grid col-span-2 text-6xl text-center text-gray-300 font-bold my-10 lg:col-span-3">"No match found!"</p>`;
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
     <img class="rounded-3xl md:rounded-none" src="${item.strMealThumb}" alt="${item.strMeal}">
  </figure>
 <div>
   <div class=" my-5 space-x-2 md:space-x-1">
    <button type="button" class="p-1  text-sm  text-slate-300 focus:outline-none bg-gray-800 rounded-lg focus:bg-slate-300 focus:text-gray-800 md:rounded-none lg:text-lg lg:p-2" onclick="getElementById('instructions').classList.toggle('hidden'),getElementById('ingredients').classList.add('hidden')">Instructions</button>
    <button type="button" class="p-1  text-sm  text-slate-300 focus:outline-none bg-gray-800 rounded-lg md:rounded-none lg:text-lg lg:p-2" onclick="getElementById('ingredients').classList.toggle('hidden'),getElementById('instructions').classList.add('hidden')">Ingredients</button>
    <button type="button" class="p-1  text-sm  text-slate-300 focus:outline-none bg-gray-800 rounded-lg md:rounded-none lg:text-lg lg:p-2">
      <a target="_blank" href="${item.strYoutube}">Video</a>
    </button>
   </div>
   <article id="instructions" class="hidden px-1 text-justify">
 
     <p class="text-sm w-72 h-80 overflow-auto lg:text-lg">${item.strInstructions}</p>
 

 
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
