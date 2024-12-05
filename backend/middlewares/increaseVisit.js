import Post from '../model/post.model.js';

export const increaseVisit = async (req, res, next) => {
  const { slug } = req.params;

  await Post.findOneAndUpdate(
    { slug },
    {
      $inc: { visit: 1 },
    }
  );

  next();
};
