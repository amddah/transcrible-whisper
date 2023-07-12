# Transcrible-Whisper
# Speech to Text Web App with OpenAI Whisper Model Deployment

This web application converts speech to text using the OpenAI Whisper model. It is developed using the Flask framework.

## Installation

1. Clone this code repository to your local machine:

```shell
git clone https://github.com/amddah/transcrible-whisper.git
```

2. Navigate to the project directory:

```shell
cd transcrible-whisper
```

3. Create a virtual environment:

```shell
python -m venv venv
```

4. Activate the virtual environment:

```shell
# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

5. Install the project dependencies:

```shell
pip install -r requirements.txt
```

6. Setup Whisper:

We used Python 3.9.9 and PyTorch 1.10.1 to train and test our models, but the codebase is expected to be compatible with Python 3.8-3.11 and recent PyTorch versions. The codebase also depends on a few Python packages, most notably OpenAI's tiktoken for their fast tokenizer implementation. You can download and install (or update to) the latest release of Whisper with the following command:

```shell
pip install -U openai-whisper
```

Alternatively, the following command will pull and install the latest commit from this repository, along with its Python dependencies:

```shell
pip install git+https://github.com/openai/whisper.git 
```

To update the package to the latest version of this repository, please run:

```shell
pip install --upgrade --no-deps --force-reinstall git+https://github.com/openai/whisper.git
```

7. Activate the virtual environment:

```shell
# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

8. Install the project dependencies:

```shell
pip install -r requirements.txt
```

9. Install ffmpeg:

This application also requires the command-line tool ffmpeg to be installed on your system, which is available from most package managers.

## Usage

1. Launch the Flask application:

```shell
flask run
```

2. Access the following URL in your browser:

```
http://127.0.0.1:5000
```

3. Record or upload an audio file containing speech.

4. Upload the audio file on the web application.

5. The application will automatically convert the speech to text using the OpenAI Whisper model.

## Contact

For any questions or support requests, please contact me at the following email address: [abdoamdah3@gmail.com].

For more information about the Whisper model, please consult the following repositories:
- [Whisper Repository](https://github.com/openai/whisper)
- [OpenAI Repository](https://github.com/openai/whisper)
