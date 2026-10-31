import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  lt: {
    translation: {
      // Bendra
      title: 'Lukas Beneta - Paslaugos',
      heroText: 'Labas! Aš tavo puslapio kūrėjas Lukas.',
      about: 'Apie mane',
      services: 'Paslaugos',
      works: 'Mano darbai',
      contact: 'Susisiekime',
      contact_intro: 'Jei turi klausimų ar pasiūlymų - drąsiai rašyk!',
      contact_button: 'Parašyk man',
      close: 'Uždaryti',

      // Header/ženkliukai
      professional_services: 'Profesionalios paslaugos',
      services_tagline: 'Individualūs sprendimai jūsų skaitmeninei vizijai įgyvendinti',

      // UI etiketės
      price_label: 'Kaina',
      starting_from: 'Nuo',
      details: 'Daugiau',
      get_started: 'Susisiekti',
      trust_fast_delivery: 'Greitas atlikimas',
      trust_quality_guaranteed: 'Kokybės garantija',
      trust_modern_tech: 'Šiuolaikinės technologijos',

      // Paslaugų kortelės
      service_1_title: 'Vieno puslapio svetainė',
      service_1_short: 'Tinka portfolio, verslo pristatymui, renginiams.',
      service_1_long:
        'Tai vieno puslapio svetainė, idealiai tinkanti pristatyti savo veiklą, projektą ar renginį. Sukursiu unikalų dizainą, pasirūpinsiu programavimu, SEO pagrindais ir įkelsiu svetainę į serverį. Tai greitas ir efektyvus būdas būti internete - aiškiai, patraukliai ir profesionaliai.',
      // be „nuo“ - logika prideda „Nuo “ kortelėje
      service_1_price: '200 €',

      service_2_title: 'Pilna interneto svetainė',
      service_2_short: 'Keletas puslapių, SEO optimizacija, kontaktų forma, pritaikyta mobiliesiems.',
      service_2_long:
        'Pilna svetainė - tai daugiau nei vienas puslapis. Įprastai ji apima pagrindinį puslapį, apie puslapį, paslaugas, kontaktų formą ir kitus skyrius. Svetainė bus patogi naudoti tiek kompiuteryje, tiek telefone, o turinys bus optimizuotas Google paieškai. Tai rimtas sprendimas tiems, kas nori būti matomi internete iš visų pusių.',
      service_2_price: '300 €',

      service_3_title: 'Serverio sukūrimas',
      service_3_short: 'Sukursiu backend serverį (Node.js, Express, MongoDB ar MySQL).',
      service_3_long:
        'Jei tau reikia „vidinės“ sistemos, kuri saugo, valdo ar apdoroja duomenis - tuomet reikia serverio. Galiu sukurti REST API, vartotojų registraciją, prisijungimą, duomenų bazės ryšį ir paruošti viską talpinimui. Tinka tiek paprastoms, tiek sudėtingesnėms sistemoms.',
      service_3_price: '300 €',

      service_4_title: 'Serverio priežiūra (mėnesinis planas)',
      service_4_short: 'Reguliari priežiūra, atnaujinimai, mažų problemų sprendimas.',
      service_4_long:
        'Kad tavo serveris veiktų sklandžiai - jį reikia prižiūrėti. Siūlau mėnesinę priežiūrą, kuri apima atnaujinimus, klaidų sprendimą, log failų analizę ir duomenų bazės priežiūrą. Tai idealu tiems, kurie nori stabilumo be rūpesčių.',
      service_4_price: '60 €/mėn',

      service_5_title: 'Svetainės atnaujinimai / priežiūra',
      service_5_short: 'Jei turi puslapį, kurį reikia „pagyvinti“ ar atnaujinti - galiu padėti!',
      service_5_long:
        'Tavo svetainė veikia, bet atrodo pasenusi, lėta ar netinkama šių dienų vartotojams? Galiu ją atnaujinti vizualiai, patobulinti veikimą, pridėti naujas funkcijas ir pasirūpinti, kad viskas būtų modernu ir patogu.',
      service_5_price: '20 €/val',

      service_6_title: 'Konsultacija ar pagalba',
      service_6_short: 'Jei kažkas neveikia arba nori pasitarti dėl projekto - rašyk drąsiai.',
      service_6_long:
        'Kartais užtenka tik vieno pokalbio, kad rasti tinkamą kryptį. Galiu patarti dėl technologijos pasirinkimo, dizaino, funkcionalumo ar padėti išspręsti konkrečią problemą.',
      // Nemokama - be „Nuo“
      service_6_price: 'Pirma konsultacija nemokama',

      // Darbai
      featured_projects: 'Išskirti projektai',
      works_tagline:
        'Rinkinys žiniatinklio programų ir skaitmeninių patirčių, sukurtų su šiuolaikinėmis technologijomis',

      type: {
        website: 'Svetainė',
        dashboard: 'Valdymo skydas',
        landing: 'Nukreipiamasis puslapis',
      },
      status: {
        live: 'Veikia',
        demo: 'Demonstracija',
        wip: 'Vyksta darbai',
      },

      visit_live: 'Peržiūrėti svetainę',
      view_code: 'Kodas',

      projects: {
        beneta: {
          title: 'beneta.lt',
          kind: 'Praktikos svetainė',
          description: 'Ši svetainė: vieno puslapio sąsaja su judesio sistema, dviem kalbomis ir kontaktų forma.',
          scope:
            'Dizaino kryptis, dizaino sistema, judesio sistema, dvi kalbos (LT/EN), kontaktų forma, matavimai ir talpinimas Vercel.',
          problem:
            'Reikėjo svetainės, kuri pati būtų techninio lygio įrodymas, bet nepavirstų sunkiu, lėtai kraunamu demo.',
          approach:
            'Viena React programa be papildomų animacijų bibliotekų: Canvas fonas ir SVG diagrama parašyti ranka, judesys aprašytas bendrais trukmių ir easing tokenais, visa choreografija išjungiama su prefers-reduced-motion.',
        },
        fakaunas: {
          title: 'FA Kaunas',
          kind: 'Jaunimo futbolo akademija',
          description: 'Jaunimo futbolo akademijos svetainė su registracija ir dinamišku turiniu.',
          scope:
            'Svetainės struktūra, turinio skyriai, registracijos forma su el. pašto siuntimu per Resend API, pritaikymas telefonams, talpinimas.',
          problem:
            'Akademijai reikėjo, kad tėvai registraciją galėtų atlikti telefone per kelias minutes, o užklausos patikimai atsirastų el. pašte.',
          approach:
            'Forma siunčiama per Express endpointą, kuris naudoja Resend API, todėl siuntimo klaidos matomos serveryje, o ne tyliai prarandamos naršyklėje. Turinys suskirstytas į aiškius blokus, kad akademija galėtų keisti tekstus be dizaino perdarymo.',
        },
        syncara: {
          title: 'Syncara',
          kind: 'Analitikos skydas',
          description: 'Analitikos skydas klientų duomenų vizualizacijai ir eksportui.',
          scope:
            'Prototipas: duomenų traukimas iš Airtable, autentifikacija su Firebase, grafikai su Chart.js, eksportas į CSV.',
          problem:
            'Norėjau patikrinti, kaip rankinis darbas su klientų duomenimis atrodytų, jei suvestines generuotų sistema, o ne žmogus skaičiuoklėse.',
          approach:
            'Duomenų sluoksnis atskirtas nuo vaizdo: Airtable lieka kaip šaltinis, kurį klientas jau moka naudoti, o skydas tik skaito, sujungia ir eksportuoja. Prototipas nepaleistas į produkciją, todėl pažymėtas kaip demonstracija.',
        },
        bangu: {
          title: 'Bangų klinika',
          kind: 'Odontologijos klinika',
          description: 'Šiuolaikiška klinikos svetainė su keliomis kalbomis ir paruošta SEO.',
          scope:
            'Kelių puslapių klinikos svetainė, kelios kalbos su i18next, paslaugų ir kontaktų skyriai, techninis SEO ir metaduomenys.',
          problem:
            'Pacientai klinikos ieško telefone ir per Google, todėl svarbiausia buvo greitis, aiški informacija ir tinkami metaduomenys, o ne efektai.',
          approach:
            'Lengva React sąsaja be nereikalingų bibliotekų, turinys atskirtas į vertimų failus, semantinė struktūra ir metaduomenys sudėti taip, kad kiekvienas puslapis būtų indeksuojamas atskirai.',
        },
      },

      // Kontaktai / modalas
      lets_connect: 'Susisiekime',
      contact_dialog_title: 'Parašyk žinutę',
      contact_dialog_subtitle: 'Atsakysiu kaip įmanoma greičiau',
      form_name: 'Tavo vardas',
      form_email: 'Tavo el. paštas',
      form_message: 'Tavo žinutė',
      form_name_placeholder: 'Vardas ir pavardė',
      form_email_placeholder: 'El. pašto adresas',
      form_message_placeholder: 'Papasakok apie savo projektą...',
      form_send: 'Siųsti',
      form_sending: 'Siunčiama...',
      form_sent_placeholder: 'Žinutė sėkmingai išsiųsta!',
      form_verify: 'Prašome patvirtinti, kad nesate robotas.',

      // Nerastas puslapis
      not_found_title: 'Toks puslapis neegzistuoja',
      not_found_subtitle: 'Puslapis, kurio ieškai, nerastas.',
      back_home: 'Grįžti į pradžą',

      // Apie
    about_p1: 'Aš esu Lukas Beneta - buvęs barmenas, kuris iškeitė kokteilių plaktuvą į klaviatūrą. Taip, skamba drąsiai, bet ar žinojai, kad programavimas ir barmenavimas turi kažką bendro? Abu reikalauja ritmo, kruopštumo ir... kartais - kantrybės.',
    about_p2: 'Mokiausi CodeAcademy, kur išmokau nuo nulio kurti funkcionalius, estetiškus ir svarbiausia - veikiančius puslapius. Nuo to laiko - kuriu, eksperimentuoju ir padedu kitiems būti matomiems internete.',
    about_p3: 'Nuo mažens žaidžiu futbolą ir tą aistrą nešuosi iki dabar - tai mane išmokė komandinio darbo, užsispyrimo ir siekio laimėti kiekviename etape.',
    about_p4: 'Dirbdamas labiausiai vertinu paprastumą, logišką struktūrą ir tvirtą ryšį su žmogumi, kuriam kuriu. Esu stipriausias tada, kai turiu aiškų tikslą, galiu jį suprasti, suskaidyti į etapus ir nuosekliai įgyvendinti. Man svarbu ne tik techninis rezultatas, bet ir tai, kad jis kurtų vertę žmogui, kuriam jis skirtas.',
    about_p5: 'Jei nori žmogaus, kuris ne tik suprogramuos, bet ir supras, ko tau reikia - mes tikrai sutarsime.',

      // ===== Redesign: navigation =====
      nav_index: 'Pradžia',
      nav_capabilities: 'Kompetencijos',
      nav_method: 'Metodas',
      nav_work: 'Darbai',
      nav_stack: 'Technologijos',
      nav_process: 'Procesas',
      nav_contact: 'Kontaktas',
      nav_aria: 'Puslapio skyriai',
      skip_to_content: 'Pereiti prie turinio',
      switch_language: 'Pakeisti kalbą',
      open_menu: 'Atidaryti meniu',

      // ===== 00 Masthead =====
      masthead_sr: 'programinės įrangos inžinerijos praktika',
      masthead_lede:
        'Nepriklausoma inžinerijos praktika Klaipėdoje. Imu neaiškiai apibrėžtas technines problemas - interneto produktus, serverio sistemas, API integracijas, rankinius procesus - ir grąžinu veikiančias, išmatuojamas sistemas.',
      cta_brief: 'Aprašyti užduotį',
      cta_model: 'Kaip dirbu',
      scroll_cue: 'Žemiau',
      spec_status: 'Būklė',
      spec_status_value: 'Priimu naujus projektus',
      spec_base: 'Vieta',
      spec_base_value: 'Klaipėda, Lietuva',
      spec_languages: 'Kalbos',
      spec_languages_value: 'Lietuvių / English',
      spec_engagement: 'Formatas',
      spec_engagement_value: 'Fiksuota apimtis arba valandinis darbas',
      boot_skip: 'Paspausk bet kurį klavišą',
      boot_status: 'Kraunama sąsaja',

      // ===== 01 Capabilities =====
      cap_title: 'Ką kuriu',
      cap_lede:
        'Šešios sritys, kurios realiuose projektuose beveik visada eina kartu. Pasirink vieną - pamatysi, kur ji panaudota ir kurios kitos sritys su ja susijusios.',
      cap_apps_title: 'Interneto programos',
      cap_apps_body:
        'Vieno arba kelių puslapių produktai su React: komponentų sistema, maršrutai, kelios kalbos, administravimo sąsajos. Dizainas ir kodas tame pačiame procese, todėl sąsaja nelieka perduota kitam etapui.',
      cap_backend_title: 'Serveriai ir API',
      cap_backend_body:
        'Node.js ir Express pagrindu sukurti REST API, duomenų bazių schemos (MongoDB arba MySQL), registracija ir prisijungimas, duomenų apdorojimas. Viskas paruošta talpinimui ir vėlesniems atnaujinimams.',
      cap_integrations_title: 'Integracijos',
      cap_integrations_body:
        'Susiejimas su paslaugomis, kurias verslas jau naudoja: el. pašto siuntimas, formų apsauga, Firebase, Airtable, trečiųjų šalių API. Integracija laikoma baigta tada, kai turi klaidų apdorojimą, o ne tik veikiantį geriausią atvejį.',
      cap_automation_title: 'Automatizavimas',
      cap_automation_body:
        'Rankiniai, pasikartojantys procesai perkeliami į kodą: duomenų surinkimas, suvestinės, eksportas, vidiniai įrankiai. Tikslas - kad kasdienis darbas nebereikalautų atskiro žmogaus laiko.',
      cap_performance_title: 'Greitis ir SEO',
      cap_performance_body:
        'Core Web Vitals, paketų svoris, vaizdų formatai, techninis SEO ir prieinamumas. Matuojama prieš ir po, o ne vertinama iš akies.',
      cap_operations_title: 'Priežiūra',
      cap_operations_body:
        'Paleidimas, aplinkos kintamieji, atnaujinimai, stebėjimas ir perdavimas. Jei norite - projektas lieka mano priežiūroje; jei ne - gaunate dokumentaciją ir prieigas, kad galėtumėte tęsti be manęs.',
      evidence: 'Kur panaudota',
      shared: 'susiję',
      detail: 'Detaliau',
      rate_card: 'Paslaugos ir kainos',
      rate_note: 'Kainos be PVM · fiksuota apimtis arba valandinis',

      // ===== 02 Method =====
      method_title: 'Kaip neaiški užduotis tampa sistema',
      method_lede:
        'Daugumą projektų sunkiausia ne užprogramuoti, o teisingai suformuluoti. Todėl pradedu nuo modelio: kas yra duomenys, kur yra ribos ir ką konkrečiai reiškia veikia.',
      principle_a_title: 'Pirma modelis, tik tada kodas',
      principle_a_body:
        'Užrašau, kokie objektai sistemoje egzistuoja ir kaip jie keičiasi. Jei to negaliu paaiškinti vienu paveikslu, dar nesu pasiruošęs rašyti kodo.',
      principle_b_title: 'Ribos svarbesnės už funkcijas',
      principle_b_body:
        'Biudžetas, terminai, esamos sistemos ir tai, kas jas prižiūrės po metų. Ribos nustato architektūrą; funkcijų sąrašas tik užpildo ją.',
      principle_c_title: 'Baigta reiškia paleista ir išmatuota',
      principle_c_body:
        'Projektas baigtas ne tada, kai kodas parašytas, o kai jis veikia produkcijoje, turi matavimus ir žmogų, kuris žino, kaip jį atnaujinti.',
      node_brief_title: 'Užduotis',
      node_brief_body:
        'Ką reikia pasiekti, kam ir kada. Dažniausiai pirminis aprašymas yra rezultatas, o ne sprendimas - ir taip turi būti.',
      node_constraints_title: 'Ribos',
      node_constraints_body:
        'Biudžetas, terminai, esama infrastruktūra, komandos įgūdžiai. Visa tai įeina į architektūrą kaip įvestis, o ne kaip staigmena pabaigoje.',
      node_data_title: 'Duomenys',
      node_data_body:
        'Kas jau egzistuoja: lentelės, failai, API, skaičiuoklės. Duomenų perkėlimas beveik visada sudėtingesnis, nei atrodo iš pradžių.',
      node_model_title: 'Modelis',
      node_model_body:
        'Objektai, jų ryšiai ir būsenos. Vienas paveikslas, dėl kurio sutariame prieš darbus - čia pakeitimai kainuoja minutes, ne savaites.',
      node_contract_title: 'Kontraktai',
      node_contract_body:
        'API formos, duomenų tipai, klaidų atvejai. Kai jie sutarti, sąsają ir serverį galima kurti nepriklausomai vieną nuo kito.',
      node_interface_title: 'Sąsaja',
      node_interface_body:
        'React komponentai, būsenos, judesys, prieinamumas. Tai, ką vartotojas iš tikrųjų mato, spaudžia ir jaučia.',
      node_services_title: 'Servisai',
      node_services_body:
        'Node.js endpointai, autentifikacija, duomenų bazė, integracijos. Veikia be sąsajos ir yra tikrinami atskirai.',
      node_automation_title: 'Automatizacijos',
      node_automation_body:
        'Suvestinės, eksportas, periodinės užduotys, vidiniai įrankiai - darbas, kurio nebereikia atlikti ranka.',
      node_ship_title: 'Paleidimas',
      node_ship_body:
        'Produkcinis build, aplinkos kintamieji, domenas, matavimai. Paleidimo diena turi būti nuobodi.',
      node_operate_title: 'Priežiūra',
      node_operate_body:
        'Stebėjimas, atnaujinimai, pataisymai. Tai, kas čia pamatuojama, grįžta atgal į modelį - todėl diagramoje yra grįžtamasis ryšys.',
      diagram_title: 'Sistemos modelis',
      diagram_hint: 'Spustelk arba naudok rodyklių klavišus',
      diagram_aria: 'Interaktyvi inžinerinio modelio diagrama',
      diagram_selected: 'Pasirinkta',
      diagram_col_in: 'Įvestis',
      diagram_col_model: 'Modelis',
      diagram_col_build: 'Realizacija',
      diagram_col_out: 'Rezultatas',

      // ===== 03 Work =====
      work_title_new: 'Atrinkti darbai',
      work_lede:
        'Keturi projektai. Be išgalvotų procentų - tik apimtis, vaidmuo, technologijos ir nuoroda, kurią gali atidaryti ir pasitikrinti pats.',
      role: 'Vaidmuo',
      year: 'Metai',
      view_all: 'Visi',
      measured: 'Išmatuota',
      status_label: 'Būklė',
      scope: 'Apimtis',
      challenge: 'Problema',
      solution: 'Sprendimas',
      role_design_build: 'Dizainas ir programavimas',
      role_build_seo: 'Programavimas ir techninis SEO',
      role_prototype: 'Prototipas ir duomenų sluoksnis',

      // ===== 04 Stack =====
      stack_title: 'Technologijos, kurias naudoju',
      stack_lede:
        'Sąrašas trumpas sąmoningai: čia tik tai, kas naudojama 03 skyriuje išvardintuose darbuose arba siūlomose paslaugose.',
      stack_interface: 'Sąsaja',
      stack_runtime: 'Serveris ir duomenys',
      stack_integrations: 'Integracijos',
      stack_delivery: 'Paleidimas ir matavimai',

      // ===== 05 Process =====
      process_title: 'Kaip atrodo darbas su manimi',
      process_lede:
        'Šeši etapai. Po kiekvieno turi kažką konkretaus rankose - ne tik pažadą, kad darbas vyksta.',
      deliverable: 'Ką gauni',
      step_intake_title: 'Susipažinimas',
      step_intake_body:
        'Pokalbis arba laiškas: ką reikia pasiekti, kokios ribos ir kas jau egzistuoja. Pirma konsultacija nemokama.',
      step_intake_out: 'Užduoties aprašas ir sąžininga nuomonė, ar man šis darbas tinka.',
      step_architecture_title: 'Modelis ir sąmata',
      step_architecture_body:
        'Nubraižau sistemos modelį, suderinu apimtį ir pateikiu kainą bei terminą. Šiame etape pakeitimai dar nieko nekainuoja.',
      step_architecture_out: 'Sistemos modelis, apimties aprašas, fiksuota kaina arba valandinis įvertis.',
      step_build_title: 'Realizacija',
      step_build_body:
        'Dirbu etapais ir rodau tarpinius rezultatus. Progresą matai veikiančioje versijoje, o ne ekrano nuotraukose.',
      step_build_out: 'Veikianti testinė versija su nuoroda, kurią gali atidaryti bet kada.',
      step_review_title: 'Peržiūra',
      step_review_body:
        'Kartu pereiname per sąsają, tekstus ir atvejus, kurie gali nepavykti. Pataisymai įeina į apimtį.',
      step_review_out: 'Pataisymų sąrašas ir patvirtinta versija prieš paleidimą.',
      step_launch_title: 'Paleidimas',
      step_launch_body:
        'Domenas, aplinkos kintamieji, produkcinis build, matavimai ir patikra telefone bei kompiuteryje.',
      step_launch_out: 'Gyva svetainė, prieigos ir trumpa dokumentacija, kaip viskas sudėta.',
      step_operate_title: 'Priežiūra',
      step_operate_body:
        'Pasirinktinai: atnaujinimai, pataisymai, nauji skyriai ir stebėjimas. Be šio etapo projektas vis tiek lieka tavo.',
      step_operate_out: 'Mėnesinė priežiūra arba valandinė pagalba - tiek, kiek reikia.',

      // ===== 06 Contact =====
      contact_title_new: 'Papasakok, ką reikia išspręsti',
      contact_lede:
        'Geriausia pradėti nuo problemos, ne nuo sprendimo. Jei dar nežinai, ko tiksliai reikia, parašyk kaip yra - pirmas atsakymas bus klausimai.',
      contact_note:
        'Jei projektas man netinka arba jam nereikia atskiro kūrėjo, pasakysiu iš karto ir, jei galėsiu, pasiūlysiu kitą kelią.',
      local_time: 'Vietos laikas',
      response: 'Atsakymas',
      response_value: 'Paprastai per 24 val. darbo dienomis',
      country_lt: 'Lietuva',
      form_brief_placeholder: 'Ką reikia pasiekti, kokie terminai, kas jau egzistuoja...',
      form_brief_hint: 'Naudinga paminėti: dabartinę svetainę ar sistemą, terminą, biudžeto rėžį.',
      form_error_unknown: 'Nežinoma klaida',
      form_error_config: 'Žinučių servisas nesukonfigūruotas.',
      form_error_prefix: 'Nepavyko išsiųsti žinutės',
      form_sent_success: 'Žinutė išsiųsta. Atsakysiu per 24 val.',
      err_name: 'Įrašyk savo vardą.',
      err_email: 'Įrašyk veikiantį el. pašto adresą.',
      err_message: 'Parašyk bent kelis sakinius apie užduotį.',
      form_sent_note:
        'Atsakysiu per 24 val. darbo dienomis. Jei terminas skuba - parašyk ir apie tai.',
      form_send_another: 'Siųsti dar vieną',
      channel_email: 'El. paštas',
      channels: 'Kontaktai',
      privacy_policy: 'Privatumo politika',
      state_error: 'Klaida',
      state_sent: 'Išsiųsta',
      privacy_note:
        'Duomenys naudojami tik atsakymui. Jie nėra perduodami tretiesiems asmenims.',

      // ===== Footer / 404 =====
      footer_available: 'Priimu naujus projektus',
      colophon: 'React · Tailwind · Vercel',
      rights: 'Visos teisės saugomos',
      not_found_code: 'Resursas nerastas',

    },
  },
  en: {
    translation: {
      // General
      title: 'Lukas Beneta - Services',
      heroText: 'Hi! I’m Lukas, the creator of your website.',
      about: 'About me',
      services: 'Services',
      works: 'My Portfolio',
      contact: 'Contact Me',
      contact_intro: 'If you have any questions or proposals - feel free to reach out!',
      contact_button: 'Contact me',
      close: 'Close',

      // Header/badges
      professional_services: 'Professional Services',
      services_tagline: 'Tailored solutions to bring your digital vision to life',

      // UI labels
      price_label: 'Price',
      starting_from: 'From',
      details: 'Details',
      get_started: 'Get Started',
      trust_fast_delivery: 'Fast Delivery',
      trust_quality_guaranteed: 'Quality Guaranteed',
      trust_modern_tech: 'Modern Technologies',

      // Services (prices without "from")
      service_1_title: 'One-page website',
      service_1_short: 'Perfect for portfolios, business presentations, or events.',
      service_1_long:
        'A one-page website is a great way to present your activity, brand, or event online. I’ll design and code it, take care of SEO basics, and publish it online. It’s a fast and professional way to build online presence - clear, modern, and efficient.',
      service_1_price: '200 €',

      service_2_title: 'Full website',
      service_2_short: 'Multiple pages, SEO optimized, contact form, mobile-friendly.',
      service_2_long:
        'A full website includes multiple sections: homepage, about, services, contact form, and more. It’s fully responsive and optimized for search engines. Ideal for businesses or anyone who needs a complete, scalable web presence.',
      service_2_price: '300 €',

      service_3_title: 'Server development',
      service_3_short: 'I’ll build a backend server (Node.js, Express, MongoDB or MySQL).',
      service_3_long:
        'If you need a backend system to store, manage or process data - I can build it. This includes REST APIs, authentication, user registration, and database integration.',
      service_3_price: '300 €',

      service_4_title: 'Server maintenance (monthly plan)',
      service_4_short: 'Regular maintenance, updates, small fixes.',
      service_4_long:
        'Keep your server stable and secure with regular maintenance. Includes updates, bug fixing, log monitoring, and database optimization.',
      service_4_price: '60 €/month',

      service_5_title: 'Website updates / maintenance',
      service_5_short: 'If you have a site that needs a refresh - I can help!',
      service_5_long:
        'If your site looks outdated or is running slow - I can modernize the design, improve performance, and add new features.',
      service_5_price: '20 €/hour',

      service_6_title: 'Consultation or help',
      service_6_short: 'If something isn’t working or you want advice - feel free to reach out.',
      service_6_long:
        'Sometimes a short conversation is all it takes to find the right path. I can help you choose the right tech, design, or fix a specific issue.',
      service_6_price: 'First consultation is free',

      // Works
      featured_projects: 'Featured Projects',
      works_tagline:
        'A collection of web apps and digital experiences crafted with modern technologies',

      type: {
        website: 'Website',
        dashboard: 'Dashboard',
        landing: 'Landing Page',
      },
      status: {
        live: 'Live',
        demo: 'Demo',
        wip: 'Work in progress',
      },
      visit_live: 'Visit Live',
      view_code: 'Code',

      projects: {
        beneta: {
          title: "beneta.lt",
          kind: "Practice site",
          description: "This site: a single-page interface with a motion system, two languages and a contact form.",
          scope:
            "Art direction, design system, motion system, two languages (LT/EN), contact form, measurement and deployment on Vercel.",
          problem:
            "The site had to be the evidence for the technical claim it makes, without turning into a heavy, slow demo reel.",
          approach:
            "One React app and no extra animation libraries: the canvas field and the SVG diagram are written by hand, motion is defined by shared duration and easing tokens, and the whole choreography switches off under prefers-reduced-motion.",
        },
        fakaunas: {
          title: "FA Kaunas",
          kind: "Youth Football Academy",
          description: "Academy website with registration system and dynamic content.",
          scope:
            "Site structure, content sections, a registration form delivering mail through the Resend API, phone layouts, deployment.",
          problem:
            "Parents had to be able to register from a phone in a couple of minutes, and the academy had to receive every enquiry reliably.",
          approach:
            "The form posts to an Express endpoint that calls the Resend API, so delivery failures surface on the server instead of being lost quietly in the browser. Content sits in clear blocks so the academy can rewrite copy without touching the design.",
        },
        syncara: {
          title: "Syncara",
          kind: "Analytics dashboard",
          description: "Analytics dashboard for visualizing client data and exporting results.",
          scope:
            "Prototype: data pulled from Airtable, authentication through Firebase, charts with Chart.js, CSV export.",
          problem:
            "I wanted to see what manual client reporting would look like if the summaries were generated by a system rather than assembled by hand in a spreadsheet.",
          approach:
            "The data layer is separated from the view: Airtable stays as the source the client already knows how to use, and the dashboard only reads, joins and exports. It was never taken to production, so it is labelled as a demo.",
        },
        bangu: {
          title: "Bangu Klinika",
          kind: "Dental clinic",
          description: "Modern multilingual clinic website, optimized for search engines.",
          scope:
            "Multi-page clinic site, multiple languages with i18next, service and contact sections, technical SEO and metadata.",
          problem:
            "Patients find a clinic on a phone through search, so speed, legible information and correct metadata mattered more than effects.",
          approach:
            "A light React interface with no unnecessary libraries, copy separated into translation files, and semantics and metadata arranged so each page can be indexed on its own.",
        },
      },

      // Contact / modal
      lets_connect: "Let's Connect",
      contact_dialog_title: 'Send a Message',
      contact_dialog_subtitle: "I'll get back to you as soon as possible",
      form_name: 'Your name',
      form_email: 'Your email',
      form_message: 'Your message',
      form_name_placeholder: 'John Doe',
      form_email_placeholder: 'john@example.com',
      form_message_placeholder: 'Tell me about your project...',
      form_send: 'Send',
      form_sending: 'Sending...',
      form_sent_placeholder: 'Message sent successfully!',
      form_verify: 'Please confirm that you’re not a robot.',

      // Not Found
      not_found_title: 'Page not found',
      not_found_subtitle: "The page you're looking for doesn't exist.",
      back_home: 'Back to homepage',

      // About
    about_p1: "I'm Lukas Beneta - a former bartender who swapped a cocktail shaker for a keyboard. Sounds bold, right? But did you know bartending and programming share a lot? Both require rhythm, precision, and… sometimes, patience.",
    about_p2: "I studied at CodeAcademy, where I learned to build functional, aesthetic, and - most importantly - working websites from scratch. Since then, I've been creating, experimenting, and helping others be seen online.",
    about_p3: "I’ve been playing football since I was a kid - and that passion taught me teamwork, persistence, and the will to win at every stage.",
    about_p4: "In my work, I value simplicity, logical structure, and a strong connection with the person I’m building for. I’m at my best when there’s a clear goal - I break it down, structure it, and bring it to life step by step. What matters to me is not just the technical outcome, but the real value it creates for the person using it.",
    about_p5: "If you’re looking for someone who can code and truly understand what you need - chances are we’ll get along great.",

      // ===== Redesign: navigation =====
      nav_index: "Index",
      nav_capabilities: "Capabilities",
      nav_method: "Method",
      nav_work: "Work",
      nav_stack: "Stack",
      nav_process: "Process",
      nav_contact: "Contact",
      nav_aria: "Page sections",
      skip_to_content: "Skip to content",
      switch_language: "Switch language",
      open_menu: "Open menu",

      // ===== 00 Masthead =====
      masthead_sr: "software engineering practice",
      masthead_lede:
        "An independent engineering practice in Klaipeda, Lithuania. I take loosely defined technical problems - web products, backend systems, API integrations, manual workflows - and hand back systems that work and can be measured.",
      cta_brief: "Start a brief",
      cta_model: "Read the model",
      scroll_cue: "Scroll",
      spec_status: "Status",
      spec_status_value: "Available for new work",
      spec_base: "Based",
      spec_base_value: "Klaipeda, Lithuania",
      spec_languages: "Languages",
      spec_languages_value: "Lietuvių / English",
      spec_engagement: "Engagement",
      spec_engagement_value: "Fixed scope or hourly",
      boot_skip: "Press any key to skip",
      boot_status: "Initialising interface",

      // ===== 01 Capabilities =====
      cap_title: "What I build",
      cap_lede:
        "Six capabilities that almost never travel alone on a real project. Select one to see where it has shipped and which of the others it works with.",
      cap_apps_title: "Web applications",
      cap_apps_body:
        "Single and multi-page products in React: a component system, routing, multiple languages, admin surfaces. Design and implementation happen in the same pass, so the interface is never handed over half-finished.",
      cap_backend_title: "Backends and APIs",
      cap_backend_body:
        "REST APIs on Node.js and Express, database schemas in MongoDB or MySQL, registration and sign-in, data processing. Prepared for deployment and for the updates that follow it.",
      cap_integrations_title: "Integrations",
      cap_integrations_body:
        "Wiring software to the services a business already pays for: transactional email, form protection, Firebase, Airtable, third-party APIs. An integration counts as done when it handles failure, not when the happy path works.",
      cap_automation_title: "Automation",
      cap_automation_body:
        "Repetitive manual work moved into code: collecting data, building summaries, exporting it, internal tools. The goal is that the daily routine stops costing somebody an afternoon.",
      cap_performance_title: "Performance and SEO",
      cap_performance_body:
        "Core Web Vitals, bundle budgets, image formats, technical SEO and accessibility. Measured before and after rather than estimated by eye.",
      cap_operations_title: "Operations",
      cap_operations_body:
        "Deployment, environment variables, updates, monitoring and handover. Keep it under maintenance with me, or take the documentation and the access and carry on without me.",
      evidence: "Evidence",
      shared: "shared",
      detail: "Detail",
      rate_card: "Engagements",
      rate_note: "Prices exclude VAT · fixed scope or hourly",

      // ===== 02 Method =====
      method_title: "How an unclear request becomes a system",
      method_lede:
        "On most projects the hard part is not writing the code, it is stating the problem. So the work starts with a model: what the data is, where the limits are, and what exactly counts as working.",
      principle_a_title: "Model first, code second",
      principle_a_body:
        "I write down which objects exist in the system and how they change. If I cannot explain that in one picture, I am not ready to write code yet.",
      principle_b_title: "Constraints outrank features",
      principle_b_body:
        "Budget, deadlines, the systems already in place, and whoever has to maintain it in a year. Constraints decide the architecture; a feature list only fills it in.",
      principle_c_title: "Done means shipped and measured",
      principle_c_body:
        "A project is not finished when the code is written. It is finished when it runs in production, reports on itself, and somebody knows how to update it.",
      node_brief_title: "Request",
      node_brief_body:
        "What has to be achieved, for whom, and by when. The first description is usually an outcome rather than a solution - which is exactly as it should be.",
      node_constraints_title: "Constraints",
      node_constraints_body:
        "Budget, deadlines, existing infrastructure, the skills on hand. All of it enters the architecture as input instead of arriving as a surprise at the end.",
      node_data_title: "Data",
      node_data_body:
        "Whatever already exists: tables, files, APIs, spreadsheets. Moving data is almost always harder than it looks from the outside.",
      node_model_title: "Model",
      node_model_body:
        "Objects, relations and states. One picture we agree on before the build - changes here cost minutes rather than weeks.",
      node_contract_title: "Contracts",
      node_contract_body:
        "API shapes, data types, failure cases. Once they are agreed, the interface and the services can be built independently of each other.",
      node_interface_title: "Interface",
      node_interface_body:
        "React components, state, motion, accessibility. The part a person actually sees, presses and judges.",
      node_services_title: "Services",
      node_services_body:
        "Node.js endpoints, authentication, the database, integrations. They run without the interface and are checked on their own.",
      node_automation_title: "Automation",
      node_automation_body:
        "Summaries, exports, scheduled jobs, internal tools - the work nobody should be doing by hand any more.",
      node_ship_title: "Ship",
      node_ship_body:
        "Production build, environment variables, domain, measurement. Launch day is supposed to be boring.",
      node_operate_title: "Operate",
      node_operate_body:
        "Monitoring, updates, fixes. What gets measured here feeds back into the model, which is why the diagram has a return path.",
      diagram_title: "System model",
      diagram_hint: "Click or use the arrow keys",
      diagram_aria: "Interactive diagram of the engineering model",
      diagram_selected: "Selected",
      diagram_col_in: "Input",
      diagram_col_model: "Model",
      diagram_col_build: "Build",
      diagram_col_out: "Output",

      // ===== 03 Work =====
      work_title_new: "Selected work",
      work_lede:
        "Four projects. No invented percentages - scope, role, stack, and a link you can open and check for yourself.",
      role: "Role",
      year: "Year",
      view_all: "All",
      measured: "Measured",
      status_label: "Status",
      scope: "Scope",
      challenge: "Problem",
      solution: "Approach",
      role_design_build: "Design and build",
      role_build_seo: "Build and technical SEO",
      role_prototype: "Prototype and data layer",

      // ===== 04 Stack =====
      stack_title: "What I work with",
      stack_lede:
        "The list is short on purpose: only what is in use in the work indexed in section 03 or in the services on offer.",
      stack_interface: "Interface",
      stack_runtime: "Runtime and data",
      stack_integrations: "Integrations",
      stack_delivery: "Delivery and measurement",

      // ===== 05 Process =====
      process_title: "What working together looks like",
      process_lede:
        "Six stages. After each one you hold something concrete, not just an assurance that work is happening.",
      deliverable: "You get",
      step_intake_title: "Intake",
      step_intake_body:
        "A call or an email: what needs to happen, what the limits are, what already exists. The first consultation is free.",
      step_intake_out: "A written problem statement and an honest answer on whether I am the right person for it.",
      step_architecture_title: "Model and estimate",
      step_architecture_body:
        "I draw the system model, agree the scope, and quote a price and a timeline. Changes at this stage are still free.",
      step_architecture_out: "System model, scope definition, fixed price or an hourly estimate.",
      step_build_title: "Build",
      step_build_body:
        "Delivered in stages with working previews. You follow progress in a running build rather than in screenshots.",
      step_build_out: "A live staging link you can open at any point.",
      step_review_title: "Review",
      step_review_body:
        "We walk the interface, the copy and the cases that can fail. Fixes are inside the agreed scope.",
      step_review_out: "A fix list and a version signed off for launch.",
      step_launch_title: "Launch",
      step_launch_body:
        "Domain, environment variables, production build, measurement, and a pass on both phone and desktop.",
      step_launch_out: "The live site, your access credentials, and short documentation of how it fits together.",
      step_operate_title: "Operate",
      step_operate_body:
        "Optional: updates, fixes, new sections and monitoring. Skip it and the project is still yours.",
      step_operate_out: "Monthly maintenance or hourly support - as much as you actually need.",

      // ===== 06 Contact =====
      contact_title_new: "Tell me what needs solving",
      contact_lede:
        "Start with the problem rather than the solution. If you are not sure what you need yet, say so - the first reply will be questions.",
      contact_note:
        "If the project is not a fit, or does not need a developer at all, I will say so straight away and point you elsewhere where I can.",
      local_time: "Local time",
      response: "Response",
      response_value: "Usually within 24 hours on weekdays",
      country_lt: "Lithuania",
      form_brief_placeholder: "What needs to happen, by when, and what already exists...",
      form_brief_hint: "Useful to mention: the current site or system, the deadline, a budget range.",
      form_error_unknown: "Unknown error",
      form_error_config: "The message service is not configured.",
      form_error_prefix: "Could not send the message",
      form_sent_success: "Message sent. I reply within 24 hours.",
      err_name: "Please enter your name.",
      err_email: "Enter a valid email address.",
      err_message: "A sentence or two about the task, please.",
      form_sent_note:
        "I reply within 24 hours on weekdays. Say so if your deadline is tight.",
      form_send_another: "Send another",
      channel_email: "Email",
      channels: "Channels",
      privacy_policy: "Privacy policy",
      state_error: "Error",
      state_sent: "Sent",
      privacy_note:
        "Your details are used only to reply. They are never passed to third parties.",

      // ===== Footer / 404 =====
      footer_available: "Available for new work",
      colophon: "React · Tailwind · Vercel",
      rights: "All rights reserved",
      not_found_code: "Resource not found",

    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'lt',
  fallbackLng: 'lt',
  interpolation: {
    escapeValue: false,
  },
});

/*
 * <html lang> is deliberately NOT managed here any more.
 *
 * This module used to set it on import and on every languageChanged event.
 * That is a DOM mutation performed while the module graph is still being
 * evaluated - before React hydrates - so on /en it overwrote the
 * prerendered lang="en" with lang="lt" and hydration then disagreed with
 * the document it was handed.
 *
 * The attribute now belongs to the route: src/root.jsx renders it from the
 * URL, and useLocale() keeps it correct across client-side navigation.
 */

export default i18n;
