ArtShopper App

Deployed App: https://artria-artshopper.netlify.app/

Overview
ArtShopper is a web application designed to browse and filter a collection of artworks, allowing users to explore various cultures, set price ranges, and filter by end dates. The app features a responsive design, optimized for both desktop and mobile devices, with a user-friendly interface to enhance the art shopping experience.
Features

Artwork Browsing: View a grid of artwork items with details such as title, date, price, and an image.
Filter Options: Filter artworks by culture, maximum price, and maximum end date using a collapsible side panel on mobile devices.
Responsive Design: Adapts seamlessly to different screen sizes, with a mobile-friendly layout.
Refresh Functionality: Ability to refresh the artwork list to reload data.
Cart Integration: Option to add artworks to a cart (placeholder functionality included).

Installation
Prerequisites

Node.js (v14.x or later)
npm (v6.x or later)
A modern web browser (Chrome, Firefox, Safari, etc.)

Setup

Clone the repository:git clone https://github.com/yourusername/artshopper.git
cd artshopper


Install dependencies:npm install


Start the development server:npm start


Open your browser and navigate to http://localhost:3000 to view the app.

Usage

Browse Artworks: Scroll through the grid of artwork cards to explore available items.
Filter Artworks: On mobile, tap the "Filter ☰" button to open the filter panel. Select cultures, enter a maximum price, or set a maximum end date, then click "Apply" to filter.
Refresh: Click "Refresh Artwork" to reload the artwork list.
Add to Cart: Click "Add to Cart" on an artwork card to add it (note: this is a placeholder and requires backend integration for full functionality).

Technologies Used

Frontend: React.js
State Management: Redux
CSS: CSS Modules with responsive design using clamp()
Build Tool: npm

Contributing

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit them (git commit -m "Add new feature").
Push to the branch (git push origin feature-branch).
Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For questions or support, please open an issue on the GitHub repository or contact the maintainers.
Acknowledgments

Thanks to the open-source community for tools like React and Redux.
Artwork data inspired by public domain collections.

