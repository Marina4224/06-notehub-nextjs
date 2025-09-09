import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
    totalPages: number;
}

export async function fetchNotes(
  page: number,
  perPage: number,
  search?: string
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;

  const response = await api.get<FetchNotesResponse>("/notes", { params });
  return response.data;
  
  }
export type CreateNoteInput = Omit<Note, "id" | "createdAt">;

export async function createNote(
  note: CreateNoteInput
): Promise<Note> {
  const response = await api.post<Note>("/notes", note);
  return response.data;
}

export async function deleteNote(
  id: string
): Promise<void> {
  await api.delete(`/notes/${id}`);
}
export async function fetchNoteById(id: Note['id']): Promise<Note> {
    const response = await axios.get<Note>(`${BASE_URL}/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}`},
    });
return response.data;
}