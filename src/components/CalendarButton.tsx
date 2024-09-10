import toast from "react-hot-toast";
import { EventAttributes } from "ics";
import useDeviceType from "@/hooks/useDeviceType";
import useBrowserType from "@/hooks/useBrowserType";
import { generateICS } from "@/lib/generateICS";

const calendarEvent: EventAttributes = {
  start: [2024, 11, 16, 18, 0],
  duration: { hours: 4, minutes: 0 },
  title: "Kenil & Mansi's Wedding",
  description: `Join us for the wedding ceremony of Kenil & Mansi.\n\nLocation: https://maps.app.goo.gl/5p8zfSeLxp2W5yg57\nPhone: +919662017916`,
  location: "Vitthal Nagar, Budiya, Surat- 394230",
  url: "https://kenil-weds-mansi.vercel.app",
  status: "CONFIRMED",
  busyStatus: "BUSY",
  alarms: [
    {
      action: "display",
      description: `Kenil and Mansi's wedding is in 2 days!`,
      trigger: { days: 2, before: true },
    },
    {
      action: "display",
      description: `Kenil and Mansi's wedding is tomorrow!`,
      trigger: { days: 1, before: true },
    },
    {
      action: "display",
      description: `Kenil and Mansi's wedding is in 2 hours!`,
      trigger: { hours: 2, before: true },
    },
  ],
};

export default function CalendarButton() {
  const { deviceType } = useDeviceType();
  const { browserType } = useBrowserType();

  const handleSaveToCalendar = async () => {
    const isSafariWithIOs = deviceType === "iOs" && browserType === "Safari";

    try {
      const icsValue = (await generateICS(calendarEvent)) as BlobPart;

      const blob = new Blob([icsValue], {
        type: "text/calendar;charset=utf-8",
      });

      const url = URL.createObjectURL(blob);

      if (isSafariWithIOs) {
        const link = document.createElement("a");

        link.href = url;
        link.download = "wedding-invitation.ics";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);
      } else {
        const webcalUrl = url.replace("http", "webcal");

        window.location.href = webcalUrl;
      }
    } catch (error) {
      console.error("Error generating ICS file: ", error);

      toast.custom(
        <div className="bg-primary/80 rounded-sm font-semibold backdrop-filter p-4 backdrop-blur-sm text-primary-foreground">
          Something went wrong! Please refresh the page and try again.
        </div>
      );
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleSaveToCalendar}>
      Save to Calendar
    </button>
  );
}
