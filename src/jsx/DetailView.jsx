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
            photos: null,
            isSlideShowOpen: false,
            startPhoto: null,
            text: null,
            previousDate: null,
            nextDate: null
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!nextProps.selectedContent) {
            return;
        }
        const oldElement = this.props.selectedContent || {};
        const newElement = nextProps.selectedContent;
        const isSameEvent = oldElement.isEvent && newElement.isEvent && oldElement.eventId === newElement.eventId;
        const isSameDate = oldElement.isDate && newElement.isDate && oldElement.date === newElement.date;
        if (isSameEvent || isSameDate) {
            return;
        }

        this.setState({ photos: null, text: null, previousDate: null, nextDate: null, isLoading: true });
        if (nextProps.selectedContent.isEvent) {
            const event = nextProps.selectedContent;
            this.props.setTitle(event.summary);

            getPhotosByRange(event.startDate, event.endDate)
                .then((photos) => {
                    const allPhotos = [];
                    for (let date in photos) {
                        if ({}.hasOwnProperty.call(photos, date)) {
                            allPhotos.push(...photos[date]);
                        }
                    }
                    allPhotos.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
                    this.setState({ photos: allPhotos, isLoading: false });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ isLoading: false, photos: null });
                });

            getText(event.eventId)
                .then(text => this.setState({ text, isLoading: false }))
                .catch((error) => {
                    console.log(error);
                    this.setState({ isLoading: false, text: null });
                });

        } else if (nextProps.selectedContent.isDate) {
            const date = nextProps.selectedContent.date;
            this.props.setTitle(getDisplayDay(date));

            getPhotosByDay(date)
                .then((photos) => {
                    this.setState({ photos, isLoading: false });
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({ isLoading: false, photos: null });
                });

            getTextByDay(date)
                .then(text => this.setState({ text, isLoading: false }))
                .catch((error) => {
                    console.log(error);
                    this.setState({ isLoading: false, text: null });
                });

            this.setAdjacentDate(date, -1);
            this.setAdjacentDate(date, 1);

        } else {
            this.setState({ isLoading: false });
        }
    }
    setAdjacentDate(date, direction) {
        const self = this;
        const earliestDate = new Date(beginningOfTime);
        const latestDate = new Date();
        const stateName = direction === -1 ? 'previousDate' : 'nextDate';

        function checkForContent(cDate) {
            let currentDateString;
            let currentDate = new Date(cDate);
            currentDate.setDate(currentDate.getDate() + direction);
            if (currentDate >= earliestDate && currentDate <= latestDate) {
                currentDateString = getDateStringFromDate(currentDate);

                Promise.all([getPhotosByDay(currentDateString), getTextByDay(currentDateString)])
                    .then((results) => {
                        if (results[0] || results[1]) {
                            self.setState({ [stateName]: currentDateString });
                        } else {
                            checkForContent(currentDateString);
                        }
                    }).catch(e => console.log(e));
            }
        }
        checkForContent(date);
    }
    onOpenSlideshow(startPhoto) {
        document.querySelector('body').classList.add('no-scroll');
        this.setState({ isSlideShowOpen: true, startPhoto: startPhoto });
    }
    onCloseSlideshow() {
        document.querySelector('body').classList.remove('no-scroll');
        this.setState({ isSlideShowOpen: false, startPhoto: null });
    }
    onChangeDate(direction) {
        const selectedDate = direction === -1 ? this.state.previousDate : this.state.nextDate;
        this.props.selectContent({ isDate: true, date: selectedDate });
    }
    render() {
        return (
            <div className={this.props.isElementActive ? "" : "hidden"}>
                {this.props.selectedContent && this.props.selectedContent.isDate && this.state.previousDate &&
                    <NavButton direction="left" onClick={() => this.onChangeDate(-1)}/>}
                <div className="detail__window">
                    {this.state.text &&
                        <div className="textbox" dangerouslySetInnerHTML={{ __html: this.state.text.content }} />
                    }
                    <div className="detail__container">
                        {this.state.photos
                            ? this.state.photos.map((photo, index) => {
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
                {this.props.selectedContent && this.props.selectedContent.isDate && this.state.nextDate &&
                    <NavButton direction="right" onClick={() => this.onChangeDate(1)} />}
            </div>
        );
    }
}

export default DetailView;
