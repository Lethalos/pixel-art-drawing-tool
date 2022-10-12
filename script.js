const CANVAS_PIXEL = 600;
const DEFAULT_SIZE = 16;
const DEFAULT_PEN_COLOR = "black";
const DEFAULT_MODE = "mouseenter";
let currentSize = DEFAULT_SIZE;
let currentPenColor = DEFAULT_PEN_COLOR;
let selectedPenColor = DEFAULT_PEN_COLOR;
let currentMode = DEFAULT_MODE;
let randomColorMode = false;

let isDraggable = false;
window.addEventListener("mousedown", (event) => {
  isDraggable = true;
  if (event.target.className == "pixel" && currentMode == DEFAULT_MODE) {
    setPixelColor(event);
  }
});

window.addEventListener("mouseup", () => {
  isDraggable = false;
});

const canvas = document.querySelector(".canvas");
canvas.style.height = `${CANVAS_PIXEL}px`;
canvas.style.width = `${CANVAS_PIXEL}px`;

const sizeSlider = document.querySelector(".size-slider");
const sliderText = document.querySelector(".slider-text");
sizeSlider.min = 1;
sizeSlider.max = 64;
sizeSlider.addEventListener("change", () => {
  drawCanvas(sizeSlider.value);
});

const randomColors = document.querySelector(".random-colors");
const dragMode = document.querySelector(".drag-mode");
const clickMode = document.querySelector(".click-mode");
const clearBtn = document.querySelector(".clear-btn");
const defaultBtn = document.querySelector(".default-btn");

const modeText = document.querySelector(".mode-text");
modeText.innerText = "Drag Mode active";

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
  if (!isDraggable && currentMode == DEFAULT_MODE) {
    return;
  }

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
    pixel.style.border = "1px solid black";
    pixel.addEventListener(currentMode, setPixelColor);
    canvas.appendChild(pixel);
  }

  canvas.style.display = "grid";
  canvas.style.gridTemplateColumns = `repeat(${size}, ${pixelWidth}px)`;
};

drawCanvas(DEFAULT_SIZE);

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

fillColorPallette();

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

randomColors.addEventListener("click", toggleRandomColorAnim);

dragMode.addEventListener("click", () => {
  if (currentMode == DEFAULT_MODE) {
    return;
  }

  const pixels = document.querySelectorAll(".pixel");
  pixels.forEach((pixel) => {
    pixel.removeEventListener(currentMode, setPixelColor);
    pixel.addEventListener(DEFAULT_MODE, setPixelColor);
  });

  currentMode = DEFAULT_MODE;
  modeText.innerText = "Drag Mode active";
  playModeTextAnim();
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
  modeText.innerText = "Click Mode active";
  playModeTextAnim();
});

clearBtn.addEventListener("click", () => {
  drawCanvas(currentSize);
});

defaultBtn.addEventListener("click", () => {
  currentMode = DEFAULT_MODE;
  modeText.innerText = "Drag Mode active";
  playModeTextAnim();

  drawCanvas(DEFAULT_SIZE);
});

const playModeTextAnim = () => {
  modeText.classList.add("mode-text-anim");
  setTimeout(() => {
    modeText.classList.remove("mode-text-anim");
  }, 500);
};
