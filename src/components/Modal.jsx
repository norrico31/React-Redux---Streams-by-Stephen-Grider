import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Modal = ({ title, content, actions, onDismiss }) => {
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active" onClick={onDismiss}>
            <div className="ui standard modal visible active" onClick={e => e.stopPropagation()}>
                <div className="header">{title}</div>
                    <p className="content">
                        {content}
                    </p>
                <div className="actions">
                    {actions}
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    )
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    onDismiss: PropTypes.func.isRequired,
}

export default Modal