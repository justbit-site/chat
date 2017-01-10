var messages;

Tracker.autorun(function() {
    messages = Meteor.subscribe('messages');
});

Template.Chat.events({
    'submit form': function(e) {
        e.preventDefault();
        var input = $(e.currentTarget).find('[name=message]');
        var message = input.val();
        if (!message.trim()) return null;
        Meteor.call("createMessage", message);
        input.val('');
    },
    'click .login': function(e) {
        console.log('logging in');
        Meteor.loginWithTwitter();
    }
});

Template.Chat.helpers({
    messages: function() {
        return Messages.find({});
    },
    isReady: function() {
        return messages.ready();
    }
});

Messages.find().observe({
  changed: function(message) {
    notification(message.message);
  }
});

// Functions
function notification( message ) {
  if (Notification) {
    if (Notification.permission !== "granted") {
      Notification.requestPermission()
    }
    var title = "JustBit.site"
    var extra = {
      icon: "/images/logo.png",
      body: message
    }
    var noti = new Notification( title, extra)
    noti.onclick = {
      window.open('http://www.mozilla.org', '_blank');
    }
    noti.onclose = {
      // Al cerrar
    }
    setTimeout( function() { noti.close() }, 10000)
  }
}
