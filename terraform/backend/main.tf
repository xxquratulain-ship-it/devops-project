provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "tfstate" {
  bucket        = "devops-tfstate-851166493911"
  force_destroy = true
}

resource "aws_s3_bucket_versioning" "tfstate_ver" {
  bucket = aws_s3_bucket.tfstate.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_dynamodb_table" "tf_locks" {
  name         = "devops-tf-locks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
