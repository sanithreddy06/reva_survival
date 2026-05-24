const CLASS_STRENGTH = 65;

function initProxySliders() {
  [['strict-teacher', 'val-strict'], ['front-bench', 'val-front'], ['friend-loyalty', 'val-loyalty']].forEach(([id, valId]) => {
    const el = $(`#${id}`);
    const valEl = $(`#${valId}`);
    if (!el || !valEl) return;
    el.addEventListener('input', () => { valEl.textContent = `${el.value}%`; });
  });
}

function simulateProxy() {
  const strict = parseInt($('#strict-teacher').value, 10);
  const front = parseInt($('#front-bench').value, 10);
  const loyalty = parseInt($('#friend-loyalty').value, 10);

  // Base tuned for 65-student class: medium anonymity, roll-call chaos
  let success = 68 - strict * 0.42 - front * 0.36 + loyalty * 0.38;
  // 65 is mid-size: slight bonus vs tiny classes (easier to notice absence)
  success += 4;
  success = Math.min(92, Math.max(4, Math.round(success)));

  let risk;
  if (success >= 75) {
    risk = `Risk: Low. In a class of ${CLASS_STRENGTH}, your friend might pull it off.`;
  } else if (success >= 50) {
    risk = `Risk: Moderate. ${CLASS_STRENGTH} students — someone will snitch or forget.`;
  } else if (success >= 25) {
    risk = 'Risk: High. Teacher has eagle vision. Do not test fate.';
  } else {
    risk = 'Risk: EXTREME. You will be exposed. Accept your fate.';
  }

  $('#proxy-results').classList.remove('hidden');
  $('#proxy-success').textContent = `${success}%`;
  $('#proxy-risk').textContent = risk;
  REVA.playAlert();
}

initProxySliders();
$('#simulate-proxy')?.addEventListener('click', simulateProxy);
