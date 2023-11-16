# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse
import os
from .models import DiseaseNERModel

def hello_world(request):
    return HttpResponse("Chewy is super cute!")

def jacob(request):
    return HttpResponse("Jacob is awesome.")

def jianna(request):
    return HttpResponse("Jianna has some super strong pokemon!")

def predict_disease(request):
    # Load the spaCy NER model (you may want to call this during app initialization or on-demand)
    nlp = DiseaseNERModel.load_model()

    def get_text_data(file_path):
        with open(file_path, 'r', encoding='utf-8') as file:
            text_data = file.read()

        return text_data

    # Example usage
    string = get_text_data(r"C:\Users\jacob\Desktop\School\3 - Junior\Highlighter Extension\backend\extension\COVID.txt")

    # Process the text with the NER model
    doc = nlp(string)

    # Extract named entities from the document
    # entities = [{'text': ent.text, 'label': ent.label_} for ent in doc.ents]
    entities = []

    for ent in doc.ents:
        if ent.label_ == "DISEASE":
            entities.append({'text': ent.text, 'label': ent.label_})

    # Render the template with the results
    return render(request, 'extension/predict.html', {'entities': entities})
