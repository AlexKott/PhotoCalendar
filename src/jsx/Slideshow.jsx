import React from 'react';
import IconClose from './svg/IconClose.jsx';

class Slideshow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPhoto: this.props.startPhoto,
        }
    }
    changePhoto(event, direction) {
        event.stopPropagation();
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
            <div className="slideshow" onClick={() => this.props.onClose()}>
                <button className="button button--white slideshow__close-button" onClick={() => this.props.onClose()}>
                    <IconClose size="64px" />
                </button>
                {this.props.photos.length > 1 &&
                    <button
                        className="button button--white button--nav button--nav-left"
                        onClick={(e) => this.changePhoto(e, -1)}>&#9654;
                    </button>
                }
                {this.props.photos[this.state.selectedPhoto].videoSrc
                    ? <div className="slideshow__image"><video
                        onClick={(e) => e.stopPropagation()}
                        src={this.props.photos[this.state.selectedPhoto].videoSrc}
                        controls={true}
                        width={800}
                    /></div>
                    : <div className="slideshow__image">
                        <img
                            onClick={(e) => e.stopPropagation()}
                            src={this.props.photos[this.state.selectedPhoto].highQualitySrc}
                        />
                    </div>
                }
                {this.props.photos.length > 1 &&
                    <button
                        className="button button--white button--nav"
                        onClick={(e) => this.changePhoto(e, 1)}>&#9654;
                    </button>
                }
            </div>
        );
    }
}

export default Slideshow;
