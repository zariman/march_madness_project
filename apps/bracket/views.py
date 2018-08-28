from django.shortcuts import render, redirect
from django.http import JsonResponse
import json

def index(request):
    return render(request, 'bracket/index.html')

# returns a list of school names from JSON
def dropdown(request):
    with open ("C:/Users/tmcgr/OneDrive/Documents/Coding Dojo/Project/march_madness/apps/bracket/static/bracket/json/final_merged.json") as data_file:
        data = json.load(data_file)

    dropdown = []

    for team in data:
        dropdown.append(team['School'])

    context = {
        'teams' : dropdown
    }

    return render(request, 'bracket/dropdown.html', context)
# Create your views here.
