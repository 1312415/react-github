import dispatcher from '../dispatcher/github-dispatcher';

function changeUser(text) {
    dispatcher.dispatch({
        type: 'CHANGE_USER',
        text
    })
}

module.exports = {
    changeUser
};