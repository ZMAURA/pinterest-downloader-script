# Pinterest Image Downloader Scripts

Two simple JavaScript scripts to bulk download images from Pinterest.

## pinterest-image-downloader.js

**Smart High-Quality Pinterest Downloader**

Downloads the highest quality version of Pinterest images by intelligently upgrading low-quality network URLs.

**Features:**
- Scans browser network requests for Pinterest images
- Automatically upgrades URLs from low quality (`/236x/`) to highest available quality (`/originals/`, `/1200x/`, etc.)
- Detects and removes duplicate images
- Compares file sizes to ensure best quality
- Downloads only one copy of each image at maximum resolution

**How to use:**
1. Browse Pinterest and scroll through images you want
2. Open DevTools (F12) → Console tab
3. Paste the script and press Enter
4. Images download as `pinterest-1.jpg`, `pinterest-2.jpg`, etc.

---

## network-jpg-downloader.js

**Simple Network JPG Downloader**

Downloads all JPG images currently loaded in the browser's network tab.

**Features:**
- Extracts all `.jpg` images from network requests
- Fast bulk download
- No filtering or processing

**How to use:**
1. Browse any website and load the images you want
2. Open DevTools (F12) → Console tab
3. Paste the script and press Enter
4. Images download as `network-1.jpg`, `network-2.jpg`, etc.

---

## Notes

- Both scripts require the browser to allow multiple downloads (you may need to click "Allow" when prompted)
- Images are saved to your default downloads folder
- Works in Chrome, Edge, Firefox, and other modern browsers
