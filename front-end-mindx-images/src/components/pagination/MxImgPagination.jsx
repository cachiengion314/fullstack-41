import React from 'react'
import { Pagination } from 'react-bootstrap'
import Vars from '../../utility/Vars'

const MxImgPagination = ({ active, handlePaginationClick, amountPost, className }) => {
    const max = React.useMemo(() => Math.ceil(amountPost / Vars.PAGE_SIZE), [amountPost])
    let items = []
    for (let number = 1; number <= max; number++) {
        items.push(
            <Pagination.Item onClick={handlePaginationClick.bind(null, number)} key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        )
    }

    return (
        <div className={className}>
            <Pagination>{items}</Pagination>
        </div>
    )
}

export default MxImgPagination