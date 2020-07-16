import Country from "./data/country";
import { get } from "lodash";
export default async countryCode => {
  const isExist = Country.indexOf(countryCode) === -1;
  if (isExist) {
    return [];
  }
  const data = await import(`./data/${countryCode}.json`);
  return get(data, "default.settings.labelLevels") || [];
};
