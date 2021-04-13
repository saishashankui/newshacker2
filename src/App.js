import { HashRouter, Route } from 'react-router-dom';
import HackerNews from './components/hackernews/HackerNews';
import HackerNewsDetail from './components/hackernews/HackerNewsDetail';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <div>
          <Route exact path="/" component={HackerNews} />
          <Route exact path="/story/:component" component={HackerNewsDetail} />
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
