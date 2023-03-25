from rest_framework import serializers
from .models import *


class ConnectionsRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConnectionsRequest
        # fields = '__all__'
        fields = ('request_Id', 'Applicant_Name', 'Gender', 'District',
                  'State', 'Pincode', 'Ownership', 'GovtID_Type')


class ReviewerDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewerDetails
        fields = ('Reviewer_ID', 'Reviewer_Name', 'Reviewer_Comments')


class ConnectionsStatusSerializer(serializers.ModelSerializer):
    reviewer = ReviewerDetailsSerializer(
        many=False, read_only=True, source='Reviewer_ID')
    requests = ConnectionsRequestSerializer(
        many=False, read_only=True, source='request_Id')

    class Meta:
        model = ConnectionsStatus
        fields = ('ID_Number', 'Category', 'Load_Applied', 'Date_of_Application',
                  'Date_of_Approval', 'Modified_Date', 'Status', 'reviewer', 'requests')
