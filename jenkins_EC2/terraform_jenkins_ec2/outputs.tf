############################
##        Outputs         ##
############################

output "public_ip" {
  description = "Public IP of the Jenkins EC2 instance"  
  value = aws_instance.jenkins.public_ip
}

output "ssh_command" {
  description = "SSH command to connect to the Jenkins EC2 instance"
  value       = "ssh -i EC2-key.pem ubuntu@${aws_instance.jenkins.public_ip}"
}
