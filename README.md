# GDV_Salary

# Structure descriptions

#   src | include all of prj source code
#       assets  | include images
#       comps   | common components be use in screens
#       models  | storage obj information => 1 model = 1 file => all of them will be export at file /models/index.js
#       screens | screens code => all of them will be export at file /screens/index.js
#       utils   | include component about images, dimessions, images path,...
#           Colors | include all of color code to a variable
#           Dimession | include variable about with, height, statusBar,... 
#           Fonts | include font size, font weight, responsive font
#           Image | include all of images file's path
#           Logistics | include funtions to process logic
#           Server | include server's url, api url, ....
#           Storage | funtions involve device local storage
#   App.js | route of all of screens, navigation, decentralization,...

# Notice: all of module must be install from `YARN` to unified in prj.

# Sigin: Đăng nhập
# RecoveryPassword: Khôi phục mật khẩu
# GDVHome: Trang chủ GDV
#   Dashboard: Dashboard màn hình Home
#   KPIByMonth: KPI tháng hiện tại
#       Dashboard: Dashboard KPI tháng hiện tại
#       Achieve: KPI đạt được
#       ExpectedSalary: Thu nhập dự kiến từ tập thuê bao trong tháng
#   SalaryByMonth: Lương theo tháng
#       Dashboard: Dashboard lương theo tháng
#       Fixedwage: Lương cố định
#       Contract: Lương khoán SP    
#       EncourageSalary: Chi phí khuyến khích
#       Arrears: Chế tài
#       Others: Chi khác
#   AvgIncome: Bình quân thu nhập
#       Dashboard: Dashboard bình quân thu nhập
#       AvgIncomeByMonth: Bình quân tháng & Tổng thu nhập
#   SubscriberQuality: Chất lượng thuê bao
#   TransactionInfo: Thông tin giao dịch
# Profile
#   Dashboard: Thông tin cá nhân
#   UpdatePassword: Cập nhật mật khẩu
#   UpdateProfile: Cập nhật thông tin cá nhân
# Signout: Đăng xuất

#   *** Descriptions
#   KPI TBTT: KPI thuê bao trả trước
#   KPI TBTS: KPI thuê bao trả sau
#   KPI KHTT: KPI kế hoạch trọng tâm
#   JSON
#   KPIByMonth > Achieve
#   data:{
#       dateRange:""
#       sumKpi:""
#            
# }

# AdminHome: Màn hình chính Admin
#   Dashboard: Dashboard màn hình AdminHome
#   KPI: KPI
#       Dashboard: Màn hình chính
#       TopTeller: Top GDV
#       KPIGroup: Nhóm KPI
#       KPIMonth: KPI tháng
#           KPIMonth: 
#       ProductivitySub: Năng suất bình quân
#   SalaryByMonth: Lương theo tháng
#       Dashboard: Màn hình chính
#       ExpenseManagement: Quản lý chi phí
#       TopSellers: Top GDV
#       SalaryGroup: Nhóm lương
#       MonthSalary: Lương tháng
#   AvgIncome: Bình quân thu nhập
#       Dashboard: Màn hình chính
#       TopSellers: Top GDV
#       AvgSalaryGroup: Nhóm lương bình quân
#       AvgSalary: Lương bình quân
#   SubscriberQuality: Chất lượng thuê bao
#       Dashboard: Màn hình chính
#       ViolationWarning: Cảnh báo vi phạm
#       Summary: Thống kê
#   UnitInfo: Thông tin đơn vị

