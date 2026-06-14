pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }
        stage('Build Backend') {
            steps {
                echo 'Building backend Docker image...'
                sh 'docker build -t taskflow-backend:latest ./app/backend'
            }
        }
        stage('Build Frontend') {
            steps {
                echo 'Building frontend Docker image...'
                sh 'docker build -t taskflow-frontend:latest ./app/frontend'
            }
        }
        stage('Security Scan') {
            steps {
                echo 'Running Trivy security scan...'
                sh 'trivy image --severity HIGH,CRITICAL taskflow-backend:latest || true'
                sh 'trivy image --severity HIGH,CRITICAL taskflow-frontend:latest || true'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh 'docker compose down || true'
                sh 'docker compose up -d'
            }
        }
        stage('Verify') {
            steps {
                echo 'Verifying deployment...'
                sh 'docker compose ps'
            }
        }
    }
    post {
        success {
            echo 'Pipeline succeeded! App is running at http://localhost:8090'
        }
        failure {
            echo 'Pipeline failed! Check the logs above.'
        }
    }
}
