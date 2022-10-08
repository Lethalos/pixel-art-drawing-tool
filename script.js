const canvas = document.querySelector(".canvas");
const sizeBtn = document.querySelector(".size-btn");

const deleteSquares = () => {
  const squares = document.querySelectorAll(".pixel");
  for (let i = 0; i < squares.length; i++) {
    squares[i].remove();
  }
};

const drawCanvas = (size) => {
  deleteSquares();
  let numOfSquares = size * size;
  let squareWidth = 640 / size;

  for (let i = 0; i < numOfSquares; i++) {
    let square = document.createElement("div");
    square.className = "pixel";
    square.style.width = squareWidth + "px";
    square.style.height = squareWidth + "px";
    square.style.backgroundColor = "red";
    square.style.border = "1px solid black";
    square.addEventListener("mouseenter", () => {
      square.style.backgroundColor = "black";
    });
    canvas.appendChild(square);
  }
};

sizeBtn.addEventListener("click", () => {
  let size = prompt("Enter a canvas size (max 100): ");

  if (size > 0 && size > 100) {
    alert("Please enter a size 100 or below");
    return;
  }

  drawCanvas(size);
});
