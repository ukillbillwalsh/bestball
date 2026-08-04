const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const CORES_FILE = path.join(__dirname, 'cores.json');

app.use(express.json());
app.use(express.static(__dirname));

// ── helpers ──────────────────────────────────────────────────────────────────

function readCores() {
  try {
    return JSON.parse(fs.readFileSync(CORES_FILE, 'utf8'));
  } catch {
    return { updated: '', cores: [] };
  }
}

function writeCores(data) {
  fs.writeFileSync(CORES_FILE, JSON.stringify(data, null, 2));
}

// ── API ───────────────────────────────────────────────────────────────────────

// GET /api/cores?sport=cfb&slate=main
app.get('/api/cores', (req, res) => {
  const data = readCores();
  // canWrite: true for everyone — any coworker can submit
  res.json({ updated: data.updated || '', cores: data.cores || [], canWrite: true });
});

// POST /api/cores  body: { sport, core: { name, slate, players } }
app.post('/api/cores', (req, res) => {
  const { core } = req.body || {};
  if (!core || !core.name) return res.status(400).json({ error: 'core.name required' });
  if (!Array.isArray(core.players) || core.players.length === 0)
    return res.status(400).json({ error: 'at least one player required' });

  const data = readCores();
  const idx = data.cores.findIndex(c => c.name.toLowerCase() === core.name.toLowerCase());
  if (idx >= 0) {
    data.cores[idx] = core;
  } else {
    data.cores.push(core);
  }
  data.updated = new Date().toISOString();
  writeCores(data);
  res.json({ ok: true, updated: data.updated });
});

// DELETE /api/cores/:name
app.delete('/api/cores/:name', (req, res) => {
  const data = readCores();
  const before = data.cores.length;
  data.cores = data.cores.filter(c => c.name.toLowerCase() !== req.params.name.toLowerCase());
  if (data.cores.length === before) return res.status(404).json({ error: 'not found' });
  data.updated = new Date().toISOString();
  writeCores(data);
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`CFB Tools running on port ${PORT}`));
