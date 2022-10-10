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
const clearBtn = document.querySelector(".clear-btn");
const clickMode = document.querySelector(".click-mode");
const defaultBtn = document.querySelector(".default-btn");

sizeSlider.min = 1;
sizeSlider.max = 64;
sizeSlider.onchange = () => {
  drawCanvas(sizeSlider.value, currentMode);
};

const deletePixels = () => {
  const pixels = document.querySelectorAll(".pixel");
  for (let i = 0; i < pixels.length; i++) {
    pixels[i].remove();
  }
};

const getRandomColor = () => {
  const c1 = Math.floor(Math.random() * 256);
  const c2 = Math.floor(Math.random() * 256);
  const c3 = Math.floor(Math.random() * 256);

  return `rgb(${c1}, ${c2}, ${c3})`;
};

const drawCanvas = (size, mode) => {
  deletePixels();
  currentSize = size;
  sizeSlider.value = size;
  sliderText.innerHTML = `${size} x ${size}`;
  currentMode = mode;

  let numOfPixel = size * size;
  let pixelWidth = CANVAS_PIXEL / size;

  for (let i = 0; i < numOfPixel; i++) {
    let pixel = document.createElement("div");
    pixel.className = "pixel";
    pixel.style.backgroundColor = "white";
    pixel.style.border = "1px solid black";
    pixel.addEventListener(mode, () => {
      if (randomColorMode == true) {
        currentPenColor = getRandomColor();
      } else {
        currentPenColor = DEFAULT_PEN_COLOR;
      }
      pixel.style.backgroundColor = currentPenColor;
    });
    canvas.appendChild(pixel);
  }

  canvas.style.display = "grid";
  canvas.style.gridTemplateColumns = `repeat(${size}, ${pixelWidth}px)`;
};

drawCanvas(DEFAULT_SIZE, DEFAULT_MODE);

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

clickMode.addEventListener("click", () => {
  if (currentMode == "click") {
    return;
  }

  drawCanvas(currentSize, "click");
});

clearBtn.addEventListener("click", () => {
  drawCanvas(currentSize, currentMode);
});

defaultBtn.addEventListener("click", () => {
  drawCanvas(DEFAULT_SIZE, DEFAULT_MODE);
});
