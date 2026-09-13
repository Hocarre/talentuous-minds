/**
 * =============================================================================
 * Talentuous Minds Fellowship — Suivi des demandes de devis
 * =============================================================================
 *
 * Backend Google Apps Script qui enregistre les demandes de devis dans une
 * Google Sheet et envoie une notification par e-mail.
 *
 * -----------------------------------------------------------------------------
 * INSTALLATION (5 minutes, gratuit)
 * -----------------------------------------------------------------------------
 *
 * 1. Créer une Google Sheet nommée « Demandes de devis — Talentuous Minds »
 *
 * 2. Dans la Sheet : Extensions → Apps Script
 *
 * 3. Supprimer le contenu par défaut et coller CE FICHIER entier
 *
 * 4. Modifier la constante NOTIFICATION_EMAIL ci-dessous avec votre adresse
 *
 * 5. Cliquer sur « Déployer » → « Nouveau déploiement »
 *      - Type        : Application Web
 *      - Description : API demandes de devis
 *      - Exécuter en tant que : Moi
 *      - Qui a accès : Tout le monde
 *
 * 6. Copier l'URL de l'application Web (elle ressemble à
 *    https://script.google.com/macros/s/AKfy.../exec)
 *
 * 7. Coller cette URL dans `services-simulations.html`, constante
 *    APPS_SCRIPT_URL
 *
 * -----------------------------------------------------------------------------
 * SÉCURITÉ
 * -----------------------------------------------------------------------------
 * - Le script est en lecture/écriture sur VOTRE Sheet uniquement.
 * - Un jeton secret simple limite les envois automatisés (spam basique).
 * - Les données ne transitent pas par un tiers : Google est l'hébergeur.
 * - Pour un usage RGPD strict, mentionner Google comme sous-traitant dans
 *   les mentions légales.
 *
 * -----------------------------------------------------------------------------
 * LIMITES HONNÊTES
 * -----------------------------------------------------------------------------
 * - Ce n'est PAS un système sécurisé : l'URL du script est publique par nature.
 *   Le jeton limite le spam occasionnel, pas une attaque ciblée.
 * - Apps Script a un quota gratuit : ~20 000 requêtes/jour (largement suffisant).
 * - Pas de chiffrement des données au-delà de celui de Google.
 */

// =============================================================================
// CONFIGURATION — à modifier
// =============================================================================

/** Adresse qui reçoit la notification à chaque nouvelle demande. */
var NOTIFICATION_EMAIL = 'talentsiaminds@gmail.com';

/** Nom de l'onglet de la Sheet qui reçoit les données. */
var SHEET_NAME = 'Demandes';

/**
 * Jeton secret partagé avec le site.
 * Changez-le et reportez la même valeur dans `services-simulations.html`.
 * Il ne s'agit pas d'une sécurité forte : juste d'un filtre anti-spam simple.
 */
var SHARED_TOKEN = 'tm-2026-devis';

// =============================================================================
// POINT D'ENTRÉE — requête POST depuis le site
// =============================================================================

/**
 * Reçoit une demande de devis envoyée par le site.
 *
 * @param {Object} e Événement Apps Script contenant `postData.contents`.
 * @return {ContentService.TextOutput} Réponse JSON.
 */
function doPost(e) {
  try {
    // --- Lecture du corps de la requête -------------------------------------
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse_({ ok: false, error: 'Corps de requête vide' });
    }

    var data = JSON.parse(e.postData.contents);

    // --- Vérification du jeton ----------------------------------------------
    if (data.token !== SHARED_TOKEN) {
      return jsonResponse_({ ok: false, error: 'Jeton invalide' });
    }

    // --- Vérification des champs obligatoires -------------------------------
    var required = ['name', 'email', 'description'];
    for (var i = 0; i < required.length; i++) {
      if (!data[required[i]] || String(data[required[i]]).trim() === '') {
        return jsonResponse_({ ok: false, error: 'Champ manquant : ' + required[i] });
      }
    }

    // --- Validation de l'e-mail ---------------------------------------------
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return jsonResponse_({ ok: false, error: 'Adresse e-mail invalide' });
    }

    // --- Enregistrement dans la Sheet ---------------------------------------
    var row = appendToSheet_(data);

    // --- Notification par e-mail --------------------------------------------
    sendNotification_(data, row);

    return jsonResponse_({
      ok: true,
      reference: row.reference,
      message: 'Demande enregistrée'
    });

  } catch (error) {
    // Journalisation côté serveur pour diagnostic
    console.error('Erreur doPost : ' + error);

    return jsonResponse_({
      ok: false,
      error: 'Erreur serveur : ' + error.message
    });
  }
}

