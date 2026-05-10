(function () {
  'use strict';

  /* ── Slide Map ─────────────────────────────────
     M1 content   : 1–9    | M1 quiz intro: 10
     M1 quiz Qs   : 11–15  | M1 results   : 16
     ── Module 2 · Leçon A ──────────────────────
     M2A cover+TOC: 17–18  | M2A content  : 19–30
     M2A quiz intro: 31    | M2A quiz Qs  : 32–36
     M2A results  : 37
     ── Module 2 · Leçon B ──────────────────────
     M2B cover    : 38     | M2B content  : 39–41
     M2B quiz intro: 42    | M2B quiz Qs  : 43–46
     M2B results  : 47
     ── Module 2 · Leçon C ──────────────────────
     M2C cover+TOC: 48–49  | M2C content  : 50–58
     M2C quiz intro: 59    | M2C quiz Qs  : 60–68
     M2C results  : 69
  */
  const M1_QUIZ_INTRO  = 10, M1_QUIZ_START = 11, M1_RESULTS = 16;
  const M2A_START = 17, M2A_CONTENT_END = 30, M2A_QUIZ_INTRO = 31, M2A_QUIZ_START = 32, M2A_RESULTS = 37;
  const M2B_START = 38, M2B_CONTENT_END = 41, M2B_QUIZ_INTRO = 42, M2B_QUIZ_START = 43, M2B_RESULTS = 47;
  const M2C_START = 48, M2C_CONTENT_END = 58, M2C_QUIZ_INTRO = 59, M2C_QUIZ_START = 60, M2C_RESULTS = 69;
  const TOTAL_SLIDES = 69;

  let currentIndex = 1;
  let quizScore = 0,  quizAnswered  = {};
  let quizScore2 = 0, quizAnswered2 = {};
  let quizScoreB = 0, quizAnsweredB = {};
  let quizScoreC = 0, quizAnsweredC = {};

  const msgs5 = {
    5:'🏆 Parfait ! Vous avez tout bon.',4:'🌟 Excellent ! Presque parfait.',
    3:'👍 Bien ! Revoyez les points manqués.',2:'📚 Courage ! Relisez et réessayez.',
    1:'💡 Persévérez — recommencez depuis le début.',0:'🔄 Reprenez depuis le début.'
  };
  const msgsC = {
    9:'🏆 Parfait ! Maîtrise totale des environnements de marché !',
    8:'🌟 Excellent — presque parfait !',7:'👍 Très bien !',
    6:'✅ Bien — revoyez les points manqués.',5:'📚 La moitié — continuez à réviser.',
    4:'📖 Encore des lacunes — relisez la leçon.',3:'💡 Courage ! Recommencez depuis le début.',
    2:'🔄 Relisez attentivement chaque diapositive.',1:'🔄 Recommencez depuis le début.',
    0:'🔄 Reprenez depuis le début de la Leçon C.'
  };
  const msgsB = {
    4:'🏆 Parfait !',3:'🌟 Très bien !',2:'👍 Bon début !',
    1:'📚 Relisez la leçon.',0:'🔄 Recommencez.'
  };

  function getSlide(i) { return document.getElementById('slide-'+i); }

  function updateIndicator() {
    const ind = document.getElementById('slideIndicator');
    const mod = document.getElementById('moduleIndicator');
    const bl  = [M1_QUIZ_INTRO,M1_RESULTS,M2A_QUIZ_INTRO,M2A_RESULTS,M2B_QUIZ_INTRO,M2B_RESULTS,M2C_QUIZ_INTRO,M2C_RESULTS];
    const btnN = document.getElementById('btnNext');
    const btnP = document.getElementById('btnPrev');
    if (btnP) btnP.disabled = currentIndex === 1;
    if (btnN) btnN.disabled = currentIndex === TOTAL_SLIDES || bl.includes(currentIndex);

    if (currentIndex <= 9) {
      if (ind) ind.textContent = currentIndex+' / 9'; if (mod) mod.textContent='M1';
    } else if (currentIndex <= M1_RESULTS) {
      if (ind) ind.textContent='M1 · Quiz'; if (mod) mod.textContent='M1';
    } else if (currentIndex >= M2A_START && currentIndex <= M2A_CONTENT_END) {
      if (ind) ind.textContent=(currentIndex-M2A_START+1)+' / '+(M2A_CONTENT_END-M2A_START+1); if (mod) mod.textContent='M2A';
    } else if (currentIndex > M2A_CONTENT_END && currentIndex <= M2A_RESULTS) {
      if (ind) ind.textContent='M2A · Quiz'; if (mod) mod.textContent='M2A';
    } else if (currentIndex >= M2B_START && currentIndex <= M2B_CONTENT_END) {
      if (ind) ind.textContent=(currentIndex-M2B_START+1)+' / '+(M2B_CONTENT_END-M2B_START+1); if (mod) mod.textContent='M2B';
    } else if (currentIndex > M2B_CONTENT_END && currentIndex <= M2B_RESULTS) {
      if (ind) ind.textContent='M2B · Quiz'; if (mod) mod.textContent='M2B';
    } else if (currentIndex >= M2C_START && currentIndex <= M2C_CONTENT_END) {
      if (ind) ind.textContent=(currentIndex-M2C_START+1)+' / '+(M2C_CONTENT_END-M2C_START+1); if (mod) mod.textContent='M2C';
    } else {
      if (ind) ind.textContent='M2C · Quiz'; if (mod) mod.textContent='M2C';
    }
  }

  function goTo(target, dir) {
    if (target < 1 || target > TOTAL_SLIDES || target === currentIndex) return;
    const cur = getSlide(currentIndex), tgt = getSlide(target);
    if (!cur || !tgt) return;
    cur.classList.remove('active');
    cur.classList.add(dir === 'forward' ? 'exit-left' : 'exit-right');
    tgt.style.transform = dir === 'forward' ? 'translateX(60px)' : 'translateX(-60px)';
    tgt.classList.add('active');
    setTimeout(() => cur.classList.remove('exit-left','exit-right'), 500);
    currentIndex = target;
    updateIndicator();
  }

  const BLOCKED = [M1_QUIZ_INTRO,M1_RESULTS,M2A_QUIZ_INTRO,M2A_RESULTS,M2B_QUIZ_INTRO,M2B_RESULTS,M2C_QUIZ_INTRO,M2C_RESULTS];
  function next() { if (BLOCKED.includes(currentIndex)||currentIndex>=TOTAL_SLIDES) return; goTo(currentIndex+1,'forward'); }
  function prev() { if (currentIndex<=1||[M1_RESULTS,M2A_RESULTS,M2B_RESULTS,M2C_RESULTS].includes(currentIndex)) return; goTo(currentIndex-1,'backward'); }

  document.getElementById('btnNext').addEventListener('click', next);
  document.getElementById('btnPrev').addEventListener('click', prev);
  document.addEventListener('keydown', e => {
    if (e.key==='ArrowRight'||e.key==='ArrowDown') { e.preventDefault(); next(); }
    if (e.key==='ArrowLeft' ||e.key==='ArrowUp')   { e.preventDefault(); prev(); }
  });
  document.querySelectorAll('.toc-item').forEach(item => item.addEventListener('click', () => {
    const t = parseInt(item.dataset.slide,10);
    if (t&&t!==currentIndex) goTo(t, t>currentIndex?'forward':'backward');
  }));

  // ── Quiz start buttons ──
  document.getElementById('btnStartQuiz').addEventListener('click',  () => goTo(M1_QUIZ_START,'forward'));
  document.getElementById('btnStartQuiz2').addEventListener('click', () => goTo(M2A_QUIZ_START,'forward'));
  document.getElementById('btnStartQuizB').addEventListener('click', () => goTo(M2B_QUIZ_START,'forward'));
  document.getElementById('btnStartQuizC').addEventListener('click', () => goTo(M2C_QUIZ_START,'forward'));

  // ── Transition / nav buttons ──
  document.getElementById('btnGoModule2').addEventListener('click',  () => goTo(M2A_START,'forward'));
  document.getElementById('btnGoLeconB').addEventListener('click',   () => goTo(M2B_START,'forward'));
  document.getElementById('btnGoLeconC').addEventListener('click',   () => goTo(M2C_START,'forward'));

  // ── Generic quiz slide setup ──
  function setupQuiz(indices, answered, onCorrect, onFinish, resultsSlide) {
    indices.forEach(idx => {
      const slide = getSlide(idx); if (!slide) return;
      const optWrap = slide.querySelector('.options');
      const opts    = slide.querySelectorAll('.option');
      const fb      = slide.querySelector('.feedback');
      const nxt     = slide.querySelector('.btn-next');
      if (!optWrap) return;
      const correct = optWrap.dataset.correct;
      opts.forEach(opt => opt.addEventListener('click', () => {
        if (answered[idx]) return;
        answered[idx] = true;
        const ok = opt.dataset.val === correct;
        if (ok) { onCorrect(); opt.classList.add('selected-correct'); fb.textContent='✓ Bonne réponse !'; fb.classList.add('correct'); }
        else    { opt.classList.add('selected-wrong'); fb.textContent='✗ Mauvaise réponse. Bonne réponse : option '+correct+'.'; fb.classList.add('wrong');
                  opts.forEach(o => { if (o.dataset.val===correct) o.classList.add('reveal-correct'); }); }
        opts.forEach(o => o.classList.add('disabled'));
        if (nxt) nxt.classList.remove('hidden');
      }));
      if (nxt) nxt.addEventListener('click', () => {
        const t = parseInt(nxt.dataset.target,10);
        if (t===resultsSlide) onFinish();
        goTo(t,'forward');
      });
    });
  }

  setupQuiz([11,12,13,14,15], quizAnswered,  ()=>{quizScore++},  showR1,  M1_RESULTS);
  setupQuiz([32,33,34,35,36], quizAnswered2, ()=>{quizScore2++}, showR2A, M2A_RESULTS);
  setupQuiz([43,44,45,46],    quizAnsweredB, ()=>{quizScoreB++}, showRB,  M2B_RESULTS);
  setupQuiz([60,61,62,63,64,65,66,67,68], quizAnsweredC, ()=>{quizScoreC++}, showRC, M2C_RESULTS);

  function showR1() {
    const s=quizScore;
    document.getElementById('scoreNum').textContent=s;
    document.getElementById('resultsIcon').textContent=s===5?'🏆':s>=3?'🌟':'📚';
    document.getElementById('resultsTitle').textContent=s===5?'Résultat Parfait !':s>=3?'Bon Travail !':'Continuez à Apprendre !';
    document.getElementById('scoreMsg').textContent=msgs5[s]||'';
  }
  function showR2A() {
    const s=quizScore2;
    document.getElementById('scoreNum2').textContent=s;
    document.getElementById('resultsIcon2').textContent=s===5?'🏆':s>=3?'🌟':'📖';
    document.getElementById('resultsTitle2').textContent=s===5?'Leçon A Maîtrisée !':s>=3?'Excellent Travail !':'Continuez à Réviser !';
    document.getElementById('scoreMsg2').textContent=msgs5[s]||'';
  }
  function showRB() {
    const s=quizScoreB;
    document.getElementById('scoreNumB').textContent=s;
    document.getElementById('resultsIconB').textContent=s===4?'🏆':s>=2?'🌟':'📖';
    document.getElementById('resultsTitleB').textContent=s===4?'Leçon B Maîtrisée !':s>=2?'Bon Travail !':'À Réviser !';
    document.getElementById('scoreMsgB').textContent=msgsB[s]||'';
  }
  function showRC() {
    const s=quizScoreC;
    document.getElementById('scoreNumC').textContent=s;
    document.getElementById('resultsIconC').textContent=s===9?'🏆':s>=6?'🌟':s>=4?'📖':'📚';
    document.getElementById('resultsTitleC').textContent=s===9?'Leçon C Maîtrisée !':s>=6?'Excellent Travail !':s>=4?'Continuez !':'À Réviser !';
    document.getElementById('scoreMsgC').textContent=msgsC[s]||'';
  }

  // ── Reset helper ──
  function resetQ(indices) {
    indices.forEach(idx => {
      const sl = getSlide(idx); if (!sl) return;
      sl.querySelectorAll('.option').forEach(o => o.classList.remove('selected-correct','selected-wrong','reveal-correct','disabled'));
      sl.querySelectorAll('.feedback').forEach(fb => { fb.className='feedback'; fb.textContent=''; });
      sl.querySelectorAll('.btn-next').forEach(b => b.classList.add('hidden'));
    });
  }

  // M1 controls
  document.getElementById('btnRetakeQuiz').addEventListener('click', () => { quizScore=0; quizAnswered={}; resetQ([11,12,13,14,15]); goTo(M1_QUIZ_INTRO,'backward'); });
  document.getElementById('btnRestart').addEventListener('click',    () => { quizScore=0; quizAnswered={}; resetQ([11,12,13,14,15]); goTo(1,'backward'); });
  // M2A controls
  document.getElementById('btnRetakeQuiz2').addEventListener('click',() => { quizScore2=0; quizAnswered2={}; resetQ([32,33,34,35,36]); goTo(M2A_QUIZ_INTRO,'backward'); });
  document.getElementById('btnBackM1').addEventListener('click',     () => goTo(1,'backward'));
  // M2B controls
  document.getElementById('btnRetakeQuizB').addEventListener('click',() => { quizScoreB=0; quizAnsweredB={}; resetQ([43,44,45,46]); goTo(M2B_QUIZ_INTRO,'backward'); });
  document.getElementById('btnBackLeconA').addEventListener('click', () => goTo(M2A_START,'backward'));
  // M2C controls
  document.getElementById('btnRetakeQuizC').addEventListener('click',() => { quizScoreC=0; quizAnsweredC={}; resetQ([60,61,62,63,64,65,66,67,68]); goTo(M2C_QUIZ_INTRO,'backward'); });
  document.getElementById('btnBackLeconB').addEventListener('click', () => goTo(M2B_START,'backward'));
  document.getElementById('btnRestartLeconC').addEventListener('click',()=> { quizScoreC=0; quizAnsweredC={}; resetQ([60,61,62,63,64,65,66,67,68]); goTo(M2C_START,'backward'); });

  updateIndicator();
  document.addEventListener('click', () => { const h=document.getElementById('keyHint'); if(h) h.style.display='none'; }, {once:true});

  // ── Theme Toggle (Light / Dark) ──
  const THEME_KEY = 'caleb-theme';
  const btnTheme  = document.getElementById('btnTheme');

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  // Restore saved preference on load
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme);

  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light');
      applyTheme(isLight ? 'dark' : 'light');
    });
  }
})();
