Accounts.emailTemplates.siteName = "StartupTrax";

Accounts.emailTemplates.from = "StartupTrax Admin <support@startuptrax.com>";

Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Message for " + user.profile.displayName;
};

Accounts.emailTemplates.resetPassword.text = function (user, url) {
    var signature = "StartupTrax Admin";
    //var president = President.findOne();
    //if (president)
    //    president = Meteor.users.findOne(president.presidentId);
    //    signature = president.profile.displayName + ", the MySite President.";

    return "Hi " + user.profile.displayName + "!\n\n" +
        "Click the following link to set your new password:\n" +
        url + "\n\n" +
        "Cheers,\n" +
        signature;
};
