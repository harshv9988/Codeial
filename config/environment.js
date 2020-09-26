
const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key : 'blahsomething',
    db: 'codeial_development',
    smtp : {
        service : 'gmail',
        host : 'smpt.gmail.com',
        port: 587,
        secure: false,
        auth : {
            user : 'harshv521',
            pass : '***'//hidden for sometime
        }
    },
    google_client_id : "444118020441-dsvdkhhurr1qh5guncmekic6h647g7ha.apps.googleusercontent.com",
    google_client_secret : "EVoeFUxUGtrkhDhlJt8dMsZ4",
    google_call_back_url : "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codeial'
}

const production = {
    name : 'production',
    asset_path : process.env.SOCIALARRAY_ASSET_PATH,
    session_cookie_key : process.env.SOCIALARRAY_SESSION_COOKIE_KEY,
    db: process.env.SOCIALARRAY_DB,
    smtp : {
        service : 'gmail',
        host : 'smpt.gmail.com',
        port: 587,
        secure: false,
        auth : {
            user : process.env.SOCIALARRAY_GMAIL_USERNAME,
            pass : '***'//hidden for sometime
        }
    },
    google_client_id : process.env.SOCIALARRAY_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.SOCIALARRAY_GOOGLE_CLIENT_SECRET,
    google_call_back_url : process.env.SOCIALARRAY_GOOGLE_CALLACK_URL,
    jwt_secret : process.env.SOCIALARRAY_JWT_SECRET
}

module.exports = eval(process.env.SOCIALARRAY_ENVIRONMENT) == undefined ? development : eval(process.env.SOCIALARRAY_ENVIRONMENT);