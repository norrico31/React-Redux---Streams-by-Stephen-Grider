import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

class StreamForm extends React.Component {
    renderError ({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta }) => {
        const errorInput = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <section className={errorInput}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </section>
        )
    }

    onHandleSubmit = formValues => {
        this.props.onSubmit(formValues)
    }
    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onHandleSubmit)}>
                <Field name="title" label="Enter Title" component={this.renderInput}/>
                <Field name="description" label="Enter Description" component={this.renderInput}/>
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = formValues => {
    const errors = {}
    if (!formValues.title) errors.title = "You must enter a title"
    if (!formValues.description) errors.description = "You must enter a description"
    return errors
}

StreamForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm)
