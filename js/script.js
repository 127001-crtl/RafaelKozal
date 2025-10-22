const img = document.getElementById("hoverImage");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let x = mouseX;
let y = mouseY;

let lastMouseX = mouseX;
let lastMouseY = mouseY;

let rotation = 0;
let targetRotation = 0;

let currentOpacity = 1;
let targetOpacity = 1;

const moveEasing = 0.1;
const opacityEasing = 0.05;
const rotationEasing = 0.05;

// 🧭 scale for rotation intensity — super tiny now
const rotationScale = 0.002; // was 0.02 → 10x smaller

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  targetOpacity = 1;
});

function animate() {
  const dx = mouseX - lastMouseX;
  const dy = mouseY - lastMouseY;

  // velocity magnitude and direction
  const speed = Math.sqrt(dx * dx + dy * dy);

  // 🎯 rotation proportional to horizontal movement (dx)
  // subtle tilt based on direction, very minimal
  const velAngle = Math.atan2(dy, dx);
  const rotAmount = dx * rotationScale; // uses horizontal velocity only

  // target rotation: tiny and balanced
  targetRotation = rotAmount;

  // Smooth position interpolation
  x += (mouseX - x) * moveEasing;
  y += (mouseY - y) * moveEasing;

  // Pull back if too far (safety)
  const dist = Math.hypot(mouseX - x, mouseY - y);
  if (dist > 150) {
    x += (mouseX - x) * 0.2;
    y += (mouseY - y) * 0.2;
  }

  // Smooth rotation
  rotation += (targetRotation - rotation) * rotationEasing;

  // Gradual fade when idle
  if (speed < 1) targetOpacity = Math.max(0, targetOpacity - 0.02);
  currentOpacity += (targetOpacity - currentOpacity) * opacityEasing;

  // Apply transforms
  img.style.transform = `
    translate(${x - img.width / 2}px, ${y - img.height / 2}px)
    rotate(${rotation}deg)
  `;
  img.style.opacity = currentOpacity;

  lastMouseX = mouseX;
  lastMouseY = mouseY;

  requestAnimationFrame(animate);
}

animate();
