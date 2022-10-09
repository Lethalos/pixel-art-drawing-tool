const canvas = document.querySelector(".canvas");
const sizeBtn = document.querySelector(".size-btn");
const clearBtn = document.querySelector(".clear-btn");
const clickMode = document.querySelector(".click-mode");
const defaultBtn = document.querySelector(".default-btn");
const sizeSlider = document.querySelector(".size-slider");

console.log(sizeSlider);

const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "white";
const DEFAULT_MODE = "mouseenter";
let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;

sizeSlider.min = 1;
sizeSlider.max = 64;
sizeSlider.value = DEFAULT_SIZE;
sizeSlider.onchange = () => {
  drawCanvas(sizeSlider.value, DEFAULT_COLOR, currentMode);
};

const deleteSquares = () => {
  const squares = document.querySelectorAll(".pixel");
  for (let i = 0; i < squares.length; i++) {
    squares[i].remove();
  }
};

const drawCanvas = (size, color, mode) => {
  deleteSquares();
  currentSize = size;
  currentMode = mode;
  let numOfPixel = size * size;
  let squareWidth = 500 / size;

  for (let i = 0; i < numOfPixel; i++) {
    let square = document.createElement("div");
    square.className = "pixel";
    square.style.width = squareWidth + "px";
    square.style.height = squareWidth + "px";
    square.style.backgroundColor = color;
    square.style.border = "1px solid black";
    square.addEventListener(mode, () => {
      square.style.backgroundColor = "black";
    });
    canvas.appendChild(square);
  }
};

drawCanvas(DEFAULT_SIZE, DEFAULT_COLOR, DEFAULT_MODE);

sizeBtn.addEventListener("click", () => {
  let size = prompt("Enter a canvas size (max 64): ");

  if (size > 0 && size > 64) {
    alert("Please enter a size 64 or below");
    return;
  }

  if (size == null) {
    size = DEFAULT_SIZE;
  }

  drawCanvas(size, DEFAULT_COLOR, currentMode);
});

clearBtn.addEventListener("click", () => {
  drawCanvas(currentSize, DEFAULT_COLOR, currentMode);
});

clickMode.addEventListener("click", () => {
  if (currentMode == "click") {
    return;
  }

  drawCanvas(currentSize, DEFAULT_COLOR, "click");
});

defaultBtn.addEventListener("click", () => {
  drawCanvas(DEFAULT_SIZE, DEFAULT_COLOR, DEFAULT_MODE);
});
