import React from 'react';
import { getPhotosByDay, getPhotosByRange } from '../js/photoService.js';
import { getText, getTextByDay } from '../js/textService.js';
import { getDisplayDay, getDateStringFromDate } from '../js/dateHelper.js';
import { beginningOfTime } from '../js/dateConstants.js';
import Slideshow from './Slideshow.jsx';
import NavButton from './NavButton.jsx';

class DetailView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSlideShowOpen: false,
            startPhoto: null,
        }
    }
    onOpenSlideshow(startPhoto) {
        document.querySelector('body').classList.add('no-scroll');
        this.setState({ isSlideShowOpen: true, startPhoto: startPhoto });
    }
    onCloseSlideshow() {
        document.querySelector('body').classList.remove('no-scroll');
        this.setState({ isSlideShowOpen: false, startPhoto: null });
    }
    render() {
        const  {
            isDetailViewActive,
            selectedDay,
            selectedEvent,
            photos,
            text,
            onSelectDay
        } = this.props;
        return (
            <div className={isDetailViewActive ? "" : "hidden"}>
                {selectedDay && selectedDay.previousDate &&
                    <NavButton direction="left" onClick={() => onSelectDay(selectedDay.previousDate)}/>}
                <div className="detail__window">
                    {text.content &&
                        <div className="textbox" dangerouslySetInnerHTML={{ __html: text.content }} />
                    }
                    <div className="detail__container">
                        {photos
                            ? photos.map((photo, index) => {
                                if (photo.videoSrc) {
                                    return (<video
                                        src={photo.videoSrc}
                                        key={index}
                                        className="detail__video"
                                        controls={true}
                                        height={300}
                                        onClick={() => this.onOpenSlideshow(index)}
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
                                    onClick={() => this.onOpenSlideshow(index)}></div>);
                            })
                            : (this.state.isLoading ? (<img className="detail__loader" src="assets/images/loader.svg" />) : '')
                        }
                    </div>
                    {this.state.isSlideShowOpen &&
                        <Slideshow
                            photos={this.state.photos}
                            startPhoto={this.state.startPhoto}
                            title={this.state.title}
                            onClose={this.onCloseSlideshow.bind(this)}
                        />}
                </div>
                {selectedDay && selectedDay.nextDate &&
                    <NavButton direction="right" onClick={() => onSelectDay(selectedDay.nextDate)} />}
            </div>
        );
    }
}

export default DetailView;
