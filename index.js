'use strict';

const O = require('output-manager');

__IS_TRACE = process.env.DO_TRACE || false;
__IS_DEBUG = process.env.DO_DEBUG || false;

if (__IS_DEBUG || __IS_TRACE) {
    O.level(((__IS_TRACE) ? O.LogLevel.TRACE : O.LogLevel.DEBUG));
}

const __serverPort = process.env.PORT || 8888;

connectionParams = require('./paramLoader')();
O.d("connectionParams: " + JSON.stringify(connectionParams));

const CF = require('js-cfclient');
const CfClient = new CF.CFClient(new CF.CFConfig({
    protocol: connectionParams.protocol,
    host: connectionParams.host,
    username: connectionParams.username,
    password: connectionParams.password,
    skipSslValidation: connectionParams.skipSSLValidation
}));

CfClient.connect().then(() => {
    require('./server').start(__serverPort, CfClient);
}, O.e);
