Messages = new Meteor.Collection("messages");

if (Meteor.is_client) {
  Template.chat.message = Messages.find();

  Template.chat.displayTime = function(timestamp) {
    if (timestamp === undefined) {
      return "Past";
    } else {
      var d = new Date(timestamp);
      function pad(n){return n<10 ? '0'+n : n};
      return "" + pad(d.getHours()) +
             ":" + pad(d.getMinutes()) +
             ":" + pad(d.getSeconds());
    }
  }

  Template.chat.events = {"DOMNodeInserted": function(evt) {
    // This gets called MANY times, on update, so it's a bit non-optimal.
    // Still, it's the best solution I've found so far :/
    // Meteor.flush();
    // setTimeout(function () {
      $(".chat").scrollTop(100000);
  }};

  Template.input.events = { 'keydown': function (evt) {
        if (evt.which === 13) {
          Messages.insert({name: $("#name_input").val(),
                           text: $("#chat_input").val(),
                           timestamp: (new Date()).getTime()});
          $("#chat_input").val("");
        }
     }
  }


}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // Initial messages here
  });
}
