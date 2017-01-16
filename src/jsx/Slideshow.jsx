import React from 'react';

class Slideshow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPhoto: this.props.startPhoto,
        }
    }
    changePhoto(direction) {
        let nextPhoto = this.state.selectedPhoto + direction;
        const lastPhotoIndex = this.props.photos.length - 1;
        if (nextPhoto > lastPhotoIndex) {
            nextPhoto = 0;
        } else if (nextPhoto < 0) {
            nextPhoto = lastPhotoIndex;
        }
        this.setState({ selectedPhoto: nextPhoto });
    }
    render() {
        return (
            <div className="slideshow__container">
                <div className="slideshow__header">
                    <h1 className="slideshow__title">{this.props.title}</h1>
                    <button className="button" onClick={() => this.props.onClose()}>Close Slideshow</button>
                </div>
                <div className="slideshow__body">
                    {this.props.photos.length > 1 && <button className="button" onClick={() => this.changePhoto(-1)}>Previous</button>}
                    {this.props.photos[this.state.selectedPhoto].videoSrc
                        ? <div className="slideshow__image"><video
                            src={this.props.photos[this.state.selectedPhoto].videoSrc}
                            controls={true}
                            width={800}
                        /></div>
                        : <img className="slideshow__image" src={this.props.photos[this.state.selectedPhoto].highQualitySrc}/>
                    }
                    {this.props.photos.length > 1 && <button className="button" onClick={() => this.changePhoto(1)}>Next</button>}
                </div>
            </div>
        );
    }
}

export default Slideshow;
