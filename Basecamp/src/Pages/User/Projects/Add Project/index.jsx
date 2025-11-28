import React from 'react'
import './addproject.css'
function index() {
  return (
    <div className='add-project'>
        <form action="">
             <h2>New Project</h2>
      <label name="project-name">
        Name
      </label>
      <input type="text" name="project-name" id="project-name" />
      <label name="project-desc">
        Description
      </label>
      <textarea name="project-desc" id="project-desc"></textarea>
      <button type='submit'>
        Create Project
      </button>
        </form>
    </div>
  )
}

export default index
