from django.shortcuts import render, redirect
from django.http import JsonResponse
import json

with open ("C:/Users/tmcgr/OneDrive/Documents/Coding Dojo/Project/march_madness/apps/bracket/static/bracket/json/march_madness_2017.json") as data_file:
    team_data = json.load(data_file)

with open ("C:/Users/tmcgr/OneDrive/Documents/Coding Dojo/Project/march_madness/apps/bracket/static/bracket/json/tourny_2017.json") as data_file:
    march_madness_data = json.load(data_file)

teamlist = []
south_round1_2017 = []

for team in team_data:
    teamlist.append(team['School'])

def index(request):
    return render(request, 'bracket/index.html')

# returns a list of teams from JSON
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

def choose_year(request):
    if request.POST['year'] == "2017":
        context = {
            "march_madness_data": march_madness_data,
        }
    return JsonResponse(context)

def compare(request):
    team1 = {}
    team2 = {}
    stats = []
  
    for i in range(len(team_data)):
        if team_data[i]['School'] == request.POST['team1']:
            team1 = team_data[i]
        if team_data[i]['School'] == request.POST['team2']:
            team2 = team_data[i]
    for key,value in team_data[0].items():
        stats.append(key)
    context = {
        'stats': stats,
        'team1': team1,
        'team2': team2
    }
    return render(request, 'bracket/compare.html', context)
