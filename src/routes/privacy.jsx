import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useLocale } from "../design/locale";
import { buildMeta } from "../design/seo";
import { CHANNELS, LEGAL, PRACTICE } from "../design/content";

export const meta = () =>
  buildMeta({
    locale: "lt",
    title: "Privatumo politika | Beneta",
    description:
      "Kokius asmens duomenis renka beneta.lt, kam jie naudojami, kiek saugomi, kam perduodami ir kaip pasinaudoti savo teisėmis.",
    path: "privatumas",
    translated: false,
  });

/**
 * DRAFT - the badge stays until the owner has read this and said otherwise.
 *
 * Everything here describes what the code actually does, which is why a few
 * things differ from the text this was drafted from:
 *
 *  - Google Analytics was removed rather than disclosed. It sets cookies, so
 *    keeping it would have required a consent banner before gtag may load.
 *  - Vercel Web Analytics is not installed; counter.dev already counts
 *    visits without cookies, so section 5 names that instead.
 *  - No reCAPTCHA. The "reCAPTCHA" and "GA4" strings in content.js are
 *    entries in the skills list, not integrations on this site.
 *  - LEGAL is empty, so section 1 renders a name and an address and no
 *    registration line. Filling LEGAL in content.js adds it here.
 *
 * Anything added to this page must be checked against the code the same way.
 */

const UPDATED = "2026-11-01";

/** A paragraph, or a list with an optional lead-in. */
const SECTIONS = [
  {
    h: "1. Kas tvarko jūsų duomenis",
    body: [
      `Duomenų valdytojas – ${PRACTICE.name}.`,
      LEGAL.entity || LEGAL.code
        ? [LEGAL.entity, LEGAL.code].filter(Boolean).join(", ")
        : null,
      CHANNELS.email ? `El. paštas: ${CHANNELS.email}` : null,
      "Visais klausimais dėl duomenų rašykite šiuo el. pašto adresu.",
    ].filter(Boolean),
  },
  {
    h: "2. Kokius duomenis renku",
    body: [
      "Kontaktų forma: vardą, el. pašto adresą, žinutės tekstą, o jei pasirenkate – temą ir biudžeto rėžį. Šių duomenų reikia tam, kad galėčiau jums atsakyti; be jų užklausos išsiųsti negalėsite.",
      "Jei dirbame kartu: susirašinėjimą, sąskaitoms reikalingus rekvizitus ir su projektu susijusią medžiagą, kurią man pateikiate.",
      "Techniniai duomenys: lankantis svetainėje serveris automatiškai fiksuoja techninę informaciją (pvz., IP adresą, naršyklės tipą, apsilankymo laiką). Tai būtina svetainės veikimui ir saugumui.",
    ],
  },
  {
    h: "3. Kam naudoju duomenis ir kuo remiuosi",
    list: [
      "Atsakyti į jūsų užklausą ir pateikti pasiūlymą – veiksmai jūsų prašymu prieš sudarant sutartį (BDAR 6 str. 1 d. b p.).",
      "Vykdyti sutartį, jei dirbame kartu – sutarties vykdymas (BDAR 6 str. 1 d. b p.).",
      "Išrašyti sąskaitas ir saugoti apskaitos dokumentus – teisinė prievolė (BDAR 6 str. 1 d. c p.).",
      "Užtikrinti svetainės veikimą ir saugumą – teisėtas interesas (BDAR 6 str. 1 d. f p.).",
      "Anoniminė lankomumo statistika – teisėtas interesas tobulinti svetainę (BDAR 6 str. 1 d. f p.).",
    ],
    after: [
      "Nesiunčiu naujienlaiškių, nenaudoju jūsų duomenų reklamai ir jų neparduodu. Automatizuotų sprendimų ar profiliavimo nevykdau.",
    ],
  },
  {
    h: "4. Kiek laiko saugau",
    list: [
      "Užklausos, po kurių bendradarbiavimas neprasidėjo – iki 12 mėnesių.",
      "Su klientais – visą bendradarbiavimo laiką ir 3 metus po jo pabaigos.",
      "Sąskaitos ir apskaitos dokumentai – tiek, kiek reikalauja Lietuvos teisės aktai (paprastai 10 metų).",
      "Serverio techniniai įrašai – trumpai, kiek nustato prieglobos paslaugos teikėjas.",
    ],
    after: ["Pasibaigus terminui duomenis ištrinu."],
  },
  {
    h: "5. Kas dar gali matyti duomenis",
    body: [
      "Duomenų niekam neperduodu, išskyrus paslaugų teikėjus, be kurių svetainė ir susirašinėjimas neveiktų. Jie tvarko duomenis tik mano nurodymu:",
    ],
    list: [
      "EmailJS (EmailJS Pte. Ltd., Singapūras; serveriai JAV) – pristato kontaktų formos žinutes į mano el. paštą.",
      "Google (Gmail) – mano el. pašto paslauga.",
      "Vercel Inc. (JAV) – svetainės priegloba.",
      "counter.dev – anoniminė lankomumo statistika be slapukų.",
    ],
    after: [
      "Dalis šių paslaugų teikėjų duomenis tvarko už Europos ekonominės erdvės ribų (JAV). Tokiu atveju duomenų perdavimas grindžiamas ES–JAV duomenų privatumo sistema arba Europos Komisijos patvirtintomis standartinėmis sutarčių sąlygomis.",
      "Duomenis taip pat galiu pateikti valstybės institucijoms, jei to reikalauja įstatymai.",
    ],
  },
  {
    h: "6. Jūsų teisės",
    body: ["Jūs turite teisę:"],
    list: [
      "sužinoti, kokius jūsų duomenis turiu, ir gauti jų kopiją;",
      "paprašyti ištaisyti netikslius duomenis;",
      "paprašyti ištrinti duomenis;",
      "paprašyti apriboti jų tvarkymą;",
      "nesutikti, kad duomenys būtų tvarkomi remiantis teisėtu interesu;",
      "gauti savo duomenis kompiuteriu skaitomu formatu ir perduoti juos kitam.",
    ],
    after: [
      CHANNELS.email
        ? `Norėdami pasinaudoti teisėmis, rašykite ${CHANNELS.email}. Atsakysiu ne vėliau kaip per 1 mėnesį. Kai kurių duomenų (pvz., sąskaitų) negalėsiu ištrinti anksčiau, nei leidžia įstatymai – tokiu atveju apie tai pranešiu.`
        : "Norėdami pasinaudoti teisėmis, parašykite man. Atsakysiu ne vėliau kaip per 1 mėnesį.",
      "Jei manote, kad jūsų duomenys tvarkomi netinkamai, galite pateikti skundą Valstybinei duomenų apsaugos inspekcijai (vdai.lrv.lt). Visgi pirmiausia parašykite man – dažniausiai viską galima išspręsti greičiau.",
    ],
  },
  {
    h: "7. Saugumas",
    body: [
      "Duomenis saugau tik patikimose paslaugose su apsaugotu prisijungimu. Svetainė veikia per šifruotą HTTPS ryšį.",
    ],
  },
  {
    h: "8. Slapukai",
    body: [
      "Svetainė nenaudoja reklaminių ar sekimo slapukų. Lankomumo statistika renkama be slapukų ir neleidžia jūsų atpažinti. Jei pasirenkate kalbą ar panašius nustatymus, jie gali būti išsaugoti jūsų naršyklėje – tai būtina svetainės veikimui ir sutikimo nereikia.",
    ],
  },
  {
    h: "9. Pakeitimai",
    body: [
      "Šią politiką galiu atnaujinti, pvz., pasikeitus naudojamoms paslaugoms. Naujausia versija visada skelbiama šiame puslapyje.",
    ],
  },
];

