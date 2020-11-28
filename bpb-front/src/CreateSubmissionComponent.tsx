import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { store } from './store';
import createSubmission from './actions/SubmissionAction';
import Assignment from './types/Assignment';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
//import { createSubmission } from './actions/SubmissionAction';

interface PropsType {
  name: string
  files : JSON[]
}

const propsUpload = {
  name: 'file',
  multiple: true,
  onChange(info : any) {
    const { status } = info.file;
    // if (status === 'done') {
    //   message.success(`${info.file.name} file uploaded successfully.`);
    // } else if (status === 'error') {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
  },
};

class CreateSubmissionComponent extends React.Component <PropsType, {}> {
    constructor(props : PropsType) {
        super(props);
        this.state = {
          name: this.props.name,
          files : this.props.files
        };
        this.onInputchange = this.onInputchange.bind(this);
  }

  onInputchange(event : ChangeEvent<HTMLInputElement>) {
    this.setState({
        [event.target.name]: event.target.value,
    });
  }

  callDispatch() {
    store.dispatch(createSubmission('UPLOAD_SUBMISSION', this.props.name, store.getState().AssignmentReducer.currentAssignment, this.props.files))
  }

  render() {
    return (
        <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            <div style={{textAlign: 'right', paddingRight: '100px', paddingTop: '30px', fontWeight: 'bolder'}}>
                <Link className="btn btn-outline-danger mt-2" to="/">
                  x 
                </Link>
            </div>
            <h3>Upload Submission to Assignment {store.getState().AssignmentReducer.currentAssignment.name}</h3>
            <br/>
            <span text-align="center">
                <h5>Submission Name:</h5>
                <input name="name" className='assignment-name-input' type="text" value={this.props.name} onChange={this.onInputchange}/>
                <Upload {...propsUpload}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                      Support for single file upload or bulk upload. 
                    </p>
                </Upload>      
                <br/>
                <Link className='create-assignment-btn btn btn-outline-success mt-2'
                    to="/"
                    onClick={() => this.callDispatch()}>
                    Upload Submission
                </Link>
            </span>
        </div>
    );
}
}

export default CreateSubmissionComponent;