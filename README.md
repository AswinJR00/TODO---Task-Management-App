## README

This repository contains the source code and resources for the Hackathon App built as part of the [Katomaran](https://www.katomaran.com) hackathon challenge.

## Features
- Modern user interface with intuitive navigation  
- Built using MVVM (Model-View-ViewModel) design pattern for scalability and maintainability  
- Modular and structured codebase for easy extension  
- Responsive layouts for different screen sizes  
- Working APK file available in the releases section  

## Architecture
The application follows the *MVVM architecture pattern*.

UI Layer (Activities/Fragments)
↓
ViewModel
↓
Repository
↙ ↘
Remote API Local DB (Room)


## Project Structure
app/
┣─ data/
┃ ┣─ repository/
┃ ┣─ model/
┃ ┣─ local/
┃ ┗─ remote/
┣─ ui/
┃ ┣─ view/
┃ ┗─ viewmodel/
┣─ utils/
┣─ di/ # Dependency Injection
┗─ MainApplication.kt


## Setup Instructions
1. Clone this repository  
   ```bash
   git clone https://github.com/your-username/hackathon-app.git  
   cd hackathon-app  
Open the project in Android Studio

Let Gradle sync all dependencies

Run the project on an emulator or physical device

## Assumptions
The backend API is mocked since no API was explicitly mentioned in the brief.

SQLite/Room database is assumed for local storage.

The app requires Android SDK 24+ (Android 7.0+).

Internet permission is assumed to be required for API requests.

Some design assets (icons, images) are assumed/placeholder until final design assets are provided.

## Contribution
Feel free to fork the repo and open a pull request with improvements.

## Hackathon Note
This project is a part of a hackathon run by
https://www.katomaran.com


---

Let me know if you want a .docx version of this sent as a downloadable file—I can retry that too.
