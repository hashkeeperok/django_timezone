from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin


urlpatterns = [
	url(r'^$', include('timezone.urls')),
	url(r'^riddles/', include('riddles.urls')),
	url(r'^admin/', admin.site.urls),
] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)
