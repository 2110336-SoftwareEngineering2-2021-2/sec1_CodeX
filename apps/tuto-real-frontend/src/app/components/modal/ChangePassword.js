import React, { useState } from 'react';
// import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, } from 'react-native';
//import { TestComponent, PhoneButton } from './../components/AppComponents';
// import * as firebase from 'firebase';
import { Button, Modal, Form } from 'react-bootstrap';
import './ChangePassword.css';

// export default class TestScreen extends React.Component {
//   static navigationOptions = {
//     header: null,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       currentPassword: "",
//       newPassword: "",
//       newEmail: "",
//     };
//   }

  // Changes user's password...
  // onChangePasswordPress = () => {
  //   this.reauthenticate(this.state.currentPassword).then(() => {
  //     var user = firebase.auth().currentUser;
  //     user.updatePassword(this.state.newPassword).then(() => {
  //       Alert.alert("Password was changed");
  //     }).catch((error) => { console.log(error.message); });
  //   }).catch((error) => { console.log(error.message) });
  // }
// const styles = StyleSheet.create({
//   text: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 20, },
//   textInput: { borderWidth:1, borderColor:"gray", marginVertical: 20, padding:10, height:40, alignSelf: "stretch", fontSize: 18, },
// });

const ChangePassword = (props) => {
  const {show, setShow} = props;
  // const [show, setShow] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Modal className= "change-password" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <h4>Change your password</h4>
      </Modal.Header>

      <Modal.Body style={{paddingBottom:"0px"}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h6>OLD PASSWORD</h6>
          <Form.Control className='textInput' value={currentPassword}
          type="password"
          placeholder="Enter your old password." autoCapitalize="none" secureTextEntry={true}
          onChange ={(e) => { setCurrentPassword(e.target.value) }}
        />
        </Form.Group>
      </Modal.Body>
      <hr/>
      <Modal.Body style={{paddingBottom:"0px"}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h6>NEW PASSWORD</h6>
          <Form.Control 
            className='textInput' 
            type="password"
            value={newPassword}
            placeholder="Enter your new password." 
            autoCapitalize="none" 
            secureTextEntry={true}
            onChange ={(e) => { setNewPassword(e.target.value) }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <h6>CONFIRM NEW PASSWORD</h6>
          <Form.Control className='textInput' value={confirmPassword}
            placeholder="Enter your new password again." autoCapitalize="none" secureTextEntry={true}
            onChange ={(e) => { setConfirmPassword(e.target.value) }}
            type="password"
          />
        </Form.Group>
        {/* <Button title="Change Password" onPress={this.onChangePasswordPress} /> */}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button className='confirm-button' onClick={handleClose}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePassword;

  
// render(<changePassword />);
