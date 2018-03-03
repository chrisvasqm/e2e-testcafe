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
        stage('Firefox tests') {
          steps {
            sh 'testcafe firefox tests/devto.js'
          }
        }
        stage('Safari tests') {
          steps {
            sh 'testcafe safari tests/devto.js'
          }
        }
      }
    }
  }
}