(function () {
  const container = document.querySelector('.leaves');
  if (!container) return;

  const LEAF_SVG = `
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="#6b8e5a" stroke-width="1.4" stroke-linecap="round">
      <path d="M32 60 C30 40 28 22 32 4" fill="#7ea271" fill-opacity="0.55"/>
      <path d="M32 50 C20 46 14 38 10 28"/>
      <path d="M32 44 C22 40 16 32 14 22"/>
      <path d="M32 38 C24 34 20 26 20 18"/>
      <path d="M32 32 C26 28 24 22 26 14"/>
      <path d="M32 50 C44 46 50 38 54 28"/>
      <path d="M32 44 C42 40 48 32 50 22"/>
      <path d="M32 38 C40 34 44 26 44 18"/>
      <path d="M32 32 C38 28 40 22 38 14"/>
    </g>
  </svg>`;

  const COUNT = 14;
  for (let i = 0; i < COUNT; i++) {
    const leaf = document.createElement('span');
    leaf.className = 'falling-leaf';
    leaf.innerHTML = LEAF_SVG;
    leaf.style.setProperty('--size', (22 + Math.random() * 38) + 'px');
    leaf.style.setProperty('--left', (Math.random() * 100) + 'vw');
    leaf.style.setProperty('--delay', (Math.random() * -20) + 's');
    leaf.style.setProperty('--dur', (12 + Math.random() * 14) + 's');
    leaf.style.setProperty('--sway', (40 + Math.random() * 80) + 'px');
    leaf.style.setProperty('--rot', (Math.random() * 360) + 'deg');
    leaf.style.setProperty('--opacity', (0.35 + Math.random() * 0.45).toFixed(2));
    container.appendChild(leaf);
  }
})();
