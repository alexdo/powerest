class GenericRecord {
    constructor(apiResponse) {
        this.name = apiResponse.name;
        this.type = apiResponse.type;
        this.ttl = apiResponse.ttl;
        this.disabled = apiResponse.disabled;
        this.content = apiResponse.content;
    }

    toContent() {
        return this.content;
    }
}

module.exports = GenericRecord;
