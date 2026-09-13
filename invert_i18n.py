#!/usr/bin/env python3
"""
Inversion du système i18n — Talentuous Minds Fellowship
========================================================

Passe le site de « français par défaut » à « anglais par défaut ».

Avant :
    HTML contient le français  →  dictionnaire EN dans i18n.js

Après :
    HTML contient l'anglais    →  dictionnaire FR dans i18n.js

Le script :
1. Extrait le dictionnaire anglais actuel de i18n.js
2. Extrait les textes français actuellement dans le HTML
3. Génère le nouveau i18n.js (dictionnaire FR, anglais par défaut)
4. Réécrit les fichiers HTML avec les textes anglais

Usage :
    python3 invert_i18n.py
"""

from __future__ import annotations

import html as html_module
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent

# -----------------------------------------------------------------------------
# 1. Extraction du dictionnaire anglais depuis i18n.js
# -----------------------------------------------------------------------------


def extract_en_dictionary(js_source: str) -> dict[str, str]:
    """Extrait l'objet `en: { ... }` du fichier i18n.js.

    Args:
        js_source: Contenu du fichier i18n.js.

    Returns:
        Dictionnaire clé -> texte anglais.
    """
    # Repérer le bloc `en: {` jusqu'à la fermeture au niveau d'indentation 4
    start = js_source.index("    en: {")
    # Trouver la fin : la ligne `    }` seule après le début
    end = js_source.index("\n    }\n", start)

    block = js_source[start:end]

    # Extraire les paires "clé": "valeur"
    # Les valeurs peuvent contenir des guillemets échappés \"
    pattern = re.compile(r'"([a-zA-Z0-9._]+)":\s*"((?:[^"\\]|\\.)*)"', re.DOTALL)

    result: dict[str, str] = {}
    for match in pattern.finditer(block):
        key = match.group(1)
        value = match.group(2)
        # Dé-échapper les séquences JavaScript
        value = value.replace('\\"', '"').replace("\\n", "\n").replace("\\\\", "\\")
        result[key] = value

    return result


# -----------------------------------------------------------------------------
# 2. Extraction des textes français depuis le HTML
# -----------------------------------------------------------------------------

# Motif pour un élément avec data-i18n dont on veut capturer le contenu
# Gère : <tag ... data-i18n="clé" ...>contenu</tag>
TAG_PATTERN = re.compile(
    r"<(?P<tag>[a-z][a-z0-9]*)\b(?P<attrs>[^>]*?)"
    r'data-i18n="(?P<key>[^"]+)"'
    r"(?P<attrs2>[^>]*?)>"
    r"(?P<content>.*?)"
    r"</(?P=tag)>",
    re.DOTALL | re.IGNORECASE,
)


def extract_fr_from_html(html_source: str) -> dict[str, str]:
    """Extrait les textes français associés aux clés i18n.

    Args:
        html_source: Contenu d'un fichier HTML.

    Returns:
        Dictionnaire clé -> texte français (première occurrence).
    """
    result: dict[str, str] = {}

    for match in TAG_PATTERN.finditer(html_source):
        key = match.group("key")
        content = match.group("content").strip()

        # Ignorer les contenus vides ou purement structurels
        if not content:
            continue

        # Normaliser les espaces
        content = re.sub(r"\s+", " ", content).strip()

        if key not in result:
            result[key] = content

    return result


def extract_fr_attributes(html_source: str) -> dict[str, str]:
    """Extrait les textes français des attributs (placeholder, aria-label).

    Args:
        html_source: Contenu d'un fichier HTML.

    Returns:
        Dictionnaire clé -> texte français.
    """
    result: dict[str, str] = {}

    # data-i18n-placeholder
    for match in re.finditer(
        r'data-i18n-placeholder="([^"]+)"[^>]*placeholder="([^"]*)"', html_source
    ):
        result.setdefault(match.group(1), match.group(2))

    # placeholder avant data-i18n-placeholder
    for match in re.finditer(
        r'placeholder="([^"]*)"[^>]*data-i18n-placeholder="([^"]+)"', html_source
    ):
        result.setdefault(match.group(2), match.group(1))

    # data-i18n-aria
    for match in re.finditer(
        r'data-i18n-aria="([^"]+)"[^>]*aria-label="([^"]*)"', html_source
    ):
        result.setdefault(match.group(1), match.group(2))

    return result


