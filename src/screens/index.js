// import all of screens path here

import React from 'react';
// GDV screen's path
import Home from "./GDVHome/Dashboard";
import KPIByMonthDashboard from "./GDVHome/KPIByMonth/DashBoard";
import Achieve from "./GDVHome/KPIByMonth/Achieve";
import ExpectedSalary from "./GDVHome/KPIByMonth/ExpectedSalary";
import SubscriberList from "./GDVHome/KPIByMonth/SubscriberList";
import SalaryByMonthDashboard from "./GDVHome/SalaryByMonth/Dashboard";
import SalaryByMonthFixedwage from "./GDVHome/SalaryByMonth/Fixedwage";
import SalaryByMonthContract from "./GDVHome/SalaryByMonth/Contract";
import SalaryByMonthArrears from "./GDVHome/SalaryByMonth/Arrears";
import AvgIncomeByMonth from "./GDVHome/AvgIncome/AvgIncomeByMonth";
import TransactionInfo from "./GDVHome/TransactionInfo";
import SubscriberQuality from "./GDVHome/SubscriberQuality";
import ProductivitySub from "./GDVHome/KPIByMonth/ProductivitySub";
import Profile from "./Profile/Dashboard";
import UpdatePassword from "./Profile/UpdatePassword";
import UpdateProfile from "./Profile/UpdateProfile";

// Auth screen's path
import SignIn from "./Auth/SignIn";
import SignOut from "./SignOut";
import Splash from "./Auth/Splash";
import TestThree from './Test/Test';

// Admin screen's path
import AdminHome from "./AdminHome/Dashboard" //AdminHome
import AdminKPIDashboard from "./AdminHome/KPI/Dashboard"; // AdminHome > KPI
    import AdminTopTellersKPI from "./AdminHome/KPI/TopTeller"; // AdminHome > KPI > Top GDV
    import AdminKPIGroupKPI from "./AdminHome/KPI/KPIGroup"; // AdminHome > KPI > Nhóm KPI
    import AdminKPIMonth from "./AdminHome/KPI/KPIMonth/Company"; // AdminHome > KPI > KPI tháng
        import AdminKPIMonthShop from "./AdminHome/KPI/KPIMonth/Shop"; 
        import AdminKPIMonthGDV from "./AdminHome/KPI/KPIMonth/GDV"; 
    import AdminProductivitySub from "./AdminHome/KPI/ProductivitySub"; // AdminHome > KPI > Năng suất bình quân
        import AdminDetailProductivitySub from "./AdminHome/KPI/ProductivitySub/Detail"; // AdminHome > KPI > Năng suất bình quân > Chi tiết năng suất bình quân
import AdminSalaryByMonthDashboard from "./AdminHome/SalaryByMonth/Dashboard";  // AdminHome > Lương theo tháng
    import AdminExpenseManagement from "./AdminHome/SalaryByMonth/ExpenseManagement"; // AdminHome > Lương theo tháng > Quản lý chi phí
    import AdminTopTellers from "./AdminHome/SalaryByMonth/TopTeller"; // AdminHome > Lương theo tháng >Top GDV
    import AdminSalaryGroup from "./AdminHome/SalaryByMonth/SalaryGroup"; // AdminHome > Lương theo tháng > Nhóm lương
    import AdminMonthSalary from "./AdminHome/SalaryByMonth/MonthSalary"; // AdminHome > Lương theo tháng > Lương tháng
import AdminAvgIncomeDashboard from "./AdminHome/AvgIncome/Dashboard"; // AdminHome > Bình quân thu nhập
    import AdminAvgIncomeTopTellers from "./AdminHome/AvgIncome/TopTellers"; // AdminHome > Bình quân thu nhập > Top GDV
    import AdminAvgIncomeSalaryGroup from "./AdminHome/AvgIncome/AvgSalaryGroup"; // Admin > Bình quân thu nhập > Nhóm lương BQ
    import AdminAvgIncome from "./AdminHome/AvgIncome/AvgSalary"; // Admin > Bình quân thu nhập > Lương BQ
        import AdminAvgIncomeShop from "./AdminHome/AvgIncome/AvgSalary/Shop"; // Admin > Bình quân thu nhập > Lương BQ > Cửa hàng
        import AdminAvgIncomeTellers from "./AdminHome/AvgIncome/AvgSalary/Shop/Tellers"; // Admin > Bình quân thu nhập > Lương BQ > Cửa hàng > Giao dịch viên


