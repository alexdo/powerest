var _ = require('underscore');

class SoaRecord {
    constructor(apiResponse) {
        this.name = apiResponse.name;
        this.type = apiResponse.type;
        this.ttl = apiResponse.ttl;
        this.disabled = apiResponse.disabled;
        this.content = apiResponse.content;

        this._parseContent();
    }

    _parseContent() {
        var elements = this.content.split(' ');

        this.primaryMaster = elements.shift();
        this.email = SoaRecord.toRealEmail(elements.shift());
        this.serial = parseInt(elements.shift(), 10);
        this.refresh = parseInt(elements.shift(), 10);
        this.retry = parseInt(elements.shift(), 10);
        this.expire = parseInt(elements.shift(), 10);
        this.minTtl = parseInt(elements.shift(), 10);
    }

    toContent() {
        return [
            this.primaryMaster,
            SoaRecord.toSoaEmail(this.email),
            this.serial,
            this.refresh,
            this.retry,
            this.expire,
            this.minTtl
        ].join(' ')
    }

    /**
     *
     * @param soaEmail string
     */
    static toRealEmail(soaEmail) {
        var email = soaEmail;

        // eg. _Pwrst_DOT_1432455514698_137_
        var dotPlaceholder = _.uniqueId('_Pwrst_DOT_' + Date.now() + '_') + '_';

        // first, take all the pre-@ dots and convert them to our dot placeholder
        email = email.replace(/\\./, dotPlaceholder);

        // then, find our first dot and change it into an @ sign
        email = email.replace(/^(.*?)\.(.*)?/g, "$1@$2");

        // finally, substitute all our placeholders with a real dot again
        email = email.replace(new RegExp(dotPlaceholder, 'g'), '.');

        return email;
    }

    /**
     *
     * @param realEmail
     * @returns {string}
     */
    static toSoaEmail(realEmail) {
        // split our mail in two parts, as dots in the host-part are preserved
        var [emailLocal, emailHost] = realEmail.split('@');

        // replace all . in the local part with \.
        emailLocal = emailLocal.replace(/\./g, "\\\\.");

        // join and return
        return [emailLocal, emailHost].join('.');
    }
}

module.exports = SoaRecord;
