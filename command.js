const instanceofCommand = q => (q instanceof Command);

//Data Class
class Command {
  constructor(name, description, action, shouldDelete=true, next=[]) {
    if (!name || !description || !action) throw "Action without description, action, or name";
    this.name = name;
    this.description = description;
    this.action = action;
    this.shouldDelete = shouldDelete;

    if (instanceofCommand(next)) next = [ next ];
    if (next && !next.every(instanceofCommand)) throw "some cmd in next not an instance of Command";
    this.next = next || [];
  }
  addNext(c) {
    if (!instanceofCommand(c)) throw "Tried to add something other than an instance of command, freak.";
    this.next.push(c);
  }
};

module.exports = Command;