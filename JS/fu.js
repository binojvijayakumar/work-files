function uploadFile() {
    var file = getFile();
    var metadata = getMetadata();
    var documentEntity = getDocumentEntity();
    var messagedata = getMessagedata();

    var data = new FormData();
    data.append('uploadedFile', file);
    data.append('newdocumentname', file.newdocumentname);
    data.append('metadata', metadata);
    data.append('documentEntity', documentEntity);
    data.append('targetUrl', messagedata.targetUrl);
    data.append('serverRelativeUrl', messagedata.serverRelativeUrl);
    data.append('libraryInternalName', messagedata.libraryInternalName);
    data.append('libraryName', messagedata.libraryName);
    data.append('loginUserName', messagedata.loginUserName);
    // data.append('isPublishFromMysite', 'FALSE');
    // data.append('mysiteWebAppUrl', '');
    // data.append('fileServerRelativeUrl', '');
    // data.append('mySiteFileName', '');
    var objXhr = new XMLHttpRequest();
    objXhr.open('POST', messagedata.uploadServiceAPIUrl, true);
    objXhr.onreadystatechange = function () {
        if (objXhr.readyState === XMLHttpRequest.DONE && objXhr.status === 200) {
            console.log(objXhr.responseText);
        }
    };
    objXhr.withCredentials = true;
    objXhr.send(data);
}

function getFile() {
    var file = new File(['Hello World'], "corp_val.txt", {
        type: "text/plain"
    });
    file.newdocumentname = 'corp_val.txt';
    return file;
}

function getMetadata() {

    var testData = '"DocumentFileLeafRef":"corp_val.txt","TrackerName":"test2","TrackerID":"2671","JurisdictionID":"5","TaxProcessID":"5","TaxYearID":"3","EntityID":"P006","EntityName":"CB - Payer 006","LegalEntityID":"P006","LegalEntityIDOptionID":"P006","EntityAcronym":"","TrackerType":"Witholding Return","MasterObligationID":"32","MasterObligation":"1042-S Foreign Persons US Income Subject to Withholing","Period":"Annual","ReturnType":"InformationReturn","ItemOwner":"Praveen Unnikrishnan","TaxProcessName":"Withholding","JurisdictionName":"Commercial and Community Bank","ProjectID":"1","ProjectName":"Secret","BinderSection":"Source Files","BinderTab":"1042-S Text File","DocumentType":"1042-S Text File","ParentEntityName":"NA","EntityAcronymOptionID":"","ParentEntityID":"","TaxYearName":"2017"';
    return testData;
}

function getDocumentEntity() {
    var metadataCollection = [{
        'DC_ID': '3',
        'DisplayName': 'TaxYearName',
        'SPInternalName': 'TaxYearName',
        'value': '2017'
    }, {
        'DC_ID': '504',
        'DisplayName': 'ParentEntityID',
        'SPInternalName': 'ParentEntityID',
        'value': ''
    }, {
        'DC_ID': '53',
        'DisplayName': 'EntityAcronymOptionID',
        'SPInternalName': 'EntityAcronymOptionID',
        'value': ''
    }, {
        'DC_ID': '555',
        'DisplayName': 'ParentEntityName',
        'SPInternalName': 'ParentEntityName',
        'value': 'NA'
    }, {
        'DC_ID': '1570',
        'DisplayName': 'DocumentType',
        'SPInternalName': 'DocumentType',
        'value': '1042-S Text File'
    }, {
        'DC_ID': '90',
        'DisplayName': 'BinderTab',
        'SPInternalName': 'BinderTab',
        'value': '1042-S Text File'
    }, {
        'DC_ID': '89',
        'DisplayName': 'BinderSection',
        'SPInternalName': 'BinderSection',
        'value': 'Source Files'
    }, {
        'DC_ID': '71',
        'DisplayName': 'ProjectName',
        'SPInternalName': 'ProjectName',
        'value': 'Secret'
    }, {
        'DC_ID': '71',
        'DisplayName': 'ProjectID',
        'SPInternalName': 'ProjectID',
        'value': '1'
    }, {
        'DC_ID': '60',
        'DisplayName': 'JurisdictionName',
        'SPInternalName': 'JurisdictionName',
        'value': 'Commercial and Community Bank'
    }, {
        'DC_ID': '4',
        'DisplayName': 'TaxProcessName',
        'SPInternalName': 'TaxProcessName',
        'value': 'Withholding'
    }, {
        'DC_ID': '7',
        'DisplayName': 'ItemOwner',
        'SPInternalName': 'ItemOwner',
        'value': 'Praveen Unnikrishnan'
    }, {
        'DC_ID': '503',
        'DisplayName': 'ReturnType',
        'SPInternalName': 'ReturnType',
        'value': 'InformationReturn'
    }, {
        'DC_ID': '91',
        'DisplayName': 'Period',
        'SPInternalName': 'Period',
        'value': 'Annual'
    }, {
        'DC_ID': '501',
        'DisplayName': 'MasterObligation',
        'SPInternalName': 'MasterObligation',
        'value': '1042-S Foreign Persons US Income Subject to Withholing'
    }, {
        'DC_ID': '501',
        'DisplayName': 'MasterObligationID',
        'SPInternalName': 'MasterObligationID',
        'value': '32'
    }, {
        'DC_ID': '514',
        'DisplayName': 'TrackerType',
        'SPInternalName': 'TrackerType',
        'value': 'Witholding Return'
    }, {
        'DC_ID': '53',
        'DisplayName': 'EntityAcronym',
        'SPInternalName': 'EntityAcronym',
        'value': ''
    }, {
        'DC_ID': '81',
        'DisplayName': 'LegalEntityIDOptionID',
        'SPInternalName': 'LegalEntityIDOptionID',
        'value': 'P006'
    }, {
        'DC_ID': '81',
        'DisplayName': 'LegalEntityID',
        'SPInternalName': 'LegalEntityID',
        'value': 'P006'
    }, {
        'DC_ID': '2',
        'DisplayName': 'EntityName',
        'SPInternalName': 'EntityName',
        'value': 'CB - Payer 006'
    }, {
        'DC_ID': '2',
        'DisplayName': 'EntityID',
        'SPInternalName': 'EntityID',
        'value': 'P006'
    }, {
        'DC_ID': '3',
        'DisplayName': 'TaxYearID',
        'SPInternalName': 'TaxYearID',
        'value': '3'
    }, {
        'DC_ID': '4',
        'DisplayName': 'TaxProcessID',
        'SPInternalName': 'TaxProcessID',
        'value': '5'
    }, {
        'DC_ID': '14',
        'DisplayName': 'JurisdictionID',
        'SPInternalName': 'JurisdictionID',
        'value': '5'
    }, {
        'DC_ID': '72',
        'DisplayName': 'TrackerID',
        'SPInternalName': 'TrackerID',
        'value': '2671'
    }, {
        'DC_ID': '6',
        'DisplayName': 'TrackerName',
        'SPInternalName': 'TrackerName',
        'value': 'test2'
    }];
    var documentEntity = {
        "JurID": "5",
        "TMPID": "5",
        "Name": "corp_val.txt",
        "IsEUC": false,
        "IsPublished": false,
        "IsOriginal": false,
        "MonitoredFolderID": -1,
        "MetadataCollection": metadataCollection
    };
    return JSON.stringify(documentEntity);
}

