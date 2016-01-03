Tasks = new Mongo.Collection("tasks");
if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function() {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  })

  Template.body.events({
    "submit .new-task": function(event) {
      event.preventDefault();
      console.log(event)
      var text = event.target.text.value;
      Tasks.insert({text: text, createdAt: new Date()})
      event.target.text.value = "";
    },
    "click .delete": function(event) {
        event.preventDefault();
        Tasks.remove(this._id)
      },
    "click .toggle-checked": function(event) {
      Tasks.update(this._id,{$set: {checked: !this.checked}})
    }

  })
}