import type { DemandTrendPoint, PlacementFunnelStage } from '../../../types/domain'

export const DEMAND_TREND: DemandTrendPoint[] = [
  { month: 'Mar', demandIndex: 58 },
  { month: 'Apr', demandIndex: 61 },
  { month: 'May', demandIndex: 65 },
  { month: 'Jun', demandIndex: 63 },
  { month: 'Jul', demandIndex: 70 },
  { month: 'Aug', demandIndex: 76 },
]

export const PLACEMENT_FUNNEL: PlacementFunnelStage[] = [
  { stage: 'Registered', count: 1240 },
  { stage: 'Assessed', count: 980 },
  { stage: 'Applied', count: 710 },
  { stage: 'Shortlisted', count: 340 },
  { stage: 'Offered', count: 205 },
]

export const DEPARTMENT_READINESS = [
  { department: 'Computer Science', readiness: 82 },
  { department: 'Electronics', readiness: 68 },
  { department: 'Mechanical', readiness: 54 },
  { department: 'Information Tech', readiness: 79 },
  { department: 'Civil', readiness: 47 },
]
