const container = document.getElementById('toolContainer');
const themeBtn = document.getElementById('themeToggle');
const search = document.getElementById('search');

const setTheme = (mode) => {
  const isDark = mode === 'dark';
  document.body.classList.toggle('dark', isDark);
  localStorage.setItem('theme', mode);
  themeBtn.innerText = isDark ? '☀️ Light' : '🌙 Dark';
};

setTheme(localStorage.getItem('theme') || 'light');

themeBtn.addEventListener('click', () => {
  const next = document.body.classList.contains('dark') ? 'light' : 'dark';
  setTheme(next);
});

/* ================= SEARCH ================= */

search.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase();

  document.querySelectorAll('.card').forEach((card) => {
    card.style.display = card.innerText.toLowerCase().includes(value)
      ? 'block'
      : 'none';
  });
});

function showTool(tool) {
  if (tool === 'string') {
    container.innerHTML = `
      <h2>String Length Calculator</h2>
      <textarea id="text" placeholder="Type something..."></textarea>
      <h3 id="len">Length: 0</h3>
    `;

    const txt = document.getElementById('text');

    txt.addEventListener('input', () => {
      document.getElementById('len').textContent =
        `Length: ${txt.value.length}`;
    });
  }

  if (tool === 'json') {
    container.innerHTML = `
      <h2>JSON Formatter</h2>

      <textarea id="json" placeholder="Paste JSON here..."></textarea>

      <div class="btn-row">
        <button id="formatBtn">Format</button>
        <button id="clearBtn">Clear</button>
      </div>

      <div class="output-wrapper">
        <pre id="output">Formatted output will appear here...</pre>
        <span id="copyIcon" title="Copy JSON">📋</span>
      </div>
    `;

    document.getElementById('formatBtn').addEventListener('click', formatJSON);
    document.getElementById('copyIcon').addEventListener('click', copyJSON);
    document.getElementById('clearBtn').addEventListener('click', clearJSON);
  }
}

let lastFormattedJSON = '';

function formatJSON() {
  const input = document.getElementById('json').value;

  try {
    lastFormattedJSON = JSON.stringify(JSON.parse(input), null, 4);
    document.getElementById('output').textContent = lastFormattedJSON;
  } catch {
    lastFormattedJSON = '';
    document.getElementById('output').textContent = 'Invalid JSON ❌';
  }
}

function copyJSON() {
  if (!lastFormattedJSON) return;

  navigator.clipboard.writeText(lastFormattedJSON);

  const icon = document.getElementById('copyIcon');
  if (!icon) return;

  icon.textContent = '✅';
  setTimeout(() => (icon.textContent = '📋'), 1200);
}

function clearJSON() {
  const input = document.getElementById('json');
  const output = document.getElementById('output');

  input.value = '';
  output.textContent = 'Formatted output will appear here...';
  lastFormattedJSON = '';
}

window.showTool = showTool;
window.formatJSON = formatJSON;
window.copyJSON = copyJSON;
window.clearJSON = clearJSON;
