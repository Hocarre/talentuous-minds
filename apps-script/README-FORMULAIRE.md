# Formulaire de candidature — Google Forms

Génération automatique d'un Google Form complet pour les candidatures, avec
Google Sheet de réponses et notifications par e-mail.

---

## 1. Pourquoi un Google Form ?

| Avantage | Détail |
|---|---|
| **Aucun code à écrire** | Le script crée les 17 questions automatiquement |
| **Sheet de réponses liée** | Chaque candidature apparaît dans un tableur |
| **Notifications** | Un e-mail à chaque nouvelle candidature |
| **Anti-spam intégré** | Google filtre les soumissions automatisées |
| **Export facile** | CSV, Excel, PDF depuis la Sheet |
| **Gratuit** | Sans limite pratique pour une association |

---

## 2. Installation (3 minutes)

### Étape 1 — Ouvrir Apps Script

1. Aller sur **<https://script.google.com>**
2. Cliquer sur **Nouveau projet**
3. Renommer le projet : **`Générateur formulaire candidature`**

### Étape 2 — Coller le code

1. Supprimer le contenu par défaut de l'éditeur
2. Ouvrir `apps-script/CreerFormulaireCandidature.gs`
3. Copier **tout** son contenu
4. Coller dans l'éditeur
5. `Ctrl+S` pour enregistrer

### Étape 3 — Vérifier la configuration

En haut du fichier, trois constantes :

```javascript
var FORM_TITLE = 'Candidature — Talentuous Minds Fellowship';
var NOTIFICATION_EMAIL = 'talentsiaminds@gmail.com';
var CREATE_RESPONSE_SHEET = true;
```

Ajuster `NOTIFICATION_EMAIL` si nécessaire.

### Étape 4 — Exécuter

1. Dans la barre du haut, sélectionner la fonction **`creerFormulaireCandidature`**
2. Cliquer sur **Exécuter**
3. Autoriser les permissions (même procédure que pour le suivi devis :
   *Paramètres avancés* → *Accéder à…*)

### Étape 5 — Récupérer l'URL

1. Menu **Affichage** → **Journaux d'exécution**
2. L'URL publique du formulaire y est affichée :

```
https://docs.google.com/forms/d/e/1FAIpQLS.../viewform
```

3. **Copier cette URL**

### Étape 6 — Connecter le site

Dans `apply.html`, chercher :

```html
href="https://docs.google.com/forms/d/e/REMPLACER-PAR-VOTRE-FORMULAIRE/viewform"
```

Remplacer par l'URL copiée.

---

## 3. Activer les notifications par e-mail

Le formulaire fonctionne sans cette étape, mais vous ne serez pas prévenu
des nouvelles candidatures.

1. Dans l'éditeur Apps Script, sélectionner la fonction
   **`installerNotificationCandidatures`**
2. Cliquer sur **Exécuter**
3. Vérifier dans le journal : `✓ Notification installée`

Un déclencheur est créé : à chaque soumission, `onCandidatureSoumise` s'exécute
et envoie un e-mail formaté à `NOTIFICATION_EMAIL`.

---

## 4. Structure du formulaire créé

### Section 1 — Profil (6 questions)

| Question | Type | Obligatoire |
|---|---|---|
| Prénom | Texte | Oui |
| Nom | Texte | Oui |
| Adresse e-mail | Texte (validé e-mail) | Oui |
| Téléphone / WhatsApp | Texte | Non |
| Pays | Texte | Non |
| Ville | Texte | Non |

### Section 2 — Parcours (4 questions)

| Question | Type | Obligatoire |
|---|---|---|
| Situation actuelle | Choix unique (7 options) | Oui |
| Niveau d'études | Choix unique (6 options) | Non |
| Domaine d'études ou d'activité | Texte | Non |
| Établissement ou organisation | Texte | Non |

### Section 3 — Programme souhaité (4 questions)

| Question | Type | Obligatoire |
|---|---|---|
| Programme | Choix unique (8 options, dont Drug Discovery) | Oui |
| Format souhaité | Choix unique (4 options) | Non |
| Disponibilité | Choix unique (4 options) | Non |
| Besoins particuliers | Cases à cocher (3 options) | Non |

### Section 4 — Motivation (3 questions)

