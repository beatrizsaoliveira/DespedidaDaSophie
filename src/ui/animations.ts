// ============================================================
// Confetti & celebration animations
// ============================================================

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

const COLORS = [
  '#6b8f5e',
  '#8fb87e',
  '#c9a96e',
  '#e8c98e',
  '#d4a5b5',
  '#f5c5d0',
  '#a8c8a0',
  '#fde8d0',
];

export function launchConfetti(duration = 3000): void {
  const canvas = document.getElementById('confetti-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  const particles: Particle[] = [];
  const count = 120;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -10,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 6,
      opacity: 1,
    });
  }

  const startTime = performance.now();

  function draw(now: number): void {
    if (!ctx || !canvas) return;
    const elapsed = now - startTime;
    const fadeStart = duration - 800;
    const progress = Math.min(elapsed / duration, 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.vy += 0.05; // gravity

      if (elapsed > fadeStart) {
        p.opacity = Math.max(0, 1 - (elapsed - fadeStart) / 800);
      }

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
      ctx.restore();
    }

    if (progress < 1) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
    }
  }

  requestAnimationFrame(draw);
}

export function shakeElement(el: HTMLElement): void {
  el.classList.add('shake');
  el.addEventListener('animationend', () => el.classList.remove('shake'), {
    once: true,
  });
}

export function pulseElement(el: HTMLElement): void {
  el.classList.add('pulse');
  el.addEventListener('animationend', () => el.classList.remove('pulse'), {
    once: true,
  });
}
