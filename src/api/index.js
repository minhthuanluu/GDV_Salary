
import { baseUrl } from "./untils";
import axios from "axios";
import { _removeData, _retrieveData, _storeData } from "../utils/Storage";
import { POST, GET, PUT, DELETE } from "./method";
import { text } from "../utils/Text";

// 1. Login Screen
export const login = async (userName, password) => {
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null
  };
  await axios({
    method: POST,
    url: `${baseUrl}login?password=${encodeURIComponent(password)}&userName=${encodeURIComponent(userName)}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "token",
    },
  })
    .then(async (res) => {
      if (res.status == 200) {
        if (Object.values(res.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data).length,
            error: null
          };
          await _storeData("userInfo", res.data);
        }
      }
    })
    .catch(async (error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
};

// 2. Profile Screen
export const getProfile = async (navigation) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null
  };

  await axios({
    method: GET,
    url: `${baseUrl}user/getProfile`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': `${token}`
    },
  }).then((res) => {
    if (res.status == 200) {
      if (res.data.V_ERROR) {
        data = {
          message: res.data.V_ERROR,
          data: null,
          isLoading: false,
          status: "v_error",
          length: 0,
          error: null
        }
      }
      else if (Object.values(res.data).length > 0) {
        data = {
          data: res.data,
          isLoading: false,
          status: "success",
          length: Object.values(res.data).length,
          error: null
        };
      }
    }
  }).catch(async (error) => {
    if (error) {
      if (error.response.data.status == 403) {
        navigation.navigate("SignIn")
      } else {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error
        };
      }
    }
  });
  return data;
};

// 3. Home > KPI Tháng hiện tại
export const getKPIByMonthDashboard = async (navigation) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null
  };
  await axios({
    method: GET,
    url: `${baseUrl}dashBoard/getKPIByMonthDashboard`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`
    },
  }).then((res) => {
    if (res.status == 200) {
      if (res.data.V_ERROR) {
        data = {
          message: res.data.V_ERROR,
          data: null,
          isLoading: false,
          status: "v_error",
          length: 0,
          error: null
        }
      } else if (Object.values(res.data.data).length > 0) {
        data = {
          data: res.data.data,
          isLoading: false,
          status: "success",
          length: Object.values(res.data.data).length,
          error: null
        };
      }
    }
  }).catch((error) => {
    if (error) {
      if (error.response.data.status == 403) {
        navigation.navigate("SignIn")
      } else {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error
        };
      }
    }
  });

  return data;
};

// 4. Home > KPI Tháng hiện tại > KPI Đạt Được
export const getKPIByMonthAchieve = async (navigation) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });

  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}actionItemKpi/getKPIByMonthAchieve`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null,
          };
        }
      }
    })
    .catch((error) => {
      if (error) {

        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error
        };
      }
    });
  return data;
};

// 5. Home > KPI Tháng hiện tại >  Thu nhập dự kiến từ tập TB tháng n
export const getTempSalary = async (navigation) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}actionItemKpi/getTempSalary`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error
        };
      }
    });
  return data;
};

// 6.Home > KPI Tháng hiện tại > Danh sách thuê bao
export const getSubscriberList = async (navigation) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken;
    } else {
      navigation.navigate("SignIn");
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}actionItemKpi/getSubscriberList`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {

        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error
        };

      }
    });
  return data;
};

// 7. Home > Lương Theo Tháng
export const getSalaryByMonth = async (month, navigation) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => { token = data.accessToken });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };

  await axios({
    method: GET,
    url: `${baseUrl}dashBoard/getSalaryByMonth?month=01/${month}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  }).then((res) => {
    if (res.status == 200) {
      if (res.data.V_ERROR) {
        data = {
          message: res.data.V_ERROR,
          data: null,
          isLoading: false,
          status: "v_error",
          length: 0,
          error: null
        }
      } else if (Object.values(res.data.data).length > 0) {
        data = {
          data: res.data.data,
          isLoading: false,
          status: "success",
          length: Object.values(res.data.data).length,
          error: null
        };
      }
    }
  }).catch((error) => {
    if (error) {
      if (error.response.data.status == 403) {
        navigation.navigate("SignIn")
      } else {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error
        };
      }
    }
  });

  return data;
};