export default function Privacy() {
  const { t } = useTranslation();
  useLocale("lt");

  return (
    <div className="shell section">
      <nav aria-label="Breadcrumb" className="label">
        <Link to="/" className="signal-link">
          {t("nav_index")}
        </Link>{" "}
        / Privatumo politika
      </nav>

      <h1 className="display-l mt-6">Privatumo politika</h1>

      <p
        className="label mt-4 inline-block border px-3 py-2"
        style={{ borderColor: "var(--signal)", color: "var(--signal)" }}
      >
        Juodraštis &ndash; peržiūrėti prieš publikuojant
      </p>

      <div className="mt-12 max-w-[62ch]">
        <p className="lede">
          Ši politika paaiškina, kokius asmens duomenis renku per svetainę{" "}
          {PRACTICE.domain}, kam juos naudoju, kiek laiko saugau ir kokias
          teises turite. Rašau paprastai, be teisinio žargono.
        </p>

        {SECTIONS.map((s) => (
          <section key={s.h} className="mt-12">
            <h2 className="text-xl font-semibold tracking-display">{s.h}</h2>

            {s.body?.map((p) => (
              <p key={p} className="copy mt-3">
                {p}
              </p>
            ))}

            {s.list && (
              <ul className="mt-4 space-y-2.5">
                {s.list.map((item) => (
                  <li key={item} className="copy flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-1.5 w-1.5 shrink-0"
                      style={{ background: "var(--signal)" }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {s.after?.map((p) => (
              <p key={p} className="copy mt-4">
                {p}
              </p>
            ))}
          </section>
        ))}

        <p className="label mt-14">Atnaujinta: {UPDATED}</p>
      </div>
    </div>
  );
}
