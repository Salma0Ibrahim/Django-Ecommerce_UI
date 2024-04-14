import { useEffect } from 'react';
import './categorystyle.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";   
import { faFilter , faMagnifyingGlass , faPlus , faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesAction } from '../../../redux/action/categoryaction';
import GetCategoryManagement from '../../../pages/admin/category/getcategories';
import AddCategoryManagement from '../../../pages/admin/category/add category';

const CategoryManagement = () => {
    const {categories} = useSelector(state => state.categories)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategoriesAction());
    },[dispatch])

    console.log(categories);

    return(
        <>
        <div className="categorymanagement">
            {/* first part */}
            <div className="createnewitem">
                <div>
                    <h2><FontAwesomeIcon icon={faLayerGroup} /> category</h2>
                </div>
                <div>
                    <button data-bs-toggle="modal" data-bs-target="#categoryModal"><FontAwesomeIcon icon={faPlus} />&nbsp;add category</button>
                </div>
            </div>

            {/* second part */}
            <div className="searchitem">
                <div>
                    <FontAwesomeIcon className="filtericon" icon={faMagnifyingGlass} />
                    <input type="text" className="form-control" placeholder="    search..." />
                </div>
                <div>
                    <FontAwesomeIcon icon={faFilter} />
                </div>
            </div>

            {/* first part */}
            <div className="itemcolumns">
                <p>Name</p>
                <p>update</p>
                <p>delete</p>
            </div>

            <GetCategoryManagement categories={categories} />
            <AddCategoryManagement />
            
        </div>
        </>
    );
}

export default CategoryManagement