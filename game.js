
document.getElementById('continueBtn1').addEventListener('click', () => {
    document.getElementById('instructionsPage').style.display = 'none';
    document.getElementById('infoPage').style.display = 'flex';
});


document.getElementById('backToHowToPlay').addEventListener('click', () => {
    document.getElementById('infoPage').style.display = 'none';
    document.getElementById('instructionsPage').style.display = 'flex';
});


document.getElementById('continueBtn2').addEventListener('click', () => {
    document.getElementById('infoPage').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'flex';
});


document.getElementById('infoBtn').addEventListener('click', () => {
    document.getElementById('gameContainer').style.display = 'none';
    const infoPage = document.getElementById('infoPage');
    infoPage.style.display = 'flex';
    document.getElementById('continueBtn2').textContent = '← Back to Game';
    document.getElementById('backToHowToPlay').style.display = 'block';
    infoPage.dataset.fromGame = 'true';
});


document.getElementById('continueBtn2').addEventListener('click', () => {
    const infoPage = document.getElementById('infoPage');
    if (infoPage.dataset.fromQuiz === 'true') {
        infoPage.style.display = 'none';
        infoPage.dataset.fromQuiz = 'false';
        document.getElementById('continueBtn2').textContent = 'Continue →';
        document.getElementById('backToHowToPlay').style.display = 'block';
        quizOverlay.style.display = 'flex';
    } else if (infoPage.dataset.fromGame === 'true') {
        infoPage.style.display = 'none';
        infoPage.dataset.fromGame = 'false';
        document.getElementById('continueBtn2').textContent = 'Continue →';
        document.getElementById('gameContainer').style.display = 'flex';
    } else {
        infoPage.style.display = 'none';
        document.getElementById('mainMenu').style.display = 'flex';
    }
});


const CONTINENTS = {
 
    1: { name:'Antarctica',    bgId:'bg1', native:['🌱','🌿','🌿','🌱','🌺'],   invasive:['🌵','🌴','🌾','🍄','🌸'] },
 
    2: { name:'Australia',     bgId:'bg2', native:['🌺','🍃','🌿','🍃','🌼'],   invasive:['🌵','🌾','🍀','🌲','🌻'] },
 
    3: { name:'Africa',        bgId:'bg3', native:['🍆','🌿','🍀','🌴','🌼'],   invasive:['🌵','🌸','🍃','🌾','🌲'] },
 
    4: { name:'Europe',        bgId:'bg4', native:['🌿','🌸','🍄','🌲','🌼'],   invasive:['🌵','🎋','🌾','🌺','🍀'] },
 
    5: { name:'Asia',          bgId:'bg5', native:['🎋','🌸','🍃','🌿','🎍'],   invasive:['🌵','🌾','🌼','🍄','🌺'] },
 
    6: { name:'North America', bgId:'bg6', native:['🌲','🍁','🌻','🌼','🍄'],   invasive:['🌵','🎋','🌾','🌺','🌸'] },
 
    7: { name:'South America', bgId:'bg7', native:['🌺','🌿','🍃','🌴','🌸'],   invasive:['🌵','🌾','🍀','🌼','🌲'] },
};

