
const CV_FOLDER_ID = '1mugJDW6cH78CqBiiKEGjN_VDuPzbnPdj'; // Leave empty to auto-create, or paste your folder ID here

// Optional: Email for notifications
const ADMIN_EMAIL = 'chalabicerinemaria@gmail.com';
const SEND_NOTIFICATIONS = false; // Set to true to enable email notifications

// =====================================================
// MAIN HANDLER - Receives POST requests from website
// =====================================================
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);
    
    Logger.log('Received data type: ' + data.type);
    
    if (data.type === 'entreprise') {
      // Handle company form submission
      handleEntrepriseSubmission(ss, data);
      
    } else if (data.type === 'etudiant') {
      // Handle student form submission
      handleEtudiantSubmission(ss, data);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'success',
        message: 'Inscription enregistrée avec succès!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error in doPost: ' + error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'error', 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// =====================================================
// TEST ENDPOINT - Returns status message
// =====================================================
function doGet(e) {
  return ContentService
    .createTextOutput('Career Summit 2026 API - Running ✓\n\nLast updated: ' + new Date().toLocaleString('fr-FR'))
    .setMimeType(ContentService.MimeType.TEXT);
}

// =====================================================
// HANDLE ENTREPRISE FORM SUBMISSION
// =====================================================
function handleEntrepriseSubmission(ss, data) {
  try {
    const sheet = ss.getSheetByName('Entreprises');
    
    if (!sheet) {
      throw new Error('Sheet "Entreprises" not found. Please create it first.');
    }
    
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('fr-FR'),
      data.entreprise || '',
      data.secteur || '',
      data.representant || '',
      data.fonction || '',
      data.email || '',
      data.telephone || '',
      data.participation || '',
      data.cvFormat || '',
      data.message || ''
    ]);
    
    Logger.log('Entreprise data saved: ' + data.entreprise);
    
    // Send notification email (optional)
    if (SEND_NOTIFICATIONS) {
      sendNotificationEmail('entreprise', data);
    }
    
  } catch (error) {
    Logger.log('Error in handleEntrepriseSubmission: ' + error);
    throw error;
  }
}

// =====================================================
// HANDLE ÉTUDIANT FORM SUBMISSION
// =====================================================
function handleEtudiantSubmission(ss, data) {
  try {
    const sheet = ss.getSheetByName('Étudiants');
    
    if (!sheet) {
      throw new Error('Sheet "Étudiants" not found. Please create it first.');
    }
    
    let cvUrl = '';
    let cvLinkFromForm = data.cvUrl || '';
    
    // Handle CV Upload (Option 1: File upload with base64 data)
    if (data.cvData && data.cvFileName) {
      try {
        Logger.log('Processing CV file upload: ' + data.cvFileName);
        cvUrl = saveCVToDrive(data.cvData, data.cvFileName, data.nom, data.prenom);
        Logger.log('CV saved to Drive: ' + cvUrl);
      } catch (error) {
        Logger.log('CV upload failed: ' + error);
        cvUrl = 'Upload failed: ' + error.toString();
      }
    }
    
    // If no file was uploaded, use the CV link provided (Option 2)
    if (!cvUrl && cvLinkFromForm) {
      cvUrl = '';
      cvLinkFromForm = data.cvUrl;
    }
    
    // Append data to sheet

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('fr-FR'),
      data.nom || '',
      data.prenom || '',
      data.email || '',
      data.telephone || '',
      data.matricule || '',           // ⭐ NOUVEAU
      data.universite || '',          // ⭐ NOUVEAU
      cvUrl || '',                    // CV URL (from Drive upload)
      cvLinkFromForm || '',           // CV Link (external link if file > 5MB)
      data.linkedin || '',
      data.niveau || '',
      data.filiere || '',
      data.carteNationale || '',      // ⭐ NOUVEAU
      data.github || '',
      data.portfolio || '',
      data.typePoste || '',
      data.domaines || '',
      data.commentaires || '',
      data.consentement || 'Non'
    ]);
    
    Logger.log('Student data saved: ' + data.nom + ' ' + data.prenom);
    
    // Send notification email (optional)
    if (SEND_NOTIFICATIONS) {
      sendNotificationEmail('etudiant', data);
    }
    
  } catch (error) {
    Logger.log('Error in handleEtudiantSubmission: ' + error);
    throw error;
  }
}

