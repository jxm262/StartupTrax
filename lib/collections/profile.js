//Profile = new Mongo.Collection('profile');

Meteor.methods({
    userExists: function (userName) {
        return !!Meteor.users.findOne({
            'profile.displayNameLower': userName.toLowerCase()
        });
    }
});
