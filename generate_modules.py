#!/usr/bin/env python3
"""
Génère les pages de détail des modules 2 à 7 — Talentuous Minds Fellowship
===========================================================================

Ce script produit les fichiers `training-module-N.html` à partir d'un modèle
commun, afin de garantir une structure identique et d'éviter les erreurs de
copier-coller.

Le module 1 (`training-module-1.html`) est rédigé manuellement comme référence.

Usage :
    python3 generate_modules.py
"""

from __future__ import annotations

from pathlib import Path

from module_texts_fr import get_text

# -----------------------------------------------------------------------------
# Données des modules 2 à 7
# -----------------------------------------------------------------------------
MODULES: dict[int, dict] = {
    2: {
        "i18n_title": "training.m2.title",
        "i18n_text": "training.m2.text",
        "i18n_dur": "training.m2.dur",
        "i18n_level": "training.level.inter",
        "i18n_format": "training.format.hybrid",
        "prev": "training-module-1",
        "prev_label": "mod.nav.prev.docking",
        "next": "training-module-3",
        "next_label": "mod.nav.next.dynamics",
        "objectives": [
            "mod.m2.o1", "mod.m2.o2", "mod.m2.o3", "mod.m2.o4", "mod.m2.o5",
        ],
        "day1_title": "mod.day1",
        "day1": [
            ("09:00 – 09:30", "mod.m2.d1s1", "mod.type.intro"),
            ("09:30 – 10:45", "mod.m2.d1s2", "mod.type.theory"),
            ("10:45 – 11:00", "mod.break", "mod.type.break"),
            ("11:00 – 12:30", "mod.m2.d1s3", "mod.type.theory"),
            ("12:30 – 14:00", "mod.lunch", "mod.type.break"),
            ("14:00 – 15:30", "mod.m2.d1s4", "mod.type.practice"),
            ("15:30 – 15:45", "mod.break", "mod.type.break"),
            ("15:45 – 17:15", "mod.m2.d1s5", "mod.type.practice"),
            ("17:15 – 17:45", "mod.m2.d1s6", "mod.type.wrap"),
        ],
        "day2_title": "mod.day2",
        "day2": [
            ("09:00 – 10:00", "mod.m2.d2s1", "mod.type.theory"),
            ("10:00 – 10:45", "mod.m2.d2s2", "mod.type.practice"),
            ("10:45 – 11:00", "mod.break", "mod.type.break"),
            ("11:00 – 12:30", "mod.m2.d2s3", "mod.type.practice"),
            ("12:30 – 14:00", "mod.lunch", "mod.type.break"),
            ("14:00 – 15:30", "mod.m2.d2s4", "mod.type.practice"),
            ("15:30 – 15:45", "mod.break", "mod.type.break"),
            ("15:45 – 16:45", "mod.m2.d2s5", "mod.type.practice"),
            ("16:45 – 17:30", "mod.m2.d2s6", "mod.type.wrap"),
        ],
        "day3_title": "mod.day3",
        "day3": [
            ("09:00 – 10:30", "mod.m2.d3s1", "mod.type.theory"),
            ("10:30 – 10:45", "mod.break", "mod.type.break"),
            ("10:45 – 12:30", "mod.m2.d3s2", "mod.type.practice"),
            ("12:30 – 14:00", "mod.lunch", "mod.type.break"),
            ("14:00 – 15:30", "mod.m2.d3s3", "mod.type.practice"),
            ("15:30 – 15:45", "mod.break", "mod.type.break"),
            ("15:45 – 16:45", "mod.m2.d3s4", "mod.type.practice"),
            ("16:45 – 17:30", "mod.m2.d3s5", "mod.type.wrap"),
        ],
        "prereq": ["training.m2.prereq", "mod.m2.prereq2", "mod.m2.prereq3"],
        "material": ["mod.material.1", "mod.material.2", "mod.material.5", "mod.material.4"],
    },
    3: {
        "i18n_title": "training.m3.title",
        "i18n_text": "training.m3.text",
        "i18n_dur": "training.m3.dur",
        "i18n_level": "training.level.inter",
        "i18n_format": "training.format.onsite",
        "prev": "training-module-2",
        "prev_label": "mod.nav.prev.screening",
        "next": "training-module-4",
        "next_label": "mod.nav.next.analysis",
        "objectives": [
            "mod.m3.o1", "mod.m3.o2", "mod.m3.o3", "mod.m3.o4", "mod.m3.o5",
        ],
        "day1_title": "mod.day1",
        "day1": [
            ("09:00 – 09:30", "mod.m3.d1s1", "mod.type.intro"),
            ("09:30 – 10:45", "mod.m3.d1s2", "mod.type.theory"),
            ("10:45 – 11:00", "mod.break", "mod.type.break"),
            ("11:00 – 12:30", "mod.m3.d1s3", "mod.type.theory"),
            ("12:30 – 14:00", "mod.lunch", "mod.type.break"),
            ("14:00 – 15:30", "mod.m3.d1s4", "mod.type.practice"),
            ("15:30 – 15:45", "mod.break", "mod.type.break"),
            ("15:45 – 17:15", "mod.m3.d1s5", "mod.type.practice"),
            ("17:15 – 17:45", "mod.m3.d1s6", "mod.type.wrap"),
        ],
        "day2_title": "mod.day2",
        "day2": [
            ("09:00 – 10:00", "mod.m3.d2s1", "mod.type.theory"),
            ("10:00 – 10:45", "mod.m3.d2s2", "mod.type.practice"),
            ("10:45 – 11:00", "mod.break", "mod.type.break"),
            ("11:00 – 12:30", "mod.m3.d2s3", "mod.type.practice"),
            ("12:30 – 14:00", "mod.lunch", "mod.type.break"),
            ("14:00 – 15:30", "mod.m3.d2s4", "mod.type.practice"),
            ("15:30 – 15:45", "mod.break", "mod.type.break"),
            ("15:45 – 16:45", "mod.m3.d2s5", "mod.type.practice"),
            ("16:45 – 17:30", "mod.m3.d2s6", "mod.type.wrap"),
        ],
        "day3_title": "mod.day3",
        "day3": [
            ("09:00 – 10:30", "mod.m3.d3s1", "mod.type.theory"),
            ("10:30 – 10:45", "mod.break", "mod.type.break"),
            ("10:45 – 12:30", "mod.m3.d3s2", "mod.type.practice"),
            ("12:30 – 14:00", "mod.lunch", "mod.type.break"),
            ("14:00 – 15:30", "mod.m3.d3s3", "mod.type.practice"),
            ("15:30 – 15:45", "mod.break", "mod.type.break"),
            ("15:45 – 16:45", "mod.m3.d3s4", "mod.type.practice"),
            ("16:45 – 17:30", "mod.m3.d3s5", "mod.type.wrap"),
        ],
        "prereq": ["training.m3.prereq", "mod.m3.prereq2", "mod.m3.prereq3"],
        "material": ["mod.material.1", "mod.material.6", "mod.material.3", "mod.material.4"],
    },
    4: {
        "i18n_title": "training.m4.title",
        "i18n_text": "training.m4.text",
        "i18n_dur": "training.m4.dur",
        "i18n_level": "training.level.intro",
        "i18n_format": "training.format.hybrid",
        "prev": "training-module-3",
        "prev_label": "mod.nav.prev.dynamics",
        "next": "training-module-5",
        "next_label": "mod.nav.next.prediction",
        "objectives": [
            "mod.m4.o1", "mod.m4.o2", "mod.m4.o3", "mod.m4.o4", "mod.m4.o5",
        ],
        "day1_title": "mod.day1",
        "day1": [
            ("09:00 – 09:30", "mod.m4.d1s1", "mod.type.intro"),
            ("09:30 – 10:45", "mod.m4.d1s2", "mod.type.theory"),
            ("10:45 – 11:00", "mod.break", "mod.type.break"),
            ("11:00 – 12:30", "mod.m4.d1s3", "mod.type.practice"),
            ("12:30 – 14:00", "mod.lunch", "mod.type.break"),
            ("14:00 – 15:30", "mod.m4.d1s4", "mod.type.practice"),
            ("15:30 – 15:45", "mod.break", "mod.type.break"),
            ("15:45 – 17:15", "mod.m4.d1s5", "mod.type.practice"),
            ("17:15 – 17:45", "mod.m4.d1s6", "mod.type.wrap"),
        ],
        "day2_title": "mod.day2",
        "day2": [
            ("09:00 – 10:00", "mod.m4.d2s1", "mod.type.theory"),
            ("10:00 – 10:45", "mod.m4.d2s2", "mod.type.practice"),
            ("10:45 – 11:00", "mod.break", "mod.type.break"),
            ("11:00 – 12:30", "mod.m4.d2s3", "mod.type.practice"),
            ("12:30 – 14:00", "mod.lunch", "mod.type.break"),
            ("14:00 – 15:30", "mod.m4.d2s4", "mod.type.practice"),
            ("15:30 – 15:45", "mod.break", "mod.type.break"),
            ("15:45 – 16:45", "mod.m4.d2s5", "mod.type.practice"),
            ("16:45 – 17:30", "mod.m4.d2s6", "mod.type.wrap"),
        ],
        "prereq": ["training.m4.prereq", "mod.m4.prereq2", "mod.m4.prereq3"],
        "material": ["mod.material.1", "mod.material.2", "mod.material.3", "mod.material.4"],
    },
    5: {
        "i18n_title": "training.m5.title",
        "i18n_text": "training.m5.text",
        "i18n_dur": "training.m5.dur",
        "i18n_level": "training.level.inter",
        "i18n_format": "training.format.online",
        "prev": "training-module-4",
        "prev_label": "mod.nav.prev.analysis",
        "next": "training-module-6",
        "next_label": "mod.nav.next.programming",
        "objectives": [
            "mod.m5.o1", "mod.m5.o2", "mod.m5.o3", "mod.m5.o4", "mod.m5.o5",
        ],
        "day1_title": "mod.day1",
        "day1": [
            ("09:00 – 09:30", "mod.m5.d1s1", "mod.type.intro"),
            ("09:30 – 10:45", "mod.m5.d1s2", "mod.type.theory"),
            ("10:45 – 11:00", "mod.break", "mod.type.break"),
            ("11:00 – 12:30", "mod.m5.d1s3", "mod.type.practice"),
            ("12:30 – 14:00", "mod.lunch", "mod.type.break"),
            ("14:00 – 15:30", "mod.m5.d1s4", "mod.type.practice"),
            ("15:30 – 15:45", "mod.break", "mod.type.break"),
            ("15:45 – 17:15", "mod.m5.d1s5", "mod.type.practice"),
            ("17:15 – 17:45", "mod.m5.d1s6", "mod.type.wrap"),
        ],
        "day2_title": "mod.day2",
        "day2": [
            ("09:00 – 10:00", "mod.m5.d2s1", "mod.type.theory"),
            ("10:00 – 10:45", "mod.m5.d2s2", "mod.type.practice"),
            ("10:45 – 11:00", "mod.break", "mod.type.break"),
            ("11:00 – 12:30", "mod.m5.d2s3", "mod.type.practice"),
            ("12:30 – 14:00", "mod.lunch", "mod.type.break"),
            ("14:00 – 15:30", "mod.m5.d2s4", "mod.type.practice"),
            ("15:30 – 15:45", "mod.break", "mod.type.break"),
            ("15:45 – 16:45", "mod.m5.d2s5", "mod.type.practice"),
            ("16:45 – 17:30", "mod.m5.d2s6", "mod.type.wrap"),
        ],
        "prereq": ["training.m5.prereq", "mod.m5.prereq2", "mod.m5.prereq3"],
        "material": ["mod.material.1", "mod.material.2", "mod.material.7", "mod.material.4"],
    },
    6: {
        "i18n_title": "training.m6.title",
        "i18n_text": "training.m6.text",
        "i18n_dur": "training.m6.dur",
        "i18n_level": "training.level.inter",
        "i18n_format": "training.format.online",
        "prev": "training-module-5",
        "prev_label": "mod.nav.prev.prediction",
        "next": "training-module-7",
        "next_label": "mod.nav.next.writing",
        "free": True,
        "objectives": [
            "mod.m6.o1", "mod.m6.o2", "mod.m6.o3", "mod.m6.o4", "mod.m6.o5",
        ],
        "day1_title": "mod.day1",
        "day1": [
            ("09:00 – 09:30", "mod.m6.d1s1", "mod.type.intro"),
            ("09:30 – 10:45", "mod.m6.d1s2", "mod.type.theory"),
            ("10:45 – 11:00", "mod.break", "mod.type.break"),
            ("11:00 – 12:30", "mod.m6.d1s3", "mod.type.practice"),
            ("12:30 – 14:00", "mod.lunch", "mod.type.break"),
            ("14:00 – 15:30", "mod.m6.d1s4", "mod.type.practice"),
            ("15:30 – 15:45", "mod.break", "mod.type.break"),
            ("15:45 – 17:15", "mod.m6.d1s5", "mod.type.practice"),
            ("17:15 – 17:45", "mod.m6.d1s6", "mod.type.wrap"),
        ],
        "day2_title": "mod.day2",
        "day2": [
            ("09:00 – 10:00", "mod.m6.d2s1", "mod.type.theory"),
            ("10:00 – 10:45", "mod.m6.d2s2", "mod.type.practice"),
            ("10:45 – 11:00", "mod.break", "mod.type.break"),
            ("11:00 – 12:30", "mod.m6.d2s3", "mod.type.practice"),
            ("12:30 – 14:00", "mod.lunch", "mod.type.break"),
            ("14:00 – 15:30", "mod.m6.d2s4", "mod.type.practice"),
            ("15:30 – 15:45", "mod.break", "mod.type.break"),
            ("15:45 – 16:45", "mod.m6.d2s5", "mod.type.practice"),
            ("16:45 – 17:30", "mod.m6.d2s6", "mod.type.wrap"),
        ],
        "day3_title": "mod.day3",
        "day3": [
            ("09:00 – 10:30", "mod.m6.d3s1", "mod.type.practice"),
            ("10:30 – 10:45", "mod.break", "mod.type.break"),
            ("10:45 – 12:30", "mod.m6.d3s2", "mod.type.practice"),
            ("12:30 – 14:00", "mod.lunch", "mod.type.break"),
            ("14:00 – 15:30", "mod.m6.d3s3", "mod.type.practice"),
            ("15:30 – 15:45", "mod.break", "mod.type.break"),
            ("15:45 – 16:45", "mod.m6.d3s4", "mod.type.practice"),
            ("16:45 – 17:30", "mod.m6.d3s5", "mod.type.wrap"),
        ],
        "prereq": ["training.m6.prereq", "mod.m6.prereq2", "mod.m6.prereq3"],
        "material": ["mod.material.1", "mod.material.2", "mod.material.7", "mod.material.8"],
    },
    7: {
        "i18n_title": "training.m7.title",
        "i18n_text": "training.m7.text",
        "i18n_dur": "training.m7.dur",
        "i18n_level": "training.level.inter",
        "i18n_format": "training.format.online",
        "prev": "training-module-6",
        "prev_label": "mod.nav.prev.programming",
        "next": "training",
        "next_label": "mod.nav.all",
        "free": True,
        "objectives": [
            "mod.m7.o1", "mod.m7.o2", "mod.m7.o3", "mod.m7.o4", "mod.m7.o5",
        ],
        "day1_title": "mod.day1",
        "day1": [
            ("09:00 – 09:30", "mod.m7.d1s1", "mod.type.intro"),
            ("09:30 – 10:45", "mod.m7.d1s2", "mod.type.theory"),
            ("10:45 – 11:00", "mod.break", "mod.type.break"),
            ("11:00 – 12:30", "mod.m7.d1s3", "mod.type.theory"),
            ("12:30 – 14:00", "mod.lunch", "mod.type.break"),
            ("14:00 – 15:30", "mod.m7.d1s4", "mod.type.practice"),
            ("15:30 – 15:45", "mod.break", "mod.type.break"),
            ("15:45 – 17:15", "mod.m7.d1s5", "mod.type.practice"),
            ("17:15 – 17:45", "mod.m7.d1s6", "mod.type.wrap"),
        ],
        "day2_title": "mod.day2",
        "day2": [
            ("09:00 – 10:00", "mod.m7.d2s1", "mod.type.theory"),
            ("10:00 – 10:45", "mod.m7.d2s2", "mod.type.practice"),
            ("10:45 – 11:00", "mod.break", "mod.type.break"),
            ("11:00 – 12:30", "mod.m7.d2s3", "mod.type.practice"),
            ("12:30 – 14:00", "mod.lunch", "mod.type.break"),
            ("14:00 – 15:30", "mod.m7.d2s4", "mod.type.practice"),
            ("15:30 – 15:45", "mod.break", "mod.type.break"),
            ("15:45 – 16:45", "mod.m7.d2s5", "mod.type.practice"),
            ("16:45 – 17:30", "mod.m7.d2s6", "mod.type.wrap"),
        ],
        "prereq": ["training.m7.prereq", "mod.m7.prereq2", "mod.m7.prereq3"],
        "material": ["mod.material.1", "mod.material.2", "mod.material.7", "mod.material.8"],
    },
}


