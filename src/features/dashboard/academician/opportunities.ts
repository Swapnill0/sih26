import type { AcademicOpportunity } from '../../../types/domain'

export const MOCK_ACADEMIC_OPPORTUNITIES: AcademicOpportunity[] = [
  {
    id: 'ao-1',
    title: 'Faculty Development Program — Applied Machine Learning',
    type: 'Faculty Development Program',
    partnerCompany: 'Harbor & Cole Systems',
    window: '14–18 Sept 2026',
    seats: 30,
    description: 'A one-week intensive on applying ML in industry pipelines, co-run with practicing engineers.',
  },
  {
    id: 'ao-2',
    title: 'Industrial Training — Cloud Platform Engineering',
    type: 'Industrial Training',
    partnerCompany: 'Harbor & Cole Systems',
    window: '2 weeks, rolling intake',
    seats: 15,
    description: 'Hands-on training for faculty to bring current cloud practice back into the classroom.',
  },
  {
    id: 'ao-3',
    title: 'Consultancy — Retail Demand Forecasting',
    type: 'Consultancy',
    partnerCompany: 'Fieldstone Retail',
    window: 'Ongoing, 6-month engagement',
    seats: 2,
    description: 'Short-term consultancy applying forecasting research to live retail data.',
  },
  {
    id: 'ao-4',
    title: 'Collaborative Research — Human-Centred Health AI',
    type: 'Collaborative Research',
    partnerCompany: 'Meridian Health',
    window: 'Proposal deadline: 30 Sept 2026',
    seats: 4,
    description: 'Joint research grant on interpretable models for clinical decision support.',
  },
]
