#!/usr/bin/env python3
"""
Textes français des pages de modules — Talentuous Minds Fellowship
==================================================================

Ce fichier contient les textes français qui doivent être **écrits dans le HTML**
(le français est la langue par défaut du site ; l'anglais est fourni par
`assets/js/i18n.js`).

Il est importé par `generate_modules.py`.

Note : ces textes doivent rester synchronisés avec les traductions anglaises
définies dans `assets/js/i18n.js`.
"""

from __future__ import annotations

# -----------------------------------------------------------------------------
# Textes communs à toutes les pages de module
# -----------------------------------------------------------------------------
COMMON: dict[str, str] = {
    "mod.nav.back": "Module",
    "mod.nav.all": "Tous les modules",
    "mod.level": "Niveau",
    "mod.price": "Tarif",
    "mod.price.quote": "Sur devis",
    "mod.price.free": "Gratuit",
    "mod.format": "Format",
    "mod.objectives.eyebrow": "Objectifs pédagogiques",
    "mod.objectives.title": "À l'issue de ce module, vous saurez",
    "mod.day1": "Jour 1 — Fondements et préparation",
    "mod.day2": "Jour 2 — Application et analyse",
    "mod.day3": "Jour 3 — Consolidation et projet",
    "mod.schedule.caption": "Programme détaillé — Jour 1",
    "mod.schedule.caption2": "Programme détaillé — Jour 2",
    "mod.schedule.caption3": "Programme détaillé — Jour 3",
    "mod.col.time": "Horaire",
    "mod.col.topic": "Contenu",
    "mod.col.type": "Type",
    "mod.type.intro": "Introduction",
    "mod.type.theory": "Théorie",
    "mod.type.practice": "Travaux pratiques",
    "mod.type.wrap": "Synthèse",
    "mod.type.break": "Pause",
    "mod.break": "Pause",
    "mod.lunch": "Déjeuner",
    "mod.prereq.title": "Prérequis",
    "mod.material.title": "Matériel nécessaire",
    "mod.material.1": "Ordinateur avec 8 Go de RAM minimum",
    "mod.material.2": "Linux, macOS ou Windows 10+",
    "mod.material.3": "20 Go d'espace disque libre",
    "mod.material.4": "Logiciels fournis : AutoDock Vina, MGLTools, PyMOL",
    "mod.material.5": "50 Go d'espace disque libre (chimiothèques)",
    "mod.material.6": "Processeur 8 cœurs recommandé (dynamique)",
    "mod.material.7": "Connexion internet stable",
    "mod.material.8": "Aucun logiciel spécifique requis",
    "mod.cta.title": "Intéressé par ce module ?",
    "mod.cta.text": "Précisez votre statut et votre niveau. Nous vous répondrons avec les modalités et un devis adapté.",
    "mod.cta.btn": "Demander le programme",
    "mod.nav.prev.docking": "← Précédent : Docking moléculaire",
    "mod.nav.next.dynamics": "Suivant : Dynamique moléculaire →",
    "mod.nav.prev.screening": "← Précédent : Criblage virtuel",
    "mod.nav.next.analysis": "Suivant : Analyse des interactions →",
    "mod.nav.prev.dynamics": "← Précédent : Dynamique moléculaire",
    "mod.nav.next.prediction": "Suivant : Prédiction de structure →",
    "mod.nav.prev.analysis": "← Précédent : Analyse des interactions",
    "mod.nav.next.programming": "Suivant : Programmation scientifique →",
    "mod.nav.prev.prediction": "← Précédent : Prédiction de structure",
    "mod.nav.next.writing": "Suivant : Rédaction scientifique →",
    "mod.nav.prev.programming": "← Précédent : Programmation scientifique",
    "mod.nav.next": "Module suivant : Criblage virtuel →",
}

