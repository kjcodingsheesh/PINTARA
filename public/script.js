
document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bgMusic');
    function startGameMusic() {
    bgMusic.volume = 0.3; // adjust volume 0.0 - 1.0
    bgMusic.play().catch(err => console.log('Autoplay blocked:', err));
}
        bgMusic.play().catch(() => {
        console.log('Autoplay blocked, will play on first click');
        // Play on first user interaction
        document.body.addEventListener('click', () => bgMusic.play(), { once: true });
    });

    startGameMusic();
    const socket = io();
    const imageMap = {
  // ===== MADALI =====
  // Tao
  "ulo": "./Pop_ups/tao/madali/ulo.png",
"mata": "./Pop_ups/tao/madali/mata.png",
"tainga": "./Pop_ups/tao/madali/tainga.png",
"ilong": "./Pop_ups/tao/madali/ilong.png",
"bibig": "./Pop_ups/tao/madali/bibig.png",
"ngipin": "./Pop_ups/tao/madali/ngipin.png",
"dila": "./Pop_ups/tao/madali/dila.png",
"kamay": "./Pop_ups/tao/madali/kamay.png",
"paa": "./Pop_ups/tao/madali/paa.png",
"braso": "./Pop_ups/tao/madali/braso.png",
"binti": "./Pop_ups/tao/madali/binti.png",
"tiyan": "./Pop_ups/tao/madali/tiyan.png",
"noo": "./Pop_ups/tao/madali/noo.png",
"pisngi": "./Pop_ups/tao/madali/pisngi.png",
"buhok": "./Pop_ups/tao/madali/buhok.png",
"balikat": "./Pop_ups/tao/madali/balikat.png",
"kuko": "./Pop_ups/tao/madali/kuko.png",
"tuhod": "./Pop_ups/tao/madali/tuhod.png",

// Bagay
"kuwaderno": "./Pop_ups/bagay/madali/kuwaderno.png",
"pandikit": "./Pop_ups/bagay/madali/pandikit.png",
"gunting": "./Pop_ups/bagay/madali/gunting.png",
"pintura": "./Pop_ups/bagay/madali/pintura.png",
"martilyo": "./Pop_ups/bagay/madali/martilyo.png",
"tabo": "./Pop_ups/bagay/madali/tabo.png",
"tsinelas": "./Pop_ups/bagay/madali/tsinelas.png",
"orasan": "./Pop_ups/bagay/madali/orasan.png",
"susi": "./Pop_ups/bagay/madali/susi.png",
"unan": "./Pop_ups/bagay/madali/unan.png",
"telepono": "./Pop_ups/bagay/madali/telepono.png",
"gitara": "./Pop_ups/bagay/madali/gitara.png",
"tasa": "./Pop_ups/bagay/madali/tasa.png",
"parol": "./Pop_ups/bagay/madali/parol.png",
"tinidor": "./Pop_ups/bagay/madali/tinidor.png",

// Hayop
"isda": "./Pop_ups/hayop/madali/isda.png",
"bubuyog": "./Pop_ups/hayop/madali/bubuyog.png",
"aso": "./Pop_ups/hayop/madali/aso.png",
"pusa": "./Pop_ups/hayop/madali/pusa.png",
"baboy": "./Pop_ups/hayop/madali/baboy.png",
"matsing": "./Pop_ups/hayop/madali/matsing.png",
"palaka": "./Pop_ups/hayop/madali/palaka.png",
"baka": "./Pop_ups/hayop/madali/baka.png",
"paniki": "./Pop_ups/hayop/madali/paniki.png",
"leon": "./Pop_ups/hayop/madali/leon.png",
"daga": "./Pop_ups/hayop/madali/daga.png",
"pato": "./Pop_ups/hayop/madali/pato.png",
"ibon": "./Pop_ups/hayop/madali/ibon.png",
"tupa": "./Pop_ups/hayop/madali/tupa.png",
"kabayo": "./Pop_ups/hayop/madali/kabayo.png",
"pagong": "./Pop_ups/hayop/madali/pagong.png",
"ahas": "./Pop_ups/hayop/madali/ahas.png",
"buwaya": "./Pop_ups/hayop/madali/buwaya.png",
"hipon": "./Pop_ups/hayop/madali/hipon.png",
"pating": "./Pop_ups/hayop/madali/pating.png",

// Lugar
"bangin": "./Pop_ups/lugar/madali/bangin.png",
"bulkan": "./Pop_ups/lugar/madali/bulkan.png",
"kusina": "./Pop_ups/lugar/madali/kusina.png",
"simbahan": "./Pop_ups/lugar/madali/simbahan.png",
"ospital": "./Pop_ups/lugar/madali/ospital.png",
"paaralan": "./Pop_ups/lugar/madali/paaralan.png",
"museo": "./Pop_ups/lugar/madali/museo.png",
"paliparan": "./Pop_ups/lugar/madali/paliparan.png",
"tindahan": "./Pop_ups/lugar/madali/tindahan.png",
"palengke": "./Pop_ups/lugar/madali/palengke.png",
"bundok": "./Pop_ups/lugar/madali/bundok.png",
"burol": "./Pop_ups/lugar/madali/burol.png",
"ilog": "./Pop_ups/lugar/madali/ilog.png",
"yungib": "./Pop_ups/lugar/madali/yungib.png",
"pulo": "./Pop_ups/lugar/madali/pulo.png",
"lambak": "./Pop_ups/lugar/madali/lambak.png",

// Pagkain
"sibuyas": "./Pop_ups/pagkain/madali/sibuyas.png",
"bawang": "./Pop_ups/pagkain/madali/bawang.png",
"luya": "./Pop_ups/pagkain/madali/luya.png",
"patola": "./Pop_ups/pagkain/madali/patola.png",
"singkamas": "./Pop_ups/pagkain/madali/singkamas.png",
"kundol": "./Pop_ups/pagkain/madali/kundol.png",
"talong": "./Pop_ups/pagkain/madali/talong.png",
"mustasa": "./Pop_ups/pagkain/madali/mustasa.png",
"sitaw": "./Pop_ups/pagkain/madali/sitaw.png",
"patani": "./Pop_ups/pagkain/madali/patani.png",
"sigarilyas": "./Pop_ups/pagkain/madali/sigarilyas.png",
"mani": "./Pop_ups/pagkain/madali/mani.png",
"upo": "./Pop_ups/pagkain/madali/upo.png",
"kalabasa": "./Pop_ups/pagkain/madali/kalabasa.png",
"labanos": "./Pop_ups/pagkain/madali/labanos.png",

// Kultura
"harana": "./Pop_ups/kultura/madali/harana.png",
"pagmano": "./Pop_ups/kultura/madali/pagmano.png",
"anahaw": "./Pop_ups/kultura/madali/anahaw.png",
"kalabaw": "./Pop_ups/kultura/madali/kalabaw.png",
"perlas": "./Pop_ups/kultura/madali/perlas.png",
"bakya": "./Pop_ups/kultura/madali/bakya.png",
"dyip": "./Pop_ups/kultura/madali/dyip.png",
"sampagita": "./Pop_ups/kultura/madali/sampagita.png",
"agila": "./Pop_ups/kultura/madali/agila.png",
"arnis": "./Pop_ups/kultura/madali/arnis.png",
"bahay kubo": "./Pop_ups/kultura/madali/bahay-kubo.png",
"jose rizal": "./Pop_ups/kultura/madali/Jose_Rizal.png",
"lechon": "./Pop_ups/kultura/madali/lechon.png",
"kalesa": "./Pop_ups/kultura/madali/kalesa.png",
"Bayanihan": "./Pop_ups/kultura/madali/bayanihan.png",
"batok": "./Pop_ups/kultura/madali/batok.png",
// ===== KATAMTAMAN =====
// Tao
"siko": "./Pop_ups/tao/katamtaman/siko.png",
"palad": "./Pop_ups/tao/katamtaman/palad.png",
"bigote": "./Pop_ups/tao/katamtaman/bigote.png",
"balbas": "./Pop_ups/tao/katamtaman/balbas.png",
"bewang": "./Pop_ups/tao/katamtaman/bewang.png",
"talampakan": "./Pop_ups/tao/katamtaman/talampakan.png",
"pusod": "./Pop_ups/tao/katamtaman/pusod.png",
"pulso": "./Pop_ups/tao/katamtaman/pulso.png",
"pilikmata": "./Pop_ups/tao/katamtaman/pilikmata.png",
"bungo": "./Pop_ups/tao/katamtaman/bungo.png",
"batok": "./Pop_ups/tao/katamtaman/batok.png",
"anit": "./Pop_ups/tao/katamtaman/anit.png",
"hinlalaki": "./Pop_ups/tao/katamtaman/hinlalaki.png",
"hintuturo": "./Pop_ups/tao/katamtaman/hintuturo.png",
"palasingsingan": "./Pop_ups/tao/katamtaman/palasingsingan.png",
"kili-kili": "./Pop_ups/tao/katamtaman/kili-kili.png",

// Bagay
"lagari": "./Pop_ups/bagay/katamtaman/lagari.png",
"tornilyo": "./Pop_ups/bagay/katamtaman/tornilyo.png",
"plorera": "./Pop_ups/bagay/katamtaman/plorera.png",
"aparador": "./Pop_ups/bagay/katamtaman/aparador.png",
"bunot": "./Pop_ups/bagay/katamtaman/bunot.png",
"abaniko": "./Pop_ups/bagay/katamtaman/abaniko.png",
"bayong": "./Pop_ups/bagay/katamtaman/bayong.png",
"itak": "./Pop_ups/bagay/katamtaman/itak.png",
"takure": "./Pop_ups/bagay/katamtaman/takure.png",
"siyanse": "./Pop_ups/bagay/katamtaman/siyanse.png",
"bombilya": "./Pop_ups/bagay/katamtaman/bombilya.png",
"elisi": "./Pop_ups/bagay/katamtaman/elisi.png",
"salipawpaw": "./Pop_ups/bagay/katamtaman/salipawpaw.png",
"silya": "./Pop_ups/bagay/katamtaman/silya.png",

// Hayop
"pambansang hayop": "./Pop_ups/hayop/katamtaman/pambansang_hayop.png",
"alimango": "./Pop_ups/hayop/katamtaman/alimango.png",
"pawikan": "./Pop_ups/hayop/katamtaman/pawikan.png",
"balyena": "./Pop_ups/hayop/katamtaman/balyena.png",
"tutubi": "./Pop_ups/hayop/katamtaman/tutubi.png",
"lobo": "./Pop_ups/hayop/katamtaman/lobo.png",
"salagubang": "./Pop_ups/hayop/katamtaman/salagubang.png",
"tahong": "./Pop_ups/hayop/katamtaman/tahong.png",
"higad": "./Pop_ups/hayop/katamtaman/higad.png",
"alimasag": "./Pop_ups/hayop/katamtaman/alimasag.png",
"pusit": "./Pop_ups/hayop/katamtaman/pusit.png",
"tuta": "./Pop_ups/hayop/katamtaman/tuta.png",
"kuting": "./Pop_ups/hayop/katamtaman/kuting.png",
"kordero": "./Pop_ups/hayop/katamtaman/kordero.png",

// Lugar
"perya": "./Pop_ups/lugar/katamtaman/perya.png",
"munisipyo": "./Pop_ups/lugar/katamtaman/munisipyo.png",
"palaruan": "./Pop_ups/lugar/katamtaman/palaruan.png",
"botika": "./Pop_ups/lugar/katamtaman/botika.png",
"entablado": "./Pop_ups/lugar/katamtaman/entablado.png",
"pabrika": "./Pop_ups/lugar/katamtaman/pabrika.png",
"sementeryo": "./Pop_ups/lugar/katamtaman/sementeryo.png",
"bangko": "./Pop_ups/lugar/katamtaman/bangko.png",
"hardin": "./Pop_ups/lugar/katamtaman/hardin.png",
"talon": "./Pop_ups/lugar/katamtaman/talon.png",
"panaderya": "./Pop_ups/lugar/katamtaman/panaderya.png",
"desyerto": "./Pop_ups/lugar/katamtaman/desyerto.png",
"palikuran": "./Pop_ups/lugar/katamtaman/palikuran.png",
"palayan": "./Pop_ups/lugar/katamtaman/palayan.png",
"Palaisdaan": "./Pop_ups/lugar/katamtaman/palaisdaan.png",
"hapag-kainan": "./Pop_ups/lugar/katamtaman/hapag_kainan.png",
"silid-aralan": "./Pop_ups/lugar/katamtaman/silid_aralan.png",
"aklatan": "./Pop_ups/lugar/katamtaman/aklatan.png",
"silid-tulugan": "./Pop_ups/lugar/katamtaman/silid_tulugan.png",

// Pagkain
"presas": "./Pop_ups/pagkain/katamtaman/presas.png",
"mansanas": "./Pop_ups/pagkain/katamtaman/mansanas.png",
"pinya": "./Pop_ups/pagkain/katamtaman/pinya.png",
"lansones": "./Pop_ups/pagkain/katamtaman/lansones.png",
"kamatis": "./Pop_ups/pagkain/katamtaman/kamatis.png",
"ubas": "./Pop_ups/pagkain/katamtaman/ubas.png",
"mangga": "./Pop_ups/pagkain/katamtaman/mangga.png",
"peras": "./Pop_ups/pagkain/katamtaman/peras.png",
"balimbing": "./Pop_ups/pagkain/katamtaman/balimbing.png",
"pakwan": "./Pop_ups/pagkain/katamtaman/pakwan.png",
"saging": "./Pop_ups/pagkain/katamtaman/saging.png",
"rambutan": "./Pop_ups/pagkain/katamtaman/rambutan.png",
"niyog": "./Pop_ups/pagkain/katamtaman/niyog.png",
"suha": "./Pop_ups/pagkain/katamtaman/suha.png",

// Kultura
"sungka": "./Pop_ups/kultura/katamtaman/sungka.png",
"patintero": "./Pop_ups/kultura/katamtaman/patintero.png",
"piko": "./Pop_ups/kultura/katamtaman/piko.png",
"tumbang preso": "./Pop_ups/kultura/katamtaman/tumbang_preso.png",
"luksong baka": "./Pop_ups/kultura/katamtaman/luksong_baka.png",
"pogs": "./Pop_ups/kultura/katamtaman/pogs.png",
"teks": "./Pop_ups/kultura/katamtaman/teks.png",
"palosebo": "./Pop_ups/kultura/katamtaman/palosebo.png",
"saranggola": "./Pop_ups/kultura/katamtaman/saranggola.png",
"turumpo": "./Pop_ups/kultura/katamtaman/turumpo.png",
"sipa": "./Pop_ups/kultura/katamtaman/sipa.png",
"karerang sako": "./Pop_ups/kultura/katamtaman/karerang_sako.png",
"batuhang bola": "./Pop_ups/kultura/katamtaman/batuhang_bola.png",
"jack en poy": "./Pop_ups/kultura/katamtaman/jack_en_poy.png",
"taya-tayaan": "./Pop_ups/kultura/katamtaman/taya_tayaan.png",
"tiyakad": "./Pop_ups/kultura/katamtaman/tiyakad.png",
"agawang panyo": "./Pop_ups/kultura/katamtaman/agawang_panyo.png",
"bingo": "./Pop_ups/kultura/katamtaman/bingo.png",

// ===== MAHIRAP =====
// Tao
"bagang": "./Pop_ups/tao/mahirap/bagang.png",
"talukap": "./Pop_ups/tao/mahirap/talukap.png",
"kalamnan": "./Pop_ups/tao/mahirap/kalamnan.png",
"kalansay": "./Pop_ups/tao/mahirap/kalansay.png",
"hinlalato": "./Pop_ups/tao/mahirap/hinlalato.png",
"bukong-bukong": "./Pop_ups/tao/mahirap/bukong-bukong.png",
"alak-alakan": "./Pop_ups/tao/mahirap/alak-alakan.png",
"gulugod": "./Pop_ups/tao/mahirap/gulugod.png",
"bahay-bata": "./Pop_ups/tao/mahirap/bahay-bata.png",
"nunal": "./Pop_ups/tao/mahirap/nunal.png",
"balintataw": "./Pop_ups/tao/mahirap/balintataw.png",
"balat": "./Pop_ups/tao/mahirap/balat.png",
"ugat": "./Pop_ups/tao/mahirap/ugat.png",
"lalamunan": "./Pop_ups/tao/mahirap/lalamunan.png",
// Hayop
"kalaykay": "./Pop_ups/hayop/mahirap/kalaykay.png",
"medida": "./Pop_ups/hayop/mahirap/medida.png",
"tisa/yeso": "./Pop_ups/hayop/mahirap/tisa_yeso.png",
"inulapik/mulapik": "./Pop_ups/hayop/mahirap/inulapik_mulapik.png",
"daksipat": "./Pop_ups/hayop/mahirap/daksipat.png",
"pantablay": "./Pop_ups/hayop/mahirap/pantablay.png",
"awanggan": "./Pop_ups/hayop/mahirap/awanggan.png",
"buntala": "./Pop_ups/hayop/mahirap/buntala.png",
"durungawan": "./Pop_ups/hayop/mahirap/durungawan.png",
"kartamuneta": "./Pop_ups/hayop/mahirap/kartamuneta.png",
"antipara": "./Pop_ups/hayop/mahirap/antipara.png",
"bingwit": "./Pop_ups/hayop/mahirap/bingwit.png",
"hurno": "./Pop_ups/hayop/mahirap/hurno.png",
"palanggana": "./Pop_ups/hayop/mahirap/palanggana.png",
"garapon": "./Pop_ups/hayop/mahirap/garapon.png",
"panggatong": "./Pop_ups/hayop/mahirap/panggatong.png",
"paboreal": "./Pop_ups/hayop/mahirap/paboreal.png",
"soro": "./Pop_ups/hayop/mahirap/soro.png",
"sisne": "./Pop_ups/hayop/mahirap/sisne.png",
"dikya": "./Pop_ups/hayop/mahirap/dikya.png",
"pugita": "./Pop_ups/hayop/mahirap/pugita.png",
"malmag": "./Pop_ups/hayop/mahirap/malmag.png",
"talaba": "./Pop_ups/hayop/mahirap/talaba.png",
"alibangbang": "./Pop_ups/hayop/mahirap/alibangbang.png",
"salaginto": "./Pop_ups/hayop/mahirap/salaginto.png",
"baboy-ramo": "./Pop_ups/hayop/mahirap/baboy-ramo.png",
"tandang": "./Pop_ups/hayop/mahirap/tandang.png",
"inahin": "./Pop_ups/hayop/mahirap/inahin.png",
"talangka": "./Pop_ups/hayop/mahirap/talangka.png",
"lumba-lumba": "./Pop_ups/hayop/mahirap/lumba-lumba.png",
"pukyutan": "./Pop_ups/hayop/mahirap/pukyutan.png",
"page": "./Pop_ups/hayop/mahirap/page.png",

// Lugar
"kapilya": "./Pop_ups/lugar/mahirap/kapilya.png",
"talyer": "./Pop_ups/lugar/mahirap/talyer.png",
"liwasan": "./Pop_ups/lugar/mahirap/liwasan.png",
"daungan": "./Pop_ups/lugar/mahirap/daungan.png",
"dalampasigan": "./Pop_ups/lugar/mahirap/dalampasigan.png",
"silong": "./Pop_ups/lugar/mahirap/silong.png",
"Kamalig": "./Pop_ups/lugar/mahirap/kamalig.png",
"sinehan": "./Pop_ups/lugar/mahirap/sinehan.png",
"tarangkahan": "./Pop_ups/lugar/mahirap/tarangkahan.png",
"danaw": "./Pop_ups/lugar/mahirap/danaw.png",
"talipapa": "./Pop_ups/lugar/mahirap/talipapa.png",

// Pagkain
"carioca": "./Pop_ups/pagkain/mahirap/carioca.png",
"puto": "./Pop_ups/pagkain/mahirap/puto.png",
"maja blanca": "./Pop_ups/pagkain/mahirap/maja_blanca.png",
"kutsinta": "./Pop_ups/pagkain/mahirap/kutsinta.png",
"sapin-sapin": "./Pop_ups/pagkain/mahirap/sapin_sapin.png",
"malagkit": "./Pop_ups/pagkain/mahirap/malagkit.png",
"bibingka": "./Pop_ups/pagkain/mahirap/bibingka.png",
"pitchi-pitc": "./Pop_ups/pagkain/mahirap/pitchi_pitc.png",
"hi": "./Pop_ups/pagkain/mahirap/hi.png",
"kalamay": "./Pop_ups/pagkain/mahirap/kalamay.png",
"biko": "./Pop_ups/pagkain/mahirap/biko.png",
"palitaw": "./Pop_ups/pagkain/mahirap/palitaw.png",
"cassava cake": "./Pop_ups/pagkain/mahirap/cassava_cake.png",
"espasol": "./Pop_ups/pagkain/mahirap/espasol.png",
"puto bumbong": "./Pop_ups/pagkain/mahirap/puto_bumbong.png",
"suman": "./Pop_ups/pagkain/mahirap/suman.png",

// Kultura
"aswang": "./Pop_ups/kultura/mahirap/aswang.png",
"kapre": "./Pop_ups/kultura/mahirap/kapre.png",
"shokoy": "./Pop_ups/kultura/mahirap/shokoy.png",
"manananggal": "./Pop_ups/kultura/mahirap/manananggal.png",
"tikbalang": "./Pop_ups/kultura/mahirap/tikbalang.png",
"sigbin": "./Pop_ups/kultura/mahirap/sigbin.png",
"dwende": "./Pop_ups/kultura/mahirap/dwende.png",
"tiktik": "./Pop_ups/kultura/mahirap/tiktik.png",
"engkanto": "./Pop_ups/kultura/mahirap/engkanto.png",
"batibat": "./Pop_ups/kultura/mahirap/batibat.png",
"bakunawa": "./Pop_ups/kultura/mahirap/bakunawa.png",
"tambal": "./Pop_ups/kultura/mahirap/tambal.png"

};

    // ===== GLOBAL BACKGROUND IMAGE =====
    const bgImg = document.createElement('img');

    function popBackground(newSrc) {
    bgImg.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    bgImg.style.transform = 'scale(0.8)';
    bgImg.style.opacity = '0';

    setTimeout(() => {
        bgImg.src = newSrc;
        bgImg.style.transform = 'scale(1.05)';
        bgImg.style.opacity = '1';

        setTimeout(() => {
            bgImg.style.transform = 'scale(1)';
        }, 150);
    }, 300);
}


    bgImg.id = 'global-bg';
    bgImg.src = 'Images/1.png';
    bgImg.style.position = 'fixed';
    bgImg.style.top = '0';
    bgImg.style.left = '0';
    bgImg.style.width = '100vw';
    bgImg.style.height = '100vh';
    bgImg.style.zIndex = '-1';
    bgImg.style.objectFit = 'cover';
    document.body.appendChild(bgImg);
    document.body.style.backgroundColor = '#F5A878';

    function showLeaderboard(players) {
    // Hide the game and drawing elements
    gameDiv.style.display = 'none';
    canvas.style.display = 'none';
    drawerToolbar.style.display = 'none';

    // Set leaderboard background
    setBackground('Images/9.png');

    // Show leaderboard container
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.style.display = 'block';

    // Sort players by score
    const sorted = [...players].sort((a, b) => b.score - a.score);

    // Top 3
    document.querySelector('.first').textContent = `🥇 ${sorted[0]?.name || ''}`;
    document.querySelector('.second').textContent = `🥈 ${sorted[1]?.name || ''}`;
    document.querySelector('.third').textContent = `🥉 ${sorted[2]?.name || ''}`;

    // Others
    const othersBox = document.getElementById('others');
    othersBox.innerHTML = '';
    sorted.slice(3).forEach((p, i) => {
        const div = document.createElement('div');
        div.textContent = `${i + 4}. ${p.name} — ${p.score} pts`;
        othersBox.appendChild(div);
    });

    // Optionally, reposition the leaderboard to match Image/9
   
}

    function setBackground(src) {
        bgImg.src = src;
        bgImg.style.objectFit = 'cover';
        bgImg.style.transform = 'scale(1)';
        document.body.style.backgroundColor = '#F5A878';
    }

    function setGameplayBackground(src) {
        bgImg.src = src;
        bgImg.style.objectFit = 'contain';
        bgImg.style.transform = 'scale(1.08)';
        document.body.style.backgroundColor = '#F5A878';
    }

    // ===== FAKE LOADING SCREEN =====
    setTimeout(() => {
        setBackground('Images/2.png'); // main menu
        moveButtonsForBackground(2);
    }, 2000);

    // ===== ELEMENTS =====
    const mainMenu = document.getElementById('mainMenu');
    const createServerBtn = document.getElementById('createServerBtn');
    const joinServerBtn = document.getElementById('joinServerBtn');

    [createServerBtn, joinServerBtn].forEach(btn => {
        btn.style.position = 'absolute';
        btn.style.border = 'none';
    });

    const serverForm = document.getElementById('serverForm');
    const formTitle = document.getElementById('formTitle');
    const serverCodeDiv = document.getElementById('serverCodeDiv');
    const serverCodeInput = document.getElementById('serverCodeInput');
    const usernameInput = document.getElementById('usernameInput');
    const confirmBtn = document.getElementById('confirmBtn');
    const backBtn = document.getElementById('backBtn');

    const waitingRoom = document.getElementById('waitingRoom');
    const serverCodeDisplay = document.getElementById('serverCodeDisplay');
    const playersListDiv = document.getElementById('playersList');
    const startGameBtn = document.getElementById('startGameBtn');

    const settingsDiv = document.getElementById('settingsDiv');
    const waitingLeft = document.getElementById('waitingLeft');
    const settingsBox = document.getElementById('settingsBox');
    const playersBox = document.getElementById('playersBox');

    const gameDiv = document.getElementById('game');
    const drawerToolbar = document.getElementById('drawerToolbar');