function getMessagedata() {
    var messagedata = new Object();
    messagedata.targetUrl = 'https://qa4.taxportal.tax/taxsites/WTHD/CCB';
    messagedata.serverRelativeUrl = '/taxsites/WTHD/CCB';
    messagedata.libraryName = 'Documents';
    messagedata.libraryInternalName = 'Shared Documents';
    messagedata.loginUserName = 'i:0#.w|taxcloud\\ankushbhatia';
    messagedata.uploadServiceAPIUrl = 'https://qa4svc.apps.tax/api/Documents/Upload/1';
    return messagedata;
}

(function (exports) {
    if (exports.FormData) {
        // Don't replace FormData if it already exists
        return;
    }
    // Export variable to the global scope
    exports.FormData = FormData;

    var ___send$rw = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function (data) {
        if (data instanceof FormData) {
            if (!data.__endedMultipart) data.__append('--' + data.boundary + '--\r\n');
            data.__endedMultipart = true;
            this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + data.boundary);
            data = new Uint8Array(data.data);
        }
        // Invoke original XHR.send
        return ___send$rw.call(this, data);
    };

    function FormData() {
        // Force a Constructor
        if (!(this instanceof FormData)) return new FormData();
        // Generate a random boundary - This must be unique with respect to the form's contents.
        this.boundary = '------RWWorkerFormDataBoundary' + Math.random().toString(36);
        var internal_data = this.data = [];
        /**
         * Internal method.
         * @param inp String | ArrayBuffer | Uint8Array  Input
         */
        this.__append = function (inp) {
            var i = 0,
                len;
            if (typeof inp == 'string') {
                for (len = inp.length; i < len; ++i)
                    internal_data.push(inp.charCodeAt(i) & 0xff);
            } else if (inp && inp.byteLength) { /*If ArrayBuffer or typed array */
                if (!('byteOffset' in inp)) /* If ArrayBuffer, wrap in view */
                    inp = new Uint8Array(inp);
                for (len = inp.byteLength; i < len; ++i)
                    internal_data.push(inp[i] & 0xff);
            }
        };
    }
    /**
     * @param name     String                                   Key name
     * @param value    String|Blob|File|typed array|ArrayBuffer Value
     * @param filename String                                   Optional File name (when value is not a string).
     **/
    FormData.prototype.append = function (name, value, filename) {
        if (this.__endedMultipart) {
            // Truncate the closing boundary
            this.data.length -= this.boundary.length + 6;
            this.__endedMultipart = false;
        }
        if (arguments.length < 2) {
            throw new SyntaxError('Not enough arguments');
        }
        var part = '--' + this.boundary + '\r\n' +
            'Content-Disposition: form-data; name="' + name + '"';

        if (value instanceof File || value instanceof Blob) {
            return this.append(name,
                new Uint8Array(new FileReaderSync().readAsArrayBuffer(value)),
                filename || value.name);
        } else if (typeof value.byteLength == 'number') {
            // Duck-typed typed array or array buffer
            part += '; filename="' + (filename || 'blob').replace(/"/g, '%22') + '"\r\n';
            part += 'Content-Type: application/octet-stream\r\n\r\n';
            this.__append(part);
            this.__append(value);
            part = '\r\n';
        } else {
            part += '\r\n\r\n' + value + '\r\n';
        }
        this.__append(part);
    };
})(this || self);