module.exports = mongoose => {
    return mongoose.model(
        "poems",
        mongoose.Schema(
            {
                title: String,
                author: String,
                body: String
            }
        )
    );
};