"use client";
import { useState, forwardRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import ErrorCard from "./components/errorcard";
import SlidableModal from "./components/modal";
import airports from "../airports.json";
import { useRouter } from "next/navigation";

// const { search } = useSearchContext();
interface PassengerValues {
  adults: number;
  children: number;
  infants: number;
  from: string;
  to: string;
  travelDate: Date | string | null | undefined;
  fromCountry: string;
  toCountry: string;
  fromState: string;
  toState: string;
  fromCode: string;
  toCode: string
}

interface AirportListing {
  Id: number;
	Name: string;
	Code: string;
	CountryCode: string;
	StateCode: string;
	StateName: string
	Latitude: null;
	Longitude: null;
	IsLocal: true;
	Country: string
	
}

export default function Home() {
  const router = useRouter();
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [passengerValues, setPassengerValues] = useState<PassengerValues>({
    adults: 0,
    children: 0,
    infants: 0,
    from: "",
    to: "",
    travelDate: "",
    fromCountry: "",
    fromState: "",
    toCountry: "",
    toState: "",
    fromCode: "",
    toCode: ""
  });
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [errorFrom, setErrorFrom] = useState("");
  const [errorTo, setErrorTo] = useState("");
  const [errorData, setErrorData] = useState("");

  useEffect(() => {
    // Detect mobile screen width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the threshold as needed
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const handleFromSelect = (selectedItem: AirportListing) => {
    // If new value then allow
    if (selectedItem.Name !== passengerValues.to) {
      setPassengerValues((prevValues) => ({
        ...prevValues,
        from: selectedItem.Name,
        fromCountry: selectedItem.Country,
        fromState: selectedItem.StateName,
        fromCode: selectedItem.Code
      }));
      setShowFromModal(false);
      setErrorFrom(""); // Reset error
    } else {
      // Show error card
      setErrorFrom("Current location and  destination can't be the same");
    }
  };

  const handleToSelect = (selectedItem: AirportListing) => {
   
    // If new value then allow
    if (selectedItem.Name !== passengerValues.from) {
      setPassengerValues((prevValues) => ({
        ...prevValues,
        to: selectedItem.Name,
        toCountry: selectedItem.Country,
        toState: selectedItem.StateName,
        toCode: selectedItem.Code
      }));
      setShowToModal(false);
      setErrorTo(""); // Reset error
    } else {
      // Show error card
      setErrorTo("Current location and destination can't be the same");
    }
  };

  const handleSubmit = async () => {
    console.log("submit");
    if (
      passengerValues.from == "" ||
      passengerValues.to == "" ||
      passengerValues.travelDate == ""
    ) {
      // Error due to invalid data
      setErrorData("Invalid data");
      console.log("invalid data");
    } else {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      router.push(
        `/listing?from=${passengerValues.from}&to=${passengerValues.to}&date=${passengerValues.travelDate}&fromCountry=${passengerValues.fromCountry}&toCountry=${passengerValues.toCountry}&toCode=${passengerValues.toCode}&fromCode=${passengerValues.fromCode}&fromState=${passengerValues.fromState}&toState=${passengerValues.toState}&adults=${passengerValues.adults}&children=${passengerValues.children}&infants=${passengerValues.infants}`
      );
    }
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      ref={ref}
      className="example-custom-input rounded w-[20rem] pl-2 py-4 flex items-center gap-[0.6rem]"
      onClick={onClick}
    >
      <img src="/svgs/departure.svg" width={70} height={70} alt="" />
      <p className="text-sm">{value}</p>
    </button>
  ));

  const handlePassengerChange = (type: string, value: number) => {
    setPassengerValues((prevValues) => ({
      ...prevValues,
      [type]: Math.max(0, prevValues[type] + value), // Ensure the value doesn't go below 0
    }));
  };

  console.log(passengerValues)

  return (
    <main className=" p-4 bg-[#f7f7f7]">
      <div className="flex flex-col items-center">
        <div className="my-4">
          <h1 className="font-medium ">Search Flight</h1>
        </div>

        {/* From Destination */}
        <div
          className="flex items-center gap-[1rem] bg-white w-[20rem] mt-3 px-[0.5rem] rounded h-12"
          onClick={() => setShowFromModal(true)}
        >
          <img
            className="mr-4"
            src="/svgs/from destination.svg"
            alt="From Destination"
          />
          <p className="text-sm text-center">{passengerValues.from}</p>
        </div>

        {/* To Destination */}
        <div
          className="flex items-center gap-[1rem] bg-white w-[20rem] my-3 px-[0.5rem] rounded h-12"
          onClick={() => setShowToModal(true)}
        >
          <img
            className="mr-7"
            src="/svgs/to destination.svg"
            alt="To Destination"
          />
          <p className=" text-sm text-center">{passengerValues.to}</p>
        </div>

        {/* Date Picker */}
        <div className="bg-white rounded flex w-[20rem]">
          <div className="flex justify-around gap-[-4rem] ">
            <DatePicker
              withPortal
              dateFormat="yyyy/MM/dd"
              minDate={new Date()}
              selected={passengerValues.travelDate as Date}
              onChange={(date) =>
                setPassengerValues((prevValues) => ({
                  ...prevValues,
                  travelDate: date,
                }))
              }
              customInput={<ExampleCustomInput />}
              popperPlacement={isMobile ? "top-start" : "bottom-start"}
            />
            {/* <p className="">{passengerValues.travelDate.toString()}</p> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mb-4 mt-8">
        <div className="w-[20rem]">
          <img className="" src="svgs/passengers.svg" alt="Passengers" />
        </div>
      </div>
      <div className="flex flex-col items-center mb-[12rem]">
        {/* Adults */}
        <div className="flex justify-between items-center bg-white w-[20rem] rounded pl-4 pr-1 py-1">
          <div>
            <img src="/svgs/adults.svg" alt="Adults" />
          </div>

          <div className="flex items-center justify-between gap-6">
            <img
              src="/svgs/minus.svg"
              onClick={() => handlePassengerChange("adults", -1)}
            />
            <p className="w-2 text-center">{passengerValues.adults}</p>
            <img
              src="/svgs/addition.svg"
              onClick={() => handlePassengerChange("adults", 1)}
            />
          </div>
        </div>

        {/* Children */}
        <div className="flex justify-between items-center bg-white w-[20rem] my-3 rounded pl-4 pr-1 py-1">
          <div>
            <img src="/svgs/children.svg" alt="Children" />
          </div>

          <div className="flex items-center justify-between gap-6">
            <img
              src="/svgs/minus.svg"
              onClick={() => handlePassengerChange("children", -1)}
            />
            <p className="w-2 text-center">{passengerValues.children}</p>
            <img
              src="/svgs/addition.svg"
              onClick={() => handlePassengerChange("children", 1)}
            />
          </div>
        </div>

        {/* Infants */}
        <div className="flex justify-between items-center bg-white w-[20rem] rounded pl-4 pr-1 py-1">
          <div>
            <img src="/svgs/infants.svg" alt="Infants" />
          </div>

          <div className="flex items-center justify-between gap-6">
            <img
              src="/svgs/minus.svg"
              onClick={() => handlePassengerChange("infants", -1)}
            />
            <p className="w-2 text-center">{passengerValues.infants}</p>
            <img
              src="/svgs/addition.svg"
              onClick={() => handlePassengerChange("infants", 1)}
            />
          </div>
        </div>
      </div>
      <div
        className="flex flex-col items-center"
        onClick={() => handleSubmit()}
      >
        <button className="w-[20rem] rounded text-white py-3 bg-[#223E7C]">
          Search Flight
        </button>
      </div>
      {showFromModal && (
        <SlidableModal
          data={airports}
          onSelect={handleFromSelect}
          onClose={() => setShowFromModal(false)}
        />
      )}
      {/* SlidableModal for "To Destination" */}
      {showToModal && (
        <SlidableModal
          data={airports}
          onSelect={handleToSelect}
          onClose={() => setShowToModal(false)}
        />
      )}
      {/* Error cards */}
      {errorFrom && (
        <ErrorCard message={errorFrom} onClose={() => setErrorFrom(null)} />
      )}
      {errorTo && (
        <ErrorCard message={errorTo} onClose={() => setErrorTo(null)} />
      )}
      {errorData && (
        <ErrorCard message={errorData} onClose={() => setErrorData(null)} />
      )}{" "}
      {loading && (
        <div className="fixed  inset-0 z-50 overflow-hidden flex items-center justify-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0  opacity-75"></div>
        </div>
        <div className=" rounded-lg p-4 bg-gray-500">
          {/* <p className="text-white text-center text-lg font-bold w-[17rem]">{message}</p> */}
          <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          {/* <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            Close
          </button> */}
        </div>
      </div>
      )}
    </main>
  );
}
