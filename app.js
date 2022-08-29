// Getting Element
const cardContainer = document.querySelector("#cardContainer");
const modalContainer = document.querySelector("#modalContainer");

// Card
const cardDiv = document.createElement("div");
cardDiv.innerHTML = `<figure class="max-w-sm cursor-pointer mx-auto" onclick="modalDiv.show()">                
                <img class="rounded-3xl" src="/images/trend-5.jpg" alt="trend-5">
                  <figcaption class="w-full text-lg text-center font-semibold text-gray-800 ">
                   <p class="my-2">Bengali bowl</p>
                  </figcatpion>
              </figure> `;
cardContainer.appendChild(cardDiv);

// Modal
const modalDiv = document.createElement("dialog");
modalDiv.classList.add("modal");
modalDiv.show();
modalDiv.innerHTML = `
<div class="modal-content rounded-xl p-6 mx-auto">
  <figure class="max-w-md cursor-pointer mx-auto"   ">                
    <figcaption class="w-full text-lg text-left font-semibold text-gray-800 ">
      <p class="my-2">Bengali bowl</p>
    </figcatpion>
     <img class="rounded-3xl" src="/images/trend-5.jpg" alt="trend-5">
  </figure>
  <div>
   <div class="  my-5 space-x-2">
    <button type="button" class="p-1  text-sm  text-slate-300 focus:outline-none bg-gray-800 rounded-lg focus:bg-slate-300 focus:text-gray-800" onclick="getElementById('instructions').classList.toggle('hidden'),getElementById('ingredients').classList.add('hidden')">Instructions</button>
    <button type="button" class="p-1  text-sm  text-slate-300 focus:outline-none bg-gray-800 rounded-lg" onclick="getElementById('ingredients').classList.toggle('hidden'),getElementById('instructions').classList.add('hidden')">Ingredients</button>
    <button type="button" class="p-1  text-sm  text-slate-300 focus:outline-none bg-gray-800 rounded-lg">
      <a target="_blank" href="https://www.youtube.com/watch?v=27tXqfc3vpY&list=RDMM27tXqfc3vpY&start_radio=1">Video</a>
    </button>
   </div>
   <article id="instructions" class="hidden px-1 text-justify">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus optio ab cum libero architecto, facilis eos qui officiis quas magni!</p>
   </article>
   <ul id="ingredients" class="hidden">
    <li>lorem</li>
    <li>paddind</li>
    <li>blingds</li>
    <li>fuckoff</li>
   </ul>

   <button class="p-1.5 my-5 text-sm text-white focus:outline-none bg-red-700 rounded-lg" onclick="modalDiv.close()">close modal</button>
  </div>
 
  
</div>
`;
modalContainer.appendChild(modalDiv);
