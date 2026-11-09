pipeline {
    agent any

    environment {
        ANSIBLE_PLAYBOOK  = 'ansible-playbook.yaml'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Hub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_PASS'
                )]) {

                    sh 'echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin'
                }
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                sh 'ansible --version'
                sh 'ansible-playbook "$ANSIBLE_PLAYBOOK"'
            }
        }
    }

    post {
        always {
            // Remove the saved Docker Hub login from the Jenkins server
            sh 'docker logout || true'
        }
        success {
            echo 'Pipeline finished successfully.'
        }
        failure {
            echo 'Pipeline failed. Check the stage logs above.'
        }
    }
}
