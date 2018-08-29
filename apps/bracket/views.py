from django.shortcuts import render, redirect
from django.http import JsonResponse
import json

with open ("C:/Users/tmcgr/OneDrive/Documents/Coding Dojo/Project/march_madness/apps/bracket/static/bracket/json/final_merged.json") as data_file:
    data = json.load(data_file)

teamlist = []

for team in data:
    teamlist.append(team['School'])

def index(request):
    return render(request, 'bracket/index.html')

# returns a list of school names from JSON
def dropdown(request):
    context = {
        'teams' : teamlist,
    }

    return render(request, 'bracket/dropdown.html', context)

def dropup(request):
    context = {
        'teams': teamlist,
    }

    return render(request, 'bracket/dropup.html', context)
