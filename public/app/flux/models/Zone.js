var GenericRecord = require('./GenericRecord');
var SoaRecord = require('./SoaRecord');

class GenericZone {
    constructor(apiResponse) {
        this.id = apiResponse.id;
        this.name = apiResponse.name;
        this.kind = apiResponse.kind;

        this.dnssec = apiResponse.dnssec;
        this.account = apiResponse.account;
        this.serial = apiResponse.serial;
        this.notifiedSerial = apiResponse.notified_serial;
        this.records = apiResponse.records;
        this.comments = apiResponse.comments;

        this.records = this._parseRecords(this.records);
    }

    _parseRecords(apiRecords) {
        return _.map(apiRecords, apiRecord => {
            if (apiRecord.type.toLowerCase() === 'soa') {
                return new SoaRecord(apiRecord);
            } else {
                return new GenericRecord(apiRecord);
            }
        });
    }
}

module.exports = GenericZone;
