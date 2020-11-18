import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchStreams } from '../../actions'

// class StreamList extends React.Component {
//     componentDidMount() {
//         this.props.fetchStreams()
//     }
//     renderAdmin(stream) {
//         if (this.props.currentUserId === null) return
//         if (stream.userId === this.props.currentUserId) {
//             return (
//                 <div className="right floated content">
//                     <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
//                     <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
//                 </div>
//             )
//         }
//     }
//     renderList() {
//         return this.props.streams.map(stream => {
//             return (
//                 <div className="item" key={stream.id}>
//                     {this.renderAdmin(stream)}
//                     <i className="large middle aligned icon camera" />
//                     <div className="content">
//                         {stream.title}
//                         <div className="description">
//                             {stream.description}
//                         </div>
//                     </div>
//                 </div>
//             )
//         })
//     }
//     renderCreate() {
//         if (this.props.isSignedIn) {
//             return (
//                 <div style={{ textAlign: 'right' }}>
//                     <Link to="/streams/new" className="ui button primary">Create Stream</Link>
//                 </div>
//             )
//         }
//     }
//     render() {
//         return (
//             <div>
//                 <h2>Streams</h2>
//                 <div className="ui celled list">
//                     {this.renderList()}
//                 </div>
//                 {this.renderCreate()}
//             </div>
//         )
//     }
// }

const StreamList = ({ fetchStreams, streams, currentUserId, isSignedIn }) => {
    useEffect(() => {
        fetchStreams()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const renderAdmin = stream => {
        if (currentUserId === null) return
        if (stream.userId === currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div>
            )
        }
    }
    const renderList = () => {
        return streams.map(stream => (
            <div className="item" key={stream.id}>
                {renderAdmin(stream)}
                <i className="large middle aligned icon camera" />
                <div className="content">
                    <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
                    <div className="description">
                        {stream.description}
                    </div>
                </div>
            </div>
        ))
    }
    const renderCreate = () => {
        if (isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button primary">Create Stream</Link>
                </div>
            )
        }
    }
    return (
        <div>
            <h2>Streams</h2>
            <div className="ui celled list">
                {renderList()}
            </div>
            {renderCreate()}
        </div>
    )
}

StreamList.propTypes = {
    fetchStreams: PropTypes.func.isRequired,
    streams: PropTypes.array.isRequired,
    currentUserId: PropTypes.string,
    isSignedIn: PropTypes.bool
}

const mapStateToProps = state => ({
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
})

export default connect(mapStateToProps, { fetchStreams })(StreamList)
