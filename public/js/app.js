const container = document.getElementById('toolContainer');

function showTool(tool) {
  if (tool === 'string') {
    container.innerHTML = `

<h2>String Length Calculator</h2>

<textarea id="text"></textarea>

<h3 id="length">Length : 0</h3>

`;

    const txt = document.getElementById('text');

    txt.addEventListener('input', () => {
      document.getElementById('length').innerText =
        'Length : ' + txt.value.length;
    });
  }

  if (tool === 'json') {
    container.innerHTML = `

<h2>JSON Formatter</h2>

<textarea id="json"></textarea>

<button onclick="formatJSON()">
Format JSON
</button>

<pre id="output"></pre>

`;
  }
}

function formatJSON() {
  const value = document.getElementById('json').value;

  try {
    const pretty = JSON.stringify(JSON.parse(value), null, 4);

    document.getElementById('output').textContent = pretty;
  } catch {
    document.getElementById('output').textContent = 'Invalid JSON';
  }
}
