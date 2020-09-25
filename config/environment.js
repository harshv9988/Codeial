
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
    name : 'production'
}

module.exports = development;