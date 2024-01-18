// components/SlidableModal.js
import React, {useEffect, useState} from "react";

interface AirportListing {
  Id: number;
  OperatingAirlineCode: string;
  OperatingAirlineName: string;
  MarketingAirlineCode: string;
  MarketingAirlineName: string;
  Duration: string;
  StopOvers: number;
  HasStopOver: boolean;
  StopOverDuration: string;
  FlightClass: string;
  DepartureDate: string;
  DepartureAirportCode: string;
  DepartureAirportName: string;
  DepartureAirportFullName: string;
  ArrivalDate: string;
  ArrivalAirportCode: string;
  ArrivalAirportName: string;
  ArrivalAirportFullName: string;
  TicketFare: number;
  ServiceCharge: number;
  TotalFare: number;
  Name?: string;
  CountryCode?: string;
  StateCode?: string;
  StateName?: string;
  Latitude?: string;
  Code?: string;
  Longitude?: string;
  IsLocal?: string;
  Country?: string;
}


interface ModalProps {
  data: any;
  onSelect: any;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ data, onSelect, onClose }) => {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden ">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        </div>

        {/* Use different classes for mobile and larger screens */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`${
            // Apply different classes based on screen size
            window.innerWidth <= 640
              ? " fixed inset-0 h-screen w-screen rounded-2xl "
              : "inline-block align-bottom sm:max-w-lg sm:w-full"
          } bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {/* Add dashed line at the top in mobile view */}
          {window.innerWidth <= 640 && (
            <div className="pt-4" onClick={onClose}>
              <div className="border-t-2 border-gray-300 mx-[11rem] pt-2 "></div>
            </div>
          )}

          <div className="mt-4 mb-8">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 m-4 text-gray-800 hover:text-gray-900 px-[0.8rem]"
            >
              x
            </button>
          </div>
          <div className="modal-content p-2 h-[55rem] md:h-[45rem] overflow-y-auto">
            {/* Set a fixed height and allow vertical scrolling */}
            {data.map((item: any) => (
              <div
                key={item.Id}
                className="modal-item cursor-pointer px-2 py-4 hover:bg-gray-100 flex justify-between border-b-2"
                onClick={() =>  {
                  onSelect(item)
                }}
              >
                <div>
                  <p>{item.StateName}</p>
                  <p>{item.Name}</p>
                </div>

                {/* Fix later */}
                <div className="h-full pt-6">
                  <p>{item.Code}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
