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
        bat 'docker build -t %IMAGE_NAME% .'
      }
    }

    stage('Desplegar contenedor') {
  steps {
    bat '''
      @echo off
      docker stop %CONTAINER_NAME%
      if %ERRORLEVEL% NEQ 0 echo Contenedor no estaba corriendo.
      
      docker rm %CONTAINER_NAME%
      if %ERRORLEVEL% NEQ 0 echo Contenedor no existía.
      
      docker run -d ^
        --name %CONTAINER_NAME% ^
        -p %PORT%:%PORT% ^
        %IMAGE_NAME%
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
