"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  return (
    <main
      className={`flex flex-col items-center justify-between`}
    >
      <div className="flex justify-center items-center my-[76px]">
        <div className="md:w-[35rem]">
          <p className="text-center font-bold items-center mb-2">Contact</p>

          <div className="flex justify-around gap-8 md:gap-2">
            <div>
              <div className="flex gap-3 mb-6 items-center">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ fontSize: 20, color: "green" }}
                />
                <p>Headquarters</p>
              </div>
              <p>DHO s.r.o</p>
              <p>Borivojova 878/35</p>
              <p>130 00 Praha 3</p>
            </div>

            <div>
              <div className="flex gap-3 mb-6 items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ fontSize: 20, color: "green" }}
                />
                <p>Email</p>
              </div>
              <p>info@expanzo.com</p>
            </div>
          </div>
        </div>
      </div>
     
    </main>
  );
}
