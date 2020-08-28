//Etch-a-sketch

//VARIABLES
const input = document.querySelector("#input");
const gridsOuter = document.querySelector(".grids");
const gridsInner = gridsOuter.firstElementChild;
const buttons = document.querySelectorAll(".hide-header-button");
const dockElements = document.querySelectorAll(".colorful-background");
let global_mousedownCheck;

//EVENT LISTENERS
document.addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList[0] === "btn") {
    if (target.classList[1] === "generate") {
      // Prevent form from submitting
      event.preventDefault();
      generate();
      input.value = "";
    } else if (target.classList[1] === "undo") {
      refresh();
    } else if (target.classList[1] === "trash") {
      del();
    }
  } else if (target.classList[0] == "hide-header-button") {
    hideDock();
  }
});

gridsOuter.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
  },
  false
);

gridsOuter.addEventListener("mousedown", (event) => {
  event.preventDefault();
  global_mousedownCheck = true;
});

gridsOuter.addEventListener("mouseover", (event) => {
  if (global_mousedownCheck === true) {
    const grid = event.target;
    if (grid.classList[0] === "grid") {
      colorizeGrid(grid);
    }
  }
});

document.addEventListener("mouseup", (event) => {
  if (global_mousedownCheck === true) global_mousedownCheck = false;
});

//FUNCTIONS
function generate() {
  //Get the number
  const gridSize = parseInt(input.value);
  //Generate grids
  if (
    gridSize < 129 &&
    gridSize > 3 &&
    gridsOuter.firstElementChild.innerHTML === ""
  ) {
    for (let i = 0; i < gridSize * gridSize; i++) {
      const grid = document.createElement("div");
      grid.classList.add("grid");
      gridsOuter.firstElementChild.appendChild(grid);
    }
    gridsOuter.firstElementChild.style.gridTemplateColumns = `repeat(${gridSize}, auto)`;
  }
}

function refresh() {
  if (gridsOuter.firstElementChild.innerHTML !== "") {
    gridsOuter.firstElementChild.childNodes.forEach((grid) => {
      if (grid.style.backgroundColor !== "rgb(255, 255, 255)")
        grid.style.backgroundColor = "rgb(255, 255, 255)";
    });
  }
}

function del() {
  gridsOuter.removeChild(gridsOuter.firstElementChild);
  const removable = document.createElement("div");
  gridsOuter.appendChild(removable);
  removable.classList.add("removable");
}

function randomColor() {
  return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)})`;
}

function colorizeGrid(grid) {
  grid.style.backgroundColor = randomColor();
}

function hideDock() {
  console.log("aga");
  dockElements.forEach((el) => el.classList.toggle("hidden"));
  buttons[0].classList.toggle("hidden");
  buttons[1].classList.toggle("hidden");
}
