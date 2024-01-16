"use client";
import { useState, forwardRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import ErrorCard from "./components/errorcard";
import SlidableModal from "./components/modal";
import airports from "../airports.json";

export default function Home() {
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [passengerValues, setPassengerValues] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    from: "",
    to: "",
    travelDate: new Date()
  });
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [errorFrom, setErrorFrom] = useState("");
  const [errorTo, setErrorTo] = useState("");

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

  const handleFromSelect = (selectedItem) => {
    // If new value then allow
    if (selectedItem.Name !== passengerValues.to) {
      setPassengerValues((prevValues) => ({
        ...prevValues,
        from: selectedItem.Name,
      }));
      setShowFromModal(false);
      setErrorFrom(""); // Reset error
    } else {
      // Show error card
      setErrorFrom("Current location and  destination can't be the same");
    }
  };

  const handleToSelect = (selectedItem) => {
    // If new value then allow
    if (selectedItem.Name !== passengerValues.from) {
      setPassengerValues((prevValues) => ({
        ...prevValues,
        to: selectedItem.Name,
      }));
      setShowToModal(false);
      setErrorTo(""); // Reset error
    } else {
      // Show error card
      setErrorTo("Current location and destination can't be the same");
    }
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input rounded w-[20rem] pl-2 py-4 "
      onClick={onClick}
    >
      <img
        src="/svgs/departure.svg"
        width={70}
        height={70}
        alt=""
        className=""
      />
    </button>
  ));

  const handlePassengerChange = (type, value) => {
    setPassengerValues((prevValues) => ({
      ...prevValues,
      [type]: Math.max(0, prevValues[type] + value), // Ensure the value doesn't go below 0
    }));
  };

  return (
    <main className=" p-4 bg-[#f7f7f7]">
      <div className="flex flex-col items-center">
        <div className="my-4">
          <h1 className="font-medium ">Search Flight</h1>
        </div>

        {/* From Destination */}
        <div
          className="flex items-center bg-white w-[20rem] mt-3 px-[0.5rem] rounded h-12"
          onClick={() => setShowFromModal(true)}
        >
          <img className="mr-4" src="/svgs/from destination.svg" alt="From Destination" />
          <p className="text-sm">
            {passengerValues.from}
          </p>
        </div>

        {/* To Destination */}
        <div
          className="flex items-center bg-white w-[20rem] my-3 px-[0.5rem] rounded h-12"
          onClick={() => setShowToModal(true)}
        >
          <img className="mr-7" src="/svgs/to destination.svg" alt="To Destination" />
          <p className=" text-sm">
            {passengerValues.to}
          </p>
        </div>

        {/* Date Picker */}
        <div className="bg-white rounded flex justify-between w-[20rem]">
          <DatePicker
            withPortal
            minDate={new Date()}
            selected={passengerValues.travelDate}
            onChange={(date) => setPassengerValues((prevValues) => ({
              ...prevValues,
              travelDate: date,
            }))}
            customInput={<ExampleCustomInput />}
            popperPlacement={isMobile ? "top-start" : "bottom-start"}
          />
          {passengerValues.travelDate.toString()}
          {/* <p>jewdf</p> */}

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

      <div className="flex flex-col items-center">
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
    </main>
  );
}