// 08. Home > Lương Theo Tháng > Lương Khoán sản phẩm
export const getContractSalaryByMonth = async (month, navigation) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => { token = data.accessToken });

  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null
  };

  await axios({
    method: GET,
    url: `${baseUrl}actionItemKpi/getContractSalaryByMonth?month=01/${month}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  }).then((res) => {
    if (res.status == 200) {
      if (res.data.V_ERROR) {
        data = {
          message: res.data.V_ERROR,
          data: null,
          isLoading: false,
          status: "v_error",
          length: 0,
          error: null
        }
      } else if (Object.values(res.data.data).length > 0) {
        data = {
          data: res.data.data,
          isLoading: false,
          status: "success",
          length: Object.values(res.data.data).length,
          error: null
        };
      }
    }
  }).catch((error) => {
    if (error) {
      if (error.response.data.status == 403) {
        navigation.navigate("SignIn")
      } else {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error
        };
      }
    }
  });
  return data;
};

// 09. Home > Bình Quân Tháng & Tổng Thu Nhập
export const getAvgIncomeByMonth = async (beginMonth, endMonth, navigation) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => { token = data.accessToken });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}actionItemKpi/getAvgIncomeByMonth?fromMonth=01/${beginMonth}&toMonth=01/${endMonth}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`
    },
  }).then((res) => {
    if (res.status == 200) {
      if (res.data.V_ERROR) {
        data = {
          message: res.data.V_ERROR,
          data: null,
          isLoading: false,
          status: "v_error",
          length: 0,
          error: null
        }
      } else if (Object.values(res.data).length > 0) {
        data = {
          data: res.data.data,
          isLoading: false,
          status: "success",
          length: Object.values(res.data).length,
          error: null
        };
      }
    }
  }).catch(async (error) => {
    if (error) {
      if (error.response.data.status == 403) {
        navigation.navigate("SignIn")
      } else {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error
        };
      }
    }
  });

  return data;
};

// 10. Home > Chất Lượng Thuê Bao
export const getSubscriberQuality = async (navigation) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => { token = data.accessToken });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: true,
    error: null
  };
  await axios({
    method: GET,
    url: `${baseUrl}dashBoard/getSubscriberQuality`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`
    },
  }).then((res) => {
    if (res.status == 200) {
      if (res.data.V_ERROR) {
        data = {
          message: res.data.V_ERROR,
          data: null,
          isLoading: false,
          status: "v_error",
          length: 0,
          error: null
        }
      } else if (Object.values(res.data).length > 0) {
        data = {
          data: res.data,
          isLoading: false,
          status: "success",
          length: Object.values(res.data).length,
          error: null
        };
      }
    }
  }).catch(async (error) => {
    if (error) {
      if (error.response.data.status == 403) {
        navigation.navigate("SignIn")
      } else {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    }
  });

  return data;
};
// 11. Home > Thông tin giao dịch
export const getTransactionInfo = async (month, navigation) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => { token = data.accessToken });

  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}dashBoard/getTransactionInfo?month=01/${month}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  }).then((res) => {
    if (res.status == 200) {
      if (res.data.V_ERROR) {
        data = {
          message: res.data.V_ERROR,
          data: null,
          isLoading: false,
          status: "v_error",
          length: 0,
          error: null
        }
      } else if (Object.values(res.data).length > 0) {
        data = {
          data: res.data.data,
          isLoading: false,
          status: "success",
          length: Object.values(res.data).length,
          error: null
        };
      }
    }
  }).catch(async (error) => {
    if (error.response.data.status == 403) {
      navigation.navigate("SignIn")
    } else {
      data = {
        message: error.response.data.message,
        isLoading: false,
        status: "failed",
        length: 0,
        error: error.response.data
      };
    }
  });

  return data;
};

// 12. Profile > UpdateProfile
export const updateProfile = async (displayName, navigation) => {

  let token = "";
  await _retrieveData("userInfo").then((data) => { token = data.accessToken });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null
  };

  await axios({
    method: PUT,
    url: `${baseUrl}user/updateProfile?displayName=${displayName}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    }
  }).then((res) => {
    if (res.status == 200) {
      data = {
        message: "Cập nhật thông tin thành công",
        data: res.data,
        isLoading: false,
        status: "success",
        length: Object.values(res.data).length,
        error: null
      };
    }
  }).catch((error) => {
    if (error.response.data.status == 403) {

    } else {
      if (error == "Network Error") {

      } else {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    }
  });
  return data;
};

