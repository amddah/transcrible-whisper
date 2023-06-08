import whisper

class Modele:
    def __init__(self):
        self.model = whisper.load_model("tiny")
    
    def get_transcription(self, audio_file):
        result = self.model.transcribe(audio_file)
        return result["text"]