// GDV's screen
export const HomeScreen = (route) => {return <Home route={route}/>}
export const KPIByMonthDashboardScreen = (route) => {return <KPIByMonthDashboard route={route}/>}
export const AchieveScreen = () => {return <Achieve />}
export const ExpectedSalaryScreen = () => {return <ExpectedSalary />}
export const SubscriberListScreen = () => {return <SubscriberList />}
export const SalaryByMonthDashboardScreen = (route) => {return <SalaryByMonthDashboard  route={route}/>}
export const SalaryByMonthFixedwageScreen = () => {return <SalaryByMonthFixedwage />}
export const SalaryByMonthContractScreen = () => {return <SalaryByMonthContract />}
export const SalaryByMonthArrearsScreen = () => {return <SalaryByMonthArrears />}
export const AvgIncomeByMonthScreen = () => {return <AvgIncomeByMonth />}
export const TransactionInfoScreen = () => {return <TransactionInfo />}
export const SubscriberQualityScreen = () => {return <SubscriberQuality />}
export const ProductivitySubScreen = () => {return <ProductivitySub />}
export const ProfileScreen = () => {return <Profile />}
export const UpdatePasswordScreen = () => {return <UpdatePassword />}
export const UpdateProfileScreen = () => {return <UpdateProfile />}

// Admin's screen
export const AdminHomeScreen = () => {return <AdminHome/>}
    export const AdminKPIDashboardScreen = () => {return <AdminKPIDashboard/>}
        export const AdminTopTellersKPIScreen = () => {return <AdminTopTellersKPI/>}
        export const AdminKPIGroupKPIScreen = () => {return <AdminKPIGroupKPI/>}
        export const AdminKPIMonthScreen = () => {return <AdminKPIMonth/>}
            export const AdminKPIMonthShopScreen = () => {return <AdminKPIMonthShop/>}
            export const AdminKPIMonthGDVScreen = () => {return <AdminKPIMonthGDV/>}
        export const AdminProductivitySubScreen = () => {return <AdminProductivitySub />}
            export const AdminDetailProductivitySubScreen = () => {return <AdminDetailProductivitySub />}
    export const AdminSalaryByMonthDashboardScreen = () => {return <AdminSalaryByMonthDashboard />}
        export const AdminExpenseManagementScreen = () => {return <AdminExpenseManagement />}
        export const AdminTopTellersScreen = () => {return <AdminTopTellers />}
        export const AdminSalaryGroupScreen = () => {return <AdminSalaryGroup />}
        export const AdminMonthSalaryScreen = () => {return <AdminMonthSalary />}
    export const AdminAvgIncomeDashboardScreen = () => {return <AdminAvgIncomeDashboard />}
        export const AdminAvgIncomeTopSellersScreen = () => {return <AdminAvgIncomeTopTellers />}
        export const AdminAvgIncomeSalaryGroupScreen = () => {return <AdminAvgIncomeSalaryGroup />}
        export const AdminAvgIncomeScreen = () => {return <AdminAvgIncome />}
            export const AdminAvgIncomeShopScreen = () => {return <AdminAvgIncomeShop />}
                export const AdminAvgIncomeTellersScreen = () => {return <AdminAvgIncomeTellers />}

            // AdminAvgIncomeTellers
        
        
// Auth's screen
export const SignInScreen = () => {return <SignIn />}
export const SignOutScreen = () => {return <SignOut />}
export const SplashScreen = ()=>{return <Splash/>}
export const TestScreen = () => {return <TestThree />}

// export const TestScreen = () => {return <TestThree />}