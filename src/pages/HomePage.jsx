const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header Section */}
      <h1 className="bg-blue-500 font-bold text-4xl text-white text-center w-full p-6">
        Font Grid Menu Project
      </h1>

      {/* Description Section */}
      <div className="max-w-3xl bg-white shadow-md p-6 mt-6 rounded-md text-gray-700">
        <h2 className="text-2xl font-semibold mb-3">Project Overview</h2>
        <p className="text-lg leading-relaxed">
          This project explores an alternative to traditional dropdown menus by
          implementing a grid-based font selection menu. Instead of scrolling
          through a long list of fonts, users can quickly visualize and select
          fonts in an interactive grid.
        </p>
        <p className="text-lg mt-4">
          The goal is to improve the user experience by reducing selection time
          and making font comparison more intuitive. The system will be
          evaluated against traditional dropdown menus to measure efficiency and
          usability.
        </p>
      </div>

      {/* Team Members Section */}
      <div className="max-w-3xl bg-white shadow-md p-6 mt-6 rounded-md text-gray-700">
        <h2 className="text-2xl font-semibold mb-3">Team Members</h2>
        <ul className="list-disc pl-5 text-lg">
          <li>Vu Anh Huy Bui (wgv256)</li>
          <li>Carter Dansereau (qwx762)</li>
          <li>Conner LeBlanc (col397)</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
