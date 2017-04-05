import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Profile from './github/Profile.jsx'
import Search from './github/Search.jsx'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '1312415',
            userData: [],
            userRepos: [],
            perPage: 5
        }
    }

    getUserData() {
        $.ajax({
            url: 'https://api.github.com/users/' + this.state.userName + '?client_id=' + this.defaultProps.clientId + '&client_secret=' + this.defaultProps.clientSecret,
            dataType: "json",
            cache: false,
            success: function (data) {
                this.setState({userData: data});
                console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({username: null});
                alert(err);
            }.bind(this)
        });
    }

    getUserRepos() {
        console.log('https://api.github.com/users/' + this.state.userName + '/repos?per_pages=' + this.state.perPage + '&client_id=' + this.defaultProps.clientId + '&client_secret=' + this.defaultProps.clientSecret + '&sort=created');
        $.ajax({
            url: 'https://api.github.com/users/' + this.state.userName + '/repos?per_pages=' + this.state.perPage + '&client_id=' + this.defaultProps.clientId + '&client_secret=' + this.defaultProps.clientSecret + '&sort=created',
            dataType: "json",
            cache: false,
            success: function (data) {
                this.setState({userRepos: data});
                console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({username: null});
                alert(err);
            }.bind(this)
        });
    }

    componentDidMount() {
        this.getUserData();
        this.getUserRepos();
    }
    onFormSubmit(username){
        this.setState({userName: username}, function () {
            this.getUserData();
            this.getUserRepos();
        });
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

App.prototype.defaultProps = {
    clientId: '0062ed2eb433c06cbf1c',
    clientSecret: '06b64266d8f7a23c9e5f8de9f1255d150d855890'
};

export default  App;