# -----------------------------------------------------------------------------
# 3. Remplacement des textes français par les anglais dans le HTML
# -----------------------------------------------------------------------------


def replace_with_english(html_source: str, en_dict: dict[str, str]) -> tuple[str, int]:
    """Remplace les textes français par leur équivalent anglais.

    Args:
        html_source: Contenu HTML avec textes français.
        en_dict: Dictionnaire des traductions anglaises.

    Returns:
        Tuple (HTML modifié, nombre de remplacements).
    """
    count = 0

    def replacer(match: re.Match) -> str:
        nonlocal count
        key = match.group("key")

        if key not in en_dict:
            return match.group(0)

        new_content = en_dict[key]
        count += 1

        return (
            f"<{match.group('tag')}{match.group('attrs')}"
            f'data-i18n="{key}"'
            f"{match.group('attrs2')}>"
            f"{new_content}"
            f"</{match.group('tag')}>"
        )

    result = TAG_PATTERN.sub(replacer, html_source)
    return result, count


# -----------------------------------------------------------------------------
# 4. Génération du nouveau i18n.js
# -----------------------------------------------------------------------------

I18N_TEMPLATE = '''/* ==========================================================================
   Talentuous Minds Fellowship — Internationalisation EN / FR
   ==========================================================================
   L'ANGLAIS est la langue par défaut : il est écrit directement dans le HTML.
   Le FRANÇAIS est fourni par le dictionnaire ci-dessous.

   Chaque élément traduisible porte :
     data-i18n="clé"          -> remplace textContent
     data-i18n-html="clé"     -> remplace innerHTML (gras, liens)
     data-i18n-placeholder    -> remplace l'attribut placeholder
     data-i18n-aria           -> remplace l'attribut aria-label
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "tm-lang";
  var DEFAULT_LANG = "en";
  var SUPPORTED = ["en", "fr"];

  /* ------------------------------------------------------------------------
     Dictionnaire de traduction française
     Clés : identiques dans toutes les pages.
     ------------------------------------------------------------------------ */
  var I18N = {
    fr: {
{FR_ENTRIES}
    }
  };

  /* ------------------------------------------------------------------------
     Gestion de la langue
     ------------------------------------------------------------------------ */
  function getStoredLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) {
      /* localStorage indisponible (mode privé) : on ignore */
    }
    return DEFAULT_LANG;
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* silencieux */
    }
  }

  /* ------------------------------------------------------------------------
     Sauvegarde du texte anglais original (pour pouvoir y revenir)
     ------------------------------------------------------------------------ */
  function captureEnglishSource() {
    var nodes = document.querySelectorAll(
      "[data-i18n], [data-i18n-html], [data-i18n-placeholder], [data-i18n-aria]"
    );
    Array.prototype.forEach.call(nodes, function (node) {
      if (node.hasAttribute("data-i18n")) {
        node.setAttribute("data-en-text", node.textContent);
      }
      if (node.hasAttribute("data-i18n-html")) {
        node.setAttribute("data-en-html", node.innerHTML);
      }
      if (node.hasAttribute("data-i18n-placeholder")) {
        node.setAttribute("data-en-placeholder", node.getAttribute("placeholder") || "");
      }
      if (node.hasAttribute("data-i18n-aria")) {
        node.setAttribute("data-en-aria", node.getAttribute("aria-label") || "");
      }
    });
  }

  /* ------------------------------------------------------------------------
     Application d'une langue
     ------------------------------------------------------------------------ */
  function applyLang(lang) {
    var dict = I18N[lang] || null;

    var nodes = document.querySelectorAll(
      "[data-i18n], [data-i18n-html], [data-i18n-placeholder], [data-i18n-aria]"
    );

    Array.prototype.forEach.call(nodes, function (node) {
      /* Texte simple */
      if (node.hasAttribute("data-i18n")) {
        var keyText = node.getAttribute("data-i18n");
        if (lang === "en") {
          var enText = node.getAttribute("data-en-text");
          if (enText !== null) node.textContent = enText;
        } else if (dict && dict[keyText] !== undefined) {
          node.textContent = dict[keyText];
        }
      }

      /* HTML enrichi */
      if (node.hasAttribute("data-i18n-html")) {
        var keyHtml = node.getAttribute("data-i18n-html");
        if (lang === "en") {
          var enHtml = node.getAttribute("data-en-html");
          if (enHtml !== null) node.innerHTML = enHtml;
        } else if (dict && dict[keyHtml] !== undefined) {
          node.innerHTML = dict[keyHtml];
        }
      }

      /* Placeholder */
      if (node.hasAttribute("data-i18n-placeholder")) {
        var keyPh = node.getAttribute("data-i18n-placeholder");
        if (lang === "en") {
          var enPh = node.getAttribute("data-en-placeholder");
          if (enPh !== null) node.setAttribute("placeholder", enPh);
        } else if (dict && dict[keyPh] !== undefined) {
          node.setAttribute("placeholder", dict[keyPh]);
        }
      }

      /* aria-label */
      if (node.hasAttribute("data-i18n-aria")) {
        var keyAria = node.getAttribute("data-i18n-aria");
        if (lang === "en") {
          var enAria = node.getAttribute("data-en-aria");
          if (enAria !== null) node.setAttribute("aria-label", enAria);
        } else if (dict && dict[keyAria] !== undefined) {
          node.setAttribute("aria-label", dict[keyAria]);
        }
      }
    });

    /* Attribut lang du document et titre */
    document.documentElement.setAttribute("lang", lang);

    var titleNode = document.querySelector("title");
    if (titleNode) {
      var titleEn = titleNode.getAttribute("data-title-en");
      var titleFr = titleNode.getAttribute("data-title-fr");
      if (lang === "en" && titleEn) titleNode.textContent = titleEn;
      if (lang === "fr" && titleFr) titleNode.textContent = titleFr;
    }

    /* Description meta */
    var desc = document.querySelector('meta[name="description"]');
    if (desc) {
      var descEn = desc.getAttribute("data-desc-en");
      var descFr = desc.getAttribute("data-desc-fr");
      if (lang === "en" && descEn) desc.setAttribute("content", descEn);
      if (lang === "fr" && descFr) desc.setAttribute("content", descFr);
    }

    /* État des boutons de langue */
    var buttons = document.querySelectorAll("[data-lang-btn]");
    Array.prototype.forEach.call(buttons, function (btn) {
      var isActive = btn.getAttribute("data-lang-btn") === lang;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    storeLang(lang);
  }

  /* ------------------------------------------------------------------------
     Initialisation
     ------------------------------------------------------------------------ */
  function init() {
    captureEnglishSource();

    /* Boutons de bascule */
    var buttons = document.querySelectorAll("[data-lang-btn]");
    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang-btn"));
      });
    });

    /* Langue initiale : préférence stockée, sinon anglais */
    applyLang(getStoredLang());

    /* Menu mobile */
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-nav]");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      Array.prototype.forEach.call(nav.querySelectorAll("a"), function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    /* Année dynamique dans le pied de page */
    var yearNodes = document.querySelectorAll("[data-current-year]");
    Array.prototype.forEach.call(yearNodes, function (node) {
      node.textContent = String(new Date().getFullYear());
    });

    /* Animations d'apparition au défilement */
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && reveals.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      Array.prototype.forEach.call(reveals, function (el) {
        observer.observe(el);
      });
    } else {
      Array.prototype.forEach.call(reveals, function (el) {
        el.classList.add("is-visible");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
'''