const QUESTIONS = [
    { q: 'What is a native plant?',  a: ['A native plant is a plant that naturally grows in a certain area without being brought there by people.']  },
    { q: 'What is an invasive plant?',  a: ['An invasive plant is a plant that has been introduced to an area and spreads quickly, often causing harm.']  },
    { q: 'How can you tell if a plant is native or invasive?',  a: ['You can check whether the plant originally came from that area and whether it is growing naturally or taking over other plants.']  },
    { q: 'Why can invasive plants be a problem?',  a: ['They can spread fast, crowd out native plants, and change habitats.']  },
    { q: 'Why are native plants important?',  a: ['They provide food and shelter for local animals and help keep ecosystems balanced.']  },
    { q: 'Can a plant be native in one country but invasive in another?',  a: ['Yes. A plant may be native in one place but invasive when introduced somewhere else.']  },
    { q: 'What happens when invasive plants take over an area?',  a: ['They can reduce biodiversity by pushing out other plant species.']  },
    { q: 'How do invasive plants usually spread to new places?',  a: ['They can spread by people, animals, wind, water, or vehicles.']  },
    { q: 'What is biodiversity?',  a: ['Biodiversity means having many different kinds of living things in one area.']  },
    { q: 'Why do native animals often depend on native plants?',  a: ['Native animals may use native plants for food, shelter, and breeding places.'] },
    { q: 'What is one sign that a plant might be invasive?',  a: ['It spreads very quickly and grows over large areas fast.'] },
    { q: 'Are all non-native plants invasive?',  a: ['No. Some non-native plants do not cause harm and are not invasive.'] },
    { q: 'Why might humans plant species from other continents?',  a: ['For gardens, food, farming, or decoration.'] },
    { q: 'What is one way to protect native plants?',  a: ['Do not plant invasive species and remove them when needed.'] },
    { q: 'Why is it important to learn about invasive and native plants around the world?',  a: ['It helps us protect ecosystems and understand how plants affect environments in different continents.'] },
];

let questionIndex = 0; 


const state = {
    level: null,
    lives: 5,
    score: 0,
    nativeKills: 0,
    tool: 'spray',
    grid: [],          
    quizMode: null,    
    quizQsLeft: 0,
};


const mainMenu      = document.getElementById('mainMenu');
const gameContainer = document.getElementById('gameContainer');
const gameGrid      = document.getElementById('gameGrid');
const continentName = document.getElementById('continentName');
const livesEl       = document.getElementById('lives');
const scoreEl       = document.getElementById('score');
const nativeKillsEl = document.getElementById('nativeKills');
const quizOverlay   = document.getElementById('quizOverlay');
const quizTitle     = document.getElementById('quizTitle');
const quizText      = document.getElementById('quizText');
const quizAnswerEl  = document.getElementById('quizAnswer');
const submitQuiz    = document.getElementById('submitQuiz');
const quizFeedback  = document.getElementById('quizFeedback');
const quizProgress  = document.getElementById('quizProgress');

function goToMenu() {
    gameContainer.style.display = 'none';
    mainMenu.style.display = 'flex';
    document.querySelectorAll('.continent-bg').forEach(b => b.classList.remove('active'));
}

function goToGame() {
    mainMenu.style.display = 'none';
    gameContainer.style.display = 'flex';
}


document.querySelectorAll('.continent-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const level = parseInt(btn.dataset.level);
        const cfg = CONTINENTS[level];
        if (!cfg) return;

        state.level       = level;
        state.lives       = 5;
        state.score       = 0;
        state.nativeKills = 0;
        state.tool        = 'spray';
        state.quizMode    = null;

        document.querySelectorAll('.continent-bg').forEach(b => b.classList.remove('active'));
        document.getElementById(cfg.bgId).classList.add('active');

        continentName.textContent = cfg.name;
        updateStats();

        document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('selected'));
        document.getElementById('sprayBtn').classList.add('selected');

        buildGrid(cfg);
        goToGame();
    });
});

document.getElementById('backBtn').addEventListener('click', goToMenu);


document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.tool = btn.dataset.tool;
    });
});


function buildGrid(cfg) {
    gameGrid.innerHTML = '';
    state.grid = [];

    for (let r = 0; r < 5; r++) {
        state.grid[r] = [];
        for (let c = 0; c < 5; c++) {
            const roll = Math.random();
            let type, emoji;
            if      (roll < 0.35) { type = 'invasive'; emoji = pick(cfg.invasive); }
            else if (roll < 0.60) { type = 'native';   emoji = pick(cfg.native);   }
            else                  { type = 'empty';    emoji = '';                 }

            state.grid[r][c] = { type, emoji };

            const cell = document.createElement('div');
            const chess = (r + c) % 2 === 0 ? 'chess-light' : 'chess-dark';
            cell.className = 'grid-cell ' + chess + (type !== 'empty' ? ' has-' + type : '');
            cell.dataset.r = r;
            cell.dataset.c = c;
            cell.textContent = emoji;
            cell.addEventListener('click', onCellClick);
            gameGrid.appendChild(cell);
        }
    }
}


