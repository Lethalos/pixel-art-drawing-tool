const canvas = document.querySelector(".canvas");
const sizeBtn = document.querySelector(".size-btn");
const clearBtn = document.querySelector(".clear-btn");

const DEFAULT_SIZE = 16;
let canvasSize = DEFAULT_SIZE;

const deleteSquares = () => {
  const squares = document.querySelectorAll(".pixel");
  for (let i = 0; i < squares.length; i++) {
    squares[i].remove();
  }
};

const drawCanvas = (size, color) => {
  deleteSquares();
  canvasSize = size;
  let numOfPixel = size * size;
  let squareWidth = 500 / size;

  for (let i = 0; i < numOfPixel; i++) {
    let square = document.createElement("div");
    square.className = "pixel";
    square.style.width = squareWidth + "px";
    square.style.height = squareWidth + "px";
    square.style.backgroundColor = color;
    square.style.border = "1px solid black";
    square.addEventListener("mouseenter", () => {
      square.style.backgroundColor = "black";
    });
    canvas.appendChild(square);
  }
};

drawCanvas(DEFAULT_SIZE, "white");

sizeBtn.addEventListener("click", () => {
  let size = prompt("Enter a canvas size (max 64): ");

  if (size > 0 && size > 64) {
    alert("Please enter a size 100 or below");
    return;
  }

  if (size == null) {
    size = DEFAULT_SIZE;
  }

  drawCanvas(size, "white");
});

clearBtn.addEventListener("click", () => {
  drawCanvas(canvasSize, "white");
});