drawerToolbar.style.position = 'absolute';
drawerToolbar.style.top = '58vh';      // 0 distance from top
drawerToolbar.style.left = '3.3vw';     // 0 distance from left
drawerToolbar.style.opacity = '1';
drawerToolbar.style.border = '2vh solid #9fa565';
drawerToolbar.style.backgroundColor = '#ffffff';  // your peach shade
drawerToolbar.style.borderRadius = '1vh';         // rounded corners
drawerToolbar.style.boxShadow = '0 1vh 1vh rgba(0,0,0,0.4)'; // optional depth
drawerToolbar.style.pointerEvents = 'auto';       // make sure clicks still work
drawerToolbar.style.width = '26.5vw';   // or whatever width you want
drawerToolbar.style.height = '37vh';  // or whatever height you want

// optional: semi-transparent background so you see the game bg behind it
drawerToolbar.style.background = 'rgb(255, 255, 255)';


    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');

    const brushSizeInput = document.getElementById('brushSize');
    const brushTypeButtons = document.querySelectorAll('.brushTypeBtn'); // new buttons
    let currentBrushType = 'round'; // default brush type

    // ===== BRUSH TYPE BUTTONS =====
    brushTypeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
           currentBrushType = btn.dataset.value; // 'round' or 'marker'
         // Optional: highlight selected button
         brushTypeButtons.forEach(b => b.classList.remove('active'));
         btn.classList.add('active');
        });
    });

    const colorPaletteDiv = document.getElementById('colorPalette');
    const clearCanvasBtn = document.getElementById('clearCanvasBtn');

    const guessInput = document.getElementById('guessInput');

