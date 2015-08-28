Template.profile.helpers({

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
            owner: Meteor.user()._id,
            title: template.find("input[name=title]").value,
            url: template.find("input[name=url]").value,
            description: template.find("textarea[name=description]").value
        };

        Meteor.call("addProject", project);
    }
});


Template.profile.events({
    'click #add-project-btn': function () {
        Session.set('isAddingProject', true);
        //Template.instance().state.set('isAddingProject', true);
    },
    'click #edit-profile-btn': function () {
        Router.go('profile.edit', {_name: this.name});
    }
});


//displayName: getEl("displayName"),
//    tagLine: getEl("tagLine"),
//    myInterests: getEl("myInterests"),
//    lookingFor: getEl("lookingFor"),
//    iCanDo: getEl("iCanDo"),
//    pastProjects: getEl("pastProjects"),
//    availableTimesLocations: getEl("availableTimesLocations")
