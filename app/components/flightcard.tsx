import React from "react";

const FlightCard = ({ data, makepayment }) => {
  return (
    <div className="bg-white mb-3 p-4  rounded-xl">
      <div>
        <div className="flex justify-center items-center">
          <p className="text-[#72737F]">{data.Duration}</p>
        </div>
        <div className=" px-4 md:flex md:justify-center  md:items-center">
          <div className="flex justify-between items-start gap-1">
            {/* Left */}
            <div className="w-[6rem]">
              <p className="font-semibold leading-36 tracking-normal  md:text-xl">
                {new Date(data.ArrivalDate).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>

            {/* Middle */}
            <div className="flex flex-col justify-center items-center ">
              <div className="flex flex-row justify-center items-center pt-1">
                <img src="/svgs/short flight distance.PNG" />
              </div>
              {data.HasStopOver ? (
                <div className="flex flex-row  justify-center items-center">
                  <p className="text-[#72737F] text-center">
                    {" "}
                    {data.StopOvers} stop
                  </p>
                </div>
              ) : (
                <div className="flex flex-row  justify-center items-center">
                  <p className="text-[#72737F]">None-stop</p>
                </div>
              )}
            </div>
            {/* Right */}
            <div className="pl-3 md:pl-3 w-[8rem] md:w-[8rem] ">
              <div>
                <p className="pl-3 font-semibold  leading-36 tracking-normal  md:text-xl">
                  {new Date(data.DepartureDate).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
              {/* <p className="font-semibold text-xl leading-36 tracking-normal">{data.ArrivalAirportCode}</p> */}
            </div>
          </div>
        </div>

        <div className="px-4 flex justify-between md:flex md:justify-center md:gap-[21rem]  md:items-center">
          <div className="">
            <p className="text-[#72737F]">{data.DepartureAirportCode}</p>
          </div>

          <div className="">
            <p className="text-[#72737F]">{data.ArrivalAirportCode}</p>
          </div>
        </div>

        <div className="py-4 md:px-4 flex justify-between gap-[0rem] md:flex md:justify-center md:gap-[10rem]  md:items-center">
          <div className="flex justify-between gap-2">
            <p className="text-[#72737F] text-sm">
              {data.OperatingAirlineName}
            </p>
            {/* <img src="/svgs/dot.PNG" /> */}
            <div className="flex flex-col  justify-center items-center">
              <p className="">.</p>
            </div>
            <p className={`text-sm`}>{data.FlightClass}</p>
          </div>

          <div className="flex justify-between">
            <p className=" font-semibold  leading-36 text-sm tracking-normal  md:text-xl">
              N{data.TotalFare}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center my-4">
          <button
            className=" w-[20rem] md:w-[27rem] rounded text-white py-3 bg-[#223E7C]"
            onClick={() => makepayment(data)}
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
