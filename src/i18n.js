import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  lt: {
    translation: {
      // Bendra
      title: 'Lukas Beneta - Paslaugos',
      heroText: 'Labas! Aš tavo puslapio kūrėjas Lukas.',
      services: 'Paslaugos',
      contact: 'Susisiekime',
      close: 'Uždaryti',

      // Header/ženkliukai

      // UI etiketės
      starting_from: 'Nuo',

      // Paslaugų kortelės
      service_1_title: 'Vieno puslapio svetainė',
      // be „nuo“ - logika prideda „Nuo “ kortelėje
      service_1_price: '200 €',

      service_2_title: 'Pilna interneto svetainė',
      service_2_price: '300 €',

      service_3_title: 'Serverio sukūrimas',
      service_3_price: '300 €',

      service_4_title: 'Serverio priežiūra (mėnesinis planas)',
      service_4_price: '60 €/mėn',

      service_5_title: 'Svetainės atnaujinimai / priežiūra',
      service_5_price: '20 €/val',

      service_6_title: 'Konsultacija ar pagalba',
      // Nemokama - be „Nuo“
      service_6_price: 'Pirma konsultacija nemokama',

      // Darbai

      status: {
        live: 'Veikia',
        demo: 'Demonstracija',
        wip: 'Vyksta darbai',
      },

      visit_live: 'Peržiūrėti svetainę',

      projects: {
        velgtilbud: {
          title: 'Velgtilbud',
          kind: 'Pasiūlymų palyginimo platforma (Norvegija)',
          description:
            'Norvegiška paslauga, kurioje gyventojai gauna ir palygina kraustymo bei valymo įmonių pasiūlymus. Devynių žingsnių užklausos forma.',
        },
        sei: {
          title: 'Service Experience Index',
          kind: 'Klientų patirties duomenys',
          description:
            'Nepriklausomi, patikrinti klientų patirties duomenys paslaugų verslams.',
        },
        smiletrans: {
          title: 'SMILE Transport',
          kind: 'Transporto įmonės svetainė',
          description:
            'Kelių transporto įmonės svetainė: krovinių pervežimai visoje Europoje, daugiau nei 40 vilkikų autoparkas, kelios kalbos.',
        },
        flore: {
          title: 'Flore studija',
          kind: 'Gėlių studijos el. parduotuvė',
          description:
            'Gėlių studijos svetainė su el. parduotuve: autorinės puokštės, vazoniniai augalai, pristatymas tą pačią dieną.',
        },
        beneta: {
          title: 'beneta.lt',
          kind: 'Praktikos svetainė',
          description: 'Ši svetainė: vieno puslapio sąsaja su judesio sistema, dviem kalbomis ir kontaktų forma.',
          scope:
            "Ką padariau",
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
      form_name: "Jūsų vardas",
      form_email: "Jūsų el. paštas",
      form_message: "Ką norite pasiekti?",
      form_name_placeholder: "Vardas ir pavardė",
      form_email_placeholder: "El. pašto adresas",
      form_send: "Siųsti",
      form_sending: 'Siunčiama...',

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
      nav_capabilities: "Paslaugos",
      nav_method: 'Metodas',
      nav_work: "Darbai",
      nav_stack: 'Technologijos',
      nav_process: "Kaip dirbu",
      nav_contact: "Susisiekti",
      nav_aria: 'Puslapio skyriai',
      skip_to_content: 'Pereiti prie turinio',
      switch_language: 'Pakeisti kalbą',
      open_menu: 'Atidaryti meniu',

      // ===== 00 Masthead =====
      masthead_lede:
        "Kuriu svetaines ir paprastas internetines sistemas smulkiam verslui - nuo idėjos iki veikiančio rezultato. Visą darbą atlieku nuotoliniu būdu.",
      cta_brief: "Gauti pasiūlymą",
      cta_model: "Kainos",
      scroll_cue: 'Žemiau',

      // ===== 01 Capabilities =====
      cap_title: "Kuo galiu padėti",
      cap_lede:
        "Pasirinkite tai, kas labiausiai panašu į jūsų situaciją.",
      cap_apps_title: "Reikia naujos svetainės",
      cap_apps_body:
        "Nuo tuščio lapo iki veikiančios svetainės: dizainas, tekstai, nuotraukos ir paleidimas. Svetainė gerai atrodo telefone ir kompiuteryje.",
      cap_backend_title: 'Serveriai ir API',
      cap_backend_body:
        'Node.js ir Express pagrindu sukurti REST API, duomenų bazių schemos (MongoDB arba MySQL), registracija ir prisijungimas, duomenų apdorojimas. Viskas paruošta talpinimui ir vėlesniems atnaujinimams.',
      cap_integrations_title: 'Integracijos',
      cap_integrations_body:
        'Susiejimas su paslaugomis, kurias verslas jau naudoja: el. pašto siuntimas, formų apsauga, Firebase, Airtable, trečiųjų šalių API. Integracija laikoma baigta tada, kai turi klaidų apdorojimą, o ne tik veikiantį geriausią atvejį.',
      cap_automation_title: "Daug rankinio darbo",
      cap_automation_body:
        "Darbai, kurie dabar daromi ranka - užklausos, rezervacijos, ataskaitos - vyks patys. Sujungiu svetainę su sistemomis, kurias jau naudojate: el. paštu, rezervacijomis, apskaita.",
      cap_performance_title: "Svetainė pasenusi arba lėta",
      cap_performance_body:
        "Atnaujinu išvaizdą ir pagreitinu. Svetainė atsidaro greitai net telefone, todėl lankytojai nebepabėga belaukdami.",
      cap_operations_title: "Reikia rūpintis svetaine",
      cap_operations_body:
        "Rūpinuosi svetaine po paleidimo: atnaujinimai, atsarginės kopijos ir smulkūs teksto bei nuotraukų pakeitimai.",
      evidence: 'Kur panaudota',
      shared: 'susiję',
      detail: 'Detaliau',
      rate_card: 'Paslaugos ir kainos',
      rate_note: "Kainos be PVM. Tikslią kainą pateikiu po nemokamo pokalbio.",

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
      work_title_new: "Darbai",
      work_lede:
        "Tikros svetainės, kurias galite atsidaryti ir pažiūrėti.",
      role: "Ką dariau",
      year: 'Metai',
      view_all: 'Visi',
      measured: 'Išmatuota',
      scope: 'Apimtis',
      challenge: 'Problema',
      solution: 'Sprendimas',
      role_design_build: 'Dizainas ir programavimas',
      role_build: 'Programavimas',
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
      process_title: "Kaip atrodo darbas su Beneta",
      process_lede:
        "Šeši etapai. Po kiekvieno turite kažką konkretaus rankose.",
      deliverable: "Ką gaunate",
      step_intake_title: "Pokalbis",
      step_intake_body:
        "Papasakojate, ko norite pasiekti. Nereikia žinoti techninių dalykų.",
      step_intake_out: "Sąžiningą nuomonę, ar galiu padėti, ir ką siūlyčiau daryti.",
      step_architecture_title: "Pasiūlymas ir kaina",
      step_architecture_body:
        "Parašau, kas įeina, kiek kainuoja ir kada bus padaryta. Kaina fiksuota.",
      step_architecture_out: "Pasiūlymą raštu su fiksuota kaina ir terminu.",
      step_build_title: "Kūrimas",
      step_build_body:
        "Kuriu etapais ir rodau tarpinius rezultatus kiekvieną savaitę.",
      step_build_out: "Nuorodą į veikiančią versiją, kurią galite atidaryti bet kada.",
      step_review_title: "Peržiūra ir pataisymai",
      step_review_body:
        "Kartu peržiūrime svetainę, tekstus ir nuotraukas. Pataisymai įskaičiuoti.",
      step_review_out: "Patvirtintą versiją, paruoštą paleidimui.",
      step_launch_title: "Paleidimas",
      step_launch_body:
        "Svetainė įkeliama į internetą ir patikrinama telefone bei kompiuteryje.",
      step_launch_out: "Gyvą svetainę, prisijungimus ir trumpą paaiškinimą, kaip viskas veikia.",
      step_operate_title: "Priežiūra",
      step_operate_body:
        "Jei reikia - toliau rūpinuosi svetaine: atnaujinimai, kopijos, pakeitimai.",
      step_operate_out: "Ramybę, kad svetaine yra kam pasirūpinti.",

      // ===== 06 Contact =====
      contact_title_new: "Papasakokite apie savo verslą",
      contact_lede:
        "Nebūtina žinoti techninių detalių - užtenka parašyti, ką norite pasiekti.",
      contact_note:
        "Jei pamatysiu, kad jums manęs nereikia arba yra pigesnis būdas - pasakysiu iš karto.",
      response: 'Atsakymas',
      response_value: "Paprastai per 24 val. darbo dienomis",
      form_brief_placeholder: "Pvz.: turiu grožio saloną, reikia svetainės su kainoraščiu ir registracija.",
      form_brief_hint: "Jei turite dabartinę svetainę - įrašykite jos adresą.",
      form_error_unknown: 'Nežinoma klaida',
      form_error_config: 'Žinučių servisas nesukonfigūruotas.',
      form_error_prefix: 'Nepavyko išsiųsti žinutės',
      form_sent_success: "Žinutė išsiųsta. Atsakysiu per 24 val.",
      err_name: "Įrašykite savo vardą.",
      err_email: "Įrašykite veikiantį el. pašto adresą.",
      err_message: "Parašykite bent kelis sakinius apie tai, ko norite.",
      form_sent_note:
        "Atsakysiu per 24 val. darbo dienomis. Jei skubate - parašykite ir apie tai.",
      form_send_another: 'Siųsti dar vieną',
      channel_email: 'El. paštas',
      channels: 'Kontaktai',
      state_error: 'Klaida',
      state_sent: 'Išsiųsta',
      privacy_note:
        "Jūsų duomenys naudojami tik atsakymui. Tretiesiems asmenims neperduodami.",

      // ===== Footer / 404 =====
      footer_available: "Priimu naujus projektus",
      colophon: 'React · Tailwind · Vercel',
      rights: 'Visos teisės saugomos',
      nav_pricing: "Kainos",
      nav_faq: "DUK",
      trust_response: "Atsakau per 24 val. darbo dienomis",
      trust_price: "Fiksuota kaina iš anksto",
      trust_free: "Pirma konsultacija nemokama",
      remote_line: "Dirbu nuotoliniu būdu",
      tech_details: "Techninės detalės",
      cap_seo_title: "Mūsų neranda Google",
      cap_seo_body: "Sutvarkau tai, kas lemia matomumą Google: tekstus, struktūrą ir greitį. Parodau, kas pasikeitė.",
      cap_shop_title: "Reikia el. parduotuvės",
      cap_shop_body: "Internetinė parduotuvė su krepšeliu, apmokėjimu ir pristatymu. Prekes ir kainas keičiate patys.",
      why_title: "Kodėl verta dirbti su Beneta",
      why_price_title: "Aiški kaina prieš pradedant",
      why_price_body: "Pasiūlymą gaunate raštu: kas įeina, kiek kainuoja ir kada bus padaryta.",
      why_progress_title: "Matote progresą kiekvieną savaitę",
      why_progress_body: "Nuoroda į veikiančią versiją, kurią galite atidaryti bet kada.",
      why_speed_title: "Greita svetainė, kurią randa Google",
      why_speed_body: "Greitis ir matomumas sutvarkomi iš karto, o ne po pusmečio.",
      pricing_title: "Kainos",
      pricing_lede: "Trys paketai. Jei jūsų atvejis netelpa - parašykite, pateiksiu sąmatą.",
      pkg_from: "nuo",
      pkg_popular: "Dažniausiai renkamasi",
      pkg_includes: "Kas įeina",
      pkg_choose: "Pasirinkti",
      pkg_onepage_title: "Vieno puslapio svetainė",
      pkg_onepage_for: "Vienai paslaugai, specialistui ar kampanijai.",
      pkg_business_title: "Verslo svetainė",
      pkg_business_for: "Klinikoms, salonams, akademijoms, paslaugų įmonėms. 3-8 puslapiai.",
      pkg_custom_title: "Individualus sprendimas",
      pkg_custom_for: "El. parduotuvėms, rezervacijoms, klientų paskyroms, vidinėms sistemoms.",
      inc_mobile: "Puikiai atrodo telefone",
      inc_form: "Kontaktų forma",
      inc_google: "Pagrindai, kad jus rastų Google",
      inc_speed: "Greitis - atsidaro per 1-2 s",
      inc_analytics: "Lankytojų statistika",
      inc_editing: "Tekstus ir nuotraukas keičiate patys",
      inc_pages: "3-8 puslapiai",
      inc_shop: "Prekės, krepšelis, apmokėjimas",
      inc_booking: "Rezervacijos ar registracija",
      inc_accounts: "Klientų paskyros",
      inc_integrations: "Sujungimas su jūsų sistemomis",
      inc_fixes: "Mėnuo nemokamų pataisymų po paleidimo",
      inc_ownership: "Domenas, svetainė ir failai - jūsų",
      care_title: "Priežiūra po paleidimo",
      care_lede: "Pasirinktinai. Be jos svetainė vis tiek lieka jūsų.",
      care_calm_title: "Ramybė",
      care_calm_body: "Talpinimas, atnaujinimai, atsarginės kopijos ir smulkūs teksto pakeitimai.",
      care_growth_title: "Augimas",
      care_growth_body: "Viskas, kas „Ramybėje“, ir kas mėnesį - patobulinimai bei Google ataskaita.",
      care_month: "/mėn.",
      hourly_title: "Vienkartiniai darbai",
      hourly_body: "Smulkūs pakeitimai ar pagalba - 35 €/val.",
      faq_title: "Dažniausi klausimai",
      faq_price_q: "Kiek kainuoja svetainė?",
      faq_price_a: "Vieno puslapio svetainė - nuo 490 €, verslo svetainė - nuo 990 €. Tikslią kainą pasakau po nemokamo pokalbio, kai žinau, ko reikia.",
      faq_time_q: "Per kiek laiko bus paruošta?",
      faq_time_a: "Vieno puslapio svetainė - 1-2 savaitės, verslo svetainė - 2-4 savaitės. Daugiausia laiko paprastai užtrunka tekstai ir nuotraukos.",
      faq_edit_q: "Ar galėsiu pats keisti tekstus ir nuotraukas?",
      faq_edit_a: "Taip. Parodau, kaip tai daroma, ir palieku trumpą paaiškinimą. Jei nenorite - galiu keisti aš.",
      faq_broken_q: "Kas nutiks, jei kas nors suges?",
      faq_broken_a: "Mėnesį po paleidimo pataisau nemokamai. Vėliau - arba pagal priežiūros planą, arba valandiniu įkainiu.",
      faq_google_q: "Ar svetainė bus rodoma Google?",
      faq_google_a: "Svetainė paruošiama taip, kad Google ją rastų ir suprastų. Kaip aukštai pakilsite, priklauso nuo konkurencijos ir turinio - to niekas negali garantuoti.",
      faq_meet_q: "Ar reikia susitikti gyvai?",
      faq_meet_a: "Ne. Viską darau nuotoliniu būdu - telefonu, el. paštu arba vaizdo skambučiu.",
      faq_owns_q: "Kas priklauso man - domenas, svetainė, failai?",
      faq_owns_a: "Viskas jūsų: domenas, svetainė ir visi failai. Jei kada norėsite dirbti su kitu žmogumi - viską perduodu be jokių kliūčių.",
      about_title: "Kas aš",
      about_body: "Esu Lukas Beneta. Dirbu vienas, todėl kalbate tiesiai su tuo, kuris daro darbą - be projektų vadybininkų ir be perdavimų. Svetaines kuriu nuo 2022 m.",
      remote_label: "Darbo būdas",
      topic_label: "Kas jus domina?",
      topic_new: "Nauja svetainė",
      topic_refresh: "Atnaujinimas",
      topic_shop: "El. parduotuvė",
      topic_other: "Kita",
      budget_label: "Biudžeto rėžis",
      budget_none: "Nenurodyta",
      budget_under500: "iki 500 €",
      budget_500to1000: "500-1000 €",
      budget_1000to2000: "1000-2000 €",
      budget_over2000: "2000 € ir daugiau",
      budget_unsure: "Dar nežinau",
      not_found_code: 'Resursas nerastas',

    },
  },
  en: {
    translation: {
      // General
      title: 'Lukas Beneta - Services',
      heroText: 'Hi! I’m Lukas, the creator of your website.',
      services: 'Services',
      contact: 'Contact Me',
      close: 'Close',

      // Header/badges

      // UI labels
      starting_from: 'From',

      // Services (prices without "from")
      service_1_title: 'One-page website',
      service_1_price: '200 €',

      service_2_title: 'Full website',
      service_2_price: '300 €',

      service_3_title: 'Server development',
      service_3_price: '300 €',

      service_4_title: 'Server maintenance (monthly plan)',
      service_4_price: '60 €/month',

      service_5_title: 'Website updates / maintenance',
      service_5_price: '20 €/hour',

      service_6_title: 'Consultation or help',
      service_6_price: 'First consultation is free',

      // Works

      status: {
        live: 'Live',
        demo: 'Demo',
        wip: 'Work in progress',
      },
      visit_live: 'Visit Live',

      projects: {
        velgtilbud: {
          title: "Velgtilbud",
          kind: "Quote comparison platform (Norway)",
          description:
            "A Norwegian service where households receive and compare quotes from moving and cleaning companies, through a nine-step request form.",
        },
        sei: {
          title: "Service Experience Index",
          kind: "Customer experience data",
          description:
            "Independent, verified customer experience data for service businesses.",
        },
        smiletrans: {
          title: "SMILE Transport",
          kind: "Freight company site",
          description:
            "Road haulage company site: freight across Europe, a fleet of more than 40 trucks, multiple languages.",
        },
        flore: {
          title: "Flore studija",
          kind: "Florist shop",
          description:
            "Florist studio with an online shop: bespoke bouquets, potted plants, same-day delivery.",
        },
        beneta: {
          title: "beneta.lt",
          kind: "Practice site",
          description: "This site: a single-page interface with a motion system, two languages and a contact form.",
          scope:
            "What I did",
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
      form_name: "Your name",
      form_email: "Your email",
      form_message: "What would you like to achieve?",
      form_name_placeholder: "Your name",
      form_email_placeholder: "Your email address",
      form_send: "Send",
      form_sending: 'Sending...',

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
      nav_capabilities: "Services",
      nav_method: "Method",
      nav_work: "Work",
      nav_stack: "Stack",
      nav_process: "How I work",
      nav_contact: "Contact",
      nav_aria: "Page sections",
      skip_to_content: "Skip to content",
      switch_language: "Switch language",
      open_menu: "Open menu",

      // ===== 00 Masthead =====
      masthead_lede:
        "I build websites and simple online tools for small businesses - from the idea to a working result. Everything is done remotely.",
      cta_brief: "Get a quote",
      cta_model: "Pricing",
      scroll_cue: "Scroll",

      // ===== 01 Capabilities =====
      cap_title: "How I can help",
      cap_lede:
        "Pick whichever is closest to your situation.",
      cap_apps_title: "You need a new website",
      cap_apps_body:
        "From a blank page to a working site: design, copy, images and launch. It looks right on a phone and on a desktop.",
      cap_backend_title: "Backends and APIs",
      cap_backend_body:
        "REST APIs on Node.js and Express, database schemas in MongoDB or MySQL, registration and sign-in, data processing. Prepared for deployment and for the updates that follow it.",
      cap_integrations_title: "Integrations",
      cap_integrations_body:
        "Wiring software to the services a business already pays for: transactional email, form protection, Firebase, Airtable, third-party APIs. An integration counts as done when it handles failure, not when the happy path works.",
      cap_automation_title: "Too much manual work",
      cap_automation_body:
        "Work done by hand today - enquiries, bookings, reports - starts happening on its own. I connect the site to the tools you already use.",
      cap_performance_title: "Your site is dated or slow",
      cap_performance_body:
        "I refresh how it looks and make it fast, so visitors stop leaving while they wait.",
      cap_operations_title: "The site needs looking after",
      cap_operations_body:
        "I look after the site after launch: updates, backups, and small text and image changes.",
      evidence: "Evidence",
      shared: "shared",
      detail: "Detail",
      rate_card: "Engagements",
      rate_note: "Prices exclude VAT. I quote exactly after a free conversation.",

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
      work_title_new: "Work",
      work_lede:
        "Real sites you can open and look at.",
      role: "What I did",
      year: "Year",
      view_all: "All",
      measured: "Measured",
      scope: "Scope",
      challenge: "Problem",
      solution: "Approach",
      role_design_build: "Design and build",
      role_build: "Build",
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
      process_title: "What working with Beneta looks like",
      process_lede:
        "Six stages. After each one you hold something concrete.",
      deliverable: "You get",
      step_intake_title: "A conversation",
      step_intake_body:
        "You tell me what you want to achieve. No technical knowledge needed.",
      step_intake_out: "An honest answer on whether I can help, and what I would do.",
      step_architecture_title: "Quote and price",
      step_architecture_body:
        "I write down what is included, what it costs and when it will be done.",
      step_architecture_out: "A written quote with a fixed price and a date.",
      step_build_title: "Building",
      step_build_body:
        "I build in stages and show you progress every week.",
      step_build_out: "A link to a working version you can open at any time.",
      step_review_title: "Review and fixes",
      step_review_body:
        "We go through the site, the copy and the images together. Fixes are included.",
      step_review_out: "A version signed off and ready to launch.",
      step_launch_title: "Launch",
      step_launch_body:
        "The site goes online and is checked on phone and desktop.",
      step_launch_out: "A live site, your logins, and a short explanation of how it all works.",
      step_operate_title: "Looking after it",
      step_operate_body:
        "If you want it: updates, backups and changes, handled for you.",
      step_operate_out: "Not having to think about it.",

      // ===== 06 Contact =====
      contact_title_new: "Tell me about your business",
      contact_lede:
        "You do not need to know any technical details - just say what you want to achieve.",
      contact_note:
        "If I can see you do not need me, or there is a cheaper way, I will say so.",
      response: "Response",
      response_value: "Usually within 24 hours on weekdays",
      form_brief_placeholder: "For example: I run a salon and need a site with prices and online booking.",
      form_brief_hint: "If you have a site already, add its address.",
      form_error_unknown: "Unknown error",
      form_error_config: "The message service is not configured.",
      form_error_prefix: "Could not send the message",
      form_sent_success: "Message sent. I reply within 24 hours.",
      err_name: "Please enter your name.",
      err_email: "Enter a valid email address.",
      err_message: "A sentence or two about what you want, please.",
      form_sent_note:
        "I reply within 24 hours on weekdays. Say so if you are in a hurry.",
      form_send_another: "Send another",
      channel_email: "Email",
      channels: "Channels",
      state_error: "Error",
      state_sent: "Sent",
      privacy_note:
        "Your details are used only to reply. They are never passed to third parties.",

      // ===== Footer / 404 =====
      footer_available: "Available for new work",
      colophon: "React · Tailwind · Vercel",
      rights: "All rights reserved",
      nav_pricing: "Pricing",
      nav_faq: "FAQ",
      trust_response: "I reply within 24 hours",
      trust_price: "A fixed price, agreed up front",
      trust_free: "First conversation is free",
      remote_line: "Working remotely",
      tech_details: "Technical details",
      cap_seo_title: "Google cannot find you",
      cap_seo_body: "I fix what decides whether Google finds you: copy, structure and speed - and show you what changed.",
      cap_shop_title: "You need an online shop",
      cap_shop_body: "An online shop with a basket, payment and delivery. You change the products and prices yourself.",
      why_title: "Why work with Beneta",
      why_price_title: "A clear price before we start",
      why_price_body: "You get it in writing: what is included, what it costs, when it is done.",
      why_progress_title: "You see progress every week",
      why_progress_body: "A link to a working version you can open at any time.",
      why_speed_title: "Fast, and findable on Google",
      why_speed_body: "Speed and visibility are handled from the start, not six months later.",
      pricing_title: "Pricing",
      pricing_lede: "Three packages. If your case does not fit one, write and I will quote it.",
      pkg_from: "from",
      pkg_popular: "Most chosen",
      pkg_includes: "What is included",
      pkg_choose: "Choose this",
      pkg_onepage_title: "One-page website",
      pkg_onepage_for: "A single service, a freelancer, or a campaign.",
      pkg_business_title: "Business website",
      pkg_business_for: "Clinics, salons, academies, service companies. 3-8 pages.",
      pkg_custom_title: "Custom build",
      pkg_custom_for: "Shops, bookings, client accounts, internal tools.",
      inc_mobile: "Looks right on a phone",
      inc_form: "Contact form",
      inc_google: "The basics so Google finds you",
      inc_speed: "Speed - opens in 1-2 s",
      inc_analytics: "Visitor statistics",
      inc_editing: "You change the text and images yourself",
      inc_pages: "3-8 pages",
      inc_shop: "Products, basket, payment",
      inc_booking: "Bookings or registration",
      inc_accounts: "Client accounts",
      inc_integrations: "Connected to your systems",
      inc_fixes: "A month of free fixes after launch",
      inc_ownership: "The domain, the site and the files are yours",
      care_title: "After launch",
      care_lede: "Optional. Without it the site is still entirely yours.",
      care_calm_title: "Calm",
      care_calm_body: "Hosting, updates, backups and small text changes.",
      care_growth_title: "Growth",
      care_growth_body: "Everything in Calm, plus monthly improvements and a Google report.",
      care_month: "/mo",
      hourly_title: "One-off work",
      hourly_body: "Small changes or help - 35 EUR/h.",
      faq_title: "Common questions",
      faq_price_q: "What does a website cost?",
      faq_price_a: "A one-pager starts at 490 EUR, a business site at 990 EUR. I quote exactly after a free conversation.",
      faq_time_q: "How long does it take?",
      faq_time_a: "One page: 1-2 weeks. A business site: 2-4 weeks. Copy and photos usually take the longest.",
      faq_edit_q: "Can I change the text and images myself?",
      faq_edit_a: "Yes. I show you how and leave a short guide. If you would rather not, I can do it.",
      faq_broken_q: "What if something breaks?",
      faq_broken_a: "For a month after launch I fix it free. After that, on a care plan or hourly.",
      faq_google_q: "Will the site show up on Google?",
      faq_google_a: "The site is built so Google can find and understand it. How high you rank depends on competition and content, which nobody can guarantee.",
      faq_meet_q: "Do we need to meet in person?",
      faq_meet_a: "No. Everything is done remotely - phone, email or a video call.",
      faq_owns_q: "What do I own?",
      faq_owns_a: "All of it: the domain, the site and every file. If you ever move to someone else, I hand it over without obstruction.",
      about_title: "Who I am",
      about_body: "I am Lukas Beneta. I work alone, so you speak directly to the person doing the work - no account managers, no handovers.",
      remote_label: "Working",
      topic_label: "What are you after?",
      topic_new: "A new website",
      topic_refresh: "A refresh",
      topic_shop: "An online shop",
      topic_other: "Something else",
      budget_label: "Budget range",
      budget_none: "Prefer not to say",
      budget_under500: "under EUR 500",
      budget_500to1000: "EUR 500-1,000",
      budget_1000to2000: "EUR 1,000-2,000",
      budget_over2000: "over EUR 2,000",
      budget_unsure: "Not sure yet",
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
