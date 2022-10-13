const CANVAS_PIXEL = 600;
const DEFAULT_SIZE = 16;
const DEFAULT_PEN_COLOR = "black";
const DRAG_MODE = {
  event: "pointerenter",
  text: "Drag Mode Active",
};
const CLICK_MODE = {
  event: "pointerdown",
  text: "Click Mode Active",
};
let currentSize = DEFAULT_SIZE;
let currentPenColor = DEFAULT_PEN_COLOR;
let selectedPenColor = DEFAULT_PEN_COLOR;
let currentMode = DRAG_MODE.event;
let randomColorMode = false;
let isDraggable = false;
window.addEventListener("pointerdown", (event) => {
  isDraggable = true;
  if (event.target.className == "pixel" && currentMode == DRAG_MODE.event) {
    setPixelColor(event);
  }
});
window.addEventListener("pointerup", () => {
  isDraggable = false;
});

//DOM Elements
const canvas = document.querySelector(".canvas");
const sizeSlider = document.querySelector(".size-slider");
const sliderText = document.querySelector(".slider-text");
const randomColorsBtn = document.querySelector(".random-colors");
const dragModeBtn = document.querySelector(".drag-mode");
const clickModeBtn = document.querySelector(".click-mode");
const clearBtn = document.querySelector(".clear-btn");
const defaultBtn = document.querySelector(".default-btn");
const modeText = document.querySelector(".mode-text");

canvas.style.height = `${CANVAS_PIXEL}px`;
canvas.style.width = `${CANVAS_PIXEL}px`;

sizeSlider.min = 1;
sizeSlider.max = 64;
sizeSlider.addEventListener("change", () => {
  drawCanvas(sizeSlider.value);
});

modeText.innerText = DRAG_MODE.text;

//CANVAS
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
  if (!isDraggable && currentMode == DRAG_MODE.event) {
    return;
  }

  event.target.releasePointerCapture(event.pointerId);

  if (randomColorMode == true) {
    currentPenColor = getRandomColor();
  } else {
    currentPenColor = selectedPenColor;
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
    pixel.style.border = "1px solid #a0a0a0";
    pixel.addEventListener(currentMode, setPixelColor);
    canvas.appendChild(pixel);
  }

  canvas.style.display = "grid";
  canvas.style.gridTemplateColumns = `repeat(${size}, ${pixelWidth}px)`;
};

//SETTINGS
const fillColorPallette = () => {
  const colorsDiv = document.querySelectorAll(".color");
  const currentColorDiv = document.querySelector(".current-color");
  currentColorDiv.style.backgroundColor = currentPenColor;

  colorsDiv.forEach((div) => {
    const color = div.getAttribute("data-color");
    div.style.backgroundColor = color;
    div.addEventListener("click", () => {
      if (randomColorMode == true) {
        toggleRandomColorAnim();
      }
      selectedPenColor = color;
      currentColorDiv.style.backgroundColor = selectedPenColor;
    });
  });
};

//BUTTONS
const toggleRandomColorAnim = (event) => {
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
};

randomColorsBtn.addEventListener("click", toggleRandomColorAnim);

dragModeBtn.addEventListener("click", () => {
  if (currentMode == DRAG_MODE.event) {
    return;
  }

  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.removeEventListener(currentMode, setPixelColor);
    pixel.addEventListener(DRAG_MODE.event, setPixelColor);
  });

  currentMode = DRAG_MODE.event;
  modeText.innerText = DRAG_MODE.text;
  playModeTextAnim();
});

clickModeBtn.addEventListener("click", () => {
  if (currentMode == CLICK_MODE.event) {
    return;
  }

  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.removeEventListener(currentMode, setPixelColor);
    pixel.addEventListener(CLICK_MODE.event, setPixelColor);
  });

  currentMode = CLICK_MODE.event;
  modeText.innerText = CLICK_MODE.text;
  playModeTextAnim();
});

clearBtn.addEventListener("click", () => {
  drawCanvas(currentSize);
});

defaultBtn.addEventListener("click", () => {
  currentMode = DRAG_MODE.event;
  modeText.innerText = DRAG_MODE.text;
  playModeTextAnim();

  drawCanvas(DEFAULT_SIZE);
});

const playModeTextAnim = () => {
  modeText.classList.add("mode-text-anim");
  setTimeout(() => {
    modeText.classList.remove("mode-text-anim");
  }, 500);
};

fillColorPallette();
drawCanvas(DEFAULT_SIZE);
