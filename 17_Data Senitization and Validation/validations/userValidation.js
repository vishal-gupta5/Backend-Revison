const validator = require("validator");

// Register
const userValidateForRegister = (data) => {
  try {
    const mandatoryField = ["firstName", "email", "password"];

    const isAllowed = mandatoryField.every((k) =>
      Object.keys(data).includes(k),
    );

    if (!isAllowed) {
      throw new Error("Field Missing!");
    }

    if (!validator.isEmail(data.email)) {
      throw new Error("Enter the valid email!");
    }

    if (!validator.isStrongPassword(data.password)) {
      throw new Error("Enter the strong password!");
    }

    if (!data.firstName.length >= 3 && !data.firstName.length <= 50) {
      throw new Error(
        "Name should be atleast 3 character and atmost 50 characters",
      );
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { userValidateForRegister };
