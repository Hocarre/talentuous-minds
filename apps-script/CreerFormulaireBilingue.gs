/**
 * =============================================================================
 * Talentuous Minds Fellowship — Formulaire de candidature BILINGUE
 * =============================================================================
 *
 * Crée un Google Form de candidature avec toutes les questions en
 * ANGLAIS et en FRANÇAIS (les deux langues affichées côte à côte).
 *
 * -----------------------------------------------------------------------------
 * POURQUOI LE BILINGUE DANS UN SEUL FORMULAIRE ?
 * -----------------------------------------------------------------------------
 * Google Forms ne gère pas nativement le multilingue. Trois approches possibles :
 *
 *   A. Un seul formulaire bilingue (ce script)
 *      Chaque question affiche « English / Français ».
 *      → Simple, un seul lien, une seule Sheet de réponses.
 *      → Inconvénient : un peu chargé visuellement.
 *
 *   B. Deux formulaires séparés (un EN, un FR)
 *      → Plus propre pour chaque audience.
 *      → Inconvénient : deux Sheets à suivre, deux liens.
 *
 *   C. Un formulaire anglais + traduction dans la description
 *      → Le plus léger, mais moins accessible aux francophones.
 *
 * Ce script implémente l'approche A. Pour l'approche B, exécuter
 * `creerDeuxFormulaires()` (fonction fournie en bas du fichier).
 *
 * -----------------------------------------------------------------------------
 * INSTALLATION (3 minutes)
 * -----------------------------------------------------------------------------
 *
 * 1. Aller sur https://script.google.com
 * 2. Cliquer sur « Nouveau projet »
 * 3. Nommer : « Générateur formulaire candidature bilingue »
 * 4. Supprimer le contenu par défaut
 * 5. Coller CE FICHIER entier
 * 6. Exécuter la fonction `creerFormulaireBilingue`
 * 7. Autoriser les permissions
 * 8. Affichage → Journaux d'exécution → l'URL du formulaire y est affichée
 * 9. Exécuter `installerNotificationCandidatures` pour les notifications
 *
 * -----------------------------------------------------------------------------
 * NOTE SUR LA LANGUE PAR DÉFAUT DU SITE
 * -----------------------------------------------------------------------------
 * Le site est désormais en ANGLAIS par défaut, avec le français en traduction.
 * Ce formulaire suit la même logique : l'anglais est mis en avant,
 * le français est affiché en second.
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

/** Titre du formulaire (bilingue). */
var FORM_TITLE = 'Application / Candidature — Talentuous Minds Fellowship';

/** Description affichée en haut du formulaire (bilingue). */
var FORM_DESCRIPTION =
  'ENGLISH\n'
  + 'This form is used to apply for Talentuous Minds Fellowship programs: '
  + 'training, support and mentoring.\n'
  + 'Your answers are confidential and will not be sold or shared with third parties.\n'
  + '\n'
  + 'FRANÇAIS\n'
  + 'Ce formulaire permet de postuler aux programmes de Talentuous Minds Fellowship : '
  + 'formations, accompagnement et mentorat.\n'
  + 'Vos réponses sont confidentielles et ne seront ni vendues ni transmises à des tiers.';

/** Adresse qui reçoit une notification à chaque candidature. */
var NOTIFICATION_EMAIL = 'talentsiaminds@gmail.com';

/** Créer une Google Sheet de réponses liée au formulaire. */
var CREATE_RESPONSE_SHEET = true;

// =============================================================================
// CRÉATION DU FORMULAIRE BILINGUE
// =============================================================================

/**
 * Crée le formulaire de candidature bilingue complet.
 * C'est la fonction à exécuter.
 *
 * @return {string} L'URL publique du formulaire.
 */
