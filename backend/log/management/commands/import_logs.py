import re
from datetime import datetime
from django.core.management.base import BaseCommand
from log.models import log  # Adjust if your model is named differently

class Command(BaseCommand):
    help = 'Imports log data from a TSV file into the log table'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the TSV file to be imported')

    def handle(self, *args, **options):
        file_path = options['file_path']

        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                for line in file:
                    line = line.strip()

                    # Split the first part (UUID) by spaces
                    parts = line.split(maxsplit=1)
                    if len(parts) < 2:
                        self.stdout.write(self.style.WARNING(f'Skipping malformed row: {line}'))
                        continue
                    
                    uuid = parts[0].strip()
                    
                    # Split the remaining part by tabs
                    rest = parts[1].split('\t')
                    if len(rest) < 3:
                        self.stdout.write(self.style.WARNING(f'Skipping malformed row: {line}'))
                        continue
                    
                    date_str = rest[0].strip()
                    hours_str = rest[1].strip()
                    description = rest[2].strip()

                    try:
                        date = datetime.strptime(date_str, "%d/%m/%Y")
                        hours = float(hours_str.replace(',', '.'))
                    except ValueError as ve:
                        self.stdout.write(self.style.WARNING(f'Skipping row due to parsing error: {line} - {ve}'))
                        continue

                    # Create and save a new log entry
                    log_entry = log(uid=uuid, date=date, hours=hours, description=description)
                    log_entry.save()

                self.stdout.write(self.style.SUCCESS('Successfully imported log data.'))
        
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error importing log data: {e}'))