// 13. Profile > UpdateAvatar
export const updateAvatar = async (formData, navigation) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => { token = data.accessToken });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null
  };

  await axios({
    method: POST,
    url: `${baseUrl}user/updateAvatar`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    data: formData
  })
    .then((res) => {
      if (res.status == 200) {
        data = {
          message: "Cập nhật thông tin thành công",
          data: res.data,
          isLoading: false,
          status: "success",
          length: Object.values(res.data).length,
          error: null
        };
      }
    }).catch((error) => {
      if (error.response.data.status == 403) {
        // navigation.navigate("SignIn")
      } else {
        if (error == "Network Error") {

        } else {
          data = {
            message: error.response.data.message,
            isLoading: false,
            status: "failed",
            length: 0,
            error: error.response.data
          };
        }
      }
    });
  return data;
};

// 14. UpdatePassword
export const updatePassword = async (oldPassword, newPassword) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => { token = data.accessToken });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  await axios({
    method: PUT,
    url: `${baseUrl}user/update-password?newPassword=${newPassword}&oldPassword=${oldPassword}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`
    },
  }).then(async (res) => {
    if (res.status == 200) {
      data = {
        data: res.data,
        isLoading: false,
        status: "success",
        length: Object.values(res.data).length,
        error: null
      };
    }
  }).catch(async (error) => {
    if (error) {
      data = {
        message: error.response.data.message,
        isLoading: false,
        status: "failed",
        length: 0,
        error: error.response.data
      };
    }
  });

  return data;
};

// 15. Sign Out
export const signoutUser = async (navigation) => {
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });

  await axios({
    method: DELETE,
    url: `${baseUrl}logout`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  }).then(async (res) => {
    if (res.status == 200) {
      if (res.data.V_ERROR) {
        navigation.navigate('Home');
      } else {
        await _removeData("userInfo").then((data) => {
          if (data == undefined) {
            navigation.navigate("SignIn");
          } else {

          }
        });
      }
    } else {

    }
  }).catch(async (error) => {
    if (error) {
      await _removeData("userInfo").then((data) => {
        if (data == null) {
          navigation.navigate("SignIn")
        }
      });
    }
  });
  return data;
};

