from django.db import models

class user(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return f'{self.username}: {self.password}'

