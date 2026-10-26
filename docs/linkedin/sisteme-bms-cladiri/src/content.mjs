// Copy for the LinkedIn carousel "Sisteme BMS pentru clădiri", RO and EN (v2, after review).
// Every number and claim comes from the guide /ghid/sisteme-bms-cladiri
// (components/articles/sisteme-bms-cladiri.tsx, published 16.08.2026), with its qualifiers.
// Nothing here may say more than the guide says. Ranges use "-" here; the renderer sets them as
// non-breaking en dashes.

export const META = {
  ro: {
    series: "Ghid · Sisteme BMS",
    swipe: "Glisează",
    last: "Salvează · Trimite",
    url: "sovitech.ro/ghid/sisteme-bms-cladiri",
    file: "sovitech-ghid-sisteme-bms-ro",
  },
  en: {
    series: "Guide · Building management systems",
    swipe: "Swipe",
    last: "Save · Share",
    url: "sovitech.ro/ghid/sisteme-bms-cladiri",
    file: "sovitech-guide-bms-systems-en",
  },
}

export const SLIDES = [
  {
    kind: "cover",
    tone: "dark",
    figure: { name: "flux", tag: { ro: "fig. 01 · un bms, patru surse", en: "fig. 01 · one bms, four sources" } },
    eyebrow: { ro: "Proprietari · facility manageri · directori tehnici", en: "Owners · facility managers · technical directors" },
    title: { ro: ["Un sistem BMS", "nu se cumpără."], en: ["You don’t", "buy a BMS."] },
    accent: { ro: "Se specifică.", en: "You specify it." },
    body: {
      ro: "Obligația BACS pentru clădirile nerezidențiale cu peste 290 kW pe încălzire sau pe climatizare e scadentă din 31.12.2024. Ce cere legea, cât costă și ce se scrie în caietul de sarcini ca să nu depinzi de un singur furnizor.",
      en: "Romania’s BACS obligation for non-residential buildings with over 290 kW of heating or air conditioning has been due since 31.12.2024. What the law requires, what it costs, and what to write into the specification so you are not tied to one supplier.",
    },
  },
  {
    kind: "legal",
    tone: "light",
    label: { ro: "Obligația legală", en: "Legal obligation" },
    title: { ro: ["Două praguri.", "Două regimuri juridice."], en: ["Two thresholds.", "Two legal regimes."] },
    marks: [
      {
        date: "31.12.2024", big: "290 kW", state: "due",
        ro: ["Legea 372/2005", "Termen depășit: obligația se aplică deja.", "Clădiri nerezidențiale, putere nominală utilă pe familie de sisteme (încălzire, climatizare sau combinate cu ventilare), dacă este fezabil tehnic și economic."],
        en: ["Law 372/2005 (Romania)", "Deadline passed: the obligation already applies.", "Non-residential buildings, effective rated output per system family (heating, air conditioning or combined with ventilation), where technically and economically feasible."],
      },
      {
        date: "31.12.2029", big: "70 kW", state: "future",
        ro: ["Directiva (UE) 2024/1275", "Netranspusă încă în legea română: azi nu e obligație internă.", "Termen de transpunere: 29.05.2026. Pe 15.07.2026, Comisia a trimis scrisori de punere în întârziere tuturor celor 27 de state membre."],
        en: ["Directive (EU) 2024/1275", "Not yet transposed into Romanian law: not a domestic obligation today.", "Transposition deadline: 29.05.2026. On 15.07.2026 the Commission sent letters of formal notice to all 27 member states."],
      },
    ],
    fine: {
      ro: "Legea 238/2024 a majorat amenzile din Legea 372/2005 cu până la circa 400%.",
      en: "Law 238/2024 raised the fines under Law 372/2005 by up to about 400%.",
    },
  },
  {
    kind: "verbs",
    tone: "dark",
    label: { ro: "Definiție", en: "Definition" },
    verbs: { ro: ["Măsoară.", "Comandă.", "Înregistrează."], en: ["It measures.", "It controls.", "It records."] },
    body: {
      ro: "Un sistem BMS este stratul de comandă și măsurare dintre instalațiile clădirii (încălzire, ventilare, climatizare, iluminat, pompe, contorizare) și oamenii care răspund de ele.",
      en: "A BMS is the layer of control and measurement between a building’s services (heating, ventilation, air conditioning, lighting, pumps, metering) and the people responsible for them.",
    },
    quote: {
      ro: "Fără el, fiecare echipament funcționează izolat: centrala termică știe de centrala termică, chillerul știe de chiller, iar nimeni nu știe dacă amândouă merg simultan într-o zi de aprilie.",
      en: "Without it, each piece of plant runs in isolation: the boiler only knows the boiler, the chiller only knows the chiller, and nobody knows whether both are running at once on an April day.",
    },
    note: {
      ro: "În lege se numește BACS, sisteme de automatizare și control al clădirilor: același obiect tehnic. A nu se confunda cu celălalt BMS, Battery Management System.",
      en: "In law it is BACS, building automation and control systems: the same technical object. Not to be confused with the other BMS, battery management system.",
    },
  },
  {
    kind: "levels",
    tone: "light",
    label: { ro: "Arhitectură", en: "Architecture" },
    title: { ro: ["Trei niveluri.", "Fiecare cu riscul lui de cost."], en: ["Three levels.", "Each with its own cost risk."] },
    figure: { name: "niveluri", tag: { ro: "fig. 02 · niveluri", en: "fig. 02 · levels" } },
    levels: [
      { k: { ro: "Supervizare", en: "Supervision" }, what: { ro: "Server, stație de operare (HMI), licențe.", en: "Server, operator station (HMI), licences." }, check: { ro: "Licențele sunt cel mai des uitat capitol de buget.", en: "Licences are the most often forgotten budget line." } },
      { k: { ro: "Automatizare", en: "Automation" }, what: { ro: "Controlere DDC și tabloul de automatizare.", en: "DDC controllers and the automation panel." }, check: { ro: "Rezervă liberă de puncte: minimum 15-20%.", en: "Spare point capacity: at least 15-20%." } },
      { k: { ro: "Câmp", en: "Field" }, what: { ro: "Senzori, servomotoare, vane, contoare.", en: "Sensors, actuators, valves, meters." }, check: { ro: "Senzorii de CO₂ se decalibrează în 2-3 ani.", en: "CO₂ sensors drift out of calibration in 2-3 years." } },
    ],
  },
  {
    kind: "list",
    tone: "dark",
    label: { ro: "Noțiuni", en: "Concepts" },
    title: { ro: ["Cinci noțiuni.", "Cheia oricărui caiet de sarcini."], en: ["Five concepts.", "The key to any specification."] },
    items: [
      { k: { ro: "Punctul de date", en: "Data point" }, v: { ro: "O valoare cu adresă. Unitatea de măsură a unui proiect BMS.", en: "A value with an address. The unit of measure of a BMS project." } },
      { k: { ro: "Bucla de reglare", en: "Control loop" }, v: { ro: "Măsoară, compară cu consemnul, acționează. Acordarea decide dacă instalația e stabilă.", en: "Measure, compare with the setpoint, act. Tuning decides whether the plant is stable." } },
      { k: { ro: "Secvența de funcționare", en: "Sequence of operation" }, v: { ro: "Comportamentul echipamentului în toate stările. Cel mai important document, cel mai des absent.", en: "How the plant behaves in every state. The most important document, and the most often missing." } },
      { k: { ro: "Programul orar", en: "Schedule" }, v: { ro: "Calendarul de funcționare. Cea mai ieftină economie dintr-o clădire.", en: "The operating calendar. The cheapest saving in a building." } },
      { k: { ro: "Interblocarea", en: "Interlock" }, v: { ro: "Condiția care nu se negociază: ventilatorul nu pornește fără clapeta de aer deschisă.", en: "A non-negotiable condition: the fan does not start until the damper is open." } },
    ],
  },
  {
    kind: "protocols",
    tone: "light",
    label: { ro: "Protocoale", en: "Protocols" },
    title: { ro: ["Șase protocoale.", "O decizie comercială pe zece ani."], en: ["Six protocols.", "A ten-year commercial decision."] },
    figure: { name: "tablou", pick: "bacnet", callout: "BACnet", tag: { ro: "fig. 03 · tabloul de automatizare", en: "fig. 03 · the automation panel" } },
    rows: [
      { k: "BACnet", ro: "Magistrala principală: controlere, CTA, chillere", en: "The backbone: controllers, AHUs, chillers" },
      { k: "Modbus", ro: "Echipamente terțe: chillere, UPS, analizoare de rețea", en: "Third-party equipment: chillers, UPS, power analysers" },
      { k: "KNX", ro: "Iluminat, jaluzele, comandă în cameră", en: "Lighting, blinds, room control" },
      { k: "DALI", ro: "Corpuri de iluminat adresabile", en: "Addressable luminaires" },
      { k: "M-Bus", ro: "Contoare de energie termică, apă, gaz", en: "Heat, water and gas meters" },
      { k: "LON", ro: "În declin; frecvent în clădirile echipate în 2000-2015", en: "Declining; common in buildings fitted out 2000-2015" },
    ],
  },
  {
    kind: "closed",
    tone: "dark",
    label: { ro: "Deschidere", en: "Openness" },
    title: { ro: ["Un sistem închis", "arată bine în primul an."], en: ["A closed system", "looks fine in year one."] },
    body: {
      ro: "Problema se vede în anul cinci, când proprietarul vrea să adauge 40 de puncte pentru un etaj reamenajat și primește o singură ofertă.",
      en: "It shows in year five, when the owner wants 40 more points for a refitted floor and gets a single quote.",
    },
    years: { ro: "an", en: "yr" },
    mark: { ro: "40 de puncte noi · o singură ofertă", en: "40 new points · one quote" },
    formulaTitle: { ro: "Minimul de cerut în caietul de sarcini", en: "The minimum to write into the specification" },
    formula: {
      ro: ["Comunicație nativă BACnet/IP la nivel de automatizare", "Integrare Modbus pentru echipamentele terțe", "Predarea completă a hărților de puncte și a proiectului software", "Licențe pe numele beneficiarului"],
      en: ["Native BACnet/IP at automation level", "Modbus integration for third-party equipment", "Full handover of point maps and the software project", "Licences in the client’s name"],
    },
  },
  {
    kind: "numbers",
    tone: "light",
    label: { ro: "Rezultate", en: "Results" },
    title: { ro: ["Ce poate produce", "un BMS pus corect în funcțiune."], en: ["What a BMS can deliver", "when properly commissioned."] },
    numbers: [
      { n: "10-20%", ro: "reducere a consumului HVAC, estimativ", en: "less HVAC energy use, estimated" },
      { n: "5-15%", ro: "reducere a consumului total, pe facturi normalizate", en: "less total energy use, on normalised bills" },
      { n: "15-30%", ro: "mai puține intervenții neplanificate, în doi ani de operare disciplinată", en: "fewer unplanned call-outs over two years of disciplined operation" },
      { n: "15 min", ro: "pasul istoricului de temperatură pe zonă: orice reclamație devine verificabilă", en: "trend-log interval per zone: every comfort complaint can be checked" },
      { n: "1-3 ani", nEn: "1-3 years", ro: "amortizare, de regulă, la optimizări cu cost mic ale unui sistem existent", en: "typical payback for low-cost optimisation of an existing system" },
      { n: "3-6 ani", nEn: "3-6 years", ro: "amortizare la o modernizare BACS de capital", en: "payback for a capital BACS upgrade" },
    ],
    note: {
      ro: "Estimări din proiecte executate, intervale din piață și literatură; cifrele de energie, pentru o clădire fără automatizare coordonată. Rezultatul depinde de punctul de plecare.",
      en: "Estimates from delivered projects, market ranges and literature; the energy figures assume a building without coordinated automation. Results depend on the starting point.",
    },
  },
  {
    kind: "cost",
    tone: "dark",
    label: { ro: "Cost", en: "Cost" },
    title: { ro: ["Cât costă.", "Și ce lipsește din buget."], en: ["What it costs.", "And what budgets leave out."] },
    numbers: [
      { n: "9-18", unit: "EUR/mp", unitEn: "EUR/m²", ro: "birouri clasa A", en: "class A offices" },
      { n: "5-10", unit: "EUR/mp", unitEn: "EUR/m²", ro: "birouri clasa B", en: "class B offices" },
      { n: "90-320", unit: "EUR", ro: "pe punct de date, reperul alternativ", en: "per data point, the alternative benchmark" },
      { n: "4-12%", ro: "mentenanță anuală din investiție: 4-7% de bază, 7-12% extinsă", en: "of the investment a year for maintenance: 4-7% basic, 7-12% extended" },
      { n: "8-18%", ro: "licențe anuale, din valoarea componentei software", en: "of the software value a year in licence fees" },
    ],
    missing: {
      k: { ro: "Se uită din buget", en: "Left out of budgets" },
      v: { ro: "Licențele de supervizare, integrarea sistemelor terțe, punerea în funcțiune, documentația as-built.", en: "Supervision licences, third-party integration, commissioning, as-built documentation." },
    },
    note: {
      ro: "Fără TVA. Orientativ, nu ofertă. Intervalele EUR/mp includ echipamente, execuție și punere în funcțiune.",
      en: "Excluding VAT. Indicative, not a quote. The EUR/m² ranges cover equipment, installation and commissioning.",
    },
  },
  {
    kind: "cards",
    tone: "light",
    label: { ro: "Greșeli", en: "Mistakes" },
    title: { ro: ["Opt greșeli", "care se repetă."], en: ["Eight mistakes", "that keep coming back."] },
    items: {
      ro: ["Caiet de sarcini copiat de la alt proiect", "Sistem dimensionat fix, fără rezervă", "Punere în funcțiune tăiată din buget", "Alarme necalibrate: la 400 pe zi, după două săptămâni sunt ignorate toate", "Contoare montate fără comunicație", "Sistem închis, acceptat fără să se observe", "Documentație as-built lipsă sau formală", "Nimeni din organizație nu răspunde de sistem"],
      en: ["A specification copied from another project", "A system sized to the last point, with no spare", "Commissioning cut from the budget", "Poorly configured alarms: at 400 a day, all ignored within two weeks", "Meters installed without communication", "A closed system, accepted without anyone noticing", "Missing or token as-built documentation", "Nobody in the organisation responsible for the system"],
    },
    highlight: 2,
    tag: { ro: "cea mai scumpă", en: "the most expensive" },
    note: {
      ro: "Un sistem instalat, dar nereglat, consumă la fel ca lipsa lui. Iar unul acordat în august nu e acordat pentru ianuarie.",
      en: "A system installed but never tuned uses as much as no system at all. And one tuned in August is not tuned for January.",
    },
  },
  {
    kind: "numbered",
    tone: "dark",
    label: { ro: "Înainte de semnare", en: "Before signing" },
    title: { ro: ["Zece întrebări", "pentru integrator, cu răspuns în scris."], en: ["Ten questions", "for the integrator, answered in writing."] },
    items: {
      ro: ["Ce protocoale sunt native și ce trece prin gateway?", "Cui aparțin licențele și cât costă încă 200 de puncte peste cinci ani?", "Se predă proiectul software editabil, cu copii de siguranță?", "Cine scrie secvențele de funcționare și când pot fi văzute?", "Câte ore de punere în funcțiune sunt incluse și ce se testează?", "Ce rezervă de puncte are arhitectura propusă?", "Cine răspunde la 2 noaptea, în cât timp și ce scrie în contract?", "Trei clădiri similare, puse în funcțiune de echipa propusă, nu doar de firmă?", "Ce se întâmplă dacă furnizorul dispare?", "Cine are acces de la distanță și cum?"],
      en: ["Which protocols are native, and what goes through a gateway?", "Who owns the licences, and what do 200 more points cost in year five?", "Is the software project handed over editable, with backups?", "Who writes the sequences of operation, and when can they be seen?", "How many commissioning hours are included, and what is tested?", "How much spare point capacity does the design have?", "Who answers at 2 a.m., how fast, and what does the contract say?", "Three similar buildings commissioned by the proposed team, not just the company?", "What happens if the supplier disappears?", "Who has remote access, and how?"],
    },
    note: { ro: "Salvează lista. Sub 15% rezervă de puncte: modificări plătite din primul an.", en: "Save this list. Under 15% spare points: paid changes from year one." },
  },
  {
    kind: "roles",
    tone: "light",
    label: { ro: "Pe roluri", en: "By role" },
    title: { ro: ["Ce înseamnă", "pentru fiecare rol."], en: ["What it means", "for each role."] },
    roles: [
      { k: { ro: "Proprietar și investitor", en: "Owner and investor" }, v: { ro: "Mai puțin risc de reglementare, valoarea activului protejată. Prima întrebare internă: ce putere nominală e instalată în portofoliu?", en: "Lower regulatory risk, a protected asset value. First internal question: what rated output is installed across the portfolio?" } },
      { k: { ro: "Facility manager", en: "Facility manager" }, v: { ro: "Câștigul imediat vine din exploatarea corectă: programe orare reale, alarme curățate, bucle reacordate, puncte defecte reparate.", en: "The quick win is running it properly: real schedules, cleaned-up alarms, retuned loops, failed points fixed." } },
      { k: { ro: "Director tehnic", en: "Technical director" }, v: { ro: "Câștigul e în caietul de sarcini: comunicație nativă deschisă, proiectul software predat, licențe pe numele beneficiarului, cu preț de extindere fixat din start.", en: "The win is in the specification: native open protocols, the software project handed over, licences in the client’s name, with the expansion price fixed upfront." } },
    ],
    note: { ro: "Trimite slide-ul colegului din rolul potrivit.", en: "Send this to the colleague in the right role." },
  },
  {
    kind: "cta",
    tone: "dark",
    figure: { name: "flux", pick: "bms", tag: { ro: "fig. 04 · totul în bms", en: "fig. 04 · all into the bms" } },
    title: { ro: ["Un BMS nu se cumpără,"], en: ["You don’t buy a BMS."] },
    accent: { ro: "se specifică.", en: "You specify it." },
    body: {
      ro: "Clădirile care funcționează bine sunt cele în care lista de puncte și secvențele de funcționare au fost scrise înainte de prima cerere de ofertă.",
      en: "The buildings that run well are the ones where the point list and the sequences of operation were written before the project went out to tender.",
    },
    ctaTitle: { ro: "Ghidul complet", en: "The full guide (in Romanian)" },
    ctaSub: {
      ro: "Modelul editabil de caiet de sarcini BMS (lista de puncte, secvențele, clauzele de protocol și licențiere, criteriile de recepție) se cere la sovitech.ro/contact.",
      en: "The editable BMS specification template (point list, sequences, protocol and licensing clauses, acceptance criteria) is available on request at sovitech.ro/contact.",
    },
  },
]
