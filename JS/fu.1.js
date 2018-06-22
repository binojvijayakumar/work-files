function uploadFile(fileContent, fileName, metaData, metaDataCollection, jurID, taxProcID, targetUrl, serverRelativeUrl, libraryName, libraryInternalName, loginUserName, uploadServiceAPIUrl, statusCtrl) {
    var file = getFile(fileContent, fileName);
    var documentEntity = getDocumentEntity(metaDataCollection, jurID, taxProcID, fileName);
    var messagedata = getMessagedata(targetUrl, serverRelativeUrl, libraryName, libraryInternalName, loginUserName, uploadServiceAPIUrl);

    var data = new FormData();
    data.append('uploadedFile', file, fileName);
    data.append('newdocumentname', fileName);
    data.append('metadata', metaData);
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
        if (statusCtrl && statusCtrl.split('_').length == 3 && objXhr.readyState === XMLHttpRequest.DONE) {
            $('#' + statusCtrl).val(objXhr.status);
            textBoxChangeEvent(statusCtrl, $('#' + statusCtrl).attr('name'), objXhr.status, '', '');
        }
    };
    objXhr.withCredentials = true;
    objXhr.send(data);
}

function getFile(dataURI, fileName) {
    var byteString = atob(dataURI);
    var mimeString = mime.getType(fileName)
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {
        type: mimeString
    });
    return blob;
}

function getDocumentEntity(metaDataCollection, jurID, taxProcID, fileName) {
    var documentEntity = {
        "JurID": jurID, //"5",
        "TMPID": taxProcID, //"5",
        "Name": fileName, //"corp_val.txt",
        "IsEUC": /^(.*\.((xls|xlsx)$))[^.]*$/gi.test(fileName.trim()),
        "IsPublished": false,
        "IsOriginal": false,
        "MonitoredFolderID": -1,
        "MetadataCollection": JSON.parse(metaDataCollection)
    };
    return JSON.stringify(documentEntity);
}

function getMessagedata(targetUrl, serverRelativeUrl, libraryName, libraryInternalName, loginUserName, uploadServiceAPIUrl) {
    var messagedata = new Object();
    messagedata.targetUrl = targetUrl; //'https://qa4.taxportal.tax/taxsites/WTHD/CCB';
    messagedata.serverRelativeUrl = serverRelativeUrl; //'/taxsites/WTHD/CCB';
    messagedata.libraryName = libraryName; //'Documents';
    messagedata.libraryInternalName = libraryInternalName; //'Shared Documents';
    messagedata.loginUserName = loginUserName; //'i:0#.w|taxcloud\\ankushbhatia';
    messagedata.uploadServiceAPIUrl = uploadServiceAPIUrl; //'https://qa4svc.apps.tax/api/Documents/Upload/1';
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