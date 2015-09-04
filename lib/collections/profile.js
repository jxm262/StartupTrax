//Profile = new Mongo.Collection('profile');

Meteor.methods({
    userExists: function (userName) {
        return !!Meteor.users.findOne({
            'profile.displayNameLower': userName.toLowerCase()
        });
    },
    updateProfile: function (profile, cb) {
        Meteor.users.update(
            { _id: Meteor.userId()},
            { $set: {profile: profile}},
            cb
        );
    }
});
