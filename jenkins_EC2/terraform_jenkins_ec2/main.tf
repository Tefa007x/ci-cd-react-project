############################
##      EC2 instance      ##
############################

resource "aws_instance" "jenkins" {
  ami                         = var.instance_ami
  instance_type               = var.instance_type
  subnet_id                   = var.public_subnet_id
  vpc_security_group_ids      = [aws_security_group.jenkins.id]
  key_name                    = aws_key_pair.jenkins.key_name
  associate_public_ip_address = true

  root_block_device {
    volume_size           = 30
    volume_type           = "gp3"
    delete_on_termination = true
  }

  tags = {
    Name = "jenkins"
  }
}