| Question | Type | Obligatoire |
|---|---|---|
| Pourquoi rejoindre ce programme ? | Paragraphe | Oui |
| Qu'attendez-vous de ce programme ? | Paragraphe | Non |
| Comment avez-vous connu Talentuous Minds ? | Paragraphe | Non |

### Section 5 — Consentement (1 question)

| Question | Type | Obligatoire |
|---|---|---|
| Utilisation des données | Case à cocher | Oui |

**Total : 18 questions, 5 sections, barre de progression activée.**

---

## 5. Personnalisation

### Modifier le thème

1. Ouvrir le formulaire (URL d'édition, dans les journaux)
2. Cliquer sur l'icône **palette** en haut à droite
3. Choisir la couleur d'en-tête (suggéré : bleu marine `#0f2547`)
4. Ajouter une image d'en-tête si disponible

### Ajouter une question

1. Ouvrir le formulaire en édition
2. Cliquer sur le **+** à droite de la section
3. Choisir le type de question

### Modifier les options d'un choix

1. Ouvrir le formulaire en édition
2. Cliquer sur la question
3. Modifier les options directement

---

## 6. Suivi des candidatures

La Sheet de réponses contient une ligne par candidature, avec l'horodatage.

### Ajouter une colonne de suivi

1. Dans la Sheet, ajouter une colonne **Statut** (colonne AQ ou suivante)
2. Utiliser des valeurs cohérentes :

| Statut | Signification |
|---|---|
| `Nouveau` | Candidature reçue, non traitée |
| `En cours` | En cours d'examen |
| `Entretien` | Entretien programmé |
| `Accepté` | Candidature acceptée |
| `Refusé` | Candidature refusée |
| `Liste d'attente` | En attente de place |

### Filtrer les candidatures

1. Sélectionner la ligne d'en-tête
2. **Données** → **Créer un filtre**
3. Filtrer par programme, statut, date…

### Exporter

**Fichier** → **Télécharger** → CSV / Excel / PDF

---

## 7. Différences avec le formulaire local du site

Le site propose **deux parcours de candidature** :

| | Google Form | Formulaire local |
|---|---|---|
| **Accès** | Bouton principal sur `/apply` | Section « Formulaire local » |
| **Stockage** | Google Sheet | Aucun (envoi par e-mail) |
| **Notification** | Automatique | Manuelle (vous lisez l'e-mail) |
| **Suivi** | Tableur avec statuts | Boîte e-mail |
| **Expérience** | Quitte le site | Reste sur le site |
| **RGPD** | Google sous-traitant | Aucun tiers |

**Recommandation** : utiliser le Google Form comme parcours principal
(meilleur suivi), et garder le formulaire local comme alternative pour les
visiteurs qui préfèrent ne pas quitter le site.

---

## 8. RGPD

Le Google Form stocke les candidatures chez **Google LLC**. Cela implique :

1. **Mentionner Google** comme sous-traitant dans `/legal`
   → **déjà fait** dans la section « Sous-traitants »
2. **Informer** les candidats du traitement de leurs données
   → **déjà fait** dans la section 5 du formulaire (consentement)
3. **Prévoir la suppression** des candidatures non retenues
   → à faire manuellement dans la Sheet

### Durée de conservation recommandée

| Type | Durée suggérée |
|---|---|
| Candidature acceptée | Durée du programme + 1 an |
| Candidature refusée | 6 mois, puis suppression |
| Liste d'attente | Jusqu'à décision définitive |

---

## 9. Dépannage

| Problème | Cause | Solution |
|---|---|---|
| « Formulaire introuvable » | Script exécuté avant création | Lancer `creerFormulaireCandidature` d'abord |
| Pas d'e-mail de notification | Déclencheur non installé | Lancer `installerNotificationCandidatures` |
| L'URL ne fonctionne pas sur le site | URL d'édition au lieu de publique | Utiliser l'URL `/viewform`, pas `/edit` |
| Doublons de notification | Déclencheurs multiples | Le script les supprime automatiquement |
| Le formulaire demande une connexion | Paramètre de partage | Formulaire → Réponses → ne pas restreindre |

---

## 10. Fonctions disponibles

| Fonction | Rôle |
|---|---|
| `creerFormulaireCandidature()` | Crée le formulaire complet |
| `afficherUrlsFormulaire()` | Réaffiche les URL (si perdues) |
| `installerNotificationCandidatures()` | Active les notifications e-mail |
| `onCandidatureSoumise(e)` | Appelée automatiquement (ne pas exécuter) |
