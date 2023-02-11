
const routes = [
  {
    path: '/admin/dashboard',
    icon: 'HomeIcon',
    name_vn: 'Bảng thống kê',
    name_en: 'Dashboard',
  },
  {
    path: '/admin/users',
    icon: 'UsersIcon',
    name_vn: 'Danh sách người dùng',
    name_en: 'Users',
  },
  {
    path: '/admin/tree/root',
    icon: 'TreeIcon',
    name_vn: 'Hệ thống khách hàng',
    name_en: 'System Tree',
  },
  {
    path: '/admin/commission',
    icon: 'PaymentIcon',
    name_vn: 'Lịch sử hoa hồng',
    name_en: 'Commissions History',
  },
  {
    path: '/admin/active',
    icon: 'TransactionIcon',
    name_vn: 'Lịch sử giao dịch',
    name_en: 'Payments History',
  },
  {
    path: '/admin/storage',
    icon: 'StorageIcon',
    name_vn: 'Kho sản phẩm',
    name_en: 'Product Warehouse',
  },
  {
    path: '/admin/request',
    icon: 'FormsIcon',
    name_vn: 'Khách hàng yêu cầu',
    name_en: 'Customers Request',
  },
  {
    path: '/admin/policy',
    icon: 'PolicyIcon',
    name_vn: 'Chính sách công ty',
    name_en: 'Policy',
  },
  {
    path: '/admin/trash',
    icon: 'TablesIcon',
    name_vn: 'Thùng rác',
    name_en: 'Trash',
  },
  {
    icon: 'PagesIcon',
    name_vn: 'Cài đặt',
    routes: [
      {
        path: '/admin/invite-code',
        name_vn: 'Mã giới thiệu',
      },
      {
        path: '/admin/create-admin',
        name_vn: 'Tạo Admin',
      },
      {
        path: '/admin/create-user',
        name_vn: 'Tạo nhanh User',
      },
      {
        path: '/admin/edit-tree',
        name_vn: 'Quản lí hệ thống',
        name_en: 'System Management',
      },
      {
        path: '/admin/package',
        name_vn: 'Cài đặt Gói',
      },
      {
        path: '/admin/mail-template',
        name_vn: 'Cài đặt Mail',
      },
    ],
  },
]

export default routes
