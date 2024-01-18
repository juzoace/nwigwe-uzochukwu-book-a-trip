"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import flightListing from "../../flight-listing.json";
import FlightCard from "../components/flightcard";

interface Listing {
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
}

export default function Listing() {
  const [filteredData, setFilteredData] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const date = searchParams.get("date");
  const to = searchParams.get("to");
  const fromCountry = searchParams.get("fromCountry"); // from state Code
  const toCountry = searchParams.get("toCountry"); // to state code
  const toCode = searchParams.get("toCode"); // from country
  const fromCode = searchParams.get("fromCode"); // to country
  const fromState = searchParams.get("fromState"); // from code
  const toState = searchParams.get("toState"); // to code
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const infants = searchParams.get("infants");
  // console.log(date);
  const currentDate = new Date(date);
  const formattedDate = currentDate.toLocaleString("en", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  console.log(formattedDate);
  useEffect(() => {
    filterData(from, to, date);
  }, []);

  const MakePayment = async (data: Listing) => {
    console.log(data);
    //  const [loading, setLoading] = useState(false);
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
   
    setLoading(false); 
    router.push(
      `/payment?from=${from}&to=${to}&date=${date}&fromCountry=${fromCountry}&toCountry=${toCountry}&toCode=${toCode}&fromCode=${fromCode}&fromState=${fromState}&toState=${toState}&adults=${adults}&children=${children}&infants=${infants}&flightClass=${data.FlightClass}&ticketFare=${data.TicketFare}&serviceCharge=${data.ServiceCharge}&totalFare=${data.TotalFare}`
    );
}

  const filterData = (
    from: string | null,
    to: string | null,
    date: string | null
  ) => {
    const filteredFlights = flightListing.filter((flight) => {
      // Convert ArrivalDate to a Date object for comparison
      const departureDate = new Date(flight.DepartureDate);

      return (
        flight.DepartureAirportName.toLowerCase() === from.toLowerCase() &&
        flight.ArrivalAirportName.toLowerCase() === to.toLowerCase() &&
        departureDate >= new Date(date)
      );
    });

    setFilteredData(filteredFlights);
  };

  return (
    <div className="bg-[#f7f7f7] p-4 ">
      {/* Button and header */}
      <div className="flex justify-between my-4">
        <div className="w-1/5">
          <img src="/svgs/back button.svg" onClick={() => router.push("/")} />
        </div>
        <div className="w-3/5 text-center">
          <p className="text-xl font-bold">Flight Listings</p>
        </div>
        <div className="w-1/5"></div>
      </div>

      <div className="h-[11rem] p-4 mb-8 bg-white md:flex md:justify-center  md:items-center rounded-xl">
        <div>
          <div className="flex justify-center items-center">
            <img className="mt-2" src="/svgs/flight distance.PNG" />
          </div>
          <div className="flex justify-between items-center my-1">
            <div className="h-[8rem]">
              <p className="font-bold text-2xl leading-36 tracking-normal">
                {fromCode}
              </p>
              <p className="mb-1 font-normal leading-10 tracking-normal text-left text-xs">
                <span>{fromState}</span>, <span>{fromCountry}</span>
              </p>
              <div className="flex gap-2">
                <img src="/svgs/filter.svg" />
                <p className="text-sm leading-10 tracking-normal font-semibold ">
                  {formattedDate}
                </p>
              </div>
            </div>

            <div className="h-[8rem] ">
              <p className="font-bold text-2xl float-right">{toCode}</p>
              <p className="pl-[8rem] mb-1 font-normal leading-10 tracking-normal text-right text-xs">
                <span>{toState}</span>, <span>{toCountry}</span>
              </p>
              <div className="flex justify-end">
                <div className=" flex">
                  <img src="/svgs/dependants.svg" />
                  <p className="pl-1  leading-10 text-right text-xs  font-semibold tracking-normal">
                    {" "}
                    {adults} Adults . {children} Children . {infants} Infant{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available flight */}
      <div className="md:flex md:justify-center md:items-center mb-8">
        <div className="flex justify-start gap-2 md:flex md:justify-between md:gap-4">
          <p className="font-bold text-xl">Available Flights</p>
          <div className="flex justify-center items-center">
            <p className="text-[#223E7C] font-semibold">{filteredData.length} Flights</p>
          </div>
        </div>
      </div>

      <div className=" ">
        {filteredData.map((flight, index) => (
          <div className="">
            <FlightCard key={index} data={flight} makepayment={MakePayment} />
          </div>
          
        ))}
      </div>

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
    </div>
  );
}
