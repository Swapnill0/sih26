/**
 * Barrel export — import everything from 'daksh-backend'
 */

// Client
export { supabase } from './supabaseClient.js'

// Types
export type * from './types/database.js'

// Services
export * as auth from './services/authService.js'
export * as internships from './services/internshipService.js'
export * as jobs from './services/jobService.js'
export * as skillProfiles from './services/skillProfileService.js'
export * as learningPrograms from './services/learningProgramService.js'
export * as portfolio from './services/portfolioService.js'
export * as academicOpportunities from './services/academicOpportunityService.js'
export * as analytics from './services/analyticsService.js'
