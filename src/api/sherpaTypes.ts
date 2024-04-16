export type SherpaParamsType = {
  // https://v2.sherpa.ac.uk/api/object-retrieval.html
  "api-key": string
  format: "Json" | "Ids"
  "item-type":
    | "funder"
    | "funder_group"
    | "repository"
    | "publisher"
    | "publisher_policy"
    | "publication"
  order?: string
  limit?: number
  offset?: number
  filter?: string
}

export type SherpaPublicationDataType = {
  id: number
  title: {
    title: string
    acronym: string
    preferred: "title" | "acronym"
    language: string
  }[]
  publishers: PublisherDataType[]
  url: string
  listed_in_doaj: "yes" | "no"
  publisher_policy: PublisherPolicyDataType[]
  issns: { issn: string }[]
}

export type PublisherDataType = {
  publisher: {
    id: string
    name: {
      name: string
      acronym: string
      preferred: "name" | "acronym"
      language: string
    }[]
    title: string
    issns: string
    type: string
    url: string
  }
}

export type PublisherPolicyDataType = {
  id: number
  urls: { url: string; description: string }
  open_access_prohibited: "yes" | "no"
  uri: string
  internal_moniker: string
  publication_count: number
}
