// This file to define functions about logistics (Array, Timer, Compare,...)

import moment from "moment";
import { _retrieveData, _storeData } from "./Storage";
import Toast from "react-native-toast-message";
import { BackHandler } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export const thoundsandSep = (x) => {
  if (x != null || x != undefined) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return "";
  }
}

export const checkn = (str = '') => {
  if (str == null || str == undefined) {
    return ""
  } else {
    let element;
    let index = 0;
    let strFrs = '';
    let strSnd = '';
    for (let i = 0; i < str.length; i++) {
      element = str[i];
      if (element == 'n') {
        index = i;
      }
    }

    if (typeof (index) != undefined) {
      strFrs = str.substr(0, index - 1);
      strSnd = str.substr(index + 1, str.length);
    }


    return strFrs + '\n' + strSnd;
  }
}

export const changeDate = (date = '') => {
  let month = Number.parseInt(date.substring(0, 2))
  let year = Number.parseInt(date.substring(3, date.length))

  let fMonth = '';
  let sMonth = '';
  let fYear = '';
  let sYear = '';
  let fDate = '';
  let sDate = '';

  if (month == 12) {
    fMonth = month;
    fYear = year;
    sMonth = '0' + 1;
    sYear = year + 1;
    fDate = fMonth + '/' + fYear;
    sDate = sMonth + '/' + sYear;
  }
  else if (month == 1) {
    fMonth = '0' + month;
    fYear = year;
    sMonth = '0' + (month + 1);
    sYear = year;
    fDate = fMonth + '/' + fYear;
    sDate = sMonth + '/' + sYear;
  }
  else {
    if (month < 10) {
      fMonth = '0' + month;
      fYear = year;
    } else {
      fMonth = month;
      fYear = year;
    }

    if ((month + 1) < 10) {
      sMonth = '0' + (month + 1);
      sYear = year;
    } else {
      sMonth = month + 1
      sYear = year;
    }

    fDate = fMonth + '/' + fYear;
    sDate = sMonth + '/' + sYear;
  }

  var data = {
    "firstMonth": fDate,
    "secondMonth": sDate
  }

  return data;

}

export const changeSecondDate = (date = '') => {
  let value = date.substring(6, date.length);
  let month = Number.parseInt(value.substring(0, 2))
  let year = Number.parseInt(value.substring(3, value.length))

  let fMonth = '';
  let sMonth = '';
  let fYear = '';
  let sYear = '';
  let fDate = '';
  let sDate = '';

  //month <=> secondMonth
  if (month == 1) {
    fMonth = 12;
    fYear = year - 1;
    sMonth = '0' + 1;
    sYear = year
    fDate = 12 + '/' + (year - 1);
    sDate = '01' + '/' + year;
  } else {
    if (month < 10) {
      sMonth = '0' + month;
      sYear = year;
    } else {
      sMonth = month;
      sYear = year;
    }

    if (month - 1 < 10) {
      fMonth = '0' + (month - 1);
      fYear = year;
    } else {
      fMonth = month - 1;
      fYear = year;
    }
    fDate = fMonth + '/' + fYear;
    sDate = sMonth + '/' + sYear;
  }

  var data = {
    "firstDate": fDate,
    "secondDate": sDate
  }

  return data;
}

export const getLoginInfo = async () => {
  await _retrieveData("userInfo").then((data) => { return data })
}

export const ToastNotif = (title, content, type, autohide, onhide) => {
  Toast.show({
    text1: title,
    text2: content,
    type: type,
    visibilityTime: 5000,
    autoHide: autohide,
    onHide: onhide
  })
}

export const backHandler = (navigation, screenName) => {
  const backAction = () => {
    navigation.navigate(screenName);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => {
    backHandler.remove();
  };

}

export const checkInternetConnection = async () => {
  let data = {}
  await NetInfo.fetch().then(state => {
    if (state.isConnected == false) {
      data = {
        "message": "Không có kết nối internet",
        "status": "failed"
      }
    } else {
      data = {
        "message": "Bạn đang kết nối internet",
        "status": "success"
      }
    }
  });
  return data;
}

export const checkUserRole = async () => {
  let role = '';
  await _retrieveData("userInfo").then((item) => {
    if (item != null) {
      if (item.userId.userGroupId.code == "MBF_GDV") {
        role = 'GROUP_GDV'
      } else if (item.userId.userGroupId.code == "ADMIN" || item.userId.userGroupId.code == "VMS_CTY" || item.userId.userGroupId.code == "MBF_CHINHANH" || item.userId.userGroupId.code == "MBF_CUAHANG") {
        role = "GROUP_ADMIN"
      }
      else {
        role = "Bạn không có quyền sử dụng app"
      }
    } else {
      console.log('token null')
      navigation.navigate("SignIn")
    }
  });

  return role;
}

export const checkLogin = async (navigation) => {
  await _retrieveData("userInfo").then((item) => {
    console.log(item)
    if (item != null) {
      console.log('token not null')
      if (item.userId.userGroupId.code == "MBF_GDV") {
        setTimeout(() => {
          navigation.navigate("GDVHome");
        }, 3000);
      } else if (item.userId.userGroupId.code == "ADMIN" || item.userId.userGroupId.code == "VMS_CTY" || item.userId.userGroupId.code == "MBF_CHINHANH" || item.userId.userGroupId.code == "MBF_CUAHANG") {
        navigation.navigate("AdminHome");
      } else {
        return "Bạn không có quyền sử dụng app"
      }
    } else {
      console.log('token null')
      navigation.navigate("SignIn")
    }
  });
}

//get nth item in ọbj
export const nth = (obj, n) => {
  var key, i;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) // always do this when you scan an object
    {
      if (key.indexOf("item") === 0) // this is the filter
      {
        i = parseInt(key.substring(4), 10); // parse the numeral after "item"
        if (i === n) {
          return obj[key]; // return this value
        }
      }
    }
  }

  return null;
}

