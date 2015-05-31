const assign = require('object-assign');

const PowerestDispatcher = require('../dispatcher/PowerestDispatcher');
const EventEmitter = require('events').EventEmitter;
const ActionConstants = require('./Constants');
const Action = require('./Action');

const CHANGE_EVENT = 'change';

let _items = {}; // action holder

function create(action) {
    _items[action.getId()] = action;
}

function destroy(actionId) {
    delete _items[actionId];
}

function markCompleted(actionId) {
    _items[actionId].finish();
}

function markFailed(actionId) {
    _items[actionId].fail();
}


var ActionStore = assign({}, EventEmitter.prototype, {
    getAll() {
        return _items;
    },

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    create(message) {
        create(message);
        this.emitChange();
    },

    destroy(actionId) {
        destroy(actionId);
        this.emitChange();
    },

    markCompleted(actionId) {
        markCompleted(actionId);
        this.emitChange();
    },

    markFailed(actionId) {
        markFailed(actionId);
        this.emitChange();
    },

    dispatcherIndex: PowerestDispatcher.register((action) => {
        switch (action.actionType) {
            case ActionConstants.ACTION_CREATE:
                ActionStore.create(action.action);
                break;

            case ActionConstants.ACTION_FINISH:
                ActionStore.markCompleted(action.actionId);
                break;

            case ActionConstants.ACTION_FAIL:
                ActionStore.markFailed(action.actionId);
                break;
        }

        return true; // No errors. Needed by promise in Dispatcher.
    })

});

module.exports = ActionStore;
