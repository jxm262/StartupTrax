Projects = new Mongo.Collection('projects');

Meteor.methods({
    upsertProject: function (project) {
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        console.log('upserting proje', project);
        Projects.upsert({_id: project._id}, project);
    }
});

//Projects.allow({
//    update: function (userId, doc) {
//        return true;
//    }
//});
