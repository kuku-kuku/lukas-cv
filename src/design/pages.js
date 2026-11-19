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
    title: `Elektroninių parduotuvių kūrimas verslui nuo ${eur(pkg("custom").price)} | Beneta`,
    description: `El. parduotuvės kūrimas nuo ${eur(pkg("custom").price)}: prekės, krepšelis, apmokėjimai ir pristatymas Lietuvoje. Prekes ir kainas valdote patys, kaina fiksuota.`,
    serviceType: "El. parduotuvių kūrimas",
    serviceName: "El. parduotuvių kūrimas",
    priceFrom: pkg("custom").price,
    eyebrow: "El. parduotuvės",
    h1: "Elektroninių parduotuvių kūrimas",
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
        h: "Apmokėjimai ir pristatymas Lietuvoje",
        p: [
          "Pirkėjas Lietuvoje tikisi mokėti per savo banką arba kortele ir prekę atsiimti paštomate ar gauti per kurjerį. Todėl apmokėjimą ir pristatymą derinu prie to, ką naudoja jūsų pirkėjai, o ne prie to, kas lengviausia įdiegti. Dažniausiai tai Paysera, Montonio ar Stripe mokėjimai ir Omniva, DPD ar LP Express paštomatai bei kurjeriai.",
          "Mokėjimų tiekėją renkamės kartu: palyginame mokesčius už operaciją, kaip greitai pinigai pasiekia jūsų sąskaitą ir ar tiekėjas veikia su jūsų platforma. Pristatymo kainas galima nustatyti pagal svorį, sumą ar zoną, o nemokamą pristatymą - nuo pasirinktos krepšelio sumos.",
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
      {
        q: "Ar galite perkelti esamą parduotuvę į naują platformą?",
        a: "Taip. Perkeliu prekes, kategorijas ir nuotraukas, o senus puslapių adresus nukreipiu į naujus, kad Google ir pirkėjai jų nepamestų. Dabartinė parduotuvė veikia, kol nauja peržiūrima ir patvirtinama.",
      },
    ],
    related: ["svetainiu-prieziura", "individualus-programavimas"],
    topic: "shop",
  },

  {
    slug: "svetainiu-atnaujinimas",
    nav: "Svetainės atnaujinimas",
    title: "Svetainės atnaujinimas ir greičio optimizavimas | Beneta",
    description: `Lėta, pasenusi ar Google nerandama svetainė? Įvertinu, ką verta pataisyti, o ką kurti iš naujo. Greičio optimizavimas ir SEO pataisymai - ${HOURLY} €/val.`,
    serviceType: "Svetainių atnaujinimas",
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
        h: "Kodėl svetainė lėta ir kaip ją pagreitinti",
        p: [
          "Dažniausios priežastys paprastos: per didelės nuotraukos, dešimtys papildinių, kurių niekas nenaudoja, sunkūs šriftai ir trečiųjų šalių skriptai, kraunami dar prieš turinį. Greitį matuoju Google Lighthouse ir PageSpeed Insights - prieš darbus ir po jų, kad matytumėte skirtumą skaičiais, o ne žodžiais.",
          "Pagreitinimas dažniausiai reiškia keturis darbus: nuotraukas suspaudžiu ir paverčiu šiuolaikiniais formatais, nereikalingus įskiepius ir skriptus pašalinu arba įkeliu vėliau, šriftus sumažinu iki tų, kurie tikrai naudojami, o jei lėtas pats serveris - pasiūlau greitesnį talpinimą.",
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
    description: `Svetainių priežiūra nuo ${care("calm").price} €/mėn.: talpinimas, atnaujinimai, atsarginės kopijos ir smulkūs pakeitimai. Prižiūriu ir WordPress svetaines, kurių nekūriau.`,
    serviceType: "Svetainių priežiūra",
    serviceName: "Svetainių priežiūra ir techninė pagalba",
    priceFrom: care("calm").price,
    priceUnit: "MON",
    offers: [
      { name: "Ramybė", price: care("calm").price, unitCode: "MON" },
      { name: "Augimas", price: care("growth").price, unitCode: "MON" },
    ],
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
        h: "Kas įeina į svetainės priežiūrą",
        p: ["Kas mėnesį pagal planą „Ramybė“ pasirūpinu:"],
        list: [
          "Talpinimu - svetainė veikia serveryje, už kurį atsakau aš, o ne jūs",
          "Sistemos ir saugumo atnaujinimais - WordPress, papildiniai ir kita programinė įranga atnaujinami tvarkingai, o po atnaujinimo patikrinu, ar svetainė veikia",
          "Veikimo stebėsena - jei svetainė nustoja atsidaryti, apie tai sužinau automatiškai, dažnai anksčiau nei jūs",
          "Atsarginėmis kopijomis - jei kas nors sugenda, svetainę galima grąžinti į paskutinę veikiančią būseną",
          "Smulkiais teksto pakeitimais - nauja kaina, darbo laikas ar kontaktai pakeičiami be atskiros sąskaitos",
        ],
        after: [
          "Planas „Augimas“ apima viską, kas yra „Ramybėje“, ir kas mėnesį dar - svetainės patobulinimus bei Google ataskaitą, kad matytumėte, kaip svetainei sekasi paieškoje.",
        ],
      },
      {
        h: "Priežiūros planai",
        plans: true,
      },
      {
        h: "Kaip greitai sureaguoju",
        p: [
          "Į laiškus atsakau per 24 valandas darbo dienomis. Jei svetainė neveikia ar dingo forma, parašykite el. paštu ir trumpai aprašykite, ką matote - pradedu nuo to, kas trukdo klientams su jumis susisiekti ar pirkti.",
          "Kai priežastis aiški, pasakau, ką taisysiu ir ar tai įeina į jūsų planą. Jei svetainę teko grąžinti iš atsarginės kopijos, paaiškinu, kas nutiko ir ką padariau, kad tai nesikartotų.",
        ],
      },
      {
        h: "Be plano",
        p: [
          `Priežiūra pasirinktinai. Jei plano nenorite, svetainė vis tiek lieka jūsų, o kai prireikia pagalbos, dirbu valandiniu įkainiu - ${HOURLY} €/val. Visoms mano sukurtoms svetainėms mėnesį po paleidimo pataisymai nemokami. Visas kainas palyginti galite [svetainės kūrimo kainų puslapyje](/svetainiu-kurimo-kaina).`,
        ],
      },
      {
        h: "WordPress ir kitų kūrėjų svetainių priežiūra",
        p: [
          "Galiu prižiūrėti ir kito kūrėjo svetainę. Prieš sutardamas pirmiausia ją peržiūriu: kokia platforma, kada paskutinį kartą atnaujinta, ar yra atsarginės kopijos. Jei randu rimtų problemų, pirmiausia pasakau, ką reikia sutvarkyti, ir kiek tai kainuotų.",
          "Dažniausiai tai WordPress svetainės, kurių papildiniai nebuvo atnaujinti metų metus. Tokiu atveju pirmiausia padarau atsarginę kopiją ir patikrinu, kas sugestų atnaujinus. Po peržiūros gaunate pasirinkimą: priežiūros planą arba vienkartinį sutvarkymą valandiniu įkainiu. Jei svetainė tokios būklės, kad ją pigiau [atnaujinti iš esmės](/svetainiu-atnaujinimas), pasakau tai iš karto.",
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
      {
        q: "Ar galiu nutraukti priežiūrą bet kada?",
        a: "Taip, bet kurį mėnesį. Planas tiesiog nebepratęsiamas kitam mėnesiui, be jokių baudų, o svetainė, domenas ir failai lieka jūsų.",
      },
    ],
    related: ["svetainiu-atnaujinimas", "elektroniniu-parduotuviu-kurimas"],
    topic: "other",
  },

  {
    slug: "individualus-programavimas",
    nav: "Sistemos ir automatizavimas",
    title: "Verslo sistemų kūrimas ir automatizavimas | Beneta",
    description: `Individualių verslo sistemų kūrimas: rezervacijos, registracijos, klientų paskyros, integracijos ir ataskaitos. Sujungiu su jūsų naudojamais įrankiais. Nuo ${eur(pkg("custom").price)}.`,
    serviceType: "Verslo sistemų kūrimas",
    serviceName: "Verslo sistemų kūrimas ir automatizavimas",
    priceFrom: pkg("custom").price,
    eyebrow: "Sistemos",
    h1: "Individualių verslo sistemų kūrimas ir automatizavimas",
    lede:
      "Kai paruoštas įrankis jau nebetinka, o rankinio darbo vis daugėja. Užklausos, registracijos, rezervacijos, ataskaitos - padarau, kad tai vyktų savaime, ir sujungiu su sistemomis, kurias jau naudojate.",
    sections: [
      {
        h: "Kokias sistemas kuriu ir ką automatizuoju",
        sub: [
          {
            h: "Rezervacijų ir registracijų sistemos",
            p: [
              "Užklausų ir registracijos formos, kurios patikimai pasiekia el. paštą, o siuntimo klaidos matomos, ne tyliai pradingsta. Kelių žingsnių užklausos, kai klientui reikia užduoti daugiau klausimų nei telpa į vieną formą. Rezervacijos ir registracijos, kurias klientas atlieka pats, o jūs gaunate tvarkingą sąrašą vietoje žinučių srauto.",
            ],
          },
          {
            h: "Klientų paskyros",
            p: [
              "Vieta, kur klientas prisijungia ir mato savo užsakymus, registracijas ar dokumentus. Jums mažiau tų pačių klausimų telefonu, o klientui nereikia laukti atsakymo.",
            ],
          },
          {
            h: "Integracijos su esamomis programomis",
            p: [
              "Duomenų eksportas (pvz., į CSV) ir sujungimas tarp skirtingų programų per API. Tikslas paprastas: tie patys duomenys nevedami ranka dviejose vietose, o informacija iš svetainės pati nukeliauja ten, kur su ja dirbate.",
            ],
          },
          {
            h: "Vidiniai įrankiai ir ataskaitos",
            p: [
              "Suvestinės ir ataskaitos, kurios dabar skaičiuojamos ranka skaičiuoklėse. Kai duomenys renkami vienoje vietoje, ataskaita sudaroma savaime, ir ją galima atsidaryti bet kada, o ne laukti mėnesio pabaigos.",
            ],
          },
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
        text: "Analitikos platformos prototipas: duomenys iš Airtable, prisijungimas per Firebase, grafikai ir CSV eksportas. Į produkciją nepaleistas.",
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

/**
 * PRICE PAGE - owns the price intent ("svetainės kūrimo kaina", "kiek
 * kainuoja svetainė"). The home page keeps its short pricing section for
 * conversion and links here; e-shop and maintenance prices stay primary on
 * their own pages and are only summarised here, with a link.
 *
 * Not in SERVICE_PAGES: it is not a service, so it stays out of the header
 * service nav and the related-service cards. It is linked from the footer,
 * the home pricing section and FAQ, and every service page's "Visos kainos".
 */
export const PRICE_PAGE = {
  slug: "svetainiu-kurimo-kaina",
  nav: "Kainos",
  title: "Svetainės kūrimo kaina: kiek kainuoja svetainė? | Beneta",
  description: `Kiek kainuoja svetainė: vieno puslapio nuo ${eur(pkg("onepage").price)}, verslo svetainė nuo ${eur(pkg("business").price)}, el. parduotuvė nuo ${eur(pkg("custom").price)}. Kas įeina į kainą ir kokios išlaidos laukia po paleidimo.`,
  eyebrow: "Kainos",
  h1: "Svetainės kūrimo kaina",
  lede:
    "Svetainės kaina priklauso nuo to, ko jai reikia padaryti: pristatyti paslaugą, rinkti užklausas ar parduoti. Žemiau - mano kainos, kas į jas įeina ir kokios išlaidos laukia po paleidimo. Tikslią sumą raštu gaunate po nemokamo pokalbio, ir ji nesikeičia.",
  sections: [
    {
      h: "Kiek kainuoja svetainė: kainos pagal tipą",
      p: [
        "Kainos fiksuotos ir skelbiamos viešai. „Nuo“ reiškia mažiausią tokio tipo projekto kainą: jei jūsų atvejis paprastas, tiek ir sumokėsite, o jei reikia daugiau, kodėl kaina didesnė - matote pasiūlyme.",
      ],
      prices: true,
      after: [
        "Ką jau esu padaręs už panašią kainą, galite pažiūrėti [mano darbų puslapyje](/darbai) - visos svetainės veikia ir atsidaro.",
      ],
    },
    {
      h: "Kas įeina į kainą",
      p: ["Kiekviena svetainė, nesvarbu, kurio tipo, gaunama su tuo pačiu pagrindu:"],
      list: [
        "Dizainas, pritaikytas telefonams - dauguma lankytojų jus atidarys būtent telefone",
        "Kontaktų forma, kurios užklausos pasiekia jūsų el. paštą",
        "Bazinis paruošimas Google: kiekvienas puslapis turi atskirą pavadinimą ir aprašymą, aiškią antraščių struktūrą",
        "Greitis - puslapis atsidaro per 1-2 s",
        "Lankytojų statistika, kad matytumėte, kiek žmonių ateina ir iš kur",
        "Mėnuo nemokamų pataisymų po paleidimo",
        "Domenas ir talpinimas pirmiems metams",
        "Domenas, svetainė ir visi failai priklauso jums",
      ],
      after: [
        "Verslo svetainėje papildomai galite patys keisti tekstus ir nuotraukas, nelaukdami programuotojo.",
      ],
    },
    {
      h: "Kas lemia galutinę kainą",
      sub: [
        {
          h: "Puslapių skaičius",
          p: [
            "Vieno puslapio svetainė tinka vienai paslaugai ar specialistui. Kai paslaugų daugiau, kiekvienai verta atskiro puslapio - taip ją lengviau rasti Google. Verslo svetainės kainoje numatyti 3-8 puslapiai; daugiau puslapių reiškia daugiau dizaino, tikrinimo ir teksto sudėliojimo.",
          ],
        },
        {
          h: "Dizainas ir animacijos",
          p: [
            "Aiškus, tvarkingas dizainas pagal jūsų prekės ženklą įeina į kainą. Sudėtingesnės animacijos, iliustracijos ar interaktyvūs elementai užima daugiau laiko, todėl juos aptariame atskirai ir darome tik ten, kur jie padeda, o ne puošia.",
          ],
        },
        {
          h: "Tekstai ir nuotraukos",
          p: [
            "Greičiausiai svetainė gimsta tada, kai tekstai ir nuotraukos jau paruošti. Jei jų dar nėra, prieš pradedant susitariame, kas ir kada juos paruoš, kad tai neužtęstų darbų ir nepakeistų sutartos kainos.",
          ],
        },
        {
          h: "Funkcijos ir integracijos",
          p: [
            `Kontaktų forma įeina visada. Rezervacijos, registracijos, klientų paskyros, apmokėjimai ar sujungimas su kitomis programomis - jau individualaus sprendimo darbas, nuo ${eur(pkg("custom").price)} (plačiau - [verslo sistemų puslapyje](/individualus-programavimas)). Prieš pateikdamas kainą patikrinu, ar programa, su kuria reikia jungtis, tai leidžia.`,
          ],
        },
        {
          h: "Kalbų versijos",
          p: [
            "Kiekviena kalba - tai atskiri puslapiai su savo adresais, kad Google rodytų tinkamą versiją tinkamiems žmonėms. Techniškai tai nesudėtinga, bet reikia paruošti ir patikrinti visus tekstus antra kalba, todėl daugiakalbė svetainė kainuoja daugiau.",
          ],
        },
      ],
    },
    {
      h: "Išlaidos po paleidimo",
      p: [
        "Svetainės sukūrimas - vienkartinė išlaida, bet ne vienintelė. Pirmi domeno ir talpinimo metai įskaičiuoti į kainą, o štai kas laukia vėliau:",
      ],
      list: [
        "Domenas - nuo antrųjų metų pratęsiamas kasmet ir apmokamas domenų registratoriui. Domenas registruojamas jūsų vardu ir priklauso jums.",
        `Talpinimas ir priežiūra - po pirmų metų talpinimas įeina į priežiūros planą: „Ramybė“ ${care("calm").price} €/mėn. arba „Augimas“ ${care("growth").price} €/mėn. Kas įeina į kiekvieną, aprašyta [svetainių priežiūros puslapyje](/svetainiu-prieziura).`,
        `Vienkartiniai darbai - ${HOURLY} €/val., su sąmata iš anksto: nauja skiltis, didesnis pakeitimas ar pagalba be priežiūros plano.`,
      ],
      after: [
        "Priežiūra neprivaloma. Svetainė, domenas ir failai priklauso jums ir be plano, o mėnesį po paleidimo pataisymai nemokami bet kuriuo atveju.",
      ],
    },
    {
      h: "Individuali svetainė, šablonas ar svetainių kūrimo įrankis?",
      p: [
        "Sąžiningai: ne kiekvienam verslui reikia individualios svetainės. Šablonas ar svetainių kūrimo įrankis greičiau ir pigiau paleidžiami, tačiau dažnai būna sunkesni ir sunkiau pritaikomi, kai verslas auga. Štai kaip jie skiriasi:",
      ],
      table: {
        head: ["", "Individuali svetainė", "Paruoštas šablonas", "Svetainių kūrimo įrankis"],
        rows: [
          ["Kaina pradžioje", "Didesnė", "Mažesnė", "Mažiausia, bet mokama kas mėnesį"],
          ["Greitis", "Kraunama tik tai, ko reikia", "Daug nenaudojamo kodo", "Priklauso nuo platformos"],
          ["Lankstumas", "Daroma pagal jūsų turinį ir klientus", "Ribojama šablono", "Ribojama įrankio galimybių"],
          ["Kas valdo", "Jūs: kodas, domenas ir failai", "Jūs, bet priklausote nuo šablono kūrėjo", "Platforma: išsikelti ne visada paprasta"],
        ],
      },
      after: [
        "Jei jūsų atveju pakanka šablono ar įrankio, pasakysiu tai per pirmą pokalbį - nėra prasmės mokėti už tai, ko nereikia.",
      ],
    },
    {
      h: "Kaip palyginti kelis svetainės kūrimo pasiūlymus",
      p: [
        "Du pasiūlymai su ta pačia suma gali reikšti visai skirtingus dalykus. Prieš rinkdamiesi, užduokite kiekvienam kūrėjui (ir man) tuos pačius klausimus:",
      ],
      list: [
        "Ar kaina fiksuota, ar gali augti darbų eigoje?",
        "Kas tiksliai įeina į kainą, o kas mokama atskirai?",
        "Kiek pataisymų įskaičiuota ir kiek laiko po paleidimo jie nemokami?",
        "Kam priklausys domenas, svetainės kodas ir prieigos?",
        "Kas talpins svetainę ir kiek tai kainuos per metus?",
        "Ar svetainė bus greita telefone - ir ar tai išmatuosite?",
        "Kas nutinka po paleidimo, jei kas nors sugenda?",
        "Ar matysiu, kaip vyksta darbas, ar tik galutinį rezultatą?",
      ],
      after: [
        "Mano atsakymai: kaina fiksuota raštu, mėnuo nemokamų pataisymų, pirmi domeno ir talpinimo metai įskaičiuoti, viskas priklauso jums, o veikiančią versiją matote kas savaitę.",
      ],
    },
  ],
  evidence: [],
  faqTitle: "Dažni klausimai apie svetainės kainą",
  faq: [
    {
      q: "Kodėl svetainių kainos taip skiriasi?",
      a: "Nes po žodžiu „svetainė“ slepiasi labai skirtingi darbai: vienas kūrėjas įdiegia šabloną, kitas kuria pagal jūsų turinį, matuoja greitį ir paruošia svetainę Google. Skiriasi ir tai, kas įeina: pataisymai, talpinimas, priežiūra. Todėl lyginkite ne sumas, o tai, ką už jas gaunate.",
    },
    {
      q: "Ar kaina gali pasikeisti darbo eigoje?",
      a: "Ne, jei nesikeičia darbų apimtis. Kainą ir terminą sutariame raštu prieš pradedant. Jei darbų eigoje panorėsite ko nors papildomai, pirmiausia pasakysiu, kiek tai kainuotų, ir darysiu tik jums sutikus.",
    },
    {
      q: "Ar domenas ir talpinimas įskaičiuoti į kainą?",
      a: "Taip, pirmiems metams. Domeną registruoju jūsų vardu, o pirmų metų domeno ir talpinimo mokestis jau įeina į svetainės kainą. Vėliau domeną pratęsiate registratoriui, o talpinimas įeina į priežiūros planą.",
    },
    {
      q: "Ar galima mokėti dalimis?",
      a: "Taip, dviem dalimis: 50 % prieš pradedant darbus ir 50 %, kai svetainė paleidžiama.",
    },
    {
      q: "Kiek kainuoja svetainės priežiūra?",
      a: `Planas „Ramybė“ - ${care("calm").price} €/mėn., planas „Augimas“ - ${care("growth").price} €/mėn., vienkartiniai darbai - ${HOURLY} €/val. Plačiau - [svetainių priežiūros puslapyje](/svetainiu-prieziura).`,
    },
    {
      q: "Kiek kainuoja el. parduotuvė?",
      a: `Nuo ${eur(pkg("custom").price)} be PVM. Kaina priklauso nuo prekių kiekio, apmokėjimo ir pristatymo būdų bei integracijų. Plačiau - [el. parduotuvės kūrimo puslapyje](/elektroniniu-parduotuviu-kurimas).`,
    },
  ],
  related: [
    "elektroniniu-parduotuviu-kurimas",
    "svetainiu-atnaujinimas",
    "svetainiu-prieziura",
    "individualus-programavimas",
  ],
};

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
