/* eslint-disable react/prop-types */
export const AuthLayout = ({ children, title }) => {
 return (
  <>
   <main>
    <section id="contact" className="lg:me-32 mr-0 lg:my-24">
     <div className="lg:flex justify-between items-center">
      <div className="w-full lg:w-[45%] flex justify-start">
       <img src="/images/login.png" alt="" className="w-[80%] lg:w-full" />
      </div>
      <div className="lg:w-[40%] text-xl [&>p]:my-8 [&>p]:indent-10 px-[18px] lg:px-0">
       <div className="flex justify-center items-center relative">
        <a href="/">
         <i className="fa-solid fa-chevron-left text-2xl absolute left-0 top-7 text-third"></i>
        </a>
        <h1 className="font-secondary text-4xl lg:text-5xl text-center">{title}</h1>
       </div>
       <p className="text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse beatae odio aliquam</p>
       {children}
      </div>
     </div>
    </section>
   </main>
  </>
 );
};
