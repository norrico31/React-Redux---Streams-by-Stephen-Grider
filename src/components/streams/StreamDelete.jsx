import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Modal from '../Modal'
import history from '../../history'
import { fetchStream, deleteStream } from '../../actions'

// class StreamDelete extends React.Component {
//     componentDidMount() {
//         this.props.fetchStream(this.props.match.params.id)
//     }
//     renderActions() {
//         const { id } = this.props.match.params
//         return (
//             <React.Fragment>
//                 <button className="ui button negative" onClick={() => this.props.deleteStream(id)}>Delete</button>
//                 <Link to="/" className="ui button">Cancel</Link>
//             </React.Fragment>
//         )
//     }
//     renderContent() {
//         if (!this.props.stream) {
//             return 'Are you sure you want to delete this stream?'
//         }
//         return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`
//     }
//     render() {
//         return (
//             <>
//                 <Modal title="Delete Stream" content={this.renderContent()} actions={this.renderActions()} onDismiss={() => history.push('/')}/>
//             </>
//         )
//     }
// }

const StreamDelete = props => {
    const { fetchStream, deleteStream, match: { params: { id }}, stream } = props
    
    useEffect(() => {
        fetchStream(id)
    }, [fetchStream, id])

    const actions = (
        <React.Fragment>
            <button className="ui button negative" onClick={() => deleteStream(id)}>Delete</button>
            <Link to="/" className="ui button">Cancel</Link>
        </React.Fragment>
    )
    function renderContent() {
        if (!stream) return 'Are you sure you want to delete this stream?' 
        return `Are you sure you want to delete the stream with title: ${stream.title}`
    }
    
    return <Modal title="Delete Stream" content={renderContent()} actions={actions} onDismiss={() => history.push('/')}/>
}

StreamDelete.propTypes = {
    fetchStream: PropTypes.func.isRequired,
    deleteStream: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    stream: PropTypes.object
}

const mapStateToProps = ({ streams }, { match: { params: { id }}}) => {
    return { stream: streams[id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)
