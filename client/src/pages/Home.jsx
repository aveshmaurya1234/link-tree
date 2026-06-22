import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Home = () => {
  const user = useSelector(state => state.user)
 
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-2.5 border-b border-b-gray-300 bg-slate-200">
        <h1 className="text-2xl font-bold text-green-600"> Link<span className="text-black">Hub</span> </h1>
  
          <div className="flex items-center gap-4">
            <NavLink to={"/login"} className="px-5 py-1 rounded-full border text-green-600 bg-white border-green-600 hover:bg-green-600 hover:text-gray-100"> Login  </NavLink>
            <NavLink to={"/register"} className="px-5 py-1 rounded-full border text-white bg-green-600 hover:text-green-600 hover:bg-gray-100 hover:border-green-600"> Sign Up Free</NavLink>
          </div>

      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-16 py-20">
        <div className="grid md:grid-cols-2 items-center gap-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              One Link <br /> For All Your Content
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              Share all your social media profiles, websites, YouTube channels, portfolios and more from a single beautiful page.
            </p>

            <div className="mt-8 flex gap-4">
              <NavLink to={"/register"} className="bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700">  Get Started Free </NavLink>

              <button className="border px-6 py-3 rounded-full font-medium hover:bg-gray-100"> Learn More </button>
            </div>
          </div>

          {/* Right Mockup */}
          <div className="flex justify-center">
            <div className="bg-gray-100 p-6 rounded-3xl shadow-lg w-80">
              <div className="flex flex-col items-center">
                <img src="https://i.pravatar.cc/150" alt="" className="w-24 h-24 rounded-full" />

                <h2 className="mt-4 font-bold text-xl">@avesh</h2>

                <p className="text-gray-500 text-sm"> MERN Stack Developer</p>

                <div className="w-full mt-6 space-y-3">
                  <button className="w-full bg-white py-3 rounded-xl shadow"> YouTube</button>

                  <button className="w-full bg-white py-3 rounded-xl shadow"> GitHub </button>

                  <button className="w-full bg-white py-3 rounded-xl shadow"> LinkedIn</button>

                  <button className="w-full bg-white py-3 rounded-xl shadow"> Portfolio</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-16 py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center">
          Everything You Need
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-bold text-xl">
              Unlimited Links
            </h3>

            <p className="text-gray-600 mt-3">
              Add all your important links in one place.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-bold text-xl">
              Analytics
            </h3>

            <p className="text-gray-600 mt-3">
              Track clicks and understand your audience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-bold text-xl">
              Custom Profile
            </h3>

            <p className="text-gray-600 mt-3">
              Personalize your page with profile image and bio.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-20 text-center">
        <h2 className="text-4xl font-bold">
          Ready To Share Everything In One Link?
        </h2>

        <p className="text-gray-600 mt-4">
          Create your free page and start growing today.
        </p>

        <button className="mt-8 bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700">
          Create Your Page
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-gray-500">
        © 2026 LinkHub. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;