def build_fr_dictionary(fr_texts: dict[str, str]) -> str:
    """Construit le bloc de lignes du dictionnaire français.

    Args:
        fr_texts: Dictionnaire clé -> texte français.

    Returns:
        Le texte des entrées, indenté et échappé pour JavaScript.
    """
    lines = []
    for key in sorted(fr_texts.keys()):
        value = fr_texts[key]
        # Échapper pour JavaScript
        escaped = value.replace("\\", "\\\\").replace('"', '\\"')
        escaped = escaped.replace("\n", "\\n")
        lines.append(f'      "{key}": "{escaped}",')
    return "\n".join(lines)


# -----------------------------------------------------------------------------
# Programme principal
# -----------------------------------------------------------------------------


def main() -> int:
    """Inverse le système i18n."""
    print("=" * 60)
    print("  INVERSION DU SYSTÈME i18n")
    print("  Français par défaut → Anglais par défaut")
    print("=" * 60)
    print()

    # --- Étape 1 : dictionnaire anglais actuel ------------------------------
    i18n_path = ROOT / "assets" / "js" / "i18n.js"
    js_source = i18n_path.read_text(encoding="utf-8")

    en_dict = extract_en_dictionary(js_source)
    print(f"1. Dictionnaire anglais extrait : {len(en_dict)} clés")

    # --- Étape 2 : textes français du HTML ----------------------------------
    html_files = sorted(ROOT.glob("*.html"))
    fr_dict: dict[str, str] = {}

    for path in html_files:
        source = path.read_text(encoding="utf-8")
        fr_dict.update(extract_fr_from_html(source))
        fr_dict.update(extract_fr_attributes(source))

    print(f"2. Textes français extraits du HTML : {len(fr_dict)} clés")

    # --- Étape 3 : vérification de cohérence --------------------------------
    only_en = set(en_dict.keys()) - set(fr_dict.keys())
    only_fr = set(fr_dict.keys()) - set(en_dict.keys())

    print()
    print(f"   Clés dans les deux      : {len(set(en_dict) & set(fr_dict))}")
    print(f"   Clés anglaises seules   : {len(only_en)}")
    print(f"   Clés françaises seules  : {len(only_fr)}")

    if only_en:
        print()
        print("   ⚠ Clés sans texte français dans le HTML (le français restera en anglais) :")
        for key in sorted(only_en)[:20]:
            print(f"      {key}")
        if len(only_en) > 20:
            print(f"      … et {len(only_en) - 20} autres")

    if only_fr:
        print()
        print("   ⚠ Clés françaises sans traduction anglaise :")
        for key in sorted(only_fr)[:20]:
            print(f"      {key}")

    # --- Étape 4 : génération du nouveau i18n.js ----------------------------
    # Le dictionnaire FR contient : les textes FR extraits du HTML,
    # complétés par le dictionnaire EN pour les clés manquantes
    merged_fr = dict(en_dict)  # point de départ : anglais (repli)
    merged_fr.update(fr_dict)  # puis les vrais textes français

    new_js = I18N_TEMPLATE.replace("{FR_ENTRIES}", build_fr_dictionary(merged_fr))
    i18n_path.write_text(new_js, encoding="utf-8")
    print()
    print(f"3. Nouveau i18n.js écrit : dictionnaire FR de {len(merged_fr)} clés")

    # --- Étape 5 : réécriture des HTML en anglais ---------------------------
    print()
    total = 0
    for path in html_files:
        source = path.read_text(encoding="utf-8")
        new_source, count = replace_with_english(source, en_dict)

        # Inverser l'attribut lang
        new_source = new_source.replace('<html lang="fr">', '<html lang="en">')

        # Inverser l'ordre des boutons de langue (EN actif par défaut)
        new_source = new_source.replace(
            '<button type="button" data-lang-btn="fr" aria-pressed="true">FR</button>\n'
            '          <button type="button" data-lang-btn="en" aria-pressed="false">EN</button>',
            '<button type="button" data-lang-btn="en" aria-pressed="true">EN</button>\n'
            '          <button type="button" data-lang-btn="fr" aria-pressed="false">FR</button>',
        )

        path.write_text(new_source, encoding="utf-8")
        total += count
        print(f"   {path.name:28s} {count:4d} remplacements")

    print()
    print(f"4. Total : {total} textes remplacés par l'anglais")
    print()
    print("=" * 60)
    print("  TERMINÉ")
    print("=" * 60)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
