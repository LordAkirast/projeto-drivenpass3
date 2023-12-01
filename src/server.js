"use strict";
exports.__esModule = true;
var app_1 = require("@/app");
var port = +process.env.PORT || 4000;
app_1.init().then(function () {
    app_1["default"].listen(port, function () {
        /* eslint-disable-next-line no-console */
        console.log("Server is listening on port " + port + ".");
    });
});
