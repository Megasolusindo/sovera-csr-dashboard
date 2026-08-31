export type SignalSource = 'BEI_REPORT' | 'NEWS' | 'CSR_PDF' | 'SOCIAL';

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
  created_at?: string;
}

// 2. Program Lembaga (Tenant Isolated)
export interface InstitutionProgram {
  id: string;
  org_id?: string;
  title: string;
  description: string;
  asnaf_category: string;
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
  asnaf_category: string;
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
