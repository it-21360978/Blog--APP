import React from "react";

function About() {
  return (
    <div data-aos="fade-up"
    data-aos-offset="200"
    data-aos-delay="50"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
    data-aos-mirror="true"
    data-aos-once="false"
    data-aos-anchor-placement="top-center">
      <div className="bg-white py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div>
              <div className="h-auto overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  loading="lazy"
                  alt="Photo by Martin Sanchez"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            <div className="md:pt-8">
              <p className="text-center font-bold  text-indigo-500 md:text-left">
                Who we are
              </p>

              <h1 className="mb-4 text-center font-serif text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl md:mb-6 md:text-left">
                Our competitive advantage
              </h1>

              <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
                Welcome to Write Wave, where innovation meets expression!.
                <br />
                <br />
                Our competitive advantage lies in redefining the art of blogging
                with a seamlessly intuitive platform designed to elevate your
                writing experience. Unlike traditional blog posting
                applications, Write Wave stands out with its user-friendly
                interface, cutting-edge features, and a commitment to fostering
                creativity. Experience the power of a streamlined writing
                process, intuitive editing tools, and a dynamic community of
                like-minded creators. We prioritize user experience, ensuring
                that your journey from idea to publication is not only efficient
                but also enjoyable. With advanced features tailored to meet the
                needs of modern bloggers, Write Wave empowers you to ride the
                wave of creativity and make a splash in the blogosphere. Join us
                on this transformative journey and let your words flow
                effortlessly with Write Wave.
              </p>

              <h2 className="mb-2 text-center font-serif text-xl font-semibold text-gray-800 dark:text-white sm:text-2xl md:mb-4 md:text-left">
                About us
              </h2>

              <p className="mb-6 text-gray-500 sm:text-lg md:mb-8">
                At Write Wave, we believe in the transformative power of words
                and the profound impact they can have on individuals and
                communities. Our story begins with a vision to create a platform
                that goes beyond conventional blogging, offering a dynamic space
                for writers, creators, and storytellers to thrive. Here at Write
                Wave, we are a team of dedicated individuals who share a common
                commitment to fostering creativity, amplifying voices, and
                building a supportive community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
