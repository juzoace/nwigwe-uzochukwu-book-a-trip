"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useSearchParams } from "next/navigation";

const Payment = () => {
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
  const flightClass = searchParams.get("flightClass");
  const ticketFare = searchParams.get("ticketFare");
  const serviceCharge = searchParams.get("serviceCharge");
  const totalFare = searchParams.get("totalFare");
  // @ts-ignore
  const currentDate = new Date(date);
  const formattedDate = currentDate.toLocaleString("en", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  return (
    <div className="bg-[#f7f7f7] p-4 ">
      {/* Button and header */}
      <div className="flex justify-between my-4">
        <div className="w-1/5 cursor-pointer">
          <img src="/svgs/back button.svg" onClick={() => router.push(`/listing?from=${from}&to=${to}&date=${date}&fromCountry=${fromCountry}&toCountry=${toCountry}&toCode=${toCode}&fromCode=${fromCode}&fromState=${fromState}&toState=${toState}&adults=${adults}&children=${children}&infants=${infants}`)} />
        </div>
        <div className="w-3/5 text-center">
          <p className="text-xl font-bold">Make Payment</p>
        </div>
        <div className="w-1/5"></div>
      </div>

        {/* Flight Details */}
      <div className="h-[14rem] md:h-[12rem] py-3 px-4 md:p-4 mb-8 bg-white md:flex md:justify-center  md:items-center rounded-xl">
        <div>
          <div className="flex justify-center items-center mt-2">
            <img className="mt-" src="/svgs/flight distance.PNG" />
          </div>
          <div className="flex justify-center items-center">
            <p>{flightClass} Class</p>
          </div>
          <div className="flex justify-between items-center">
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

      {/* Summary Title*/}
      <div className="md:flex md:justify-center md:items-center mb-8 pl-4 md:pl-0">
        <p className="font-semibold text-sm text-[#565656] ">Summary</p>
      </div>

      {/* Summary Content */}
      <div className="h-[5rem] md:h-[5rem] py-3 px-4 md:p-4 mb-8 bg-white flex-col md:flex md:justify-center  md:items-center rounded-xl">
        
        {/* Ticket fare */}
        <div className="flex justify-between items-center  md:gap-8 md:w-[25rem]"> 
            {/* Ticket Text */}
            <div className="">
                <p className="font-semibold text-sm text-[#BABABA]">
                    Ticket Fare
                </p>
            </div>

            {/* Ticket Price */}
            <div className="">
                <p className="text-lg font-semibold">
                    N {ticketFare}
                </p>
            </div>
        </div>

        {/* Service Charge */}
        <div className="flex justify-between items-center  md:gap-8 md:w-[25rem]">
            {/* Service Charges Text */}
            <div className="">
                <p className="font-semibold text-sm text-[#BABABA]">
                    Service Charges
                </p>
            </div>

            {/* Service Charges */}
            <div className="">
                <p className="text-lg font-semibold">
                    N {serviceCharge}
                </p>
            </div>
        </div>

      </div>

      {/* Total Amount Content*/}
      <div className="h-[3rem] md:h-[3rem] py-3 px-4 md:p-4 mb-8 bg-white md:flex md:justify-center  md:items-center rounded-xl">
        
        {/* Total Amount */}
        <div className="flex justify-between items-center md:gap-8 md:w-[25rem]">

            {/* Total Amount Text */}
            <div className="">
                <p className="font-semibold text-sm">
                    Total Amount
                </p>
            </div>

             {/* Total Amount */}
             <div className="">
                <p className="text-lg font-semibold">
                    N {totalFare}
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Payment;
