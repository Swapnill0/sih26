import { useState } from 'react'
import { Card, CardHeader, CardBody, Badge, Button, Label, Input, Select, Textarea } from '../../components/ui'
import { MOCK_INTERNSHIPS } from '../../features/internships/data/internships'
import { MOCK_JOBS } from '../../features/placements/data/jobs'

interface DraftPosting {
  title: string
  skills: string
  type: 'Internship' | 'Full-time role'
}

export function PostingsPage() {
  const [drafts, setDrafts] = useState<DraftPosting[]>([])
  const [form, setForm] = useState<DraftPosting>({ title: '', skills: '', type: 'Internship' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return
    setDrafts((prev) => [form, ...prev])
    setForm({ title: '', skills: '', type: 'Internship' })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader>
          <h3 className="font-display text-base text-ink">Live postings</h3>
        </CardHeader>
        <CardBody className="divide-y divide-line p-0">
          {drafts.map((d, idx) => (
            <div key={`draft-${idx}`} className="px-5 py-4">
              <div className="flex items-center gap-2">
                <p className="font-medium text-ink">{d.title}</p>
                <Badge tone="gold">Draft, unpublished</Badge>
              </div>
              <p className="mt-1 text-sm text-ink-faint">{d.type} · Just added</p>
            </div>
          ))}
          {[...MOCK_INTERNSHIPS, ...MOCK_JOBS].map((p) => (
            <div key={p.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium text-ink">{p.title}</p>
                <p className="text-sm text-ink-faint">
                  {'durationWeeks' in p ? `Internship · ${p.durationWeeks} weeks` : 'Full-time'} · {p.applicants} applicants
                </p>
              </div>
              <div className="flex flex-wrap justify-end gap-1.5">
                {p.requiredSkills.slice(0, 2).map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card className="h-fit lg:col-span-2">
        <CardHeader>
          <h3 className="font-display text-base text-ink">Post a new opportunity</h3>
        </CardHeader>
        <CardBody>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="p-title">Role title</Label>
              <Input id="p-title" placeholder="e.g. Backend Development Intern" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="p-type">Type</Label>
              <Select id="p-type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as DraftPosting['type'] })}>
                <option>Internship</option>
                <option>Full-time role</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="p-skills">Required skills</Label>
              <Textarea id="p-skills" placeholder="Comma-separated, e.g. SQL, Communication" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
            </div>
            <Button type="submit" className="w-full">Publish posting</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