/**
 * Répond aux requêtes GET (utile pour tester le déploiement).
 *
 * @return {ContentService.TextOutput} Message de statut.
 */
function doGet() {
  return jsonResponse_({
    ok: true,
    service: 'Talentuous Minds — API demandes de devis',
    status: 'opérationnel'
  });
}

// =============================================================================
// ÉCRITURE DANS LA SHEET
// =============================================================================

/**
 * Ajoute une ligne dans la Sheet et retourne les informations de la ligne.
 *
 * @param {Object} data Données de la demande.
 * @return {{row: number, reference: string}} Numéro de ligne et référence.
 */
function appendToSheet_(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  // Créer l'onglet s'il n'existe pas
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Créer les en-têtes si la Sheet est vide
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Horodatage',
      'Référence',
      'Statut',
      'Nom',
      'E-mail',
      'Organisation',
      'Profil',
      'Prestations',
      'Cible',
      'Code PDB',
      'Nb molécules',
      'Délai',
      'Description',
      'Données disponibles',
      'Langue',
      'Notes internes'
    ]);

    // Mise en forme de l'en-tête
    var header = sheet.getRange(1, 1, 1, 16);
    header.setFontWeight('bold');
    header.setBackground('#0f2547');
    header.setFontColor('#ffffff');
    sheet.setFrozenRows(1);

    // Largeurs de colonnes
    sheet.setColumnWidth(1, 150);  // Horodatage
    sheet.setColumnWidth(2, 110);  // Référence
    sheet.setColumnWidth(3, 100);  // Statut
    sheet.setColumnWidth(4, 160);  // Nom
    sheet.setColumnWidth(5, 200);  // E-mail
    sheet.setColumnWidth(6, 180);  // Organisation
    sheet.setColumnWidth(7, 150);  // Profil
    sheet.setColumnWidth(8, 220);  // Prestations
    sheet.setColumnWidth(9, 140);  // Cible
    sheet.setColumnWidth(10, 100); // Code PDB
    sheet.setColumnWidth(11, 130); // Nb molécules
    sheet.setColumnWidth(12, 160); // Délai
    sheet.setColumnWidth(13, 320); // Description
    sheet.setColumnWidth(14, 250); // Données
    sheet.setColumnWidth(15, 80);  // Langue
    sheet.setColumnWidth(16, 200); // Notes
  }

  // Générer une référence unique : TM-AAAAMMJJ-XXXX
  var now = new Date();
  var reference = 'TM-'
    + Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyyMMdd')
    + '-'
    + String(sheet.getLastRow()).padStart(4, '0');

  // Écrire la ligne
  sheet.appendRow([
    now,
    reference,
    'Nouveau',                                  // Statut initial
    sanitize_(data.name),
    sanitize_(data.email),
    sanitize_(data.organization || ''),
    sanitize_(data.status || ''),
    sanitize_(data.services || ''),
    sanitize_(data.target || ''),
    sanitize_(data.pdb || ''),
    sanitize_(data.count || ''),
    sanitize_(data.deadline || ''),
    sanitize_(data.description || ''),
    sanitize_(data.availableData || ''),
    sanitize_(data.lang || 'fr'),
    ''                                          // Notes internes
  ]);

  return { row: sheet.getLastRow(), reference: reference };
}

/**
 * Neutralise les tentatives d'injection de formules dans la Sheet.
 *
 * Sans cela, une valeur commençant par « = », « + », « - » ou « @ »
 * serait interprétée comme une formule par Google Sheets.
 *
 * @param {*} value Valeur à nettoyer.
 * @return {string} Valeur sûre.
 */
