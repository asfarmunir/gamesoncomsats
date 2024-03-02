"use client"

import React from 'react'
import { MdDashboard } from "react-icons/md";
import { GiDatabase } from "react-icons/gi";
import { FaCloud, FaBell } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import { SiSpringsecurity } from "react-icons/si";
import { IoExtensionPuzzle, IoSettings } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { usePathname } from "next/navigation";
import Link from "next/link";


const Navlinks = () => {

      const adminLinks = [
    { text: "Home", description: "Sports portal", icon: <MdDashboard /> , href:"/" },
    { text: "Inventory", description: "Manage equipments", icon: <GiDatabase />, href:"/inventory" },
    {
      text: "Events",
      description: "Manage events",
      icon: <FaCloud />,
      href:"/events"
    }, 
  ];
    
  const pathname = usePathname();
  console.log(pathname)

  return (
    <div id="nav" className="w-full px-6">
            {adminLinks.map((link, index) => (
              <Link
                href={link.href}
                key={index}
                className={`w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 ${
                  link.href === pathname
                    ? "bg-blue-800 hover:bg-blue-800/60"
                    : "hover:bg-white/5 "
                } transition ease-linear duration-150`}
                // onClick={() => handleLinkClick(index)}
              >
                <div>
                  {link.icon &&
                    React.cloneElement(link.icon, {
                      className: `w-6 h-6 mr-1 ${
                        link.href === pathname ? "text-white" : "text-slate-300"
                      }`,
                    })}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-lg font-bold leading-5 ${
                      link.href === pathname ? "text-white" : "text-slate-400"
                    } `}
                  >
                    {link.text}
                  </span>
                  <span
                    className={`text-sm font-light  ${
                      link.href === pathname ? " text-gray-100" : "text-slate-400"
                    } hidden md:block`}
                  >
                    {link.description}
                  </span>
                </div>
              </Link>
            ))}
          </div>
  )
}

export default Navlinks