# Photo Editor

An end-to-end photo editing web application that allows users to upload, edit, and save images directly from their browser. Built using Node.js, Express, and EJS, this application provides a seamless and interactive image editing experience.

## 🚀 Features
- **Image Upload**: Users can upload images from their local device.
- **Real-time Editing**: Apply various edits such as filters, cropping, and adjustments.
- **User Authentication**: Secure login and registration system.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## 🛠️ Technologies Used
- **Frontend**: HTML, CSS, JavaScript, EJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js
- **Image Processing**: Sharp library

## 📁 Project Structure
```
photo-editor/
├── database/           # Database connection and models
├── middleware/         # Custom middleware functions
├── models/             # Mongoose schemas
├── public/             # Static assets (CSS, JS, images)
├── views/              # EJS templates
├── main.js             # Entry point of the application
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

## 🧑‍💻 Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB instance running

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/harshalsonune55/photo-editor.git
   cd photo-editor
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```
4. **Start the Application**:
   ```bash
   npm start
   ```
   The application will be running at `http://localhost:3000`.

## 📸 Usage
1. Navigate to `http://localhost:3000` in your browser.
2. Register a new account or log in.
3. Upload an image to begin editing.
4. Apply desired edits and save the final image.

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License
This project is licensed under the MIT License.