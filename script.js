// ---------- TEXTS (PL + EN) ----------
const TEXTS = {
    PL: {
        title: "CYBER BINARY LAB",
        subtitle: "SYSTEM BINARNY • HACKER OPS • ARASAKA MODE",
        howTitle: "🔧 Jak działa system binarny?",
        howText: `System binarny to sposób, w jaki komputer zapisuje liczby za pomocą tylko dwóch cyfr: 0 i 1.
        0 oznacza OFF, a 1 oznacza ON.
        Każde miejsce cyfry (bit) ma swoją wartość, która rośnie przez podwajanie: 1, 2, 4, 8...
        System binarny nie kończy się na 128 — kolejne wartości powstają przez pomnożenie poprzedniej liczby przez 2.
        Aby odczytać liczbę binarną, dodajemy wartości tych bitów, które mają ustawione 1.`,
        converterTitle: "🟥 Konwerter liczbowy",
        decimalPlaceholder: "Wpisz liczbę dziesiętną",
        binaryPlaceholder: "Wpisz liczbę binarną",
        explainTitle: "🟨 Rozbij kod – objaśniacz",
        explainPlaceholder: "Liczba do rozbicia",
        explainBtn: "Wyjaśnij krok po kroku",
        gameTitle: "⚡ Binary Cracker – Mini Gra",
        gameDesc: "Złam kod zanim system bezpieczeństwa zamknie dostęp!",
        genBtn: "Wygeneruj kod",
        checkBtn: "Sprawdź",
        correctMsg: "✔ Poprawnie! Kod złamany.",
        wrongMsg: "✖ Błędny wynik. Poprawny to:",
        pkon: ` Konwerter liczbowy – proste narzędzie do przeliczania liczb między systemem binarnym a dziesiętnym. Konwerter liczbowy – proste narzędzie do przeliczania liczb między systemem binarnym a dziesiętnym.
        E → BIN – wpisz liczbę w systemie dziesiętnym (DEC), aby zobaczyć jej odpowiednik w systemie binarnym (BIN).
        Wpisz liczbę binarną → DEC – wpisz liczbę w systemie binarnym (BIN), aby otrzymać jej wartość dziesiętną (DEC).`,
        pkon1:`Rozbij kod – objaśniacz
         Wpisz liczbę, aby zobaczyć krok po kroku, jak składa się z poszczególnych bitów i jak jest reprezentowana w systemie binarnym.`,
        invalidBinary: "Niepoprawny zapis binarny."
    },
    EN: {
        title: "CYBER BINARY LAB",
        subtitle: "BINARY SYSTEM • HACKER OPS • ARASAKA MODE",
        howTitle: "🔧 How binary system works?",
        howText: `The binary system is a way in which a computer represents numbers using only two digits: 0 and 1.
        0 means OFF, and 1 means ON.
        Each digit position (bit) has its own value, which grows by doubling: 1, 2, 4, 8...
        The binary system does not end at 128 — the next values are always obtained by multiplying the previous number by 2.
        To read a binary number, we add up the values of the bits that are set to 1.`,
        converterTitle: "🟥 Number Converter",
        decimalPlaceholder: "Enter decimal number",
        binaryPlaceholder: "Enter binary number",
        explainTitle: "🟨 Break the code – explainer",
        explainPlaceholder: "Number to break down",
        explainBtn: "Explain step by step",
        gameTitle: "⚡ Binary Cracker – Mini Game",
        gameDesc: "Break the code before the security system shuts down your access!",
        genBtn: "Generate code",
        checkBtn: "Check",
        correctMsg: "✔ Correct! Code cracked.",
        wrongMsg: "✖ Wrong result. Correct is:",
        pkon: `Number Converter – a simple tool for converting numbers between the binary and decimal systems. Number Converter – a simple tool for converting numbers between the binary and decimal systems.
        E → BIN – enter a decimal number (DEC) to see its binary equivalent (BIN).
        Enter a binary number → DEC – enter a binary number (BIN) to get its decimal value (DEC).`,
        pkon1: `Break the Code – Explainer
        Enter a number to see step by step how it is composed of individual bits and how it is represented in the binary system.`,

        invalidBinary: "Invalid binary format."

    }
};

// ---------- GLOBALS ----------
let CURRENT_LANG = 'PL';
let challengeNumber = null;

// ---------- DOM refs ----------
const el = id => document.getElementById(id);
const siteTitle = el('siteTitle');
const subtitle = el('subtitle');
const btnPL = el('btnPL');
const btnEN = el('btnEN');

// inputs/buttons
const decimalInput = el('decimalInput');
const binaryInput = el('binaryInput');
const toBinBtn = el('toBinBtn');
const toDecBtn = el('toDecBtn');

const explainInput = el('explainInput');
const explainBtn = el('explainBtn');
const conversionOutput = el('conversionOutput');
const explainOutput = el('explainOutput');

const genChallengeBtn = el('genChallengeBtn');
const checkChallengeBtn = el('checkChallengeBtn');
const challengeBox = el('challengeBox');
const challengeAnswer = el('challengeAnswer');
const challengeResult = el('challengeResult');

const binaryDemo = el('binary-demo');

// ---------- BUILD INITIAL UI ----------
function buildBitDemo(){
    binaryDemo.innerHTML = '';
    for(let i=0;i<8;i++){
        const d = document.createElement('div');
        d.className = 'bit';
        d.innerText = '0';
        binaryDemo.appendChild(d);
    }
}
buildBitDemo();

