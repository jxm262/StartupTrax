EasySearch.createSearchIndex('users', {
    //NOTE: index all the things!!
    field: [
        'profile.displayName',
        'profile.myInterests',
        'profile.lookingFor',
        'profile.iCanDo',
        'profile.pastProjects'
    ],
    collection: Meteor.users,
    use: 'mongo-db',
    query: function (searchString, opts) {
        // Default query that is used for searching
        var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

        // Make the emails searchable
        //query.$or.push({
        //    //emails: {
        //    //    $elemMatch: {
        //    //        address: { '$regex' : '.*' + searchString + '.*', '$options' : 'i' }
        //    //    }
        //    //}
        //    //profile: {
        //    //    $elemMatch: {
        //    //        displayName: { '$regex' : '.*' + searchString + '.*', '$options' : 'i' }
        //    //    }
        //    //}
        //});

        return query;
    }
});



