"use strict";

const inputs = {
  up: "w",
  down: "s",
  left: "a",
  right: "d",
};
let borderTop = 700;
let borderLeft = 1000;
let score = 0;

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const spawnFood = () => {
  let points = [];

  for (let x = 0; x < borderLeft; x += 25) {
    for (let y = 0; y < borderTop; y += 25) {
      let point = {
        x: x,
        y: y,
      };

      if (currentTop !== point.y && currentLeft !== point.x) {
        points.push(point);
      }
    }
  }

  let rand = random(0, points.length);
  let food = points[rand];
  let map = document.getElementById("map");
  map.innerHTML += "<div id=food class=food></div>";
  let foodPoint = document.getElementById("food");
  foodPoint.style.top = `${food.y}px`;
  foodPoint.style.left = `${food.x}px`;
};

const eatFood = () => {
  let food = document.getElementById("food");
  food.remove();
  score++;
  let scoreText = document.getElementById("score");
  scoreText.innerText = `Your score: ${score}`;
};

function move(event) {
  let currentTop = parseInt(hero.style.top);
  let currentLeft = parseInt(hero.style.left);
  let hero = document.getElementById("hero");

  switch (event.key) {
    case inputs.down: {
      if (currentTop + 25 < borderTop) currentTop += 25;
      break;
    }

    case inputs.up: {
      if (currentTop > 0) currentTop -= 25;
      break;
    }

    case inputs.left: {
      if (currentLeft > 0) currentLeft -= 25;
      break;
    }

    case inputs.right: {
      if (currentLeft + 26 < borderLeft) currentLeft += 25;
      break;
    }
  }

  console.log(currentTop, currentLeft);
  hero.style.top = `${currentTop}px`;
  hero.style.left = `${currentLeft}px`;
  let food = document.getElementById("food");

  if (
    food.style.top === hero.style.top &&
    food.style.left === hero.style.left
  ) {
    eatFood();
    spawnFood();
  }
}

document.addEventListener("keydown", move);
spawnFood();
