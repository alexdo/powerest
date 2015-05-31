const ActionConstants = require('./Constants');

class Action {
    static create(message) {
        let action = new Action();
        action.message = message;

        return action;
    }

    constructor() {
        this.status = ActionConstants.NEW;
        this.id = _.uniqueId('action_');
    }

    finish() {
        this.status = ActionConstants.DONE;
    }

    fail() {
        this.status = ActionConstants.ERROR;
    }

    hasFailed() {
        return this.status === ActionConstants.ERROR;
    }

    hasSucceeded() {
        return this.status === ActionConstants.DONE;
    }

    getStatus() {
        return this.status;
    }

    getId() {
        return this.id;
    }

    getMessage() {
        return this.message;
    }

    setMessage(newMsg) {
        this.message = newMsg;
    }
}

module.exports = Action;
