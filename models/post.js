const { model, Schema } = require("mongoose");
const slugify = require("../utils/slugify");

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

postSchema.pre("save", function preSavePostSchema() {
  this.slug = slugify(this.title);
});

const Post = model("Post", postSchema);

module.exports = Post;
