import React from 'react';
import { Spinner } from 'react-bootstrap';

import './report.css';
import { client } from '../../axiosConfig';
import UserBannedCard from './UserBannedCard';
import ConfirmUnbanModal from './ConfirmUnbanModal';
import BannnedUserDetailModal from './BannnedUserDetailModal';

import COLORS from '../../constants/color';
import { DESK } from '../../constants/image';

class AdminUnBanUI extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      isLoading: false,
      // loadingReportInfo: false,
      isSomethingWentWrong: false,
      // showInfoModal: false,
      // showConfirmUnbanModal: false,
      showModal: 'none', // none, info, confirm
      confirmModalStatus: 'normal', // normal, sending, success, fail
      userBannedList: [
        // {
        // _id: "hosehfegnlnlbnldnbldlfm",
        // firstName: "Veerin",
        // lastName: "Juurek",
        // timeStamp: "2022-04-04T18:00:33.538+00:00",
        // },
      ],
      focusUser: null,
      userReportList: [
        // { imageUrl, reporterId, targetId, text, _id }
      ],
    };
  }

  componentDidMount() {
    this.fetchBannedList();
  }

  fetchBannedList = async () => {
    this.setState({
      isLoading: true,
      isSomethingWentWrong: false,
    });
    await client({
      method: 'GET',
      url: `/punishment`,
    })
      .then(({ data: { data } }) => {
        console.log(data);
        this.setState({
          userBannedList: data,
          isLoading: false,
          isSomethingWentWrong: false,
        });
      })
      .catch((res) => {
        console.log(res);
        this.setState({
          isLoading: false,
          isSomethingWentWrong: true,
        });
      });
  };

  onClickUnbanButton = async (target_id) => {
    console.log(target_id);
    this.setState({
      isLoading: true,
      isSomethingWentWrong: false,
      confirmModalStatus: 'sending',
    });
    await client({
      method: 'PATCH',
      url: `/punishment/unban`,
      params: { target_id },
    })
      .then(({ data: { data } }) => {
        console.log(data);
        this.setState({
          userBannedList: this.state.userBannedList.filter(
            (user) => user._id !== data._id
          ),
          showModal: 'none',
          isLoading: false,
          isSomethingWentWrong: false,
          confirmModalStatus: 'success',
        });
      })
      .catch((res) => {
        console.log(res);
        this.setState({
          showModal: 'none',
          isLoading: false,
          isSomethingWentWrong: true,
          confirmModalStatus: 'fail',
        });
      });
  };

  getReportFromUser = async (userId) => {
    // this.setState({ loadingReportInfo: true, isSomethingWentWrong: false });
    this.setState({ isLoading: true, isSomethingWentWrong: false });
    await client({
      method: 'GET',
      url: `/report`,
      params: { _id: userId },
    })
      .then(({ data: { data } }) => {
        console.log(data);
        this.setState({
          // loadingReportInfo: false,
          isLoading: false,
          showModal: 'info',
          userReportList: data,
        });
      })
      .catch((res) => {
        console.log(res);
        this.setState({
          // loadingReportInfo: false,
          isLoading: false,
          showModal: 'none',
          isSomethingWentWrong: true,
        });
      });
  };

  onViewInfo = async (userId) => {
    this.setState({ confirmModalStatus: 'normal' });
    await this.getReportFromUser(userId);
  };

  onClickUnbanBtn = (user) => {
    this.setState({ focusUser: user, showModal: 'confirm' });
  };

  render() {
    return (
      <div className="ban-unban-container">
        {this.state.isLoading ? (
          <div
            className="loading_spinner"
            style={{ marginBottom: '20px', width: '100%', height: 'auto' }}
          >
            <Spinner
              animation="border"
              role="status"
              style={{ marginBottom: '2vh' }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h4 style={{ color: COLORS.darkgray }}>Loading</h4>
          </div>
        ) : (
          <div className="card-list-container">
            {this.state.isSomethingWentWrong ? (
              <p
                style={{
                  color: 'red',
                  fontSize: '24px',
                  marginTop: '10vh',
                  fontWeight: '500',
                }}
              >
                Oop!!? Something went wrong.
              </p>
            ) : (
              <>
                {this.state.userBannedList.length === 0 && (
                  <div id="place-hover-empty-image">
                    <img alt="NoBannedUser" src={DESK} />
                    <p>We don't have any banned user</p>
                  </div>
                )}
                {this.state.userBannedList.map((user) => (
                  <UserBannedCard
                    name={user.firstName + ' ' + user.lastName}
                    timeStamp={user.unbanDate}
                    key={user._id}
                    onClickUnBanBtn={() => this.onClickUnbanBtn(user)}
                    onClickCard={() => this.onViewInfo(user._id)}
                  />
                ))}
              </>
            )}
          </div>
        )}

        <ConfirmUnbanModal
          show={this.state.showModal === 'confirm'}
          onHide={() => this.setState({ showModal: 'normal' })}
          onClickConfirmBtn={() =>
            this.onClickUnbanButton(this.state.focusUser?._id)
          }
          status={this.state.confirmModalStatus}
          targetName={`${this.state.focusUser?.firstName} ${this.state.focusUser?.lastName}`}
        />

        <BannnedUserDetailModal
          show={this.state.showModal === 'info'}
          reportList={this.state.userReportList}
          onUnban={() => this.setState({ showModal: 'confirm' })}
          onClose={() => this.setState({ showModal: 'none' })}
        />
      </div>
    );
  }
}

export default AdminUnBanUI;
