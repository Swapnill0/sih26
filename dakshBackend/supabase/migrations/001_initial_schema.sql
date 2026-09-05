-- ============================================================
-- Daksh — Academia–Industry Collaboration Portal
-- Supabase / PostgreSQL initial schema
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------
-- 1. User profiles (extends Supabase auth.users)
-- -----------------------------------------------------------
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  name          text        not null,
  email         text        not null unique,
  role          text        not null check (role in ('student', 'industry', 'academician', 'institution')),
  avatar_initials text      not null default '',
  organization  text,
  created_at    timestamptz not null default now()
);

-- Auto-create a profile row when a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name, email, role, avatar_initials, organization)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'role', 'student'),
    coalesce(new.raw_user_meta_data ->> 'avatar_initials', ''),
    new.raw_user_meta_data ->> 'organization'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- -----------------------------------------------------------
-- 2. Skill profiles (one per student)
-- -----------------------------------------------------------
create table if not exists public.skill_profiles (
  id               uuid primary key default uuid_generate_v4(),
  student_id       uuid not null references public.profiles(id) on delete cascade,
  generated_on     timestamptz not null default now(),
  scores           jsonb not null default '[]'::jsonb,
  strengths        text[] not null default '{}',
  gaps             text[] not null default '{}',
  recommended_roles text[] not null default '{}',
  created_at       timestamptz not null default now(),
  unique (student_id)  -- one profile per student, upsert-friendly
);

-- -----------------------------------------------------------
-- 3. Internships
-- -----------------------------------------------------------
create table if not exists public.internships (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  company         text not null,
  location        text not null,
  mode            text not null check (mode in ('Remote', 'Hybrid', 'On-site')),
  stipend         text,
  duration_weeks  int  not null,
  required_skills text[] not null default '{}',
  posted_on       date not null default current_date,
  applicants      int  not null default 0,
  posted_by       uuid references public.profiles(id) on delete set null,
  created_at      timestamptz not null default now()
);

-- -----------------------------------------------------------
-- 4. Applications (student → internship)
-- -----------------------------------------------------------
create table if not exists public.applications (
  id             uuid primary key default uuid_generate_v4(),
  internship_id  uuid not null references public.internships(id) on delete cascade,
  student_id     uuid not null references public.profiles(id) on delete cascade,
  status         text not null default 'applied'
                   check (status in ('saved', 'applied', 'shortlisted', 'interviewing', 'offered', 'rejected')),
  updated_on     timestamptz not null default now(),
  created_at     timestamptz not null default now(),
  unique (internship_id, student_id)
);

-- -----------------------------------------------------------
-- 5. Job openings (placements)
-- -----------------------------------------------------------
create table if not exists public.job_openings (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  company         text not null,
  location        text not null,
  type            text not null check (type in ('Full-time', 'Internship-to-hire')),
  ctc_range       text,
  required_skills text[] not null default '{}',
  min_eligibility text not null default '',
  posted_on       date not null default current_date,
  applicants      int  not null default 0,
  posted_by       uuid references public.profiles(id) on delete set null,
  created_at      timestamptz not null default now()
);

-- -----------------------------------------------------------
-- 6. Learning programs
-- -----------------------------------------------------------
create table if not exists public.learning_programs (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  provider        text not null,
  format          text not null check (format in ('Self-paced', 'Cohort', 'Workshop', 'Mentorship')),
  duration_weeks  int  not null,
  skills_covered  text[] not null default '{}',
  level           text not null check (level in ('Beginner', 'Intermediate', 'Advanced')),
  created_at      timestamptz not null default now()
);

-- -----------------------------------------------------------
-- 7. Portfolio items
-- -----------------------------------------------------------
create table if not exists public.portfolio_items (
  id          uuid primary key default uuid_generate_v4(),
  student_id  uuid not null references public.profiles(id) on delete cascade,
  type        text not null check (type in ('Certification', 'Project', 'Internship', 'Achievement')),
  title       text not null,
  issuer      text not null,
  date        date not null,
  verified    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- -----------------------------------------------------------
-- 8. Academic opportunities
-- -----------------------------------------------------------
create table if not exists public.academic_opportunities (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  type            text not null check (type in ('Faculty Development Program', 'Industrial Training', 'Consultancy', 'Collaborative Research')),
  partner_company text not null,
  "window"        text not null,
  seats           int  not null,
  description     text not null default '',
  created_at      timestamptz not null default now()
);

-- -----------------------------------------------------------
-- 9. Analytics: demand trends
-- -----------------------------------------------------------
create table if not exists public.demand_trends (
  id              uuid primary key default uuid_generate_v4(),
  institution_id  uuid references public.profiles(id) on delete cascade,
  month           text not null,
  demand_index    int  not null
);

-- -----------------------------------------------------------
-- 10. Analytics: placement funnel
-- -----------------------------------------------------------
create table if not exists public.placement_funnel (
  id              uuid primary key default uuid_generate_v4(),
  institution_id  uuid references public.profiles(id) on delete cascade,
  stage           text not null,
  count           int  not null
);

-- -----------------------------------------------------------
-- 11. Analytics: department readiness
-- -----------------------------------------------------------
create table if not exists public.department_readiness (
  id              uuid primary key default uuid_generate_v4(),
  institution_id  uuid references public.profiles(id) on delete cascade,
  department      text not null,
  readiness       int  not null
);

-- -----------------------------------------------------------
-- Basic RLS policies (permissive for demo)
-- -----------------------------------------------------------
alter table public.profiles              enable row level security;
alter table public.skill_profiles        enable row level security;
alter table public.internships           enable row level security;
alter table public.applications          enable row level security;
alter table public.job_openings          enable row level security;
alter table public.learning_programs     enable row level security;
alter table public.portfolio_items       enable row level security;
alter table public.academic_opportunities enable row level security;
alter table public.demand_trends         enable row level security;
alter table public.placement_funnel      enable row level security;
alter table public.department_readiness  enable row level security;

-- For the demo: allow all authenticated users to read everything
-- and allow anon access for seeding / demo purposes.
do $$
declare
  tbl text;
begin
  for tbl in
    select unnest(array[
      'profiles', 'skill_profiles', 'internships', 'applications',
      'job_openings', 'learning_programs', 'portfolio_items',
      'academic_opportunities', 'demand_trends', 'placement_funnel',
      'department_readiness'
    ])
  loop
    execute format('
      create policy "Allow full access for demo" on public.%I
        for all
        using (true)
        with check (true);
    ', tbl);
  end loop;
end;
$$;
