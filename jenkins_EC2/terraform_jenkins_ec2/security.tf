############################
##     Security group     ##
############################

resource "aws_security_group" "jenkins" {
  name        = "SC-Jenkins"
  description = "Allow SSH to the Jenkins instance from my IP"
  vpc_id      = var.vpc_id

  ingress {
    description = "SSH from my IP"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.my_ip_cidr]
  }

  ingress {
    description = "Allow HTTP access to Jenkins from my IP"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = [var.my_ip_cidr]
  }

  ingress {
    description = "React app from my IP"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = [var.my_ip_cidr]
  }

  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "SC-Jenkins"
  }
}


############################
##        Key pair        ## 
############################

resource "tls_private_key" "jenkins" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "jenkins" {
  key_name   = "EC2-key"
  public_key = tls_private_key.jenkins.public_key_openssh
}

# Saves the private key next to .tf files as jenkins-key.pem
resource "local_sensitive_file" "jenkins_pem" {
  content         = tls_private_key.jenkins.private_key_pem
  filename        = "${path.module}/EC2-key.pem"
  file_permission = "0400"
}
