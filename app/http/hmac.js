import settings from '../config/settings';
import CryptoJS from 'crypto-js';

const hmacSigningHandler = (request) => {

    let method = request.method;
    let uri = request.url;
    let sentAt = new Date().toGMTString();
    //let contentMD5hash = (request.data) ? CryptoJS.MD5(request.data) : '';
    // let contentMD5hashBase64 = CryptoJS
    //     .enc
    //     .Base64
    //     .stringify(contentMD5hash);

    let hashContent = `${uri}_${method}_${sentAt}`;

    let hash = CryptoJS.HmacSHA256(hashContent, settings.loanManagementApi.publicKey);
    let hashBase64 = CryptoJS
        .enc
        .Base64
        .stringify(hash);

    let headers = {
        date: sentAt,
        HMACHash: hashBase64
        //contentMD5: contentMD5hashBase64
    };

    return headers;
};

export default hmacSigningHandler
