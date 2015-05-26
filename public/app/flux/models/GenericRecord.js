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
        return this.content;
    }
}

module.exports = GenericRecord;
