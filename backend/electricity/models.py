from django.db import models


class ConnectionsRequest(models.Model):
    request_Id = models.AutoField(primary_key=True)
    Applicant_Name = models.CharField(max_length=30)
    Gender = models.CharField(max_length=20)
    District = models.CharField(max_length=200)
    State = models.CharField(max_length=200)
    Pincode = models.IntegerField()
    Ownership = models.CharField(max_length=50)
    GovtID_Type = models.CharField(max_length=50)


class ReviewerDetails(models.Model):
    Reviewer_ID = models.AutoField(primary_key=True)
    Reviewer_Name = models.CharField(max_length=200)
    Reviewer_Comments = models.TextField(max_length=500)


class ConnectionsStatus(models.Model):
    ID_Number = models.AutoField(primary_key=True)
    request_Id = models.ForeignKey(
        to=ConnectionsRequest, on_delete=models.CASCADE)
    Reviewer_ID = models.ForeignKey(
        to=ReviewerDetails, on_delete=models.CASCADE)
    Category = models.CharField(max_length=30)
    Load_Applied = models.IntegerField()
    Date_of_Application = models.DateTimeField()
    Date_of_Approval = models.DateTimeField(null=True, blank=True)
    Modified_Date = models.DateTimeField(null=True, blank=True)
    Status = models.CharField(max_length=50)
