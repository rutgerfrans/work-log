from django.db import models

class log(models.Model):
    date = models.DateField(auto_now_add=False)
    hours = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()

    def __str__(self):
        return f'{self.date}: {self.hours} hours - {self.description[:20]}...'

