/**
 * =============================================================================
 * Talentuous Minds Fellowship — Générateur du Google Form de candidature
 * =============================================================================
 *
 * Ce script CRÉE automatiquement le Google Form de candidature complet,
 * avec toutes les questions, sections et validations. Vous n'avez rien à
 * saisir manuellement.
 *
 * -----------------------------------------------------------------------------
 * INSTALLATION (3 minutes)
 * -----------------------------------------------------------------------------
 *
 * 1. Aller sur https://script.google.com
 * 2. Cliquer sur « Nouveau projet »
 * 3. Nommer le projet : « Générateur formulaire candidature »
 * 4. Supprimer le contenu par défaut
 * 5. Coller CE FICHIER entier
 * 6. Cliquer sur « Exécuter » (fonction `creerFormulaireCandidature`)
 * 7. Autoriser les permissions (même procédure que pour le suivi devis)
 * 8. Ouvrir le menu « Affichage » → « Journaux d'exécution »
 *    L'URL du formulaire y est affichée
 *
 * Le formulaire est créé dans votre Google Drive avec :
 *   - 5 sections (Profil, Parcours, Programme, Motivation, Consentement)
 *   - 17 questions
 *   - Une Google Sheet de réponses liée automatiquement
 *
 * -----------------------------------------------------------------------------
 * APRÈS LA CRÉATION
 * -----------------------------------------------------------------------------
 *
 * 1. Copier l'URL affichée dans les journaux
 * 2. La coller dans `apply.html` (constante GOOGLE_FORM_URL)
 * 3. Optionnel : personnaliser le thème dans Google Forms
 *    (couleurs, image d'en-tête)
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

/** Titre du formulaire. */
var FORM_TITLE = 'Candidature — Talentuous Minds Fellowship';

/** Description affichée en haut du formulaire. */
var FORM_DESCRIPTION =
  'Ce formulaire permet de postuler aux programmes de Talentuous Minds Fellowship : '
  + 'formations, accompagnement, mentorat.\n\n'
  + 'Vos réponses sont confidentielles et ne seront ni vendues ni transmises à des tiers. '
  + 'Nous vous répondrons dans les meilleurs délais.';

/** Adresse qui reçoit une notification à chaque candidature. */
var NOTIFICATION_EMAIL = 'talentsiaminds@gmail.com';

/** Créer une Google Sheet de réponses liée au formulaire. */
var CREATE_RESPONSE_SHEET = true;

// =============================================================================
// CRÉATION DU FORMULAIRE
// =============================================================================

/**
 * Crée le formulaire de candidature complet.
 * C'est la fonction à exécuter.
 */
