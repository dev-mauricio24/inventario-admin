pipeline {
  agent any

  environment {
    IMAGE_NAME = 'inventario-admin'
    CONTAINER_NAME = 'inventario-app'
    PORT = '3000'
  }

  stages {
    stage('Clonar código') {
      steps {
        git url: 'https://github.com/dev-mauricio24/inventario-admin.git', branch: 'main'
      }
    }

    stage('Construir imagen Docker') {
      steps {
        bat 'docker build -t $IMAGE_NAME .'
      }
    }

    stage('Desplegar contenedor') {
      steps {
        bat '''
          docker stop $CONTAINER_NAME || true
          docker rm $CONTAINER_NAME || true
          docker run -d \
            --name $CONTAINER_NAME \
            --network jenkins \
            -p $PORT:$PORT \
            $IMAGE_NAME
        '''
      }
    }
  }

  post {
    success {
      echo '✅ Despliegue exitoso con Docker'
    }
    failure {
      echo '❌ Error en el pipeline'
    }
  }
}
