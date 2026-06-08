const canvas = document.querySelector("#network-canvas");
const ctx = canvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let width = 0;
let height = 0;
let dpr = 1;
let points = [];
let animationFrame = 0;

const palette = [
  "rgba(55, 229, 255, 0.9)",
  "rgba(79, 141, 255, 0.85)",
  "rgba(154, 108, 255, 0.78)",
  "rgba(255, 114, 210, 0.58)",
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = rect.width;
  height = rect.height;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  createNetwork();
}

function createNetwork() {
  const count = Math.max(30, Math.min(76, Math.floor(width / 18)));
  points = Array.from({ length: count }, (_, index) => {
    const sideBias = index % 3 === 0 ? randomBetween(0.48, 0.98) : Math.random();
    return {
      x: width * sideBias,
      y: randomBetween(height * 0.08, height * 0.9),
      vx: randomBetween(-0.18, 0.18),
      vy: randomBetween(-0.15, 0.15),
      radius: randomBetween(1.2, 2.8),
      color: palette[index % palette.length],
      pulse: randomBetween(0, Math.PI * 2),
    };
  });
}

function drawGradientField() {
  const leftGlow = ctx.createRadialGradient(width * 0.22, height * 0.46, 0, width * 0.22, height * 0.46, width * 0.54);
  leftGlow.addColorStop(0, "rgba(55, 229, 255, 0.12)");
  leftGlow.addColorStop(1, "rgba(55, 229, 255, 0)");
  ctx.fillStyle = leftGlow;
  ctx.fillRect(0, 0, width, height);

  const rightGlow = ctx.createRadialGradient(width * 0.78, height * 0.38, 0, width * 0.78, height * 0.38, width * 0.46);
  rightGlow.addColorStop(0, "rgba(154, 108, 255, 0.15)");
  rightGlow.addColorStop(1, "rgba(154, 108, 255, 0)");
  ctx.fillStyle = rightGlow;
  ctx.fillRect(0, 0, width, height);
}

function drawConnections() {
  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const first = points[i];
      const second = points[j];
      const dx = first.x - second.x;
      const dy = first.y - second.y;
      const distance = Math.hypot(dx, dy);
      const maxDistance = width < 620 ? 96 : 138;

      if (distance < maxDistance) {
        const alpha = (1 - distance / maxDistance) * 0.28;
        ctx.strokeStyle = `rgba(117, 213, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(first.x, first.y);
        ctx.lineTo(second.x, second.y);
        ctx.stroke();
      }
    }
  }
}

function drawPoints(time) {
  points.forEach((point) => {
    const pulse = reduceMotion.matches ? 0.6 : Math.sin(time / 700 + point.pulse) * 0.45 + 0.7;
    ctx.beginPath();
    ctx.fillStyle = point.color;
    ctx.shadowColor = point.color;
    ctx.shadowBlur = 18 * pulse;
    ctx.arc(point.x, point.y, point.radius * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

function updatePoints() {
  if (reduceMotion.matches) {
    return;
  }

  points.forEach((point) => {
    point.x += point.vx;
    point.y += point.vy;

    if (point.x < width * 0.06 || point.x > width * 0.98) {
      point.vx *= -1;
    }

    if (point.y < height * 0.08 || point.y > height * 0.92) {
      point.vy *= -1;
    }
  });
}

function render(time = 0) {
  ctx.clearRect(0, 0, width, height);
  drawGradientField();
  drawConnections();
  drawPoints(time);
  updatePoints();

  animationFrame = window.requestAnimationFrame(render);
}

function restartAnimation() {
  window.cancelAnimationFrame(animationFrame);
  render();
}

resizeCanvas();
restartAnimation();

window.addEventListener("resize", resizeCanvas, { passive: true });
reduceMotion.addEventListener("change", restartAnimation);

// Language switcher: swaps body copy between Korean, English, and Japanese.
// The hero sub-message and CTA buttons stay multilingual by design.
(function initLanguage() {
  const supported = ["ko", "en", "ja"];
  const buttons = Array.from(document.querySelectorAll("[data-set-lang]"));

  let stored = null;
  try {
    stored = window.localStorage.getItem("appfactory-lang");
  } catch (error) {
    stored = null;
  }

  const browser = (navigator.language || "").slice(0, 2).toLowerCase();
  const initial = supported.includes(stored)
    ? stored
    : supported.includes(browser)
      ? browser
      : "ko";

  function setLanguage(lang) {
    if (!supported.includes(lang)) {
      return;
    }

    document.body.dataset.lang = lang;
    document.documentElement.lang = lang;

    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.setLang === lang));
    });

    try {
      window.localStorage.setItem("appfactory-lang", lang);
    } catch (error) {
      // Storage may be unavailable (private mode); language still applies for the session.
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.setLang));
  });

  setLanguage(initial);
})();
