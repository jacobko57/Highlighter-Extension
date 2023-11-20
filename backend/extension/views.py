# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import DiseaseNERModel

# Variable to store message
to_display = ""

def hello_world(request):
    return HttpResponse("Chewy is super cute!")

def jacob(request):
    return HttpResponse("Jacob is awesome.")

def jianna(request):
    return HttpResponse("Jianna has some super strong pokemon!")

@csrf_exempt
def practice(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            message = data.get('message', '')
            # Process the message using your ML model or perform other actions
            result = f"Received message: {message}"
            
            # Store the result in the session
            request.session['to_display'] = result

            return JsonResponse({'result': result})
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
def display_message(request):
    # Retrieve the stored result from the session
    to_display = request.session.get('to_display', '')

    return HttpResponse(to_display)

def predict_disease(request):
    # Load the spaCy NER model (you may want to call this during app initialization or on-demand)
    nlp = DiseaseNERModel.load_model()

    string = request.session.get('to_display', '')

    # Process the text with the NER model
    doc = nlp(string)

    # Extract named entities from the document
    entities = []

    for ent in doc.ents:
        if ent.label_ == "DISEASE":
            if ent.text not in entities:
                entities.append(ent.text)


    # Render the template with the results
    return JsonResponse({'entities': entities})
