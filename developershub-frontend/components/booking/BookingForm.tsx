'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CalendarIcon } from 'lucide-react';
import { appointmentsApi, paymentsApi, Service, servicesApi } from '@/lib/api';

export default function BookingForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    servicesApi.getAll()
      .then((res) => setServices(res))
      .catch(() => toast.error('Failed to load services'));
  }, []);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !date || !time) {
      toast.error('Please select service, date and time');
      return;
    }

    setLoading(true);

    try {
      const dateTime = new Date(date);
      const [hours, minutes] = time.split(':');
      dateTime.setHours(parseInt(hours), parseInt(minutes));

      const appointment = await appointmentsApi.create({
        name,
        email,
        phone,
        dateTime: dateTime.toISOString(),
        serviceId: selectedService,
        notes,
      });

      const selectedServiceData = services.find((s) => s.id === selectedService);
      if (selectedServiceData?.price && selectedServiceData.price > 0) {
        const paymentRes = await paymentsApi.createCheckout({
          appointmentId: appointment.id,
          amount: selectedServiceData.price,
        });

        window.location.href = paymentRes.url;
        return;
      }

      toast.success('Booking confirmed!');
      router.push('/appointments');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-3xl border border-foreground/15 bg-background/70 p-10 backdrop-blur-2xl">
          <h2 className="text-4xl font-display tracking-tight text-center">Book a Strategy Call</h2>
          <p className="text-muted-foreground text-center mt-2">Choose a service and time that works for you</p>

          <form onSubmit={handleBooking} className="mt-10 grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/70">Service</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="h-12 w-full rounded-xl border border-foreground/20 bg-background/70 px-4 text-foreground outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title} {service.price ? `($${service.price})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/70">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 w-full rounded-xl border border-foreground/20 bg-background/70 px-4 text-foreground outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.15em] text-foreground/70">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-foreground/20 bg-background/70 px-4 text-foreground outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.15em] text-foreground/70">Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12 w-full rounded-xl border border-foreground/20 bg-background/70 px-4 text-foreground outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/70">Notes / Project Details</label>
                <textarea
                  className="w-full min-h-[120px] rounded-2xl border border-foreground/20 bg-background/70 p-4 text-foreground outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your project..."
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/70 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-12 w-full rounded-xl border border-foreground/20 bg-background/70 px-4 text-foreground outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.15em] text-foreground/70">Select Time</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-12 w-full rounded-xl border border-foreground/20 bg-background/70 px-4 text-foreground outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
                >
                  <option value="">Choose time</option>
                  {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Proceed to Booking'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}