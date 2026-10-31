import i18n from "../i18n";
import {
  CAPABILITIES,
  METHOD_EDGES,
  METHOD_NODES,
  PROCESS_STEPS,
  PROJECTS,
  RATE_CARD,
  SECTIONS,
  STACK_GROUPS,
} from "./content";

/**
 * The page is generated from src/design/content.js, so the failure mode when
 * somebody adds a capability or a project is a key that resolves to its own
 * name in one language only. These tests make that a red build instead of a
 * shipped "cap_apps_body" on the live site.
 */

const LANGUAGES = ["lt", "en"];

/** i18next returns the key itself when a translation is missing. */
function missing(lang, key) {
  const value = i18n.getFixedT(lang)(key);
  return value === key || value === undefined || value === "";
}

function collectKeys() {
  const keys = [];
  SECTIONS.forEach((s) => keys.push(s.labelKey));
  CAPABILITIES.forEach((c) => keys.push(c.titleKey, c.bodyKey));
  METHOD_NODES.forEach((n) => keys.push(n.titleKey, n.bodyKey));
  PROCESS_STEPS.forEach((s) => keys.push(s.titleKey, s.bodyKey, s.outKey));
  STACK_GROUPS.forEach((g) => keys.push(g.titleKey));
  RATE_CARD.forEach((r) => keys.push(r.titleKey, r.priceKey));
  PROJECTS.forEach((p) => {
    keys.push(p.roleKey, `status.${p.statusKey}`);
    ["title", "kind", "scope", "problem", "approach"].forEach((field) =>
      keys.push(`projects.${p.id}.${field}`)
    );
  });
  return keys;
}

describe("content keys", () => {
  LANGUAGES.forEach((lang) => {
    test(`every referenced key is translated in ${lang}`, () => {
      const absent = collectKeys().filter((key) => missing(lang, key));
      expect(absent).toEqual([]);
    });
  });
});

describe("method graph", () => {
  test("every edge connects two declared nodes", () => {
    const ids = new Set(METHOD_NODES.map((n) => n.id));
    const broken = METHOD_EDGES.filter(([a, b]) => !ids.has(a) || !ids.has(b));
    expect(broken).toEqual([]);
  });

  test("no node is orphaned", () => {
    const connected = new Set(METHOD_EDGES.flat());
    const orphans = METHOD_NODES.filter((n) => !connected.has(n.id)).map((n) => n.id);
    expect(orphans).toEqual([]);
  });
});

describe("capabilities", () => {
  test("evidence points at real projects", () => {
    const ids = new Set(PROJECTS.map((p) => p.id));
    const dangling = CAPABILITIES.flatMap((c) =>
      c.evidence.filter((e) => !ids.has(e)).map((e) => `${c.id} -> ${e}`)
    );
    expect(dangling).toEqual([]);
  });
});

describe("sections", () => {
  test("indices are unique and ordered", () => {
    const indices = SECTIONS.map((s) => s.index);
    expect(new Set(indices).size).toBe(indices.length);
    expect([...indices].sort()).toEqual(indices);
  });
});
