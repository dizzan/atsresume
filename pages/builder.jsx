import React, { useState, createContext, useContext } from "react";
import Language from "../components/form/Language";
import Meta from "../components/meta/Meta";
import FormCP from "../components/form/FormCP";
import LoadUnload from "../components/form/LoadUnload";
import Preview from "../components/preview/Preview";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import SocialMedia from "../components/form/SocialMedia";
import WorkExperience from "../components/form/WorkExperience";
import Skill from "../components/form/Skill";
import PersonalInformation from "../components/form/PersonalInformation";
import Summary from "../components/form/Summary";
import Projects from "../components/form/Projects";
import Education from "../components/form/Education";
import dynamic from "next/dynamic";
import Certification from "../components/form/certification";

const ResumeContext = createContext(DefaultResumeData);

// server side rendering false
const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function Builder(props) {
  // resume data
  const [resumeData, setResumeData] = useState(DefaultResumeData);

  // form hide/show
  const [formClose, setFormClose] = useState(false);

  // profile picture
  const handleProfilePicture = (e) => {
    const file = e.target.files[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData({ ...resumeData, profilePicture: event.target.result });
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
    console.log(resumeData);
  };

   return (
    <>
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          handleProfilePicture,
          handleChange,
        }}
      >
        {/* ⬇️ SCOATE COMPONENTA META ⬇️ */}
        
        <div className="f-col gap-4 md:flex-row justify-evenly max-w-7xl md:mx-auto md:h-screen">
          {!formClose && (
            <Form/>
          )}
          <Preview/>
        </div>
        <FormCloseOpenBtn formClose={formClose} setFormClose={setFormClose}/>
        <Print/>
      </ResumeContext.Provider>
    </>
  );
}
export {ResumeContext};
