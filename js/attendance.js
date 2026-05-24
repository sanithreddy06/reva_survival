const REQUIRED_PCT = 75;
let subjectIdCounter = 0;

function createSubjectRow(name = '', total = 40, attended = 30) {
  const id = ++subjectIdCounter;
  const row = document.createElement('div');
  row.className = 'subject-row';
  row.dataset.id = id;
  row.innerHTML = `
    <input type="text" class="subject-name" placeholder="Subject name" value="${name}" maxlength="40" />
    <label class="subject-field">Total <input type="number" class="subject-total" min="1" value="${total}" /></label>
    <label class="subject-field">Attended <input type="number" class="subject-attended" min="0" value="${attended}" /></label>
    <button type="button" class="btn-remove-subject" title="Remove subject" aria-label="Remove subject">×</button>
  `;
  row.querySelector('.btn-remove-subject').addEventListener('click', () => {
    const list = $('#subjects-list');
    if (list.children.length <= 1) return;
    row.remove();
  });
  return row;
}

function initSubjects() {
  const list = $('#subjects-list');
  list.appendChild(createSubjectRow('Mathematics', 50, 38));
  list.appendChild(createSubjectRow('Physics', 45, 32));
  $('#add-subject')?.addEventListener('click', () => {
    list.appendChild(createSubjectRow('New Subject', 40, 30));
  });
}

function getSubjectsData() {
  const rows = document.querySelectorAll('.subject-row');
  const subjects = [];
  rows.forEach((row) => {
    const name = row.querySelector('.subject-name').value.trim() || 'Unnamed Subject';
    const total = Math.max(1, parseInt(row.querySelector('.subject-total').value, 10) || 1);
    const attended = Math.min(total, Math.max(0, parseInt(row.querySelector('.subject-attended').value, 10) || 0));
    const pct = Math.round((attended / total) * 100);
    subjects.push({ name, total, attended, pct });
  });
  return subjects;
}

function getDefcon(pct) {
  if (pct >= 85) return { danger: 10, label: 'DEFCON 5' };
  if (pct >= 75) return { danger: 25, label: 'DEFCON 4' };
  if (pct >= 65) return { danger: 45, label: 'DEFCON 3' };
  if (pct >= 55) return { danger: 70, label: 'DEFCON 2' };
  return { danger: 95, label: 'DEFCON 1 — MAXIMUM ALERT' };
}

function analyzeAttendance() {
  const subjects = getSubjectsData();
  if (!subjects.length) return;

  let sumTotal = 0;
  let sumAttended = 0;
  subjects.forEach((s) => {
    sumTotal += s.total;
    sumAttended += s.attended;
  });

  const pct = Math.round((sumAttended / sumTotal) * 100);
  const minRequired = Math.ceil(sumTotal * (REQUIRED_PCT / 100));
  const safeBunks = Math.max(0, sumAttended - minRequired);

  $('#attendance-results').classList.remove('hidden');
  $('#attendance-pct').textContent = `${pct}%`;
  $('#overall-counts').textContent = `${sumAttended}/${sumTotal} classes`;
  $('#attendance-status').textContent = REVA.getAttendanceStatus(pct);
  $('#safe-bunks').textContent = safeBunks;

  const breakdown = $('#subject-breakdown');
  breakdown.innerHTML = '<p class="breakdown-title">Subject-wise</p>';
  subjects.forEach((s) => {
    const item = document.createElement('div');
    item.className = 'subject-result' + (s.pct < REQUIRED_PCT ? ' danger' : '');
    const bunkMsg = s.pct < REQUIRED_PCT
      ? ` — need ${Math.max(0, Math.ceil(s.total * 0.75) - s.attended)} more classes`
      : '';
    item.innerHTML = `<strong>${s.name}</strong>: ${s.pct}% (${s.attended}/${s.total})${bunkMsg}`;
    breakdown.appendChild(item);
  });

  const defcon = getDefcon(pct);
  $('#danger-fill').style.width = `${defcon.danger}%`;
  $('#danger-fill').classList.toggle('critical', pct < 60);
  $('#defcon-label').textContent = defcon.label;
  $('#siren-glow').classList.toggle('hidden', pct >= 60);

  pct < 60 ? REVA.playSiren() : REVA.playAlert();
}

initSubjects();
$('#analyze-attendance')?.addEventListener('click', analyzeAttendance);
