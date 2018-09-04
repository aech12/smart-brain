import React from 'react';
import '../containers/App.css';

//message below rank + searchbar
const ImageLinkForm = ({inputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'Search the images for faces'}
            </p>
            <div className='center'>
                <div className='center pa4 br3 shadow-5'>
                    <input
                        type='tex' className='f4 pa2 w-70 center'
                        onChange={inputChange}>
                    </input>
                    <button
                        className='w-30 grow link f4 ph3 pv2 dib white bg-light-blue'
                        onClick={onButtonSubmit}>Detect
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;