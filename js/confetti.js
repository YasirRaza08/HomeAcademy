// Home Academy Celebration Canvas Confetti (In Brand Colors: Navy, Red, Gold, White)

export function fireConfetti(durationMs = 2500) {
  if (typeof document === 'undefined') return;
  let canvas = document.getElementById('ha-confetti-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'ha-confetti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '999999';
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  // Home Academy official colors
  const colors = ['#0a2558', '#c8102e', '#f5a623', '#ffbe1a', '#ffffff', '#1e3a8a'];

  const particles = [];
  const count = 120;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: width * 0.5 + (Math.random() - 0.5) * 200,
      y: height * 0.4 + (Math.random() - 0.5) * 100,
      w: Math.random() * 10 + 6,
      h: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 18,
      vy: Math.random() * -16 - 6,
      gravity: 0.35,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1
    });
  }

  const startTime = Date.now();

  function animate() {
    const elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, width, height);

    let activeParticles = 0;

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.rotationSpeed;

      if (elapsed > durationMs * 0.6) {
        p.opacity = Math.max(0, 1 - (elapsed - durationMs * 0.6) / (durationMs * 0.4));
      }

      if (p.opacity > 0 && p.y < height + 50) {
        activeParticles++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    }

    if (activeParticles > 0 && elapsed < durationMs) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }

  requestAnimationFrame(animate);
}