import BookingForm from "@/components/reservations/BookingForm";
import { Clock, Phone, MapPin } from "lucide-react";

export default function ReservationPage() {
    return (
        <div className="min-h-screen pt-40 pb-20 bg-dark px-6 lg:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div>
                    <h1 className="text-6xl font-display mb-8">Table <br /><span className="text-primary-500 italic">Reservation</span></h1>
                    <p className="text-white/60 text-lg mb-12 max-w-md">
                        Reserve your spot for an evening of luxury. We accept bookings up to 30 days in advance.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4 text-white/80">
                            <MapPin className="text-primary-500 mt-1" />
                            <div>
                                <p className="font-bold">Location</p>
                                <p className="text-sm text-white/50 italic">123 Gastronomy St, Manhattan, NY</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 text-white/80">
                            <Phone className="text-primary-500 mt-1" />
                            <div>
                                <p className="font-bold">Contact</p>
                                <p className="text-sm text-white/50">+1 (212) 555-0198</p>
                            </div>
                        </div>
                    </div>
                </div>

                <BookingForm />
            </div>
        </div>
    );
}