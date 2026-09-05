import type { PortfolioItem } from '../../../types/domain'

export const MOCK_PORTFOLIO: PortfolioItem[] = [
  { id: 'p-1', type: 'Certification', title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '2026-05-12', verified: true },
  { id: 'p-2', type: 'Project', title: 'Campus Marketplace App', issuer: 'Self-directed', date: '2026-04-02', verified: false },
  { id: 'p-3', type: 'Internship', title: 'Frontend Intern, Summer 2026', issuer: 'Northwind Analytics', date: '2026-07-20', verified: true },
  { id: 'p-4', type: 'Achievement', title: 'Winner, Inter-College Hackathon', issuer: 'State Tech Council', date: '2026-02-14', verified: true },
]