// =====================================================
// SAVE CV TO GOOGLE DRIVE
// =====================================================
function saveCVToDrive(base64Data, fileName, nom, prenom) {
  try {
    // Get or create the CV folder
    let folder;
    
    if (CV_FOLDER_ID && CV_FOLDER_ID.trim() !== '') {
      // Use specified folder ID
      try {
        folder = DriveApp.getFolderById(CV_FOLDER_ID);
        Logger.log('Using existing folder ID: ' + CV_FOLDER_ID);
      } catch (e) {
        Logger.log('Folder ID invalid, creating new folder');
        folder = createCVFolder();
      }
    } else {
      // Create new folder
      Logger.log('No folder ID specified, creating new folder');
      folder = createCVFolder();
    }
    
    // Remove data:application/pdf;base64, prefix if present
    const base64Content = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
    
    // Decode base64 to blob
    const decodedData = Utilities.base64Decode(base64Content);
    const blob = Utilities.newBlob(decodedData, 'application/pdf', fileName);
    
    // Create sanitized filename
    const sanitizedNom = (nom || 'Student').replace(/[^a-zA-Z0-9]/g, '_');
    const sanitizedPrenom = (prenom || '').replace(/[^a-zA-Z0-9]/g, '_');
    const timestamp = Utilities.formatDate(new Date(), 'GMT+1', 'yyyyMMdd_HHmmss');
    const newFileName = `CV_${sanitizedNom}_${sanitizedPrenom}_${timestamp}.pdf`;
    
    // Save file to Drive
    const file = folder.createFile(blob.setName(newFileName));
    
    // Make file accessible to anyone with the link
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    Logger.log('CV file created: ' + newFileName);
    
    // Return the viewable URL
    return file.getUrl();
    
  } catch (error) {
    Logger.log('Error in saveCVToDrive: ' + error);
    throw new Error('Failed to save CV to Drive: ' + error.toString());
  }
}

// =====================================================
// CREATE CV FOLDER IN GOOGLE DRIVE
// =====================================================
function createCVFolder() {
  try {
    // Check if folder already exists
    const folders = DriveApp.getFoldersByName('Career Summit 2026 - CVs');
    
    if (folders.hasNext()) {
      const folder = folders.next();
      Logger.log('Found existing CV folder. ID: ' + folder.getId());
      Logger.log('⚠️ IMPORTANT: Add this ID to your script: const CV_FOLDER_ID = "' + folder.getId() + '";');
      return folder;
    }
    
    // Create new folder
    const newFolder = DriveApp.createFolder('Career Summit 2026 - CVs');
    Logger.log('Created new CV folder. ID: ' + newFolder.getId());
    Logger.log('⚠️ IMPORTANT: Add this ID to your script: const CV_FOLDER_ID = "' + newFolder.getId() + '";');
    
    return newFolder;
    
  } catch (error) {
    Logger.log('Error creating folder: ' + error);
    throw error;
  }
}