// 16. Năng suất bình quân
export const getSubscriberProductivity = async (navigation) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}dashBoard/getSubscriberProductivity`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
};

// 16. Top GDV 
export const getAllBranch = async (navigation) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
    length: 0
  };
  await axios({
    method: GET,
    url: `${baseUrl}listData/getAllBranch`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
};


//17. Top GDV
export const getAllShop = async (navigation, branchCode) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}listData/getAllShop?branchCode=${branchCode}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
};

export const getAllEmp = async (navigation, branchCode, shopCode) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}listData/getAllGDV?branchCode=${branchCode}&shopCode=${shopCode}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
};

export const getAdminKPITopTeller = async (navigation, branchCode, month, sort) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getKPIMonthTopTeller?branchCode=${branchCode}&month=01/${month}&sort=${sort}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
};

export const getKPIGroup = async (navigation, month) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getKPIGroup?month=01/${month}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
};

//Home > KPI Tháng hiện tại > Top GDV
export const getAdminKPIMonthTopTeller = async (navigation, branchCode, month, sort) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getKPIMonthTopTeller?branchCode=${branchCode}&month=01/${month}&sort=${sort}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        } else {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null,
            message: "Không có dữ liệu"
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
};

// AdminHome > KPI > Năng suất bình quân
export const getProductivitySubByMonth = async (navigation, month) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getProductivitySubByMonth?month=01/${month}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        } else {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null,
            message: "Không có dữ liệu"
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
};

// AdminHome > KPI > Năng suất bình quân > Chi tiết
export const getDetailProductivitySubByMonth = async (navigation, month, shopCode) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getDetailProductivitySubByMonth?month=01/${month}&shopCode=${shopCode}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        } else {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null,
            message: "Không có dữ liệu"
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
};

// Home > Lương theo tháng > Quản lý chi phí
export const getExpenseManagement = async (month) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getExpenseManagement?month=01/${month}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        } else {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null,
            message: "Không có dữ liệu"
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
}
// AdminHome > Lương theo tháng >Top GDV
export const getMonthSalaryTopTeller = async (navigation, month, branchCode, shopCode, empCode, sort) => {
  console.log('getMonthSalaryTopTeller: ' + month + '-' + branchCode + '-' + shopCode + '-' + empCode + '-' + sort)
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    loading: null,
    length: 0,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getMonthSalaryTopTeller?month=01/${month}&branchCode=${branchCode == null ? '' : branchCode}&shopCode=${shopCode}&empCode=${empCode}&sort=${sort}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (res.data.data.length > 0) {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            length: res.data.data.length,
            error: null
          };
        } else {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null,
            message: "Không có dữ liệu"
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
};

// AdminHome > Binh quan thu nhap > Luong binh quan
export const getAllAvgIncome = async (navigation, branchCode, shopCode) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    length: 0,
    error: null,
  };
  await axios({
    method: GET,
    url: shopCode ? `${baseUrl}adminScreens/getAllAvgIncome?branchCode=${branchCode}&shopCode=${shopCode}` : `${baseUrl}adminScreens/getAllAvgIncome?branchCode=${branchCode}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        } else {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null,
            message: "Không có dữ liệu"
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
};

// Admin > Thong tin giao dich

export const getTransInfoDashboard = async (navigation, month) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    loading: null,
    length: 0,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getTransInfoDashboard?month=01/${month}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data).length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
}

// Admin > Thong tin giao dich > Canh bao vi pham
export const getTransInfoWarning = async (navigation, month) => {
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    res: null,
    loading: null,
    length: 0,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getTransInfoWarning?month=01/${month}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data).length,
            error: null
          };
        } else {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null,
            message: "Không có dữ liệu"
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          error: error.response.data
        };
      }
    });
  return data;
}

// Admin > Thong tin giao dich > Canh bao vi pham > Chi tiet
export const getTransInfoWarningByType = async (navigation, month, branchCode, shopCode, empCode, type) => {
  console.log("api name: getTransInfoWarningByType")
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    isLoading: false,
    length: 0,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getTransInfoWarningByType?branchCode=${branchCode == undefined ? "" : branchCode}&shopCode=${shopCode == undefined ? "" : shopCode}&empCode=${empCode == undefined ? "" : empCode}&month=01/${month}&type=${type}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (res.data.data.length > 0) {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            length: res.data.data.length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          data: null,
          error: error.response.data
        };
      }
    });
  return data;
}

// Admin > Thong tin giao dich > Canh bao vi pham > Chi tiet > Chi tiết
export const getDetailTransInfoWarningByType = async (navigation, month, empCode, type) => {
  console.log("getDetailTransInfoWarningByType")
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    isLoading: null,
    length: 0,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getDetailTransInfoWarningByType?empCode=${empCode}&month=01/${month}&type=${type}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (res.data.data.length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: res.data.data.length,
            error: null
          };
        } else {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: res.data.data.length,
            error: null,
            message: "Không có dữ liệu"
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          data: null,
          error: error.response.data
        };
      }
    });
  return data;
}


// Admin > Thong tin giao dich > Canh bao vi pham > GDV bị chặn user do đấu sai kho số
export const getDenyByWrongInfo = async (navigation, month, branchCode, shopCode, empCode) => {
  console.log("getDenyByWrongInfo")
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    isLoading: null,
    length: 0,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getDenyByWrongInfo?branchCode=${branchCode}&empCode=${empCode}&month=01/${month}&shopCode=${shopCode}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        } else {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null,
            message: "Không có dữ liệu"
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          data: null,
          error: error.response.data
        };
      }
    });
  return data;
}

