import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
   <footer className='bg-purple-950 text-white p-3 flex justify-center'>
    <p> Copyright &copy; {currentYear} Get me a Coffee - All rights reserved</p>
   </footer>
  )
}

export default Footer
