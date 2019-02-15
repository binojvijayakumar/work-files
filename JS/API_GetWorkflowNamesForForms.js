//Requested by Surjith 

// var resp = { "$id": "1", "Id": 12, "IsDeleted": false, "isArchived": false, "Name": "Dev Control WF", "SiteUrl": "https://deloittetaxportal.sharepoint.com/sites/appcatalog ", "ListName": "Documents", "ListID": 0, "TmpDataIds": [{ "$id": "2", "TmpId": 2, "JurID": 2 }, { "$id": "3", "TmpId": 2, "JurID": 3 }], "Surveys": [], "Milestones": [{ "$id": "4", "Id": 5, "IsDeleted": false, "Name": "System Milestone", "IsApplicable": false, "Status": null, "StartDate": "0001-01-01T00:00:00", "DueDate": "0001-01-01T00:00:00", "Steps": [{ "$id": "5", "Id": 13, "WFInstaceDefinationId": 0, "IsDeleted": false, "Name": "T1", "Status": null, "StartDate": "0001-01-01T00:00:00", "SeqNumber": "1.00", "DueDate": "0001-01-01T00:00:00", "DoSendEmail": false, "DoDocument": false, "DoSendEmailDisplay": 1, "DoDocumentDisplay": 1, "RoleColumn": "Preparer", "IsRoleRequired": false, "IsApplicable": false, "EmailInfo": { "$id": "6", "To": "", "CC": "", "Subject": "[%Task%]-[%TaxYear%]-[%Obligation%]", "Body": "The following Task has been assigned to you and added to your Task List.<br/>Task Name: [%Task%]<br/>Location: [%Jurisdiction%]<br/>Item Name: [%Obligation%]<br/>Due Date: [%DueDate%]<br/>" }, "Weight": "34", "Duedateoffset": 3, "AssignedTo": null, "SOX": null, "ControlID": null, "ProcessStepName": "", "TypeOfProcessStep": "", "ProcessStepOrder": "1.00", "TypeOfTask": "Task", "AdditionalInformation": "", "Checklist": "{\r\n  \"root\": \"\"\r\n}", "ContentTypeId": 1, "ActionId": 0, "Description": "T1", "ActualEndDate": "0001-01-01T00:00:00", "RoleType": 0, "Forms": [], "Reports": [] }, { "$id": "7", "Id": 14, "WFInstaceDefinationId": 0, "IsDeleted": false, "Name": "T2", "Status": null, "StartDate": "0001-01-01T00:00:00", "SeqNumber": "2.00", "DueDate": "0001-01-01T00:00:00", "DoSendEmail": false, "DoDocument": false, "DoSendEmailDisplay": 1, "DoDocumentDisplay": 1, "RoleColumn": "test", "IsRoleRequired": false, "IsApplicable": false, "EmailInfo": { "$id": "8", "To": "", "CC": "", "Subject": "[%Task%]-[%TaxYear%]-[%Obligation%]", "Body": "The following Task has been assigned to you and added to your Task List.<br/>Task Name: [%Task%]<br/>Location: [%Jurisdiction%]<br/>Item Name: [%Obligation%]<br/>Due Date: [%DueDate%]<br/>" }, "Weight": "33", "Duedateoffset": 5, "AssignedTo": null, "SOX": null, "ControlID": null, "ProcessStepName": "", "TypeOfProcessStep": "", "ProcessStepOrder": "1.00", "TypeOfTask": "Task", "AdditionalInformation": "", "Checklist": "{\r\n  \"root\": \"\"\r\n}", "ContentTypeId": 1, "ActionId": 0, "Description": "T2", "ActualEndDate": "0001-01-01T00:00:00", "RoleType": 0, "Forms": [], "Reports": [] }, { "$id": "9", "Id": 15, "WFInstaceDefinationId": 0, "IsDeleted": false, "Name": "T3", "Status": null, "StartDate": "0001-01-01T00:00:00", "SeqNumber": "3.00", "DueDate": "0001-01-01T00:00:00", "DoSendEmail": false, "DoDocument": false, "DoSendEmailDisplay": 1, "DoDocumentDisplay": 1, "RoleColumn": "Preparer", "IsRoleRequired": false, "IsApplicable": false, "EmailInfo": { "$id": "10", "To": "", "CC": "", "Subject": "[%Task%]-[%TaxYear%]-[%Obligation%]", "Body": "The following Task has been assigned to you and added to your Task List.<br/>Task Name: [%Task%]<br/>Location: [%Jurisdiction%]<br/>Item Name: [%Obligation%]<br/>Due Date: [%DueDate%]<br/>" }, "Weight": "33", "Duedateoffset": 7, "AssignedTo": null, "SOX": null, "ControlID": null, "ProcessStepName": "", "TypeOfProcessStep": "", "ProcessStepOrder": "1.00", "TypeOfTask": "Task", "AdditionalInformation": "", "Checklist": "{\r\n  \"root\": \"\"\r\n}", "ContentTypeId": 1, "ActionId": 0, "Description": "T3", "ActualEndDate": "0001-01-01T00:00:00", "RoleType": 0, "Forms": [{ "Id": 1, "Value": "Form-Name" }, { "Id": 2, "Value": "Form-Name-Two" }], "Reports": [] }] }], "AssociatedContentTypes": [], "AssociatedMasterObligations": [], "WorkflowRoles": [{ "$id": "11", "ID": 0, "RoleName": "Preparer", "TmpID": 0, "BusinessUnitsID": 0, "JurisdictionID": 0, "isActive": false, "TaxMegaProcessName": null, "BussinessUnitName": null, "Jurisdiction": null, "CurrentUserID": 0, "isRequired": false, "DateModified": "0001-01-01T00:00:00", "ModifiedBy": null, "DC_ID": 0, "AssignedTo": null }, { "$id": "12", "ID": 0, "RoleName": "test", "TmpID": 0, "BusinessUnitsID": 0, "JurisdictionID": 0, "isActive": false, "TaxMegaProcessName": null, "BussinessUnitName": null, "Jurisdiction": null, "CurrentUserID": 0, "isRequired": false, "DateModified": "0001-01-01T00:00:00", "ModifiedBy": null, "DC_ID": 0, "AssignedTo": null }], "StartDate": null, "EndDate": "0001-01-01T00:00:00", "DueDate": null, "InternalDueDate": null, "Status": null, "Type": null, "LegalEntity": null, "FiscalYear": null, "ItemName": null, "CreatedBy": null, "Progress": 0, "instanceCount": 0, "ModifiedBy": null, "ModifiedDate": null, "Period": null, "SkipControlSteps": false, "ValidateRNotesTaskLevel": false };