// ---------- LANGUAGE SWITCH ----------
function applyTexts(){
    const t = TEXTS[CURRENT_LANG];
    siteTitle.innerText = t.title;
    subtitle.innerText = t.subtitle;

    el('hHow').innerText = t.howTitle;
    el('pHow').innerText = t.howText;
    el('pkon').innerText = t.howTitle;
    el('pkon').innerText = t.howText;
    el('pkon1').innerText = t.howTitle;
    el('pkon1').innerText = t.howText;

    el('hConverter').innerText = t.converterTitle;
    decimalInput.placeholder = t.decimalPlaceholder;
    binaryInput.placeholder = t.binaryPlaceholder;

    el('hExplain').innerText = t.explainTitle;
    explainInput.placeholder = t.explainPlaceholder;
    explainBtn.innerText = t.explainBtn;

    el('hGame').innerText = t.gameTitle;
    el('pGame').innerText = t.gameDesc;
    genChallengeBtn.innerText = t.genBtn;
    checkChallengeBtn.innerText = t.checkBtn;
}
btnPL.addEventListener('click', ()=>{ CURRENT_LANG='PL'; btnPL.classList.add('active'); btnEN.classList.remove('active'); applyTexts(); });
btnEN.addEventListener('click', ()=>{ CURRENT_LANG='EN'; btnEN.classList.add('active'); btnPL.classList.remove('active'); applyTexts(); });
applyTexts();

// ---------- UTIL: highlight bits ----------
function highlightBits(bin){
    const bits = document.querySelectorAll('#binary-demo .bit');
    // ensure 8 chars
    const s = bin.padStart(8,'0');
    bits.forEach((b,i)=>{
        const ch = s[i] || '0';
        b.innerText = ch;
        b.classList.toggle('on', ch === '1');
    });
}

// ---------- CONVERTER ----------
toBinBtn.addEventListener('click', ()=>{
    const dec = parseInt(decimalInput.value);
    if(isNaN(dec)){ conversionOutput.innerText = ''; return; }
    const bin = dec.toString(2).padStart(8,'0');
    highlightBits(bin);
    conversionOutput.innerHTML = `${CURRENT_LANG==='PL'? 'DEC' : 'DEC'} ${dec} → BIN <b>${bin}</b>`;
});

toDecBtn.addEventListener('click', ()=>{
    const bin = binaryInput.value.trim();
    const t = TEXTS[CURRENT_LANG];
    if(!/^[01]+$/.test(bin)){ conversionOutput.innerText = t.invalidBinary; return; }
    const dec = parseInt(bin,2);
    highlightBits(bin.padStart(8,'0'));
    conversionOutput.innerHTML = `BIN ${bin} → DEC <b>${dec}</b>`;
});

// ---------- EXPLAINER ----------
explainBtn.addEventListener('click', ()=>{
    const num = parseInt(explainInput.value);
    if(isNaN(num)) return;
    const t = TEXTS[CURRENT_LANG];
    const bin = num.toString(2).padStart(8,'0');
    let html = `<b>${num}</b> → ${bin}<br><br>`;
    const values = [128,64,32,16,8,4,2,1];
    values.forEach((v,i)=>{
        html += `${v} → ${bin[i]} (${bin[i]==='1' ? 'ON' : 'OFF'})<br>`;
    });
    highlightBits(bin);
    explainOutput.innerHTML = html;
});

// ---------- GAME ----------
genChallengeBtn.addEventListener('click', generateChallenge);
checkChallengeBtn.addEventListener('click', checkChallenge);

function generateChallenge(){
    challengeNumber = Math.floor(Math.random()*256);
    const t = TEXTS[CURRENT_LANG];
    challengeBox.innerHTML = `${t.genBtn}: <b>${challengeNumber}</b> — ${CURRENT_LANG==='PL' ? 'Przekonwertuj na binarny!' : 'Convert to binary!'}`;
    challengeResult.innerText = '';
    challengeAnswer.value = '';
    highlightBits('00000000');
}

function checkChallenge(){
    if(challengeNumber === null) return;
    const answer = challengeAnswer.value.trim();
    const correct = challengeNumber.toString(2);
    const t = TEXTS[CURRENT_LANG];
    if(answer === correct){
        challengeResult.innerHTML = `<span style="color:var(--yellow)">${t.correctMsg}</span>`;
    } else {
        challengeResult.innerHTML = `<span style="color:var(--red)">${t.wrongMsg} ${correct}</span>`;
    }
}

// ---------- INTRO SEQUENCE (MAX AGGRESSION, FULLSCREEN) ----------
window.addEventListener('load', ()=>{
    const overlay = document.getElementById('introOverlay');
    const introStage = document.getElementById('introStage');

    // sequence of stages with timings (ms)
    // heavy glitch + flashes - timings tuned for dramatic effect
    setTimeout(()=> introStage.innerText = 'UNAUTHORIZED ACCESS DETECTED', 180);
    setTimeout(()=> introStage.innerText = 'INITIATING BLACK ICE COUNTERMEASURES...', 420);
    setTimeout(()=> introStage.innerText = 'COUNTERMEASURES ENGAGED', 820);
    setTimeout(()=> {
        // override accepted moment: switch to yellow accent then hide overlay
        introStage.innerText = 'OVERRIDE ACCEPTED • ACCESS GRANTED';
        // quick visual flicker (add small CSS tweak)
        overlay.style.transition = 'opacity 280ms ease-in-out';
        overlay.style.background = 'linear-gradient(180deg, rgba(255,234,0,0.95), rgba(0,0,0,0.55))';
    }, 1200);

    // final hide (leave a tiny buffer so user sees ACCESS GRANTED)
    setTimeout(()=>{
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        setTimeout(()=> overlay.remove(), 500);
    }, 1650);

    // slight post-intro micro-glitch effect on header
    setTimeout(()=> {
        siteTitle.classList.add('glitch');
        setTimeout(()=> siteTitle.classList.remove('glitch'), 800);
    }, 1800);
});
