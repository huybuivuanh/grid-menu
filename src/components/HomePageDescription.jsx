const HomePageDescription = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header Section */}
      <header className="bg-blue-600 w-full py-8 text-center text-white">
        <h1 className="text-5xl font-bold">Font Selection & Grid Menu App</h1>
        <p className="text-lg mt-2 opacity-90">
          An interactive way to browse and select fonts efficiently
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl w-full p-6 mt-10 space-y-8">
        {/* Project Overview */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Project Overview
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            This application provides an innovative approach to font selection
            by offering both grid-based menus and dropdown-based menus
            with enhanced user interaction. Instead of scrolling through long
            lists, users can quickly preview, compare, and select fonts in an
            intuitive layout.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            The project supports multiple font selection methods, including
            recent font tracking, hover previews, pagination, and a text
            area that updates dynamically based on user interaction. This
            ensures a seamless and efficient way to explore a large number of
            fonts.
          </p>
        </section>

        {/* Key Features */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Key Features
          </h2>
          <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
            <li>
              <strong>Grid-Based Font Selection:</strong> Quickly browse fonts
              in a structured grid.
            </li>
            <li>
              <strong>Dropdown Menu with Recent Fonts:</strong> Efficiently
              access recently used fonts.
            </li>
            <li>
              <strong>Hover Font Preview:</strong> Instantly preview fonts by
              hovering over options.
            </li>
            <li>
              <strong>Text Area Integration:</strong> See font changes in
              real-time while typing.
            </li>
            <li>
              <strong>Google Font Loading:</strong> Fetch and display fonts
              dynamically.
            </li>
          </ul>
        </section>

        {/* Team Members */}
        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Team Members
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li>Vu Anh Huy Bui (wgv256)</li>
            <li>Carter Dansereau (qwx762)</li>
            <li>Conner LeBlanc (col397)</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-600 mt-10">
        <p>
          &copy; {new Date().getFullYear()} Font Selection App - Developed by
          Team
        </p>
      </footer>
    </div>
  );
};

export default HomePageDescription;
