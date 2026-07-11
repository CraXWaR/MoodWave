// src/hooks/useCheckIn.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { entriesService } from "../services/entries.service";

export function useCheckIn() {
    const navigate = useNavigate();

    const [mood, setMood] = useState<number | null>(null);
    const [note, setNote] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (mood === null) {
            setError("Pick a mood before submitting.");
            return;
        }

        setIsSubmitting(true);
        try {
            await entriesService.create({ mood, note: note.trim() || undefined });
            //TODO: Redirect to dashboard when page is ready for now 'home' is the dashboard
            navigate("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        mood,
        setMood,
        note,
        setNote,
        error,
        isSubmitting,
        handleSubmit,
    };
}