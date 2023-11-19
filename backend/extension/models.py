# Create your models here.
from django.db import models
import spacy
from spacy.lang.en import English
from spacy.pipeline import EntityRuler

# spacy.prefer_gpu(True)
# nlp = spacy.load("en_core_web_lg")

# # Example usage
# def get_text_data(file_name):
#     with open(file_name, 'r', encoding='utf-8') as file:
#         text_data = file.read()

#     return text_data

# # Example usage
# string = get_text_data("COVID.txt")

# doc = nlp(string)
# # print(list(doc.sents)[0])

# sentences = list(doc.sents)

# def read_diseases_file(file_path):
#     with open(file_path, 'r', encoding='utf-8') as file:
#         diseases_list = [line.strip() for line in file.readlines()]

#     return diseases_list

# # Example usage
# file_path = "labeled.txt"  # Replace with the actual path to your file
# diseases = read_diseases_file(file_path)

# def create_training_data(data, type):
#     patterns = []
#     for item in data:
#         pattern = {
#             "label": type,
#             "pattern": item
#         }
#         patterns.append(pattern)
#     return patterns

# patterns = create_training_data(diseases, "DISEASE")
# # print(patterns)

# #Build upon the spaCy Small Model
# # nlp = spacy.load("en_core_web_lg")

# # #Create the Ruler and Add it
# # ruler = nlp.add_pipe("entity_ruler")
# # ruler.add_patterns(patterns)
# # nlp.to_disk("diseases_ner")

# nlp = spacy.load("./diseases_ner")

# # Process the string with the NER model
# doc = nlp(string)

# # Iterate over the named entities in the document
# for ent in doc.ents:
#     if ent.label_ == "DISEASE":
#         print(ent.label_)  # Print the label of the named entity
#         print(ent.text)    # Print the text of the named entity


class DiseaseNERModel(models.Model):
    @staticmethod
    def load_model():
        # Load the spaCy NER model
        model_path = r"C:\Users\jacob\Desktop\School\3 - Junior\Highlighter Extension\backend\extension\diseases_ner"  # Adjust the path accordingly
        nlp = spacy.load(model_path)
        return nlp

