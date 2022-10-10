const CANVAS_PIXEL = 600;
const DEFAULT_SIZE = 16;
const DEFAULT_PEN_COLOR = "black";
const DEFAULT_MODE = "mouseenter";
let currentSize = DEFAULT_SIZE;
let currentPenColor = DEFAULT_PEN_COLOR;
let currentMode = DEFAULT_MODE;
let randomColorMode = false;

const canvas = document.querySelector(".canvas");
canvas.style.height = `${CANVAS_PIXEL}px`;
canvas.style.width = `${CANVAS_PIXEL}px`;

const sizeSlider = document.querySelector(".size-slider");
const sliderText = document.querySelector(".slider-text");

const randomColors = document.querySelector(".random-colors");
const dragMode = document.querySelector(".drag-mode");
const clickMode = document.querySelector(".click-mode");
const clearBtn = document.querySelector(".clear-btn");
const defaultBtn = document.querySelector(".default-btn");

sizeSlider.min = 1;
sizeSlider.max = 64;
sizeSlider.addEventListener("change", () => {
  drawCanvas(sizeSlider.value);
});

const deletePixels = () => {
  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => pixel.remove());
};

const getRandomColor = () => {
  const c1 = Math.floor(Math.random() * 256);
  const c2 = Math.floor(Math.random() * 256);
  const c3 = Math.floor(Math.random() * 256);

  return `rgb(${c1}, ${c2}, ${c3})`;
};

const setPixelColor = (event) => {
  if (randomColorMode == true) {
    currentPenColor = getRandomColor();
  } else {
    currentPenColor = DEFAULT_PEN_COLOR;
  }
  event.target.style.backgroundColor = currentPenColor;
};

const drawCanvas = (size) => {
  deletePixels();
  currentSize = size;
  sizeSlider.value = size;
  sliderText.innerHTML = `${size} x ${size}`;

  let numOfPixel = size * size;
  let pixelWidth = CANVAS_PIXEL / size;

  for (let i = 0; i < numOfPixel; i++) {
    let pixel = document.createElement("div");
    pixel.className = "pixel";
    pixel.style.backgroundColor = "white";
    pixel.style.border = "1px solid black";
    pixel.addEventListener(currentMode, setPixelColor);
    canvas.appendChild(pixel);
  }

  canvas.style.display = "grid";
  canvas.style.gridTemplateColumns = `repeat(${size}, ${pixelWidth}px)`;
};

drawCanvas(DEFAULT_SIZE);

randomColors.addEventListener("click", () => {
  randomColorMode = !randomColorMode;
  if (randomColorMode) {
    document
      .querySelector(":root")
      .style.setProperty("--randomColors-zIndex", 0);
  } else {
    document
      .querySelector(":root")
      .style.setProperty("--randomColors-zIndex", -1);
  }
});

dragMode.addEventListener("click", () => {
  if (currentMode == "mouseenter") {
    return;
  }

  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.removeEventListener(currentMode, setPixelColor);
    pixel.addEventListener("mouseenter", setPixelColor);
  });

  currentMode = "mouseenter";
});

clickMode.addEventListener("click", () => {
  if (currentMode == "click") {
    return;
  }

  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.removeEventListener(currentMode, setPixelColor);
    pixel.addEventListener("click", setPixelColor);
  });

  currentMode = "click";
});

clearBtn.addEventListener("click", () => {
  drawCanvas(currentSize);
});

defaultBtn.addEventListener("click", () => {
  currentMode = DEFAULT_MODE;
  drawCanvas(DEFAULT_SIZE);
});