guessInput.style.position = 'absolute';
guessInput.style.top = '48vh';      // distance from top
guessInput.style.left = '8vw';      // distance from left
guessInput.style.width = '11vw';    // adjust width
guessInput.style.height = '2vh';    // adjust height
guessInput.style.fontSize = '1.8vh';  // text size
guessInput.style.zIndex = '100';
guessInput.style.borderRadius = '8px';
guessInput.style.border = '1px solid #333';
guessInput.style.background = 'rgba(255, 255, 255, 0.9)';

    const sendGuessBtn = document.getElementById('sendGuess');

sendGuessBtn.style.position = 'absolute';
sendGuessBtn.style.top = '48vh';       // same vertical alignment
sendGuessBtn.style.left = '20vw';      // right after the input
sendGuessBtn.style.width = '8vw';
sendGuessBtn.style.height = '2.8vh';
sendGuessBtn.style.fontSize = '1.8vh';
sendGuessBtn.style.borderRadius = '8px';
sendGuessBtn.style.border = '1px solid #333';
sendGuessBtn.style.background = 'rgba(151, 151, 151, 0.9)'; // peach color
sendGuessBtn.style.cursor = 'pointer';
sendGuessBtn.style.zIndex = '100';

    const messagesDiv = document.getElementById('messages');

