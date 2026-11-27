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

  // Only 3 items per sign per day: Darbs, Veselība, Nauda + optional lotteryAlert on favorable days
  const DATA_BANK = deepFreeze({
    svari: [
      {
        darbs: 'Piemērots brīdis pārrunām, dokumentu sakārtošanai un skaidru prioritāšu noteikšanai. Izvairieties no svešu pienākumu uzņemšanās.',
        veseliba: 'Stabils enerģijas līmenis, taču vakarpusē nepieciešama mierīga atslodze bez ekrāniem un liekas steigas.',
        nauda: 'Finanšu situācija prognozējama. Labvēlīgs laiks rēķinu pārskatīšanai un budžeta plānošanai bez spontāniem pirkumiem.'
      },
      {
        lotteryAlert: 'Paaugstināta finanšu veiksmes varbūtība — labvēlīgs brīdis nelielai loterijas biļetei vai izlozei ar iepriekš noteiktu budžeta limitu.',
        darbs: 'Praktiska darba diena, kurā izdosies pabeigt ieilgušus uzdevumus un vienoties par izdevīgiem nosacījumiem.',
        veseliba: 'Pievērsiet uzmanību stājai un regulārām kustību pauzēm, ja diena paiet sēdošā darbā.',
        nauda: 'Racionāls skatījums palīdzēs ietaupīt un pamanīt jaunu iespēju papildu ienākumiem.'
      },
      {
        darbs: 'Augsta koncentrēšanās spēja ļaus ātri apstrādāt informāciju. Strādājiet pie viena uzdevuma vienlaikus, lai nepieļautu kļūdas sīkumos.',
        veseliba: 'Laba pašsajūta, ja ievērosiet regulāras ēdienreizes un pietiekamu ūdens uzņemšanu.',
        nauda: 'Atturieties no aizdevumiem un nepārdomātiem tiešsaistes pirkumiem dienas otrajā pusē.'
      },
      {
        darbs: 'Mierīga sadarbība ar kolēģiem vai partneriem nesīs labāku rezultātu nekā mēģinājumi visu izdarīt vienatnē.',
        veseliba: 'Iespējams neliels nogurums pēcpusdienā — īsa pastaiga svaigā gaisā ātri atjaunos tonusu.',
        nauda: 'Mēreni izdevumi; piemērots brīdis salīdzināt cenas pirms lielākiem sadzīves pirkumiem.'
      },
      {
        lotteryAlert: 'Labvēlīgs negaidītu ieguvumu fons — ja plānojāt piedalīties skaitļu izlozē vai momentloterijā, šodien ir piemērotākais brīdis.',
        darbs: 'Jūsu iniciatīva un mierīgā pieeja tiks novērtēta. Laba diena svarīgu sarunu noslēgšanai.',
        veseliba: 'Labs fiziskais un mentālais līdzsvars; piemērots laiks mērenai fiziskai slodzei.',
        nauda: 'Finansiāli veiksmīga diena — iespējams negaidīts ieguvums, prēmija vai izdevīgs darījums.'
      },
      {
        darbs: 'Piemērota diena ikdienas kārtības ieviešanai un nākamās nedēļas uzdevumu strukturēšanai bez pārslodzes.',
        veseliba: 'Veltiet laiku kvalitatīvam miegam un atpūtai, lai atjaunotu nervu sistēmas resursus.',
        nauda: 'Finanšu jomā miers un stabilitāte; nav ieteicams riskēt ar lielām summām.'
      },
      {
        darbs: 'Labs brīdis ideju pārskatīšanai un stratēģiskai plānošanai, saglabājot distanci no ikdienas steigas.',
        veseliba: 'Ievērojiet mērenību uzturā un laicīgu gulētiešanu, lai jaunā nedēļa sāktos ar pilnu jaudu.',
        nauda: 'Pārskatiet regulāros maksājumus un abonementus — atradīsiet veidu, kā optimizēt izdevumus.'
      }
    ],
    vezis: [
      {
        lotteryAlert: 'Spēcīga skaitļu un sakritību intuīcija — šodien ir paaugstināta neliela naudas laimesta vai veiksmīgas izlozes varbūtība.',
        darbs: 'Spēcīga intuīcija palīdzēs precīzi novērtēt situāciju sarunās. Lieliska spēja koncentrēties un novest darbus līdz galam.',
        veseliba: 'Stabils enerģijas līmenis; saglabājiet mierīgu ritmu un neuzņemieties citu cilvēku stresu.',
        nauda: 'Labvēlīga diena finanšu lēmumiem, uzkrājumu papildināšanai un nelielai dalībai loterijā.'
      },
      {
        darbs: 'Diena prasa kārtību un skaidrus noteikumus. Vislabāko gandarījumu sniegs praktiski, taustāmi rezultāti.',
        veseliba: 'Pievērsiet uzmanību gremošanas sistēmai un izvēlieties vieglu, sabalansētu uzturu.',
        nauda: 'Finanšu disciplīna atmaksāsies — izdosies izvairīties no liekiem tēriņiem.'
      },
      {
        darbs: 'Aktīva diena ar daudzām ziņām un sarunām. Balstieties uz pārbaudītiem faktiem un saglabājiet vēsu prātu.',
        veseliba: 'Pēcpusdienā ieteicama īsa pauze no datora vai telefona ekrāna acu un prāta atpūtai.',
        nauda: 'Iespējami nelieli neplānoti sadzīves izdevumi, kas gan neietekmēs kopējo budžeta stabilitāti.'
      },
      {
        darbs: 'Koncentrēšanās uz vienu galveno uzdevumu dos stabilu rezultātu. Neuzņemieties atbildību par lietām ārpus jūsu kontroles.',
        veseliba: 'Labs laiks mierīgai fiziskai aktivitātei vai pastaigai dabā spriedzes mazināšanai.',
        nauda: 'Piemērots brīdis ilgtermiņa finanšu mērķu pārskatīšanai, bet ne steidzīgiem ieguldījumiem.'
      },
      {
        lotteryAlert: 'Labvēlīga finanšu nejaušību diena — pieaug varbūtība gūt negaidītu naudas laimestu loterijā vai konkursā.',
        darbs: 'Paaugstināta apņēmība ļaus veiksmīgi aizstāvēt savas intereses un pabeigt sarežģītus projektus.',
        veseliba: 'Pēc darba pievērsiet uzmanību plecu un sprandas zonas atslābināšanai.',
        nauda: 'Pozitīva finanšu dinamika — iespējams papildu ienākums vai veiksmīgs laimests.'
      },
      {
        darbs: 'Mierīgāks darba temps ļaus sakārtot uzkrājušos sīkumus un sagatavoties nākamajam posmam.',
        veseliba: 'Kvalitatīva atpūta un sabalansēts miega režīms ātri uzlabos pašsajūtu.',
        nauda: 'Stabils finanšu fons; piemērots laiks praktiskiem pirkumiem mājoklim.'
      },
      {
        darbs: 'Laba diena nākamās nedēļas plāna sastādīšanai un prioritāšu sakārtošanai bez ārēja spiediena.',
        veseliba: 'Ierobežojiet kofeīnu vakarpusē, lai nodrošinātu dziļu un atjaunojošu miegu.',
        nauda: 'Budžets kontrolē; pieturieties pie iepriekš izstrādātā tēriņu plāna.'
      }
    ]
  });

  const SVG_ICONS = Object.freeze({
    darbs: 'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z',
    veseliba: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    nauda: 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z',
    lottery: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z'
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

  const headerSignTitle = document.getElementById('headerSignTitle');
  const headerSubtitle = document.getElementById('headerSubtitle');
  const weekStrip = document.getElementById('weekStrip');
  const forecastPanel = document.getElementById('forecastPanel');
  const mainContent = document.getElementById('mainContent');
  const navButtons = document.querySelectorAll('.nav-item');

  function getDateObj(offset) {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + offset);
    return d;
  }

  // Strictly deterministic by calendar date — never changes on page refresh
  function getForecastForDay(sign, offset) {
    const d = getDateObj(offset);
    const epochDay = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
    const list = Object.prototype.hasOwnProperty.call(DATA_BANK, sign) ? DATA_BANK[sign] : DATA_BANK.svari;
    const idx = ((epochDay % list.length) + list.length) % list.length;
    return list[idx];
  }

  function createSvgIcon(pathData) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', pathData);
    svg.appendChild(path);
    return svg;
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

  function buildLotteryAlert(alertText) {
    const aside = document.createElement('aside');
    aside.className = 'lottery-alert';
    aside.setAttribute('role', 'status');

    const iconWrap = document.createElement('div');
    iconWrap.className = 'lottery-icon-wrap';
    iconWrap.appendChild(createSvgIcon(SVG_ICONS.lottery));

    const body = document.createElement('div');
    body.className = 'lottery-body';

    const title = document.createElement('div');
    title.className = 'lottery-title';
    title.textContent = 'Paaugstināta loteriju laimestu varbūtība';

    const desc = document.createElement('p');
    desc.className = 'lottery-desc';
    desc.textContent = alertText;

    body.append(title, desc);
    aside.append(iconWrap, body);
    return aside;
  }

  function buildDomainCard(titleText, bodyText, iconPath) {
    const section = document.createElement('section');
    section.className = 'domain-card';

    const header = document.createElement('div');
    header.className = 'domain-header';

    const iconBox = document.createElement('span');
    iconBox.className = 'domain-icon';
    iconBox.appendChild(createSvgIcon(iconPath));

    const h2 = document.createElement('h2');
    h2.className = 'domain-title';
    h2.textContent = titleText;

    header.append(iconBox, h2);

    const p = document.createElement('p');
    p.className = 'domain-text';
    p.textContent = bodyText;

    section.append(header, p);
    return section;
  }

  function renderForecast() {
    const d = getDateObj(selectedDayOffset);
    const data = getForecastForDay(currentSign, selectedDayOffset);

    headerSignTitle.textContent = currentSign === 'svari' ? 'Svari' : 'Vēzis';
    const dayLabel = selectedDayOffset === 0 ? 'Šodien' : (selectedDayOffset === 1 ? 'Rīt' : DAYS_FULL[d.getDay()]);
    headerSubtitle.textContent = `${dayLabel}, ${d.getDate()}. ${MONTHS_GEN[d.getMonth()]}`;

    forecastPanel.replaceChildren();

    // Conditional warning only on days with increased lottery win probability
    if (typeof data.lotteryAlert === 'string' && data.lotteryAlert.length > 0) {
      forecastPanel.appendChild(buildLotteryAlert(data.lotteryAlert));
    }

    // Strictly 3 items: Darbs, Veselība, Nauda
    forecastPanel.append(
      buildDomainCard('Darbs', data.darbs, SVG_ICONS.darbs),
      buildDomainCard('Veselība', data.veseliba, SVG_ICONS.veseliba),
      buildDomainCard('Nauda', data.nauda, SVG_ICONS.nauda)
    );
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

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => selectSign(btn.dataset.sign));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && selectedDayOffset < 6) {
      selectDay(selectedDayOffset + 1);
    } else if (e.key === 'ArrowLeft' && selectedDayOffset > 0) {
      selectDay(selectedDayOffset - 1);
    }
  });

  let touchStartX = 0;
  let touchStartY = 0;

  mainContent.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  mainContent.addEventListener('touchend', (e) => {
    if (e.changedTouches.length !== 1) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

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
