const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const PORT = 3000;

// Serve static files
app.use(express.static('public'));

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// --- GAME STATE ---
const rooms = {}; // { serverCode: { players: [...], drawerIndex, round, timer, currentWord, genre, difficulty } }
const ROUND_TIME = 60; // seconds
const MAX_PLAYERS = 5;

// --- WORDS BY DIFFICULTY AND GENRE ---
const FILIPINO_WORDS = {
  madali: {
    tao: ["ulo","mata","tainga","ilong","bibig","ngipin","dila","kamay","paa","braso","binti","tiyan","noo","pisngi","buhok","balikat","kuko","tuhod"],
    bagay: ["kuwaderno","pandikit","gunting","pintura","martilyo","tabo","tsinelas","orasan","susi","unan","telepono","gitara","tasa","parol","tinidor"],
    hayop: ["isda","bubuyog","aso","pusa","baboy","matsing","palaka","baka","paniki","leon","daga","pato","ibon","tupa","kabayo","pagong","ahas","buwaya","hipon","pating"],
    lugar: ["bangin","bulkan","kusina","simbahan","ospital","paaralan","museo","paliparan","tindahan","palengke","bundok","burol","ilog","yungib","pulo","lambak"],
    pagkain: ["sibuyas","bawang","luya","patola","singkamas","kundol","talong","mustasa","sitaw","patani","sigarilyas","mani","upo","kalabasa","labanos"],
    kultura: ["harana","pagmano","anahaw","kalabaw","perlas","bakya","dyip","sampagita","agila","arnis","bahay kubo","jose rizal","lechon","kalesa","Bayanihan","batok"]
  },
  katamtaman: {
    tao: ["siko","palad","bigote","balbas","bewang","talampakan","pusod","pisngi","pulso","pilikmata","bungo","batok","anit","hinlalaki","hintuturo","palasingsingan","kili-kili"],
    bagay: ["lagari","tornilyo","plorera","aparador","bunot","abaniko","bayong","itak","takure","siyanse","bombilya","elisi","salipawpaw","silya","bunot"],
    hayop: ["pambansang hayop","alimango","pawikan","balyena","tutubi","lobo","salagubang","tahong","higad","balyena","alimasag","pusit","tuta","kuting","kordero"],
    lugar: ["perya","munisipyo","palaruan","botika","entablado","pabrika","sementeryo","bangko","hardin","talon","panaderya","desyerto","palikuran","palayan","Palaisdaan","hapag-kainan","silid-aralan","aklatan","silid-tulugan"],
    pagkain: ["presas","mansanas","pinya","lansones","kamatis","ubas","mangga","peras","balimbing","pakwan","saging","pakwan","rambutan","niyog","suha"],
    kultura: ["sungka","patintero","piko","tumbang preso","luksong baka","pogs","teks","palosebo","saranggola","turumpo","sipa","karerang sako","batuhang bola","jack en poy","taya-tayaan","tiyakad","agawang panyo","bingo"]
  },
  mahirap: {
    tao: ["bagang","talukap","kalamnan","kalansay","hinlalato","bukong-bukong","alak-alakan","gulugod","bahay-bata","nunal","balintataw","balat","ugat","lalamunan"],
    hayop: ["kalaykay","medida","tisa/yeso","inulapik/mulapik","daksipat","pantablay","awanggan","buntala","durungawan","kartamuneta","antipara","bingwit","hurno","palanggana","garapon","panggatong","paboreal","soro","sisne","dikya","pugita","malmag","talaba","alibangbang","salaginto","baboy-ramo","tandang","inahin","talangka","lumba-lumba","pukyutan","page"],
    lugar: ["kapilya","talyer","liwasan","daungan","dalampasigan","silong","Kamalig","sinehan","tarangkahan","danaw","talipapa"],
    pagkain: ["carioca","puto","maja blanca","kutsinta","sapin-sapin","malagkit","bibingka","pitchi-pitc","hi","kalamay","biko","palitaw","cassava cake","espasol","puto bumbong","suman"],
    kultura: ["aswang","kapre","shokoy","manananggal","tikbalang","sigbin","dwende","tiktik","engkanto","batibat","bakunawa","tambal"]
  }
};