export const checkSearchHistory = async (key = "", screenName = "", data = {}) => {
  await getLoginInfo().then(async (item) => {
    if (key.length == 0 && screenName.length == 0 && data.length == 0) {
      console.log('no data')
    }
    await _storeData(key, {
      key: key,
      screenName: screenName,
      data: data
    }).then((item) => { return item })

  })
}

export const checkn2 = (str = '') => {
  if (str == null || str == undefined || str.length == 0 || !str) {
    return ""
  } else {
    let element;
    let index = 0;
    let strFrs = '';
    let strSnd = '';
    for (let i = 0; i < str.length; i++) {
      element = str[i];
      if (element == '(') {
        index = i;
      }
    }

    if (typeof (index) != undefined) {
      strFrs = str.substr(0, index - 1);
      strSnd = str.substr(index, str.length);
    }


    return strFrs + '\n' + strSnd;
  }
}

export const getRole = async () => {
  let data = {
    role: "",
    level: "",
    description: "",
    branchCode: "",
    branchName: "",
    shopCode: "",
    shopName: "",
    label: ""
  }
  await _retrieveData('userInfo').then((item) => {

    let level = item.userId.shopId.shopLevel;
    if (level == 1) {
      // role công ty
      console.log('-------')
      console.log('shop level: ' + item.userId.shopId.shopLevel)
      console.log('role Công ty');
      data = {
        role: item.userId.userGroupId.code,
        level: item.userId.shopId.shopLevel,
        description: item.userId.userGroupId.description,
        branchCode: "",
        branchName: item.userId.shopId.shopName,
        shopCode:"",
        shopName:"",
        label: "Tất cả"
      }
    } else if (level == 2) {
      // role chi nhánh
      // console.log(item.userId)
      console.log('-------')
      console.log('shop level: ' + item.userId.shopId.shopLevel)
      console.log('role Chi nhánh');
      // console.log('role code: ' + item.userId.userGroupId.code)
      // console.log('role description: ' + item.userId.userGroupId.description)
      // console.log('branch code: ' + item.userId.shopId.shopCode)
      // console.log('branch name: ' + item.userId.shopId.parentShopId.shopName)
      // console.log('shop code: ' + item.userId.shopId.shopCode)
      // console.log('shop name: ' + item.userId.shopId.shopName)
      data = {
        role: item.userId.userGroupId.code,
        level: item.userId.shopId.shopLevel,
        description: item.userId.userGroupId.description,
        branchCode: item.userId.shopId.parentShopId.shopCode,
        branchName: item.userId.shopId.parentShopId.shopName,
        shopCode: item.userId.shopId.shopCode,
        shopName: item.userId.shopId.shopName,
        label: item.userId.shopId.shopName
      }

    } if (level == 3) {
      // role cửa hàng
      console.log('-------')
      console.log('shop level: ' + item.userId.shopId.shopLevel)
      console.log('role Cửa hàng');
      // console.log('role code: ' + item.userId.userGroupId.code)
      // console.log('role description: ' + item.userId.userGroupId.description)
      // console.log('branch code: ' + item.userId.shopId.parentShopId.shopCode)
      // console.log('branch name: ' + item.userId.shopId.parentShopId.shopName)
      // console.log('shop code: ' + item.userId.shopId.shopCode)
      // console.log('shop name: ' + item.userId.shopId.shopName)
      data = {
        role: item.userId.userGroupId.code,
        level: item.userId.shopId.shopLevel,
        description: item.userId.userGroupId.description,
        branchCode: item.userId.shopId.parentShopId.shopCode,
        branchName: item.userId.shopId.parentShopId.shopName,
        shopCode: item.userId.shopId.shopCode,
        shopName: item.userId.shopId.shopName,
        label: item.userId.shopId.shopName
      }
    }

  })
  return data;
  // chi nhánh + cửa hàng trưởng ngang nhau
}