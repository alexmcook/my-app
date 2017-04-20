// react imports
import React from 'react';

// material-ui imports
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin'; // Required for material-ui RaisedButton
injectTapEventPlugin();                                    // Required for material-ui RaisedButton
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';

// other imports
import * as Program from './Program.js';

// css imports
import './css/bootstrap.css';

class ProgramInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentES: "",
      flatES: "",
      percentBlock: "",
      iLvl: ""
    }
    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(e) {
    this.props.onUpdate(
      this.state.percentES,
      this.state.flatES,
      this.state.percentBlock,
      this.state.iLvl
    );
  };

  render() {
    return (
      <div>
        <TextField type="text" name="PercentES" value={this.state.percentES} onChange={e => this.setState({percentES: e.target.value})} floatingLabelText="Percent ES" /><br />
        <TextField type="text" name="FlatES" value={this.state.flatES} onChange={e => this.setState({flatES: e.target.value})} floatingLabelText="Flat ES" /><br />
        <TextField type="text" name="PercentBlock" value={this.state.percentBlock} onChange={e => this.setState({percentBlock: e.target.value})} floatingLabelText="Percent Block" /><br />
        <TextField type="text" name="ILvl" value={this.state.iLvl} onChange={e => this.setState({iLvl: e.target.value})} floatingLabelText="iLvl" /><br />
        <RaisedButton label="Submit" primary={true} onClick={this.handleChange} />
        <p></p>
      </div>
    );
  };
}

class ProgramOutput extends React.Component {
  render() {
    var items = Program.display(this.props.percentES, this.props.flatES, this.props.percentBlock, this.props.iLvl).map(function(item, index) {
          return (
            <TableRow key={index}>
              <TableRowColumn>{item.percentESTier}</TableRowColumn>
              <TableRowColumn>{item.hybridESTier}</TableRowColumn>
              <TableRowColumn>{item.flatESTier}</TableRowColumn>
              <TableRowColumn>{item.blockTier}</TableRowColumn>
            </TableRow>
          );
        });
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Percent ES Tier</TableHeaderColumn>
            <TableHeaderColumn>Hybrid ES Tier</TableHeaderColumn>
            <TableHeaderColumn>Flat ES Tier</TableHeaderColumn>
            <TableHeaderColumn>Block Tier</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {items}
        </TableBody>
      </Table>
    );
  };
}

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentES: null,
      flatES: null,
      percentBlock: null,
      iLvl: null
    };
    this.onUpdate = this.onUpdate.bind(this);
    this.setState = this.setState.bind(this);
  };

  onUpdate(percentES, flatES, percentBlock, iLvl) {
    this.setState({
      percentES: percentES,
      flatES: flatES,
      percentBlock: percentBlock,
      iLvl: iLvl
    });
  };

  render() {
    return (
      <div>
        <div className="col-md-2 col-md-offset-2">
          <ProgramInput onUpdate={this.onUpdate} />
        </div>
        <div className="col-md-6">
          <ProgramOutput percentES={this.state.percentES} flatES={this.state.flatES} percentBlock={this.state.percentBlock} iLvl={this.state.iLvl} />
        </div>
      </div>
    );
  };
}

class App extends React.Component {
  render() {
    return (
      <Wrapper />
    );
  };
}

export default App;
