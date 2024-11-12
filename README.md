
# Work Hours Tracker

This is a web application for tracking work hours, built with a Django backend and a React frontend. The app provides an interface to log work entries, displaying them in a dashboard with a bar chart and a list view.

## Features

- **Dashboard**: Shows a bar chart of the total worked hours per day for a selected month.
- **Work Log Form**: Allows users to enter new work log entries, including the date, hours worked, and a description of the work.
- **Log Entries List**: Displays all log entries for the selected month in a scrollable list.

## Project Structure

- **Backend**: A Django project that provides a REST API for managing work logs.
  - `log` app: Handles all work log-related operations, including storing logs with fields for date, hours, and a description.
- **Frontend**: A React app that provides a dashboard interface to view and add log entries.

## Getting Started

### Prerequisites

- **Python 3** and **pip**
- **Node.js** and **npm**
- **Django** and **React**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rutgerfrans/work-log.git
   cd work-log
   ```

2. **Backend Setup**

   - Navigate to the `backend` directory:

     ```bash
     cd backend
     ```

   - Create and activate a virtual environment:

     ```bash
     cd scripts
     chmod +x setup_env.sh
     ./setup_env.sh
     source ../env/bin/activate
     ```

   - Run migrations:

     ```bash
     python manage.py migrate
     ```

   - Start the Django server:

     ```bash
     python manage.py runserver
     ```

3. **Frontend Setup**

   - Open a new terminal, navigate to the `frontend` directory:

     ```bash
     cd frontend
     ```

   - Install frontend dependencies:

     ```bash
     npm install
     ```

   - Start the React development server:

     ```bash
     npm run start
     ```

### Configuration

- Ensure that the frontend app (`localhost:3000`) has permission to access the Django backend (`localhost:8000`). You may need to enable CORS in Django settings:

  ```python
  # backend/settings.py
  INSTALLED_APPS = [
      ...,
      'corsheaders',
      ...
  ]

  MIDDLEWARE = [
      'corsheaders.middleware.CorsMiddleware',
      ...
  ]

  CORS_ALLOWED_ORIGINS = [
      "http://localhost:3000",
  ]
  ```

## Usage

1. Go to `http://localhost:3000` in your browser to access the frontend.
2. Use the "Add Log Entry" form to enter new work logs.
3. View the "Overview" section for a bar chart visualization of hours worked in the selected month.
4. Scroll down to see a list of all log entries for that month.

## Technologies Used

- **Backend**: Django, Django REST framework
- **Frontend**: React, Chart.js for the bar chart
- **Database**: SQLite (default, can be changed to another database in Django settings)

## To do

- Refresh log list when adding a new log entry.
- When refreshing the page the month switches to most recent one, we want to stay at the same month before refreshing.
- When adding a new log on the same day, the bar chart fucksup. Make sure this gets handled correctly.
- Adding "generate invoice" button.
- Refactor log list, mainly gui. Add delete, and edit button
- Log in system. 
- Create local server to run this app on.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Chart.js for the data visualization
- Django REST framework for backend API support
