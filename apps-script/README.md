# Suivi des demandes de devis — Google Sheets + Apps Script

Système gratuit de collecte et suivi des demandes de devis, sans backend à
héberger. Les demandes sont enregistrées dans une Google Sheet et une
notification est envoyée par e-mail.

---

## 1. Comment ça marche

```
Visiteur remplit le formulaire
        ↓
services-simulations.html envoie une requête POST
        ↓
Apps Script (Google) reçoit la requête
        ↓
    ┌───────────────────┴───────────────────┐
    ↓                                       ↓
Ligne ajoutée dans la Sheet          E-mail de notification
    ↓
Référence générée (TM-20260913-0001)
```

**Aucun serveur à payer** : Apps Script est hébergé par Google, gratuitement.

---

## 2. Installation (5 minutes)

### Étape 1 — Créer la Google Sheet

1. Aller sur <https://sheets.new>
2. Nommer la feuille : **Demandes de devis — Talentuous Minds**

### Étape 2 — Ouvrir l'éditeur Apps Script

Dans la Sheet : **Extensions** → **Apps Script**

### Étape 3 — Coller le code

1. Supprimer tout le contenu de l'éditeur
2. Copier l'intégralité de `apps-script/Code.gs`
3. Coller dans l'éditeur
4. **Vérifier la ligne 41** (adresse de notification) :

```javascript
var NOTIFICATION_EMAIL = 'talentsiaminds@gmail.com';
```

C'est le compte Google officiel de l'organisation. Toutes les notifications
y arrivent, et la Google Sheet doit appartenir à ce même compte.

### Étape 4 — Déployer l'application Web

1. Cliquer sur **Déployer** → **Nouveau déploiement**
2. Cliquer sur l'icône ⚙️ (Type) → **Application Web**
3. Remplir :

| Champ | Valeur |
|---|---|
| Description | `API demandes de devis` |
| Exécuter en tant que | **Moi** |
| Qui a accès | **Tout le monde** |

4. Cliquer sur **Déployer**
5. Autoriser les permissions demandées (Google affichera un avertissement
   « application non vérifiée » — c'est normal pour un script personnel :
   cliquer sur *Paramètres avancés* → *Accéder à…*)
6. **Copier l'URL de l'application Web** (format `https://script.google.com/macros/s/AKfy.../exec`)

### Étape 5 — Connecter le site

Dans `services-simulations.html`, chercher :

```javascript
var APPS_SCRIPT_URL = "";
```

Remplacer par l'URL copiée :

```javascript
var APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfy.../exec";
```

Puis committer et pousser :

```bash
git add services-simulations.html
git commit -m "feat: connexion du formulaire de devis à Apps Script"
git push
```

---

## 3. Vérification

### Tester depuis Apps Script

1. Dans l'éditeur Apps Script, sélectionner la fonction `testApi`
2. Cliquer sur **Exécuter**
3. Une ligne de test doit apparaître dans la Sheet

### Tester depuis le site

1. Ouvrir `/services-simulations`
2. Remplir le formulaire
3. Envoyer
4. Vérifier que la ligne apparaît dans la Sheet (délai : quelques secondes)

### Vérifier l'API directement

Ouvrir l'URL du script dans un navigateur. La réponse doit être :

```json
{"ok":true,"service":"Talentuous Minds — API demandes de devis","status":"opérationnel"}
```

---

## 4. Structure de la Sheet

| Colonne | Contenu |
|---|---|
| A | Horodatage |
| B | Référence (`TM-20260913-0001`) |
| C | Statut (`Nouveau`, `En cours`, `Devis envoyé`, `Accepté`, `Refusé`) |
| D | Nom |
| E | E-mail |
| F | Organisation |
| G | Profil |
| H | Prestations demandées |
| I | Cible biologique |
| J | Code PDB |
| K | Nombre de molécules |
| L | Délai souhaité |
| M | Description |
| N | Données disponibles |
| O | Langue (fr/en) |
| P | Notes internes |

La colonne **Statut** est faite pour être modifiée manuellement au fil du
traitement. La colonne **Notes internes** sert à consigner vos échanges.

---

## 5. Fonctions d'administration

