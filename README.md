# Hidden Gem Itinerary Compass

MASTER PROMPT: BUILD LOCAL LENS AI

Act as a senior full-stack developer, AI engineer, UI/UX designer, and software architect. Build a complete, fully functional, modern AI-powered local tourism web application named LocalLens AI.

1. Project Vision

Tagline: Discover Beyond the Famous. Explore the Hidden.

LocalLens AI is an intelligent local tourism platform that helps tourists discover hidden attractions, explore cultural heritage, find local food experiences, and generate personalized travel itineraries.

The application must solve a real tourism problem. Do NOT create just a UI mockup or static website. Build a working end-to-end application with functional frontend, backend, AI integration, and real user interactions.

2. Technology Stack

Choose a reliable, easy-to-run stack:

Frontend: React.js with Vite.

Styling: Tailwind CSS or modern CSS.

Backend: Python Flask or FastAPI.

AI: Google Gemini API using environment variables.

Data: Local JSON dataset or SQLite.

Maps: Google Maps search and directions links.

Icons: Lucide React.

First inspect the development environment and existing files. Use installed dependencies where possible.

3. Application Design

Create a premium, visually impressive, responsive travel-tech interface.

Design requirements:

Deep navy, turquoise, white, and subtle gradients.

Beautiful destination photography.

Modern cards with rounded corners and subtle shadows.

Professional typography and consistent spacing.

Smooth transitions and hover effects.

Responsive layout for desktop, tablets, and mobiles.

Attractive loading animations and empty states.

The website should look like a professional startup product, not a basic college project.

4. Main Pages and Features

A. Home Page

LocalLens AI logo and navigation bar.

Attractive hero section with tagline.

Search bar asking users to enter their city.

Explore Destinations button.

Featured destinations and hidden gems.

Explanation of how the platform works.

Footer with project information.

B. AI Hidden Gems Discovery

Allow users to:

Enter a city or location.

Select interests such as history, food, culture, nature, and adventure.

Discover lesser-known tourist destinations.

View destination images, descriptions, location, and cultural significance.

Filter recommendations by category.

Include a useful initial destination dataset for Panipat, Haryana, with relevant historical attractions, local experiences, and lesser-known places. Structure the data so additional cities can easily be added.

C. Smart AI Trip Planner

Create an interactive trip-planning form containing:

Destination city.

Travel budget in INR.

Available time (2 hours, 4 hours, 6 hours, or full day).

Interests.

Number of travellers.

When the user clicks Generate My Journey:

Send preferences to the backend.

Use Gemini AI to generate a personalized itinerary.

Recommend suitable destinations.

Organize destinations in a logical visiting order.

Provide estimated time at each destination.

Include approximate expenses.

Explain why each place is recommended.

Show the complete itinerary in attractive cards.

Provide a functional fallback recommendation system using the local dataset if the Gemini API key is unavailable. Never display fake AI responses as genuine AI results.

D. AI Heritage Guide

Allow users to select a destination and receive:

Historical background.

Cultural significance.

Interesting facts.

Local traditions.

Why the place is worth visiting.

Use Gemini AI when configured and factual local dataset information as fallback. Avoid inventing historical facts.

E. Local Experiences

Create a section for discovering:

Traditional local food.

Popular markets.

Local shopping.

Handicrafts.

Cultural experiences.

Display relevant images, descriptions, and categories.

F. Explore on Map

Display destination locations through map links or an interactive map if practical.

Provide View on Google Maps buttons.

Allow users to open directions.

Never invent geographic coordinates.

5. Backend and AI Integration

Implement real backend API endpoints for:

Fetching destinations.

Searching destinations.

Generating personalized itineraries.

Generating heritage information.

Filtering local experiences.

Use Gemini API securely through a backend environment variable:

GEMINI_API_KEY=your_api_key_here

Requirements:

Never expose API keys in frontend code.

Add proper error handling.

Validate user inputs.

Add loading and error states.

Implement fallback functionality when AI is unavailable.

Use structured JSON responses from the AI wherever possible.

6. Functional Requirements

Every visible button must work.

Implement:

Search functionality.

Category filters.

Destination details.

AI itinerary generation.

Heritage guide interaction.

Map navigation.

Responsive mobile navigation.

Clear form validation.

Loading indicators.

Error messages.

Useful empty states.

Do not leave dead buttons, placeholder pages, fake charts, or nonfunctional sections.

7. Sample Data

Include meaningful sample data for Panipat, Haryana, such as:

Panipat Museum.

Kabuli Bagh Mosque.

Ibrahim Lodhi's Tomb.

Devi Temple.

Salar Gunj Gate.

Local food and shopping experiences.

Add descriptions and relevant source references where possible. Clearly distinguish verified facts from approximate estimates and user-generated suggestions.

Make the dataset expandable to other Indian cities.

8. Additional User Experience

Allow users to save favourite destinations using local storage.

Add a section showing saved destinations.

Include a clear and intuitive navigation system.

Make recommendations easy to understand.

Display estimated costs in Indian Rupees.

Add useful empty states when no destinations match the filters.

9. Project Structure and Documentation

Organize the application into clean frontend and backend folders.

Create:

Complete frontend source code.

Complete backend source code.

Destination dataset.

requirements.txt.

package.json.

.env.example.

README.md.

The README must explain:

Project overview.

Features.

Technology stack.

Installation instructions.

How to obtain and configure the Gemini API key.

How to start frontend and backend.

How to test the application.

10. Final Testing

Before completing the project:

Install all required dependencies.

Start the backend and frontend.

Check that all pages load correctly.

Test destination searching and filtering.

Test itinerary generation.

Test AI fallback functionality without an API key.

Test heritage information.

Test Google Maps links.

Fix runtime errors and broken interactions.

Verify responsive design.

Do not claim that a feature works unless you have actually tested it.

11. Final Deliverable

Build the entire project directly in the current workspace.

Do not stop after generating a plan or designing the frontend. Continue implementing the backend, database, AI integration, and functional interactions.

Do not ask unnecessary questions. Make sensible development decisions independently.

Prioritize a complete, stable, working project over unnecessary complexity.

FINAL GOAL: Deliver a polished, fully functional AI-powered local tourism application named LocalLens AI that can be demonstrated live to hackathon judges and genuinely helps users discover and explore local destinations.

Start building the application now.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/690a8dd7-1b34-5eb1-8c0a-688ba1c5fb77).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
