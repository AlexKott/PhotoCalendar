import React from 'react';
import { signUp } from '../js/newsletterService.js';
import { writeCookie } from '../js/cookieService.js';
import IconClose from './svg/IconClose.jsx';

class Newsletter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showNewsletter: true,
            status: 0,
            messages: [
                {
                    type: 'initial',
                    title: 'Sign up for our newsletter!',
                    description: 'We\'ll send you an update once every week.',
                },
                {
                    type: 'exists',
                    title: 'You already signed up earlier',
                    description: 'If you didn\'t receive any mails for a longer time please check your spam folder or let us know!'
                },
                {
                    type: 'signed',
                    title: 'Thank you!',
                    description: 'We signed you up. :)'
                },
                {
                    type: 'error',
                    title: 'Something went wrong!',
                    description: 'That\'s probably not your fault. Please try again later and let us know if this keeps on happening.'
                }
            ]
        };
    }
    onToggleNewsletter() {
        this.setState({ showNewsletter: !this.state.showNewsletter });
    }
    handleInputChange(e) {
        const name = e.target.name;
        this.setState({ [name]: e.target.value });
    }
    onNewsletterSubmit(e) {
        e.preventDefault();
        if (e.target.checkValidity) {
            if (e.target.checkValidity()) {
                this.signUp();
            }
        }
    }
    signUp() {
        this.setState({ isLoading: true });
        signUp(this.state.name, this.state.email)
            .then(result => {
                if (result.status === 201) {
                    this.setState({ status: 2 });
                    setTimeout(() => this.setState({ showNewsletter: false }), 1000);
                } else if (result.status === 304) {
                    this.setState({ status: 1 });
                }
                writeCookie('subscribedNewsletter', true);
                this.setState({ isLoading: false });
            })
            .catch(error => {
                this.setState({ status: 3, isLoading: false });
            });
    }
    render() {
        let classes = 'newsletter ';
        if (!this.state.showNewsletter) {
            classes += 'newsletter--closed ';
        }
        classes += `newsletter--${this.state.messages[this.state.status].type}`;
        return (
            <section className={classes}>
                <button className="button newsletter__close-button" onClick={this.onToggleNewsletter.bind(this)}>
                    <IconClose size="28px" />
                </button>
                <h3 className="newsletter__title">{this.state.messages[this.state.status].title}</h3>
                <small className="newsletter__description">{this.state.messages[this.state.status].description}</small>
                {this.state.status === 0 &&
                    <form action="" onSubmit={this.onNewsletterSubmit.bind(this)}>
                        <div className="newsletter__input-wrapper">
                            <label htmlFor="news-name" className="newsletter__label">Name:</label>
                            <input
                                type="text"
                                id="news-name"
                                name="name"
                                className="newsletter__input"
                                required
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </div>
                        <div className="newsletter__input-wrapper">
                            <label htmlFor="news-email" className="newsletter__label">Email:</label>
                            <input
                                type="email"
                                id="news-email"
                                name="email"
                                className="newsletter__input"
                                required
                                onChange={this.handleInputChange.bind(this)}
                            />
                        </div>
                        <input
                            type="submit"
                            className="button newsletter__submit"
                            value={!this.state.isLoading ? 'Sign up' : ''}
                            style={this.state.isLoading && {backgroundImage: 'url("assets/images/loader.svg")'}}
                        />
                    </form>
                }
            </section>
        );
    }
}

export default Newsletter;