function creerFormulaireBilingue() {
  var form = FormApp.create(FORM_TITLE);
  form.setDescription(FORM_DESCRIPTION);
  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);
  form.setProgressBar(true);

  // --- Sheet de réponses ---------------------------------------------------
  if (CREATE_RESPONSE_SHEET) {
    var sheet = SpreadsheetApp.create('Applications — Talentuous Minds Fellowship');
    form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
  }

  // =========================================================================
  // SECTION 1 — Profile / Profil
  // =========================================================================
  form.addPageBreakItem()
    .setTitle('1. Profile / Profil')
    .setHelpText('Contact details / Coordonnées');

  form.addTextItem()
    .setTitle('First name / Prénom')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Last name / Nom')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Email address / Adresse e-mail')
    .setHelpText('We will reply to this address. / Nous vous répondrons à cette adresse.')
    .setRequired(true)
    .setValidation(
      FormApp.createTextValidation()
        .setHelpText('Please enter a valid email address. / Veuillez saisir une adresse e-mail valide.')
        .requireTextIsEmail()
        .build()
    );

  form.addTextItem()
    .setTitle('Phone / WhatsApp — Téléphone')
    .setHelpText('Optional but useful. / Facultatif mais utile.')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Country / Pays')
    .setRequired(false);

  form.addTextItem()
    .setTitle('City / Ville')
    .setRequired(false);

  // =========================================================================
  // SECTION 2 — Background / Parcours
  // =========================================================================
  form.addPageBreakItem()
    .setTitle('2. Background / Parcours')
    .setHelpText('Current situation and education / Situation actuelle et formation');

  form.addMultipleChoiceItem()
    .setTitle('Current situation / Situation actuelle')
    .setChoiceValues([
      'Student / Étudiant(e)',
      'Recent graduate / Jeune diplômé(e)',
      'Researcher / Chercheur(se)',
      'Entrepreneur / Entrepreneur(e)',
      'Professional / Professionnel(le)',
      'Job seeker / En recherche d\'emploi',
      'Other / Autre'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Education level / Niveau d\'études')
    .setChoiceValues([
      'Secondary school / Secondaire',
      'High school diploma / Baccalauréat',
      'Bachelor\'s degree / Licence',
      'Master\'s degree / Master',
      'Doctorate / Doctorat',
      'Other / Autre'
    ])
    .setRequired(false);

  form.addTextItem()
    .setTitle('Field of study or activity / Domaine d\'études ou d\'activité')
    .setHelpText('E.g. computer science, biology, management… / Ex. informatique, biologie, gestion…')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Institution or organisation / Établissement ou organisation')
    .setRequired(false);

  // =========================================================================
  // SECTION 3 — Program / Programme
  // =========================================================================
  form.addPageBreakItem()
    .setTitle('3. Program / Programme')
    .setHelpText('Which program interests you? / Quel programme vous intéresse ?');

  form.addMultipleChoiceItem()
    .setTitle('Program / Programme')
    .setChoiceValues([
      'IT & digital / Informatique & numérique',
      'Research & scientific writing / Recherche & rédaction scientifique',
      'Entrepreneurship & leadership / Entrepreneuriat & leadership',
      'Personal development / Développement personnel',
      'Data & analysis / Data & analyse',
      'Drug Discovery (docking, screening, molecular dynamics)',
      'Mentoring / Mentorat',
      'Other / Autre'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Preferred format / Format souhaité')
    .setChoiceValues([
      'In person / Présentiel',
      'Online / En ligne',
      'Hybrid / Hybride',
      'No preference / Peu importe'
    ])
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Availability / Disponibilité')
    .setChoiceValues([
      'Daytime / Journée',
      'Evening / Soirée',
      'Weekend / Week-end',
      'School holidays / Vacances scolaires'
    ])
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Specific needs / Besoins particuliers')
    .setHelpText('Check what applies. / Cochez ce qui s\'applique.')
    .setChoiceValues([
      'I would like a certificate / Je souhaite un certificat',
      'I would like a fee waiver / Je souhaite une prise en charge des frais',
      'I need specific accommodations / J\'ai besoin d\'aménagements particuliers'
    ])
    .setRequired(false);

  // =========================================================================
  // SECTION 4 — Motivation
  // =========================================================================
  form.addPageBreakItem()
    .setTitle('4. Motivation')
    .setHelpText('These answers help us guide you. / Ces réponses nous aident à vous orienter.');

  form.addParagraphTextItem()
    .setTitle('Why do you want to join this program? / Pourquoi souhaitez-vous rejoindre ce programme ?')
    .setHelpText('Describe your motivation and goals. / Décrivez votre motivation et vos objectifs.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('What do you expect from this program? / Qu\'attendez-vous de ce programme ?')
    .setHelpText('Skills, projects, career prospects… / Compétences, projets, débouchés…')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('How did you hear about Talentuous Minds? / Comment avez-vous connu Talentuous Minds ?')
    .setRequired(false);

  // =========================================================================
  // SECTION 5 — Consent / Consentement
  // =========================================================================
  form.addPageBreakItem()
    .setTitle('5. Consent / Consentement')
    .setHelpText('Last step before submitting. / Dernière étape avant l\'envoi.');

  form.addCheckboxItem()
    .setTitle('Use of your data / Utilisation de vos données')
    .setHelpText(
      'Your data is used only to process your application. It is kept for as long '
      + 'as necessary, then deleted on request. It is neither sold nor shared with third parties.\n'
      + 'Vos données sont utilisées uniquement pour traiter votre candidature. Elles sont '
      + 'conservées le temps nécessaire, puis supprimées sur demande. Elles ne sont ni '
      + 'vendues ni transmises à des tiers.'
    )
    .setChoiceValues([
      'I agree / J\'accepte'
    ])
    .setRequired(true);

  // --- Résultat ------------------------------------------------------------
  afficherResultat_(form, 'BILINGUE');

  return form.getPublishedUrl();
}

// =============================================================================
// VARIANTE : DEUX FORMULAIRES SÉPARÉS (EN + FR)
// =============================================================================

/**
 * Crée DEUX formulaires distincts : un en anglais, un en français.
 *
 * Utilisez cette fonction si vous préférez des formulaires propres
 * pour chaque audience plutôt qu'un formulaire bilingue.
 */
function creerDeuxFormulaires() {
  var formEn = creerFormulaireAnglais_();
  var formFr = creerFormulaireFrancais_();

  var message = [
    '',
    '====================================================',
    '  DEUX FORMULAIRES CRÉÉS',
    '====================================================',
    '',
    'FORMULAIRE ANGLAIS (par défaut) :',
    formEn.getPublishedUrl(),
    '',
    'FORMULAIRE FRANÇAIS :',
    formFr.getPublishedUrl(),
    '',
    '====================================================',
    '  ÉTAPES SUIVANTES',
    '====================================================',
    '',
    '1. Coller l\'URL anglaise dans apply.html :',
    '     href="..."',
    '2. Coller l\'URL française dans i18n.js, clé « apply.form.btn » :',
    '     "apply.form.btn": "<a href=\\"URL_FR\\">...</a>"',
    '',
    '===================================================='
  ].join('\n');

  console.log(message);
  Logger.log(message);

  return { en: formEn.getPublishedUrl(), fr: formFr.getPublishedUrl() };
}

/**
 * Crée le formulaire en anglais uniquement.
 *
 * @return {FormApp.Form} Le formulaire créé.
 */
function creerFormulaireAnglais_() {
  var form = FormApp.create('Application — Talentuous Minds Fellowship');
  form.setDescription(
    'Apply for Talentuous Minds Fellowship programs: training, support and mentoring.\n'
    + 'Your answers are confidential.'
  );
  form.setProgressBar(true);

  if (CREATE_RESPONSE_SHEET) {
    var sheet = SpreadsheetApp.create('Applications (EN) — Talentuous Minds');
    form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
  }

  form.addTextItem().setTitle('First name').setRequired(true);
  form.addTextItem().setTitle('Last name').setRequired(true);
  form.addTextItem().setTitle('Email address').setRequired(true)
    .setValidation(
      FormApp.createTextValidation()
        .setHelpText('Please enter a valid email address.')
        .requireTextIsEmail().build()
    );
  form.addTextItem().setTitle('Phone / WhatsApp').setRequired(false);
  form.addTextItem().setTitle('Country').setRequired(false);
  form.addTextItem().setTitle('City').setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Current situation')
    .setChoiceValues([
      'Student', 'Recent graduate', 'Researcher', 'Entrepreneur',
      'Professional', 'Job seeker', 'Other'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Education level')
    .setChoiceValues([
      'Secondary school', 'High school diploma', "Bachelor's degree",
      "Master's degree", 'Doctorate', 'Other'
    ])
    .setRequired(false);

  form.addTextItem().setTitle('Field of study or activity').setRequired(false);
  form.addTextItem().setTitle('Institution or organisation').setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Program')
    .setChoiceValues([
      'IT & digital', 'Research & scientific writing',
      'Entrepreneurship & leadership', 'Personal development',
      'Data & analysis', 'Drug Discovery', 'Mentoring', 'Other'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Preferred format')
    .setChoiceValues(['In person', 'Online', 'Hybrid', 'No preference'])
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Availability')
    .setChoiceValues(['Daytime', 'Evening', 'Weekend', 'School holidays'])
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Specific needs')
    .setChoiceValues([
      'I would like a certificate',
      'I would like a fee waiver',
      'I need specific accommodations'
    ])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Why do you want to join this program?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('What do you expect from this program?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('How did you hear about Talentuous Minds?')
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Use of your data')
    .setHelpText(
      'Your data is used only to process your application. It is neither sold '
      + 'nor shared with third parties.'
    )
    .setChoiceValues(['I agree'])
    .setRequired(true);

  return form;
}

/**
 * Crée le formulaire en français uniquement.
 *
 * @return {FormApp.Form} Le formulaire créé.
 */
function creerFormulaireFrancais_() {
  var form = FormApp.create('Candidature — Talentuous Minds Fellowship');
  form.setDescription(
    'Postulez aux programmes de Talentuous Minds Fellowship : formations, '
    + 'accompagnement et mentorat.\nVos réponses sont confidentielles.'
  );
  form.setProgressBar(true);

  if (CREATE_RESPONSE_SHEET) {
    var sheet = SpreadsheetApp.create('Candidatures (FR) — Talentuous Minds');
    form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());
  }

  form.addTextItem().setTitle('Prénom').setRequired(true);
  form.addTextItem().setTitle('Nom').setRequired(true);
  form.addTextItem().setTitle('Adresse e-mail').setRequired(true)
    .setValidation(
      FormApp.createTextValidation()
        .setHelpText('Veuillez saisir une adresse e-mail valide.')
        .requireTextIsEmail().build()
    );
  form.addTextItem().setTitle('Téléphone / WhatsApp').setRequired(false);
  form.addTextItem().setTitle('Pays').setRequired(false);
  form.addTextItem().setTitle('Ville').setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Situation actuelle')
    .setChoiceValues([
      'Étudiant(e)', 'Jeune diplômé(e)', 'Chercheur(se)', 'Entrepreneur(e)',
      'Professionnel(le)', 'En recherche d\'emploi', 'Autre'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Niveau d\'études')
    .setChoiceValues([
      'Secondaire', 'Baccalauréat', 'Licence', 'Master', 'Doctorat', 'Autre'
    ])
    .setRequired(false);

  form.addTextItem().setTitle('Domaine d\'études ou d\'activité').setRequired(false);
  form.addTextItem().setTitle('Établissement ou organisation').setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Programme')
    .setChoiceValues([
      'Informatique & numérique', 'Recherche & rédaction scientifique',
      'Entrepreneuriat & leadership', 'Développement personnel',
      'Data & analyse', 'Drug Discovery', 'Mentorat', 'Autre'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Format souhaité')
    .setChoiceValues(['Présentiel', 'En ligne', 'Hybride', 'Peu importe'])
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Disponibilité')
    .setChoiceValues(['Journée', 'Soirée', 'Week-end', 'Vacances scolaires'])
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Besoins particuliers')
    .setChoiceValues([
      'Je souhaite un certificat',
      'Je souhaite une prise en charge des frais',
      'J\'ai besoin d\'aménagements particuliers'
    ])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Pourquoi souhaitez-vous rejoindre ce programme ?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Qu\'attendez-vous de ce programme ?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Comment avez-vous connu Talentuous Minds ?')
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Utilisation de vos données')
    .setHelpText(
      'Vos données sont utilisées uniquement pour traiter votre candidature. '
      + 'Elles ne sont ni vendues ni transmises à des tiers.'
    )
    .setChoiceValues(['J\'accepte'])
    .setRequired(true);

  return form;
}

// =============================================================================
// AFFICHAGE DU RÉSULTAT
// =============================================================================

/**
 * Affiche les URL du formulaire dans les journaux et envoie une notification.
 *
 * @param {FormApp.Form} form Le formulaire créé.
 * @param {string} type Type de formulaire (BILINGUE, EN, FR).
 */
function afficherResultat_(form, type) {
  var formUrl = form.getPublishedUrl();
  var editUrl = form.getEditUrl();
  var sheetUrl = '';

  try {
    var destId = form.getDestinationId();
    if (destId) {
      sheetUrl = 'https://docs.google.com/spreadsheets/d/' + destId + '/edit';
    }
  } catch (e) {
    sheetUrl = '(non disponible)';
  }

  var message = [
    '',
    '====================================================',
    '  FORMULAIRE DE CANDIDATURE CRÉÉ (' + type + ')',
    '====================================================',
    '',
    'URL PUBLIQUE (à coller dans apply.html) :',
    formUrl,
    '',
    'URL D\'ÉDITION :',
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
    '3. Coller cette URL dans apply.html (attribut href du bouton)',
    '4. Exécuter installerNotificationCandidatures() pour les e-mails',
    '5. Committer et pousser',
    '',
    '===================================================='
  ].join('\n');

  console.log(message);
  Logger.log(message);

  try {
    MailApp.sendEmail(
      NOTIFICATION_EMAIL,
      'Formulaire de candidature créé — Talentuous Minds',
      message
    );
  } catch (e) {
    console.warn('Notification non envoyée : ' + e);
  }
}

// =============================================================================
// NOTIFICATIONS
// =============================================================================

/**
 * Installe un déclencheur pour notifier à chaque candidature.
 * À exécuter UNE FOIS après la création du formulaire.
 *
 * Détecte automatiquement le formulaire bilingue ou les deux formulaires séparés.
 */
function installerNotificationCandidatures() {
  var forms = [];

  // Chercher tous les formulaires correspondants
  ['Application / Candidature — Talentuous Minds Fellowship',
   'Application — Talentuous Minds Fellowship',
   'Candidature — Talentuous Minds Fellowship'].forEach(function (title) {
    var files = DriveApp.getFilesByName(title);
    while (files.hasNext()) {
      forms.push(files.next().getId());
    }
  });

  if (forms.length === 0) {
    console.log('Aucun formulaire trouvé. Exécutez d\'abord creerFormulaireBilingue()');
    return;
  }

  // Supprimer les déclencheurs existants
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === 'onCandidatureSoumise') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // Créer un déclencheur par formulaire
  forms.forEach(function (formId) {
    ScriptApp.newTrigger('onCandidatureSoumise')
      .forForm(formId)
      .onFormSubmit()
      .create();
  });

  console.log('✓ Notification installée pour ' + forms.length + ' formulaire(s).');
  console.log('  Un e-mail sera envoyé à ' + NOTIFICATION_EMAIL + ' à chaque candidature.');
}

/**
 * Fonction appelée automatiquement à chaque soumission.
 * Ne pas exécuter manuellement.
 *
 * @param {Object} e Événement de soumission.
 */
function onCandidatureSoumise(e) {
  if (!e || !e.response) return;

  var responses = e.response.getItemResponses();
  var data = {};

  responses.forEach(function (item) {
    data[item.getItem().getTitle()] = item.getResponse();
  });

  // Détecter si le formulaire est bilingue (titres contenant « / »)
  var isBilingual = Object.keys(data).some(function (key) {
    return key.indexOf(' / ') !== -1;
  });

  var name = (data['First name / Prénom'] || data['First name'] || data['Prénom'] || '')
           + ' '
           + (data['Last name / Nom'] || data['Last name'] || data['Nom'] || '');

  var lines = [
    'NEW APPLICATION / NOUVELLE CANDIDATURE',
    '======================================',
    '',
    'Received / Reçue le : ' + Utilities.formatDate(
      new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm'
    ),
    'Form / Formulaire   : ' + (isBilingual ? 'Bilingue' : 'Monolingue'),
    ''
  ];

  Object.keys(data).forEach(function (key) {
    lines.push(key + ' :');
    lines.push('  ' + data[key]);
    lines.push('');
  });

  lines.push('======================================');
  lines.push('View all responses / Voir toutes les réponses :');
  lines.push(e.source.getEditUrl());

  MailApp.sendEmail(
    NOTIFICATION_EMAIL,
    'Nouvelle candidature / New application — ' + name.trim(),
    lines.join('\n')
  );
}

// =============================================================================
// UTILITAIRES
// =============================================================================

/**
 * Réaffiche les URL des formulaires existants.
 */
function afficherUrlsFormulaires() {
  var titles = [
    'Application / Candidature — Talentuous Minds Fellowship',
    'Application — Talentuous Minds Fellowship',
    'Candidature — Talentuous Minds Fellowship'
  ];

  var found = false;

  titles.forEach(function (title) {
    var files = DriveApp.getFilesByName(title);
    while (files.hasNext()) {
      found = true;
      var form = FormApp.openById(files.next().getId());
      console.log('');
      console.log('FORMULAIRE : ' + title);
      console.log('  URL publique : ' + form.getPublishedUrl());
      console.log('  URL édition  : ' + form.getEditUrl());
      console.log('  Réponses     : ' + form.getResponses().length);
    }
  });

  if (!found) {
    console.log('Aucun formulaire trouvé. Exécutez creerFormulaireBilingue()');
  }
}
