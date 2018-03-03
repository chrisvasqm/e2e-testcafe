pipeline {
  agent any
  stages {
    stage('Initialize') {
      steps {
        echo 'Add Jenkinsfile'
      }
    }
    stage('Tests') {
      parallel {
        stage('Tests') {
          steps {
            echo 'Starting TestCafe tests...'
          }
        }
        stage('Chrome tests') {
          steps {
            sh 'testcafe chrome tests/devto.js'
          }
        }
      }
    }
  }
}