# AI-Image-generator
This is an image generation tool that allows users to preview the top five generated images. Users can also download the images. The tool is built using DeepSeek Janus Pro 7B, along with Vite, React, and Tailwind CSS
![image](https://github.com/user-attachments/assets/48b44a67-ea11-463a-aff8-30f1b961923d)


## Features

- Generate multiple images from text descriptions
- Preview top 5 generated images in a responsive grid
- Download generated images in WebP format
- Customize generation parameters:
  - Seed value for reproducibility
  - Guidance scale (CFG Weight) for creativity control
  - Temperature settings for variation control
- Responsive design for all devices
- Modern, intuitive user interface
- Real-time loading states and error handling

## Tech Stack

- [DeepSeek Janus Pro 7B](https://deepseek.com) - AI Model
- [Vite](https://vitejs.dev/) - Build tool and development server
- [React](https://reactjs.org/) - UI Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons
- [@gradio/client](https://gradio.app/) - AI Model Integration

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/AJOYSR/AI-Image-generator.git
cd ai-image-generator
```

2. Install dependencies:
```bash
npm install
```
3. Create a hugging face token from hugging face from this link:
```bash
https://huggingface.co/settings/tokens
```
Paste that into your .env file

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit:
```
http://localhost:5173
```

## Usage

1. Enter a descriptive prompt in the text area
2. (Optional) Adjust generation parameters:
   - Seed: Set a specific seed for reproducible results
   - Guidance: Adjust how closely the generation follows your prompt
   - Temperature: Control the randomness of the generation
3. Click "Generate Images" and wait for the results
4. Preview the generated images in the gallery
5. Download any images you like using the download button

## Project Structure

```
ai-image-generator/
├── src/
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── assets/         # Static assets
├── public/             # Public assets
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
└── .env                # Env file for hf_token

```

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch:
```bash
git checkout main
```
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

All rights reserved - AJOY SARKER © 2025

## Author

**AJOY SARKER**
- GitHub: [AJOYSR](https://github.com/ajoysr)
- LinkedIn: [Ajoy Sarker](https://linkedin.com/in/ajoysr)
- Stack Overflow: [Ajoy Sarker](https://stackoverflow.com/users/22562200/ajoy-sarker)

## Acknowledgments

- DeepSeek AI for providing the Janus Pro 7B model
- The Vite, React, and Tailwind CSS communities for their excellent tools and documentation
