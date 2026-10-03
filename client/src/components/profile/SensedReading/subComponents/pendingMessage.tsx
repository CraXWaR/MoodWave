import type { SensedStatus } from "../../../../types/entry.type";

export function pendingMessage(status: SensedStatus): string {
  if (status === "reading") return "Reading your note…";
  if (status === "idle") return "Add a note next time and the AI will read it.";
  return "No clear emotion in your note.";
}
