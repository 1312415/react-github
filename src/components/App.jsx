import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Profile from './github/Profile.jsx'
import Search from './github/Search.jsx'
import GitHubStore from '../stores/github-store';
import GithubAction from '../actions/github-action';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = GitHubStore.getUser();
        console.log(this.state);
    }
    ChangeUser(){
        this.setState(GitHubStore.getUser())
    }
    componentDidMount() {
        GitHubStore.on('change',this.ChangeUser.bind(this));
    }
    componentWillUnmount(){
        GitHubStore.removeListener("change",this.ChangeUser.bind(this))
    }
    onFormSubmit(username){
        GithubAction.changeUser(username);
    }
    render() {
        return (
            <div>
                <Search onFormSubmit = {this.onFormSubmit.bind(this)}/>
                <Profile {...this.state}/>
            </div>
        )
    }
}



export default  App;