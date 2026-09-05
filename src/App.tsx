import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { DashboardShell, RequireRole } from './components/layout'

import { StudentOverviewPage } from './pages/student/StudentOverviewPage'
import { SkillAssessmentPage } from './pages/student/SkillAssessmentPage'
import { InternshipsPage } from './pages/student/InternshipsPage'
import { LearningProgramsPage } from './pages/student/LearningProgramsPage'
import { PortfolioPage } from './pages/student/PortfolioPage'

import { IndustryOverviewPage } from './pages/industry/IndustryOverviewPage'
import { PostingsPage } from './pages/industry/PostingsPage'
import { CandidatesPage } from './pages/industry/CandidatesPage'

import { AcademicianOverviewPage } from './pages/academician/AcademicianOverviewPage'
import { OpportunitiesPage } from './pages/academician/OpportunitiesPage'

import { InstitutionOverviewPage } from './pages/institution/InstitutionOverviewPage'
import { AnalyticsPage } from './pages/institution/AnalyticsPage'
import { DepartmentsPage } from './pages/institution/DepartmentsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireRole role="student" />}>
        <Route path="/app/student" element={<DashboardShell />}>
          <Route index element={<StudentOverviewPage />} />
          <Route path="skill-assessment" element={<SkillAssessmentPage />} />
          <Route path="internships" element={<InternshipsPage />} />
          <Route path="learning" element={<LearningProgramsPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
        </Route>
      </Route>

      <Route element={<RequireRole role="industry" />}>
        <Route path="/app/industry" element={<DashboardShell />}>
          <Route index element={<IndustryOverviewPage />} />
          <Route path="postings" element={<PostingsPage />} />
          <Route path="candidates" element={<CandidatesPage />} />
        </Route>
      </Route>

      <Route element={<RequireRole role="academician" />}>
        <Route path="/app/academician" element={<DashboardShell />}>
          <Route index element={<AcademicianOverviewPage />} />
          <Route path="opportunities" element={<OpportunitiesPage />} />
        </Route>
      </Route>

      <Route element={<RequireRole role="institution" />}>
        <Route path="/app/institution" element={<DashboardShell />}>
          <Route index element={<InstitutionOverviewPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
        </Route>
      </Route>

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
