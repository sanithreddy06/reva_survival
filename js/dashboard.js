function refreshDashboard() {
  const days = parseInt($('#days-exams').value, 10) || 0;
  const assignLoad = parseInt($('#assignment-load').value, 10);
  const attRisk = parseInt($('#attendance-risk').value, 10);
  const mental = parseInt($('#mental-stability').value, 10);
  const sleep = parseFloat($('#sleep-hours-dash').value) || 0;

  $('#dash-exams').textContent = days;
  $('#assign-bar').style.width = `${assignLoad}%`;
  $('#attend-risk-bar').style.width = `${attRisk}%`;
  $('#mental-bar').style.width = `${mental}%`;

  let sleepStatus = 'ADEQUATE';
  if (sleep < 4) sleepStatus = 'CRITICAL';
  else if (sleep < 6) sleepStatus = 'WARNING';
  $('#sleep-status').textContent = sleepStatus;

  const score = days * 2 + assignLoad * 0.3 + attRisk * 0.3 + (100 - mental) * 0.2 + (8 - sleep) * 5;
  let verdict;
  if (score < 40) verdict = 'Semester status: Somehow stable. Do not jinx it.';
  else if (score < 70) verdict = 'Semester status: Barely holding together.';
  else if (score < 100) verdict = 'Semester status: Critical meltdown imminent.';
  else verdict = 'Semester status: Full academic collapse. Embrace chaos.';
  $('#dash-verdict').textContent = verdict;
}

['assignment-load', 'attendance-risk', 'mental-stability', 'days-exams', 'sleep-hours-dash'].forEach((id) => {
  $(`#${id}`)?.addEventListener('input', refreshDashboard);
});
$('#refresh-dashboard')?.addEventListener('click', refreshDashboard);
document.addEventListener('DOMContentLoaded', refreshDashboard);
