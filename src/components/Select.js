import React from 'react';

class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { value: 'Select an Option'};
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const {label, options} = this.props;
    return (
      <div className="form-group">
        <label htmlFor="select2">{label}</label>
        <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
          {options.map(option => {
            return <option value={option} key={option} >{option}</option>
          })}
        </select>
      </div>
      
    )
  }
}

export default SelectBox;