(async function() {
    const imageUrls = [];
    
    document.querySelectorAll('img').forEach(img => {
        if (img.src && img.src.startsWith('http')) {
            imageUrls.push(img.src);
        }
        if (img.srcset) {
            const srcsetUrls = img.srcset.split(',').map(s => s.trim().split(' ')[0]);
            srcsetUrls.forEach(url => {
                if (url.startsWith('http')) {
                    imageUrls.push(url);
                }
            });
        }
    });
    
    if (imageUrls.length === 0) {
        alert('No images found!');
        return;
    }
    
    function getImageFingerprint(url) {
        let fingerprint = url.split('?')[0];
        fingerprint = fingerprint.replace(/^https?:\/\/(www\.)?/, '');
        fingerprint = fingerprint.replace(/\/\d+x\d*\//g, '/SIZE/');
        fingerprint = fingerprint.replace(/\/originals\//g, '/SIZE/');
        fingerprint = fingerprint.replace(/[_-]\d+x\d+/g, '');
        fingerprint = fingerprint.replace(/[_-](large|medium|small|thumb)/gi, '');
        const filenameParts = fingerprint.split('/').pop().split('.')[0];
        const mainId = filenameParts.replace(/[_-]\d+$/, '');
        return mainId;
    }
    
    async function getFileSize(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const size = parseInt(response.headers.get('content-length') || 0);
            return size;
        } catch {
            return 0;
        }
    }
    
    const imageGroups = new Map();
    
    imageUrls.forEach(url => {
        const fingerprint = getImageFingerprint(url);
        if (!imageGroups.has(fingerprint)) {
            imageGroups.set(fingerprint, []);
        }
        imageGroups.get(fingerprint).push(url);
    });
    
    const bestImages = [];
    
    for (const [fingerprint, candidates] of imageGroups) {
        if (candidates.length === 1) {
            bestImages.push(candidates[0]);
        } else {
            const sizesPromises = candidates.map(async (url) => {
                const size = await getFileSize(url);
                return { url, size };
            });
            
            const candidatesWithSizes = await Promise.all(sizesPromises);
            candidatesWithSizes.sort((a, b) => b.size - a.size);
            bestImages.push(candidatesWithSizes[0].url);
        }
    }
    
    async function downloadImage(url, index) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement('a');
            const objectUrl = URL.createObjectURL(blob);
            
            let extension = 'jpg';
            const extMatch = url.match(/\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i);
            if (extMatch) {
                extension = extMatch[1].toLowerCase();
            } else if (blob.type) {
                extension = blob.type.split('/')[1].split(';')[0];
            }
            
            link.href = objectUrl;
            link.download = `pinterest-${index + 1}.${extension}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(objectUrl), 100);
            return true;
        } catch (error) {
            return false;
        }
    }
    
    let successCount = 0;
    
    for (let i = 0; i < bestImages.length; i++) {
        const success = await downloadImage(bestImages[i], i);
        if (success) successCount++;
        await new Promise(resolve => setTimeout(resolve, 150));
    }
    
    alert(`Downloaded ${successCount}/${bestImages.length} images`);
})();