//import { Alert } from "react-native";

export const SET_USER_UUID = "SET_USER_UUID";
export const GET_CITIES = "GET_CITIES";
export const GET_IS_REGISTERED = "GET_IS_REGISTERED";


const URL_BASE = "http://192.168.7.17:3000";
const API_URL = "https://mocki.io/v1/8cb770c0-6948-4d96-81bf-83d21da310b3";
const UUID_URL = URL_BASE + "/is_registered";


export const getUUID = () => {
  try {
    return async (dispatch) => {
      const result = await fetch(UUID_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await result.json();
      if (json) {
        dispatch({
          type: GET_UUID,
          payload: json,
        });
      } else {
        console.log("unable to fectch");
      }
    };
  } catch (error) {
    console.log();
  }
};

export const getIsRegistered = (uuid) => {
  const url = UUID_URL + "/" + uuid+".json";
  try {
    return async (dispatch) => {
      const result = await fetch(url, {
        method: "GET",
        headers:{'Accept': 'application/json',
                  "Content-type": "application/json; charset=UTF-8" 
                },
      });
      const json = await result.json();
      if (json) {
        dispatch({
          type: GET_IS_REGISTERED,
          payload: json,
        });
      } else {
        console.log("unable to fectch get_uuid");
      }
    };
  } catch (error) {}
};

export const setUUID = (uuid) => (dispatch) => {
  dispatch({
    type: SET_USER_UUID,
    payload: uuid,
  });
};



// export const getCities = () => {
//   try {
//     return async (dispatch) => {
//       const result = await fetch(API_URL, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const json = await result.json();
//       if (json) {
//         dispatch({
//           type: GET_CITIES,
//           payload: json,
//         });
//       } else {
//         console.log("unable to fectch");
//       }
//     };
//   } catch (error) {
//     console.log();
//   }
// };

