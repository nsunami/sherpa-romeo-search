import axios, { AxiosResponse } from "axios"
import { SherpaParamsType } from "./sherpaTypes"

export function getSherpaData(
  callback: (res: AxiosResponse) => void,
  params?: SherpaParamsType
) {
  const controller = new AbortController()
  axios
    .get("https://v2.sherpa.ac.uk/cgi/retrieve", {
      signal: controller.signal,
      params: {
        "item-type": "publication",
        format: "Json",
        limit: 10,
        "api-key": import.meta.env.VITE_SHERPA_KEY,
        ...params,
      } as SherpaParamsType,
    })
    .then((res) => callback(res))
}