def build_schedule(rows: list[tuple[str, str, str]], caption_key: str, num: int) -> str:
    """Construit le tableau HTML du programme d'une journée.

    Args:
        rows: Liste de tuples (horaire, clé i18n du contenu, clé i18n du type).
        caption_key: Clé i18n de la légende du tableau.
        num: Numéro du module (pour résoudre les textes français).

    Returns:
        Le HTML du tableau.
    """
    lines = [
        '        <table class="schedule reveal">',
        f'          <caption data-i18n="{caption_key}">{get_text(caption_key, num)}</caption>',
        "          <thead>",
        "            <tr>",
        f'              <th data-i18n="mod.col.time">{get_text("mod.col.time", num)}</th>',
        f'              <th data-i18n="mod.col.topic">{get_text("mod.col.topic", num)}</th>',
        f'              <th data-i18n="mod.col.type">{get_text("mod.col.type", num)}</th>',
        "            </tr>",
        "          </thead>",
        "          <tbody>",
    ]
    for time_slot, topic_key, type_key in rows:
        topic_text = get_text(topic_key, num)
        type_text = get_text(type_key, num)
        if type_key == "mod.type.break":
            lines.append(
                f'            <tr class="schedule__break"><td>{time_slot}</td>'
                f'<td colspan="2" data-i18n="{topic_key}">{topic_text}</td></tr>'
            )
        else:
            lines.append(
                f'            <tr><td>{time_slot}</td>'
                f'<td data-i18n="{topic_key}">{topic_text}</td>'
                f'<td data-i18n="{type_key}">{type_text}</td></tr>'
            )
    lines += ["          </tbody>", "        </table>"]
    return "\n".join(lines)


