var config = module.exports;

config.server = {
    "port"  : process.env.PORT || 8080,
    "dbServer"  : "mongodb://localhost:27017/emitra",
    "cookieTime" : 1440
};