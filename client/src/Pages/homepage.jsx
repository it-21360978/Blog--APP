import React from "react";
import HERO from "../Components/hero";
import AUthor from "../Components/Autor";
import BLOG from "../Components/blog";
import NEWSLETTER from "../Components/NewsLetter";
import STATISTIC from "../Components/Statistic";
import FOOTER from "../Components/footer";
import TESTINOMIAL from "../Components/testinomial";
import CTA from "../Components/CTA";


function homepage() {
  return (
    <>
   
    
      <HERO />
      <br className="hidden lg:inline-block" />
      <CTA />
      <br className="hidden lg:inline-block" />
      <STATISTIC />
      <br className="hidden lg:inline-block" />
      <BLOG />
      <br className="hidden lg:inline-block" />
      <AUthor />
      <br className="hidden lg:inline-block" />
      <TESTINOMIAL />
      <br className="hidden lg:inline-block" />

      <NEWSLETTER />
      <br className="hidden lg:inline-block" />
      <FOOTER />
    </>
  );
}

export default homepage;
