import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  lt: {
    translation: {
      title: 'Lukas Beneta – Paslaugos',
      heroText: 'Sveiki atvykę į mano svetainę!',
      about: 'Apie mane',
      services: 'Paslaugos',
      works: 'Mano darbai',
      contact: 'Susisiekime',

      about_p1: 'Sveikas! Aš esu Lukas Beneta – buvęs barmenas, kuris iškeitė kokteilių plaktuvą į klaviatūrą. Taip, skamba drąsiai, bet ar žinojai, kad programavimas ir barmenavimas turi kažką bendro? Abu reikalauja ritmo, kruopštumo ir... kartais – kantrybės su „įdomiais klientais“. 😄',
      about_p2: 'Mokiausi CodeAcademy, kur išmokau nuo nulio kurti funkcionalius, estetiškus ir svarbiausia – veikiančius puslapius. Nuo to laiko – kuriu, eksperimentuoju ir padedu kitiems būti matomiems internete.',
      about_p3: 'Turiu silpnybę geram dizainui, švariems kodams ir klientams, kurie sako: „Lukai, aš net nežinau ko noriu, bet padaryk, kad būtų gražu.“ 🤝',
      about_p4: 'Nuo mažens žaidžiu futbolą ir tą aistrą nešuosi iki dabar – tai mane išmokė komandinio darbo, užsispyrimo ir siekio laimėti kiekviename etape ⚽️.',
      about_p5: 'Jei nori žmogaus, kuris ne tik suprogramuos, bet ir supras, ko tau reikia – labai gali būti, kad mes puikiai sutarsime. O jei dar ir kavą mėgsti – gal net tapsim draugais ☕️.',

      price_label: 'Kaina',

      service_1_title: 'Vieno puslapio svetainė',
      service_1_short: 'Tinka portfolio, verslo pristatymui, renginiams.',
      service_1_long: 'Šis paketas apima dizaino sukūrimą, programavimą, SEO pagrindus ir publikavimą. Tinkamas tiems, kam reikia aiškios, greitos ir patrauklios reprezentacijos internete.',
      service_1_price: 'nuo 150 €',

      service_2_title: 'Pilna interneto svetainė',
      service_2_short: 'Keletas puslapių, SEO optimizacija, kontaktų forma, pritaikyta mobiliesiems.',
      service_2_long: 'Ši paslauga apima visą svetainės architektūrą: pagrindinis, apie, kontaktai, paslaugos puslapiai. Visas turinys optimizuotas mobiliesiems ir paieškos sistemoms.',
      service_2_price: 'nuo 300 €',

      service_3_title: 'Serverio sukūrimas',
      service_3_short: 'Sukursiu backend serverį (Node.js, Express, MongoDB ar MySQL).',
      service_3_long: 'Kuriu REST API arba pilnus serverius su vartotojų registracija, duomenų bazėmis, autentifikacija ir pasiruošimu talpinimui.',
      service_3_price: 'nuo 200 €',

      service_4_title: 'Serverio priežiūra (mėnesinis planas)',
      service_4_short: 'Reguliari priežiūra, atnaujinimai, mažų problemų sprendimas.',
      service_4_long: 'Galiu pasirūpinti tavo serverio veikimu – atnaujinimai, logų analizė, duomenų bazės optimizacija. Tinka tiems, kurie nenori rūpintis technika.',
      service_4_price: 'nuo 40 €/mėn',

      service_5_title: 'Svetainės atnaujinimai / priežiūra',
      service_5_short: 'Jei turi puslapį, kurį reikia „pagyvinti“ ar atnaujinti – galiu padėti!',
      service_5_long: 'Jei tavo puslapis atrodo senstelėjęs, sulėtėjęs arba nebeatitinka dabartinių poreikių – galiu atnaujinti dizainą, kodą ir funkcionalumą.',
      service_5_price: 'nuo 25 €/val',

      service_6_title: 'Konsultacija ar pagalba',
      service_6_short: 'Jei kažkas neveikia arba nori pasitarti dėl projekto – rašyk drąsiai.',
      service_6_long: 'Jei nori pasitarti dėl technologijos pasirinkimo, dizaino idėjų ar tiesiog turi klausimų apie savo svetainę – esu pasiruošęs padėti.',
      service_6_price: 'nemokama pirmam kartui ☕️',

      works_intro_1: 'Čia galėtų būti tavo projektas. Bet jo dar nėra – ne todėl, kad nedirbu, o todėl, kad dar neužsakei mano paslaugų',
      works_intro_2: 'Kai tik pradėsim dirbti kartu, pažadu, tavo projektas čia švytės kaip pavyzdys visiems.',
      works_outro: 'Kol kas dar laukiu tavo žinutės – gal tai bus pradžia naujam bendradarbiavimui? 🤝',
    },
  },
  en: {
    translation: {
      title: 'Lukas Beneta – Services',
      heroText: 'Welcome to my website!',
      about: 'About me',
      services: 'Services',
      works: 'My work',
      contact: 'Contact',

      about_p1: "Hi! I'm Lukas Beneta – a former bartender who swapped a cocktail shaker for a keyboard. Sounds bold, right? But did you know bartending and programming share a lot? Both require rhythm, precision, and… sometimes, patience with 'interesting clients'. 😄",
      about_p2: "I studied at CodeAcademy, where I learned to build functional, aesthetic, and – most importantly – working websites from scratch. Since then, I've been creating, experimenting, and helping others be seen online.",
      about_p3: "I'm passionate about good design, clean code, and clients who say: 'Lukas, I don’t even know what I want – just make it beautiful.' 🤝",
      about_p4: "I’ve been playing football since I was a kid – and that passion taught me teamwork, persistence, and the will to win at every stage ⚽️.",
      about_p5: "If you’re looking for someone who can code and truly understand what you need – chances are we’ll get along great. And if you like coffee – we might even become friends ☕️.",

      price_label: 'Price',

      service_1_title: 'One-page website',
      service_1_short: 'Perfect for portfolios, business intros, events.',
      service_1_long: 'This package includes design, development, basic SEO, and deployment. Great for clear, quick, and attractive online presence.',
      service_1_price: 'from €150',

      service_2_title: 'Full website',
      service_2_short: 'Multiple pages, SEO optimized, contact form, mobile-friendly.',
      service_2_long: 'This service covers full website structure: homepage, about, contact, services. All content is mobile- and SEO-friendly.',
      service_2_price: 'from €300',

      service_3_title: 'Server development',
      service_3_short: 'I’ll build a backend server (Node.js, Express, MongoDB or MySQL).',
      service_3_long: 'I build REST APIs or full servers with user registration, database, authentication, and deployment setup.',
      service_3_price: 'from €200',

      service_4_title: 'Server maintenance (monthly plan)',
      service_4_short: 'Regular maintenance, updates, small fixes.',
      service_4_long: 'I’ll take care of your server – updates, logs, DB optimization. Perfect if you don’t want to deal with tech.',
      service_4_price: 'from €40/month',

      service_5_title: 'Website updates / maintenance',
      service_5_short: 'If you have a site that needs a refresh – I can help!',
      service_5_long: 'If your site looks outdated or is too slow, I can refresh the design, code, and features.',
      service_5_price: 'from €25/hour',

      service_6_title: 'Consultation or help',
      service_6_short: 'If something isn’t working or you want advice – feel free to reach out.',
      service_6_long: 'Whether it’s choosing the right tech, design advice, or questions about your site – I’m here to help.',
      service_6_price: 'first time free ☕️',

      works_intro_1: 'This could be your project. But it’s not here yet – not because I’m not working, but because you haven’t ordered my services',
      works_intro_2: 'As soon as we start working together, I promise your project will shine here as an example for all.',
      works_outro: 'For now, I’m still waiting for your message – maybe that’s how our collaboration will begin? 🤝',
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

export default i18n;
