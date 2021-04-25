const { Validator } = require("node-input-validator");

exports.validate_request = async (body, obj) => {
    const v = new Validator(body, obj);
  
    const matched = await v.check();
  
    return { matched, errors: v.errors };
};

exports.error_message = (errors) => {
    let message = `Validation Error: `
    Object.entries(errors).map(x => {
        message += x[1].message + `, `
    })
    return message.slice(0, parseInt(message.length) - 2).replace(/\./g, "")
}

exports.pile_error_messages = (errors) => {
    let error_messages = [];
    Object.entries(errors).map((x) => {
      let obj = {};
      obj[x[0]] = x[1].message;
      error_messages.push(obj);
    });
    return error_messages;
};