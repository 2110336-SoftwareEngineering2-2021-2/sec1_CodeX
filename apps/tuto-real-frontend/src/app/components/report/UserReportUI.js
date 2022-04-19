import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { RiImageAddFill } from 'react-icons/ri';

import { client } from '../../axiosConfig';
import COLORS from '../../constants/color';

class UserReportUI extends React.Component {
  constructor(props) {
    // props = { show, closeModal, targetName, targetId, reporterId } //
    super(props);
    this.state = {
      image: undefined,
      text: '',
    };
    this.uploadRef = React.createRef();
    this.upload = this.upload.bind(this);
  }

  toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  createReport = async (reporterId, targetId, text, reportImg) => {
    const reportImg64 = reportImg
      ? (await this.toBase64(reportImg)).substr(
          reportImg.type === 'image/jpeg' ? 23 : 22
        )
      : undefined;

    await client({
      method: 'POST',
      url: `/report`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: { reporterId, targetId, text, reportImg: reportImg64 },
    })
      .then(({ data: { data } }) => {
        console.log(data);
        this.onClose();
        alert(`Successfully report ${this.props.targetName}`);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  upload = () => {
    this.uploadRef.current.click();
  };

  handleFileUpload = async (e) => {
    const file = await e.target.files[0];
    console.log(file);
    if (file) this.setState({ ...this.state, image: file });
  };

  onSubmitReport = async () => {
    const { targetId, reporterId } = this.props;
    const { image, text } = this.state;
    console.log({ reporterId, targetId, text, image });
    if (text) await this.createReport(reporterId, targetId, text, image);
    else alert('Please enter report information.');
  };

  onClose = () => {
    this.setState({ image: undefined, text: '' });
    this.props.closeModal();
  };

  render() {
    const { image } = this.state;
    const { show, targetName } = this.props;
    return (
      <Modal show={show} onHide={this.onClose}>
        <Modal.Header closeButton>
          <div>
            <Modal.Title>Report</Modal.Title>
            {targetName ? (
              <>
                <span>{'reporting '}</span>
                <Form.Label style={{ color: 'red' }}>{targetName}</Form.Label>
              </>
            ) : null}
          </div>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Label>REPORT DETAILS</Form.Label>

            {/* Image Upload Section */}
            <Form.Group
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0% 0% 5% 0%',
                padding: '8% 0%',
                border: '1px dashed',
                borderRadius: '4px',
                borderColor: COLORS.darkgray,
              }}
            >
              <div style={{ marginBottom: '5%' }}>
                {image ? (
                  <img
                    alt="report-detail"
                    src={URL.createObjectURL(image)}
                    style={{
                      minWidth: '5vw',
                      maxWidth: '35vw',
                      maxHeight: '35vh',
                    }}
                  />
                ) : (
                  <RiImageAddFill size={48} />
                )}
              </div>
              <input
                ref={this.uploadRef}
                onChange={this.handleFileUpload}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                style={{ display: 'none' }}
              />
              <Button variant="outline-secondary" onClick={this.upload}>
                Upload Image
              </Button>
            </Form.Group>

            {/* Text Section */}
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter report information here..."
              style={{ resize: 'none' }}
              onChange={(e) =>
                this.setState({ ...this.state, text: e.target.value })
              }
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={this.onClose}>
            Close
          </Button>
          <Button
            variant="warning"
            style={{ color: 'white' }}
            onClick={this.onSubmitReport}
          >
            Send Report
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UserReportUI;