function sanitize_(value) {
  var text = String(value == null ? '' : value);

  // Limiter la longueur pour éviter les abus
  if (text.length > 5000) {
    text = text.substring(0, 5000) + '… [tronqué]';
  }

  // Préfixer les caractères dangereux d'une apostrophe
  if (/^[=+\-@]/.test(text)) {
    text = "'" + text;
  }

  return text;
}

// =============================================================================
// NOTIFICATION PAR E-MAIL
// =============================================================================

/**
 * Envoie un e-mail de notification pour une nouvelle demande.
 *
 * @param {Object} data Données de la demande.
 * @param {{row: number, reference: string}} meta Informations de la ligne.
 */
function sendNotification_(data, meta) {
  var subject = 'Nouvelle demande de devis — ' + meta.reference;

  var body = [
    'NOUVELLE DEMANDE DE DEVIS',
    '=========================',
    '',
    'Référence : ' + meta.reference,
    'Reçue le  : ' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm'),
    '',
    '--- Contact ---',
    'Nom          : ' + (data.name || '—'),
    'E-mail       : ' + (data.email || '—'),
    'Organisation : ' + (data.organization || '—'),
    'Profil       : ' + (data.status || '—'),
    '',
    '--- Prestations demandées ---',
    (data.services || '(aucune sélectionnée)'),
    '',
    '--- Détails du projet ---',
    'Cible        : ' + (data.target || '—'),
    'Code PDB     : ' + (data.pdb || '—'),
    'Molécules    : ' + (data.count || '—'),
    'Délai        : ' + (data.deadline || '—'),
    '',
    '--- Description ---',
    (data.description || '—'),
    '',
    '--- Données disponibles ---',
    (data.availableData || '—'),
    '',
    '=========================',
    'Ouvrir la Sheet : ' + SpreadsheetApp.getActiveSpreadsheet().getUrl()
  ].join('\n');

  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}

// =============================================================================
// UTILITAIRES
// =============================================================================

/**
 * Construit une réponse JSON.
 *
 * @param {Object} payload Objet à sérialiser.
 * @return {ContentService.TextOutput} Réponse HTTP.
 */
function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

// =============================================================================
// FONCTIONS UTILITAIRES POUR L'ADMINISTRATION
// =============================================================================

/**
 * Ajoute un menu personnalisé dans la Sheet (pratique pour tester).
 * Exécuter `onOpen` une fois pour l'activer.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Suivi devis')
    .addItem('Tester l\'API', 'testApi')
    .addItem('Statistiques', 'showStats')
    .addToUi();
}

/**
 * Teste l'API en simulant une demande.
 */
function testApi() {
  var fake = {
    token: SHARED_TOKEN,
    name: 'Test Automatique',
    email: 'test@example.com',
    organization: 'Test',
    status: 'Étudiant(e)',
    services: 'Docking moléculaire',
    target: 'HER2',
    pdb: '3ERT',
    count: '10 à 100',
    deadline: 'Deux à quatre semaines',
    description: 'Demande de test générée depuis Apps Script.',
    availableData: '',
    lang: 'fr'
  };

  var result = appendToSheet_(fake);
  SpreadsheetApp.getUi().alert(
    'Test réussi.\nRéférence : ' + result.reference + '\nLigne : ' + result.row
  );
}

/**
 * Affiche un résumé des demandes par statut.
 */
function showStats() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet || sheet.getLastRow() < 2) {
    SpreadsheetApp.getUi().alert('Aucune demande enregistrée.');
    return;
  }

  var data = sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).getValues();
  var counts = {};

  data.forEach(function (row) {
    var status = row[0] || '(vide)';
    counts[status] = (counts[status] || 0) + 1;
  });

  var message = 'Demandes par statut :\n\n';
  Object.keys(counts).forEach(function (key) {
    message += '  ' + key + ' : ' + counts[key] + '\n';
  });
  message += '\nTotal : ' + (sheet.getLastRow() - 1);

  SpreadsheetApp.getUi().alert(message);
}
