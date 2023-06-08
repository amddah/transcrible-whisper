from flask import Flask,render_template,request,jsonify,session
import whisper
from flask_cors import CORS
import os
import json


app = Flask(__name__)
#load le model
model = whisper.load_model("base") #769M Parameter
#repertoire pour telecharger l'audio
app.config['UPLOAD_FOLDER'] = './'
CORS(app)
app.secret_key ='SECRET_KEY'

#lire le fichier lang.json
with open('lang.json', 'r') as json_file:
    data = json.load(json_file)

#page home
@app.route("/")
def Home():
    return render_template('index.html')

#import fichier
@app.route("/import")
def Import():
    return render_template('import.html')
#record audio
@app.route('/record')
def Record():
    return render_template('record.html')
@app.route('/about')
def About():
    return render_template('about.html')
@app.route('/upload',methods=['POST','GET'])
def upload():
    if request.method == 'POST':
        file = request.files['audio']
        if file:
            file.save(app.config['UPLOAD_FOLDER'] + file.filename)
            result = model.transcribe(file.filename)
            os.remove(file.filename)
            print(result['text'])
            lang=data[result['language']]
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return jsonify({'texte': result['text'], 'language': lang})
            else:
                session['textarea_value'] = result['text']
                session['textarea_language'] = lang
                session['active'] = 'active'
                return render_template('import.html')
        else:
            return "erreur file not found"
    else:
        return "Méthode non autorisée"
#requete qui Détruire toutes les données de session
@app.route('/destroy_session',methods=['POST','GET'])
def destroy_session():
    session.clear()  # Détruire toutes les données de session
    # Ou utilisez session.pop('cle') pour supprimer une clé spécifique de la session
    response = {'message': 'La session a été détruite.'}
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)