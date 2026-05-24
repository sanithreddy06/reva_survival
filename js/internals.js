const PASS_MARKS = 40;
const INTERNAL_MAX = 50; // IA1(20) + IA2(20) + Assignment(10)
const SEMESTER_MAX = 50;
const IA_MAX = 20;
const ASSIGN_MAX = 10;

function clampMarks(value, max) {
  return Math.min(max, Math.max(0, parseFloat(value) || 0));
}

function predictInternals() {
  const ia1 = clampMarks($('#ia1').value, IA_MAX);
  const ia2 = clampMarks($('#ia2').value, IA_MAX);
  const assign = clampMarks($('#assign-marks').value, ASSIGN_MAX);
  const semesterRaw = $('#semester-marks').value;
  const hasSemester = semesterRaw !== '' && semesterRaw != null;
  const semester = hasSemester ? clampMarks(semesterRaw, SEMESTER_MAX) : null;

  $('#ia1').value = ia1;
  $('#ia2').value = ia2;
  $('#assign-marks').value = assign;
  if (hasSemester) $('#semester-marks').value = semester;

  const internalTotal = ia1 + ia2 + assign;
  const minSemesterNeeded = Math.max(0, Math.ceil((PASS_MARKS - internalTotal) * 10) / 10);
  const minSemesterCapped = Math.min(SEMESTER_MAX, minSemesterNeeded);

  let total = null;
  let passStatus;
  let funny;

  if (internalTotal >= PASS_MARKS) {
    passStatus = 'ALREADY PASSING (without semester)';
    funny = 'Your internals alone crossed 40. Either genius or data entry error.';
  } else if (!hasSemester) {
    passStatus = 'PENDING — SEMESTER NOT ENTERED';
    if (minSemesterCapped > SEMESTER_MAX) {
      passStatus = 'IMPOSSIBLE — INTERNALS TOO LOW';
      funny = 'You need more than 50 in semester. Math has left the chat.';
    } else if (minSemesterCapped >= 45) {
      funny = 'Basically full semester marks required. Start praying.';
    } else if (minSemesterCapped >= 35) {
      funny = 'Passing is technically possible. May require divine intervention.';
    } else if (minSemesterCapped >= 25) {
      funny = 'Doable if you stop scrolling Reels.';
    } else {
      funny = 'Comfortable buffer — do not get overconfident.';
    }
  } else {
    total = internalTotal + semester;
    if (total >= PASS_MARKS) {
      passStatus = `PASS — ${total}/100`;
      funny = total >= 60 ? 'Solid. Suspiciously responsible.' : 'You scraped through. Classic.';
    } else {
      passStatus = `FAIL — ${total}/100 (need ${PASS_MARKS})`;
      funny = `Short by ${(PASS_MARKS - total).toFixed(1)} marks. Retake lore loading...`;
    }
  }

  let damage;
  if (internalTotal >= 42) damage = 'MINIMAL';
  else if (internalTotal >= 35) damage = 'MODERATE';
  else if (internalTotal >= 28) damage = 'SEVERE';
  else damage = 'CATASTROPHIC';

  $('#internals-results').classList.remove('hidden');
  $('#internal-total').textContent = `${internalTotal.toFixed(1)}/50`;
  $('#min-semester').textContent = minSemesterCapped > SEMESTER_MAX ? 'IMPOSSIBLE' : minSemesterCapped.toFixed(1);

  const totalLine = $('#total-line');
  if (hasSemester && total !== null) {
    totalLine.textContent = `Total score: ${total.toFixed(1)} / 100 (Internal ${internalTotal.toFixed(1)} + Semester ${semester.toFixed(1)})`;
  } else {
    totalLine.textContent = `Total score: ${internalTotal.toFixed(1)} + ? / 100 — enter semester marks when ready`;
  }

  $('#pass-status').textContent = passStatus;
  $('#emotional-damage').textContent = damage;
  $('#internals-funny').textContent = funny;
  REVA.playAlert();
}

$('#predict-internals')?.addEventListener('click', predictInternals);
