import csv
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
        
        # Regular expression to match the date, hours, and description fields
        row_pattern = re.compile(r'^(\d{2}/\d{2}/\d{4})\s+([\d,]+)\s+(.*)$')

        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                reader = csv.reader(file, delimiter='\t')
                for line in reader:
                    # Join the line content to form a single string and match using regex
                    row_data = '\t'.join(line)
                    match = row_pattern.match(row_data)
                    
                    if not match:
                        self.stdout.write(self.style.WARNING(f'Skipping malformed row: {line}'))
                        continue
                    
                    # Extract and clean matched groups
                    date_str, hours, description = match.groups()
                    date = datetime.strptime(date_str.strip(), "%d/%m/%Y")
                    print(date)
                    hours = float(hours.strip().replace(',', '.'))
                    description = description.strip()

                    # Create and save a new log entry
                    log_entry = log(date=date, hours=hours, description=description)
                    log_entry.save()

                self.stdout.write(self.style.SUCCESS('Successfully imported log data.'))
        
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error importing log data: {e}'))
