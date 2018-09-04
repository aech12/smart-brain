import React, { Component } from 'react';
import SignIn from '../components/sign/SignIn';
import Register from '../components/sign/Register';

import FaceRecognition from '../components/FaceRecognition';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import ImageLinkForm from '../components/ImageLinkForm';
import Rank from '../components/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

//Particles bg
const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}
//Clarifai API key initialization
const app = new Clarifai.App({
    apiKey: 'd471942045b94b37b6ea801b321cd61a'
});

//App
class App extends Component {
    constructor() {
        super();
        this.state = {
            boxInput: '',
            imgURL: '',
            faceBox: {},
            //signin/registration
            route: 'signin',
            isSignedIn: false,
            //logged-in user
            user: {
                email: '',
                id: '',
                name: '',
                entries: 0,
                joined: ''
            }
        }
    }
    //register user/signed in user  \   Register.js/SignIn.js
    loadUser = (u) => {
        this.setState({user: {
            email: u.email,
            id: u.id,
            name: u.name,
            entries: u.entries,
            joined: u.joined
        }})
        // console.log(u)
        // console.log(this.state.user)
    }
    //logged in user /

    //onInputChange
    calcFaceBox = (data) => {
        const clarifaiFace =
        data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const boxWidth = Number(image.width);
        const boxHeight = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * boxWidth,
            topRow: clarifaiFace.top_row * boxHeight,
            rightCol: boxWidth - (clarifaiFace.right_col * boxWidth),
            bottomRow: boxHeight - (clarifaiFace.bottom_row * boxHeight)
        }
    }
    displayFaceBox = (box) => {
        this.setState({faceBox: box})
    }
    //onInputChange /

    //ImageLinkForm: on button submit clarifai the image
    onInputChange = (event) => {
        this.setState({
            boxInput: event.target.value,
        })
    }
    onButtonSubmit = () => {
        this.setState({
            imgURL: this.state.boxInput
        })
        app.models
            .predict(Clarifai.FACE_DETECT_MODEL, this.state.boxInput)
            .then(
                resp=> {
                    //update entries
                    fetch('https://afternoon-waters-53178.herokuapp.com/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id,
                        })
                    })
                    .then(resp=> resp.json())
                    // .then(count=> console.log(count))
                    .then(count=> {
                        this.setState(Object.assign(
                            this.state.user, {entries: count}
                        ))
                    })
                    //update entries /

                    this.displayFaceBox(
                        this.calcFaceBox(resp)
                    )
                }
            )
            .catch(
                err=> console.log('Error happened: '+err)
            );
    }
    //ImageLinkForm: on button submit clarifai the image /

    //signin/registration
    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({isSignedIn: false})
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route})
    }
    //signin/registration /

    render() {
        return (
            //homescreen (logo, topbar, rank, Particles bg)
            <div className='App'>
                <Particles className='particles'
                    params={{particlesOptions}}
                />
                <Navigation
                    onRouteChange={this.onRouteChange}
                    isSignedIn={this.state.isSignedIn}
                />
                
                {/* if route === home show home else signin : register */}
                { this.state.route === 'home' ?
                    <div>
                        <Logo/>
                        <Rank
                            name={this.state.user.name}
                            entries={this.state.user.entries}
                        />
                        <ImageLinkForm 
                            inputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition 
                            imgURL={this.state.imgURL}
                            faceBox={this.state.faceBox}
                        />
                    </div>
                    : (
                        this.state.route === 'signin' ?
                            <SignIn
                                onRouteChange={this.onRouteChange}
                                loadUser={this.loadUser}
                            />
                            :
                            <Register 
                                onRouteChange={this.onRouteChange}
                                loadUser={this.loadUser}
                            />
                    )
                }
                {/* if route === home show home else signin : register / */}
            </div>
        )
    }
}

export default App;