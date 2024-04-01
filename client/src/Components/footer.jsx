import React from 'react'
import Logo from '../assets/logo.png';
import { FaFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa";

function footer() {
  return (
    <div>
   
<footer className="bg-gradient-to-r from-blue-900 to-indigo-950 border-t-4 " aria-labelledby="footer-heading">
  <h2 id="footer-heading" className="sr-only">Footer</h2>
  <div className="px-5 py-12 mx-auto max-w-7xl lg:py-16 md:px-12 lg:px-20">
    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
      <div className="space-y-8 xl:col-span-1">
       <img  className = ' w-52' src= {Logo} alt='logo'/>
       
      </div>
      <div className="grid grid-cols-2 gap-8 mt-12 xl:mt-0 xl:col-span-2">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="text-md tracking-wider bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent font-bold uppercase">Solutions</h3>
            <ul role="list" className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-sm font-normal text-gray-400 hover:text-gray-900 hover:underline"> Marketing </a>
              </li>

              <li>
                <a href="#" className="text-sm font-normal text-gray-400 hover:text-gray-900 hover:underline"> Analytics </a>
              </li>

              <li>
                <a href="#" className="text-sm font-normal text-gray-400 hover:text-gray-900 hover:underline"> Commerce </a>
              </li>

              <li>
                <a href="#" className="text-sm font-normal text-gray-400 hover:text-gray-900 hover:underline"> Insights </a>
              </li>
            </ul>
          </div>
          <div className="mt-12 md:mt-0">
            <h3 className="text-md tracking-wider bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent font-bold uppercase">Support</h3>
            <ul role="list" className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-sm font-normal text-gray-400 hover:text-gray-900 hover:underline"> Pricing </a>
              </li>

              <li>
                <a href="#" className="text-sm font-normal text-gray-400 hover:text-gray-900 hover:underline"> Documentation </a>
              </li>

              <li>
                <a href="#" className="text-sm font-normal text-gray-400 hover:text-gray-900 hover:underline"> Guides </a>
              </li>

              <li>
                <a href="#" className="text-sm font-normal text-gray-400 hover:text-gray-900 hover:underline"> API Status </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden lg:justify-end md:grid md:grid-cols-1">
          <div className="w-full mt-12 md:mt-0">
            <div className="mt-8 lg:justify-end xl:mt-0">
              <h3 className="text-md tracking-wider bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent font-bold uppercase">Subscribe to our newsletter</h3>
              <p className="mt-4 text-sm text-gray-400 lg:ml-auto">The latest news, articles, and resources, sent to your inbox weekly.</p>
              <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="px-5 py-12 mx-auto bg-white/20 max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-20 rounded-xl dark:">
    <div className="flex justify-center mb-8 space-x-6 md:order-last md:mb-0">
      <a href="#" className="text-gray-100 hover:text-gray-500">
        <span className="sr-only">Facebook</span>
        <FaFacebook />
      </a>

      <a href="#" className="text-gray-100 hover:text-gray-500">
        <span className="sr-only">Instagram</span>
        <FaSquareInstagram />
      </a>

      <a href="#" className="text-gray-100 hover:text-gray-500">
        <span className="sr-only">Twitter</span>
        <FaSquareXTwitter />
      </a>

      <a href="#" className="text-gray-100 hover:text-gray-500">
        <span className="sr-only">GitHub</span>
        <FaGithub />
      </a>

      <a href="#" className="text-gray-100 hover:text-gray-500">
        <span className="sr-only">Dribbble</span>
        <FaDribbble />
      </a>
    </div>

    <div className="mt-8 md:mt-0 md:order-1">
      <span className="mt-2 text-sm font-light text-gray-900">
        Copyright © 2023
        <a href="" className="mx-2 hover:text-gray-900" rel="noopener noreferrer">@Novatechzone</a>. Since 2023
      </span>
    </div>
  </div>
</footer>

      
    </div>
  )
}

export default footer
