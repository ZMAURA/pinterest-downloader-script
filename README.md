# Pinterest Image Downloader Scripts

Two simple JavaScript scripts to bulk download images from Pinterest.

## domscript.js

**DOM Image Downloader - Best Quality**

Downloads only the images currently visible on your screen from the DOM.

**Features:**
- Scans visible images in the page DOM
- Automatically detects and removes duplicate resolutions
- Compares file sizes to download only the highest quality version
- Limited to images currently loaded on screen

**How to use:**
1. Scroll to the section of Pinterest with images you want visible on screen
2. Open DevTools (F12) → Console tab
3. Paste the script and press Enter
4. Images download as `pinterest-1.jpg`, `pinterest-2.jpg`, etc.

**Note:** Only downloads what's currently in your viewport/DOM - best quality but fewer images.

---

## networkscript.js

**Network Downloader - Scroll All You Want**

Downloads all images you've scrolled past from the browser's network log.

**Features:**
- Captures everything loaded in the network tab
- Scroll as much as you want to load more images
- Automatically upgrades low-quality URLs to best available quality
- Downloads all images you've passed by

**How to use:**
1. Open DevTools (F12) → Network tab
2. **Disable cache** (checkbox in Network tab)
3. Scroll through Pinterest to load all the images you want
4. Switch to Console tab
5. Paste the script and press Enter
6. Images download as `pinterest-1.jpg`, `pinterest-2.jpg`, etc.

**Important:**
- If you reload the page, **clear the network log** first (clear button in Network tab)
- Image quality will be lower than DOM method but you can load unlimited images by scrolling

---

## Notes

- Both scripts require the browser to allow multiple downloads (you may need to click "Allow" when prompted)
- Images are saved to your default downloads folder
- Works in Chrome, Edge, Firefox, and other modern browsers
