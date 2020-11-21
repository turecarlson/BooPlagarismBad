import React from 'react';
import SubmissionListItemComponent from './SubmissionListItemComponent'
import Submission from './types/Submission'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { stateToPropertyMapper } from './containers/SubmissionListContainer';
import SubmissionReducer from './reducers/SubmissionReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import ComparisonReducer from './reducers/ComparisonReducer';
import {store} from './index'

interface PropsType {
  submissions: Submission[]
  compareEnabled: number
}

class SubmissionListComponent extends React.Component <PropsType, {}> {

  constructor(props) {
    super(props);
    this.state = {
      submissions : [],
      compareEnabled: 0
    };
  }

  setDisabled() {
    if (store.getState().ComparisonReducer.compareSubmissions.length <= 2) {
      console.log('setdisabled')
      let newNum = this.props.compareEnabled + 1
      this.setState({
        compareEnabled: newNum
      })
    } 
  }

  render() {
    console.log(store.getState().ComparisonReducer.compareSubmissions.length)
    
    return (
      <div className='submission-list' onClick={() => this.setDisabled()}>
        <h3>Assignment</h3>
        <Link to='/CreateSubmissionComponent'>Upload Submission</Link>
        <ul>
          {this.props.submissions.map((submission, index) => 
            <li key={index}><SubmissionListItemComponent submission={submission} createSubmission={null}/></li>
          )}
        </ul>

        {
          store.getState().ComparisonReducer.compareSubmissions.length === 0 &&
            <Link to="/ComparisonComponent" className="disabledCompareButton" onClick={ (event) => event.preventDefault() }>
            Compare Submissions {store.getState().ComparisonReducer.compareSubmissions.length}/2</Link>
        } 
        {
          store.getState().ComparisonReducer.compareSubmissions.length === 1 &&
            <Link to="/ComparisonComponent" className="disabledCompareButton" onClick={ (event) => event.preventDefault() }>
            Compare Submissions {store.getState().ComparisonReducer.compareSubmissions.length}/2</Link>
        }
        { 
          store.getState().ComparisonReducer.compareSubmissions.length === 2 &&
            <Link to="/ComparisonComponent" className="enabledCompareButton">Compare Submissions 
            {store.getState().ComparisonReducer.compareSubmissions.length}/2</Link>
        }
      </div>
    );
  }
}

export default SubmissionListComponent;