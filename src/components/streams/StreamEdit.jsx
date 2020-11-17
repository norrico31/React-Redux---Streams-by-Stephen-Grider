import { pick } from 'lodash'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'

// class StreamEdit extends React.Component {
//     componentDidMount() {
//         this.props.fetchStream(this.props.match.params.id)
//     }
//     onSubmit = formValues => {
//         this.props.editStream(this.props.match.params.id, formValues)
//     }
//     render() {
//         if (!this.props.stream) return <div>Loading...</div>
//         console.log(this.props)
//         return (
//             <div>
//                 <h3>Edit a Stream</h3>
//                 <StreamForm initialValues={pick(this.props.stream, 'title', 'description')} onSubmit={this.onSubmit} />
//             </div>
//         )
//     }
// }

const StreamEdit = ({ stream, fetchStream, editStream, match: { params: { id }} }) => {
    useEffect(() => {
        fetchStream(id)
    }, [fetchStream, id])

    const onSubmit = formValues => {
        editStream(id, formValues)
    }

    if (!stream) return <div>Loading...</div>
    return (
        <div>
            <h3>Edit a Stream</h3>
            <StreamForm initialValues={pick(stream, 'title', 'description')} onSubmit={onSubmit} />
        </div>
    )
}

StreamEdit.propTypes = {
    fetchStream: PropTypes.func.isRequired,
    editStream: PropTypes.func.isRequired,
    stream: PropTypes.object,
    id: PropTypes.number
}

const mapStateToProps = ({ streams }, ownProps) => {
    return { stream: streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit)


// pick is essentially pull out the key/properties from the object(stream) and create a new object