Template.profile.helpers({
    user: function () {
        var user = Meteor.user() || {};
        user.profile = user.profile || {};

        return {
            displayName: user.profile.displayName,
            lastOnline: function () {
                var today = Date.now();
                return moment(today).format('MM-DD-YYYY');
            },
            bio: user.profile.bio,
            profileImg: user.profile.image || 'http://placehold.it/100'
        }
    }
});


//displayName: getEl("displayName"),
//    tagLine: getEl("tagLine"),
//    myInterests: getEl("myInterests"),
//    lookingFor: getEl("lookingFor"),
//    iCanDo: getEl("iCanDo"),
//    pastProjects: getEl("pastProjects"),
//    availableTimesLocations: getEl("availableTimesLocations")
