"use client";
import { updateReservationStatus, deleteReservation } from "@/lib/actions/admin";
import { Check, X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function StatusButtons({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const onUpdate = async (status: 'confirmed' | 'cancelled') => {
        try {
            await updateReservationStatus(id, status);
            toast.success(`Booking ${status}`);
        } catch (e) {
            toast.error("Update failed");
        }
    };

    const onDelete = async () => {
        if (!confirm("Delete this reservation?")) return;
        setIsDeleting(true);
        try {
            await deleteReservation(id);
            toast.success("Reservation deleted");
        } catch (e) {
            toast.error("Delete failed");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex justify-end gap-2">
            <button onClick={() => onUpdate('confirmed')} className="p-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors"><Check size={18} /></button>
            <button onClick={() => onUpdate('cancelled')} className="p-2 bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition-colors"><X size={18} /></button>
            <button disabled={isDeleting} onClick={onDelete} className="p-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors disabled:opacity-50"><Trash2 size={18} /></button>
        </div>
    );
}