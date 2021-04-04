const PostModel = require(`../../model/post/post`)
const UserModel = require(`../../model/auth/user`)
const ObjectId = require(`mongoose`).Types.ObjectId

const createPost = async ({ imageUrl, title, description, createdBy }) => {
    const newPost = await PostModel.create(
        {
            title,
            imageUrl,
            createdBy,
            description
        })
    return newPost
}

const getPosts = async ({ offset, limit }) => {
    // parallel processing
    // const [posts, total] = await Promise.all([
    //     PostModel.find({})
    //         .skip(offset)
    //         .limit(limit),
    //     PostModel.countDocuments()
    // ])
    const [posts, total] = await Promise.all([
        PostModel.aggregate(
            [
                {
                    $lookup:
                    {
                        from: "users",
                        localField: "createdBy",
                        foreignField: "_id",
                        as: "createdByUser"
                    }
                },
                {
                    $unwind: "$createdByUser"
                },
                {
                    $project: {
                        "createdByUser.__v": 0,
                        "createdByUser._id": 0,
                        "createdByUser.password": 0
                    }
                },
                { $skip: offset },
                { $limit: limit },
            ]),
        PostModel.countDocuments()
    ])
    console.log(`getPosts`, posts)

    return [posts, total]
}

const getSpecifiedPost = async (postId) => {

    const docs = await PostModel.aggregate(
        [
            {
                $match:
                {
                    _id: ObjectId(postId)
                }
            },
            {
                $lookup:
                {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "_post_createdByUser"
                }
            },
            {
                $unwind: "$_post_createdByUser"
            },
            // => found 1 post_obj
            {
                $lookup:
                {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "_post_comments"
                }
            },
            { "$unwind": "$_post_comments" },
            // => found 4 comments created by the same user => unwind : 4 different post_obj__post_comments
            {
                $lookup:
                {
                    from: "users",
                    localField: "_post_comments.createdBy",
                    foreignField: "_id",
                    as: "_post_commentsByUser"
                }
            },
            {
                $unwind: "$_post_commentsByUser"
            },
            // => found 1 user forEach 4 post_obj__post_comments => unwind : found 4 post_obj__post_comments__post_commentsByUser
            {
                $project:
                {
                    "_id": 1,
                    "description": 1,
                    "title": 1,
                    "imageUrl": 1,
                    "createdBy": "$_post_createdByUser.email",
                    "comment": {
                        content: "$_post_comments.content",
                        createdByUser: "$_post_commentsByUser.email"
                    },
                }
            },
            {
                "$group": {
                    "_id": "$_id",
                    "description": {
                        $first: "$description"
                    },
                    "title": {
                        $first: "$title"
                    },
                    "imageUrl": {
                        $first: "$imageUrl"
                    },
                    "createdBy": {
                        $first: "$createdBy"
                    },
                    "comments": {
                        "$push": "$comment",
                    },
                }
            },
        ]
    )

    console.log(`getSpecifiedPost`, docs)
    return docs
}

module.exports = {
    createPost,
    getPosts,
    getSpecifiedPost
}