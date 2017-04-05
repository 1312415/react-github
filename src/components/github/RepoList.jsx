import React, {Component} from 'react';
import Repo from './Repo.jsx';

class RepoList extends Component {
    render() {
        return (
            <div className="panel panel-default">
                <ul className="list-group">
                    hello
                    {
                        this.props.userRepos.map(function (repo) {
                            return <Repo repo = {repo} key={repo.id}  />
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default  RepoList