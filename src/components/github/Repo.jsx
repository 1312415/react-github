import React, {Component} from 'react';

class Repo extends Component {
    render() {
        if(this.props.repo.description === null)
        {
            return (
                <li className="list-group-item">
                    <a href={this.props.repo.html_url}>
                        {this.props.repo.name}
                    </a> : (no description)
                </li>
            )
        } else{
            return (
                <li className="list-group-item">
                    <a href={this.props.repo.html_url}>
                        {this.props.repo.name}
                    </a> : {this.props.repo.description}
                </li>
            )
        }

    }
}

export default  Repo