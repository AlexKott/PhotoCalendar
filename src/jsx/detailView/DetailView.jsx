import React from 'react';

import SlideshowContainer from './SlideshowContainer.jsx';
import CommentsContainer from './CommentsContainer.jsx';
import NavButton from '../app/NavButton.jsx';

export default function DetailView ({
    isSlideshowActive,
    isLoading,
    selectedDay,
    photos,
    text,
    onOpenSlideshow }) {
    return (
        <div className="content-container">
            {selectedDay && selectedDay.previousDate &&
                <NavButton direction="left" href={`/day/${selectedDay.previousDate}`} />}

            {isLoading
                ? (<img className="detail__loader" src="/assets/assets/images/loader.svg" />)
                : (<div>
                    {text.content && <div className="textbox" dangerouslySetInnerHTML={{ __html: text.content }} />}
                    <div className="detail__container">
                        {photos && photos.map((photo, index) => {
                                if (photo.videoSrc) {
                                    return (<video
                                        src={photo.videoSrc}
                                        key={index}
                                        className="detail__video"
                                        controls={true}
                                        height={300}
                                        onClick={() => onOpenSlideshow(index)}
                                        />);
                                }
                                return (<div
                                    style={{
                                        backgroundImage: `url(${photo.ratio > 2 ? photo.highQualitySrc : photo.src})`,
                                        flexBasis: photo.width > 600 || photo.height < 280 ? (300 * photo.ratio) : (photo.ratio > 1 ? 400 : 225),
                                        maxWidth: (300 * photo.ratio * 1.6)
                                    }}
                                    key={index}
                                    className="detail__image-container"
                                    onClick={() => onOpenSlideshow(index)}></div>);
                            })
                        }
                    </div>
                    <CommentsContainer />
                </div>)
            }

            {selectedDay && selectedDay.nextDate &&
                <NavButton direction="right" href={`/day/${selectedDay.nextDate}`} />}

            {isSlideshowActive && <SlideshowContainer />}

        </div>
    );
}
