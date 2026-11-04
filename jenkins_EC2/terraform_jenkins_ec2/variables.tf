############################
##        Variables       ##
############################

variable "aws_region" {
    description = "The AWS region to deploy the EC2 instance"
    type        = string
    default     = "eu-west-3"
}

variable "public_subnet_id" {
    description = "ID of the PUBLIC subnet in test-VPC (subnet-xxxxxxxx)"
    type        = string
}

variable "vpc_id" {
  description = "ID of test-VPC"
  type        = string
  default     = "vpc-07e484e8f026ec317"
}

variable "instance_ami" {
    description = "The AMI ID to use for the EC2 instance"
    type        = string
    default     = "ami-001b955040bc46321" # Ubuntu Server 24.04 LTS (HVM), SSD Volume Type
}

variable "instance_type" {
    description = "The type of instance to use"
    type        = string
    default     = "c7i-flex.large"
}

variable "my_ip_cidr" {
  description = "the public IP in CIDR form, allowed to SSH"
  type        = string
}