// Admin > Thong tin giao dich > Canh bao vi pham > GDV bị chặn user do đấu sai kho số
export const getEmpThreeTime = async (navigation, month, branchCode, shopCode, empCode) => {
  console.log("getEmpThreeTime")
  console.log(month, branchCode, shopCode, empCode)
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    isLoading: null,
    length: 0,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getEmpThreeTime?branchCode=${branchCode}&empCode=${empCode}&month=01/${month}&shopCode=${shopCode}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (res.data.data.length > 0) {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            length: res.data.data.length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          data: null,
          error: error.response.data
        };
      }
    });
  return data;
}

// Admin > Chat luong thue bao > Canh bao vi pham
export const getViolate = async (navigation) => {
  console.log("Admin > Chat luong thue bao > Canh bao vi pham => getEmpThreeTime")
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    isLoading: null,
    length: 0,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getViolate`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          data: null,
          error: error.response.data
        };
      }
    });
  return data;
}

// Home > Chất lượng thuê bao > Cảnh báo vi phạm > Chuyển Fast/MD1/MDT >=1TB
export const getFastTrans = async (navigation, branchCode, shopCode, empCode) => {
  console.log("Home > Chất lượng thuê bao > Cảnh báo vi phạm > Chuyển Fast/MD1/MDT >=1TB")
  console.log("getFastTrans")
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    isLoading: null,
    length: 0,
    error: null,
  };
  console.log(token)
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getFastTrans?branchCode=${branchCode}&empCode=${empCode}&shopCode=${shopCode}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (res.data.data.length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: res.data.data.length,
            error: null
          };
        } else {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: res.data.data.length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          data: null,
          error: error.response.data
        };
      }
    });
  return data;
}

// Home > Chất lượng thuê bao > Cảnh báo vi phạm > Chuyển Fast/MD1/MDT >=1TB > Chi tiết
export const getDetailFastTrans = async (navigation, branchCode, shopCode, empCode) => {
  console.log("Home > Chất lượng thuê bao > Cảnh báo vi phạm > Chuyển Fast/MD1/MDT >=1TB > Chi tiết")
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    isLoading: null,
    length: 0,
    error: null,
  };
  console.log(token)
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getDetailFCardTrans?branchCode=${branchCode}&empCode=${empCode}&shopCode=${shopCode}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (res.data.data.length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: res.data.data.length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          data: null,
          error: error.response.data
        };
      }
    });
  return data;
}

// Home > Chất lượng thuê bao > Cảnh báo vi phạm > Chuyen FCard>3TB
export const getFCardTrans = async (navigation, branchCode, shopCode, empCode) => {
  console.log("Home > Chất lượng thuê bao > Cảnh báo vi phạm > Chuyen FCard>3TB")
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    isLoading: null,
    length: 0,
    error: null,
  };
  console.log(token)
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getFCardTrans?branchCode=${branchCode}&empCode=${empCode}&shopCode=${shopCode}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        console.log(res.data)
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (Object.values(res.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          data: null,
          error: error.response.data
        };
      }
    });
  return data;
}

// Home > Chất lượng thuê bao > Cảnh báo vi phạm > GDV vi phạm cả 2 nhóm trên (xuất hiện >= 3 lần trong 6 tháng)
export const getViolationEmployee = async (navigation, branchCode, shopCode, empCode) => {
  console.log("Home > Chất lượng thuê bao > Cảnh báo vi phạm > GDV vi phạm cả 2 nhóm trên")
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    isLoading: null,
    length: 0,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getViolationEmployee?branchCode=${branchCode}&empCode=${empCode}&shopCode=${shopCode}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        if (res.data.V_ERROR) {
          data = {
            message: res.data.V_ERROR,
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null
          }
        } else if (res.data.data.length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: res.data.data.length,
            error: null
          };
        } else {
          data = {
            data: res.data,
            isLoading: false,
            message: text.dataIsNull,
            status: "success",
            length: res.data.data.length,
            error: null
          };
        }
      }
    })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          data: null,
          error: error.response.data
        };
      }
    });
  return data;
}

export const getNoRechargeCard = async (navigation, month) => {
  console.log("GDVHome > Thông tin giao dịch > GD Fone - card ko nạp tiền tháng: " + month);
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    isLoading: null,
    length: 0,
    error: null
  };
  await axios({
    method: GET,
    url: `${baseUrl}actionItemKpi/getNoRechargeCard?month=01/${month}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  }).then((res) => {
    if (res.status == 200) {
      if (res.data.V_ERROR) {
        data = {
          message: res.data.V_ERROR,
          data: null,
          isLoading: false,
          status: "v_error",
          length: 0,
          error: null
        }
      } else if (res.data.data.length > 0) {
        data = {
          data: res.data,
          isLoading: false,
          status: "success",
          length: res.data.data.length,
          error: null
        };
      } else {
        data = {
          data: res.data,
          isLoading: false,
          message: text.dataIsNull,
          status: "success",
          length: res.data.data.length,
          error: null
        };
      }
    }
  })
    .catch((error) => {
      if (error) {
        data = {
          message: error.response.data.message,
          isLoading: false,
          status: "failed",
          length: 0,
          data: null,
          error: error.response.data
        };
      }
    });
  return data;
}

