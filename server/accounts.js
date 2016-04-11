ServiceConfiguration.configurations.upsert({
    service: "twitter"
}, {
    $set: {
        consumerKey: "KEY",
        secret: "KEY",
        loginStyle: "popup"
    }
});
