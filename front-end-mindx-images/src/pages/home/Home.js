import React from 'react'
import "./home.css"
import client from "../../api"
import PostCard from '../../components/post-card/PostCard'
import { Col } from 'react-bootstrap'
import MxImgPagination from "../../components/pagination/MxImgPagination"
import Vars from '../../utility/Vars'
import Loading from '../../components/loading/Loading'

const Home = () => {
    // kết hợp componentDidmount + componentDidupdate 
    // Lắng nghe sự thay đổi để xem compnent ấy đang ở lifecycle nào => xem biến đấy đang có giá trị nào
    const [posts, setPosts] = React.useState([])
    const [isLoading, setLoading] = React.useState(false)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [amountPost, setAmountPost] = React.useState(1)

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const fetchPosts = async () => {
        setLoading(true)
        try {
            const res = await Vars.getDataFromPage(client, currentPage)
            setLoading(false)
            if (res.data.success) {
                setPosts(res.data.data.posts)
                setAmountPost(res.data.data.total)
            }
            // console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        fetchPosts()
        // eslint-disable-next-line
    }, [currentPage])

    const renderPosts = () => {
        if (isLoading) {
            return (
                <div className="home-container ">
                    <Loading />
                </div>
            )
        }
        if (!posts.length) {
            return (
                <div className="home-container ">
                    The data is empty
                </div>
            )
        }
        return posts.map(post => {
            return (
                <Col xs={12} md={3} key={post._id}>
                    <PostCard
                        id={post._id}
                        title={post.title}
                        imageUrl={post.imageUrl}
                        description={post.description}
                        createdBy={post.createdBy.email}
                    />
                </Col>
            )
        })
    }

    return (
        <div className="home-container ">
            <div className="w-75 CardGroup row mt-4">
                {
                    renderPosts()
                }
            </div>
            <MxImgPagination amountPost={amountPost} handlePaginationClick={handlePaginationClick} active={currentPage} className="pagination mt-3" />
        </div>
    )
}

export default Home