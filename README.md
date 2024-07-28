# News Aggregator

This project is a news aggregator application built with React. It uses Docker for containerization and Nginx to serve the built application.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/news-aggregator.git
cd news-aggregator

Create a .env file in the root directory of the project with the following content:
REACT_APP_NEWS_API_KEY=your_news_api_key
REACT_APP_GUARDIAN_API_KEY=your_guardian_api_key
REACT_APP_NYTIMES_API_KEY=your_nytimes_api_key

```


### Build and Run the Application with Docker

```bash
docker-compose up --build

```

The application will be available at http://localhost:3000
