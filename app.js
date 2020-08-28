//Etch-a-sketch

//VARIABLES
const input = document.querySelector("#input");
const gridsOuter = document.querySelector(".grids");
const gridsInner = gridsOuter.firstElementChild;
const buttons = document.querySelectorAll(".hide-header-button");
const dockElements = document.querySelectorAll(".colorful-background");
const styleButton = document.querySelector(".trailing");
const colorInput = document.querySelector(".color");
const notification = document.querySelector(".notification");
const mode = document.querySelector(".mode");
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
    } else if (target.classList[1] === "trailing") {
      refresh();
      changeStyle();
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
      if (styleChecker()) colorizeGrid(grid);
      else trailGrid(grid);
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
    for (let i = 0; i < (gridSize * gridSize) / 2; i++) {
      const grid = document.createElement("div");
      grid.classList.add("grid");
      gridsOuter.firstElementChild.appendChild(grid);
    }
    gridsOuter.firstElementChild.style.gridTemplateColumns = `repeat(${gridSize}, auto)`;
    changeNotification(gridSize);
  }
}

function refresh() {
  if (styleChecker() === false) return;
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
  notification.innerText = `Please generate the grid to start drawing.`;
  mode.classList.toggle("hidden");
}

function randomColor() {
  return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)})`;
}

function colorizeGrid(grid) {
  grid.style.backgroundColor = randomColor();
}

async function trailGrid(grid) {
  const colorHex = colorInput.value;
  let c = colorHex.substring(1).split("");
  if (c.length == 3) {
    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
  }
  c = "0x" + c.join("");
  for (let i = 10; i >= 0; i--) {
    const colorRgba =
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      `${i / 10}`;
    grid.style.backgroundColor = colorRgba;
    await sleep(30);
  }
}

function hideDock() {
  dockElements.forEach((el) => el.classList.toggle("hidden"));
  buttons[0].classList.toggle("hidden");
  buttons[1].classList.toggle("hidden");
}

function changeStyle() {
  styleButton.firstElementChild.innerText =
    styleButton.firstElementChild.innerText === "D" ? "T" : "D";
  mode.innerText =
    styleButton.firstElementChild.innerText === "D"
      ? "Mode: Drawing"
      : "Mode: Trailing";
}

function styleChecker() {
  if (styleButton.firstElementChild.innerText === "D") return true;
  else return false;
}

//Sleep function for wait effect
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function changeNotification(gridSize) {
  notification.innerText = `Grid Size: ${gridSize} x ${gridSize}`;
  mode.innerText =
    styleButton.firstElementChild.innerText === "D"
      ? "Mode: Drawing"
      : "Mode: Trailing";
  mode.classList.toggle("hidden");
}