def build_page(num: int, cfg: dict) -> str:
    """Construit la page HTML complète d'un module."""
    price_key = "mod.price.free" if cfg.get("free") else "mod.price.quote"

    # Objectifs
    objectives = "\n".join(
        f'          <li data-i18n="{key}">{get_text(key, num)}</li>'
        for key in cfg["objectives"]
    )

    # Journées
    days = []
    for day_num, title_key in ((1, cfg["day1_title"]), (2, cfg["day2_title"]), (3, cfg.get("day3_title"))):
        rows = cfg.get(f"day{day_num}")
        if not rows:
            continue
        caption = f"mod.schedule.caption{'' if day_num == 1 else day_num}"
        days.append(
            f'        <h2 class="reveal" style="margin-top: 3rem;" data-i18n="{title_key}">{get_text(title_key, num)}</h2>\n\n'
            + build_schedule(rows, caption, num)
        )
    days_html = "\n\n".join(days)

    # Prérequis et matériel
    prereq = "\n".join(
        f'              <li data-i18n="{k}">{get_text(k, num)}</li>'
        for k in cfg["prereq"]
    )
    material = "\n".join(
        f'              <li data-i18n="{k}">{get_text(k, num)}</li>'
        for k in cfg["material"]
    )

    return f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title data-title-fr="Module {num} — Talentuous Minds Fellowship"
         data-title-en="Module {num} — Talentuous Minds Fellowship">
    Module {num} — Talentuous Minds Fellowship
  </title>
  <meta name="description"
        data-desc-fr="Programme détaillé du module {num} de la formation Drug Discovery."
        data-desc-en="Detailed program of module {num} of the Drug Discovery training."
        content="Programme détaillé du module {num} de la formation Drug Discovery.">
  <link rel="stylesheet" href="/assets/css/style.css">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
