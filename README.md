# Talentuous Minds Fellowship — Site vitrine

Site vitrine statique **bilingue (FR/EN)** pour **Talentuous Minds Fellowship**.

- **Zéro dépendance** : HTML5 + CSS + JavaScript vanilla
- **Zéro build** : aucun `npm install`, aucun bundler
- **100 % statique** : déployable gratuitement sur Cloudflare Pages, GitHub Pages, Netlify…

---

## 1. Structure du projet

```
talentuous-minds/
├── index.html          # Accueil : hero, 6 pôles, approche, public cible, CTA
├── about.html          # À propos : qui sommes-nous, vision, mission, valeurs, impact, partenaires
├── programs.html       # Programmes : 4 pôles de formation + événements documentés
├── training.html       # Formations Drug Discovery : 7 modules spécialisés
├── events.html         # Événements : fiches détaillées + structure d'archive
├── services.html       # Services : data & analyse (6 services + démarche)
├── team.html           # Équipe : coordination, formateurs, bénévoles
├── apply.html          # Candidature : formulaire multi-étapes (5 étapes)
├── contact.html        # Contact : formulaire mailto + coordonnées
├── legal.html          # Mentions légales, confidentialité, cookies
├── 404.html            # Page d'erreur personnalisée
├── robots.txt          # Directives d'indexation
├── sitemap.xml         # Plan du site
├── deploy.sh           # Génération du dépôt Git + instructions de déploiement
├── serve.py            # Serveur local reproduisant les URLs propres de Cloudflare
├── .github/
│   └── workflows/
│       └── validate.yml  # CI : vérifie fichiers, navigation, liens, traductions, sitemap
└── assets/
    ├── css/style.css   # Design system complet (variables, composants, responsive)
    ├── js/i18n.js      # Système de traduction FR/EN + menu mobile + animations
    └── img/favicon.svg # Favicon vectoriel
```

---

## 2. Tester en local

Aucune installation requise. Cloudflare Pages sert les pages **sans extension**
(`/about`, `/programs`…), ce que `python3 -m http.server` ne sait pas faire.
Utilise donc le serveur fourni :

```bash
python3 serve.py
# puis ouvrir http://localhost:8000
```

Ou, pour un simple aperçu (les liens `.html` directs fonctionneront, mais pas les URLs propres) :

```bash
python3 -m http.server 8000
```

---

## 3. Système bilingue FR/EN

Le français est la langue par défaut et **le texte français est écrit directement dans le HTML**.
L'anglais est fourni par le dictionnaire `I18N.en` dans `assets/js/i18n.js`.

### Attributs utilisés

| Attribut | Effet |
|---|---|
| `data-i18n="clé"` | Remplace le `textContent` |
| `data-i18n-html="clé"` | Remplace le `innerHTML` (gras, liens) |
| `data-i18n-placeholder="clé"` | Remplace l'attribut `placeholder` |
| `data-i18n-aria="clé"` | Remplace l'attribut `aria-label` |

### Ajouter une traduction

1. Dans le HTML, ajouter l'attribut sur l'élément :
   ```html
   <p data-i18n="ma.section.texte">Texte en français</p>
   ```
2. Dans `assets/js/i18n.js`, ajouter la clé dans l'objet `en` :
   ```js
   "ma.section.texte": "Text in English",
   ```

La langue choisie est mémorisée dans `localStorage` (clé `tm-lang`).

---

## 4. Déploiement gratuit sur Cloudflare Pages

### Étape 1 — Créer le dépôt GitHub

Le script `deploy.sh` automatise cette étape :

```bash
./deploy.sh
```

Ou manuellement :

```bash
cd talentuous-minds
git init
git config user.name "Talentuous Minds"
git config user.email "contact@talentuousminds.org"
git add .
git commit -m "feat: site vitrine Talentuous Minds Fellowship"
git branch -M main
git remote add origin git@github.com:VOTRE-COMPTE/talentuous-minds.git
git push -u origin main
```

### Étape 2 — Connecter Cloudflare Pages

1. Aller sur <https://dash.cloudflare.com>
2. Menu **Workers & Pages** → **Create** → onglet **Pages** → **Connect to Git**
3. Autoriser Cloudflare à accéder à GitHub, puis sélectionner le dépôt `talentuous-minds`
4. Paramètres de build :
   - **Framework preset** : `None`
   - **Build command** : *(laisser vide)*
   - **Build output directory** : `/`
5. Cliquer sur **Save and Deploy**

Le site est en ligne en moins d'une minute sur `https://talentuous-minds.pages.dev`.

### Étape 3 — Domaine personnalisé (optionnel)

