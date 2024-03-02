import React from "react";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Logout from "./Logout";
import Link from "next/link";
import Navlinks from "./Navlinks";

const Sidebar = async () => {

  const session = await getServerSession(authOptions)

  return (
    <div>
      <div className="bg-slate-200 flex  h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
        {/* SideBar */}
        <div
          id="menu"
          className="hidden md:block bg-gradient-to-l from-blue-900 to-blue-950 min-h-screen  text-slate-300 w-80  overflow-y-scroll pb-8"
        >
          <div id="logo" className="mt-6 px-6">
            <h1 className="text-lg md:text-3xl font-bold border-b border-slate-500 pb-2 text-white mb-2">
             Sports Portal
            </h1>
            <p className="text-slate-300 text-sm">
              Manage your actions and activities
            </p>
          </div>
        
        {
          session ? ( <div
            id="profile"
            className="px-6 py-6 bg-indigo-950 mt-2 mb-4 mx-2 rounded-lg"
          >
            <p className="text-white">Welcome,</p>
            <div href="#" className="inline-flex w-full space-x-3 mt-2 items-center">
              <span>
                <img
                  className="rounded-full w-8 h-8"
                  src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80"
                  alt=""
                />
              </span>
              <div className="w-full">
                <p className="flex items-center justify-between w-full">
                  <span className="text-sm md:text-base font-bold capitalize">
                  {session.user.name}
                </span>
                <Logout />
                </p>
                
                <span className="text-xs  block text-slate-400 capitalize">{session.user.role}</span>
              </div>
            </div>
          </div> ) :( <div className="px-6 flex items-center justify-center py-6 bg-indigo-950 mt-2 mb-4 mx-2 rounded-lg">
            <Link href={'/login'} className="font-bold text-lg text-white ">Login/Sign</Link>
          </div> )
        }
         
         <Navlinks />
        </div>
        {/* Movbile Sidebar */}
        {/* <div className="flex md:hidden ">
          <input
            type="checkbox"
            id="drawer-toggle"
            className="relative sr-only peer"
            defaultChecked
          />
          <label
            htmlFor="drawer-toggle"
            className="absolute mt-[10%] opacity-80 left-2 inline-block p-4 transition-all duration-500 bg-blue-800 rounded-lg peer-checked:rotate-180 peer-checked:left-64"
          >
            <div className="w-5 h-1 mb-2 rotate-45 bg-white rounded-lg" />
            <div className="w-5 h-1 -rotate-45 bg-white rounded-lg" />
          </label>
          <div className=" fixed top-0  z-20  transition-all duration-500 transform -translate-x-full bg-white shadow-lg peer-checked:translate-x-0 bg-gradient-to-l from-blue-900 to-blue-950 min-h-screen  text-slate-300 w-64  left-0 h-screen overflow-y-scroll pb-8">
            <div id="logo" className="mt-6 px-6">
              <h1 className="text-lg md:text-3xl font-bold text-white mb-2 pb-2 border-b border-slate-500">
                Iso<span className="text-blue-600">m</span>s.{" "}
                <span className=" font-thin">Online</span>
              </h1>
              <p className="text-slate-300 text-sm">
                Manage your actions and activities
              </p>
            </div>
            <div
              id="profile"
              className="px-6 py-6 bg-indigo-950 mt-2 mb-4 mx-2 rounded-lg"
            >
              <p className="text-white">Welcome back,</p>
              <a href="#" className="inline-flex space-x-3 mt-2 items-center">
                <span>
                  <img
                    className="rounded-full w-8 h-8"
                    src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80"
                    alt=""
                  />
                </span>
                <div>
                  <span className="text-sm md:text-base font-bold">
                    Asfar Devs
                  </span>
                  <span className="text-xs  block text-slate-400">Admin</span>
                </div>
              </a>
            </div>

            <div id="nav" className="w-full px-6">
              {links.map((link, index) => (
                <a
                  href="#"
                  key={index}
                  className={`w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 ${
                    active === index
                      ? "bg-blue-800 hover:bg-blue-800/60"
                      : "hover:bg-white/5 "
                  } transition ease-linear duration-150`}
                  onClick={() => handleLinkClick(index)}
                >
                  <div>
                    {link.icon &&
                      React.cloneElement(link.icon, {
                        className: `w-6 h-6 mr-1 ${
                          active === index ? "text-white" : "text-slate-300"
                        }`,
                      })}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-lg font-bold leading-5 ${
                        active === index ? "text-white" : "text-slate-400"
                      } `}
                    >
                      {link.text}
                    </span>
                    <span
                      className={`text-sm font-light  ${
                        active === index ? " text-gray-100" : "text-slate-400"
                      } hidden md:block`}
                    >
                      {link.description}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div> */}
        {/* Mobile Sidebar end */}
      </div>
    </div>
  );
};

export default Sidebar;
