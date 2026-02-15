import { useEffect, useState } from "react";
import { type eventType } from "../../../interfaces";
import { useParams } from "react-router-dom";
import { Image, message } from "antd";
import Spinner from "../../../components/Spinner";
import { getEvent } from "../../../apiservices/eventService";
import { MapPin, Timer } from "lucide-react";
import {
  getDateTimeFormat,
  getDateFormat,
} from "../../../helpers/dateTimeFormat";
import TicketSelection from "./common/TicketSelection";

function EventInfoPage() {
  const [eventData, setEventData] = useState<eventType | null>(null);
  const [loading, setLoading] = useState(false);
  const params: any = useParams();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEvent(params.id);
      setEventData(response.data);
    } catch (error) {
      message.error("Failed to Fetch Event");
    } finally {
      setLoading(false);
    }
  };

  const renderEventProperty = (label: string, value: any) => {
    return (
      <div className="flex flex-col">
        <span className="text-gray-500 text-sm">{label}</span>
        <span className="text-black font-semibold">{value}</span>
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    eventData && (
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-gray-700">
            {eventData.name}
          </h1>
          <div className="flex gap-10">
            <div className="flex gap-2 text-gray-500 items-center">
              <MapPin size={16} />
              <span className="text-gray-600 text-sm">
                {eventData.address}, {eventData.city}
              </span>
            </div>
            <div className="flex gap-2 text-gray-500 items-center">
              <Timer size={16} />
              <span className="text-gray-600 text-sm">
                {getDateTimeFormat(`${eventData.date} ${eventData.time}`)}
              </span>
            </div>
          </div>
        </div>

        {Array.isArray(eventData.media) && eventData.media.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
            {eventData.media.map((media: string, index: number) => (
              <Image
                src={media}
                height={220}
                className="object-cover rounded"
                key={index}
              />
            ))}
          </div>
        )}

        <div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {eventData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 bg-gray-100 rounded gap-5">
          {renderEventProperty("Organizer", eventData.organizer)}
          {renderEventProperty("Address", eventData.address)}
          {renderEventProperty("City", eventData.city)}
          {renderEventProperty("Date", getDateFormat(eventData.date))}
          {renderEventProperty("Time", eventData.time)}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            {renderEventProperty(
              "Guests", 
              Array.isArray(eventData.guests) 
                ? eventData.guests.join(", ") 
                : ""
            )}
          </div>
        </div>

        {Array.isArray(eventData.tickets) && eventData.tickets.length > 0 && (
          <div>
            <TicketSelection eventData={eventData} />
          </div>
        )}
      </div>
    )
  );
}

export default EventInfoPage;