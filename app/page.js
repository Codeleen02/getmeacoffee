export default function Home(){
  return (
    <>
  <div className="flex  text-white h-[44vh] mx-5 flex-col justify-center items-center ">
    <div className="flex gap-3 justify-center items-center md:text-2xl text-lg font-bold mb-7">Buy me a Coffee <span><img className="w-15" src="coffee.gif" alt="coffee"/></span></div>
    <p className="text-gray-500 md:text-lg text-sm">A crowdfunding platform for creators. get funded by your fans and followers.</p>
    <div>
      <button className="mx-3 mt-9 text-white bg-gradient-to-br from-purple-900 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm md:px-5 md:py-3  py-1 px-2 text-center leading-5 md:rounded-2xl rounded-lg">Start now</button>
      <button className="text-white bg-gradient-to-br from-purple-900 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm md:px-5 md:py-3 py-1 px-2 text-center leading-5 md:rounded-2xl rounded-lg">Read More</button>
    </div>
  </div>
  <div className="bg-white h-0.5 opacity-[75%]"></div>
  <div className="text-white container h-[48vh] flex justify-center flex-col">
    <h1 className="md:text-xl text-lg font-bold mb-9 mx-auto">Your Fans can buy you a coffee</h1>
    <div className="flex justify-center gap-3 mx-5 ">
      <div className="flex flex-col justify-center items-center space-y-2">
        <img className="md:w-15 w-10 mx-auto mt-5 bg-slate-500 rounded-full p-2 text-black" src="work.webp" alt="man"/>
         <p className="mt-3 font-bold text-sm md:text-base text-center">Fans want to help</p>
        <p className="w-3/4 md:text-base text-sm">Your fans are available to help you</p>
      </div>
       <div className="flex flex-col justify-center items-center space-y-2">
        <img className="md:w-15 w-10 mx-auto mt-5 bg-slate-500 rounded-full  text-black" src="dollar1.gif" alt="man"/>
         <p className="font-bold text-sm md:text-base mt-3 text-center">Fans want to help</p>
        <p className=" w-3/4 md:text-base text-sm">Your fans are available to help you</p>
      </div>
       <div className="flex flex-col justify-center items-center space-y-2">
        <img className="md:w-15 w-10 mx-auto  mt-5 bg-slate-500 rounded-full text-black" src="teamwork1.gif" alt="man"/>
        <p className="font-bold text-sm md:text-base  mt-3 text-center">Fans want to help</p>
        <p className="w-3/4 text-start md:text-base text-sm ">Your fans are available to help you</p>
      </div>
    </div>
    </div>
    <div className="bg-white h-0.5 opacity-[75%]"></div>
  <div className="text-white container mx-auto h-[45vh] flex flex-col justify-center items-center ">
    <h1 className="md:text-xl text-base font-bold text-center mt-2 mb-9">Know more about us</h1>
   <iframe className="md:p-5 md:h-60 md:w-120 h-45 w-70" src="https://www.youtube.com/embed/c2ox11z7Ehw?si=jgrpwR93TV6znKmN&amp;start=4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
  </div>
    </>
  );
}
