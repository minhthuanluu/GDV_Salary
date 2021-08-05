import { baseUrl } from "./untils";
import axios from "axios";
import { _removeData, _retrieveData, _storeData } from "../utils/Storage";
import { POST, GET, PUT, DELETE } from "./method";

// 16. Top GDV
export const getAllBranch = async (navigation) => {
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
            message: "Chức năng này đang được bảo trì",
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null,
          };
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
          error: error.response.data,
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
            message: "Chức năng này đang được bảo trì",
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null,
          };
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
          error: error.response.data,
        };
      }
    });
  return data;
};

export const getAllEmp = async (navigation, branchCode) => {
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
    url: `${baseUrl}listData/getAllGDV?branchCode=${branchCode}`,
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
            message: "Chức năng này đang được bảo trì",
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null,
          };
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
          error: error.response.data,
        };
      }
    });
  return data;
};

export const getAdminKPIMonthTopTeller = async (
  navigation,
  branchCode,
  month,
  sort
) => {
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
            message: "Chức năng này đang được bảo trì",
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null,
          };
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data,
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
          error: error.response.data,
        };
      }
    });
  return data;
};

export const getTopTellerByAvgIncome = async (navigation, branchCode, sort) => {
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
    url: `${baseUrl}adminScreens/getTopTellerByAvgIncome?branchCode=${branchCode}&sort=${sort}`,
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
            message: "Chức năng này đang được bảo trì",
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null,
          };
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data,
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
          error: error.response.data,
        };
      }
    });
  return data;
};

export const getKPIGroup = async (navigation, month) => {
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
            message: "Chức năng này đang được bảo trì",
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null,
          };
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data,
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
          error: error.response.data,
        };
      }
    });
  return data;
};

export const getKPIByMonth = async (month, branchCode, shopCode) => {
  console.log(month, branchCode, shopCode)
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
    length:0,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getKPIByMonth?branchCode=${branchCode}&month=01/${month}&shopCode=${shopCode}`,
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
            message: "Chức năng này đang được bảo trì",
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null,
          };
        } else if (res.data.length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: res.data.data.length,
            error: null,
          };
        } else {
          data = {
            data: res.data.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null,
            message: "Không có dữ liệu"
          }
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
          error: error.response.data,
        };
      }
    });
  return data;
};

export const getMonthSalaryGroup = async (navigation, month) => {
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
    url: `${baseUrl}adminScreens/getMonthSalaryGroup?month=01/${month}`,
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
            message: "Chức năng này đang được bảo trì",
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null,
          };
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data,
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
          error: error.response.data,
        };
      }
    });
  return data;
};

export const getMonthSalary = async (month, branchCode, shopCode) => {
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
    length:0,
    loading: null,
    error: null,
  };
  await axios({
    method: GET,
    url: `${baseUrl}adminScreens/getMonthSalary?branchCode=${branchCode}&month=01/${month}&shopCode=${shopCode}`,
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
            message: "Chức năng này đang được bảo trì",
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null,
          };
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data,
            isLoading: false,
            status: "success",
            length: Object.values(res.data.data).length,
            error: null,
          };
        }else {
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
          error: error.response.data,
        };
      }
    });
  return data;
};

export const getAllAvgIncomeGroup = async (navigation) => {
  
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
    url: `${baseUrl}adminScreens/getAllAvgIncomeGroup`,
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
            message: "Chức năng này đang được bảo trì",
            data: null,
            isLoading: false,
            status: "v_error",
            length: 0,
            error: null,
          };
        } else if (Object.values(res.data.data).length > 0) {
          data = {
            data: res.data,
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
          error: error.response.data,
        };
      }
    });
  return data;
};
