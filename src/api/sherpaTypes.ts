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

export interface SherpaPublicationDataType {
  system_metadata: JournalSystemMetadata
  type_phrases: Phrase[]
  type: JournalType
  id: number
  listed_in_doaj_phrases: Phrase[]
  issns: Issn[]
  publisher_policy: PublisherPolicy[]
  publishers: PublisherElement[]
  listed_in_doaj: ListedInDoaj
  title: Title[]
  url: string
  tj_status_phrases?: Phrase[]
  tj_status?: string[]
  notes?: string
}

export interface Issn {
  issn: string
  type?: IssnType
  type_phrases?: Phrase[]
}

export enum IssnType {
  Electronic = "electronic",
  Print = "print",
}

export interface Phrase {
  phrase: string
  value: string
  language: string
}

export enum ListedInDoaj {
  No = "no",
  Yes = "yes",
}

export interface PublisherPolicy {
  urls: PublisherPolicyURL[]
  internal_moniker: string
  open_access_prohibited: string
  open_access_prohibited_phrases: Phrase[]
  publication_count: number
  uri: string
  permitted_oa: PermittedOa[]
  id: number
}

export interface PermittedOa {
  id: number
  location?: Location
  additional_oa_fee_phrases?: Phrase[]
  article_version_phrases: Phrase[]
  article_version: ArticleVersion[]
  additional_oa_fee?: ListedInDoaj
  license?: LicenseElement[]
  copyright_owner?: CopyrightOwner
  copyright_owner_phrases?: Phrase[]
  conditions?: string[]
  publisher_deposit?: PublisherDeposit[]
  prerequisites?: Prerequisites
  embargo?: Embargo
  public_notes?: string[]
}

export enum ArticleVersion {
  Accepted = "accepted",
  Published = "published",
  Submitted = "submitted",
}

export enum CopyrightOwner {
  Authors = "authors",
  Publishers = "publishers",
}

export interface Embargo {
  units: Units
  units_phrases: Phrase[]
  amount: number
}

export enum Units {
  Months = "months",
}

export interface LicenseElement {
  license_phrases: Phrase[]
  version?: string
  license: LicenseEnum
}

export enum LicenseEnum {
  AllRightsReserved = "all_rights_reserved",
  BespokeLicense = "bespoke_license",
  Cc0 = "cc0",
  CcBy = "cc_by",
  CcByNc = "cc_by_nc",
  CcByNcNd = "cc_by_nc_nd",
  CcByNcSa = "cc_by_nc_sa",
  CcByNd = "cc_by_nd",
  CcBySa = "cc_by_sa",
}

export interface Location {
  location: string[]
  location_phrases: Phrase[]
  named_repository?: string[]
  named_academic_social_network?: string[]
}

export interface Prerequisites {
  prerequisites_phrases?: Phrase[]
  prerequisites?: string[]
  prerequisite_funders?: PrerequisiteFunder[]
}

export interface PrerequisiteFunder {
  system_metadata: PrerequisiteFunderSystemMetadata
  funder_metadata: FunderMetadata
}

export interface FunderMetadata {
  notes?: string
  country_phrases?: Phrase[]
  groups?: Group[]
  id: number
  identifiers?: Identifier[]
  url: FunderMetadataURL[]
  name: Title[]
  country?: string
}

export interface Group {
  id: number
  type: GroupType
  name: Name
  uri: string
}

export enum Name {
  AssociationOfMedicalResearchCharities = "Association of Medical Research Charities",
  EuropePMCFundersGroup = "Europe PMC Funders' Group",
  PlanSFunders = "Plan S Funders",
  UKResearchAndInnovation = "UK Research and Innovation",
}

export enum GroupType {
  FunderGroup = "funder_group",
}

export interface Identifier {
  identifier: string
  type: IdentifierType
  type_phrases: Phrase[]
}

export enum IdentifierType {
  Fundref = "fundref",
  Ror = "ror",
}

export interface Title {
  language?: string
  name?: string
  preferred?: Preferred
  preferred_phrases?: Phrase[]
  language_phrases?: Phrase[]
  acronym?: string
  title?: string
}

export enum Preferred {
  Acronym = "acronym",
  Name = "name",
}

export interface FunderMetadataURL {
  language_phrases?: Phrase[]
  language?: string
  url: string
}

export interface PrerequisiteFunderSystemMetadata {
  id: number
  uri: string
}

export interface PublisherDeposit {
  system_metadata: PrerequisiteFunderSystemMetadata
  repository_metadata: RepositoryMetadata
}

export interface RepositoryMetadata {
  type: RepositoryMetadataType
  name: Title[]
  url: string
  type_phrases: Phrase[]
  notes?: string
}

export enum RepositoryMetadataType {
  Disciplinary = "disciplinary",
}

export interface PublisherPolicyURL {
  url: string
  description: string
}

export interface PublisherElement {
  publisher: PublisherPublisher
  relationship_type: RelationshipType
  relationship_type_phrases: Phrase[]
}

export interface PublisherPublisher {
  id: number
  url: string
  name: Title[]
  uri: string
  publication_count: number
  country: string
  country_phrases: Phrase[]
  identifiers?: Identifier[]
  imprints_id?: number[]
  imprint_of_id?: number
}

export enum RelationshipType {
  CommercialPublisher = "commercial_publisher",
  CopyrightHolder = "copyright_holder",
  Imprint = "imprint",
  SocietyPublisher = "society_publisher",
  UniversityPublisher = "university_publisher",
}

export interface JournalSystemMetadata {
  publicly_visible: ListedInDoaj
  publicly_visible_phrases: Phrase[]
  date_modified: Date
  id: number
  date_created: Date
  uri: string
}

export enum JournalType {
  Journal = "journal",
}