function process_api_getWorkflowNames(outputCtrl) {
    apiresponse = latest_getAPIResponse;
    var result = [];
    if (!apiresponse
        || !apiresponse.Milestones || !apiresponse.Milestones.length
        // || !apiresponse.Milestones[0].Steps || !apiresponse.Milestones[0].Steps.length
        || !outputCtrl || outputCtrl.split('_').length !== 3)
        return;
    var i = 0;
    $.each(apiresponse.Milestones, function (milestoneIndex, milestone) {
        $.each(milestone.Steps, function (stepIndex, step) {
            if (!step.Forms.length) {
                result[i] = JSON.parse(JSON.stringify(step));
                result[i].FormName = '';
                result[i].FormID = '';
            }
            else {
                for (var j = 0; j < step.Forms.length; j++) {
                    result[i + j] = JSON.parse(JSON.stringify(step));
                    result[i + j].FormName = (step.Forms[j] && step.Forms[j].value) || '';
                    result[i + j].FormID = (step.Forms[j] && step.Forms[j].ID) || '';
                }
            }
            i++;
        });
    });
    var stringResult = JSON.stringify(result);
    $('#' + outputCtrl).val(stringResult);
    textBoxChangeEvent(outputCtrl, $('#' + outputCtrl).attr('name'), stringResult, '', '');
}

// $(function () {
//     $('#txt').text(JSON.stringify(resp));
//     process_api_getWorkflowNames($('#txt').text(), 'txt');
// });