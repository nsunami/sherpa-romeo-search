import axios, { AxiosResponse } from "axios"
import { SherpaParamsType } from "./sherpaTypes"

export function getSherpaData(
  callback: (res: AxiosResponse) => void,
  params?: SherpaParamsType,
  query?: string
) {
  const ISSN_PATTERN = /^[0-9]{4}-[0-9]{3}[0-9X]$/g
  const issnMatch = query ? query.match(ISSN_PATTERN) : ""
  const currentFilter = query
    ? issnMatch
      ? `[["issn", "equals", "${issnMatch[0]}"]]`
      : `[["title", "contains word", "${query}*"]]`
    : ""
  const controller = new AbortController()
  axios
    .get("https://v2.sherpa.ac.uk/cgi/retrieve", {
      signal: controller.signal,
      params: {
        "item-type": "publication",
        format: "Json",
        limit: 10,
        filter: currentFilter,
        "api-key": import.meta.env.VITE_SHERPA_KEY,
        ...params,
      } as SherpaParamsType,
    })
    .then((res) => callback(res))
}
