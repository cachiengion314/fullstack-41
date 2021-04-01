const express = require(`express`);
const router = express.Router();
const CommentModel = require(`../../model/comment/comment`);
const UserModel = require(`../../model/auth/user`);
const PostModel = require(`../../model/post/post`);

//
// http://localhost:8080/api/comments/get-comments?postId=6065e259205f630e0ec81569
//
router.get(`/get-comments`, (request, response) => {
    const { postId } = request.query;
    CommentModel.find({
        postId
    }, function (err, docs) {
        if (err) {
            response.send({ messenger: "your info are so wrong!" });
            return
        }
        console.log(`get-comments.docs:`, docs)
        response.send({ data: docs, success: 1 })
    });
});

//
// http://localhost:8080/api/comments/post-comment
//
router.post(`/post-comment`, async (request, response) => {
    const { content, createdBy, postId } = request.body
    console.log(`post-comment.postId,userId,content`, postId, createdBy, content)

    if (createdBy, postId) {
        let foundUser, foundPost
        try {
            foundPost = await PostModel.findById(postId)
            foundUser = await UserModel.findById(createdBy)
            console.log(`foundPost`, foundPost)
            console.log(`foundUser`, foundUser)
        } catch (err) {
            if (err) {
                response.send({ err: err })
            }
            return
        }
        if (!foundUser || !foundPost) {
            response.send({ messenger: "your info are so wrong!" })
            return
        }

        const newComment = await CommentModel.create(
            {
                postId,
                content,
                createdBy
            });
        response.send({ data: newComment, success: 1 })
        return
    }
    response.send({ messenger: "your info are so wrong!" })
});

module.exports = router;