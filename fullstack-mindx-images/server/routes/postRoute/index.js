const express = require(`express`);
const router = express.Router();
const PostModel = require(`../../model/post/post`)
const UserModel = require(`../../model/auth/user`)
const PostController = require(`./postController`)
const jwt = require(`jsonwebtoken`)
const { isAuth } = require(`../../middleware/isAuth`)

//
// http://localhost:8080/api/posts?page=1&pageSize=4
//
router.get(`/`,
    (req, res, next) => {
        next()
    }
    , async (request, response) => {
        const { page, pageSize } = request.query
        const numberPage = Number(page) || 1
        const numberPageSize = Number(pageSize) || 4
        const offset = (numberPage - 1) * numberPageSize
        const limit = numberPageSize
        try {
            const [posts, total] = await PostController.getPosts({ offset, limit })
            console.log(`get-posts`, posts, total)
            response.send({ success: 1, data: { posts, total } })
        } catch (err) {
            console.log(`err`, err)
            response.send({ success: 0 })
        }
    }
)

//
// http://localhost:8080/api/posts/6065e259205f630e0ec81569
//
router.get(`/:postId`,
    (req, res, next) => {
        next()
    }
    , async (request, response) => {
        const { postId } = request.params
        try {
            const post = await PostController.getSpecifiedPost(postId)
            response.send({ success: 1, data: post })
        } catch (err) {
            console.log(`err`, err)
            response.send({ success: 0 })
        }
    }
)
//
// http://localhost:8080/api/posts
//
router.post(`/`, isAuth, async (request, response) => {
    try {
        const { description, title, imageUrl } = request.body
        const createdBy = request.user._id
        console.log(`create-post.description,title,imageUrl,createdBy`, description, title, imageUrl, createdBy)
        const newPost = await PostController.createPost({
            imageUrl, title, description, createdBy
        })
        response.send({ data: newPost, success: 1 })
    } catch (err) {
        console.log(err)
        response.send({ success: 0 })
    }
});

module.exports = router;