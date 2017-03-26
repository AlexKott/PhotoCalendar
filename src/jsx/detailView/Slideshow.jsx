import React from 'react';

import NavButton from '../app/NavButton.jsx';
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
                    <IconClose size="40px" />
                </button>

                {photos.length > 1 && <NavButton onClick={(e) => this._onChangePhoto(e, -1)} direction="left"/>}

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

                {photos.length > 1 && <NavButton onClick={(e) => this._onChangePhoto(e, 1)} direction="right"/>}

            </div>
        );
    }
}

export default Slideshow;
