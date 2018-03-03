pipeline {
  agent any
  stages {
    stage('Initialize') {
      steps {
        echo 'Add Jenkinsfile'
      }
    }
    stage('Browsers tests') {
      steps {
        sh 'testcafe chrome,firefox,safari tests/devto.js'
      }
    }
  }
}