messagesDiv.style.position = 'absolute';
messagesDiv.style.top = '14vh';
messagesDiv.style.left = '6vw';
messagesDiv.style.width = '24vw';
messagesDiv.style.height = '17vh';
messagesDiv.style.fontSize = '3vh';
messagesDiv.style.background = 'rgba(255,200,150,0)';
messagesDiv.style.borderRadius = '10px';
messagesDiv.style.padding = '1vh';
messagesDiv.style.zIndex = '100';

    const playersListGame = document.getElementById('playersListGame');

    playersListGame.style.position = 'absolute';
    playersListGame.style.top = '32vh';    // vertical position
    playersListGame.style.left = '6vw';  // horizontal position
    playersListGame.style.width = '24vw';
    playersListGame.style.height = '11vh';
    playersListGame.style.fontSize = '2vh';
    playersListGame.style.color = 'black'; // or whatever fits your bg
    playersListGame.style.background = 'rgba(255, 200, 150, 0)'; // peachish box
    playersListGame.style.borderRadius = '16px';
    playersListGame.style.padding = '1vh';
    playersListGame.style.zIndex = '100';

    const roundInfo = document.getElementById('roundInfo');

    roundInfo.style.position = 'absolute';
    roundInfo.style.top = '4vh';     // distance from top
    roundInfo.style.left = '15vw';   // distance from left
    roundInfo.style.transform = 'translateX(-50%)'; // center horizontally
    roundInfo.style.fontSize = '3vh';
    roundInfo.style.fontWeight = 'bold';
    roundInfo.style.color = 'black';
    roundInfo.style.background = 'rgba(255, 200, 150, 0)'; // peachish box
    roundInfo.style.zIndex = '1000';


    const timerEl = document.getElementById('timer');

    timerEl.style.position = 'absolute';
    timerEl.style.top = '7.5vh';           // vertical position
    timerEl.style.left = '25vw';         // horizontal position
    timerEl.style.transform = 'translateX(-50%)'; // optional centering
    timerEl.style.fontSize = '2.5vh';
    timerEl.style.fontWeight = 'bold';
    timerEl.style.color = 'black';
    timerEl.style.background = 'rgba(255, 200, 150, 0)'; // peach box
    timerEl.style.zIndex = '1000';

    const roleEl = document.getElementById('role');

    roleEl.style.position = 'absolute';
    roleEl.style.top = '7.5vh';        // adjust vertical position
    roleEl.style.left = '17vw';       // horizontal position
    roleEl.style.transform = 'translateX(-50%)'; // center horizontally
    roleEl.style.fontSize = '2.5vh';
    roleEl.style.color = 'black';
    roleEl.style.background = 'rgba(255, 200, 150, 0)'; // rounded peach box
    roleEl.style.zIndex = '1000';

    const wordText = document.getElementById('wordText');
    const wordContainer = document.getElementById('wordContainer');

    wordContainer.style.position = 'absolute';
    wordContainer.style.top = '50vh';
    wordContainer.style.left = '12vw';
    wordContainer.style.transform = 'translateX(-50%)';
    wordContainer.style.fontSize = '2.5vh';
    wordContainer.style.fontWeight = 'bold';
    wordContainer.style.color = 'black';
    wordContainer.style.background = 'rgba(255, 255, 255, 0.8)';
    wordContainer.style.padding = '0.5vh 1vh';
    wordContainer.style.borderRadius = '1.2vh';
    wordContainer.style.zIndex = '1000';


    settingsBox.style.pointerEvents = 'none';
    playersBox.style.pointerEvents  = 'none';
    waitingLeft.style.pointerEvents = 'none';
    
    // ===== STATE =====
    let mode = '';
    let serverCode = '';
    let username = '';
    let isCreator = false;
    let isDrawer = false;
    let isDrawing = false;
    let currentDrawerId = null;
    let prevX = 0;
    let prevY = 0;
    let currentColor = '#000000';

    // ===== COLOR PALETTE =====
    const COLORS = [
        '#43362e', '#e7675f', '#e89666',
        '#f7dc75', '#abd47b', '#82d6e0',
        '#a183d9', '#b08361', '#96918b'
    ];

    function buildColorPalette() {
        colorPaletteDiv.innerHTML = '';
        COLORS.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color;
            if (color === currentColor) swatch.classList.add('selected');
            swatch.onclick = () => {
                currentColor = color;
                document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
                swatch.classList.add('selected');
            };
            colorPaletteDiv.appendChild(swatch);
        });
    }

    buildColorPalette();
    setCanvasSize(880, 365);

    function setCanvasSize(width, height) {
        canvas.width = width;
        canvas.height = height;
        canvas.style.position = 'absolute';
        canvas.style.left = '33.5vw';   // 👈 move horizontally
        canvas.style.top  = '48.25vh';   // 👈 move vertically
        canvas.style.zIndex = '50';

        clearCanvas();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // ===== MOVE BUTTONS PER BACKGROUND =====
    function moveButtonsForBackground(bgNumber) {
        const buttons = [createServerBtn, joinServerBtn];
        buttons.forEach(btn => {
            btn.style.display = 'block';
            btn.style.position = 'absolute';
            btn.style.width = '30.5vw';
            btn.style.height = '17vh';
            btn.style.fontSize = '2vw';
            btn.style.opacity = '0';
            btn.style.cursor = 'pointer';
        });

        if (bgNumber === 2 || bgNumber === 3 || bgNumber === 4) {
            createServerBtn.style.left = '9.3vw';
            createServerBtn.style.top  = '70.9vh';
            joinServerBtn.style.left = '58.5vw';
            joinServerBtn.style.top  = '70.9vh';
        }
    }

    // ===== MOVE FORM ELEMENTS PER SCREEN =====
    function moveFormElementsForBg(bgNumber) {
        formTitle.style.display = 'none';
        const usernameLabel = document.querySelector('label[for="usernameInput"]');
        if(usernameLabel) usernameLabel.style.display = 'none';

        if(bgNumber === 3){ // Create
            usernameInput.style.position = 'absolute';
            usernameInput.style.left = '41.5vw';
            usernameInput.style.top = '34.5vh';
            usernameInput.style.border = 'none';
            usernameInput.style.background = 'transparent'; 
            usernameInput.style.display = 'block';
            usernameInput.style.width = '18.1vw';
            usernameInput.style.height = '8vh';
            usernameInput.style.fontSize = '3vw';
            usernameInput.style.textAlign = 'center'; 
            usernameInput.style.fontFamily = "'Nerko One', sans-serif";

            confirmBtn.style.position = 'absolute';
            confirmBtn.style.left = '9.3vw';
            confirmBtn.style.top  = '70.9vh';
            confirmBtn.style.border = '2px solid green';
            confirmBtn.style.display = 'block';
            confirmBtn.style.width = '30.5vw';
            confirmBtn.style.height = '17vh';
            confirmBtn.style.fontSize = '2vw';
            confirmBtn.style.opacity = '0';
            confirmBtn.style.cursor = 'pointer';

            backBtn.style.position = 'absolute';
            backBtn.style.left = '58.5vw';
            backBtn.style.top  = '70.9vh';
            backBtn.style.border = '2px solid orange';
            backBtn.style.display = 'block';
            backBtn.style.width = '30.5vw';
            backBtn.style.height = '17vh';
            backBtn.style.fontSize = '2vw';
            backBtn.style.opacity = '0';
            backBtn.style.cursor = 'pointer';

            serverCodeInput.style.display = 'none';
        }

        if(bgNumber === 4){ // Join
            usernameInput.style.position = 'absolute';
            usernameInput.style.left = '41.9vw';
            usernameInput.style.top = '42.6vh';
            usernameInput.style.border = 'none';
            usernameInput.style.background = 'transparent'; 
            usernameInput.style.display = 'block';
            usernameInput.style.width = '18.2vw';
            usernameInput.style.height = '8vh';
            usernameInput.style.fontSize = '3vw';
            usernameInput.style.textAlign = 'center'; 
            usernameInput.style.fontFamily = "'Nerko One', sans-serif";

            serverCodeInput.style.position = 'absolute';
            serverCodeInput.style.left = '41.9vw';
            serverCodeInput.style.top  = '23vh';
            serverCodeInput.style.border = 'none';
            serverCodeInput.style.background = 'transparent'; 
            serverCodeInput.style.display = 'block';
            serverCodeInput.style.width = '18.2vw';
            serverCodeInput.style.height = '8vh';
            serverCodeInput.style.fontSize = '3vw';
            serverCodeInput.style.textAlign = 'center'; 
            serverCodeInput.style.fontFamily = "'Nerko One', sans-serif";

            confirmBtn.style.position = 'absolute';
            confirmBtn.style.left = '9.3vw';
            confirmBtn.style.top  = '70.9vh';
            confirmBtn.style.border = '2px solid green';
            confirmBtn.style.display = 'block';
            confirmBtn.style.width = '30.5vw';
            confirmBtn.style.height = '17vh';
            confirmBtn.style.fontSize = '2vw';
            confirmBtn.style.opacity = '0';
            confirmBtn.style.cursor = 'pointer';

            backBtn.style.position = 'absolute';
            backBtn.style.left = '58.5vw';
            backBtn.style.top  = '70.9vh';
            backBtn.style.border = '2px solid orange';
            backBtn.style.display = 'block';
            backBtn.style.width = '30.5vw';
            backBtn.style.height = '17vh';
            backBtn.style.fontSize = '2vw';
            backBtn.style.opacity = '0';
            backBtn.style.cursor = 'pointer';
        }
    }

    // ===== MENU BUTTONS =====
    createServerBtn.onclick = () => {
        mode = 'create';
        isCreator = true;
        serverCodeDiv.style.display = 'none';
        mainMenu.style.display = 'none';
        serverForm.style.display = 'block';
        setBackground('Images/3.png');
        moveButtonsForBackground(3);
        moveFormElementsForBg(3);
    };

    joinServerBtn.onclick = () => {
        mode = 'join';
        isCreator = false;
        serverCodeDiv.style.display = 'block';
        mainMenu.style.display = 'none';
        serverForm.style.display = 'block';
        setBackground('Images/4.png');
        moveButtonsForBackground(4);
        moveFormElementsForBg(4);
    };

    backBtn.onclick = () => {
        serverForm.style.display = 'none';
        mainMenu.style.display = 'block';
        setBackground('Images/2.png');
        moveButtonsForBackground(2);
    };

    // ===== DYNAMIC POSITIONING OF WAITING ROOM ELEMENTS =====
    function positionWaitingRoomElements() {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;

        waitingLeft.style.position = 'absolute';
        waitingLeft.style.left = 0.05 * screenW + "px";
        waitingLeft.style.top  = 0.05 * screenH + "px";

        settingsBox.style.position = 'absolute';
        settingsBox.style.left = 0.05 * screenW + "px";
        settingsBox.style.top  = 0.35 * screenH + "px";

        playersBox.style.position = 'absolute';
       

        startGameBtn.style.position = 'absolute';
        
    }

    function showWaitingRoom() {
        waitingRoom.style.display = 'block';
        positionWaitingRoomElements();
        
    }

    function hideWaitingRoom() {
        waitingRoom.style.display = 'none';
    }

    window.addEventListener('resize', () => {
        if (waitingRoom.style.display === 'block') {
            positionWaitingRoomElements();
           
        }
    });

    // ===== CONFIRM BUTTON =====
    confirmBtn.onclick = () => {
        username = usernameInput.value.trim();
        if (!username) return alert('Ilagay ang pangalan');

        if (mode === 'create') {
            socket.emit('joinMenu', { serverCode: '', username, mode: 'create' });
        } else {
            const code = serverCodeInput.value.trim().toUpperCase();
            if (!code) return alert('Ilagay ang kodigo');
            socket.emit('joinMenu', { serverCode: code, username, mode: 'join' });
        }

        serverForm.style.display = 'none';
        showWaitingRoom();
        popBackground('Images/7.png');
    };

    // ===== SERVER EVENTS =====
    socket.on('serverCodeUpdate', code => {
        serverCode = code;
        serverCodeDisplay.innerHTML = `<strong>${code}</strong>`;
        if (isCreator) settingsDiv.style.display = 'block';
    });

    socket.on('updatePlayers', players => {
        playersListDiv.innerHTML = '';
        players.forEach(p => {
            const d = document.createElement('div');
            d.textContent = p;
            playersListDiv.appendChild(d);
        });
        startGameBtn.disabled = players.length < 2;
    });

    // ===== POSITION SERVER CODE AND PLAYER LIST INDEPENDENTLY =====
    function positionServerUI() {
        serverCodeDiv.style.position = 'absolute';
        serverCodeDiv.style.left = '30vw';
        serverCodeDiv.style.top  = '30vh';
        serverCodeDiv.style.width = '30vw';
        serverCodeDiv.style.height = '40vh';
        serverCodeDiv.style.fontSize = '2vw';
        serverCodeDiv.style.textAlign = 'center';
        serverCodeDiv.style.background = 'transparent';
        serverCodeDiv.style.border = 'none';
        serverCodeDiv.style.color = 'white';
        serverCodeDiv.style.zIndex = '1000';

        playersListDiv.style.position = 'absolute';
        playersListDiv.style.left = '70vw';
        playersListDiv.style.top  = '5vh';
        playersListDiv.style.width = '34vw';
        playersListDiv.style.height = '30vh';
        playersListDiv.style.fontSize = '1.5vw';
        playersListDiv.style.background = 'transparent';
        playersListDiv.style.border = 'none';
        playersListDiv.style.color = 'white';
        playersListDiv.style.zIndex = '1000';
    }

    // ===== MAKE SERVER CODE & PLAYER LIST DRAGGABLE =====
    function makeDraggable(el) {
        let offsetX = 0, offsetY = 0, isDragging = false;

        el.addEventListener('mousedown', e => {
            isDragging = true;
            offsetX = e.clientX - el.getBoundingClientRect().left;
            offsetY = e.clientY - el.getBoundingClientRect().top;
        });

        window.addEventListener('mousemove', e => {
            if (!isDragging) return;
            el.style.left = (e.clientX - offsetX) + 'px';
            el.style.top = (e.clientY - offsetY) + 'px';
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    makeDraggable(serverCodeDiv);
    makeDraggable(playersListDiv);

    // ===== MANUAL BUTTONS FOR DIFFICULTY & GENRE =====
    const difficultyButtons = document.querySelectorAll('.difficultyBtn');
    const genreButtons = document.querySelectorAll('.genreBtn');
    let selectedDifficulty = 'madali';
    let selectedGenre = 'tao';

    function setButtonStyle(btn, {left, top, width, height, fontSize, border, cursor}) {
    if (!btn) return;

    btn.style.position = 'absolute';
    btn.style.display = 'block';

    if (left !== undefined) btn.style.left = left;
    if (top !== undefined) btn.style.top = top;
    if (width !== undefined) btn.style.width = width;
    if (height !== undefined) btn.style.height = height;
    if (fontSize !== undefined) btn.style.fontSize = fontSize;

    btn.style.opacity = '0';          // invisible
    btn.style.cursor = 'pointer';
    btn.style.background = 'white';
    btn.style.border = 'none';

    btn.style.zIndex = '9999';        // 🔥 CRITICAL
    btn.style.pointerEvents = 'auto'; // 🔥 CRITICAL
    

}



    // ===== EXAMPLES FOR EACH BUTTON =====
    // Difficulty buttons
    setButtonStyle(difficultyButtons[0], {left: '-4.5vw', top: '0vh', width: '21vw', height: '15vh', fontSize: '1.2vw'});
    setButtonStyle(difficultyButtons[1], {left: '-4.5vw', top: '23vh', width: '21vw', height: '15vh', fontSize: '1.2vw'});
    setButtonStyle(difficultyButtons[2], {left: '-4.5vw', top: '47vh', width: '21vw', height: '15vh', fontSize: '1.2vw'});

    // Genre buttons
    setButtonStyle(genreButtons[0], {left: '23vw', top: '13.3vh', width: '13.7vw', height: '16vh', fontSize: '1.5vw'});
    setButtonStyle(genreButtons[1], {left: '38.75vw', top: '13.3vh', width: '13.7vw', height: '16vh', fontSize: '1.5vw'});
    setButtonStyle(genreButtons[2], {left: '54.5vw', top: '13.3vh', width: '13.7vw', height: '16vh', fontSize: '1.5vw'});
    setButtonStyle(genreButtons[3], {left: '23vw', top: '35.65vh', width: '13.7vw', height: '16vh', fontSize: '1.5vw'});
    setButtonStyle(genreButtons[4], {left: '38.75vw', top: '35.65vh', width: '13.7vw', height: '16vh', fontSize: '1.5vw'});
    setButtonStyle(genreButtons[5], {left: '54.5vw', top: '35.65vh', width: '13.7vw', height: '16vh', fontSize: '1.5vw'});
    setButtonStyle(genreButtons[6], {left: '70.245vw', top: '13.3vh', width: '13.7vw', height: '16vh', fontSize: '1.5vw'});

    function handleSelection(buttons, clickedBtn, type){
        buttons.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
        if(type==='difficulty') selectedDifficulty = clickedBtn.dataset.value;
        if(type==='genre') selectedGenre = clickedBtn.dataset.value;
        if(isCreator){
            socket.emit('updateSettings', {
                serverCode,
                difficulty: selectedDifficulty,
                genre: selectedGenre
            });
        }
    }

    difficultyButtons.forEach(btn => btn.onclick = () => handleSelection(difficultyButtons, btn, 'difficulty'));
    genreButtons.forEach(btn => btn.onclick = () => handleSelection(genreButtons, btn, 'genre'));

    // ===== START GAME =====
    startGameBtn.onclick = () => {
        socket.emit('startGame', { serverCode });
        startGameBtn.disabled = true;
    };

    // ===== GAME FLOW =====
    socket.on('newRound', data => {
        hideWaitingRoom();
        gameDiv.style.display = 'block';
        drawerToolbar.style.display = 'none';
        setGameplayBackground('Images/Interface.png');
        roundInfo.textContent = `Round ${data.round}`;
        currentDrawerId = data.drawerId;
        clearCanvas();
        wordText.textContent = '';
        if(socket.id===data.drawerId){
            isDrawer=true;
            roleEl.textContent='Ikaw ang Guguhit';
            drawerToolbar.style.display='block';
        } else {
            isDrawer=false;
            roleEl.textContent='Ikaw ay Huhula';
        }
    });

    socket.on('assignWord', word => { if(isDrawer) wordText.textContent=word; });
    socket.on('time', t => timerEl.textContent=`Oras: ${t}s`);
    socket.on('message', msg => {
    const d = document.createElement('div');

    const sender =
        msg.from === 'System' ? 'Sistema' : msg.from;

    d.textContent = `${sender}: ${msg.text}`;
    messagesDiv.appendChild(d);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
    socket.on('players', list=>{
        playersListGame.innerHTML='';
        list.forEach(p=>{
            const li=document.createElement('li');
            li.textContent=`${p.name}: ${p.score}`;
            playersListGame.appendChild(li);
        });
    });

socket.on('roundEnd', ({ round, word }) => {
    const oldPopup = document.getElementById('word-popup');
    if (oldPopup) oldPopup.remove();

    const popup = document.createElement('div');
    popup.id = 'word-popup';

    // ===== POPUP STYLING =====
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '30px';
    popup.style.background = 'rgba(0,0,0,0.9)';
    popup.style.color = 'white';
    popup.style.fontSize = '24px';
    popup.style.borderRadius = '12px';
    popup.style.textAlign = 'center';
    popup.style.zIndex = '9999';
    popup.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
    popup.style.display = 'inline-block';
    popup.style.maxWidth = '90vw';

    // ===== TEXT =====
    const text = document.createElement('div');
    text.innerHTML = `Ang salita ay: <strong>${word}</strong>`;
    text.style.marginBottom = '15px';
    popup.appendChild(text);

    // ===== IMAGE =====
    const img = document.createElement('img');
    img.style.maxWidth = '80vw';
    img.style.maxHeight = '60vh';
    img.style.borderRadius = '30px';
    img.style.objectFit = 'contain';

    // USE ENUMERATION
    const key = word.toLowerCase().replace(/\s+/g, ' ').trim(); // normalize
    if (imageMap[key]) {
        img.src = imageMap[key];
    } else {
        img.style.display = 'none'; // fallback
    }

    popup.appendChild(img);
    document.body.appendChild(popup);

    // ===== DISPLAY DURATION =====
    const duration = Math.floor(Math.random() * (8000 - 5000 + 1)) + 5000; // 5–8 sec
    const fadeOut = () => {
        popup.style.transition = 'opacity 0.5s';
        popup.style.opacity = '0';
        setTimeout(() => popup.remove(), 500);
    };
    const timeoutId = setTimeout(fadeOut, duration);

    // ===== REMOVE POPUP WHEN NEXT ROUND STARTS =====
    const removeOnNextRound = () => {
        clearTimeout(timeoutId);
        if (popup.parentElement) fadeOut();
        socket.off('newRound', removeOnNextRound);
    };
    socket.on('newRound', removeOnNextRound);
});

socket.on('gameOver', ({ players }) => {
    // show leaderboard background
    showLeaderboard(players); 
    setBackground('Images/9.png');

    const leaderboard = document.getElementById('leaderboard');
    leaderboard.style.display = 'block';

    // sort players by score
    const sorted = [...players].sort((a, b) => b.score - a.score);

    document.querySelector('.first').textContent =
        `🥇 ${sorted[0]?.name || ''}`;

    document.querySelector('.second').textContent =
        `🥈 ${sorted[1]?.name || ''}`;

    document.querySelector('.third').textContent =
        `🥉 ${sorted[2]?.name || ''}`;

    const othersBox = document.getElementById('others');
    othersBox.innerHTML = '';

    sorted.slice(3).forEach((p, i) => {
        const div = document.createElement('div');
        div.textContent = `${i + 4}. ${p.name} — ${p.score} pts`;
        othersBox.appendChild(div);
    });
});


    sendGuessBtn.onclick=sendGuess;
    guessInput.addEventListener('keydown', e=>{ if(e.key==='Enter') sendGuess(); });
    function sendGuess(){
        const text=guessInput.value.trim();
        if(!text)return;
        socket.emit('guess', text);
        guessInput.value='';
    }

    canvas.addEventListener('mousedown',e=>{ if(!isDrawer)return; isDrawing=true; const r=canvas.getBoundingClientRect(); prevX=e.clientX-r.left; prevY=e.clientY-r.top; });
    canvas.addEventListener('mouseup',()=>isDrawing=false);
    canvas.addEventListener('mouseleave',()=>isDrawing=false);
// ===== DRAWING ON CANVAS =====
canvas.addEventListener('mousemove', e => {
    if(!isDrawer || !isDrawing) return;
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSizeInput.value;
    ctx.lineCap = currentBrushType === 'marker' ? 'square' : 'round';

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.stroke();

    socket.emit('draw', {
        prevX, prevY, x, y,
        color: currentColor,
        size: brushSizeInput.value,
        cap: ctx.lineCap
    });

    prevX = x;
    prevY = y;
});

    socket.on('draw',d=>{
        ctx.strokeStyle=d.color;
        ctx.lineWidth=d.size;
        ctx.lineCap=d.cap||'round';
        ctx.beginPath();
        ctx.moveTo(d.prevX,d.prevY);
        ctx.lineTo(d.x,d.y);
        ctx.stroke();
    });

    clearCanvasBtn.onclick=()=>{ clearCanvas(); socket.emit('clearCanvas'); };
    socket.on('clearCanvas', clearCanvas);

});
