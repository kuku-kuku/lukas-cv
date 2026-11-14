// Explicit extension: this module is also imported by plain Node (the
// router config and scripts/build-sitemap.mjs), which does not guess one.
import { CARE, HOURLY, PACKAGES } from "./content.js";

/**
 * SERVICE PAGES - one page per search intent the home page cannot carry.
 *
 * The home page owns "svetainių kūrimas verslui" (a new website). Each page
 * here owns one different problem a client searches for, so no two pages
 * compete for the same query:
 *
 *   /elektroniniu-parduotuviu-kurimas   an online shop
 *   /svetainiu-atnaujinimas             an existing site that is old, slow
 *                                       or not found on Google
 *   /svetainiu-prieziura                looking after a site after launch
 *   /individualus-programavimas         systems, integrations, automation
 *
 * Lithuanian only. The market is Lithuania; an English copy of each page
 * would be a translation nobody searches for, so these routes declare no
 * hreflang (see buildMeta's `translated: false`).
 *
 * Rules for this file, the same as for content.js:
 *  - Prices are read from PACKAGES / CARE / HOURLY, never typed here.
 *  - Nothing is claimed that cannot be checked: no results, no client
 *    quotes, no numbers that were not measured. Project mentions name what
 *    was built and nothing more.
 *  - Plain hyphens only (scripts/check-dashes.mjs fails the build otherwise).
 *
 * Shape of a block in `sections`:
 *   { h, p: [paragraphs], list: [items], after: [paragraphs] }
 */

const pkg = (id) => PACKAGES.find((p) => p.id === id);
const eur = (n) => `${n.toLocaleString("lt-LT").replace(/\s/g, " ")} €`;
const care = (id) => CARE.find((c) => c.id === id);