</head>
<body>
  <a class="skip-link" href="#main" data-i18n="skip">Aller au contenu principal</a>

  <header class="site-header">
    <div class="container site-header__inner">
      <a class="brand" href="/">
        <span class="brand__mark" aria-hidden="true">TM</span>
        <span class="brand__text">
          <span class="brand__name">Talentuous Minds</span>
          <span class="brand__tag" data-i18n="brand.tag">Fellowship</span>
        </span>
      </a>

      <nav class="nav" data-nav aria-label="Navigation principale">
        <ul class="nav__list">
          <li><a class="nav__link" href="/" data-i18n="nav.home">Accueil</a></li>
          <li><a class="nav__link" href="/about" data-i18n="nav.about">À propos</a></li>
          <li><a class="nav__link" href="/programs" data-i18n="nav.programs">Programmes</a></li>
          <li><a class="nav__link" href="/training" data-i18n="nav.training">Drug Discovery</a></li>
          <li><a class="nav__link" href="/events" data-i18n="nav.events">Événements</a></li>
          <li><a class="nav__link" href="/services" data-i18n="nav.services">Services</a></li>
          <li><a class="nav__link" href="/team" data-i18n="nav.team">Équipe</a></li>
          <li><a class="nav__link" href="/apply" data-i18n="nav.apply">Candidater</a></li>
          <li><a class="nav__link" href="/contact" data-i18n="nav.contact">Contact</a></li>
        </ul>
        <div class="lang-switch" role="group" aria-label="Langue / Language">
          <button type="button" data-lang-btn="fr" aria-pressed="true">FR</button>
          <button type="button" data-lang-btn="en" aria-pressed="false">EN</button>
        </div>
      </nav>

      <button class="nav-toggle" type="button" data-nav-toggle
              aria-expanded="false" aria-label="Ouvrir le menu" data-i18n-aria="nav.toggle">☰</button>
    </div>
  </header>

  <main id="main">

    <section class="module-hero">
      <div class="container">
        <span class="eyebrow" data-i18n="mod.nav.back">Module {num:02d} / 07</span>
        <h1 data-i18n="{cfg['i18n_title']}">{get_text(cfg['i18n_title'], num)}</h1>
        <p class="hero__lead" data-i18n="{cfg['i18n_text']}">{get_text(cfg['i18n_text'], num)}</p>
        <dl class="module-hero__meta">
          <div>
            <dt data-i18n="training.meta.duration">Durée</dt>
            <dd data-i18n="{cfg['i18n_dur']}">{get_text(cfg['i18n_dur'], num)}</dd>
          </div>
          <div>
            <dt data-i18n="mod.level">Niveau</dt>
            <dd data-i18n="{cfg['i18n_level']}">{get_text(cfg['i18n_level'], num)}</dd>
          </div>
          <div>
            <dt data-i18n="mod.price">Tarif</dt>
            <dd data-i18n="{price_key}">{get_text(price_key, num)}</dd>
          </div>
          <div>
            <dt data-i18n="mod.format">Format</dt>
            <dd data-i18n="{cfg['i18n_format']}">{get_text(cfg['i18n_format'], num)}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="section">
      <div class="container" style="max-width: 900px;">

        <div class="notice reveal" style="margin-bottom: 2.5rem;">
          <span aria-hidden="true">⚠️</span>
          <span>
            <strong>Programme indicatif.</strong>
            Le déroulé ci-dessous décrit le contenu prévu. Les horaires peuvent être ajustés
            selon le rythme du groupe. Aucune date de session n'est encore fixée.
          </span>
        </div>

        <div class="section__head reveal">
          <span class="eyebrow" data-i18n="mod.objectives.eyebrow">Objectifs pédagogiques</span>
          <h2 data-i18n="mod.objectives.title">À l'issue de ce module, vous saurez</h2>
        </div>

        <ul class="objectives reveal">
{objectives}
        </ul>

