import React from 'react';
import { getPhotos } from '../js/photoService.js';

class DetailView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: null
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ photos: null });
        getPhotos({ selectedDate: nextProps.selectedDate }, 's400').then((photos) => {
            if (photos[nextProps.selectedDate]) {
                this.setState({ photos: photos[nextProps.selectedDate].media });
            }
        });
    }
    render() {
        return (
            <div>
                {this.state.photos
                    ? this.state.photos.map((photo, index) => (
                        <img src={photo.src} key={index} />
                    ))
                    // TODO: handle empty state
                    : <img src="assets/images/loader.svg" />
                }
            </div>
        );
    }
}

export default DetailView;
