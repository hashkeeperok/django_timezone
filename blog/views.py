from django.http.response import HttpResponse
from django.shortcuts import get_object_or_404, render

from .models import Riddle, Option


def index(request):
    return render(request, "index.html", {"latest_riddles": Riddle.objects.order_by('-pub$



