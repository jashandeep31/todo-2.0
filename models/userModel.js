const moongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new moongoose.Schema({
    name: {
        type: String,
        required: ["true", "Please enter your name"],
    },
    email: {
        type: String,
        required: ["true", "Please enter your email"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        required: ["true", "Please enter your password"],
    },
    joined: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
const User = moongoose.model("User", userSchema);

module.exports = User;
