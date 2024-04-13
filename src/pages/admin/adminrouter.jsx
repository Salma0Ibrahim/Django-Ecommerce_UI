import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import AdminSidebar from "../../components/admin/sidebar";
import CategoryManagement from "../../components/admin/category";
import UserManagement from "./user";
import ProductManagement from "./product";
import OrderManagement from "./order";

const isAuthenticated = (role) => {
  // if(role === 'user'){
  //     //! will get cookie and decode it and check if it is admin or
  // }

  return true;
};

const AdminLayoutAuth = () => {
  if (!isAuthenticated("admin")) {
    return <Navigate to="/signup" />;
  }

  return (
    <>
      <div className="admin-page">
            <div className="admin-sidebar">
                <AdminSidebar />
            </div>
            <div className="admin-content">
                <Outlet />
            </div>
      </div>
    </>
  );
};

const adminrouter = createBrowserRouter([
  {
    element: <AdminLayoutAuth />,
    children: [
      {
        element: <CategoryManagement />,
        path: "/admin/category",
      },
      {
        element: <UserManagement />,
        path: "/admin/user",
      },

      {
        element: <ProductManagement />,
        path: "/admin/product",
      },
      {
        element: <OrderManagement />,
        path: "/admin/order",
      }
    ],
  }
]);

export default adminrouter;
