const container = document.getElementById('toolContainer');
const themeBtn = document.getElementById('themeToggle');
const search = document.getElementById('search');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeBtn.innerText = '☀️ Light';
}

themeBtn.onclick = () => {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    themeBtn.innerText = '☀️ Light';
  } else {
    localStorage.setItem('theme', 'light');
    themeBtn.innerText = '🌙 Dark';
  }
};

search.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase();
  document.querySelectorAll('.card').forEach((card) => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(value) ? 'block' : 'none';
  });
});

function showTool(tool) {
  if (tool === 'string') {
    container.innerHTML = `
            <h2>String Length Calculator</h2>
            <textarea id="text"></textarea>
            <h3 id="len">Length: 0</h3>
        `;

    const txt = document.getElementById('text');

    txt.addEventListener('input', () => {
      document.getElementById('len').innerText = 'Length: ' + txt.value.length;
    });
  }

  if (tool === 'json') {
    container.innerHTML = `
            <h2>JSON Formatter</h2>
            <textarea id="json"></textarea>

            <button onclick="formatJSON()">Format JSON</button>

            <pre id="output"></pre>
        `;
  }
}

function formatJSON() {
  const input = document.getElementById('json').value;

  try {
    const formatted = JSON.stringify(JSON.parse(input), null, 4);
    document.getElementById('output').textContent = formatted;
  } catch {
    document.getElementById('output').textContent = 'Invalid JSON ❌';
  }
}
