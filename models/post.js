const { model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title must not be empty."],
    },
    body: String,
    slug: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Post = model("Post", postSchema);

module.exports = Post;
