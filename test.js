

// get canvas 2D context object
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const GLOBALS = {};

/* OUR SPIKES CLASS */

class Spikes {
  constructor(x, y) {
    // anchor where spikes will be based..
    this.anchor = { x: x, y: y };
    // variable offset from anchor to shake spikes...
    this.offset = 0;
    this.direction = "left";
    this.i = 0;
    // set an interval for a loop animation...
    this.animation = setInterval(() => {
      if (this.i === 10) {
        this.direction = this.direction === "right" ? "left" : "right";
        this.i = 0;
      } else {
        if (this.direction === "left") {
          this.offset -= 3;
          this.i++;
        } else {
          this.offset += 3;
          this.i++;
        }
      }
    }, 20);
  }
  render() {
    let x = this.anchor.x + this.offset,
      y = this.anchor.y;

    // simply create a zig zag
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x + 10, y);
    ctx.lineTo(x + 20, y + 20);
    ctx.lineTo(x + 30, y);
    ctx.lineTo(x + 40, y + 20);
    ctx.lineTo(x + 50, y);
    ctx.lineTo(x + 60, y + 20);
    ctx.lineTo(x + 70, y);
    ctx.lineTo(x + 80, y + 20);
    ctx.lineTo(x + 90, y);
    ctx.lineTo(x + 100, y + 20);
    ctx.stroke();
  }
}

// Push a set of spikes into our props...
const PROPS = [];
PROPS.push(new Spikes(110, 130));

const CHARS = [];

// function for applying any initial settings
function init() {}

// function for rendering background elements
function renderBackground() {}

// function for rendering prop objects in PROPS
function renderProps() {
  for (let p in PROPS) PROPS[p].render();
}

// function for rendering character objects in CHARS
function renderCharacters() {}

// function for rendering onscreen controls
function renderControls() {}

// main function to be run for rendering frames
function startFrames() {
  // erase entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // render each type of entity in order, relative to layers
  renderBackground();
  renderProps();
  renderCharacters();
  renderControls();

  // rerun function (call next frame)
  window.requestAnimationFrame(startFrames);
}

init(); // initialize game settings
startFrames(); // start running frames

