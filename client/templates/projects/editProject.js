Template.editProject.events({
    'click #submit-new-project': function (event, template) {
        event.preventDefault();
        var project = {
            _id: this._id,
            owner: Meteor.user()._id,
            title: template.find("input[name=title]").value,
            url: template.find("input[name=url]").value,
            description: template.find("textarea[name=description]").value
        };

        Meteor.call("upsertProject", project);

        //TODO: this architecture is fugly, create a ticket to redo how the project upsert works on the UI
        if (!project._id) {
            //if project is new
            Session.set('isUpsertingProject', false);
        } else {
            Router.go('project', {_id: project._id});
        }
    }
});
