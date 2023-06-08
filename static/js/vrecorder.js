let btn=document.getElementById('remove');

function toggleButton() {
    var fileInput = document.getElementById('audioInput');
    var submitButton = document.getElementById('submitButton');
    submitButton.disabled = !fileInput.value;

}

function showLoader() {
    var loaderOverlay = document.getElementById('loaderOverlay');
    loaderOverlay.style.display = 'flex';
}
//copie text transcris
document.getElementById('copyButton').addEventListener('click', function() {
var transcriptionText = document.getElementById('transcriptionText');
transcriptionText.select();
document.execCommand('copy');
});
//change  copy
function changeIcon() {
 var icon = document.getElementById('icone');
// var icon = copyButton.querySelector('i');

// Changer l'icône FontAwesome
icon.classList.remove('fa-copy');
icon.classList.add('fa-check');

// Revenir à l'icône initiale après 2 secondes
setTimeout(function() {
  icon.classList.remove('fa-check');
  icon.classList.add('fa-copy');
}, 2000);
}

//supprimer les donnee
btn.addEventListener('click',()=>{
  
$.ajax({
  url: "/destroy_session",
  type: "GET",
  success: function(response) {
    console.log("La session a été détruite.");
    document.getElementById('transcriptionText').textContent='';
    document.getElementById('language-texte').textContent='';
    document.getElementById('language-texte').style.display='none';
    // Faites quelque chose après avoir détruit la session
  },
  error: function(error) {
    console.log("Une erreur s'est produite lors de la destruction de la session.");
    // Faites quelque chose en cas d'erreur
  }
});
})


function printTextarea() {
  var textareaContent = document.getElementById('transcriptionText').value;
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