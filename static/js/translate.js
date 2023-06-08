var translations = {
    "fr": {
      "ImportAudioFile": "Importer un fichier audio",
      "chooseFile": "Choisir un fichier",
      "transcribe": "Transcrire",
      "copy": "Copier",
      "headersousTitle"   :"Prenez des notes avec votre voix gratuitement, ou transcrivez automatiquement <br>des enregistrements audio et vidéo sur le champ.<br>Sécurisé, précis et ultra rapide.",
      "headerTitle":"Reconnaissance vocale - Dictée vocale &<br> transcription",
      "startSave":"Commencez à enregistrer votre audio et le transcrire automatiquement",
       "transcrireAudio":"Transcrire automatiquement des enregistrements, fichiers audio et vidéo",
       "TranscrireSave":"Transcrire des enregistrements",
       "startTranscrirbe":"Commencer la transcription",
       "startdicte":"Commencez à dicter",
       "DicteeVocale":"Dictée vocale",
       "Home":"Accueil",
       "Transcription":"Transcription",
       "Dictee":"Dictée",
       "About":"Information",
       "titleRecord":"Veuillez enregistrer l'audio",
       "deletetexte":"Supprimer texte"
       // Ajoutez d'autres traductions pour le français
    },
    "en": {
      "ImportAudioFile": "Import Audio File",
      "chooseFile": "Choose File",
      "transcribe": "Transcribe",
      "copy": "Copy",
      "headersousTitle":"Take notes with your voice for free, or automatically transcribe audio &<br> video recordings on the spot. Secure, accurate & super fast",
      "headerTitle":"Speech to Text - Voice Typing &<br> Transcription",
      "startSave":"Start recording your audio and transcribe it automatically",
      "transcrireAudio":"Automatically transcribe recordings, audio files, and videos",
      "TranscrireSave":"Transcribe recordings",
      "startTranscrirbe":"Start transcription",
      "startdicte":"Start dictating",
      "DicteeVocale":"Voice Dictation",
      "Home":"Home",
      "Transcription":"Transcription",
      "Dictee":"Dictation",
      "About":"Information",
      "titleRecord":"Please record the audio",
      "deletetexte":"Delete text"
      // Ajoutez d'autres traductions pour l'anglais
    },
    "es": {
      "ImportAudioFile": "Importar archivo de audio",
      "chooseFile": "Seleccionar archivo",
      "transcribe": "Transcribir",
      "copy": "Copiar",
      "headersousTitle" :"Grabe notas con tu voz de forma gratuita, o transcribe automáticamente <br> grabaciones de audio y video al instante.<br> Seguro, preciso y súper rápido",
      "headerTitle":"Convierte voz a texto - Escritura por voz &<br> transcripción",
      "startSave":"Comienza a grabar tu audio y transcribirlo automáticamente",
      "transcrireAudio":"Transcribe automáticamente grabaciones, archivos de audio y videos",
      "TranscrireSave":"Transcribe grabaciones",
      "startTranscrirbe":"Comenzar transcripción",
      "startdicte":"Comienza a dictar",
      "DicteeVocale":"Dictado de voz",
      "Home":"Página principal",
      "Transcription":"Transcripción",
      "Dictee":"Dictado",
      "About":"Información",
      "titleRecord":"Por favor, graba el audio",
      "deletetexte":"borrar texto"
      // Ajoutez d'autres traductions pour l'espagnol
    }
  };
  
  var currentLanguage = localStorage.getItem("lang") || "en"; // Récupérer la langue à partir du localStorage ou utiliser le français par défaut
  
  var languageSelector = document.getElementById("language-selector");
  
  languageSelector.addEventListener("change", function() {
    var selectedLanguage = languageSelector.value;
    
    // Vérifier si la langue sélectionnée existe dans les traductions disponibles
    if (translations.hasOwnProperty(selectedLanguage)) {
      // Mettre à jour la variable currentLanguage avec la nouvelle langue sélectionnée
      currentLanguage = selectedLanguage;
      
      // Stocker la langue sélectionnée dans le localStorage
      localStorage.setItem("lang", currentLanguage);
      
      // Appeler la fonction pour mettre à jour les éléments traduits avec la nouvelle langue
      updateTranslations();
    }
  });
  
  function updateTranslations() {
    var elementsToTranslate = document.getElementsByClassName("translate");
  
    for (var i = 0; i < elementsToTranslate.length; i++) {
      var element = elementsToTranslate[i];
      var translationKey = element.getAttribute("data-translation-key");
  
      if (translations[currentLanguage].hasOwnProperty(translationKey)) {
        var translation = translations[currentLanguage][translationKey];
  
        if (element.tagName === "INPUT") {
          element.value = translation;
        } else {
          element.innerHTML = translation;
        }
      } else {
        element.textContent = ""; // Si aucune traduction n'est disponible, définir le contenu comme vide
      }
    }
  }
  
  // Appel initial pour mettre à jour les éléments traduits avec la langue actuelle
  updateTranslations();
  window.addEventListener("DOMContentLoaded", function() {

    // Écouteur d'événement pour le changement de sélection
    texte=localStorage.getItem("texte");
    language=localStorage.getItem("language");
    if (texte) {
      document.getElementById('texte').innerHTML=texte;
      document.getElementById('language-texte').style.display='initial';
      document.getElementById('language-texte').textContent=language;
    }
    
    // Lire la valeur de la langue à partir du localStorage
    var storedLanguage = localStorage.getItem("lang");
    
    // Utiliser la langue du localStorage si elle existe, sinon utiliser la langue par défaut
    var languageToUse = storedLanguage || currentLanguage;
    
    // Mettre à jour le sélecteur de langue avec la valeur correspondante
    var languageSelector = document.getElementById("language-selector");
    languageSelector.value = languageToUse;
    
    // Appeler la fonction pour mettre à jour les traductions avec la langue correspondante
    updateTranslations(languageToUse);
  });
