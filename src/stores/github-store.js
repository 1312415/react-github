import {EventEmitter} from "events";
import Dispatcher from "../dispatcher/github-dispatcher";

class GithubStore extends EventEmitter {
    constructor() {
        super();
        this.user = {
            userName: '1312415',
            userData: [],
            userRepos: [],
            perPage: 5
        };
        this.defaultProps = {
            clientId: '0062ed2eb433c06cbf1c',
            clientSecret: '06b64266d8f7a23c9e5f8de9f1255d150d855890'
        };
    }

    getUserData() {
        $.ajax({
            url: 'https://api.github.com/users/' + this.user.userName + '?client_id=' + this.defaultProps.clientId + '&client_secret=' + this.defaultProps.clientSecret,
            dataType: "json",
            cache: false,
            async: false,
            success: function (data) {
                this.user.userData = data;
            }.bind(this),
            error: function (xhr, status, err) {
                this.user.userData = null;
                alert(err);
            }.bind(this)
        });
    }

    getUserRepos() {
        $.ajax({
            url: 'https://api.github.com/users/' + this.user.userName + '/repos?per_pages=' + this.user.perPage + '&client_id=' + this.defaultProps.clientId + '&client_secret=' + this.defaultProps.clientSecret + '&sort=created',
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                this.user.userRepos = data;
            }.bind(this),
            error: function (xhr, status, err) {
                this.user.userRepos = null;
                alert(err);
            }.bind(this)
        });
    }

    changeUser(username){
        this.user.userName = username;
        this.getUserData();
        this.getUserRepos();
        this.emit('change');
    }

    getUser() {
        this.getUserData();
        this.getUserRepos();
        return this.user;
    }
}
var githubStore = new GithubStore();
Dispatcher.register(function (action) {
   switch (action.type){
       case "CHANGE_USER": {
           githubStore.changeUser(action.text);
       }
   }
});
module.exports = githubStore;