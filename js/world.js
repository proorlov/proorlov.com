const COLS = 176;
const ROWS = 74;
const LAND = "#171614";
const EVENT = "#007AFF";
const EVENT_GLOW = "rgba(0, 122, 255, 0.4)";
const CITY = {
  "Abu Dhabi": [24.4539, 54.3773],
  Amsterdam: [52.3676, 4.9041],
  Almaty: [43.222, 76.8512],
  Athens: [37.9838, 23.7275],
  Astana: [51.1694, 71.4491],
  Austin: [30.2672, -97.7431],
  Bangkok: [13.7563, 100.5018],
  Barcelona: [41.3874, 2.1686],
  Berlin: [52.52, 13.405],
  Bielefeld: [52.0302, 8.5325],
  Boston: [42.3601, -71.0589],
  Bucharest: [44.4268, 26.1025],
  "Cape Town": [-33.9249, 18.4241],
  "Cluj-Napoca": [46.7712, 23.6236],
  Cologne: [50.9375, 6.9603],
  Copenhagen: [55.6761, 12.5683],
  Davos: [46.8027, 9.836],
  Dubai: [25.2048, 55.2708],
  Dublin: [53.3498, -6.2603],
  Doha: [25.2854, 51.531],
  Gdańsk: [54.352, 18.6466],
  Hannover: [52.3759, 9.732],
  Helsinki: [60.1699, 24.9384],
  "Hong Kong": [22.3193, 114.1694],
  Jakarta: [-6.2088, 106.8456],
  "Las Vegas": [36.1699, -115.1398],
  Lisbon: [38.7223, -9.1393],
  London: [51.5074, -0.1278],
  Madrid: [40.4168, -3.7038],
  Malmö: [55.605, 13.0038],
  Maribor: [46.5547, 15.6459],
  Miami: [25.7617, -80.1918],
  Munich: [48.1351, 11.582],
  Mumbai: [19.076, 72.8777],
  Nashville: [36.1627, -86.7816],
  "New York": [40.7128, -74.006],
  Oslo: [59.9139, 10.7522],
  Paris: [48.8566, 2.3522],
  Portugal: [38.7223, -9.1393],
  Reykjavík: [64.1466, -21.9426],
  Riga: [56.9496, 24.1052],
  "Rio de Janeiro": [-22.9068, -43.1729],
  "San Francisco": [37.7749, -122.4194],
  "San Jose": [37.3382, -121.8863],
  "San Mateo": [37.5629, -122.3255],
  Seoul: [37.5665, 126.978],
  Shanghai: [31.2304, 121.4737],
  Singapore: [1.3521, 103.8198],
  Sofia: [42.6977, 23.3219],
  "St. Gallen": [47.4245, 9.3767],
  Stockholm: [59.3293, 18.0686],
  Tallinn: [59.437, 24.7536],
  Tbilisi: [41.7151, 44.8271],
  Tartu: [58.378, 26.729],
  Toronto: [43.6532, -79.3832],
  "Tel Aviv": [32.0853, 34.7818],
  Turin: [45.0703, 7.6869],
  Valencia: [39.4699, -0.3763],
  Valletta: [35.8989, 14.5146],
  Vancouver: [49.2827, -123.1207],
  Vienna: [48.2082, 16.3738],
  Vilnius: [54.6872, 25.2797],
  Warsaw: [52.2297, 21.0122],
  Winterthur: [47.4988, 8.7237],
  Zadar: [44.1194, 15.2314],
};
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

function cityName(text) {
  return text.replace(/^[^\p{L}]+/u, "").trim();
}

function eventNames() {
  const names = new Set();
  document.querySelectorAll(".events-table tbody tr td:nth-child(2)").forEach((cell) => {
    const name = cityName(cell.textContent || "");
    if (name) names.add(name);
  });
  return names;
}

function snapCity(lat, lon, cells) {
  const fx = ((lon + 180) / 360) * COLS;
  const fy = ((90 - lat) / 180) * ROWS;
  let best = cells[0];
  let bestD = Infinity;
  for (const cell of cells) {
    const dx = cell.x - fx;
    const dy = cell.y - fy;
    const d = dx * dx + dy * dy;
    if (d < bestD) {
      bestD = d;
      best = cell;
    }
  }
  return best;
}

function eventCells(cells) {
  const seen = new Set();
  const lit = [];
  for (const name of eventNames()) {
    const coords = CITY[name];
    if (!coords) continue;
    const cell = snapCity(coords[0], coords[1], cells);
    const key = cell.x + "," + cell.y;
    if (seen.has(key)) continue;
    seen.add(key);
    lit.push(cell);
  }
  return lit;
}

function startWorld() {
  const wrap = document.querySelector(".world");
  const canvas = document.getElementById("world-map");
  if (!wrap || !canvas) return;

  const ctx = canvas.getContext("2d");
  const cells = loadCells();
  const lit = eventCells(cells);
  const litKeys = new Set(lit.map((cell) => cell.x + "," + cell.y));
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

    const pulse = reduced ? 0 : 0.5 + 0.5 * Math.sin(performance.now() / 420);

    function paint(c, color, extra) {
      const cx = ox + c.x * (cell + gap) + cell / 2;
      const cy = oy + c.y * (cell + gap) + cell / 2;
      const dist = Math.hypot(cx - mx, cy - my);
      const heat = mouse.inside && !reduced ? Math.exp((-dist * dist) / (radius * radius)) : 0;
      const size = cell * (1 + heat * 0.32 + extra);
      ctx.fillStyle = color;
      ctx.fillRect(cx - size / 2, cy - size / 2, size, size);
    }

    for (const c of cells) {
      if (litKeys.has(c.x + "," + c.y)) continue;
      paint(c, LAND, 0);
    }

    for (const c of lit) {
      paint(c, EVENT_GLOW, 1.05 + pulse * 0.18);
      paint(c, EVENT, 0.48 + pulse * 0.14);
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
