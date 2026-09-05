import { Link } from 'react-router-dom'
import { ClipboardList, Briefcase, Target, Users2, ArrowRight } from 'lucide-react'
import { SiteHeader, SiteFooter } from '../components/layout'
import { Button, Card, Badge } from '../components/ui'
import { PathwayDiagram } from '../components/marketing/PathwayDiagram'
import type { UserRole } from '../types/domain'
import { ROLE_LABEL, ROLE_TAGLINE } from '../config/roles'

const PILLARS = [
  {
    icon: ClipboardList,
    title: 'Skill development',
    body: 'A short assessment turns into a skill profile, with strengths, gaps, and a personal learning path ranked against current demand.',
  },
  {
    icon: Briefcase,
    title: 'Internships',
    body: 'Industry posts roles with the skills they need. Students see match scores instead of scrolling a generic job board.',
  },
  {
    icon: Target,
    title: 'Placements',
    body: 'Applications, shortlisting, and offers tracked in one place, with readiness dashboards for institutions.',
  },
  {
    icon: Users2,
    title: 'Collaboration',
    body: 'Faculty development programs, industrial training, consultancy, and joint research, posted directly by partner companies.',
  },
]

const ROLES: { role: UserRole; detail: string }[] = [
  { role: 'student', detail: 'Assess your skills, apply to matched roles, and build a verified portfolio.' },
  { role: 'industry', detail: 'Post internships and jobs, and see candidates ranked by real skill match.' },
  { role: 'academician', detail: 'Find FDPs, industrial training, consultancy, and research partners.' },
  { role: 'institution', detail: 'Track cohort readiness, applications, and placement outcomes.' },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      {/* Hero */}
      <section className="container-page pb-16 pt-16 sm:pt-24">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
            Turn coursework into a career, one verified skill at a time.
          </h1>
          <p className="mt-5 max-w-prose text-lg text-ink-soft">
            Daksh connects students, industry, and academic institutions on one platform —
            from a skill assessment, to a matched internship, to a placement an institution
            can actually measure.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/login">
              <Button size="lg">
                Get started
                <ArrowRight size={16} className="ml-1.5" />
              </Button>
            </Link>
            <a href="#pillars">
              <Button variant="secondary" size="lg">See how it works</Button>
            </a>
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-line bg-paper-raised p-6 sm:p-8" id="pathway">
          <PathwayDiagram />
        </div>
      </section>

      {/* Pillars */}
      <section id="pillars" className="border-t border-line bg-paper-sunken/40">
        <div className="container-page py-16">
          <h2 className="font-display text-2xl text-ink">Everything the problem statement asks for, in one place</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <Card key={p.title} className="p-5">
                <p.icon size={20} className="text-teal-600" strokeWidth={2} />
                <h3 className="mt-3 font-display text-lg text-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{p.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="container-page py-16">
        <h2 className="font-display text-2xl text-ink">Built for four kinds of users</h2>
        <p className="mt-2 max-w-prose text-ink-soft">
          Pick a role to explore a working demo dashboard — no real signup required for this prototype.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map(({ role, detail }) => (
            <Card key={role} className="flex flex-col p-5">
              <Badge tone="teal" className="w-fit">{ROLE_LABEL[role]}</Badge>
              <p className="mt-3 text-sm text-ink-soft">{detail}</p>
              <p className="mt-3 text-xs italic text-ink-faint">{ROLE_TAGLINE[role]}</p>
              <Link to={`/login?role=${role}`} className="mt-5">
                <Button variant="secondary" size="sm" className="w-full">
                  Continue as {ROLE_LABEL[role]}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
