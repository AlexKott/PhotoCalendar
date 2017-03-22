import React from 'react';
import Quill from 'quill';

class Comments extends React.Component {
    componentDidMount() {
        const quill = new Quill('#editor', { theme: 'snow' });
    }
    render() {
        const {
            isCommentsActive,
            comments,
            onToggleComments
        } = this.props;
        return (
            <div>
                <div className="comment__header" onClick={() => onToggleComments()}>
                    <h2>{comments.length} Comments</h2>
                </div>
                <div className={isCommentsActive ? "comment__list" : "hidden"}>
                    {comments.map((comment, index) => (
                        <div className="comment" key={index}>
                            <p>{comment.authorName} says:</p>
                            <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                        </div>
                    ))}
                </div>
                <div className={isCommentsActive ? "comment__form" : "hidden"}>
                    <span>Have something to say?</span>
                    <label>
                        <span>Your Name: </span>
                        <input></input>
                    </label>
                    <label>
                        <span>Your Email: </span>
                        <input></input>
                    </label>
                    <div className="comment__editor">
                        <div id="editor"></div>
                    </div>
                    <button>Send</button>
                </div>
            </div>
        );
    }
}

export default Comments;
