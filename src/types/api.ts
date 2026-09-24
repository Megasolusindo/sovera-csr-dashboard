export type SignalSource = 
  | 'BEI_REPORT' 
  | 'NEWS' 
  | 'CSR_PDF' 
  | 'SOCIAL'
  | 'PDF_DOCUMENT'
  | 'NEWS_ARTICLE'
  | 'NEWS_RSS'
  | 'BUMN_PORTAL'
  | 'GRANTS_PORTAL'
  | 'CSR_OPPORTUNITY_SEARCH'
  | 'COMPANY_ENRICHMENT'
  | 'SEARCH_DISCOVERY'
  | 'RAW_WEB'
  | 'SOCIAL_POST';

export type OrgType = 
  | 'HUMANITARIAN_NGO'
  | 'DISASTER_RELIEF'
  | 'ENVIRONMENT_CONSERVATION'
  | 'HEALTH_EDUCATION'
  | 'ZAKAT_WAQF_INSTITUTION'
  | 'UNIVERSITY_ENDOWMENT';

export type PrimaryCluster = 
  | 'Disaster & Emergency'
  | 'Education & Literacy'
  | 'Health & WASH'
  | 'Economic Empowerment'
  | 'Climate & Environment'
  | 'Social Protection & Vulnerable Groups'
  | 'Zakat & Wakaf Fiqh'
  | 'Community Development';

export type DealStage = 
  | 'DISCOVERED' 
  | 'RESEARCH' 
  | 'PITCHED' 
  | 'NEGOTIATION' 
  | 'CLOSED_WON' 
  | 'CLOSED_LOST';

// 1. Sinyal Korporasi Publik
export interface CorporateSignal {
  id: string;
  company_name: string;
  industry_sector: string;
  source_type: SignalSource;
  source_url: string;
  summary: string;
  extracted_pillar: string;
  target_regions: string[];
  estimated_budget_signal: number | null;
  trigger_event: string;
  intent_score: number;
  content_hash?: string;
  published_date: string;
  verification_status?: 'VERIFIED' | 'PARTIALLY_VERIFIED' | 'UNVERIFIED' | 'RETRACTED' | 'REJECTED';
  created_at?: string;
}

// 2. Program Lembaga (Tenant Isolated & Multi-Sector)
export interface InstitutionProgram {
  id: string;
  org_id?: string;
  title: string;
  description: string;
  primary_cluster?: PrimaryCluster | string;
  target_sdgs?: string[];
  asnaf_category?: string;
  esg_pillar: string;
  target_beneficiaries: string;
  embedding_generated?: boolean;
  created_at?: string;
  updated_at?: string;
}

// 3. Rekomendasi Program Match
export interface MatchedProgram {
  program_id: string;
  title: string;
  primary_cluster?: string;
  asnaf_category?: string;
  esg_pillar: string;
  similarity_score: number;
}

export interface SignalMatchResponse {
  signal_id: string;
  company_name?: string;
  top_matched_programs: MatchedProgram[];
}

// 4. Deal Pipeline Item
export interface DealPipelineItem {
  id: string;
  org_id?: string;
  signal_id?: string;
  company_name: string;
  deal_stage: DealStage;
  estimated_value: number | null;
  target_program_id: string | null;
  target_program_name?: string | null;
  generated_icebreaker?: string;
  generated_proposal?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// 5. Generate Pitch & Proposal Response
export interface GeneratedPitchResponse {
  deal_id: string;
  icebreaker: string;
  pitch_deck_outline: string[];
  proposal_markdown: string;
}

// 6. RBAC & Auth Types
export type TenantType = 'ORGANIZATION' | 'CORPORATE' | 'ADMIN';
export type UserRole = 'ORG_ADMIN' | 'DIRECTOR' | 'FUNDRAISER' | 'CORP_ADMIN' | 'CSR_MANAGER' | 'REVIEWER' | 'SUPERADMIN';

export interface User {
  id: string;
  org_id: string;
  org_name?: string;
  email: string;
  full_name: string;
  role: UserRole;
  tenant_type?: TenantType;
  company_id?: string | null;
  is_active?: boolean;
  created_at?: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface Company {
  id: string;
  name: string;
  slug?: string;
  ticker?: string;
  industry_sector?: string;
  website?: string | null;
  linkedin_url?: string | null;
  linkedin_status?: 'VALID' | 'INVALID' | 'UNVERIFIED' | string | null;
  instagram_url?: string | null;
  instagram_status?: 'VALID' | 'INVALID' | 'UNVERIFIED' | string | null;
  facebook_url?: string | null;
  youtube_url?: string | null;
  hq_address?: string;
  csr_pillar_focus?: string[];
  annual_csr_budget_est?: number;
  esg_rating?: string;
  verification_status?: 'VERIFIED' | 'PENDING' | 'UNVERIFIED';
  priority_tier?: 'TIER_1' | 'TIER_2' | 'TIER_3';
  csr_category?: 'SANGAT_AKTIF' | 'AKTIF' | 'POTENSIAL';
  partner_ngo?: string;
  created_at?: string;
  updated_at?: string;
}

// 7. Corporate Program & Visibility Types
export type CorporateProgramVisibility = 'PUBLIC' | 'CURATED' | 'PRIVATE';

export interface CorporateProgram {
  id: string;
  name: string;
  companyName: string;
  pillar: string;
  status: 'ACTIVE' | 'PLANNED' | 'COMPLETED';
  budgetAmount: string;
  impactSummary: string;
  startDate: string;
  endDate: string;
  partnerNGO: string;
  visibility: CorporateProgramVisibility;
  curatedRequirements?: string;
  created_at?: string;
}



