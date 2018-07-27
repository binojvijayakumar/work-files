var apiURL = 'http://<DOMAIN>/SPManage/ManageSP.svc/spVal';

CreateTenant('<TenantName>');


function CreateTenant(_tenantName) {
    var spName = 'spI_Tenant';
    var data = [];
    data.push({ 'Key': 'TenantID', 'Value': _tenantName });
    data.push({ 'Key': 'ModuleID', 'Value': _tenantName });
    data.push({ 'Key': 'Version', 'Value': 1 });
    data.push({ 'Key': 'MinorVersion', 'Value': 0 });
    data.push({ 'Key': 'InternalName', 'Value': _tenantName });
    data.push({ 'Key': 'Title', 'Value': _tenantName });
    data.push({ 'Key': 'Description', 'Value': _tenantName });
    data.push({ 'Key': 'IsDisabled', 'Value': 0 });
    data.push({ 'Key': 'Type', 'Value': 'Tenant' });
    data.push({ 'Key': 'ParentID', 'Value': null });
    data.push({ 'Key': 'CreatedBy', 'Value': 'admin' });
    data.push({ 'Key': 'Created', 'Value': new Date().toISOString() });
    data.push({ 'Key': 'ModifiedBy', 'Value': 'admin' });
    data.push({ 'Key': 'Modified', 'Value': new Date().toISOString() });
    data.push({ 'Key': 'FormJSON', 'Value': '' });
    data.push({ 'Key': 'FormDetailsJSON', 'Value': '' });
    data.push({ 'Key': 'RuleJson', 'Value': '' });
    $http({
        method: "post",
        url: apiURL,
        async: true,
        withCredentials: true,
        data: { spName: spName, spVal: data }
    }).then(function success(_response) {
        CreateTenantMapping(_tenantName);
    });
}

function CreateTenantMapping(_tenantName) {
    var spName = 'spI_TenantMapping';
    var data = [];
    data.push({ 'Key': 'TenantID', 'Value': _tenantName });
    data.push({ 'Key': 'TenantUrl', 'Value': 'http://localhost/AppSite/' + _tenantName });
    data.push({ 'Key': 'MetadataSource', 'Value': '' });
    data.push({ 'Key': 'ImageMime', 'Value': '' });
    data.push({ 'Key': 'ImageData', 'Value': null });
    data.push({ 'Key': 'IsDataForm', 'Value': 1 });
    $http({
        method: "post",
        url: apiURL,
        async: true,
        withCredentials: true,
        data: { spName: spName, spVal: data }
    }).then(function success(_response) {
        CreateFileMapping(_tenantName);
    });
}

function guidPart() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function CreateFileMapping(_tenantName) {
    var spName = 'spI_Files';
    var data = [];
    data.push({
        'Key': 'FileID', 'Value': (guidPart() + guidPart() + "-"
            + guidPart() + "-4" + guidPart().substr(0, 3) + "-" + guidPart() + "-"
            + guidPart() + guidPart() + guidPart()).toLowerCase()
    });
    data.push({ 'Key': 'TenantID', 'Value': _tenantName });
    data.push({ 'Key': 'FileName', 'Value': '' });
    data.push({ 'Key': 'Content', 'Value': null });
    data.push({ 'Key': 'Extention', 'Value': 'ico' });
    data.push({ 'Key': 'Size', 'Value': '100' });
    $http({
        method: "post",
        url: apiURL,
        async: true,
        withCredentials: true,
        data: { spName: spName, spVal: data }
    });
}