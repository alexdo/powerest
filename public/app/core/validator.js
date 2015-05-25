var Config = require('../config.js');
var ipaddr = require('ipaddr.js');

class Validator {
    static nameserver(subject) {
        return Validator.domain(subject) || Validator.ip(subject) || Validator.ip6(subject);
    }

    static domain(subject) {
        return !!subject.match(/\..*?\./)
    }

    static ip(subject) {
        return ipaddr.IPv4.isValid(subject);
    }

    static ip6(subject) {
        return ipaddr.IPv6.isValid(subject);
    }

    static email(subject) {
        return subject.match(/@/) && subject.match(/\./)
    }

    static numeric(subject) {
        return !isNaN(subject);
    }
}

module.exports = Validator;
