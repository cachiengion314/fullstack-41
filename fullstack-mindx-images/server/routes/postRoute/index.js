const express = require(`express`);
const router = express.Router();
const PostModel = require(`../../model/post/post`);

//
// http://localhost:8080/api/posts/get-posts?limit=10&offset=0
//
router.get(`/get-posts`, async (request, response) => {
    const { limit, offset } = request.query;
    const docs = await PostModel.find({}).skip(Number(offset)).limit(Number(limit));
    console.log(`get-posts`, docs)
    if (docs.length > 0) {
        response.send({ data: docs, success: 1 })
        return
    }
    response.status(404).send({ messenger: "database are empty" })
});

//
// http://localhost:8080/api/posts/create-post
//
router.post(`/create-post`, async (request, response) => {
    const { description, title, imageUrl, createdBy } = request.body;
    console.log(`create-post.description,title,imageUrl,createdBy`, description, title, imageUrl, createdBy)
    const newPost = await PostModel.create(
        {
            title,
            imageUrl,
            createdBy,
            description
        });
    response.send({ data: newPost, success: 1 })
});

module.exports = router;