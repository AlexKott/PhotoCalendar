import React from 'react';
import { getPhotosByDate, getPhotosByRange } from '../js/photoService.js';
import { getDisplayDay } from '../js/dateHelper.js';
import Slideshow from './Slideshow.jsx';

class DetailView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            photos: null,
            isSlideShowOpen: false,
            startPhoto: null
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ title: null, photos: null, isLoading: true });
        if (nextProps.selectedElement.isEvent) {
            const event = nextProps.selectedElement;
            getPhotosByRange(event.startDate, event.endDate).then((photos) => {
                const allPhotos = [];
                for (let date in photos) {
                    if ({}.hasOwnProperty.call(photos, date)) {
                        allPhotos.push(...photos[date].media);
                    }
                }
                this.setState({ title: event.summary, photos: allPhotos, isLoading: false });
            });
        } else if (nextProps.selectedElement.isDate) {
            const date = nextProps.selectedElement.date;
            getPhotosByDate(date).then((photos) => {
                if (photos[date]) {
                    this.setState({ title: getDisplayDay(date), photos: photos[date].media });
                }
                this.setState({ isLoading: false });
            });
        } else {
            this.setState({ isLoading: false });
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
        return (
            <div className="detailWindow">
                <h1 className="detail__title">{this.state.title ? this.state.title : ''}</h1>
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
                        : (this.state.isLoading ? (<img src="assets/images/loader.svg" />) : '')
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
        );
    }
}

export default DetailView;
