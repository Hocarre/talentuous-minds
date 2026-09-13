# Formulaire de candidature — Google Forms bilingue

Génération automatique d'un Google Form de candidature **bilingue
(anglais / français)**, avec Google Sheet de réponses et notifications.

> **Note** : le site est en **anglais par défaut**, avec le français en
> traduction. Le formulaire suit la même logique : l'anglais est mis en avant.

---

## 1. Trois approches possibles

Google Forms ne gère pas nativement le multilingue. Trois solutions :

| Approche | Avantage | Inconvénient |
|---|---|---|
| **A. Un formulaire bilingue** | Un seul lien, une seule Sheet | Chargé visuellement |
| **B. Deux formulaires séparés** | Propre pour chaque audience | Deux Sheets à suivre |
| **C. Anglais + description FR** | Léger | Moins accessible |

Le script implémente **A** par défaut. Pour **B**, exécuter `creerDeuxFormulaires()`.

---

## 2. Installation (3 minutes)

### Étape 1 — Ouvrir Apps Script

1. Aller sur **<https://script.google.com>**
2. Cliquer sur **Nouveau projet**
3. Nommer : **`Générateur formulaire candidature bilingue`**

### Étape 2 — Coller le code

1. Supprimer le contenu par défaut
2. Ouvrir `apps-script/CreerFormulaireBilingue.gs`
3. Copier **tout** son contenu
4. Coller dans l'éditeur
5. `Ctrl+S`

### Étape 3 — Vérifier la configuration

```javascript
var NOTIFICATION_EMAIL = 'talentsiaminds@gmail.com';
var CREATE_RESPONSE_SHEET = true;
```

### Étape 4 — Exécuter

1. Sélectionner la fonction **`creerFormulaireBilingue`**
2. Cliquer sur **Exécuter**
3. Autoriser les permissions (*Paramètres avancés* → *Accéder à…*)

### Étape 5 — Récupérer l'URL

1. **Affichage** → **Journaux d'exécution**
2. Copier l'**URL publique** :

```
https://docs.google.com/forms/d/e/1FAIpQLS.../viewform
```

### Étape 6 — Activer les notifications

1. Sélectionner la fonction **`installerNotificationCandidatures`**
2. **Exécuter**

### Étape 7 — Connecter le site

Dans `apply.html`, remplacer l'attribut `href` du bouton
`id="google-form-link"` par l'URL copiée.

---

## 3. Structure du formulaire bilingue

Chaque question affiche les deux langues : `English / Français`.

### Section 1 — Profile / Profil

| Question | Type | Obligatoire |
|---|---|---|
| First name / Prénom | Texte | Oui |
| Last name / Nom | Texte | Oui |
| Email address / Adresse e-mail | Texte (validé) | Oui |
| Phone / WhatsApp | Texte | Non |
| Country / Pays | Texte | Non |
| City / Ville | Texte | Non |

### Section 2 — Background / Parcours

| Question | Type | Obligatoire |
|---|---|---|
| Current situation / Situation actuelle | Choix unique (7 options bilingues) | Oui |
| Education level / Niveau d'études | Choix unique (6 options) | Non |
| Field of study / Domaine d'études | Texte | Non |
| Institution / Établissement | Texte | Non |

### Section 3 — Program / Programme

| Question | Type | Obligatoire |
|---|---|---|
| Program / Programme | Choix unique (8 options) | Oui |
| Preferred format / Format souhaité | Choix unique (4 options) | Non |
| Availability / Disponibilité | Choix unique (4 options) | Non |
| Specific needs / Besoins particuliers | Cases à cocher (3 options) | Non |

### Section 4 — Motivation

| Question | Type | Obligatoire |
|---|---|---|
| Why do you want to join? / Pourquoi ? | Paragraphe | Oui |
| What do you expect? / Qu'attendez-vous ? | Paragraphe | Non |
| How did you hear about us? / Comment ? | Paragraphe | Non |

### Section 5 — Consent / Consentement

| Question | Type | Obligatoire |
|---|---|---|
| Use of your data / Utilisation des données | Case à cocher | Oui |

---

## 4. Variante : deux formulaires séparés

Si vous préférez un formulaire propre par langue :

1. Exécuter la fonction **`creerDeuxFormulaires`**
2. Deux formulaires sont créés :
   - `Application — Talentuous Minds Fellowship` (anglais)
   - `Candidature — Talentuous Minds Fellowship` (français)
3. Chacun a sa propre Sheet de réponses
4. Coller l'URL anglaise dans `apply.html`
5. Pour l'URL française, modifier la clé `apply.form.btn` dans `i18n.js`

**Inconvénient** : deux Sheets à suivre séparément.

---

## 5. Fonctions disponibles

| Fonction | Rôle |
|---|---|
| `creerFormulaireBilingue()` | Crée le formulaire bilingue |
| `creerDeuxFormulaires()` | Crée deux formulaires (EN + FR) |
| `afficherUrlsFormulaires()` | Réaffiche les URL existantes |
| `installerNotificationCandidatures()` | Active les notifications |
| `onCandidatureSoumise(e)` | Appelée automatiquement (ne pas exécuter) |

---

## 6. Suivi des candidatures

La Sheet de réponses contient une ligne par candidature.

### Ajouter une colonne de suivi

Ajouter une colonne **Status / Statut** avec des valeurs cohérentes :

| Statut | Signification |
|---|---|
| `New` / `Nouveau` | Candidature reçue |
| `In review` / `En cours` | En cours d'examen |
| `Interview` / `Entretien` | Entretien programmé |
| `Accepted` / `Accepté` | Candidature acceptée |
| `Rejected` / `Refusé` | Candidature refusée |
| `Waiting list` / `Liste d'attente` | En attente de place |

---

## 7. RGPD

Le Google Form stocke les candidatures chez **Google LLC**. Cela implique :

1. **Mentionner Google** comme sous-traitant dans `/legal`
   → **déjà fait**
2. **Informer** les candidats du traitement
   → **déjà fait** (section 5 du formulaire)
3. **Prévoir la suppression** des candidatures non retenues

### Durée de conservation recommandée

| Type | Durée |
|---|---|
| Candidature acceptée | Durée du programme + 1 an |
| Candidature refusée | 6 mois, puis suppression |
| Liste d'attente | Jusqu'à décision définitive |

---

## 8. Dépannage

| Problème | Cause | Solution |
|---|---|---|
| « Aucun formulaire trouvé » | Script exécuté avant création | Lancer `creerFormulaireBilingue` d'abord |
| Pas d'e-mail de notification | Déclencheur non installé | Lancer `installerNotificationCandidatures` |
| L'URL ne fonctionne pas | URL d'édition au lieu de publique | Utiliser `/viewform`, pas `/edit` |
| Le formulaire demande une connexion | Restriction de partage | Formulaire → Réponses → ne pas restreindre |

---

## 9. Comparaison avec le formulaire local du site

| | Google Form | Formulaire local |
|---|---|---|
| Accès | Bouton principal sur `/apply` | Section « Local form » |
| Langues | Bilingue dans un formulaire | Bascule EN/FR native |
| Stockage | Google Sheet | Aucun (e-mail) |
| Suivi | Tableur avec statuts | Boîte e-mail |
| Expérience | Quitte le site | Reste sur le site |
| RGPD | Google sous-traitant | Aucun tiers |

**Recommandation** : Google Form comme parcours principal (meilleur suivi),
formulaire local comme alternative.

