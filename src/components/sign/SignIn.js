import React from 'react';

//sign in page
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //sign in verification
            email: '',
            password: ''
        }
    }
    //update email/password state
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }
    //update email/password state onChange /

    //sign in verification
    onSubmitSignIn = () => {
        fetch('https://afternoon-waters-53178.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        }).then(resp=> resp.json())
        //got user back from server, use its info to update front end state
        // .then(console.log)
        .then(user=> {
            if (user.id){
            // if (user){
                this.props.loadUser(user); 
                this.props.onRouteChange('home');
                console.log('this is the user', user + ' number 1');
            }
            else {
                console.log('sign in didnt work on step 4b')
            }
        })
    }
    //sign in verification /

    render() {
        const { onRouteChange } = this.props;
        return (
            <div>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <main className="pa4 black-80">
                    <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                        {/* Email and password text boxes */}
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black 
                        hover-white w-100" type="email" name="email-address"
                        id="email-address" 
                        onChange={this.onEmailChange}
                         />
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent 
                        hover-bg-black hover-white w-100" type="password" 
                        name="password" id="password"
                        onChange={this.onPasswordChange} />
                        </div>
                    </fieldset>
                    <div>
                        {/* Sign In button */}
                        <input 
                        onClick={this.onSubmitSignIn}
                        // onClick={()=> onRouteChange('home')}
                        className="b ph3 pv2 input-reset ba b--black 
                        bg-transparent grow pointer f6 dib"
                         type="submit" defaultValue="Sign in" />
                    </div>
                    <div className="lh-copy mt3 pointer">
                        {/* register button */}
                        <p onClick={()=> onRouteChange('register')}
                        href="#0" className="f6 link dim black db">
                            Register
                        </p>
                    </div>
                    </div>
                </main>
                </article>
            </div>
        )
    }
}

export default SignIn;