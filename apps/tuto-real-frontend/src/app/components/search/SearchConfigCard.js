import COLORS from '../../constants/color';
import './search.css'
import {MdSearch} from 'react-icons/md'
import { Form } from 'react-bootstrap';
import SearchFilter from './SearchFilter';
// import FilterModal from './FilterModal';
// import FilterModal from './FilterModal';

const SearchConfigCard = ({searchInfo, setSearchInfo, onClickFilterButton}) => {
    return (
        <div style={{padding:"6px"}}>
            <div className="search-page-card" style={{marginBottom:"20px"}}>
                <div style={{width:"100%", display:"flex", flexDirection:"row"}}>
                    <div style={{width:"100%", 
                        backgroundColor:COLORS.gray, 
                        borderRadius:"4px", 
                        marginRight:"10px", 
                        padding:"3px 10px",
                        display:"flex",
                        alignItems:"center"
                    }}>
                        <MdSearch color={COLORS.darkgray} style={{marginRight:"2px"}} />
                        <input 
                            type="text" 
                            placeholder='Search to find your interested tutor.' 
                            style={{margin:"0px"}} 
                            value={searchInfo.searchText}
                            onChange={(e) => {
                                setSearchInfo({
                                    ...searchInfo,
                                    searchText: e.target.value
                                })
                            }}
                            />
                    </div>
                    <button 
                        className='add-filter-button' 
                        type='button'
                        onClick={onClickFilterButton}
                        >
                        Add filter
                    </button>
                </div>
                <div style={{display:"flex", flexDirection:"row", marginTop:"10px"}}>
                    <Form.Select style={{width:"35%", marginRight:"10px"}}>
                        <option value="rating">Sort by rating</option>
                    </Form.Select>
                    <Form.Select style={{width:"25%"}}>
                        <option value="Ascending">Ascending</option>
                        <option value="Descending">Descending</option>
                    </Form.Select>
                </div>
            </div>
            {/* <SearchFilter
                show={filterShow}
                setShow={setFilterShow}
            /> */}
        </div>
    )
}

export default SearchConfigCard;