{days_html}

        <div class="grid grid--2" style="margin-top: 3rem;">
          <div class="card reveal">
            <h3 data-i18n="mod.prereq.title">Prérequis</h3>
            <ul style="margin: 0; color: var(--ink-soft); font-size: 0.93rem;">
{prereq}
            </ul>
          </div>

          <div class="card reveal">
            <h3 data-i18n="mod.material.title">Matériel nécessaire</h3>
            <ul style="margin: 0; color: var(--ink-soft); font-size: 0.93rem;">
{material}
            </ul>
          </div>
        </div>

        <nav class="module-nav" aria-label="Navigation entre les modules">
          <a class="btn btn--outline" href="/{cfg['prev']}" data-i18n="{cfg['prev_label']}">{get_text(cfg['prev_label'], num)}</a>
          <a class="btn btn--primary" href="/{cfg['next']}" data-i18n="{cfg['next_label']}">{get_text(cfg['next_label'], num)}</a>
        </nav>

      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="cta reveal">
          <h2 data-i18n="mod.cta.title">Intéressé par ce module ?</h2>
          <p data-i18n="mod.cta.text">
            Précisez votre statut et votre niveau. Nous vous répondrons avec les modalités
            et un devis adapté.
          </p>
          <div class="btn-row">
            <a class="btn btn--primary" href="/apply" data-i18n="mod.cta.btn">Demander le programme</a>
            <a class="btn btn--ghost-light" href="/contact" data-i18n="nav.contact">Contact</a>
          </div>
        </div>
      </div>
    </section>

  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__grid">
        <div>
          <div class="site-footer__brand">
            <span class="brand__mark" aria-hidden="true">TM</span>
            <span class="brand__text">
              <span class="brand__name">Talentuous Minds</span>
              <span class="brand__tag" data-i18n="brand.tag">Fellowship</span>
            </span>
          </div>
          <p data-i18n="footer.about">
            Talentuous Minds Fellowship est une initiative orientée vers le développement des compétences,
            l'éducation, l'accompagnement des jeunes et la valorisation des talents.
          </p>
        </div>

        <div>
          <h4 data-i18n="footer.nav.title">Navigation</h4>
          <ul>
            <li><a href="/" data-i18n="nav.home">Accueil</a></li>
            <li><a href="/about" data-i18n="nav.about">À propos</a></li>
            <li><a href="/programs" data-i18n="nav.programs">Programmes</a></li>
            <li><a href="/training" data-i18n="nav.training">Drug Discovery</a></li>
            <li><a href="/events" data-i18n="nav.events">Événements</a></li>
            <li><a href="/services" data-i18n="nav.services">Services</a></li>
            <li><a href="/team" data-i18n="nav.team">Équipe</a></li>
            <li><a href="/apply" data-i18n="nav.apply">Candidater</a></li>
            <li><a href="/contact" data-i18n="nav.contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 data-i18n="footer.programs.title">Programmes</h4>
          <ul>
            <li><a href="/programs#informatique" data-i18n="footer.programs.1">Informatique &amp; numérique</a></li>
            <li><a href="/programs#recherche" data-i18n="footer.programs.2">Recherche &amp; sciences</a></li>
            <li><a href="/programs#entrepreneuriat" data-i18n="footer.programs.3">Entrepreneuriat</a></li>
            <li><a href="/programs#developpement" data-i18n="footer.programs.4">Développement personnel</a></li>
          </ul>
        </div>

        <div>
          <h4 data-i18n="footer.contact.title">Contact</h4>
          <ul>
            <li><a href="mailto:contact@talentuousminds.org">contact@talentuousminds.org</a></li>
            <li><a href="https://web.facebook.com/talentuousMinds/" target="_blank" rel="noopener">Facebook</a></li>
            <li><a href="/legal" data-i18n="footer.legal">Mentions légales</a></li>
          </ul>
        </div>
      </div>

      <div class="site-footer__bottom">
        <span>© <span data-current-year>2026</span> Talentuous Minds Fellowship. <span data-i18n="footer.rights">Tous droits réservés.</span></span>
        <a href="#main" data-i18n="footer.back">Retour en haut</a>
      </div>
    </div>
  </footer>

  <script src="/assets/js/i18n.js"></script>
</body>
</html>
"""


def main() -> int:
    """Génère les pages des modules 2 à 7."""
    root = Path(__file__).resolve().parent
    generated = []

    for num, cfg in MODULES.items():
        path = root / f"training-module-{num}.html"
        path.write_text(build_page(num, cfg), encoding="utf-8")
        generated.append(path.name)

    print(f"✓ {len(generated)} pages générées :")
    for name in generated:
        print(f"    {name}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