# -----------------------------------------------------------------------------
# Textes propres à chaque module
# -----------------------------------------------------------------------------
MODULE_TEXTS: dict[int, dict[str, str]] = {
    2: {
        "training.m2.title": "Criblage virtuel",
        "training.m2.text": (
            "Constitution d'une chimiothèque, préparation en lot des ligands, criblage "
            "automatisé et hiérarchisation des résultats. Filtration ADMET et "
            "classification des hits."
        ),
        "training.m2.dur": "3 jours (21 h)",
        "mod.m2.o1": "Identifier et sélectionner les sources de composés pertinentes pour une campagne de criblage",
        "mod.m2.o2": "Préparer une chimiothèque de façon automatisée et en lot",
        "mod.m2.o3": "Mettre en place et exécuter un criblage virtuel à grande échelle",
        "mod.m2.o4": "Appliquer les filtres ADMET et les règles de Lipinski pour éliminer les composés inadaptés",
        "mod.m2.o5": "Classifier et prioriser les hits pour les tests expérimentaux",
        "mod.m2.prereq2": "Utilisation de base de la ligne de commande",
        "mod.m2.prereq3": "Notions de docking moléculaire",
        "mod.m2.d1s1": "Accueil, présentation des participants et des objectifs",
        "mod.m2.d1s2": "Théorie : principes du criblage virtuel, du criblage haut débit à l'in silico",
        "mod.m2.d1s3": "Sources de composés : ZINC, PubChem, ChEMBL. Critères de choix d'une chimiothèque",
        "mod.m2.d1s4": "Téléchargement et filtrage d'une chimiothèque",
        "mod.m2.d1s5": "Préparation en lot des ligands : protonation, tautomères, conformères",
        "mod.m2.d1s6": "Synthèse de la journée et questions",
        "mod.m2.d2s1": "Pourquoi automatiser ? Vue d'ensemble d'un pipeline de criblage",
        "mod.m2.d2s2": "Écriture d'un script de préparation en lot",
        "mod.m2.d2s3": "Lancement du criblage en parallèle. Suivi et gestion des erreurs",
        "mod.m2.d2s4": "Collecte et consolidation des résultats",
        "mod.m2.d2s5": "Extraction et interprétation des scores",
        "mod.m2.d2s6": "Synthèse de la journée et questions",
        "mod.m2.d3s1": "Filtres ADMET : absorption, distribution, métabolisme, excrétion, toxicité",
        "mod.m2.d3s2": "Application des règles de Lipinski et autres filtres",
        "mod.m2.d3s3": "Regroupement des hits par similarité chimique",
        "mod.m2.d3s4": "Priorisation des hits : score, interactions, diversité",
        "mod.m2.d3s5": "Évaluation finale et clôture",
    },
    3: {
        "training.m3.title": "Dynamique moléculaire",
        "training.m3.text": (
            "Simulation de la stabilité des complexes protéine-ligand dans le temps : "
            "préparation du système, solvatation, équilibration et analyse des trajectoires."
        ),
        "training.m3.dur": "3 jours (21 h)",
        "mod.m3.o1": "Préparer un système protéine-ligand pour une simulation de dynamique moléculaire",
        "mod.m3.o2": "Choisir un champ de forces et des paramètres adaptés",
        "mod.m3.o3": "Exécuter les phases de minimisation, d'équilibration et de production",
        "mod.m3.o4": "Analyser le RMSD, le RMSF et la stabilité des liaisons hydrogène",
        "mod.m3.o5": "Estimer l'énergie libre de liaison (MM/PBSA, MM/GBSA)",
        "mod.m3.prereq2": "Notions de mécanique classique",
        "mod.m3.prereq3": "À l'aise avec la ligne de commande",
        "mod.m3.d1s1": "Accueil, présentation des participants et des objectifs",
        "mod.m3.d1s2": "Théorie : pourquoi la dynamique ? Limites du docking statique",
        "mod.m3.d1s3": "Champs de forces : AMBER, CHARMM, OPLS. Choix des paramètres",
        "mod.m3.d1s4": "Préparation du système : solvatation, ions, taille de la boîte",
        "mod.m3.d1s5": "Minimisation et équilibration",
        "mod.m3.d1s6": "Synthèse de la journée et questions",
        "mod.m3.d2s1": "Phase de production : durée, pas de temps, sauvegarde de la trajectoire",
        "mod.m3.d2s2": "Lancement et suivi de la simulation",
        "mod.m3.d2s3": "Analyse du RMSD : stabilité du système au cours du temps",
        "mod.m3.d2s4": "Analyse du RMSF : flexibilité des résidus",
        "mod.m3.d2s5": "Analyse des liaisons hydrogène au cours de la trajectoire",
        "mod.m3.d2s6": "Synthèse de la journée et questions",
        "mod.m3.d3s1": "Théorie : principes du calcul d'énergie libre",
        "mod.m3.d3s2": "MM/PBSA et MM/GBSA : mise en œuvre pratique",
        "mod.m3.d3s3": "Comparaison de plusieurs ligands : décomposition par résidu",
        "mod.m3.d3s4": "Interprétation des résultats et pièges courants",
        "mod.m3.d3s5": "Évaluation finale et clôture",
    },
    4: {
        "training.m4.title": "Analyse des interactions",
        "training.m4.text": (
            "Identification et quantification des interactions protéine-ligand, analyse "
            "des poses et validation des résultats. Production de figures pour publication."
        ),
        "training.m4.dur": "2 jours (14 h)",
        "mod.m4.o1": "Identifier et classer les interactions protéine-ligand",
        "mod.m4.o2": "Utiliser PLIP pour analyser automatiquement un complexe",
        "mod.m4.o3": "Comparer des poses à l'aide d'empreintes d'interaction",
        "mod.m4.o4": "Regrouper les poses de docking pour identifier les modes de liaison représentatifs",
        "mod.m4.o5": "Produire des figures de qualité publication",
        "mod.m4.prereq2": "Notions sur les interactions non covalentes",
        "mod.m4.prereq3": "Avoir déjà réalisé un docking",
        "mod.m4.d1s1": "Accueil, présentation des participants et des objectifs",
        "mod.m4.d1s2": "Théorie : types d'interactions, géométrie, contribution énergétique",
        "mod.m4.d1s3": "PLIP : installation et première analyse",
        "mod.m4.d1s4": "Lecture d'un rapport PLIP : liaisons hydrogène, contacts hydrophobes, π-stacking",
        "mod.m4.d1s5": "Analyse de plusieurs complexes et comparaison des profils",
        "mod.m4.d1s6": "Synthèse de la journée et questions",
        "mod.m4.d2s1": "Empreintes d'interaction (IFP) : principe et cas d'usage",
        "mod.m4.d2s2": "Calcul et comparaison d'IFP",
        "mod.m4.d2s3": "Regroupement des poses : méthodes et choix du seuil",
        "mod.m4.d2s4": "Scoring consensus : combiner plusieurs fonctions",
        "mod.m4.d2s5": "Visualisation PyMOL et production de diagrammes 2D",
        "mod.m4.d2s6": "Évaluation finale et clôture",
    },
    5: {
        "training.m5.title": "Prédiction de structure",
        "training.m5.text": (
            "Obtention d'une structure 3D lorsque aucune structure expérimentale n'est "
            "disponible : AlphaFold, modélisation par homologie et évaluation de la "
            "qualité du modèle."
        ),
        "training.m5.dur": "2 jours (14 h)",
        "mod.m5.o1": "Choisir une méthode de prédiction de structure adaptée à votre cas",
        "mod.m5.o2": "Exécuter AlphaFold ou ESMFold et interpréter les résultats",
        "mod.m5.o3": "Lire et évaluer de façon critique les scores pLDDT et PAE",
        "mod.m5.o4": "Construire un modèle par homologie et valider sa qualité",
        "mod.m5.o5": "Préparer un modèle prédit pour le docking moléculaire",
        "mod.m5.prereq2": "Biochimie structurale de base",
        "mod.m5.prereq3": "Aucune expérience en programmation requise",
        "mod.m5.d1s1": "Accueil, présentation des participants et des objectifs",
        "mod.m5.d1s2": "Théorie : le problème du repliement des protéines et ses approches computationnelles",
        "mod.m5.d1s3": "AlphaFold2 et ESMFold : utilisation des serveurs en ligne",
        "mod.m5.d1s4": "Lecture des scores pLDDT et PAE : ce qui est fiable et ce qui ne l'est pas",
        "mod.m5.d1s5": "Cas pratique : prédire une cible sans structure expérimentale",
        "mod.m5.d1s6": "Synthèse de la journée et questions",
        "mod.m5.d2s1": "Modélisation par homologie : principes et cas d'usage",
        "mod.m5.d2s2": "Choix du gabarit et alignement avec MODELLER ou SWISS-MODEL",
        "mod.m5.d2s3": "Validation du modèle : Ramachandran, Z-score, ERRAT",
        "mod.m5.d2s4": "Réparation et préparation du modèle pour le docking",
        "mod.m5.d2s5": "Comparaison de structures prédites et expérimentales",
        "mod.m5.d2s6": "Évaluation finale et clôture",
    },
    6: {
        "training.m6.title": "Programmation scientifique",
        "training.m6.text": (
            "Automatisation d'un pipeline de docking de bout en bout : préparation, "
            "lancement, analyse et génération de rapports. Module d'ouverture."
        ),
        "training.m6.dur": "3 jours (21 h)",
        "mod.m6.o1": "Écrire des scripts Python pour automatiser les tâches répétitives",
        "mod.m6.o2": "Manipuler des structures moléculaires avec RDKit et Biopython",
        "mod.m6.o3": "Construire un pipeline de docking complet, de la préparation à l'analyse",
        "mod.m6.o4": "Analyser les résultats avec pandas et produire des tableaux",
        "mod.m6.o5": "Générer des rapports automatisés",
        "mod.m6.prereq2": "Aucune expérience en programmation requise",
        "mod.m6.prereq3": "Maîtrise de base de l'ordinateur",
        "mod.m6.d1s1": "Accueil, présentation des participants et des objectifs",
        "mod.m6.d1s2": "Bases de Python : variables, boucles, fonctions, modules",
        "mod.m6.d1s3": "Manipulation de fichiers et de chemins, lecture de fichiers PDB",
        "mod.m6.d1s4": "Introduction à RDKit : lecture et écriture de molécules",
        "mod.m6.d1s5": "Manipulation de structures avec Biopython",
        "mod.m6.d1s6": "Synthèse de la journée et questions",
        "mod.m6.d2s1": "Principes d'un pipeline reproductible",
        "mod.m6.d2s2": "Écriture du script de préparation",
        "mod.m6.d2s3": "Automatisation du lancement en lot",
        "mod.m6.d2s4": "Analyse des fichiers de sortie et extraction des scores",
        "mod.m6.d2s5": "Construction de tableaux de résultats avec pandas",
        "mod.m6.d2s6": "Synthèse de la journée et questions",
        "mod.m6.d3s1": "Génération de graphiques et de tableaux de synthèse",
        "mod.m6.d3s2": "Automatisation de la génération de rapports",
        "mod.m6.d3s3": "Versionnage avec Git : les bases",
        "mod.m6.d3s4": "Documenter et partager un script",
        "mod.m6.d3s5": "Évaluation finale et clôture",
    },
    7: {
        "training.m7.title": "Rédaction scientifique",
        "training.m7.text": (
            "Structuration et rédaction d'un article ou d'un mémoire présentant des "
            "résultats de modélisation moléculaire, avec figures et références conformes."
        ),
        "training.m7.dur": "2 jours (14 h)",
        "mod.m7.o1": "Structurer un article scientifique selon le format IMRaD",
        "mod.m7.o2": "Rédiger la section Méthodes d'une étude de docking de façon reproductible",
        "mod.m7.o3": "Présenter les résultats dans des tableaux et figures clairs",
        "mod.m7.o4": "Gérer les références bibliographiques avec BibTeX",
        "mod.m7.o5": "Répondre de façon constructive aux commentaires des relecteurs",
        "mod.m7.prereq2": "Avoir des résultats à présenter",
        "mod.m7.prereq3": "Maîtrise de base du français ou de l'anglais écrit",
        "mod.m7.d1s1": "Accueil, présentation des participants et des objectifs",
        "mod.m7.d1s2": "Structure IMRaD : rôle de chaque section",
        "mod.m7.d1s3": "Construction de l'argumentation : de la question biologique à la conclusion",
        "mod.m7.d1s4": "Rédaction de l'introduction : contexte, lacune, objectif",
        "mod.m7.d1s5": "Rédaction de la section Méthodes pour le docking : exigences de reproductibilité",
        "mod.m7.d1s6": "Synthèse de la journée et questions",
        "mod.m7.d2s1": "Présentation des résultats : choisir entre tableau et figure",
        "mod.m7.d2s2": "Création de figures claires pour la modélisation moléculaire",
        "mod.m7.d2s3": "Rédaction de la section Résultats sans interprétation",
        "mod.m7.d2s4": "Rédaction de la discussion : limites et perspectives",
        "mod.m7.d2s5": "Gestion des références avec BibTeX",
        "mod.m7.d2s6": "Réponse aux relecteurs et évaluation finale",
    },
}


def get_text(key: str, module: int | None = None) -> str:
    """Retourne le texte français associé à une clé i18n.

    Args:
        key: La clé i18n (ex. « mod.day1 »).
        module: Le numéro du module, pour les clés spécifiques.

    Returns:
        Le texte français, ou la clé entre crochets si introuvable
        (afin de rendre le manque visible plutôt que silencieux).
    """
    if module is not None and module in MODULE_TEXTS:
        module_dict = MODULE_TEXTS[module]
        if key in module_dict:
            return module_dict[key]
    if key in COMMON:
        return COMMON[key]
    # Visible plutôt que silencieux : signale immédiatement une clé manquante
    return f"[{key}]"
