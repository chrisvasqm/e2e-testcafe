pipeline {
  agent any
  stages {
    stage('Initialize') {
      steps {
        echo 'Add Jenkinsfile'
      }
    }
    stage('Chrome tests') {
      steps {
        sh 'testcafe chrome tests/devto.js'
      }
    }
  }
}