1. Dans le projet Pages → onglet **Custom domains** → **Set up a custom domain**
2. Entrer le domaine (ex. `talentuousminds.org`)
3. Si le domaine est géré par Cloudflare, le DNS est configuré automatiquement
4. Sinon, ajouter un enregistrement `CNAME` pointant vers `talentuous-minds.pages.dev`
5. Le certificat SSL est émis automatiquement

---

## 5. Intégration continue (GitHub Actions)

Le workflow `.github/workflows/validate.yml` s'exécute automatiquement à chaque
`push` et `pull request` sur `main`. Il **ne déploie pas** (Cloudflare Pages s'en
charge via son intégration Git native) : il sert de garde-fou.

### Vérifications effectuées

| # | Contrôle | Échec bloquant |
|---|---|---|
| 1 | Présence des 13 fichiers requis | Oui |
| 2 | Cohérence de la navigation (7 liens en-tête + 7 pied de page sur les 7 pages) | Oui |
| 3 | Absence de liens internes cassés | Oui |
| 4 | Parité des clés de traduction FR/EN | Non (avertissement) |
| 5 | Validité XML du `sitemap.xml` | Oui |
| 6 | Signalement des contenus à compléter | Non (notice) |

### Lancer les vérifications en local

```bash
# Navigation
for f in *.html; do
  echo "$f: $(sed -n '/<nav class="nav"/,/<\/nav>/p' $f | grep -c 'class="nav__link"')"
done

# Sitemap
python3 -c "import xml.etree.ElementTree as ET; ET.parse('sitemap.xml'); print('OK')"

# Contenus à compléter
grep -rn "REMPLACER\|À compléter\|To be completed\|To be confirmed" --include="*.html" .
```

---

## 6. Déploiement alternatif : GitHub Pages

1. Pousser le code sur GitHub
2. **Settings** → **Pages** → *Source* : `Deploy from a branch`
3. *Branch* : `main` / `/ (root)` → **Save**

Le site est publié sur `https://VOTRE-COMPTE.github.io/talentuous-minds/`.

> **Attention** : avec GitHub Pages en sous-dossier, les liens absolus (`/`) du `404.html`
> doivent être adaptés. Cloudflare Pages sert depuis la racine, donc aucun problème.

---

## 7. À compléter avant publication

Le contenu a été rédigé à partir des informations fournies. **Aucun chiffre, nom de partenaire
ou coordonnée n'a été inventé.** Les éléments suivants doivent être fournis par Talentuous Minds :

| Élément | Fichier | Statut |
|---|---|---|
| Adresse e-mail officielle | tous les pieds de page | `contact@talentuousminds.org` — **à confirmer** |
| Numéro de téléphone | `contact.html` | À compléter |
| Adresse postale | `contact.html` | À compléter |
| URL du formulaire de candidature | `contact.html` | `https://forms.gle/REMPLACER-PAR-VOTRE-FORMULAIRE` |
| Chiffres d'impact | `about.html` | Emplacements `—` en attente |
| Noms des partenaires | `about.html` | À publier après accord de chaque organisation |
| Logo officiel | `assets/img/` | Favicon provisoire « TM » |
| Photos d'événements | `events.html` | Emplacements « Photo à fournir » |
| Lieux des événements 2 et 3 | `events.html` | À compléter |
| Noms et rôles de l'équipe | `team.html` | À fournir avec accord des personnes |
| Réseaux sociaux | tous les pieds de page | Seul Facebook est renseigné |

### Rechercher tous les emplacements à compléter

```bash
grep -rn "REMPLACER\|À compléter\|To be completed\|To be confirmed" .
```

---

## 8. Accessibilité et qualité

- Structure sémantique HTML5 (`header`, `nav`, `main`, `section`, `footer`)
- Lien d'évitement (« Aller au contenu principal »)
- Attributs `aria-*` sur la navigation, le menu mobile et le sélecteur de langue
- Contraste conforme WCAG AA sur les textes principaux
- Respect de `prefers-reduced-motion`
- Feuille de style d'impression
- Responsive mobile-first (menu hamburger sous 760 px)

---

## 9. Notes techniques

- **Le formulaire de contact n'envoie rien à un serveur** : il construit un lien `mailto:`
  qui ouvre le client de messagerie du visiteur. Aucune donnée n'est collectée ni stockée.
- **Pour un vrai formulaire** (sans backend) : utiliser un service tiers comme
  [Formspree](https://formspree.io), [Web3Forms](https://web3forms.com) ou
  [Tally](https://tally.so), puis remplacer le gestionnaire JavaScript dans `contact.html`.
- **Cloudflare Pages ne supporte pas Python côté serveur.** Ce site est entièrement statique,
  donc aucun problème. Pour un backend Python, il faudrait un autre hébergeur.

---

## 10. Licence et crédits

© Talentuous Minds Fellowship. Tous droits réservés.

Polices : pile système (`Inter`, `Segoe UI`, `system-ui`) — aucune dépendance externe.
