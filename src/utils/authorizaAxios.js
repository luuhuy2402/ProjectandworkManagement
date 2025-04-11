import axios from "axios";
import { toast } from "react-toastify";
import { interceptorLoadingElements } from "~/utils/formatters";

//Khởi tạo một đối tượng Axios (authorizedAxiosInstance) mục đích để custom vavf cấu hình chung cho dự án
let authorizedAxiosInstance = axios.create();
//Thời gian cho tối da của 1 request: 10'
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;
//withCredentials: Sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE ( phục vụ việc
//lưu JWT tokens (refresh & access) vào trong httpOnly Cookie của trình duyệt
authorizedAxiosInstance.defaults.withCredentials = true;

/**
 * Cấu hình Interceptors ( Bộ đánh chặn vào giữa mọi Request và Response)
 */

// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use(
    (config) => {
        //Kỹ thuật chặn spam click
        interceptorLoadingElements(true);
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(
    (response) => {
        //Kỹ thuật chặn spam click
        interceptorLoadingElements(false);
        return response;
    },
    (error) => {
        //Kỹ thuật chặn spam click
        interceptorLoadingElements(false);

        /**Mọi mã http status code nằm ngoài khoảng 200-299 sẽ là error và rơi vào đây */
        let errorMessage = error?.message;
        if (error.response?.data?.message) {
            errorMessage = error.response?.data?.message;
        }
        //Dùng toastiy để hiển thik bất kể moi mã lỗi lên màn hình - Ngoại trừ mã 410 - GONE phục vụ việc tự động refresh lại token
        if (error.response?.status !== 410) {
            toast.error(errorMessage);
        }
        console.log(error);
        /**Xử lý tập trùng phần hienr thị thông báo lỗi trả về từ mọi API  */
        return Promise.reject(error);
    }
);

export default authorizedAxiosInstance;
