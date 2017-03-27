import React from 'react';
import Quill from 'quill';

import { getDisplayDay } from '../_helpers/dateHelper.js';

class Comments extends React.Component {
    componentDidMount() {
        const quillEditor = new Quill('#editor', {
            theme: 'snow',
            modules: {
                toolbar: ['bold', 'italic', 'underline', 'link']
            },
            placeholder: 'Write your comment here'
        });
        this.props.onSetQuillEditor(quillEditor);
    }
    render() {
        const {
            comments,
            onToggleComments,
            onChangeName,
            onChangeEmail,
            onSendComment
        } = this.props;
        const commentsTitle = comments.length === 1 ? '1 comment' : `${comments.length} comments`;
        return (
            <div id="comments">
                <h2 className="comment__header">{commentsTitle}</h2>

                <div className="comment__list">
                    {comments.map((comment, index) => (
                        <div className="comment" key={index}>
                            <div className="comment__info">
                                <p><strong>{comment.authorName}</strong></p>
                                <p><small>{getDisplayDay(comment.createdAt)}</small></p>
                            </div>
                            <div
                                className="comment__content"
                                dangerouslySetInnerHTML={{ __html: comment.content }}
                            />
                        </div>
                    ))}
                    <div className="comment">
                        <div className="comment__info">
                            <div className="comment__info-box">
                                <label
                                    className="comment__info-label"
                                    htmlFor="comment-name"
                                >Name</label>
                                <input
                                    id="comment-name"
                                    className="comment__info-input"
                                    onChange={(event) => onChangeName(event.target.value)}
                                    type="text"
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="comment__info-box">
                                <label
                                    className="comment__info-label"
                                    htmlFor="comment-email"
                                >E-Mail</label>
                                <input
                                    id="comment-email"
                                    className="comment__info-input"
                                    onChange={(event) => onChangeEmail(event.target.value)}
                                    type="email"
                                    placeholder="your-name@email.com"
                                />
                            </div>
                            <p><button onClick={() => onSendComment()}>Send</button></p>
                        </div>
                        <div className="comment__content comment__editor">
                            <div id="editor"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comments;
