import './getcategoriesstyle.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";   
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { useDispatch , useSelector } from 'react-redux';
import { removeCategoryAction } from '../../../../redux/action/categoryaction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GetCategoryManagement = () => {
    const dispatch = useDispatch();
    const {categories} = useSelector(state => state.categories)

    const handleRemoveCategory = (categoryId) => {
        dispatch(removeCategoryAction(categoryId));
        toast.success('Category removed successfully');
    };

    return (
        <>
            {categories.map((category) => (
                <div className='row listitems' key={category.id}>
                    <div className='col-md-4'>
                        <p>{category.name}</p>
                    </div>
                    <div className='col-md-4 text-center'>
                        <button className='btn btn-warning'><FontAwesomeIcon icon={faPen} /></button>
                    </div>
                    <div className='col-md-4' style={{ textAlign: 'right' }}>
                        <button className='btn btn-danger' onClick={() => handleRemoveCategory(category.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default GetCategoryManagement;
