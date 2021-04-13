import React from 'react';
import { Link } from 'react-router-dom';
import './HackerNewsStyles.css';

class HackerNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = { stories: [] };
    }
    async componentDidMount() {
        try {
            const apiUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
            await fetch(apiUrl)
                .then((response) => response.json())
                .then((data) =>
                    data.slice(0, 10).map((story) => (
                        fetch(`https://hacker-news.firebaseio.com/v0/item/${story}.json`)
                            .then((response) => response.json())
                            .then((data) =>
                                this.setState(state => ({
                                    stories: [...state.stories, data]
                                }))
                            )
                    ))
                )
        } catch (err) {
            // console.error(err);
        }
    }
    render() {
        return (
            <div>
                <header className="masthead clear">
                    <div className="centered">
                        <div className="site-branding">
                            <h1 className="site-title">Hacker News</h1>
                            <p>Top 10 Stories</p>
                        </div>
                    </div>
                </header>
                <main className="main-area">
                    <div className="centered">
                        <section className="cards">


                            {this.state.stories.map(function (storyView, index) {
                                return <article key={`${index}_key`} className="card">
                                    <h2>
                                        <Link key={`${index}_link`} to={{ pathname: `story/${storyView.id}`, storyView: storyView }} >
                                            <div className="card-content" key={`${index}_cc`} >{storyView.title}</div>
                                            <p key={`${index}_date`} className="m-0">
                                                {new Date(storyView.time * 1000).toDateString()}
                                            </p>
                                        </Link>
                                    </h2>
                                </article>
                            })}
                        </section>
                    </div>
                </main>
            </div>
        )
    }
}
export default HackerNews;