terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket         = "devops-tfstate-851166493911"
    key            = "devops/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "devops-tf-locks"
  }
}
provider "aws" {
  region = "us-east-1"
}
