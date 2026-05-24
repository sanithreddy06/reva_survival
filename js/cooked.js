const COOKED_AI = [
  'You are surviving purely through luck and PDFs.',
  'One surprise quiz away from collapse.',
  'Academically recoverable but mentally buffering.',
  'Your brain has left the chat.',
  'Sleep debt exceeds national GDP.',
];

function analyzeCooked() {
  const att = parseFloat($('#cook-attendance').value) || 0;
  const sleep = parseFloat($('#cook-sleep').value) || 0;
  const assign = parseFloat($('#cook-assignments').value) || 0;
  const syllabus = parseFloat($('#cook-syllabus').value) || 0;
  const cgpa = parseFloat($('#cook-cgpa').value) || 0;

  let cooked = (100 - att) * 0.25 + Math.max(0, (8 - sleep) * 8) + Math.min(assign * 4, 30) + (100 - syllabus) * 0.2 + Math.max(0, (8 - cgpa) * 8);
  cooked = Math.min(100, Math.round(cooked));

  let diagnosis, survival;
  if (cooked < 25) { diagnosis = 'Academically immortal.'; survival = 92; }
  else if (cooked < 45) { diagnosis = 'Medium rare.'; survival = 70; }
  else if (cooked < 65) { diagnosis = 'Well done.'; survival = 45; }
  else if (cooked < 85) { diagnosis = 'Deep fried.'; survival = 18; }
  else { diagnosis = 'Ashes.'; survival = 3; }

  const circumference = 2 * Math.PI * 52;
  const ring = $('#cooked-ring');
  ring.style.strokeDashoffset = circumference - (cooked / 100) * circumference;
  ring.style.stroke = cooked > 70 ? '#ff0040' : cooked > 45 ? '#ff6b00' : '#ffe600';

  $('#cooked-results').classList.remove('hidden');
  $('#cooked-pct').textContent = `${cooked}%`;
  $('#cooked-diagnosis').textContent = diagnosis;
  $('#survival-prob').textContent = `${survival}%`;
  $('#cooked-ai').textContent = COOKED_AI[Math.floor(Math.random() * COOKED_AI.length)];
  REVA.playAlert();
}

$('#analyze-cooked')?.addEventListener('click', analyzeCooked);
