(() => {
  'use strict';

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {});
    });
  }

  function deepFreeze(obj) {
    if (obj && typeof obj === 'object' && !Object.isFrozen(obj)) {
      Object.freeze(obj);
      Object.keys(obj).forEach((key) => deepFreeze(obj[key]));
    }
    return obj;
  }

  const DAYS_SHORT = Object.freeze(['Sv', 'P', 'O', 'T', 'C', 'P', 'S']);
  const DAYS_FULL = Object.freeze(['Svētdiena', 'Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'Sestdiena']);
  const MONTHS_GEN = Object.freeze(['janvāris', 'februāris', 'marts', 'aprīlis', 'maijs', 'jūnijs', 'jūlijs', 'augusts', 'septembris', 'oktobris', 'novembris', 'decembris']);

  const DATA_BANK = deepFreeze({
    svari: [
      {
        focus: 'Lēmumu pieņemšana un robežas',
        summary: 'Diena prasa skaidru prioritāšu noteikšanu. Vislabāk veiksies uzdevumi, kuros nepieciešama diplomātija un strukturēta saruna, taču izvairieties no mēģinājumiem izpatikt visiem vienlaikus.',
        plus: [
          { key: 'Pārliecinoša komunikācija:', text: 'Viegli atradīsiet kopīgu valodu sarežģītās darba vai sadzīves sarunās.' },
          { key: 'Kārtība dokumentos:', text: 'Piemērots brīdis līgumu, rēķinu vai plānu sakārtošanai.' }
        ],
        minus: [
          { key: 'Vilcināšanās ar izvēli:', text: 'Pārmērīga visu variantu svēršana var aizkavēt vienkāršus lēmumus.' },
          { key: 'Citu problēmu uzņemšanās:', text: 'Neuzņemieties svešus pienākumus uz sava laika rēķina.' }
        ]
      },
      {
        focus: 'Finanšu un resursu balanss',
        lotteryAlert: 'Paaugstināta finanšu veiksmes varbūtība — labvēlīgs brīdis nelielai loterijas biļetei vai izlozei ar iepriekš noteiktu budžeta limitu.',
        summary: 'Praktiska un piezemēta diena. Uzmanība dabiski pievērsīsies budžetam, ikdienas efektivitātei un tam, kur aizplūst jūsu enerģija bez reālas atdeves.',
        plus: [
          { key: 'Racionāls skatījums:', text: 'Spēsiet objektīvi izvērtēt izdevumus un atteikties no liekā.' },
          { key: 'Sadarbības sinerģija:', text: 'Labs atbalsts no uzticama kolēģa vai tuva cilvēka.' }
        ],
        minus: [
          { key: 'Emocionāli pirkumi vakarā:', text: 'Noguruma dēļ var rasties vēlme kompensēt stresu ar neplānotiem tēriņiem.' },
          { key: 'Jūtīgums pret kritiku:', text: 'Neuztveriet konstruktīvu piezīmi kā personisku pārmetumu.' }
        ]
      },
      {
        focus: 'Fokuss un darba temps',
        summary: 'Augsta mentālā aktivitāte ļaus ātri apstrādāt informāciju. Diena ir labvēlīga mācībām, rakstīšanai un ideju strukturēšanai, bet prasa disciplīnu pret traucēkļiem.',
        plus: [
          { key: 'Ātra uztvere:', text: 'Sarežģītus jautājumus atrisināsiet ātrāk nekā parasti.' },
          { key: 'Noderīgi kontakti:', text: 'Nejauša saruna vai ziņa var sniegt vērtīgu praktisku informāciju.' }
        ],
        minus: [
          { key: 'Uzmanības sadrumstalotība:', text: 'Pārāk daudz paralēlu uzdevumu samazinās gala kvalitāti.' },
          { key: 'Steiga sīkumos:', text: 'Pārbaudiet detaļas pirms svarīgu ziņu nosūtīšanas.' }
        ]
      },
      {
        focus: 'Attiecības un personīgā telpa',
        summary: 'Šodien priekšplānā izvirzās līdzsvars starp pienākumiem un atpūtu. Atklāta, mierīga saruna palīdzēs novērst senāku pārpratumu.',
        plus: [
          { key: 'Skaidrība attiecībās:', text: 'Godīga saruna bez aplinkiem nesīs atvieglojumu abām pusēm.' },
          { key: 'Estētiska sakārtotība:', text: 'Vides sakārtošana mājās vai darbavietā uzlabos koncentrēšanos.' }
        ],
        minus: [
          { key: 'Noklusēta neapmierinātība:', text: 'Ja kaut kas neapmierina, pasakiet to uzreiz, nevis krājiet sevī.' },
          { key: 'Zems fiziskais tonuss:', text: 'Nepārplānojiet vakaru — ieplānojiet laiku mierīgai atslodzei.' }
        ]
      },
      {
        focus: 'Iniciatīva un rezultāti',
        lotteryAlert: 'Labvēlīgs negaidītu ieguvumu fons — ja plānojāt piedalīties skaitļu izlozē vai momentloterijā, šodien ir piemērotākais brīdis.',
        summary: 'Labvēlīgs brīdis iesākto darbu pabeigšanai. Apkārtējie novērtēs jūsu mierīgo pieeju situācijās, kur citi sāk lieki satraukties.',
        plus: [
          { key: 'Konkrēts progress:', text: 'Izdevīgs laiks punktu pielikšanai ieilgušiem uzdevumiem.' },
          { key: 'Diplomātisks spēks:', text: 'Spēsiet nomierināt saspringtu atmosfēru komandā vai ģimenē.' }
        ],
        minus: [
          { key: 'Perfekcionisma slazds:', text: 'Neaizkavējiet nodošanu, mēģinot noslīpēt nebūtiskas nianses.' },
          { key: 'Pārlieka piekāpība:', text: 'Turieties pie sava sākotnējā plāna, ja zināt, ka tas ir pamatots.' }
        ]
      },
      {
        focus: 'Atjaunošanās un perspektīva',
        summary: 'Diena piemērota distancēšanās no ikdienas steigas. Laba intuitīvā skaidrība par to, kādus mērķus ir vērts turpināt nākamajā nedēļā.',
        plus: [
          { key: 'Kvalitatīva atpūta:', text: 'Mainot ierasto maršrutu vai vidi, ātri atgūsiet enerģiju.' },
          { key: 'Radošs skatījums:', text: 'Radīsies nestandarta risinājums kādai sadzīviskai problēmai.' }
        ],
        minus: [
          { key: 'Pārmērīga analizēšana:', text: 'Neatskatieties uz pagātnes sīkumiem, ko vairs nevar mainīt.' },
          { key: 'Informācijas pārslodze:', text: 'Ierobežojiet laiku ziņu plūsmā un sociālajos tīklos.' }
        ]
      },
      {
        focus: 'Plānošana un iekšējais miers',
        summary: 'Mierīga, strukturēta diena, kas vislabāk noder nākamās nedēļas grafika sakārtošanai un enerģijas uzkrāšanai.',
        plus: [
          { key: 'Skaidrs plāns:', text: 'Pārskatāms saraksts ar 3 galvenajiem mērķiem dos pārliecību.' },
          { key: 'Harmoniska komunikācija:', text: 'Patīkamas sarunas ar cilvēkiem, kuriem uzticaties.' }
        ],
        minus: [
          { key: 'Slinkums pret rutīnu:', text: 'Mazie sadzīves darbi var šķist smagāki nekā parasti.' },
          { key: 'Vēla gulētiešana:', text: 'Ievērojiet miega režīmu, lai pirmdiena nesāktos ar nogurumu.' }
        ]
      }
    ],
    vezis: [
      {
        focus: 'Drošība, mērķtiecība un intuīcija',
        lotteryAlert: 'Spēcīga skaitļu un sakritību intuīcija — šodien ir paaugstināta neliela naudas laimesta vai veiksmīgas izlozes varbūtība.',
        summary: 'Spēcīga iekšējā intuīcija palīdzēs precīzi nolasīt citu cilvēku patiesos nodomus. Koncentrējieties uz praktiskiem soļiem, kas stiprina jūsu stabilitāti.',
        plus: [
          { key: 'Precīza priekšnojauta:', text: 'Uzticieties pirmajam iespaidam sarunās un darījumos.' },
          { key: 'Produktīva iedziļināšanās:', text: 'Lieliska spēja strādāt patstāvīgi un pabeigt sarežģītus darbus.' }
        ],
        minus: [
          { key: 'Noslēgšanās sevī:', text: 'Ja kas nomāc, neizvairieties no sarunas ar tuvākajiem.' },
          { key: 'Pārlieka piesardzība:', text: 'Nebaidieties spert soli uz priekšu tikai tāpēc, ka nav 100% garantiju.' }
        ]
      },
      {
        focus: 'Praktiskie darbi un mājas vide',
        summary: 'Diena prasa kārtību un skaidrus noteikumus. Vislabāko gandarījumu sniegs taustāmi rezultāti darbā vai mājokļa sakārtošanā.',
        plus: [
          { key: 'Finanšu disciplīna:', text: 'Labs brīdis pārskatīt regulāros maksājumus un uzkrājumus.' },
          { key: 'Uzticams atbalsts:', text: 'Kāds no ģimenes vai tuviem draugiem sniegs praktisku padomu.' }
        ],
        minus: [
          { key: 'Garastāvokļa svārstības:', text: 'Neļaujiet citu cilvēku steigai vai nervozitātei sabojāt jūsu ritmu.' },
          { key: 'Aizvainojuma turēšana:', text: 'Nepārnesiet vakardienas emocijas uz šodienas situācijām.' }
        ]
      },
      {
        focus: 'Komunikācija un faktu pārbaude',
        summary: 'Aktīva diena ar daudzām sarunām un ziņām. Saglabājiet vēsu prātu un balstieties uz pārbaudītiem faktiem, nevis pieņēmumiem.',
        plus: [
          { key: 'Tieša un skaidra valoda:', text: 'Spēsiet precīzi noformulēt savas vajadzības bez liekām emocijām.' },
          { key: 'Ātri risinājumi:', text: 'Sadzīves vai tehniskas aizķeršanās izdosies nokārtot raiti.' }
        ],
        minus: [
          { key: 'Pārspīlēta reakcija:', text: 'Pirms atbildat uz nepatīkamu ziņu, ievelciet elpu un nogaidiet 10 minūtes.' },
          { key: 'Pārslodze ar sīkumiem:', text: 'Nedeleģējiet sev to, ko citi var izdarīt paši.' }
        ]
      },
      {
        focus: 'Emocionālais līdzsvars un robežas',
        summary: 'Šodien svarīgi sargāt savu enerģiju no liekas drāmas. Izvēlieties mierīgu darba tempu un uzticieties pārbaudītām metodēm.',
        plus: [
          { key: 'Iekšējais miers:', text: 'Koncentrēšanās uz vienu uzdevumu vienlaikus dos stabilu rezultātu.' },
          { key: 'Empātija ar mēru:', text: 'Spēsiet palīdzēt citiem, nezaudējot savu emocionālo stabilitāti.' }
        ],
        minus: [
          { key: 'Tendence uzņemties vainu:', text: 'Neuzņemieties atbildību par lietām, kas nav jūsu kontrolē.' },
          { key: 'Enerģijas kritums pēcpusdienā:', text: 'Ieplānojiet īsu pauzi bez ekrāniem dienas vidū.' }
        ]
      },
      {
        focus: 'Mērķtiecība un pašpārliecinātība',
        lotteryAlert: 'Labvēlīga finanšu nejaušību diena — pieaug varbūtība gūt negaidītu naudas laimestu loterijā vai konkursā.',
        summary: 'Diena dod papildu apņēmību aizstāvēt savas intereses. Labs brīdis sarunām par darba nosacījumiem vai ilgtermiņa plāniem.',
        plus: [
          { key: 'Spēcīga pozīcija:', text: 'Jūsu argumenti būs pamatoti un grūti apstrīdami.' },
          { key: 'Iesāktā pabeigšana:', text: 'Pietiks neatlaidības novest līdz galam pat garlaicīgus uzdevumus.' }
        ],
        minus: [
          { key: 'Stūrgalvība:', text: 'Esiet atvērti arī citu idejām, ja tās ietaupa laiku.' },
          { key: 'Spriedze plecos un sprandā:', text: 'Neaizmirstiet par fizisku izkustēšanos pēc darba.' }
        ]
      },
      {
        focus: 'Atpūta un tuvais loks',
        summary: 'Labvēlīga diena atslodzei no pienākumiem. Vislabāk jutīsieties pazīstamā vidē vai dabā, izvairoties no trokšņainiem pasākumiem.',
        plus: [
          { key: 'Spēku atjaunošana:', text: 'Mierīgs ritms un kvalitatīvs ēdiens ātri uzlabos pašsajūtu.' },
          { key: 'Sirsnīgas sarunas:', text: 'Labs laiks saturīgai kopā būšanai ar tuvākajiem cilvēkiem.' }
        ],
        minus: [
          { key: 'Nostalģija un šaubas:', text: 'Neanalizējiet vecus lēmumus — fokusējieties uz tagadni.' },
          { key: 'Pārlieka pasivitāte:', text: 'Īsa pastaiga svaigā gaisā nāks par labu vairāk nekā gulēšana dīvānā.' }
        ]
      },
      {
        focus: 'Sagatavošanās un struktūra',
        summary: 'Diena piemērota kārtības ieviešanai gan domās, gan praktiskajās lietās pirms jaunās darba nedēļas sākuma.',
        plus: [
          { key: 'Pārdomāta stratēģija:', text: 'Skaidri redzēsiet, kam veltīt uzmanību nākamajās dienās.' },
          { key: 'Mierīga vide:', text: 'Laiks sev palīdzēs sakopot domas bez ārēja spiediena.' }
        ],
        minus: [
          { key: 'Lieka trauksme par nākotni:', text: 'Koncentrējieties tikai uz rītdienas pirmo soli.' },
          { key: 'Vēlas uzkodas vai kofeīns:', text: 'Pievērsiet uzmanību mierīgam vakara režīmam.' }
        ]
      }
    ]
  });

  let memorySign = 'svari';
  function readStoredSign() {
    try {
      const val = window.localStorage.getItem('horoscope_sign');
      if (val === 'svari' || val === 'vezis') {
        memorySign = val;
      }
    } catch (_) {}
    return memorySign;
  }

  function writeStoredSign(sign) {
    if (sign !== 'svari' && sign !== 'vezis') return;
    memorySign = sign;
    try {
      window.localStorage.setItem('horoscope_sign', sign);
    } catch (_) {}
  }

  let currentSign = readStoredSign();
  let selectedDayOffset = 0;
  let variationSeed = 0;

  const headerSignTitle = document.getElementById('headerSignTitle');
  const headerSubtitle = document.getElementById('headerSubtitle');
  const weekStrip = document.getElementById('weekStrip');
  const forecastPanel = document.getElementById('forecastPanel');
  const mainContent = document.getElementById('mainContent');
  const ptrIndicator = document.getElementById('ptrIndicator');
  const refreshBtn = document.getElementById('refreshBtn');
  const navButtons = document.querySelectorAll('.nav-item');

  function getDateObj(offset) {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + offset);
    return d;
  }

  function getForecastForDay(sign, offset) {
    const d = getDateObj(offset);
    const dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
    const list = Object.prototype.hasOwnProperty.call(DATA_BANK, sign) ? DATA_BANK[sign] : DATA_BANK.svari;
    const idx = (dayOfYear + variationSeed) % list.length;
    return list[idx];
  }

  function renderWeekStrip() {
    weekStrip.replaceChildren();
    for (let i = 0; i < 7; i++) {
      const d = getDateObj(i);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'day-tab';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', i === selectedDayOffset ? 'true' : 'false');
      btn.setAttribute('aria-label', `${DAYS_FULL[d.getDay()]}, ${d.getDate()}. ${MONTHS_GEN[d.getMonth()]}`);
      btn.dataset.offset = String(i);

      const dow = document.createElement('span');
      dow.className = 'dow';
      dow.textContent = i === 0 ? 'ŠOD' : DAYS_SHORT[d.getDay()];

      const dom = document.createElement('span');
      dom.className = 'dom';
      dom.textContent = String(d.getDate());

      btn.append(dow, dom);
      btn.addEventListener('click', () => selectDay(i));
      weekStrip.appendChild(btn);
    }
  }

  function renderSkeleton() {
    forecastPanel.replaceChildren();
    const s1 = document.createElement('div');
    s1.className = 'skeleton skeleton-summary';

    const s2 = document.createElement('div');
    s2.className = 'skeleton skeleton-box';

    const s3 = document.createElement('div');
    s3.className = 'skeleton skeleton-box';

    forecastPanel.append(s1, s2, s3);
  }

  function buildLotteryAlert(alertText) {
    const aside = document.createElement('aside');
    aside.className = 'lottery-alert';
    aside.setAttribute('role', 'status');

    const iconWrap = document.createElement('div');
    iconWrap.className = 'lottery-icon-wrap';
    iconWrap.setAttribute('aria-hidden', 'true');

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z');
    svg.appendChild(path);
    iconWrap.appendChild(svg);

    const body = document.createElement('div');
    body.className = 'lottery-body';

    const title = document.createElement('div');
    title.className = 'lottery-title';
    title.textContent = 'Loterijas veiksmes indikators';

    const desc = document.createElement('p');
    desc.className = 'lottery-desc';
    desc.textContent = alertText;

    body.append(title, desc);
    aside.append(iconWrap, body);
    return aside;
  }

  function renderForecast() {
    const d = getDateObj(selectedDayOffset);
    const data = getForecastForDay(currentSign, selectedDayOffset);

    headerSignTitle.textContent = currentSign === 'svari' ? 'Svari' : 'Vēzis';
    headerSubtitle.textContent = `${d.getDate()}. ${MONTHS_GEN[d.getMonth()]} • ${DAYS_FULL[d.getDay()]}`;

    forecastPanel.replaceChildren();

    if (typeof data.lotteryAlert === 'string' && data.lotteryAlert.length > 0) {
      forecastPanel.appendChild(buildLotteryAlert(data.lotteryAlert));
    }

    const summaryCard = document.createElement('section');
    summaryCard.className = 'summary-card';

    const summaryMeta = document.createElement('div');
    summaryMeta.className = 'summary-meta';

    const datePill = document.createElement('span');
    datePill.className = 'date-pill';
    datePill.textContent = selectedDayOffset === 0 ? 'Šodien' : (selectedDayOffset === 1 ? 'Rīt' : `${d.getDate()}. ${MONTHS_GEN[d.getMonth()]}`);

    const focusTag = document.createElement('span');
    focusTag.className = 'focus-tag';
    focusTag.textContent = data.focus;

    summaryMeta.append(datePill, focusTag);

    const summaryText = document.createElement('p');
    summaryText.className = 'summary-text';
    summaryText.textContent = data.summary;

    summaryCard.append(summaryMeta, summaryText);

    const posBox = buildTonalBox('positive', '+', 'Galvenie + (Iespējas)', data.plus);
    const negBox = buildTonalBox('negative', '−', 'Galvenie − (Riski)', data.minus);

    forecastPanel.append(summaryCard, posBox, negBox);
  }

  function buildTonalBox(type, symbol, title, items) {
    const box = document.createElement('section');
    box.className = `tonal-box ${type}`;

    const header = document.createElement('div');
    header.className = 'tonal-header';

    const badge = document.createElement('span');
    badge.className = 'badge-symbol';
    badge.setAttribute('aria-hidden', 'true');
    badge.textContent = symbol;

    const heading = document.createElement('span');
    heading.textContent = title;

    header.append(badge, heading);

    const ul = document.createElement('ul');
    ul.className = 'point-list';

    items.forEach((item) => {
      const li = document.createElement('li');
      const strong = document.createElement('strong');
      strong.textContent = item.key + ' ';
      const span = document.createElement('span');
      span.textContent = item.text;
      li.append(strong, span);
      ul.appendChild(li);
    });

    box.append(header, ul);
    return box;
  }

  function selectDay(offset) {
    if (!Number.isInteger(offset) || offset < 0 || offset > 6) return;
    selectedDayOffset = offset;
    renderWeekStrip();
    renderForecast();
  }

  function selectSign(sign) {
    if ((sign !== 'svari' && sign !== 'vezis') || sign === currentSign) return;
    currentSign = sign;
    writeStoredSign(sign);
    navButtons.forEach((btn) => {
      if (btn.dataset.sign === sign) {
        btn.setAttribute('aria-current', 'page');
      } else {
        btn.removeAttribute('aria-current');
      }
    });
    renderForecast();
  }

  function triggerRefresh() {
    variationSeed = (variationSeed + 1) % 7;
    renderSkeleton();
    window.setTimeout(() => {
      renderForecast();
    }, 260);
  }

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => selectSign(btn.dataset.sign));
  });

  refreshBtn.addEventListener('click', triggerRefresh);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && selectedDayOffset < 6) {
      selectDay(selectedDayOffset + 1);
    } else if (e.key === 'ArrowLeft' && selectedDayOffset > 0) {
      selectDay(selectedDayOffset - 1);
    }
  });

  let touchStartX = 0;
  let touchStartY = 0;
  let isPulling = false;

  mainContent.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isPulling = mainContent.scrollTop === 0;
  }, { passive: true });

  mainContent.addEventListener('touchmove', (e) => {
    if (!isPulling || e.touches.length !== 1) return;
    const dy = e.touches[0].clientY - touchStartY;
    const dx = Math.abs(e.touches[0].clientX - touchStartX);
    if (dy > 20 && dy > dx) {
      ptrIndicator.style.height = `${Math.min(44, dy * 0.45)}px`;
      ptrIndicator.textContent = dy > 85 ? 'Atlaidiet, lai atjaunotu…' : 'Velciet uz leju, lai atjaunotu';
    }
  }, { passive: true });

  mainContent.addEventListener('touchend', (e) => {
    if (e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    if (ptrIndicator.style.height && ptrIndicator.style.height !== '0px') {
      ptrIndicator.style.height = '0px';
      if (isPulling && dy > 85 && Math.abs(dx) < 60) {
        triggerRefresh();
        isPulling = false;
        return;
      }
    }
    isPulling = false;

    if (touchStartX > 32 && touchStartX < window.innerWidth - 32) {
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        if (dx < 0 && selectedDayOffset < 6) {
          selectDay(selectedDayOffset + 1);
        } else if (dx > 0 && selectedDayOffset > 0) {
          selectDay(selectedDayOffset - 1);
        }
      }
    }
  }, { passive: true });

  navButtons.forEach((btn) => {
    if (btn.dataset.sign === currentSign) {
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.removeAttribute('aria-current');
    }
  });
  renderWeekStrip();
  renderForecast();
})();
