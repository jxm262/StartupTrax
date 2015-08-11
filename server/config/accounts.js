// Set up login services

if ( Meteor.isServer ) {
    Meteor.startup(function () {
        process.env.MAIL_URL=Meteor.properties.MAIL_URL;
    });
}


Meteor.startup(function() {


  // Add Facebook configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "facebook" },
    { $set: {
        appId: "XXXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */

  // Add GitHub configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "github" },
    { $set: {
        clientId: "XXXXXXXXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */

  // Add Google configuration entry
  //ServiceConfiguration.configurations.update(
  //  { service: "google" },
  //  { $set: {
  //      clientId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  //      client_email: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  //      secret: "XXXXXXXXXXXXXXXXXXXXXXXX"
  //    }
  //  },
  //  { upsert: true }
  //);

  //ServiceConfiguration.configurations.update(
  //  { service: "github" },
  //  { $set: {
  //      clientId: "dfbdfc7cf7c359685ad3",
  //      secret: "7abb8b0d3b3cbf55c5b7ead8d670401a230d0a2c"
  //    }
  //  },
  //  { upsert: true }
  //);

  // Add Linkedin configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "linkedin" },
    { $set: {
        clientId: "XXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */
});
