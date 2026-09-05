import type { UserRole } from '../types/domain'
import {
  LayoutDashboard,
  ClipboardList,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Building2,
  Users,
  BarChart3,
  BookOpenCheck,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
}

export const ROLE_LABEL: Record<UserRole, string> = {
  student: 'Student',
  industry: 'Industry Partner',
  academician: 'Academician',
  institution: 'Institution Admin',
}

export const ROLE_TAGLINE: Record<UserRole, string> = {
  student: 'Grow your skills into offers.',
  industry: 'Source ready, verified talent.',
  academician: 'Find FDPs, training, and research partners.',
  institution: 'Track readiness across every cohort.',
}

export const ROLE_NAV: Record<UserRole, NavItem[]> = {
  student: [
    { label: 'Overview', to: '/app/student', icon: LayoutDashboard },
    { label: 'Skill assessment', to: '/app/student/skill-assessment', icon: ClipboardList },
    { label: 'Internships', to: '/app/student/internships', icon: Briefcase },
    { label: 'Learning programs', to: '/app/student/learning', icon: GraduationCap },
    { label: 'Portfolio', to: '/app/student/portfolio', icon: FolderGit2 },
  ],
  industry: [
    { label: 'Overview', to: '/app/industry', icon: LayoutDashboard },
    { label: 'Postings', to: '/app/industry/postings', icon: Briefcase },
    { label: 'Candidates', to: '/app/industry/candidates', icon: Users },
  ],
  academician: [
    { label: 'Overview', to: '/app/academician', icon: LayoutDashboard },
    { label: 'Opportunities', to: '/app/academician/opportunities', icon: BookOpenCheck },
  ],
  institution: [
    { label: 'Overview', to: '/app/institution', icon: LayoutDashboard },
    { label: 'Analytics', to: '/app/institution/analytics', icon: BarChart3 },
    { label: 'Institutions', to: '/app/institution/departments', icon: Building2 },
  ],
}
