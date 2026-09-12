#!/usr/bin/env bash
# =============================================================================
# Génération du dépôt Git et préparation du déploiement Cloudflare Pages
# Talentuous Minds Fellowship
# =============================================================================
set -euo pipefail

cd "$(dirname "$0")"

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
info()  { echo -e "${GREEN}▸${NC} $*"; }
warn()  { echo -e "${YELLOW}⚠${NC}  $*"; }
error() { echo -e "${RED}✖${NC}  $*"; }

# -----------------------------------------------------------------------------
# 1. Vérifications préalables
# -----------------------------------------------------------------------------
info "Vérification des prérequis"

command -v git >/dev/null 2>&1 || { error "git n'est pas installé."; exit 1; }

REQUIRED=(index.html about.html programs.html events.html services.html team.html contact.html 404.html
          robots.txt sitemap.xml assets/css/style.css assets/js/i18n.js)
for f in "${REQUIRED[@]}"; do
  [[ -f "$f" ]] || { error "Fichier manquant : $f"; exit 1; }
done
info "Tous les fichiers requis sont présents"

# -----------------------------------------------------------------------------
# 2. Contrôle des emplacements à compléter
# -----------------------------------------------------------------------------
info "Recherche des contenus à compléter"
PENDING=$(grep -rn "REMPLACER\|À compléter\|To be completed\|To be confirmed" \
          --include="*.html" --include="*.js" . 2>/dev/null | wc -l || true)

if [[ "$PENDING" -gt 0 ]]; then
  warn "$PENDING emplacement(s) à compléter avant publication :"
  grep -rn "REMPLACER\|À compléter\|To be completed\|To be confirmed" \
    --include="*.html" --include="*.js" . 2>/dev/null | sed 's/^/    /' || true
  echo
fi

# -----------------------------------------------------------------------------
# 3. Initialisation du dépôt Git
# -----------------------------------------------------------------------------
if [[ -d .git ]]; then
  info "Dépôt Git déjà initialisé"
else
  info "Initialisation du dépôt Git"
  git init -q
  git branch -M main
fi

# -----------------------------------------------------------------------------
# 4. Indexation et commit
# -----------------------------------------------------------------------------
info "Indexation des fichiers"
git add -A

if git diff --cached --quiet; then
  info "Aucune modification à committer"
else
  git commit -q -m "feat: site vitrine bilingue Talentuous Minds Fellowship

- 7 pages statiques : accueil, à propos, programmes, événements, services, équipe, contact
- Système i18n FR/EN sans dépendance (assets/js/i18n.js)
- Design system complet (assets/css/style.css)
- Pages 404, robots.txt, sitemap.xml
- Aucun contenu inventé : emplacements marqués à compléter"
  info "Commit créé"
fi

# -----------------------------------------------------------------------------
# 5. Instructions de déploiement
# -----------------------------------------------------------------------------
echo
info "Dépôt prêt. Étapes suivantes :"
cat <<'EOF'

  1. Créer le dépôt distant sur GitHub :
       gh repo create talentuous-minds --public --source=. --push
     ou manuellement :
       git remote add origin git@github.com:VOTRE-COMPTE/talentuous-minds.git
       git push -u origin main

  2. Connecter Cloudflare Pages :
       https://dash.cloudflare.com → Workers & Pages → Create → Pages
       → Connect to Git → sélectionner le dépôt
       → Framework preset : None
       → Build command   : (vide)
       → Output directory: /
       → Save and Deploy

  3. Domaine personnalisé (optionnel) :
       Projet Pages → Custom domains → Set up a custom domain

EOF

info "Test local :  python3 -m http.server 8000  →  http://localhost:8000"
