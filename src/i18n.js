import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  lt: {
    translation: {
      // Bendra
      title: 'Lukas Beneta – Paslaugos',
      heroText: 'Labas! Aš tavo puslapio kūrėjas Lukas.',
      about: 'Apie mane',
      services: 'Paslaugos',
      works: 'Mano darbai',
      contact: 'Susisiekime',
      contact_intro: 'Jei turi klausimų ar pasiūlymų – drąsiai rašyk!',
      contact_button: 'Parašyk man',

      // Apie
      about_p1: 'Aš esu Lukas Beneta – buvęs barmenas, kuris iškeitė kokteilių plaktuvą į klaviatūrą. Taip, skamba drąsiai, bet ar žinojai, kad programavimas ir barmenavimas turi kažką bendro? Abu reikalauja ritmo, kruopštumo ir... kartais – kantrybės.',
      about_p2: 'Mokiausi CodeAcademy, kur išmokau nuo nulio kurti funkcionalius, estetiškus ir svarbiausia – veikiančius puslapius. Nuo to laiko – kuriu, eksperimentuoju ir padedu kitiems būti matomiems internete.',
      about_p3: 'Nuo mažens žaidžiu futbolą ir tą aistrą nešuosi iki dabar – tai mane išmokė komandinio darbo, užsispyrimo ir siekio laimėti kiekviename etape.',
      about_p4: 'Dirbdamas labiausiai vertinu paprastumą, logišką struktūrą ir tvirtą ryšį su žmogumi, kuriam kuriu. Esu stipriausias tada, kai turiu aiškų tikslą, galiu jį suprasti, suskaidyti į etapus ir nuosekliai įgyvendinti. Man svarbu ne tik techninis rezultatas, bet ir tai, kad jis kurtų vertę žmogui, kuriam jis skirtas.',
      about_p5: 'Jei nori žmogaus, kuris ne tik suprogramuos, bet ir supras, ko tau reikia – mes tikrai sutarsime.',

      // Paslaugos
      price_label: 'Kaina',

      service_1_title: 'Vieno puslapio svetainė',
      service_1_short: 'Tinka portfolio, verslo pristatymui, renginiams.',
      service_1_long: 'Tai vieno puslapio svetainė, idealiai tinkanti pristatyti savo veiklą, projektą ar renginį. Sukursiu unikalų dizainą, pasirūpinsiu programavimu, SEO pagrindais ir įkelsiu svetainę į serverį. Tai greitas ir efektyvus būdas būti internete – aiškiai, patraukliai ir profesionaliai.',
      service_1_price: 'nuo 200 €',

      service_2_title: 'Pilna interneto svetainė',
      service_2_short: 'Keletas puslapių, SEO optimizacija, kontaktų forma, pritaikyta mobiliesiems.',
      service_2_long: 'Pilna svetainė – tai daugiau nei vienas puslapis. Įprastai ji apima pagrindinį puslapį, apie puslapį, paslaugas, kontaktų formą ir kitus skyrius. Svetainė bus patogi naudoti tiek kompiuteryje, tiek telefone, o turinys bus optimizuotas Google paieškai. Tai rimtas sprendimas tiems, kas nori būti matomi internete iš visų pusių.',
      service_2_price: 'nuo 300 €',

      service_3_title: 'Serverio sukūrimas',
      service_3_short: 'Sukursiu backend serverį (Node.js, Express, MongoDB ar MySQL).',
      service_3_long: 'Jei tau reikia „vidinės“ sistemos, kuri saugo, valdo ar apdoroja duomenis – tuomet reikia serverio. Galiu sukurti REST API, vartotojų registraciją, prisijungimą, duomenų bazės ryšį ir paruošti viską talpinimui. Tinka tiek paprastoms, tiek sudėtingesnėms sistemoms.',
      service_3_price: 'nuo 300 €',

      service_4_title: 'Serverio priežiūra (mėnesinis planas)',
      service_4_short: 'Reguliari priežiūra, atnaujinimai, mažų problemų sprendimas.',
      service_4_long: 'Kad tavo serveris veiktų sklandžiai – jį reikia prižiūrėti. Siūlau mėnesinę priežiūrą, kuri apima atnaujinimus, klaidų sprendimą, log failų analizę ir duomenų bazės priežiūrą. Tai idealu tiems, kurie nori stabilumo be rūpesčių.',
      service_4_price: 'nuo 60 €/mėn',

      service_5_title: 'Svetainės atnaujinimai / priežiūra',
      service_5_short: 'Jei turi puslapį, kurį reikia „pagyvinti“ ar atnaujinti – galiu padėti!',
      service_5_long: 'Tavo svetainė veikia, bet atrodo pasenusi, lėta ar netinkama šių dienų vartotojams? Galiu ją atnaujinti vizualiai, patobulinti veikimą, pridėti naujas funkcijas ir pasirūpinti, kad viskas būtų modernu ir patogu.',
      service_5_price: 'nuo 20 €/val',

      service_6_title: 'Konsultacija ar pagalba',
      service_6_short: 'Jei kažkas neveikia arba nori pasitarti dėl projekto – rašyk drąsiai.',
      service_6_long: 'Kartais užtenka tik vieno pokalbio, kad rasti tinkamą kryptį. Galiu patarti dėl technologijos pasirinkimo, dizaino, funkcionalumo ar padėti išspręsti konkrečią problemą. Pirmą kartą – nieko nekainuos.',
      service_6_price: 'Pirma konsultacija nemokama',

      // Darbai
      works_intro_1: 'Čia galėtų būti tavo projektas. Bet jo dar nėra – ne todėl, kad nedirbu, o todėl, kad dar neužsakei mano paslaugų.',
      works_intro_2: 'Kai tik pradėsim dirbti kartu, pažadu, tavo projektas čia švytės kaip pavyzdys visiems.',
      works_outro: 'Kol kas dar laukiu tavo žinutės – gal tai bus pradžia naujam bendradarbiavimui?',

      // Kontaktų forma
      form_name: "Tavo vardas",
      form_email: "Tavo el. paštas",
      form_message: "Tavo žinutė",
      form_send: "Siųsti",
      form_sending: "Siunčiama...",
      form_sent_placeholder: "Žinutė sėkmingai išsiųsta!",
      form_verify: "Prašome patvirtinti, kad nesate robotas.",

      // Nerastas puslapis
      not_found_title: "Toks puslapis neegzistuoja",
      not_found_subtitle: "Puslapis, kurio ieškai, nerastas.",
      back_home: "Grįžti į pradžą",
    },
  },
  en: {
    translation: {
      // General
      title: 'Lukas Beneta – Services',
      heroText: 'Hi! I’m Lukas, the creator of your website.',
      about: 'About me',
      services: 'Services',
      works: 'My Portfolio',
      contact: 'Contact Me',
      contact_intro: 'If you have any questions or proposals – feel free to reach out!',
      contact_button: 'Contact me',

      // About
      about_p1: "I'm Lukas Beneta – a former bartender who swapped a cocktail shaker for a keyboard. Sounds bold, right? But did you know bartending and programming share a lot? Both require rhythm, precision, and… sometimes, patience.",
      about_p2: "I studied at CodeAcademy, where I learned to build functional, aesthetic, and – most importantly – working websites from scratch. Since then, I've been creating, experimenting, and helping others be seen online.",
      about_p3: "I’ve been playing football since I was a kid – and that passion taught me teamwork, persistence, and the will to win at every stage.",
      about_p4: "In my work, I value simplicity, logical structure, and a strong connection with the person I’m building for. I’m at my best when there’s a clear goal – I break it down, structure it, and bring it to life step by step. What matters to me is not just the technical outcome, but the real value it creates for the person using it.",
      about_p5: "If you’re looking for someone who can code and truly understand what you need – chances are we’ll get along great.",

      // Services
      price_label: 'Price',

      service_1_title: 'One-page website',
      service_1_short: 'Perfect for portfolios, business presentations, or events.',
      service_1_long: 'A one-page website is a great way to present your activity, brand, or event online. I’ll design and code it, take care of SEO basics, and publish it online. It’s a fast and professional way to build online presence – clear, modern, and efficient.',
      service_1_price: 'from 200 €',

      service_2_title: 'Full website',
      service_2_short: 'Multiple pages, SEO optimized, contact form, mobile-friendly.',
      service_2_long: "A full website includes multiple sections: homepage, about, services, contact form, and more. It’s fully responsive and optimized for search engines. Ideal for businesses or anyone who needs a complete, scalable web presence.",
      service_2_price: 'from 300 €',

      service_3_title: 'Server development',
      service_3_short: 'I’ll build a backend server (Node.js, Express, MongoDB or MySQL).',
      service_3_long: 'If you need a backend system to store, manage or process data – I can build it. This includes REST APIs, authentication, user registration, and database integration. Suitable for simple or complex web projects.',
      service_3_price: 'from 300 €',

      service_4_title: 'Server maintenance (monthly plan)',
      service_4_short: 'Regular maintenance, updates, small fixes.',
      service_4_long: 'Keep your server stable and secure with regular maintenance. Includes updates, bug fixing, log monitoring, and database optimization. Perfect for anyone who wants peace of mind without the hassle.',
      service_4_price: 'from 60 €/month',

      service_5_title: 'Website updates / maintenance',
      service_5_short: 'If you have a site that needs a refresh – I can help!',
      service_5_long: 'If your site looks outdated or is running slow – I can modernize the design, improve performance, and add new features. A smart way to bring life back to an old website.',
      service_5_price: 'from 20 €/hour',

      service_6_title: 'Consultation or help',
      service_6_short: 'If something isn’t working or you want advice – feel free to reach out.',
      service_6_long: 'Sometimes a short conversation is all it takes to find the right path. I can help you choose the right tech, design, or fix a specific issue. First consultation is completely free.',
      service_6_price: 'First consultation is free',

      // Works
      works_intro_1: 'This could be your project. But it’s not here yet – not because I’m not working, but because you haven’t reached out yet.',
      works_intro_2: 'As soon as we start working together, I promise your project will shine here as an example for all.',
      works_outro: 'For now, I’m still waiting for your message – maybe that’s how our collaboration will begin? ',

      // Contact form
      form_name: "Your name",
      form_email: "Your email",
      form_message: "Your message",
      form_send: "Send",
      form_sent_placeholder: "Message sent successfully!",
      form_sending: "Sending...",
      form_verify: "Please confirm that you’re not a robot.",

      // Not Found
      not_found_title: "Page not found",
      not_found_subtitle: "The page you're looking for doesn't exist.",
      back_home: "Back to homepage",
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
