const defaultAPITimeout = 1000;
import wait from "./wait";
import { get } from "lodash";
export default async (ip, IP_STACK_KEY) => {
  try {
    const location = await detectLocationExtremeIp(ip)
      .then(value => value)
      .catch(() => detectLocationIpApi(ip))
      .then(value => value)
      .catch(() => detectLocationIpStack(ip, IP_STACK_KEY))
      .then(value => value);
    return location;
  } catch (ex) {
    return null;
  }
};

const detectLocationIpStack = async (ip, IP_STACK_KEY) => {
  return new Promise((resolve, reject) => {
    try {
      Promise.race([fetch(`http://api.ipstack.com/${ip}?access_key=${IP_STACK_KEY}`), wait(defaultAPITimeout)])
        .then(res => (res ? res.json() : null))
        .then(res => {
          if (!res || res.error) {
            reject(null);
          } else {
            resolve({
              countryName: get(res, "country_name"),
              countryCode: get(res, "country_code"),
              languageCode: get(res, "location.languages[0].code")
            });
          }
        });
    } catch (ex) {
      reject(null);
    }
  });
};

const detectLocationExtremeIp = async ip => {
  return new Promise((resolve, reject) => {
    try {
      Promise.race([fetch(`https://extreme-ip-lookup.com/json/${ip}`), wait(defaultAPITimeout)])
        .then(res => (res ? res.json() : null))
        .then(res => {
          if (!res || res.status === "fail") {
            reject(null);
          } else {
            resolve({
              countryCode: get(res, "countryCode")
            });
          }
        });
    } catch (ex) {
      reject(null);
    }
  });
};

const detectLocationIpApi = async ip => {
  return new Promise((resolve, reject) => {
    try {
      Promise.race([fetch(`http://ip-api.com/json/${ip}`), wait(defaultAPITimeout * 2)])
        .then(res => (res ? res.json() : null))
        .then(res => {
          if (!res || res.status === "fail") {
            reject(null);
          } else {
            resolve({
              countryCode: get(res, "countryCode")
            });
          }
        });
    } catch (ex) {
      reject(null);
    }
  });
};
