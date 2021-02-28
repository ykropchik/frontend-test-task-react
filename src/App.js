import './index.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Main from './pages/main'
import Orders from './pages/orders'

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Main} exact/>
                <Route path='/orders' component={Orders}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;