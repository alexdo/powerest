var keyMirror = require('keyMirror');

module.exports = keyMirror({
    // Action state
    NEW: null,
    DONE: null,
    ERROR: null,

    // Component Actions
    ACTION_CREATE: null,
    ACTION_FINISH: null,
    ACTION_FAIL: null
});
