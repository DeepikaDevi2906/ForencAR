import os
import torch
import subprocess

# ===================================
# ADD FFMPEG TO PATH
# ===================================

os.environ["PATH"] += os.pathsep + (
    r"C:\Users\devid\Downloads\ffmpeg-2026-05-06-git-f2e5eff3ff-essentials_build\ffmpeg-2026-05-06-git-f2e5eff3ff-essentials_build\bin"
)

from transformers import (
    pipeline,
    AutoModelForSpeechSeq2Seq,
    AutoProcessor
)

# ===================================
# FFMPEG PATH
# ===================================

FFMPEG_PATH = (
    r"C:\Users\devid\Downloads\ffmpeg-2026-05-06-git-f2e5eff3ff-essentials_build\ffmpeg-2026-05-06-git-f2e5eff3ff-essentials_build\bin\ffmpeg.exe"
)

# ===================================
# CONVERT FILE TO WAV
# ===================================

def convert_to_wav(
    input_file,
    output_wav="input.wav"
):

    ext = (
        input_file
        .split(".")[-1]
        .lower()
        .strip()
    )

    print("\nFILE EXTENSION:", ext)

    supported_formats = [

        "mp3",

        "wav",

        "mp4",

        "mpeg",

        "m4a",

        "aac",

        "ogg",

        "flac",

        "webm"
    ]

    if ext not in supported_formats:

        raise ValueError(
            f"Unsupported file format: {ext}"
        )

    # ===================================
    # WAV DIRECT
    # ===================================

    if ext == "wav":

        return input_file

    # ===================================
    # CONVERT USING FFMPEG
    # ===================================

    subprocess.run(
        [
            FFMPEG_PATH,

            "-y",

            "-i",
            input_file,

            "-vn",

            "-acodec",
            "pcm_s16le",

            "-ar",
            "16000",

            "-ac",
            "1",

            output_wav
        ],
        check=True
    )

    return output_wav


# ===================================
# LOAD WHISPER MODEL
# ===================================

def load_asr():

    # BETTER MODEL
    model_id = "openai/whisper-small"

    print("\nLOADING MODEL:", model_id)

    model = (
        AutoModelForSpeechSeq2Seq
        .from_pretrained(model_id)
    )

    processor = (
        AutoProcessor
        .from_pretrained(model_id)
    )

    return pipeline(
        "automatic-speech-recognition",

        model=model,

        tokenizer=processor.tokenizer,

        feature_extractor=
            processor.feature_extractor,

        device=
            0 if torch.cuda.is_available()
            else -1
    )


# ===================================
# LOAD ASR
# ===================================

print("\nLOADING WHISPER MODEL...\n")

asr = load_asr()

print("\nWHISPER MODEL LOADED\n")


# ===================================
# LOAD CLASSIFIER
# ===================================

print("\nLOADING CLASSIFIER...\n")

classifier = pipeline(
    "zero-shot-classification",

    model=
        "facebook/bart-large-mnli"
)

print("\nCLASSIFIER LOADED\n")


# ===================================
# PROCESS AUDIO / VIDEO
# ===================================

def process_file(file_path):

    print("\nSTARTED PROCESSING...\n")

    # ===================================
    # CONVERT FILE
    # ===================================

    wav = convert_to_wav(
        file_path
    )

    print("\nCONVERTED TO WAV\n")

    # ===================================
    # TRANSCRIBE
    # ===================================

    print("\nTRANSCRIBING...\n")

    result = asr(

        wav,

        chunk_length_s=30,

        return_timestamps=True,

        generate_kwargs={

            "task": "transcribe",

            "language": "english"
        }
    )

    print("\nTRANSCRIPTION RESULT:\n")

    print(result)

    text = result.get(
        "text",
        ""
    )

    # ===================================
    # LABELS
    # ===================================

    labels = [

        "panic",

        "distress",

        "violence",

        "domestic abuse",

        "medical emergency",

        "threat",

        "fear",

        "accident",

        "normal conversation",

        "criminal activity"
    ]

    # ===================================
    # CLASSIFICATION
    # ===================================

    print("\nCLASSIFYING...\n")

    result = classifier(
        text,
        labels
    )

    top_label = (
        result["labels"][0]
    )

    top_score = (
        result["scores"][0]
    )

    # ===================================
    # RISK LEVEL
    # ===================================

    risk_level = "LOW"

    if top_score > 0.85:

        risk_level = "HIGH"

    elif top_score > 0.65:

        risk_level = "MEDIUM"

    # ===================================
    # AI OBSERVATION
    # ===================================

    observation = ""

    if top_label in [

        "panic",

        "fear",

        "distress"

    ]:

        observation = (
            "Subject voice indicates psychological distress."
        )

    elif top_label in [

        "violence",

        "criminal activity",

        "threat"

    ]:

        observation = (
            "Possible violent or criminal activity detected."
        )

    elif top_label == "medical emergency":

        observation = (
            "Potential medical emergency identified."
        )

    else:

        observation = (
            "No immediate forensic threat detected."
        )

    # ===================================
    # FINAL RESULT
    # ===================================

    final_result = {

        "text": text,

        "label": top_label,

        "score": float(top_score),

        "risk_level": risk_level,

        "observation": observation,

        "emergency":

            top_label in [

                "panic",

                "violence",

                "medical emergency",

                "criminal activity"

            ]

            and top_score > 0.6
    }

    print("\nFINAL RESULT:\n")

    print(final_result)

    return final_result