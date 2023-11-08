from django.utils.timezone import make_aware
from datetime import datetime
from django.http import HttpResponseForbidden

class TimeRestrictedMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        current_time = make_aware(datetime.now())
        restricted_time = make_aware(datetime(2023,11,7))
        if current_time < restricted_time:
            return HttpResponseForbidden("Access is restricted before the specified time.")
        return self.get_response(request)
