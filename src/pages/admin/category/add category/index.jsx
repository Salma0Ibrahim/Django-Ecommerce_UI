import './addcategorystyle.css';
import { addCategoryAction } from '../../../../redux/action/categoryaction';
import {useDispatch} from 'react-redux'
import { useState } from 'react';
import { toast } from 'react-toastify';

const AddCategoryManagement = () => {
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState('');

    const handleAddCategory = (e) => {
        e.preventDefault();
        let formdata = {
            id : 1,
            name : categoryName
        }
        dispatch(addCategoryAction(formdata));
        toast.success(`you added category ${categoryName} ....`)
        setCategoryName('');
    }

    return(
        <>
        <div className="modal fade" id="categoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header bg-danger text-light">
        <h5 className="modal-title">Add category</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={handleAddCategory}>
      <div className="modal-body">
            <label>category name</label>
            <input type='text'
             placeholder='enter the category name'
             value={categoryName} 
             onChange={(e) => setCategoryName(e.target.value)} 
             className='form-control' />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Add</button>
      </div>
      </form>
    </div>
  </div>
</div>
        </>
    );
}

export default AddCategoryManagement