function creerFormulaireCandidature() {
  // --- Création du formulaire ---------------------------------------------
  var form = FormApp.create(FORM_TITLE);
  form.setDescription(FORM_DESCRIPTION);
  form.setCollectEmail(false);       // On demande l'e-mail explicitement
  form.setAllowResponseEdits(false); // Une seule réponse par personne
  form.setLimitOneResponsePerUser(false);
  form.setProgressBar(true);         // Barre de progression visible

  // --- Lier une Google Sheet de réponses ----------------------------------
  if (CREATE_RESPONSE_SHEET) {
    form.setDestination(FormApp.DestinationType.SPREADSHEET, SpreadsheetApp.create(
      'Candidatures — Talentuous Minds Fellowship'
    ).getId());
  }

  // =========================================================================
  // SECTION 1 — Profil
  // =========================================================================
  form.addPageBreakItem()
    .setTitle('Votre profil')
    .setHelpText('Informations de contact et localisation.');

  form.addTextItem()
    .setTitle('Prénom')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Nom')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Adresse e-mail')
    .setHelpText('Adresse à laquelle nous vous répondrons.')
    .setRequired(true)
    .setValidation(
      FormApp.createTextValidation()
        .setHelpText('Veuillez saisir une adresse e-mail valide.')
        .requireTextIsEmail()
        .build()
    );

  form.addTextItem()
    .setTitle('Téléphone / WhatsApp')
    .setHelpText('Facultatif, mais utile pour vous joindre rapidement.')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Pays')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Ville')
    .setRequired(false);

  // =========================================================================
  // SECTION 2 — Parcours
  // =========================================================================
  form.addPageBreakItem()
    .setTitle('Votre parcours')
    .setHelpText('Situation actuelle et formation.');

  form.addMultipleChoiceItem()
    .setTitle('Situation actuelle')
    .setChoiceValues([
      'Étudiant(e)',
      'Jeune diplômé(e)',
      'Chercheur(se)',
      'Entrepreneur(e)',
      'Professionnel(le)',
      'En recherche d\'emploi',
      'Autre'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Niveau d\'études')
    .setChoiceValues([
      'Secondaire',
      'Baccalauréat',
      'Licence / Bachelor',
      'Master',
      'Doctorat',
      'Autre'
    ])
    .setRequired(false);

  form.addTextItem()
    .setTitle('Domaine d\'études ou d\'activité')
    .setHelpText('Ex. informatique, biologie, gestion, droit…')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Établissement ou organisation')
    .setRequired(false);

  // =========================================================================
  // SECTION 3 — Programme souhaité
  // =========================================================================
  form.addPageBreakItem()
    .setTitle('Le programme souhaité')
    .setHelpText('Quel programme vous intéresse et sous quel format ?');

  form.addMultipleChoiceItem()
    .setTitle('Programme')
    .setChoiceValues([
      'Informatique & numérique',
      'Recherche & rédaction scientifique',
      'Entrepreneuriat & leadership',
      'Développement personnel',
      'Data & analyse',
      'Drug Discovery (docking, criblage, dynamique moléculaire)',
      'Mentorat / accompagnement',
      'Autre'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Format souhaité')
    .setChoiceValues([
      'Présentiel',
      'En ligne',
      'Hybride',
      'Peu importe'
    ])
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Disponibilité')
    .setChoiceValues([
      'Journée',
      'Soirée',
      'Week-end',
      'Vacances scolaires'
    ])
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Besoins particuliers')
    .setHelpText('Cochez ce qui s\'applique à votre situation.')
    .setChoiceValues([
      'Je souhaite recevoir un certificat',
      'Je souhaite demander une prise en charge des frais',
      'J\'ai besoin d\'aménagements particuliers'
    ])
    .setRequired(false);

  // =========================================================================
  // SECTION 4 — Motivation
  // =========================================================================
  form.addPageBreakItem()
    .setTitle('Votre motivation')
    .setHelpText('Ces réponses nous aident à mieux vous orienter.');

  form.addParagraphTextItem()
    .setTitle('Pourquoi souhaitez-vous rejoindre ce programme ?')
    .setHelpText('Décrivez votre motivation et vos objectifs.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Qu\'attendez-vous de ce programme ?')
    .setHelpText('Compétences visées, projets, débouchés…')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Comment avez-vous connu Talentuous Minds ?')
    .setRequired(false);

  // =========================================================================
  // SECTION 5 — Consentement
  // =========================================================================
  form.addPageBreakItem()
    .setTitle('Consentement')
    .setHelpText('Dernière étape avant l\'envoi.');

  form.addCheckboxItem()
    .setTitle('Utilisation de vos données')
    .setHelpText(
      'Vos données sont utilisées uniquement pour traiter votre candidature. '
      + 'Elles sont conservées le temps nécessaire au traitement, puis supprimées '
      + 'sur demande. Elles ne sont ni vendues ni transmises à des tiers.'
    )
    .setChoiceValues([
      'J\'accepte que mes données soient utilisées pour traiter ma candidature.'
    ])
    .setRequired(true);

  // =========================================================================
  // RÉSULTAT
  // =========================================================================
  var formUrl = form.getPublishedUrl();
  var editUrl = form.getEditUrl();
  var sheetUrl = '';

  if (CREATE_RESPONSE_SHEET) {
    try {
      var destId = form.getDestinationId();
      if (destId) {
        sheetUrl = 'https://docs.google.com/spreadsheets/d/' + destId + '/edit';
      }
    } catch (e) {
      sheetUrl = '(non disponible)';
    }
  }

  // --- Affichage dans les journaux ----------------------------------------
  var message = [
    '',
    '====================================================',
    '  FORMULAIRE DE CANDIDATURE CRÉÉ',
    '====================================================',
    '',
    'URL PUBLIQUE (à coller dans apply.html) :',
    formUrl,
    '',
    'URL D\'ÉDITION (pour modifier le formulaire) :',
    editUrl,
    '',
    'SHEET DES RÉPONSES :',
    sheetUrl || '(non créée)',
    '',
    '====================================================',
    '  ÉTAPES SUIVANTES',
    '====================================================',
    '',
    '1. Copier l\'URL PUBLIQUE ci-dessus',
    '2. L\'ouvrir dans un navigateur pour vérifier le rendu',
    '3. Coller cette URL dans apply.html :',
    '     var GOOGLE_FORM_URL = "..."',
    '4. Committer et pousser',
    '',
    '===================================================='
  ].join('\n');

  Logger.log(message);
  console.log(message);

  // --- Notification par e-mail (trace de création) ------------------------
  try {
    MailApp.sendEmail(
      NOTIFICATION_EMAIL,
      'Formulaire de candidature créé — Talentuous Minds',
      message
    );
  } catch (e) {
    console.warn('Notification non envoyée : ' + e);
  }

  return formUrl;
}

// =============================================================================
// FONCTIONS UTILITAIRES
// =============================================================================

/**
 * Affiche à nouveau les URL du formulaire existant.
 * Utile si vous avez perdu l'URL.
 */
function afficherUrlsFormulaire() {
  var forms = DriveApp.getFilesByName(FORM_TITLE);

  if (!forms.hasNext()) {
    console.log('Aucun formulaire trouvé avec le titre : ' + FORM_TITLE);
    console.log('Exécutez d\'abord creerFormulaireCandidature()');
    return;
  }

  var file = forms.next();
  var form = FormApp.openById(file.getId());

  var message = [
    '',
    'FORMULAIRE EXISTANT',
    '',
    'URL PUBLIQUE :',
    form.getPublishedUrl(),
    '',
    'URL D\'ÉDITION :',
    form.getEditUrl(),
    '',
    'Nombre de réponses : ' + form.getResponses().length
  ].join('\n');

  console.log(message);
  Logger.log(message);
}

/**
 * Ajoute une notification par e-mail à chaque nouvelle candidature.
 * À exécuter UNE FOIS après la création du formulaire.
 *
 * Note : cette fonction installe un déclencheur (trigger) qui s'exécute
 * automatiquement à chaque soumission.
 */
function installerNotificationCandidatures() {
  var forms = DriveApp.getFilesByName(FORM_TITLE);

  if (!forms.hasNext()) {
    console.log('Formulaire introuvable. Exécutez d\'abord creerFormulaireCandidature()');
    return;
  }

  var formId = forms.next().getId();

  // Supprimer les déclencheurs existants pour éviter les doublons
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function (trigger) {
    if (trigger.getHandlerFunction() === 'onCandidatureSoumise') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Créer le déclencheur
  ScriptApp.newTrigger('onCandidatureSoumise')
    .forForm(formId)
    .onFormSubmit()
    .create();

  console.log('✓ Notification installée. Un e-mail sera envoyé à ' + NOTIFICATION_EMAIL);
  console.log('  à chaque nouvelle candidature.');
}

/**
 * Fonction appelée automatiquement à chaque soumission du formulaire.
 * Ne pas exécuter manuellement.
 *
 * @param {Object} e Événement de soumission contenant les réponses.
 */
function onCandidatureSoumise(e) {
  if (!e || !e.response) return;

  var responses = e.response.getItemResponses();
  var data = {};

  responses.forEach(function (item) {
    data[item.getItem().getTitle()] = item.getResponse();
  });

  var body = [
    'NOUVELLE CANDIDATURE',
    '====================',
    '',
    'Reçue le : ' + Utilities.formatDate(
      new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm'
    ),
    '',
    '--- Profil ---',
    'Nom          : ' + (data['Prénom'] || '—') + ' ' + (data['Nom'] || '—'),
    'E-mail       : ' + (data['Adresse e-mail'] || '—'),
    'Téléphone    : ' + (data['Téléphone / WhatsApp'] || '—'),
    'Localisation : ' + [data['Ville'], data['Pays']].filter(Boolean).join(', '),
    '',
    '--- Parcours ---',
    'Situation    : ' + (data['Situation actuelle'] || '—'),
    'Niveau       : ' + (data['Niveau d\'études'] || '—'),
    'Domaine      : ' + (data['Domaine d\'études ou d\'activité'] || '—'),
    'Établissement: ' + (data['Établissement ou organisation'] || '—'),
    '',
    '--- Programme ---',
    'Programme    : ' + (data['Programme'] || '—'),
    'Format       : ' + (data['Format souhaité'] || '—'),
    'Disponibilité: ' + (data['Disponibilité'] || '—'),
    'Besoins      : ' + (data['Besoins particuliers'] || '—'),
    '',
    '--- Motivation ---',
    (data['Pourquoi souhaitez-vous rejoindre ce programme ?'] || '—'),
    '',
    '--- Attentes ---',
    (data['Qu\'attendez-vous de ce programme ?'] || '—'),
    '',
    '--- Origine ---',
    (data['Comment avez-vous connu Talentuous Minds ?'] || '—'),
    '',
    '====================',
    'Voir toutes les réponses : ' + e.source.getEditUrl()
  ].join('\n');

  MailApp.sendEmail(
    NOTIFICATION_EMAIL,
    'Nouvelle candidature — ' + (data['Prénom'] || '') + ' ' + (data['Nom'] || ''),
    body
  );
}
