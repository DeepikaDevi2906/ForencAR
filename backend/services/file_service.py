import os
from werkzeug.utils import secure_filename

from utils.pdf_parser import extract_text_from_pdf


UPLOAD_FOLDER = "uploads/autopsy_reports"


def save_uploaded_file(file):

    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    filename = secure_filename(file.filename)

    file_path = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    file.save(file_path)

    return file_path


def process_pdf_file(file):

    file_path = save_uploaded_file(file)

    extracted_text = extract_text_from_pdf(file_path)

    return {
        "file_path": file_path,
        "extracted_text": extracted_text
    }