const COLS = 176;
const ROWS = 74;
const LAND = "#171614";
const MAP =
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///+AAAAAAAAAAAAAAAAAAAAAAAA3////AfgAA/AAAAAAAAAAAAAAAAAD//v//gDAA8B/A4AAAAAAAAAAAAAAD9/wf/4AAAcH//nwAAAAAAAAAADAgB//+D/8AAAHP////gEAAAAAAAAAD/////x//AB/gP//////wAAAAAAAB5/////+f8AA//////////AAAAAAAA///////n8fAf/////////4AAAAAAAD/////7x8BAP//////////AAAAAAAA////+HgeAAH//////////gAAAAAAAH5///D+AAAc/f///////7AAAAAAAAD4P//4/gAAHHv///////B8AAAAAAADAD////+AAD5////////+PAAAAAAAAAB/////gAA//////////xwAAAAAAAAAP////4AAH/////////+MAAAAAAAAAD////+AAA//////////wAAAAAAAAAA////9gAAP/////////8AAAAAAAAAAf////AAAB///z/////9gAAAAAAAAAH///4AAAD//48//////cAAAAAAAAAD///+AAAA/f//j/////HAAAAAAAAAA///+AAAAfm//5/////wwAAAAAAAAAP///AAAAD/9//P////+cAAAAAAAAAD///wAAAAf8A//////9/gAAAAAAAAAf//4AAAAP/AH//////ngAAAAAAAAAD//4AAAAH/////////5wAAAAAAAAAA//+AAAAB//////////AAAAAAAAAAAP/DgAAAB//////////wAAAAAAAAAAD/g8AAAAf////3////4AAAAAAAAAAAf4DAAAAP/////z////AAAAAAABgAAB8HwAAAD/////8f//+wAAAAAAAMAAAfuPgAAA//////B/v/AAAAAAAAAAAAD/j8AAAP/////gfx/xgAAAAAAAAAAAf8AAAAD/////wH4f4YAAAAAAAAAAAAfgAAAA/////wA8B+HAAAAAAAAAAAABw4AAAP////wAPAfx4AAAAAAAAAAAAM/4AAD/////gBwH4eAAAAAAAAAAAAB/+AAAf////4AeB8NwAAAAAAAAAAAAP/wAAD////8ABgMD8AAAAAAAAAAAAB//gAAfv///AAAPhwAAAAAAAAAAAAAf/4AAAA///gAAB58AAAAAAAAAAAAAP//AAAAP//wAAAP/+AAAAAAAAAAAAD//8AAAD//4AAAD/98AAAAAAAAAAAA///4AAA//8AAAAd/f4wAAAAAAAAAAP///AAAH//AAAAHHx/sAAAAAAAAAAD///4AAB//gAAAAeAP+wAAAAAAAAAAf//+AAAP/4AAAAD/w/HAAAAAAAAAAH///AAAD//AAAAAB4A4wAAAAAAAAAA///wAAA//zAAAAAA9gAAAAAAAAAAAP//4AAAf/8wAAAAA/cAAAAAAAAAAAB//+AAAH//8AAAAAf3AMMAAAAAAAAAH//gAAB//vAAAAAP/wAGAAAAAAAAAB//4AAAf/jgAAAAP/+BAAAAAAAAAAAf/8AAAD/54AAAAP//gYAAAAAAAAAAH/+AAAA/+eAAAAH//8AAAAAAAAAAAB/+AAAAP/HAAAAB///AAAAAAAAAAAAf/gAAAD/wAAAAAf//wAAAAAAAAAAAH/4AAAAf8AAAAAH//8AAAAAAAAAAAA/8AAAAH+AAAAAB//+AAAAAAAAAAAAP/AAAAA/AAAAAAfn/gAAAAAAAAAAAD/gAAAAMAAAAAAPB/wDAAAAAAAAAAB/wAAAAAAAAAAAAAP4AwAAAAAAAAAAP8AAAAAAAAAAAAAB4AcAAAAAAAAAAD8AAAAAAAAAAAAAAcAeAAAAAAAAAAA/AAAAAAAAAAAAAAHAOAAAAAAAAAAAPwAAAAAAAAAAAAAAAOAAAAAAAAAAAD4AAAAAAAAAAAAAAAHAAAAAAAAAAAAfAAAAAAAAAgAAAAAAAAAAAAAAAAAAHwAAAAAAAAYAAAAAAAAAAAAAAAAAAB9wAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";

function loadCells() {
  const packed = atob(MAP);
  const cells = [];
  const total = COLS * ROWS;
  for (let i = 0; i < total; i++) {
    const bit = (packed.charCodeAt(i >> 3) >> (7 - (i & 7))) & 1;
    if (bit) cells.push({ x: i % COLS, y: (i / COLS) | 0 });
  }
  return cells;
}

function startWorld() {
  const wrap = document.querySelector(".world");
  const canvas = document.getElementById("world-map");
  if (!wrap || !canvas) return;

  const ctx = canvas.getContext("2d");
  const cells = loadCells();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, inside: false };
  let width = 0;
  let height = 0;

  function resize() {
    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function layout() {
    const gap = 1.15;
    const cell = Math.min((width - gap) / COLS - gap, (height - gap) / ROWS - gap);
    const ox = (width - (cell + gap) * COLS + gap) / 2;
    const oy = (height - (cell + gap) * ROWS + gap) / 2;
    return { gap, cell, ox, oy };
  }

  function draw() {
    mouse.x += (mouse.tx - mouse.x) * 0.16;
    mouse.y += (mouse.ty - mouse.y) * 0.16;

    const { gap, cell, ox, oy } = layout();
    const mx = mouse.x * width;
    const my = mouse.y * height;
    const radius = Math.max(28, Math.min(width, height) * 0.22);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = LAND;

    for (const c of cells) {
      const cx = ox + c.x * (cell + gap) + cell / 2;
      const cy = oy + c.y * (cell + gap) + cell / 2;
      const dist = Math.hypot(cx - mx, cy - my);
      const heat = mouse.inside && !reduced ? Math.exp((-dist * dist) / (radius * radius)) : 0;
      const size = cell * (1 + heat * 0.32);
      ctx.fillRect(cx - size / 2, cy - size / 2, size, size);
    }

    requestAnimationFrame(draw);
  }

  function setPointer(event, inside) {
    const rect = wrap.getBoundingClientRect();
    mouse.tx = (event.clientX - rect.left) / rect.width;
    mouse.ty = (event.clientY - rect.top) / rect.height;
    mouse.inside = inside;
  }

  wrap.addEventListener("pointermove", (event) => setPointer(event, true));
  wrap.addEventListener("pointerenter", (event) => setPointer(event, true));
  wrap.addEventListener("pointerleave", () => {
    mouse.inside = false;
  });

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
}

startWorld();
