# Stock Ticker Microservices

A high-performance stock tracking application utilizing Go, Python, and Node.js microservices. This app fetches stock data, logs it, and sends periodic email notifications to users.

## Features
- **User Authentication**: Fast and secure user login with Go.
- **Stock Data Fetching**: Python-based REST API fetching stock data with GCP-managed Redis for performance optimization.
- **Periodic Email Notifications**: Asynchronous periodic email notifications using GCP Pub/Sub and Node.js.
- **Microservices Architecture**: Dockerized microservices with NGINX reverse proxy for seamless communication.

## Technologies Used
- **Backend**: Go, Python, Node.js
- **Database**: MongoDB, MySQL, Redis
- **Cloud**: Google Cloud Platform (GCP), Pub/Sub
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions, Cloud Build

## How to Run Locally
1. Clone the repository:
    ```bash
    git clone https://github.com/NarmalaSk/StockTickerMicroServices.git
    cd StockTickerMicroServices
    ```

2. Build and run Docker containers:
    ```bash
    docker-compose up --build
    ```

3. Access the app at `http://localhost:80`

## Setup Instructions for Cloud Build and GitHub Actions
- Make sure to configure your cloud environment and set up the necessary environment variables.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
