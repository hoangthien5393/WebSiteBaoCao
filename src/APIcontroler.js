const fetch = require("node-fetch");
var axios = require('axios');


exports.getUser = async (credentials, onError) => {
    try {
        var ff = '/api/User/' + credentials.Mode + '/' + credentials.data + '/0';

        const authResponse = await fetch(ff, {
            method: "GET",

        });

        if (authResponse.status == 502) {

            onError("Sai tài khoản hoặc mật khẩu");
        }
        else {

            const responseJSON = await authResponse.json();
            //alert(responseJSON);
            if (authResponse.ok && authResponse.status == 200) {
                if (credentials.password != responseJSON.Password) {
                    onError("Sai tài khoản hoặc mật khẩu");
                }
                else {
                    onError(true);
                }
            }
            else {
                onError("error")
            }
        }

    } catch (error) {
        onError("error")
    }
}

exports.getData = async (credentials, onError) => {
    try {
        var ff = '/api/Data/' + credentials.DateF + '/' + credentials.DateT;
        //alert(ff);
        const authResponse = await fetch(ff, {
            method: "GET",

        });

        if (authResponse.status == 500) {

            onError("error");
        }
        else {

            const responseJSON = await authResponse.json();
            if (authResponse.ok && authResponse.status == 200) {
                //alert(responseJSON.OTTDK)
                onError(responseJSON);
            }
            else
            onError("error");
        }

    } catch (error) {
        onError("error")
    }
}