Un menu **« Suivi devis »** apparaît dans la Sheet après rechargement :

| Action | Effet |
|---|---|
| **Tester l'API** | Ajoute une ligne de test |
| **Statistiques** | Affiche le nombre de demandes par statut |

---

## 6. Sécurité — limites honnêtes

### Ce que ce système protège

- **Injection de formules** : une valeur commençant par `=`, `+`, `-` ou `@`
  est préfixée d'une apostrophe (fonction `sanitize_`). Sans cela, un visiteur
  pourrait exécuter des formules dans votre Sheet.
- **Spam occasionnel** : le jeton partagé (`SHARED_TOKEN`) filtre les envois
  automatisés basiques.
- **Données volumineuses** : les champs sont tronqués à 5 000 caractères.

### Ce que ce système NE protège PAS

- **L'URL du script est publique.** N'importe qui peut la lire dans le code
  source de la page. Le jeton est visible aussi.
- **Pas d'authentification forte.** Un attaquant déterminé peut envoyer des
  données arbitraires. Pour un site vitrine, le risque est faible ; pour un
  usage critique, il faudrait un vrai backend.
- **Pas de chiffrement supplémentaire.** Les données sont protégées par
  Google, pas par vous.
- **Quota Apps Script** : ~20 000 requêtes/jour en gratuit. Largement
  suffisant pour un site vitrine.

### Recommandation

Pour limiter le spam, ajouter un champ caché (honeypot) dans le formulaire :
un champ invisible que seuls les robots remplissent. Si rempli, ignorer
l'envoi. Non implémenté ici pour rester simple.

---

## 7. RGPD — point important

En utilisant Google Sheets, **Google devient sous-traitant** de vos données
personnelles. Cela implique :

1. **Mentionner Google** dans la politique de confidentialité du site
   (`/legal`) comme sous-traitant
2. **Informer** les visiteurs que leurs données sont stockées chez Google
3. **Vérifier** que Google est bien couvert par un cadre légal valide
   (Google propose un DPA — *Data Processing Addendum* — dans Workspace)

**Le formulaire actuel mentionne déjà** : « J'accepte que mes données soient
utilisées pour traiter ma demande de devis. Elles ne seront ni vendues ni
transmises à des tiers. »

Cette phrase est **incomplète** si vous utilisez Google Sheets : Google est
un tiers technique. Il faudra mettre à jour les mentions légales.

---

## 8. Dépannage

| Problème | Cause probable | Solution |
|---|---|---|
| Rien n'arrive dans la Sheet | URL non renseignée dans le HTML | Vérifier `APPS_SCRIPT_URL` |
| Erreur « Jeton invalide » | `SHARED_TOKEN` différent entre les deux fichiers | Aligner les valeurs |
| Aucun e-mail reçu | `NOTIFICATION_EMAIL` non modifié | Modifier la ligne 41 de `Code.gs` |
| Erreur CORS dans la console | Normal avec `mode: "no-cors"` | Sans conséquence : la requête passe quand même |
| Ligne vide dans la Sheet | Champ obligatoire manquant | Vérifier la validation côté serveur |

**Note sur CORS** : le formulaire utilise `mode: "no-cors"` et
`Content-Type: text/plain`. C'est volontaire : Apps Script ne gère pas les
requêtes préalables (preflight) déclenchées par `application/json`. La
requête aboutit, mais JavaScript ne peut pas lire la réponse — d'où
l'absence de vérification côté client.

---

## 9. Alternatives

| Solution | Avantage | Inconvénient |
|---|---|---|
| **Apps Script** (cette solution) | Gratuit, illimité en pratique | URL publique, pas de vraie auth |
| **Formspree** | Vraie API, anti-spam intégré | 50 envois/mois en gratuit |
| **Web3Forms** | 250 envois/mois, clé d'accès | Dépendance tierce |
| **Cloudflare Workers** | Contrôle total, même hébergeur | Nécessite du JavaScript à écrire |
| **Tally / Google Forms** | Zéro code | Design moins intégré au site |

Si le volume de demandes devient important, migrer vers **Cloudflare Workers**
+ une base de données serait plus robuste — vous êtes déjà chez Cloudflare.
