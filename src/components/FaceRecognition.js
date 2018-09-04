import React from 'react';
import '../containers/App.css';

//display the image searched
const FaceRecognition = ({imgURL, faceBox}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img
                    id='inputimage'
                    alt='' src={imgURL} width='300px' height='auto'>
                </img>
                <div 
                    style={{
                        top: faceBox.topRow,
                        bottom: faceBox.bottomRow,
                        left: faceBox.leftCol,
                        right: faceBox.rightCol}}
                    className='bounding-box'>
                </div>
            </div>
        </div>
    )
}

export default FaceRecognition;