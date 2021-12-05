import Login from "../pages/Login";
import Index from "../pages/admin/dashboard";
import List from "../pages/admin/products/List";
import Edit from "../pages/admin/products/Edit";
import PageNotFound from "../pages/PageNotFound";
import {DashboardOutlined, ShoppingCartOutlined} from '@ant-design/icons';

export const mainRoutes = [{
    path: '/login',
    component: Login
}, {
    path: '/404',
    component: PageNotFound
}]

export const adminRoutes = [{
    path: '/admin/dashboard',
    component: Index,
    isShow: true,
    title: '看板',
    icon: <DashboardOutlined/>
}, {
    path: '/admin/products',
    component: List,
    exact: true,
    isShow: true,
    title: "商品管理",
    icon: <ShoppingCartOutlined/>
}, {
    path: '/admin/products/edit/:id?',
    component: Edit,
    isShow: false
}]