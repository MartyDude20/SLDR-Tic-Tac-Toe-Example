import React from 'react';
import Row from 'react-bootstrap/Row';
import Game from './game';

//
export default class NameInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name1: '', name2: '', isSumbitted: false };
        this.handleName1Change = this.handleName1Change.bind(this);
        this.handleName2Change = this.handleName2Change.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName1Change(event) {
        this.setState({ name1: event.target.value });
    }

    handleName2Change(event) {
        this.setState({ name2: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ isSumbitted: true });
    }

    render() {


        const isSumbitted = this.state.isSumbitted;
        let content;
        if (isSumbitted) {
            content = <Game name1={this.state.name1} name2={this.state.name2} newGame={false}/>;
        }
        else {
            content = (
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <label>
                            Name 1:
                            <input type="text"
                                value={this.state.name1}
                                onChange={this.handleName1Change}
                            />
                        </label>
                    </Row>
                    <Row>
                        <label>
                            Name 2:
                            <input type="text"
                                value={this.state.name2}
                                onChange={this.handleName2Change}
                            />
                        </label>
                    </Row>
                    <Row>
                        <input type="submit" value="Submit" />
                    </Row>

                </form>
            );
        }
        return <div>{content}</div>
    }
}
