import axios from "axios";
import config from "../../config";

export default () => {
  axios
    .post(
      `${config.api.baseURL}/account/checkJWT`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {})
    .catch((e) => {
      if (e.response.data.success == false) {
        window.location.href = "/";
      }
    });
};
