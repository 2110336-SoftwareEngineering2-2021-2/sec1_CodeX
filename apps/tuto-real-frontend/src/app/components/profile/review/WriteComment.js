import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './WriteComment.css';
import { FULL_STAR, EMPTY_STAR } from '../../../constants/image';
import ModalTwoButton from '../../modal/ModalTwoButton';
import { useAuth } from '../../../auth';
import { client } from '../../../axiosConfig';

const WriteComment = (props) => {
  const { state, data, targetId, inReviewId, setReset } = props;

  const [commentState, setCommentState] = useState(state); //none, new, have, edit
  const [comment, setComment] = useState(state === 'have' ? data.comment : '');
  const [star, setStar] = useState(state === 'have' ? data.rating : 0);
  const [reviewId, setReviewId] = useState(state === 'have' ? inReviewId : '');
  const [showModal, setShowModal] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const numberOfStar = [1, 2, 3, 4, 5];
  const myId = useAuth();
  const translateDateFormat = (timeStamp) => {
    //2001-02-15T17:00:00.000+00:00
    //            to be
    //February 29, 2000 9:30 a.m."
    let temp = new Date(timeStamp);
    // console.log(new Date(timeStamp));
    var date = temp.getDate();
    var month = temp.getMonth();
    var year = temp.getFullYear();
    const monthName = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthName[month] + ' ' + date.toString() + ', ' + year.toString();
  };

  const translateTimeFormat = (timeStamp) => {
    let temp = new Date(timeStamp);
    // console.log(new Date(timeStamp));
    var hour = temp.getHours();
    var min = temp.getMinutes();
    return hour.toString() + ':' + min.toString();
  };

  const createStar = (number) => {
    return (
      <img
        alt={`star${number}`}
        key={`star${number}`}
        onClick={() => {
          if (commentState === 'new' || commentState === 'edit')
            setStar(number);
        }}
        src={star > number - 1 ? FULL_STAR : EMPTY_STAR}
        className={commentState === 'have' ? 'star-left' : 'star-right'}
      />
    );
  };

  const discardComment = () => {
    setCommentState('none');
    setComment('');
    setStar(0);
    // setShowModal(!showModal)
    setIsPending(!isPending);
  };

  const createReview = async () => {
    await client({
      method: 'POST',
      url: `/reviews`,
      data: {
        rating: star,
        comment: comment,
        tutorID: targetId,
        writerID: myId._id,
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(({ data: { data } }) => {
        console.log(data);
        setReviewId(data._id);
        setReset(true);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const updateReview = async () => {
    await client({
      method: 'PATCH',
      url: `/reviews`,
      params: {
        _id: reviewId,
      },
      data: {
        rating: star,
        comment: comment,
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(({ data: { data } }) => {
        console.log(data);
        setReset(true);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      {commentState === 'none' && (
        <Button
          onClick={() => setCommentState('new')}
          variant="success"
          style={{
            backgroundColor: 'var(--third)',
            borderColor: 'var(--third)',
            marginBottom: '2%',
          }}
        >
          Write your comment
        </Button>
      )}

      {commentState === 'new' && (
        <div className="info-card shadow">
          <p className="header" style={{ fontSize: 'larger' }}>
            Please fill the information
          </p>
          <hr style={{ margin: '0% 0%' }} />

          {/* star section */}
          <div style={{ display: 'flex', width: '100%' }}>
            <p className="header" style={{ width: '30%' }}>
              SCORE
            </p>
            {numberOfStar.map((number) => {
              return createStar(number);
            })}
          </div>
          <hr style={{ margin: '0% 0%' }} />

          {/* comment section */}
          <Form.Group style={{ display: 'flex', width: '100%' }}>
            <Form.Label
              style={{
                color: 'var(--darkgray)',
                margin: '1% 0%',
                width: '30%',
                textAlign: 'left',
              }}
            >
              COMMENT
            </Form.Label>
            <Form.Control
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              id="comment"
              style={{
                margin: '1% 0%',
                width: '70%',
                color: 'var(--darkgray)',
              }}
              as="textarea"
              placeholder="Write your comment here..."
            ></Form.Control>
          </Form.Group>
          <hr style={{ margin: '0% 0%' }} />

          {/* button group */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              onClick={() => {
                createReview();
                setCommentState('have');
              }}
              variant="success"
              style={{
                backgroundColor: 'var(--third)',
                borderColor: 'var(--third)',
                marginTop: '1%',
              }}
            >
              Post
            </Button>
            <Button
              onClick={() => {
                setCommentState('none');
                setComment('');
                setStar(0);
              }}
              id="cancel-button"
              variant="outline-dark"
              style={{
                marginTop: '1%',
                marginLeft: '1%',
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {commentState === 'have' && (
        <div className="info-card shadow">
          <div style={{ display: 'flex', width: '100%' }}>
            <div
              style={{ display: 'flex', flexDirection: 'column', width: '35%' }}
            >
              <p
                className="title"
                style={{
                  display: 'flex',
                  fontWeight: '500',
                  marginBottom: '0%',
                  width: '100%',
                }}
              >
                Your review
              </p>
              <p className="header" style={{ marginTop: '0%', width: '100%' }}>
                {`${translateDateFormat(
                  data.lastUpdated
                )} ${translateTimeFormat(data.lastUpdated)}
                `}
              </p>
            </div>
            <Button
              onClick={() => setCommentState('edit')}
              variant="success"
              style={{
                backgroundColor: 'var(--third)',
                borderColor: 'var(--third)',
                margin: '2% 0%',
                marginRight: '13.8%',
              }}
            >
              Edit your review
            </Button>
            {numberOfStar.map((number) => {
              return createStar(number);
            })}
          </div>
          <hr style={{ margin: '0% 0%' }} />
          <p className="header">{comment}</p>
        </div>
      )}

      {commentState === 'edit' && (
        <div className="info-card shadow">
          <p className="header" style={{ fontSize: 'larger' }}>
            Please fill the information
          </p>
          <hr style={{ margin: '0% 0%' }} />

          {/* star section */}
          <div style={{ display: 'flex', width: '100%' }}>
            <p className="header" style={{ width: '30%' }}>
              SCORE
            </p>
            {numberOfStar.map((number) => {
              return createStar(number);
            })}
          </div>
          <hr style={{ margin: '0% 0%' }} />

          {/* comment section */}
          <Form.Group style={{ display: 'flex', width: '100%' }}>
            <Form.Label
              style={{
                color: 'var(--darkgray)',
                margin: '1% 0%',
                width: '30%',
                textAlign: 'left',
              }}
            >
              COMMENT
            </Form.Label>
            <Form.Control
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              id="comment"
              style={{
                margin: '1% 0%',
                width: '70%',
                color: 'var(--darkgray)',
              }}
              as="textarea"
              placeholder="Write your comment here..."
            ></Form.Control>
          </Form.Group>
          <hr style={{ margin: '0% 0%' }} />

          {/* button group */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
            }}
          >
            {/* <Button
              onClick={() => {
                setShowModal(!showModal);
              }}
              variant="danger"
              style={{
                backgroundColor: 'red',
                borderColor: 'red',
                marginTop: '1%',
                marginRight: '47%',
              }}
            >
              Delete Comment
            </Button> */}
            <Button
              onClick={() => {
                updateReview();
                setCommentState('have');
                data.comment = comment;
                data.rating = star;
              }}
              variant="success"
              style={{
                backgroundColor: 'var(--third)',
                borderColor: 'var(--third)',
                marginTop: '1%',
              }}
            >
              Save Change
            </Button>
            <Button
              onClick={() => {
                setCommentState('have');
                setComment(data.comment);
                setStar(data.rating);
              }}
              id="cancel-button"
              variant="outline-dark"
              style={{
                marginTop: '1%',
                marginLeft: '1%',
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {showModal && (
        <ModalTwoButton
          title="Do you want to delete  your comment?"
          header="If you click confirm button, your comment will be permanently deleted."
          leftFunc={discardComment}
          rightFunc={() => setShowModal(!showModal)}
          leftMessage="confirm"
          rightMessage="cancel"
          leftColor="red"
          rightColor="cancel-button"
          isPending={isPending}
          leftPending="Deleteing..."
          leftPendingColor="var(--lightgray)"
        />
      )}
    </div>
  );
};

export default WriteComment;
