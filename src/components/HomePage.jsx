import React from 'react'
import { Link } from 'react-router-dom';
import NavBar from "./NavBar"
import LandingPageAnimation from "./LandingPageAnimation"
import MarqueeAnimation from "./MarqueeAnimation"
import Timeline from "./Timeline";
const HomePage = () => {
    return (
        <div>
            <NavBar />
            <h1 className="absolute top-[28%] left-[5%] text-3xl">Take control of your finances <br />EFFORTLESSLY</h1>
            <button className="absolute top-[43%] left-[5%] bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="button">
                <Link to="/login">Log In</Link>
            </button>
            <button className="absolute top-[43%] left-[12%] bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="button">
                <Link to="/signup">Sign Up</Link>
            </button>
            <div className="absolute top-[70%] left-0 w-full z-10">
                <hr className="border border-gray-500" />
            </div>
            <div className="relative top-[420px]">
                <MarqueeAnimation />
            </div>
            <div className="absolute top-[85%] left-0 w-full z-10">
                <hr className="border border-gray-500" />
            </div>
            <div className="absolute top-[85%] left-0 w-full z-10">
                <Timeline />
            </div>
        </div>
    )
}

export default HomePage
