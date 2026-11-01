import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useLocale } from "../design/locale";
import { buildMeta } from "../design/seo";
import { CHANNELS, PRACTICE } from "../design/content";

export const meta = () =>
  buildMeta({
    locale: "lt",
    title: "Privatumo politika | Beneta",
    description:
      "Kokius duomenis renka beneta.lt kontaktų forma, kam jie naudojami, kiek saugomi ir kaip paprašyti juos ištrinti.",
    path: "privatumas",
    translated: false,
  });

/**
 * DRAFT - needs the owner's review before it can be relied on.
 *
 * Written in plain Lithuanian for the one thing this site actually
 * collects: a name, an email address and a message, submitted through the
 * contact form and delivered by EmailJS. It deliberately does not claim
 * anything the site does not do.
 */
export default function Privacy() {
  const { t } = useTranslation();
  useLocale("lt");

  const sections = [
    {
      h: "Kokius duomenis renku",
      p: "Tik tuos, kuriuos pats įrašote į kontaktų formą: vardą, el. pašto adresą ir žinutės tekstą. Jei pasirenkate biudžeto rėžį ar temą, jie įrašomi į tą pačią žinutę.",
    },
    {
      h: "Kam juos naudoju",
      p: "Tik tam, kad atsakyčiau į jūsų užklausą ir, jei nuspręsime dirbti kartu, susitarčiau dėl darbo. Nesiunčiu naujienlaiškių ir neperduodu duomenų tretiesiems asmenims rinkodarai.",
    },
    {
      h: "Kas mato duomenis",
      p: "Aš. Žinutes pristato paslauga EmailJS, o laiškai pasiekia mano el. pašto dėžutę – tai techniniai tarpininkai, ne gavėjai.",
    },
    {
      h: "Kiek laiko saugau",
      p: "Susirašinėjimą laikau tol, kol jis gali būti reikalingas: aktyvių projektų – visą darbo laiką ir garantinį laikotarpį, neįvykusių užklausų – iki 12 mėnesių.",
    },
    {
      h: "Jūsų teisės",
      p: "Galite bet kada paprašyti pamatyti, pataisyti arba ištrinti savo duomenis. Parašykite ir ištrinsiu per 30 dienų.",
    },
    {
      h: "Slapukai",
      p: "Svetainė naudoja lankytojų skaičiavimo įrankius statistikai. Jie nenaudojami reklamai ir neidentifikuoja jūsų asmeniškai.",
    },
  ];

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
        {sections.map((s) => (
          <section key={s.h} className="mb-10">
            <h2 className="text-xl font-semibold tracking-display">{s.h}</h2>
            <p className="copy mt-3">{s.p}</p>
          </section>
        ))}

        <section>
          <h2 className="text-xl font-semibold tracking-display">Kontaktai</h2>
          <p className="copy mt-3">
            {PRACTICE.name}
            {CHANNELS.email ? `, ${CHANNELS.email}` : ""}
            {". "}
            Klausimus dėl duomenų siųskite per{" "}
            <Link to="/#contact" className="signal-link">
              kontaktų formą
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
