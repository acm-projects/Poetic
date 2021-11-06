module.exports = mongoose => {
    return mongoose.model(
        "poems",
        mongoose.Schema(
            {
                title: String,
                authors: [{ type: String }],
                tags: [{ type: String }],
                body: String,
                inProgress: Boolean
            }
        )
    );
};