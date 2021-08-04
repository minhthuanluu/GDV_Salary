import axios from "axios";
import { GET } from "../../api/method";
import { variable } from "./variable";

const protocol = Platform.OS == "android" ? "http://" : "https://";
const baseUrl = `${protocol}hochiminh.mobifone.vn/salary/api/`;
const branchListURL = `${baseUrl}DetailScreens/getListBranch`;
const shopListURL = `${baseUrl}DetailScreens/getListShop`;
const empListURL = `${baseUrl}DetailScreens/getListEmployee`;

export const getBranchList = async() => {
    let data = {
        message: "",
        status: "",
        res: null,
        loading: null,
        error: null,
    };

    await axios({
        method: GET,
        url: branchListURL,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${variable.token}`,
        },
    }).then(async (res) => {
        if (res.status == 200) {
            if (res.data.V_ERROR) {
              data = {
                message: "Chức năng này đang được bảo trì",
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



export const getShopList = async(branchCode) => {
    let data = {
        message: "",
        status: "",
        res: null,
        loading: null,
        error: null,
    };

    await axios({
        method: GET,
        url: `${shopListURL}?branchCode=${branchCode}`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${variable.token}`,
        },
    }).then(async (res) => {
        if (res.status == 200) {
            if (res.data.V_ERROR) {
              data = {
                message: "Chức năng này đang được bảo trì",
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

export const getEmpList = async(branchCode,shopCode) => {
    let data = {
        message: "",
        status: "",
        res: null,
        loading: null,
        error: null,
    };

    await axios({
        method: GET,
        url: `${empListURL}?branchCode=${branchCode}&shopCode=${shopCode}`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${variable.token}`,
        },
    }).then(async (res) => {
        if (res.status == 200) {
            if (res.data.V_ERROR) {
              data = {
                message: "Chức năng này đang được bảo trì",
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


// https://hochiminh.mobifone.vn/salary/api/ScreenSalaryManagement/getFixedWageSalary?branchCode=2HCMTPTD&month=01%2F06%2F2021&shopCode=BHKV-TD.01-FMCG-2.9.TDU&sort=1
export const getFixedWageSalary = async(month,sort,branchCode,shopCode,empCode) => {
    let data = {
        message: "",
        status: "",
        res: null,
        loading: null,
        error: null,
    };

    await axios({
        method: GET,
        url: `http://hochiminh.mobifone.vn/salary/api/ScreenSalaryManagement/getFixedWageSalary?branchCode=${branchCode}&month=01/${month}&shopCode=${shopCode}&empCode=${empCode}&sort=${sort}`,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `a1a72d00-f418-4fb0-8dcd-b32744aae086`,
        },
    }).then(async (res) => {
        if (res.status == 200) {
            if (res.data.V_ERROR) {
              data = {
                message: "Chức năng này đang được bảo trì",
                data: null,
                isLoading: false,
                status: "v_error",
                length: 0,
                error: null
              }
            } else if (Object.values(res.data.DATA).length > 0) {
              data = {
                data: res.data.DATA,
                isLoading: false,
                status: "success",
                length: Object.values(res.data.DATA).length,
                error: null
              };
            }
          }
    }).catch( (error) => {
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