import {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import './WriteComment.css'
import { FULL_STAR } from '../../../constants/image'
import { EMPTY_STAR } from '../../../constants/image'

const WriteComment = (props) => {
    const {state, data} = props

    const [commentState,setCommentState] = useState(state) //none, new, have, edit
    const [comment,setComment] = useState(state === 'have' ? data.comment: '');
    const [star,setStar] = useState(state === 'have' ? data.rating: 0);
    const numberOfStar = [1,2,3,4,5];

    const createStar = (number) => {
        return (
            <img 
                alt={`star${number}`} 
                key={`star${number}`} 
                onClick={() => {
                    if(commentState === 'new') setStar(number);
                }} 
                src={star>number-1 ? FULL_STAR: EMPTY_STAR} 
                className='star'
            />)
    }


  return (
    <div>
        {commentState === 'none' && (
            <Button onClick={() => setCommentState('new')} variant='success' style={{backgroundColor: 'var(--third)', borderColor: 'var(--third)'}}>
                Write your comment
            </Button>
        )}

        {commentState === 'new' && (
            <div className='info-card shadow'>

                <p className='header' style={{fontSize: 'larger'}}>Please fill the information</p>
                <hr style={{margin: '0% 0%'}}/>

                {/* star section */}
                <div style={{display: 'flex', width: '100%'}}>
                    <p className='header' style={{width: '30%'}} >SCORE</p>
                    {numberOfStar.map((number) => {
                        return createStar(number);
                    })}
                </div>
                <hr style={{margin: '0% 0%'}}/>

                {/* comment section */}
                <Form.Group style={{display: 'flex', width: '100%'}}>
                    <Form.Label style={{ color: 'var(--darkgray)', margin: '1% 0%', width: '30%', textAlign: 'left' }}>
                        COMMENT
                    </Form.Label>
                    <Form.Control
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        id='comment'
                        style={{margin: '1% 0%', width: '70%', color: 'var(--darkgray)'}}
                        as='textarea'
                        placeholder='Write your comment here...'
                    >

                    </Form.Control>
                </Form.Group>
                <hr style={{margin: '0% 0%'}}/>

                {/* button group */}
                <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
                    <Button 
                        onClick={() => {
                            console.log(star);
                            console.log(comment);
                        }}
                        variant='success' 
                        style={{
                            backgroundColor: 'var(--third)', 
                            borderColor: 'var(--third)', 
                            marginTop: '1%'
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
                        id='cancel-button'
                        variant='outline-dark' 
                        style={{
                            marginTop: '1%',
                            marginLeft: '1%'
                        }}
                    >
                        Discard
                    </Button>
                </div>
                
            </div>
        )}

        {commentState === 'have' && (
            numberOfStar.map((number) => {
                return createStar(number);
            })
        )}
    </div>
  )
}

export default WriteComment