class GenericRecord {
    constructor(apiResponse) {
        this.name = apiResponse.name;
        this.type = apiResponse.type;
        this.ttl = apiResponse.ttl;
        this.disabled = apiResponse.disabled;
        this.content = apiResponse.content;
        this.priority = apiResponse.priority || null;
    }

    toContent() {
        var content = '';

        if(_.isString(this.type) && this.type.toUpperCase() === 'MX') {
            if(!_.isEmpty(this.priority) && parseInt(this.priority, 10) > 0) {
                content += this.priority + ' ';
            }
        }

        content += this.content;

        return content;
    }
}

module.exports = GenericRecord;
