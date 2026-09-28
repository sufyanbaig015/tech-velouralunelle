import "server-only";

import postgres from "postgres";

// Bookings table. The exclusion constraint makes double booking impossible,
// even when two people submit the same slot at the same moment.
const schema = `
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  start_at timestamptz not null,
  end_at timestamptz not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  name text not null,
  email text not null,
  company text,
  phone text,
  notes text,
  guest_time_zone text not null,
  manage_token_hash text not null unique,
  google_event_id text,
  meet_url text,
  cancel_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bookings_valid_range check (end_at > start_at),
  constraint bookings_no_overlap exclude using gist (tstzrange(start_at, end_at) with &&) where (status = 'confirmed')
);
create index if not exists bookings_start_at_idx on bookings (start_at);
create index if not exists bookings_email_idx on bookings (lower(email));
`;

export type BookingRow = {
  id: string;
  start_at: Date;
  end_at: Date;
  status: "confirmed" | "cancelled";
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  notes: string | null;
  guest_time_zone: string;
  google_event_id: string | null;
  meet_url: string | null;
  cancel_reason: string | null;
  created_at: Date;
};

/** Postgres error code for a violated exclusion constraint (the slot overlaps a confirmed booking). */
export const SLOT_TAKEN_ERROR = "23P01";

let client: postgres.Sql | undefined;
let schemaReady: Promise<unknown> | undefined;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

/** Shared client. Creates the table the first time it is used in each server instance. */
export async function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set.");
  client ??= postgres(process.env.DATABASE_URL, { max: 3, idle_timeout: 20, onnotice: () => {} });
  schemaReady ??= client.unsafe(schema).catch((error) => {
    schemaReady = undefined; // Retry on the next request.
    throw error;
  });
  await schemaReady;
  return client;
}
