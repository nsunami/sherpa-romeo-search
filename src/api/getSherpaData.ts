import axios, { AxiosResponse } from "axios"
import { SherpaParamsType } from "./sherpaTypes"

const PUBLICATION_FILTERS = {
  issn: "issn",
  publisher_id: "publisher_id",
  title_acronym: "title_acronym",
  acronym: "acronym",
  date_modified: "date_modified",
  type: "type",
  id: "id",
  publisher_policy_id: "publisher_policy_id",
  title: "title",
  title_title: "title_title",
  publicationid: "publicationid",
}

export function getSherpaData(
  callback: (res: AxiosResponse) => void,
  params?: SherpaParamsType,
  query?: string
) {
  const ISSN_PATTERN = /^[0-9]{4}-[0-9]{3}[0-9X]$/g
  const issnMatch = query ? query.match(ISSN_PATTERN) : ""
  const currentFilter = query
    ? issnMatch
      ? `[["${PUBLICATION_FILTERS.issn}", "equals", "${issnMatch[0]}"]]`
      : `[["${PUBLICATION_FILTERS.title}", "contains word", "${query}*"]]`
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
