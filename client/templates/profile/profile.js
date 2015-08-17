//Profile Template State
//Template.profile.created = function () {
//    this.state = new ReactiveDict();
//    this.state.set('isAddingProject', false);
//};

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

Template.projectList.helpers({
    isAddingProject: function () {
        var m = Session.get('isAddingProject');
        console.log('calling isAddingProject', Session.get('isAddingProject'));
        console.log('m', m);
        return m;
        //console.log('....', Template.instance().state.get('isAddingProject'));
        //return Template.instance().state.get('isAddingProject');
    }
});



Template.addProject.events({
    'click #submit-new-project': function (event, template) {
        event.preventDefault();
        var project = {
            owner: Meteor.user().profile.displayName,
            title: template.find("input[name=title]").value,
            url: template.find("input[name=url]").value,
            description: template.find("textarea[name=description]").value
        };

        Meteor.call("addProject", project);
    }
});


Template.profile.events({
    'click #add-project-btn': function () {
        console.log('clicked..');
        Session.set('isAddingProject', true);
        //Template.instance().state.set('isAddingProject', true);
    }
});


//displayName: getEl("displayName"),
//    tagLine: getEl("tagLine"),
//    myInterests: getEl("myInterests"),
//    lookingFor: getEl("lookingFor"),
//    iCanDo: getEl("iCanDo"),
//    pastProjects: getEl("pastProjects"),
//    availableTimesLocations: getEl("availableTimesLocations")
