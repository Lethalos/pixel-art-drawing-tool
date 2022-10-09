const canvas = document.querySelector(".canvas");
const clearBtn = document.querySelector(".clear-btn");
const clickMode = document.querySelector(".click-mode");
const defaultBtn = document.querySelector(".default-btn");
const sizeSlider = document.querySelector(".size-slider");
const sliderText = document.querySelector(".slider-text");

console.log(sizeSlider);

const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "white";
const DEFAULT_MODE = "mouseenter";
let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;

sizeSlider.min = 1;
sizeSlider.max = 64;
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
  sizeSlider.value = size;
  sliderText.innerHTML = `${size} x ${size}`;
  currentMode = mode;

  let numOfPixel = size * size;
  let squareWidth = 500 / size;

  for (let i = 0; i < numOfPixel; i++) {
    let square = document.createElement("div");
    square.className = "pixel";
    square.style.backgroundColor = color;
    square.style.border = "1px solid black";
    square.addEventListener(mode, () => {
      square.style.backgroundColor = "black";
    });
    canvas.appendChild(square);
  }

  canvas.style.display = "grid";
  canvas.style.gridTemplateColumns = `repeat(${size}, ${squareWidth}px)`;
};

drawCanvas(DEFAULT_SIZE, DEFAULT_COLOR, DEFAULT_MODE);

clickMode.addEventListener("click", () => {
  if (currentMode == "click") {
    return;
  }

  drawCanvas(currentSize, DEFAULT_COLOR, "click");
});

clearBtn.addEventListener("click", () => {
  drawCanvas(currentSize, DEFAULT_COLOR, currentMode);
});

defaultBtn.addEventListener("click", () => {
  drawCanvas(DEFAULT_SIZE, DEFAULT_COLOR, DEFAULT_MODE);
});
