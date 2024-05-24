# IEEE-Eureka-CTF

Welcome to the IEEE-Eureka-CTF repository! This project is the website for the IEEE NITK Student Branch Eureka's Capture the Flag (CTF) event.

## Project Structure

### Backend
- **Framework:** Django
- **Database:** PostgreSQL

### Frontend
- **Framework:** Next.js (React)
- **Styling:** CSS

### Hosting
The website was hosted using Microsoft Azure during the CTF event.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/imApoorva36/IEEE-Eureka-CTF.git
   ```
2. **Navigate to the Project Directory**
   ```bash
   cd IEEE-Eureka-CTF
   ```

### Backend Setup
3. **Install Backend Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
4. **Setup PostgreSQL Database**
   - Ensure PostgreSQL is installed and running.
   - Create a database and update the settings in `backend/settings.py`.

5. **Run Backend Server**
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup
6. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```
7. **Run Frontend Server**
   ```bash
   npm run dev
   ```

### Docker Setup
Alternatively, use Docker:
```bash
docker-compose up --build
```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, feel free to open an issue or contact the maintainers directly.

---
