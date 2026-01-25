// =====================================================
// GOOGLE APPS SCRIPT - À déployer dans Google Sheets
// =====================================================
// 
// INSTRUCTIONS DE CONFIGURATION:
// 
// 1. Créez un nouveau Google Sheets
// 
// 2. Créez 2 onglets avec ces noms exacts:
//    - "Entreprises" 
//    - "Étudiants"
// 
// 3. Dans l'onglet "Entreprises", ajoutez ces en-têtes (ligne 1):
//    Timestamp | Entreprise | Secteur | Représentant | Fonction | Email | Téléphone | Participation | Format CV | Message
// 
// 4. Dans l'onglet "Étudiants", ajoutez ces en-têtes (ligne 1):
//    Timestamp | Nom | Matricule | Email | Téléphone | Niveau | Filière | Recherche
// 
// 5. Allez dans Extensions > Apps Script
// 
// 6. Supprimez tout le code existant et collez ce code
// 
// 7. Cliquez sur "Déployer" > "Nouveau déploiement"
// 
// 8. Sélectionnez "Application Web"
//    - Exécuter en tant que: Moi
//    - Accès: Tout le monde
// 
// 9. Cliquez sur "Déployer" et autorisez l'accès
// 
// 10. Copiez l'URL du déploiement et collez-la dans script.js
//     (variable GOOGLE_SCRIPT_URL)
// 
// =====================================================

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);
    
    if (data.type === 'entreprise') {
      // Formulaire Entreprise
      const sheet = ss.getSheetByName('Entreprises');
      sheet.appendRow([
        data.timestamp,
        data.entreprise,
        data.secteur,
        data.representant,
        data.fonction,
        data.email,
        data.telephone,
        data.participation,
        data.cvFormat,
        data.message
      ]);
      
      // Envoyer email de notification (optionnel)
      sendNotificationEmail('entreprise', data);
      
    } else if (data.type === 'etudiant') {
      // Formulaire Étudiant
      const sheet = ss.getSheetByName('Étudiants');
      sheet.appendRow([
        data.timestamp,
        data.nom,
        data.matricule,
        data.email,
        data.telephone,
        data.niveau,
        data.filiere,
        data.recherche
      ]);
      
      // Envoyer email de notification (optionnel)
      sendNotificationEmail('etudiant', data);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Career Summit 2026 - API is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Fonction optionnelle pour envoyer des emails de notification
function sendNotificationEmail(type, data) {
  // Décommentez et configurez si vous voulez recevoir des notifications par email
  
  /*
  const adminEmail = 'projectinitiativeclub@gmail.com';
  
  if (type === 'entreprise') {
    const subject = 'Nouvelle demande de stand - ' + data.entreprise;
    const body = `
      Nouvelle demande de stand reçue:
      
      Entreprise: ${data.entreprise}
      Secteur: ${data.secteur}
      Représentant: ${data.representant}
      Fonction: ${data.fonction}
      Email: ${data.email}
      Téléphone: ${data.telephone}
      Type de participation: ${data.participation}
      Format CV préféré: ${data.cvFormat}
      Message: ${data.message}
      
      Date: ${data.timestamp}
    `;
    MailApp.sendEmail(adminEmail, subject, body);
    
  } else if (type === 'etudiant') {
    // Optionnel: notification pour chaque inscription étudiant
    // (peut générer beaucoup d'emails)
  }
  */
}

// Test de la fonction
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        type: 'etudiant',
        timestamp: new Date().toLocaleString('fr-FR'),
        nom: 'Test Utilisateur',
        matricule: '123456789',
        email: 'test@test.com',
        telephone: '0555555555',
        niveau: 'Master 2',
        filiere: 'Informatique',
        recherche: 'Stage, Emploi'
      })
    }
  };
  
  doPost(testData);
}