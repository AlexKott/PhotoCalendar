import React from 'react';

import IconClose from '../svg/IconClose.jsx';

class Slideshow extends React.Component {
    _onChangePhoto(event, direction) {
        event.stopPropagation();
        this.props.onChangePhoto(direction);
    }
    render() {
        const {
            photos,
            selectedPhotoIndex,
            onCloseSlideshow
        } = this.props;
        return (
            <div className="slideshow" onClick={() => onCloseSlideshow()}>

                <button className="button button--white slideshow__close-button" onClick={() => onCloseSlideshow()}>
                    <IconClose size="64px" />
                </button>

                {photos.length > 1 &&
                    <button
                        className="button button--white button--nav button--nav-left"
                        onClick={(e) => this._onChangePhoto(e, -1)}>&#9654;
                    </button>
                }

                {photos[selectedPhotoIndex].videoSrc
                    ? <div className="slideshow__image"><video
                        onClick={(e) => e.stopPropagation()}
                        src={photos[selectedPhotoIndex].videoSrc}
                        controls={true}
                        width={800}
                    /></div>
                    : <div className="slideshow__image">
                        <img
                            onClick={(e) => e.stopPropagation()}
                            src={photos[selectedPhotoIndex].highQualitySrc}
                        />
                    </div>
                }

                {photos.length > 1 &&
                    <button
                        className="button button--white button--nav"
                        onClick={(e) => this._onChangePhoto(e, 1)}>&#9654;
                    </button>
                }

            </div>
        );
    }
}

export default Slideshow;