export const SERVICE_PAGES = [
  {
    slug: "elektroniniu-parduotuviu-kurimas",
    nav: "El. parduotuvės",
    title: "Elektroninių parduotuvių kūrimas verslui | Beneta",
    description: `El. parduotuvės kūrimas nuo ${eur(pkg("custom").price)}: prekės, krepšelis, apmokėjimas ir pristatymas. Prekes ir kainas tvarkote patys. Fiksuota kaina iš anksto.`,
    serviceType: "E-commerce development",
    serviceName: "Elektroninių parduotuvių kūrimas",
    priceFrom: pkg("custom").price,
    eyebrow: "El. parduotuvės",
    h1: "Elektroninės parduotuvės kūrimas",
    lede:
      "Norite pardavinėti internetu, bet nežinote, nuo ko pradėti? Sukuriu el. parduotuvę, kurioje prekes, kainas ir užsakymus tvarkote patys, o pirkėjas nuo prekės iki apmokėjimo nueina be klaidžiojimo.",
    sections: [
      {
        h: "Kam tinka",
        p: [
          "Parduotuvei, kuri jau prekiauja vietoje ir nori pardavinėti internetu. Studijai ar gamintojui, kuriam užsakymai dabar ateina per Facebook žinutes ir telefoną. Verslui, kurio dabartinė parduotuvė lėta, nepatogi telefone arba ją sunku tvarkyti.",
          "Jei prekių turite kelias ir jos retai keičiasi, kartais pakanka paprastos svetainės su užsakymo forma. Tai pasakysiu per pirmą pokalbį - nėra prasmės mokėti už parduotuvę, kurios jums nereikia.",
        ],
      },
      {
        h: "Kas įeina",
        list: [
          "Prekių katalogas su kategorijomis, nuotraukomis ir variantais (dydis, spalva ir pan.)",
          "Krepšelis ir aiškus atsiskaitymas be nereikalingų žingsnių",
          "Apmokėjimas internetu per jūsų pasirinktą mokėjimų tiekėją",
          "Pristatymo būdai, kuriuos naudojate: kurjeris, paštomatai ar atsiėmimas vietoje",
          "Užsakymų patvirtinimai pirkėjui ir jums el. paštu",
          "Pritaikymas telefonams - dauguma pirkėjų užsako būtent iš jų",
          "Pagrindai, kad prekes ir kategorijas rastų Google",
          "Mėnuo nemokamų pataisymų po paleidimo",
          "Parduotuvė, domenas ir visi failai priklauso jums",
        ],
      },
      {
        h: "WooCommerce ar Shopify?",
        p: [
          "Dirbu su abiem, ir renkuosi pagal jūsų situaciją, o ne pagal įprotį.",
        ],
        list: [
          "WooCommerce (WordPress) - parduotuvė veikia jūsų talpinimo serveryje, mėnesinio platformos mokesčio nėra, galima pritaikyti beveik bet kokiam poreikiui. Reikia priežiūros: atnaujinimų ir atsarginių kopijų.",
          "Shopify - platforma pati rūpinasi serveriais ir saugumu, todėl priežiūros mažiau. Už tai mokate mėnesinį Shopify mokestį, o kai kurias funkcijas tenka pirkti kaip papildinius.",
        ],
        after: [
          "Jei abejojate - per pokalbį palyginsime, kiek kiekvienas variantas kainuotų per metus, ne tik paleidimo dieną.",
        ],
      },
      {
        h: "Kiek kainuoja el. parduotuvė",
        p: [
          `El. parduotuvės kūrimas - nuo ${eur(pkg("custom").price)} (be PVM). Galutinė kaina priklauso nuo prekių kiekio, kiek jų reikia suvesti, kokių apmokėjimo ir pristatymo būdų reikia ir ar parduotuvę reikia jungti su apskaitos ar sandėlio programa.`,
          `Kainą ir terminą gaunate raštu prieš pradedant darbus. Po paleidimo priežiūra pasirinktinai - nuo ${eur(care("calm").price)} per mėnesį. Shopify ar mokėjimų tiekėjo mokesčius mokate tiesiogiai jiems.`,
        ],
      },
    ],
    evidence: [
      {
        project: "flore",
        text: "Gėlių studijos svetainė su el. parduotuve: autorinės puokštės, vazoniniai augalai ir pristatymas tą pačią dieną. Sukurta su WordPress ir WooCommerce.",
      },
    ],
    faq: [
      {
        q: "Ar galėsiu pats pridėti prekes ir keisti kainas?",
        a: "Taip. Prekes, kainas, nuotraukas ir likučius tvarkote patys per administravimo skydą. Paleidimo metu parodau, kaip tai daroma, ir palieku trumpą paaiškinimą.",
      },
      {
        q: "Per kiek laiko sukuriama el. parduotuvė?",
        a: "Tai priklauso nuo apimties: prekių kiekio, integracijų ir to, ar tekstai bei nuotraukos jau paruošti. Konkretų terminą įrašau į pasiūlymą, o kūrimo metu kas savaitę matote veikiančią versiją.",
      },
      {
        q: "Kiek kainuoja el. parduotuvės sukūrimas?",
        a: `Nuo ${eur(pkg("custom").price)} be PVM. Tikslią kainą pasakau po nemokamo pokalbio, kai žinau, kiek prekių, kokie apmokėjimo ir pristatymo būdai bei ar reikia jungtis su kitomis programomis.`,
      },
      {
        q: "Ar parduotuvė bus patogi telefone?",
        a: "Taip. Parduotuvę kuriu pirmiausia telefonui: katalogą, krepšelį ir apmokėjimą tikrinu telefone dar prieš paleidimą.",
      },
    ],
    related: ["svetainiu-prieziura", "individualus-programavimas"],
    topic: "shop",
  },

  {
    slug: "svetainiu-atnaujinimas",
    nav: "Svetainės atnaujinimas",
    title: "Svetainės atnaujinimas ir pagreitinimas | Beneta",
    description: `Sena, lėta ar Google nerandama svetainė? Įvertinu, ką verta taisyti, o ką kurti iš naujo. Smulkūs darbai ${HOURLY} €/val., nauja svetainė nuo ${eur(pkg("onepage").price)}.`,
    serviceType: "Website redesign",
    serviceName: "Svetainių atnaujinimas ir modernizavimas",
    priceFrom: HOURLY,
    priceUnit: "HUR",
    eyebrow: "Atnaujinimas",
    h1: "Svetainės atnaujinimas ir pagreitinimas",
    lede:
      "Svetainė atrodo pasenusi, telefone ilgai kraunasi arba klientai jūsų neranda Google? Ne visada reikia viską kurti iš naujo. Pirmiausia pažiūriu, kas iš tikrųjų trukdo, ir pasakau, ką verta taisyti, o ką geriau perdaryti.",
    sections: [
      {
        h: "Ženklai, kad svetainę laikas atnaujinti",
        list: [
          "Telefone tekstas per smulkus, o mygtukus sunku paspausti",
          "Puslapis atsidaro ilgiau nei per kelias sekundes",
          "Svetainėje parašyta ne tai, ką dabar darote, o pakeisti tekstą galite tik per kūrėją",
          "Google rodo seną informaciją arba jūsų svetainės nerodo visai",
          "Užklausos iš formos kartais nepasiekia el. pašto, ir niekas to nepastebi",
          "Svetainė veikia sename WordPress ar papildiniuose, kurių niekas neatnaujina",
        ],
      },
      {
        h: "Atnaujinti ar kurti iš naujo?",
        p: [
          "Jei svetainės pagrindas tvarkingas, dažnai užtenka sutvarkyti tai, kas trukdo: suspausti nuotraukas, išmesti nereikalingus papildinius, pataisyti mobilų vaizdą ir tekstus. Tai greičiau ir pigiau.",
          "Jei svetainė pastatyta ant pasenusio šablono, kurio negalima saugiai atnaujinti, arba kiekvienas pakeitimas ką nors sugadina, lopyti brangiau nei sukurti iš naujo. Tokiu atveju tai pasakau tiesiai ir paaiškinu kodėl.",
        ],
      },
      {
        h: "Kodėl svetainė lėta",
        p: [
          "Dažniausios priežastys paprastos: per didelės nuotraukos, dešimtys papildinių, kurių niekas nenaudoja, sunkūs šriftai ir trečiųjų šalių skriptai, kraunami dar prieš turinį. Greitį matuoju Google Lighthouse ir PageSpeed Insights - prieš darbus ir po jų, kad matytumėte skirtumą skaičiais, o ne žodžiais.",
          "Matuoju telefono režimu, ne tik kompiuterio: telefone rezultatai beveik visada prastesni, o Google svetainę vertina būtent pagal mobilią versiją.",
        ],
      },
      {
        h: "Kodėl svetainės neranda Google",
        p: ["Dažniausiai kaltas ne vienas dalykas, o keli kartu:"],
        list: [
          "puslapis netyčia uždarytas paieškos sistemoms (robots.txt ar noindex žyma, likusi nuo kūrimo laikų);",
          "visos paslaugos sudėtos viename puslapyje, todėl Google nežino, kurį rodyti konkrečiai paieškai;",
          "neužpildyti puslapių pavadinimai ir aprašymai, kuriuos Google rodo paieškos rezultatuose;",
          "turinys atsiranda tik suveikus JavaScript, todėl paieškos robotas mato tuščią puslapį;",
          "svetainė lėta telefone, o Google vertina būtent mobilią versiją;",
          "svetainė neprijungta prie Google Search Console, todėl niekas nemato klaidų.",
        ],
        after: [
          "Visa tai sutvarkoma techniškai, ir tai darau. Kaip aukštai pakilsite, priklauso ir nuo konkurencijos bei turinio, todėl pozicijų negarantuoju - to sąžiningai negali garantuoti niekas.",
        ],
      },
      {
        h: "Kaip vyksta atnaujinimas",
        list: [
          "Peržiūriu dabartinę svetainę ir pamatuoju greitį. Pasakau, ką rodo matavimai ir ką siūlau daryti.",
          "Gaunate pasiūlymą raštu: kas bus padaryta, kiek kainuos ir kada.",
          "Dirbu atskiroje kopijoje, todėl dabartinė svetainė veikia iki pat paleidimo.",
          "Jei keičiasi puslapių adresai, senus nukreipiu į naujus, kad neprarastumėte to, ką Google jau žino.",
          "Po paleidimo pamatuoju dar kartą ir parodau, kas pasikeitė.",
        ],
      },
      {
        h: "Kiek kainuoja svetainės atnaujinimas",
        p: [
          `Smulkūs pataisymai ir pagreitinimas - ${HOURLY} €/val., o sąmatą valandomis gaunate prieš pradedant. Jei svetainę verta kurti iš naujo, galioja tie patys paketai kaip naujai svetainei: vieno puslapio svetainė nuo ${eur(pkg("onepage").price)}, verslo svetainė nuo ${eur(pkg("business").price)}. Kainos be PVM.`,
        ],
      },
    ],
    evidence: [
      {
        project: "bangu",
        text: "Odontologijos klinikos svetainė keliomis kalbomis. Programavimas ir techninis SEO: metaduomenys ir struktūra, kad kiekvienas puslapis būtų indeksuojamas atskirai.",
      },
    ],
    faq: [
      {
        q: "Ar atnaujinus svetainę nukris pozicijos Google?",
        a: "Neturėtų. Pozicijos dažniausiai krenta tada, kai pasikeičia puslapių adresai ir seni niekur nenukreipiami. Senus adresus nukreipiu į naujus, o po paleidimo patikrinu Search Console, ar Google mato naują versiją.",
      },
      {
        q: "Ar galite atnaujinti svetainę, kurią kūrė kitas žmogus?",
        a: "Dažniausiai taip. Pirmiausia gaunu prieigas ir peržiūriu, kaip svetainė padaryta. Jei ją tvarkyti būtų brangiau nei sukurti iš naujo - pasakau tai prieš pradedant.",
      },
      {
        q: "Kiek kainuoja svetainės atnaujinimas?",
        a: `Smulkūs darbai - ${HOURLY} €/val. su sąmata iš anksto. Jei svetainę verta kurti iš naujo, vieno puslapio svetainė kainuoja nuo ${eur(pkg("onepage").price)}, verslo svetainė - nuo ${eur(pkg("business").price)}.`,
      },
      {
        q: "Ar svetainė neveiks, kol ją atnaujinate?",
        a: "Veiks. Dirbu atskiroje kopijoje, o perjungiu tik tada, kai naują versiją peržiūrite ir patvirtinate.",
      },
    ],
    related: ["svetainiu-prieziura", "elektroniniu-parduotuviu-kurimas"],
    topic: "refresh",
  },

  {
    slug: "svetainiu-prieziura",
    nav: "Svetainių priežiūra",
    title: `Svetainių priežiūra nuo ${care("calm").price} €/mėn. | Beneta`,
    description: `Svetainės priežiūra nuo ${care("calm").price} €/mėn.: talpinimas, atnaujinimai, atsarginės kopijos ir smulkūs pakeitimai. Vienkartiniai darbai ${HOURLY} €/val.`,
    serviceType: "Website maintenance",
    serviceName: "Svetainių priežiūra ir techninė pagalba",
    priceFrom: care("calm").price,
    priceUnit: "MON",
    eyebrow: "Priežiūra",
    h1: "Svetainių priežiūra ir techninė pagalba",
    lede:
      "Svetainė gerai veikia tol, kol kas nors ja rūpinasi. Atnaujinimai, atsarginės kopijos, smulkūs teksto ir nuotraukų pakeitimai - kad jums nereikėtų apie tai galvoti.",
    sections: [
      {
        h: "Kodėl svetainei reikia priežiūros",
        p: [
          "Svetainė nėra vienkartinis darbas. WordPress ir jo papildiniai nuolat atnaujinami, ir neatnaujinta svetainė tampa lengvu taikiniu įsilaužėliams. Baigiasi domeno ar sertifikato galiojimas. Sugenda forma, ir užklausos savaitėmis niekur nekeliauja.",
          "Dažniausiai tai pastebima per vėlai - kai klientas paskambina ir sako, kad svetainė neatsidaro. Priežiūra reiškia, kad tai pastebiu aš, ir anksčiau.",
        ],
      },
      {
        h: "Priežiūros planai",
        plans: true,
      },
      {
        h: "Be plano",
        p: [
          `Priežiūra pasirinktinai. Jei plano nenorite, svetainė vis tiek lieka jūsų, o kai prireikia pagalbos, dirbu valandiniu įkainiu - ${HOURLY} €/val. Visoms mano sukurtoms svetainėms mėnesį po paleidimo pataisymai nemokami.`,
        ],
      },
      {
        h: "Svetainė, kurios nekūriau",
        p: [
          "Galiu prižiūrėti ir kito kūrėjo svetainę. Prieš sutardamas pirmiausia ją peržiūriu: kokia platforma, kada paskutinį kartą atnaujinta, ar yra atsarginės kopijos. Jei randu rimtų problemų, pirmiausia pasakau, ką reikia sutvarkyti, ir kiek tai kainuotų.",
        ],
      },
    ],
    evidence: [],
    faq: [
      {
        q: "Kiek kainuoja svetainės priežiūra?",
        a: `Planas „${"Ramybė"}" - ${care("calm").price} €/mėn., planas „${"Augimas"}" - ${care("growth").price} €/mėn. Vienkartiniai darbai be plano - ${HOURLY} €/val. Kainos be PVM.`,
      },
      {
        q: "Ar priežiūra privaloma?",
        a: "Ne. Svetainė, domenas ir failai priklauso jums ir be priežiūros plano. Planas skirtas tiems, kas nenori patys sekti atnaujinimų ir atsarginių kopijų.",
      },
      {
        q: "Ką daryti, jei svetainė sugedo?",
        a: "Parašykite el. paštu. Mano sukurtoms svetainėms mėnesį po paleidimo taisau nemokamai, vėliau - pagal priežiūros planą arba valandiniu įkainiu.",
      },
      {
        q: "Ar galite prižiūrėti WordPress svetainę, kurią kūrė kitas?",
        a: "Taip, po peržiūros. Pirmiausia patikrinu, kaip svetainė padaryta ir kokios būklės, ir tik tada sutariame dėl priežiūros.",
      },
    ],
    related: ["svetainiu-atnaujinimas", "elektroniniu-parduotuviu-kurimas"],
    topic: "other",
  },

  {
    slug: "individualus-programavimas",
    nav: "Sistemos ir automatizavimas",
    title: "Individualus programavimas ir automatizavimas verslui | Beneta",
    description: `Verslo sistemos, integracijos ir procesų automatizavimas: užklausos, registracijos, rezervacijos, ataskaitos. Sujungiu su jūsų įrankiais. Nuo ${eur(pkg("custom").price)}.`,
    serviceType: "Custom software development",
    serviceName: "Individualus programavimas ir verslo procesų automatizavimas",
    priceFrom: pkg("custom").price,
    eyebrow: "Sistemos",
    h1: "Individualus programavimas ir verslo procesų automatizavimas",
    lede:
      "Kai paruoštas įrankis jau nebetinka, o rankinio darbo vis daugėja. Užklausos, registracijos, rezervacijos, ataskaitos - padarau, kad tai vyktų savaime, ir sujungiu su sistemomis, kurias jau naudojate.",
    sections: [
      {
        h: "Ką dažniausiai automatizuoju",
        list: [
          "Užklausų ir registracijos formas, kurios patikimai pasiekia el. paštą, o siuntimo klaidos matomos, ne tyliai pradingsta",
          "Kelių žingsnių užklausas, kai klientui reikia užduoti daugiau klausimų nei telpa į vieną formą",
          "Rezervacijas, registracijas ir klientų paskyras",
          "Suvestines ir ataskaitas, kurios dabar skaičiuojamos ranka skaičiuoklėse",
          "Duomenų eksportą (pvz., į CSV) ir sujungimą tarp skirtingų programų per API",
        ],
      },
      {
        h: "Kaip pradedame",
        p: [
          "Daugumoje projektų sunkiausia ne užprogramuoti, o teisingai suformuluoti, ką reikia padaryti. Todėl pirmiausia aprašau, kokie duomenys yra, iš kur jie ateina ir ką konkrečiai reiškia „veikia\". Dėl to sutariame prieš rašant kodą - tada pakeitimai kainuoja minutes, ne savaites.",
          "Įvertinu ir ribas: biudžetą, terminus, sistemas, kurias jau naudojate, ir tai, kas sistemą prižiūrės po metų. Kartais paaiškėja, kad užtenka paruošto įrankio ir teisingo nustatymo. Tada taip ir pasakau.",
        ],
      },
      {
        h: "Technologijos",
        p: [
          "Serveris ir API - Node.js ir Express, duomenų bazės - MongoDB, MySQL arba Firebase. Integracijos per REST API: el. laiškų siuntimas (Resend, EmailJS), Airtable ir kitos paslaugos, kurias verslas jau moka. Integracija laikoma baigta tada, kai tvarkingai apdoroja klaidas, o ne tik veikia, kai viskas gerai.",
        ],
      },
      {
        h: "Kiek kainuoja",
        p: [
          `Individualūs sprendimai - nuo ${eur(pkg("custom").price)} (be PVM), tiksli kaina pagal sąmatą. Nedidelės integracijos ar pakeitimai esamoje sistemoje - ${HOURLY} €/val. Kainą ir terminą gaunate raštu prieš pradedant, o kodas ir prieigos lieka jums.`,
        ],
      },
    ],
    evidence: [
      {
        project: "fakaunas",
        text: "Jaunimo futbolo akademijos registracija: forma siunčiama per Express serverį ir Resend API, todėl siuntimo klaidos matomos serveryje.",
      },
      {
        project: "velgtilbud",
        text: "Norvegiška kraustymo ir valymo pasiūlymų palyginimo paslauga su devynių žingsnių užklausos forma.",
      },
      {
        project: "syncara",
        text: "Analitikos skydo prototipas: duomenys iš Airtable, prisijungimas per Firebase, grafikai ir CSV eksportas. Į produkciją nepaleistas.",
      },
    ],
    faq: [
      {
        q: "Ar verta kurti savo sistemą, jei yra paruoštų įrankių?",
        a: "Dažnai ne. Jei paruoštas įrankis atlieka 90 % to, ko reikia, pigiau jį nustatyti ir sujungti su kitais. Individualus sprendimas verta tada, kai įrankiai nesusikalba tarpusavyje arba kasdien tenka daug dirbti ranka.",
      },
      {
        q: "Ar galima sujungti su programa, kurią jau naudojame?",
        a: "Dažniausiai taip, jei programa turi API arba leidžia eksportuoti duomenis. Tai patikrinu prieš pateikdamas kainą, kad nebūtų netikėtumų darbo viduryje.",
      },
      {
        q: "Kam priklauso sistemos kodas?",
        a: "Jums. Kodas, prieigos ir dokumentacija perduodami jums, ir jei kada norėsite dirbti su kitu programuotoju, viską perduodu be kliūčių.",
      },
    ],
    related: ["elektroniniu-parduotuviu-kurimas", "svetainiu-prieziura"],
    topic: "other",
  },
];

export const servicePage = (slug) => SERVICE_PAGES.find((p) => p.slug === slug);

/** The projects page: everything in PROJECTS, in full, on one URL. */
export const WORK_PAGE = {
  slug: "darbai",
  title: "Darbai: svetainės ir sistemos, kurias sukūriau | Beneta",
  description:
    "Klinikos, futbolo akademijos, gėlių studijos el. parduotuvės, transporto įmonės ir kitų verslų svetainės bei sistemos. Ką dariau ir kokiomis technologijomis.",
  h1: "Darbai",
  lede:
    "Tikros svetainės ir sistemos, kurias galite atsidaryti ir pažiūrėti. Prie kiekvienos - ką dariau ir kokiomis technologijomis. Rezultatų skaičių nerašau, jei jų neišmatavau.",
};

/** Which service page each project best demonstrates, for internal links. */
export const PROJECT_SERVICE = {
  flore: "elektroniniu-parduotuviu-kurimas",
  bangu: "svetainiu-atnaujinimas",
  beneta: "svetainiu-atnaujinimas",
  fakaunas: "individualus-programavimas",
  velgtilbud: "individualus-programavimas",
  syncara: "individualus-programavimas",
};
