create table public.projects (
    id bigint generated by default as identity,
    name text not null,
    content jsonb null,
    owner_id uuid not null,
    created_at timestamp with time zone not null default now(),
    constraint projects_pkey primary key (id),
    constraint public_projects_owner_id_fkey foreign key (owner_id) references auth.users (id) on delete cascade
) tablespace pg_default;