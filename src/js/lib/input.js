    Key = {

        _pressed: {},
        _released: {},

        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SPACE: 32,
        a: 65,
        w: 87,
        s: 83,
        d: 68,
        z: 90,
        x: 88,
        f: 70,
        p: 80,
        r: 82,

        isDown(keyCode) {
            return this._pressed[keyCode];
        },

        justReleased(keyCode) {
            return this._released[keyCode];
        },

        onKeydown(event) {
            this._pressed[event.keyCode] = true;
        },

        onKeyup(event) {
            this._released[event.keyCode] = true;
            delete this._pressed[event.keyCode];

        },

        update() {
            this._released = {};
        }
    };