// =====================================================
// SEND EMAIL NOTIFICATIONS (Optional)
// =====================================================
function sendNotificationEmail(type, data) {
  if (!SEND_NOTIFICATIONS || !ADMIN_EMAIL) {
    return;
  }
  
  try {
    if (type === 'entreprise') {
      const subject = '🏢 Nouvelle demande entreprise - ' + (data.entreprise || 'N/A');
      const body = `
Nouvelle demande de participation reçue:

📊 INFORMATIONS ENTREPRISE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Entreprise: ${data.entreprise || 'N/A'}
Secteur: ${data.secteur || 'N/A'}
Représentant: ${data.representant || 'N/A'}
Fonction: ${data.fonction || 'N/A'}

📧 CONTACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: ${data.email || 'N/A'}
Téléphone: ${data.telephone || 'N/A'}

📋 DÉTAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type de participation: ${data.participation || 'N/A'}
Format CV préféré: ${data.cvFormat || 'N/A'}
Message: ${data.message || 'Aucun'}

⏰ Date d'inscription: ${data.timestamp || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Career Summit 2026 - Project Initiative USTHB
      `;
      
      MailApp.sendEmail(ADMIN_EMAIL, subject, body);
      Logger.log('Notification email sent for company: ' + data.entreprise);
      
    } else if (type === 'etudiant') {
      const subject = '👨‍🎓 Nouvelle inscription étudiant - ' + (data.nom || '') + ' ' + (data.prenom || '');
      const body = `
Nouvelle inscription étudiant reçue:

👤 INFORMATIONS PERSONNELLES
━━━━━━━━━━━━━━━━━━━━━━���━━━━━━━━━
Nom: ${data.nom || 'N/A'}
Prénom: ${data.prenom || 'N/A'}
Email: ${data.email || 'N/A'}
Téléphone: ${data.telephone || 'N/A'}
Carte Nationale: ${data.carteNationale || 'N/A'}    ⭐ NOUVEAU

🎓 INFORMATIONS ACADÉMIQUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Matricule: ${data.matricule || 'N/A'}              ⭐ NOUVEAU
Université: ${data.universite || 'N/A'}            ⭐ NOUVEAU
Niveau: ${data.niveau || 'N/A'}
Filière: ${data.filiere || 'N/A'}
🔗 PROFILS PROFESSIONNELS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LinkedIn: ${data.linkedin || 'N/A'}
GitHub: ${data.github || 'Non fourni'}
Portfolio: ${data.portfolio || 'Non fourni'}

💼 PRÉFÉRENCES
━━━━━━━━━━━━━━━━━━━━━━━━���━━━━━━━
Type de poste: ${data.typePoste || 'Non spécifié'}
Domaines d'intérêt: ${data.domaines || 'Non spécifié'}

📝 COMMENTAIRES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.commentaires || 'Aucun'}

✅ Consentement: ${data.consentement || 'Non'}

⏰ Date d'inscription: ${data.timestamp || 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Career Summit 2026 - Project Initiative USTHB
      `;
      
      MailApp.sendEmail(ADMIN_EMAIL, subject, body);
      Logger.log('Notification email sent for student: ' + data.nom + ' ' + data.prenom);
    }
    
  } catch (error) {
    Logger.log('Error sending notification email: ' + error);
    // Don't throw error - email is optional
  }
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

// Get folder info (for debugging)
function getFolderInfo() {
  if (!CV_FOLDER_ID || CV_FOLDER_ID.trim() === '') {
    Logger.log('No folder ID set. Will auto-create on first upload.');
    return;
  }
  
  try {
    const folder = DriveApp.getFolderById(CV_FOLDER_ID);
    Logger.log('Folder Name: ' + folder.getName());
    Logger.log('Folder ID: ' + folder.getId());
    Logger.log('Folder URL: ' + folder.getUrl());
    Logger.log('Number of files: ' + folder.getFiles().hasNext());
  } catch (e) {
    Logger.log('Error accessing folder: ' + e);
  }
}

// List all CVs in folder (for debugging)
function listAllCVs() {
  if (!CV_FOLDER_ID || CV_FOLDER_ID.trim() === '') {
    Logger.log('No folder ID set.');
    return;
  }
  
  try {
    const folder = DriveApp.getFolderById(CV_FOLDER_ID);
    const files = folder.getFiles();
    let count = 0;
    
    Logger.log('CVs in folder:');
    Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    while (files.hasNext()) {
      const file = files.next();
      count++;
      Logger.log(count + '. ' + file.getName());
      Logger.log('   URL: ' + file.getUrl());
      Logger.log('   Size: ' + (file.getSize() / 1024).toFixed(2) + ' KB');
      Logger.log('   Created: ' + file.getDateCreated());
      Logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
    
    Logger.log('Total CVs: ' + count);
    
  } catch (e) {
    Logger.log('Error listing CVs: ' + e);
  }
}


// Log script version
Logger.log('Career Summit 2026 - Google Apps Script v5.0 ✓');