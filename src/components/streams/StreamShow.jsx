import React, { useEffect } from 'react'
import flv from 'flv.js'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'

class StreamShow extends React.Component {
    constructor(props) {
        super(props)
        this.videoRef = React.createRef()
    }
    componentDidMount() {
        const { id } = this.props.match.params
        console.log(this.videoRef)
        this.props.fetchStream(id)
        this.buildPlayer()
    }
    componentDidUpdate() {
        this.buildPlayer()
    }
    componentWillUnmount() {
        this.player.destroy()
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return
        }

        const { id } = this.props.match.params
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })
        this.player.attachMediaElement(this.videoRef.current)
        this.player.load()
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }
        const { title, description } = this.props.stream
        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls/>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
    }
}

// const StreamShow = ({ fetchStream, match: { params: { id }}, stream: { title, description } }) => {
//     useEffect(() => {
//         fetchStream(id)
//     }, [fetchStream, id])
//     console.log(stream)
//     return (
//         <div>
//             StreamShow
//         </div>
//     )
// }

StreamShow.propTypes = {
    fetchStream: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    stream: PropTypes.object
}

const mapStateToProps = ({ streams }, { match: { params: { id }}}) => ({
    stream: streams[id]
})

export default connect(mapStateToProps, { fetchStream })(StreamShow)
