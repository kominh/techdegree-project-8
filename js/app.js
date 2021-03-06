//global variables

let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const modalNext = document.querySelector(".modal-next");
const modalPrev = document.querySelector(".modal-prev");
let dataIndex = null;


// fetch data from API

fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err));

function displayEmployees(employeeData) {
  employees = employeeData;

  //store the employee HTML as we create it
  let employeeHTML = "";

  // loop through each employee and create HTML markup
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    // template literals make this so much cleaner!

    employeeHTML += `
          <div class ="card" data-index="${index}">
            <img class= "avatar" src="${picture.large}" />
            <div class="text-container">
              <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
          </div>
          `;
  });
  gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
  // use object destructuring make our template literal cleaner
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture
  } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
          <img class="avatar" src="${picture.large}" />
          
          <div class="tex-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number} ${
    street.name
  }, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            <button class="modal-prev" onclick="previous()"><</button>
          <button class="modal-next" onclick="next()">></button>
            </div>
            
            `;
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener("click", e => {
  // make sure the click is not on the gridContainer itself
  if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");
     dataIndex = parseInt(index);

    displayModal(index);
  }
});

modalClose.addEventListener("click", () => {
  overlay.classList.add("hidden");
});


//modal-next button 
function next() {
  //add 1 to current index
   
     if (dataIndex < 11){
       dataIndex ++;
       displayModal(dataIndex);
     } else if (dataIndex === 11){
         dataIndex = 0;
         displayModal(dataIndex);
     }
     else {
       return;
     } 
 
 }

//modal-previous button
function previous() {
  //subtract 1 from current index
     
  if(dataIndex > 0){
    dataIndex --;
    displayModal(dataIndex);
  } else if (dataIndex === 0){
   dataIndex = 11;
   displayModal(dataIndex);
}

  else {
    return;
  }

}


//////

//search bar function

  function searchFunction() {
    //declare variables
    const input = document.getElementById('userInput');
    const filter = input.value.toUpperCase();
    const names = document.getElementsByClassName('card');
    let a, txtValue;
      //loop through all items, and hide those that don't match the search query
  
      for(i = 0; i < names.length; i++) {
        a = names[i].getElementsByClassName("name")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1){
          names[i].style.display = "";
        } else {
          names[i].style.display ="none";
        }
      }
  
  }
  const search = document.querySelector('#userInput');
  search.addEventListener('keyup', searchFunction);
