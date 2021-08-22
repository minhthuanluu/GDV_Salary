// Home > KPI Tháng hiện tại | getKPIByMonthDashboard
export const KPIByMonthDashboard = {
  "dateRange": "",
  "achiveKPI": "",
  "tempSalary": ""
}

// Home > KPI Tháng hiện tại > KPI Đạt Được | getKPIByMonthAchieve
export const KPIByMonthAchieve = {
  "dateRange": "",
  "sumKpi": "",
  "prePaid": "",
  "postPaid": "",
  "vas": "",
  "importantKpi": "",
  "retailSales": "",
  "ratePrePaid": "",
  "ratePostPaid": "",
}

// Home > KPI Tháng hiện tại | getTempSalaryDashboard
export const TempSalaryDashboard = {
  "dateRange": "",
  "expectedSalary": "",
  "permanentSalary": "",
  "contractSalary": "",
  "prePaid": "",
  "postPaid": "",
  "vas": "",
  "otherService": "",
  "terminalDevice": "",
}

// Home > KPI Tháng hiện tại > Thu nhập dự kiến từ tập TB tháng n | getDetailTempContract
export const DetailTempContract = {
  "dateRange": "",
  "expectedSalary": "",
  "permanentSalary": "",
  "contractSalary": "",
  "prePaid": "",
  "postPaid": "",
  "vas": "",
  "otherService": "",
  "terminalDevice": ""
}

// Home > Lương Theo Tháng | getSalaryByMonth
export const SalaryByMonth = {
  "status": "",
  "monthlySalary": null,
  "permanentSalary": null,
  "contractSalary": null,
  "vasAffiliate":null,
  "incentiveCost": null,
  "supportCost":null,
  "sanctionCost": null,
  "others": null
}

// Home > Lương Theo Tháng > Lương Khoán | getContractSalaryByMonth
export const ContractSalaryByMonth = {
  "status": "",
  "kpis":"",
  "contractSalary": "",
  "prePaid": "",
  "postPaid": "",
  "vas": "",
  "postage": "",
  "terminalDevice": "",
  "otherService": "",
  "arrears": ""
}

// Home > Bình Quân Thu Nhập | getAvgIncomeDashboard
export const AvgIncomeDashboard = {
  "notification": "",
  "avgIncomeByMonth": "",
  "totalIncome": ""
}

// Home > Bình Quân Thu Nhập > Bình Quân Tháng & Tổng Thu Nhập | getAvgIncomeByMonth
export const M_AvgIncomeByMonth = {
  "notification": "",
  "avgByMonth": "",
  "avgPermanentSalary": "",
  "avgContractSalary": "",
  "avgVasAffiliate":"",
  "avgOutcomeSupport":"",
  "avgExpenIncentive": "",
  "avgOtherExpen": "",
  "totalIncome": "",
  "totalPermanentSalar": "",
  "totalContractSalary": "",
  "totalVasAffiliate":"",
  "totalOutcomeSupport":"",
  "totalExpenIncentive": "",
  "totalOtherExpen": ""
}

// Home > Chất Lượng Thuê Bao | getSubscriberQuality
export const SubsQuality = {
  "beginMonth": null,
  "endMonth": "",
  "debtPercent": "",
  "totalDebtNinety": "",
  "totalRevenue": "",
  "newSubPrePaid": "",
  "revokeAmount": "",
  "preToPostPaid": "",
  "denyTwoC": ""
}

// Home > Thông tin giao dịch | getTransactionInfo
export const Transactioninfo = {
  "customerAmount": "",
  "dealingsCount": "",
  "preToPostPaid": "",
  "denyTwoC": ""
}

// Profile | getProfile
export const Profile = {
  "id": null,
  "userName": "",
  "password": "",
  "displayName": "",
  "status": "",
  "userGroupId": {
    "id": null,
    "code": "",
    "description": ""
  },
  "shopId": {
    "id": null,
    "shopCode": "",
    "shopName": "",
    "shopTypeId": null,
    "parentShopId": null
  },
  "gdvId": {
    "id": null,
    "maGDV": "",
    "fullName": "",
    "fromDate": null,
    "ngayVaoVms": "",
    "nvCode": "",
    "ngaySinh": "",
    "phong": "",
    "boPhan": "",
    "chucVu": "",
    "maDoiTac": "",
    "tenDoiTac": ""
  },
  "isLDap": null,
  "phoneNumber": null,
  "avatar": ""
}

//Login | login

export const User = {
  "accessToken": "",
  "expiredAt": "",
  "id": "",
  "refreshExpiredAt": "",
  "refreshToken": "",
  "userId": {
    "avatar": "",
    "displayName": "",
    "gdvId": {
      "fullName": "",
      "id": "",
      "maGDV": "",
    },
    "id": "",
    "isLDap": "",
    "password": "",
    "phoneNumber": "",
    "shopId": {
      "id": "",
      "parentShopId": "",
      "shopCode": "",
      "shopName": "",
      "shopTypeId": "",
    },
    "status": "",
    "userGroupId": {
      "code": "",
      "description": "",
      "id": "",
    },
    "userName": ""
  }
}

export const UserObj = {
  "avatar": "",
  "displayName": "",
  "userGroupId":{
    "id":"",
    "code":"",
    "description":""
  },
  "gdvId": {
    "fullName": "",
    "id": "",
    "maGDV": "",
  },
  "id": "",
  "isLDap": "",
  "password": "",
  "phoneNumber": "",
  "shopId": {
    "id": "",
    "parentShopId": "",
    "shopCode": "",
    "shopName": "",
    "shopTypeId": "",
  },
  "status": "",
  "userGroupId": {
    "code": "",
    "description": "",
    "id": "",
  },
  "userName": "",
}