import React from 'react';
import photoService from '../js/photoService.js';

class Gallery extends React.Component {
    componentWillMount() {
        photoService.getPhotos().then((photos) => {
            this.setState({ photos });
        });
    }
    render() {
        // TODO Thumbnail size /s200/
        return (
            <div>
                <img src={this.state && this.state.photos ? this.state.photos[3].src : 'assets/images/loader.svg'} />
            </div>
        );
    }
}

export default Gallery;
