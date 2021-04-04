const CommentModel = require(`../../model/comment/comment`)
const PostModel = require(`../../model/post/post`)

const createComment = async ({ content, createdBy, postId }) => {
    const found = await PostModel.findById(postId)
    if (!found) {
        throw new Error(`Not found`)
    }
    const newComment = await CommentModel.create({
        content,
        createdBy,
        postId,
    })
    return newComment
}

module.exports = {
    createComment
}