// Home > Lương theo tháng > Quản lý chi phí > Chi tiết mục chi
export const getDetailOutcome = async (navigation, beginMonth, endMonth) => {
  console.log("Home > Lương theo tháng > Quản lý chi phí > Chi tiết mục chi from " + beginMonth + " to " + endMonth);
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    isLoading: null,
    length: 0,
    error: null
  };
  console.log(token)
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getDetailOutcome?beginMonth=01/${beginMonth}&endMonth=01/${endMonth}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  }).then((res) => {
    if (res.status == 200) {
      if (res.data&&res.data.V_ERROR) {
        data = {
          message: res.data.V_ERROR,
          data: null,
          isLoading: false,
          status: "v_error",
          length: 0,
          error: null
        }
      } else if (res.data&&res.data.data == null || res.data&&res.data.data==[]) {
        data = {
          data: [],
          isLoading: false,
          message: text.dataIsNull,
          status: "success",
          length: 0,
          error: null
        };
      }else {
        data = {
          data: res.data&&res.data || res.data.data,
          isLoading: false,
          status: "success",
          length: res.data&&res.data.data&&res.data.data.length,
          error: null
        };
      }
    }
  }).catch((error) => {
    console.log(error)
    if (error) {
      data = {
        message: error.response && error.response.data.message,
        isLoading: false,
        status: "failed",
        length: 0,
        data: null,
        error: error
      };
    }
  });
  return data;
}

// Home > Quản lý chi phí > Kế hoạch dự chi hỗ trợ
export const getOutcomeSupport = async (navigation, year) => {
  console.log("Home > Quản lý chi phí > Kế hoạch dự chi hỗ trợ tháng " + year);
  let token = "";
  await _retrieveData("userInfo").then((data) => {
    if (data != null) {
      token = data.accessToken
    } else {
      navigation.navigate("SignIn")
    }
  });
  let data = {
    message: "",
    status: "",
    data: null,
    isLoading: null,
    length: 0,
    error: null
  };
  console.log(token)
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getOutcomeSupport?year=01/01/${year}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  }).then((res) => {
    if (res.status == 200) {
      if (res.data.V_ERROR) {
        data = {
          message: res.data.V_ERROR,
          data: null,
          isLoading: false,
          status: "v_error",
          length: 0,
          error: null
        }
      } else if (res.data.data.length > 0) {
        data = {
          data: res.data,
          isLoading: false,
          status: "success",
          length: res.data.data.length,
          error: null
        };
      } else {
        data = {
          data: res.data,
          isLoading: false,
          message: text.dataIsNull,
          status: "success",
          length: res.data.data.length,
          error: null
        };
      }

    }
  }).catch((error) => {
    if (error) {
      data = {
        message: error.response && error.response.data.message,
        isLoading: false,
        status: "failed",
        length: 0,
        data: null,
        error: error
      };
    }
  });
  return data;
}