import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: `753201044413-odeqndasn5ai85gfic4k2tnsnoo44fmk.apps.googleusercontent.com`,
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
            
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) return this.props.signIn(this.auth.currentUser.get().getId())
        return this.props.signOut()
    }
    buttonSignIn = () => {
        this.auth.signIn()
    }
    buttonSignOut = () => {
        this.auth.signOut()
    }
    renderAuthButton = () => {
        if (this.props.isSignedIn === null) return null
        else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.buttonSignOut}>
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button className="ui red google button" onClick={this.buttonSignIn}>
                    <i className="google icon" />
                    Sign in with Google
                </button>
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isSignedIn: state.auth.isSignedIn
})

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)