import React from "react";

function Statistic() {
  return (
    <div data-aos="fade-right"
    data-aos-offset="300"
    data-aos-easing="ease-in-sine">
      <section className="bg-gradient-to-r from-cyan-500 to-blue-500 dark:bg-gray-900 rounded-xl">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Company
            </h2>
          </div>
          <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">73M+</dt>
              <dd className="font-light text-gray-800 dark:text-gray-900">
                developers
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">1B+</dt>
              <dd className="font-light text-gray-800 dark:text-gray-900">
                contributors
              </dd>
            </div>
            <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">4M+</dt>
              <dd className="font-light text-gray-800 dark:text-gray-900">
                organizations
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}

export default Statistic;
