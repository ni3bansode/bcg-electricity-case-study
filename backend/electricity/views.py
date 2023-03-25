from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from django.db.models.functions import TruncMonth
from django.db.models import Count
# Create your views here.


class all_requests_view(APIView):
    def get(self, request):
        try:
            ls = []
            statusdata = ConnectionsStatus.objects.select_related(
                'Reviewer_ID').select_related('request_Id').all()
            status_serializer = ConnectionsStatusSerializer(
                statusdata, many=True)

            return Response(status=status.HTTP_200_OK, data={"status": True, "data": status_serializer.data})
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"status": False, "message": "Failed to fetch requests", "error": str(e)})


class update_requests_view(APIView):
    def post(self, request):
        try:
            Applicant_Name = request.data.get('Applicant_Name')
            Gender = request.data.get('Gender')
            District = request.data.get('District')
            State = request.data.get('State')
            Pincode = request.data.get('Pincode')
            Ownership = request.data.get('Ownership')
            Category = request.data.get('Category')
            Load_Applied = request.data.get('Load_Applied')
            Date_of_Approval = request.data.get('Date_of_Approval')
            Modified_Date = request.data.get('Modified_Date')
            Status = request.data.get('Status')
            Reviewer_Name = request.data.get('Reviewer_Name')
            Reviewer_Comments = request.data.get('Reviewer_Comments')
            ID_Number = request.data.get('ID_Number')
            request_Id = request.data.get('request_Id')
            Reviewer_ID = request.data.get('Reviewer_ID')
            try:
                reviewerObj = ReviewerDetails.objects.get(
                    Reviewer_ID=Reviewer_ID)
                reviewerObj.Reviewer_Name = Reviewer_Name
                reviewerObj.Reviewer_Comments = Reviewer_Comments
                reviewerObj.save()

                requestObj = ConnectionsRequest.objects.get(
                    request_Id=request_Id)
                requestObj.Applicant_Name = Applicant_Name
                requestObj.Gender = Gender
                requestObj.District = District
                requestObj.State = State
                requestObj.Pincode = Pincode
                requestObj.Ownership = Ownership
                requestObj.save()

                connObj = ConnectionsStatus.objects.get(ID_Number=ID_Number)
                connObj.Category = Category
                connObj.Load_Applied = Load_Applied
                connObj.Date_of_Approval = Date_of_Approval
                connObj.Modified_Date = Modified_Date
                connObj.Status = Status
                connObj.save()

                return Response(status=status.HTTP_200_OK, data={"status": True})
            except Exception as e:
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"status": False, "message": "Failed to fetch requests", "error": str(e)})

        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"status": False, "message": "Failed to fetch requests", "error": str(e)})


class get_report_data_view(APIView):
    def get(self, request):
        try:
            connObj = ConnectionsStatus.objects.annotate(month=TruncMonth(
                'Date_of_Application')).values('month').annotate(total=Count('ID_Number'))
            pending = ConnectionsStatus.objects.filter(Status="Pending").annotate(month=TruncMonth(
                'Date_of_Application')).values('month').annotate(total=Count('ID_Number'))
            approved = ConnectionsStatus.objects.filter(Status="Approved").annotate(month=TruncMonth(
                'Date_of_Application')).values('month').annotate(total=Count('ID_Number'))
            release = ConnectionsStatus.objects.filter(Status="Connection Released").annotate(month=TruncMonth(
                'Date_of_Application')).values('month').annotate(total=Count('ID_Number'))
            return Response(status=status.HTTP_200_OK, data={"status": True, "data": {"requests": connObj, "pending": pending, "approved": approved, "release": release}})
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={"status": False, "message": "Failed to fetch requests", "error": str(e)})