// --- SOCKET.IO ---
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // --- Join Menu ---
    socket.on('joinMenu', ({ serverCode, username, mode }) => {

        // Generate server code if host
        if (!serverCode) {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            serverCode = '';
            for (let i = 0; i < 3; i++) {
                serverCode += letters.charAt(Math.floor(Math.random() * letters.length));
            }
        }
        serverCode = serverCode.toUpperCase();

        // Create room if it doesn't exist
        if (!rooms[serverCode]) {
            rooms[serverCode] = {
    players: [],
    drawerIndex: -1,
    round: 0,
    totalRounds: 0, // 👈 ADD THIS
    timer: null,
    currentWord: '',
    difficulty: 'madali',
    genre: 'tao',
    usedWords: []
};
        }

        const room = rooms[serverCode];

        // 🚫 PLAYER LIMIT CHECK
        if (room.players.length >= MAX_PLAYERS) {
            socket.emit('roomFull');
            return;
        }

        // Add player
        room.players.push({
            id: socket.id,
            name: username,
            score: 0,
            guessed: false
        });

        socket.join(serverCode);
        socket.serverCode = serverCode;
        socket.username = username;

        // Send server code to this player
        socket.emit('serverCodeUpdate', serverCode);

        // Update all players
        updatePlayersList(serverCode);
    });

    // --- HOST UPDATES SETTINGS ---
    socket.on('updateSettings', ({ serverCode, difficulty, genre }) => {
        const room = rooms[serverCode];
        if (!room) return;

        // Only host can update
        if (socket.id !== room.players[0].id) return;

        if (difficulty) room.difficulty = difficulty;
        if (genre) room.genre = genre;

        console.log(`Room ${serverCode} settings updated: difficulty=${room.difficulty}, genre=${room.genre}`);

        // Optional: broadcast updated settings
        io.to(serverCode).emit('settingsUpdated', {
            difficulty: room.difficulty,
            genre: room.genre
        });
    });

    // --- Start Game ---
    socket.on('startGame', ({ serverCode }) => {
        const room = rooms[serverCode];
        if (!room || room.players.length < 2) return;
        room.totalRounds = room.players.length * 2;
        startNextRound(serverCode);
    });

    // --- Drawing ---
    socket.on('draw', data => {
        const roomCode = socket.serverCode;
        socket.to(roomCode).emit('draw', data);
    });

    socket.on('clearCanvas', () => {
        const roomCode = socket.serverCode;
        if (!roomCode) return;
        socket.to(roomCode).emit('clearCanvas');
    });

    // --- Guessing ---
    socket.on('guess', text => {
        const roomCode = socket.serverCode;
        const room = rooms[roomCode];
        if (!room) return;
        const player = room.players.find(p => p.id === socket.id);
        if (!player || player.guessed) return;

        const currentWord = room.currentWord;
        const drawerId = room.players[room.drawerIndex].id;

        if (socket.id === drawerId) return;

        if (text.toLowerCase() === currentWord.toLowerCase()) {
            player.score += 10;
            player.guessed = true;

            io.to(roomCode).emit('message', { from: 'Sistema', text: `${player.name} nahulaan ang salita!` });
            io.to(socket.id).emit('message', { from: 'Ikaw', text: `+10 puntos!` });

            const allGuessed = room.players.filter(p => p.id !== drawerId).every(p => p.guessed);
            if (allGuessed) {
                clearInterval(room.timer);
                io.to(roomCode).emit('roundEnd', { round: room.round, word: currentWord });
                setTimeout(() => startNextRound(roomCode), 3000);
            }
        } else {
            io.to(roomCode).emit('message', { from: player.name, text });
        }

        updatePlayersList(roomCode);
    });

    socket.on('disconnect', () => {
        const roomCode = socket.serverCode;
        if (!roomCode || !rooms[roomCode]) return;
        const room = rooms[roomCode];
        room.players = room.players.filter(p => p.id !== socket.id);
        updatePlayersList(roomCode);
        if (room.players.length === 0) delete rooms[roomCode];
    });
});

// --- HELPERS ---
function updatePlayersList(serverCode) {
    const room = rooms[serverCode];
    if (!room) return;
    io.to(serverCode).emit('updatePlayers', room.players.map(p => p.name));
    io.to(serverCode).emit('players', room.players);
}

function startNextRound(serverCode) {
    const room = rooms[serverCode];
    if (!room) return;

    room.round++;
    if (room.round >  room.totalRounds) {
        io.to(serverCode).emit('gameOver', { players: room.players });
        clearInterval(room.timer);
        delete rooms[serverCode];
        return;
    }

    room.players.forEach(p => p.guessed = false);

    room.drawerIndex = (room.drawerIndex + 1) % room.players.length;
    const drawer = room.players[room.drawerIndex];

    // Pick word based on selected difficulty & genre
    const difficulty = room.difficulty || 'madali';
    const genre = room.genre || 'tao';
    const wordList = FILIPINO_WORDS?.[difficulty]?.[genre];

if (!Array.isArray(room.usedWords)) {
    room.usedWords = [];
}

if (!Array.isArray(wordList) || wordList.length === 0) {
    console.error('Invalid word list', { difficulty, genre });
    return;
}

let unusedWords = wordList.filter(w => !room.usedWords.includes(w));

if (unusedWords.length === 0) {
    room.usedWords = [];
    unusedWords = [...wordList];
}
 
    if(unusedWords.length === 0){
        room.usedWords = [];
        unusedWords.push(...wordList);
    }

    const word = unusedWords[Math.floor(Math.random() * unusedWords.length)];
    room.usedWords.push(word);
    room.currentWord = word;

    io.to(serverCode).emit('newRound', { round: room.round, totalRounds:  room.totalRounds, drawerId: drawer.id });
    io.to(drawer.id).emit('assignWord', word);

    let secondsLeft = ROUND_TIME;
    io.to(serverCode).emit('time', secondsLeft);
    if (room.timer) clearInterval(room.timer);

    room.timer = setInterval(() => {
        secondsLeft--;
        io.to(serverCode).emit('time', secondsLeft);
        if (secondsLeft <= 0) {
            clearInterval(room.timer);
            io.to(serverCode).emit('roundEnd', { round: room.round, word });
            setTimeout(() => startNextRound(serverCode), 3000);
        }
    }, 1000);
}

// --- START SERVER ---
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
