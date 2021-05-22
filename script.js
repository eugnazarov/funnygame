
const inputs = {
  up: "w",
  down: "s",
  left: "a",
  right: "d",
};

let border = 600;
let currentVer = 0;
let currentHor = 0;
let score = 0;

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const spawnFood = () => {
  let points = [];

  for (let x = 0; x < border; x += 25) {
    for (let y = 0; y < border; y += 25) {
      let point = {
        x: x,
        y: y,
      };
      let hero = document.getElementById("hero");
      if (hero.style.top + 0 !== point.y && hero.style.left + 0 !== point.x) {
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

spawnFood();

const move = (event) => {
  let hero = document.getElementById("hero");
  console.log("move");
  switch (event.key) {
    case inputs.down: {
      console.log("down");

      currentVer += 25;

      break;
    }

    case inputs.up: {
      console.log("up");
      currentVer -= 25;
      break;
    }
    case inputs.right: {
      console.log("right");
      currentHor += 25;
      break;
    }

    case inputs.left: {
      console.log("left");
      currentHor -= 25;
      break;
    }
  }

  hero.style.top = currentVer + "px";
  hero.style.left = currentHor + "px";

  let food = document.getElementById("food");
  if (
    food.style.left === hero.style.left &&
    food.style.top === hero.style.top
  ) {
    eatFood();
    spawnFood();
  }
};

const startGame = () => {
  console.log("start game");
  document.addEventListener("keydown", move);
  document.getElementById("start").remove();
};
