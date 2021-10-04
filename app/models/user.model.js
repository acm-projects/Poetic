module.exports = mongoose => {
    return mongoose.model(
        "users",
        mongoose.Schema(
            {
                username: String,
                password: String,
                tags: [{ type: String }],
                poems: [{ type: String }]
            }
        )
    );
};