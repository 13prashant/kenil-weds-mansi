import toast from "react-hot-toast";
import { EventAttributes } from "ics";
import useDeviceType from "@/hooks/useDeviceType";
import useBrowserType from "@/hooks/useBrowserType";
import { generateICS } from "@/lib/generateICS";

export const GOOGLE_MAP_URL = "https://maps.app.goo.gl/5p8zfSeLxp2W5yg57";
export const LOCATION =
  "Jay Vishwam House, Vitthal Nagar, Budiya, Surat- 394230";

const calendarEvent: EventAttributes = {
  start: [2024, 11, 16, 17, 0],
  startInputType: "local",
  startOutputType: "local",

  end: [2024, 11, 17, 22, 0],
  endInputType: "local",
  endOutputType: "local",

  title: "Kenil & Mansi's Wedding",
  description: `🎉 Join us for the wedding ceremony of Kenil & Mansi 💍\n\n📍 Location: ${GOOGLE_MAP_URL}\n📞 Phone: +919662017916`,

  location: LOCATION,

  url: "https://kenil-weds-mansi.vercel.app",
  status: "CONFIRMED",
  busyStatus: "BUSY",

  alarms: [
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
        const params = new URLSearchParams({
          action: "TEMPLATE",
          dates: "20241116T170000/20241117T220000",
          details: calendarEvent.description as string,
          location: calendarEvent.location as string,
          text: calendarEvent.title as string,
          ctz: "Asia/Kolkata",
        });

        window.open(
          `https://calendar.google.com/calendar/render?${params.toString()}`,
          "_blank"
        );
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
