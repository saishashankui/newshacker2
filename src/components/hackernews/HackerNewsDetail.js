import React from 'react';
import './HackerNewsStyles.css';

class HackerNewsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { comments: [] };
    }
    componentDidMount() {
        this.props.location.storyView.kids.forEach(element => {

            const apiUrl = `https://hacker-news.firebaseio.com/v0/item/${element}.json`;
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) =>
                    this.setState(state => ({
                        comments: [...state.comments, data]
                    }))
                )

        })
    }
    render() {
        return (
            <div>
                <header className="masthead clear">
                    <div className="centered">
                        <div className="site-branding">
                            <h1 className="site-title">{this.props.location.storyView.title}</h1>
                            <p>Top 20 Comments</p>
                        </div>
                    </div>
                </header>
                <ol>
                    {this.state.comments.slice(0, 20).map(function (commentView, index) {
                        return <li key={index} className='comment-row'>
                            <div className='comment-author'>{commentView.by}</div>
                            <p className="m-0">
                                {new Date(commentView.time * 1000).toDateString()}
                            </p>
                            <div className="comment-body"><div dangerouslySetInnerHTML={{ __html: commentView.text }}></div></div>
                        </li>
                    })}
                </ol>
            </div>
        )
    }
}

export default HackerNewsDetail;