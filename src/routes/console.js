module.exports = function customCommands(bob) {
  bob.register("marley", function() {

  });

  bob.register("registration", function() {
    console.log("Simple method of registering custom commands");
  });

  bob.register({
    name: "flexi",
    description: "More flexible way to register custom commands",
    executeOnAppRootOnly: false,
    handler: function(/*arguments, options*/) {
      console.log("Register another custom command");
    },
    options: {
      version: { type: "string", "short": "v" },
    }
  });
};
