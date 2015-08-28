Projects = new Mongo.Collection('projects');

Meteor.methods({
    addProject: function (project) {
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Projects.insert(project);
    }
});

//Projects.allow({
//    update: function (userId, doc) {
//        return true;
//    }
//});