from django.contrib import admin
from .models import ReviewerDetails, ConnectionsRequest, ConnectionsStatus
from import_export.admin import ImportExportModelAdmin


class CustomeConnectionsRequest(ImportExportModelAdmin, admin.ModelAdmin):
    model = ConnectionsRequest
    list_display = ['request_Id', 'Applicant_Name', 'Gender',
                    'District', 'State', 'Pincode', 'Ownership', 'GovtID_Type']


class CustomeConnectionsStatus(ImportExportModelAdmin, admin.ModelAdmin):
    model = ConnectionsStatus
    list_display = ['ID_Number', 'request_Id', 'Reviewer_ID',
                    'Category', 'Load_Applied', 'Date_of_Application', 'Date_of_Approval', 'Modified_Date', 'Status']


class CustomeReviewerDetails(ImportExportModelAdmin, admin.ModelAdmin):
    model = ReviewerDetails
    list_display = ['Reviewer_ID', 'Reviewer_Name', 'Reviewer_Comments'
                    ]


admin.site.register(ReviewerDetails, CustomeReviewerDetails)
admin.site.register(ConnectionsRequest, CustomeConnectionsRequest)
admin.site.register(ConnectionsStatus, CustomeConnectionsStatus)
