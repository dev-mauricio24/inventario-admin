pipeline {
  agent any

  environment {
    IMAGE_NAME = 'inventario-admin'
    COMPOSE_PROJECT_NAME = 'inventario-app'
    PORT = '3000'
  }

  stages {
    stage('Clonar código') {
      steps {
        git url: 'https://github.com/dev-mauricio24/inventario-admin.git', branch: 'main'
      }
    }

    stage('Construir y desplegar con Docker Compose') {
      steps {
        bat '''
          @echo off
          :: Stop and remove existing containers
          docker-compose down
          
          :: Build and start services using docker-compose
          docker-compose up -d --build
        '''
      }
    }
  }

  post {
    success {
      echo '✅ Despliegue exitoso con Docker Compose'
    }
    failure {
      echo '❌ Error en el pipeline'
      bat 'docker-compose down'
    }
    always {
      echo 'Pipeline finalizado'
    }
  }
}