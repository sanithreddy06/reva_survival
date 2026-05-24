const DAY_SCORES = { Monday: 40, Tuesday: 50, Wednesday: 55, Thursday: 45, Friday: 75, Saturday: 90 };
const SUBJECT_MOD = { easy: 20, medium: 0, hard: -25 };

function planBunk() {
  const att = parseFloat($('#bunk-attendance').value) || 0;
  const day = $('#bunk-day').value;
  const subject = $('#bunk-subject').value;

  let bestDay = 'Friday';
  let bestScore = -1;
  Object.keys(DAY_SCORES).forEach((d) => {
    let s = DAY_SCORES[d] + SUBJECT_MOD[subject];
    if (d === day) s -= 10;
    if (s > bestScore) { bestScore = s; bestDay = d; }
  });

  const suspicion = subject === 'hard' ? 'HIGH' : subject === 'medium' ? 'MODERATE' : 'LOW';
  const danger = Math.min(100, Math.max(0, Math.round(100 - att + (subject === 'hard' ? 25 : 10))));

  $('#bunk-results').classList.remove('hidden');
  $('#safest-day').textContent = bestDay;
  $('#faculty-suspicion').textContent = suspicion;
  $('#academic-danger').textContent = `${danger}/100`;

  let advice;
  if (danger > 70) advice = 'Do NOT bunk. Your attendance cannot afford your audacity.';
  else if (bestDay === day) advice = 'Today is risky. We respect the delusion.';
  else advice = `Consider ${bestDay} instead. Less faculty rage, more Netflix.`;
  $('#bunk-advice').textContent = advice;
  REVA.playAlert();
}

$('#plan-bunk')?.addEventListener('click', planBunk);