function onCellClick() {
    const r = parseInt(this.dataset.r);
    const c = parseInt(this.dataset.c);
    const d = state.grid[r][c];
    const cfg = CONTINENTS[state.level];

    if (d.type === 'invasive') {
        state.score += 10;
        setCell(this, d, 'empty', '');
        updateStats();
        checkWin();

    } else if (d.type === 'native') {
        state.nativeKills++;
        state.lives = Math.max(0, state.lives - 1);
        setCell(this, d, 'empty', '');

        this.style.background = 'rgba(255,60,60,0.55)';
        const el = this;
        setTimeout(() => { el.style.background = ''; }, 600);

        updateStats();

        if (state.lives <= 0) {
            setTimeout(() => openQuiz('lives', 5), 300);
        } else {
            setTimeout(() => openQuiz('native', 1), 300);
        }

    } else {
        if (Math.random() < 0.3) {
            setCell(this, d, 'native', pick(cfg.native));
        }
    }
}

function setCell(el, d, type, emoji) {
    d.type = type; d.emoji = emoji;
    el.textContent = emoji;
    const chess = el.classList.contains('chess-light') ? 'chess-light' : 'chess-dark';
    el.className = 'grid-cell ' + chess + (type !== 'empty' ? ' has-' + type : '');
}


function checkWin() {
    const hasInvasive = state.grid.some(row => row.some(cell => cell.type === 'invasive'));
    if (!hasInvasive) {
        setTimeout(() => {
            alert(`🎉 Continent cleared!\nScore: ${state.score}\nNative plants accidentally killed: ${state.nativeKills}`);
            goToMenu();
        }, 200);
    }
}

function openQuiz(mode, count) {
    state.quizMode  = mode;
    state.quizQsLeft = count;

    if (mode === 'lives') {
        quizTitle.textContent = '💀 No lives left! Answer 5 questions to get them back.';
    } else {
        quizTitle.textContent = '🌿 You killed a native plant!';
    }

    showNextQuestion();
}

function showNextQuestion() {
    const total = state.quizMode === 'lives' ? 5 : 1;
    const done  = total - state.quizQsLeft;

    const q = QUESTIONS[questionIndex % QUESTIONS.length];
    questionIndex++;

    quizText.textContent     = q.q;
    quizAnswerEl.value       = '';
    quizFeedback.textContent = '';
    quizFeedback.style.color = '';
    quizProgress.textContent = total > 1 ? `Question ${done + 1} of ${total}` : '';

    quizOverlay.style.display = 'flex';
    quizAnswerEl.focus();
}

function checkAnswer() {
    const q = QUESTIONS[(questionIndex - 1) % QUESTIONS.length];
    const answer = quizAnswerEl.value.trim().toLowerCase();
    const correct = q.a.some(kw => answer.includes(kw.toLowerCase()));

    if (correct) {
        quizFeedback.textContent = '✅ Correct!';
        quizFeedback.style.color = '#7fff7f';
        state.quizQsLeft--;

        setTimeout(() => {
            if (state.quizQsLeft > 0) {
                showNextQuestion();
            } else {
                closeQuiz();
            }
        }, 900);
    } else {
        quizFeedback.textContent = '❌ Not quite — try again!';
        quizFeedback.style.color = '#ff6b6b';
    }
}

function closeQuiz() {
    quizOverlay.style.display = 'none';

    if (state.quizMode === 'lives') {
        state.lives = 5;
        updateStats();
    }

    state.quizMode = null;
}

submitQuiz.addEventListener('click', checkAnswer);
quizAnswerEl.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });

document.getElementById('quizInfoBtn').addEventListener('click', () => {
    quizOverlay.style.display = 'none';
    const infoPage = document.getElementById('infoPage');
    infoPage.style.display = 'flex';
    infoPage.dataset.fromQuiz = 'true';
    document.getElementById('continueBtn2').textContent = '← Back to Quiz';
    document.getElementById('backToHowToPlay').style.display = 'none';
});


function updateStats() {
    livesEl.textContent       = state.lives;
    scoreEl.textContent       = state.score;
    nativeKillsEl.textContent = state.nativeKills;
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
