import React from 'react'
import './allprojects.css'
import { GoNorthStar } from "react-icons/go";
import { LiaPenAltSolid } from "react-icons/lia";
import { IoPeopleOutline } from "react-icons/io5";
import ProjectCard from '../../../../Components/User/projectcard/card';
export default function index() {
  return (
    <section id='allprojects'>
      <h1>Projects</h1>
      <div className="sortprojects">
        <div className="allb">
          <button id='all-btn'><GoNorthStar/> All projects</button>
          <button id='crt-btn'><LiaPenAltSolid/>Created by me</button>
          <button id='shr-btn'><IoPeopleOutline/>Shared with me</button>
        </div>
    
      </div>
      <ProjectCard
        title="My Project"
        email="example@mail.com"
        description="This is a project card"
      />
    </section>
  )
}
