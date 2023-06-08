const display = document.querySelector('.display')
let btn=document.getElementById('removetexte');
let mediaRecorder;
let chunks = [];
let audioURL;
let texte;
const toggleRecording = () => {
    const iconElement = document.querySelector('#fa-solid');
    if (iconElement.classList.contains('active')) {
        stopRecording();
    } else {
        startRecording();
    }
}

const startRecording = () => {
    chunks = [];
    const iconElement = document.querySelector('#fa-solid');
    iconElement.classList.add('active', 'pulse');
    iconElement.style.color = '#ff0000';
    document.getElementById('recordBtn').classList.toggle('active')
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            mediaRecorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/wav' });
                audioURL = window.URL.createObjectURL(blob);
                console.log(audioURL);
                document.getElementById('sendBtn').disabled = false;
                addAudio();
            };
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
        });
};

const stopRecording = () => {
    mediaRecorder.stop();
    const mediaStream = mediaRecorder.stream;
    const mediaStreamTrack = mediaStream.getTracks()[0];
    mediaStreamTrack.stop();
    const iconElement = document.querySelector('#fa-solid');
    iconElement.classList.remove('active', 'pulse');
    iconElement.style.color = '#0a6fdb';
    document.getElementById('recordBtn').classList.remove('active')
};

// Vous pouvez ajouter un écouteur d'événement au bouton pour appeler la fonction toggleRecording()
document.getElementById('recordBtn').addEventListener('click', toggleRecording);

const sendAudio = () => {
    const formData = new FormData();
    formData.append('audio', new Blob(chunks, { type: 'audio/wav' }));
    var loaderOverlay = document.getElementById('loaderOverlay');
    loaderOverlay.style.display = 'flex';
    fetch('/upload', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest' // Ajoute l'en-tête X-Requested-With pour identifier la requête Ajax
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Audio upload complete');
        document.getElementById('texte').innerHTML = data.texte;
        document.getElementById('language-texte').style.display='initial';
        document.getElementById('language-texte').textContent=data.language;
        localStorage.setItem("texte",data.texte);
        localStorage.setItem("language",data.language);
        loaderOverlay.style.display = 'none';
       
    })
    .catch(error => {
        console.error('Error uploading audio:', error);
        document.getElementById('status').textContent = 'Error uploading audio';
    });

};


const addAudio = () => {
    
    // Vérifier s'il y a déjà un élément audio dans le conteneur
    const existingAudio = display.querySelector('audio');
    if (existingAudio) {
      // Supprimer l'audio existant s'il existe
      display.removeChild(existingAudio);
    }
   
    // Créer le nouvel élément audio
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = audioURL;
    document.getElementById('remove').style.display='initial'
    // Ajouter le nouvel élément audio au conteneur
    display.appendChild(audio);
  }
  
//copier text

function copier(params) {
    var textarea = document.querySelector(".text-transcribe"+params);
    textarea.disabled=false;
    // Select the text field
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(textarea.value);
    textarea.disabled=true;
    document.getElementById("copyButton"+params).innerHTML = '&#10003;copier';

    // Réinitialiser le texte du bouton après 2000 millisecondes (2 secondes)
    setTimeout(() => {
      document.getElementById("copyButton"+params).innerHTML = '<i class="fa-solid fa-copy " style="color: #fff;"></i> Copier';
    }, 2000);
    // Alert the copied text
    }

    const addButton = (id, funString, text) => {
        const btn = document.createElement('button')
        btn.id = id
        btn.type='button'
        btn.setAttribute('onclick', funString)
        btn.innerHTML = text
        document.querySelector('.control-audio').append(btn)
    }

    const removeAudio= ()=>{
        const existingAudio = display.querySelector('audio');
          // Supprimer l'audio existant s'il existe
          display.removeChild(existingAudio);
          document.getElementById('remove').style.display='none'
          document.getElementById('sendBtn').disabled = true;
    }

    function showLoader() {
        var loaderOverlay = document.getElementById('loaderOverlay');
        loaderOverlay.style.display = 'flex';
    }

    
//imprimer le texte
  function printTextarea() {
    var textareaContent = document.getElementById('texte').value;
    if (textareaContent!="") {
      
    
    var printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Impression</title></head><body>');
    printWindow.document.write('<p>' + textareaContent + '</p>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }
  }

 btn.addEventListener('click',()=>{
    localStorage.removeItem('texte');
    localStorage.removeItem('language');
    document.getElementById('language-texte').textContent='';
    document.getElementById('texte').textContent="";
    document.getElementById('language-texte').style.display='none';
    
 })