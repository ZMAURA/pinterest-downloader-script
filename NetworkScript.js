(async function() {
    const imageUrls = [];
    
    const resources = performance.getEntriesByType('resource');
    resources.forEach(resource => {
        const url = resource.name;
        if (/\.jpg(\?.*)?$/i.test(url)) {
            imageUrls.push(url);
        }
    });
    
    if (imageUrls.length === 0) {
        alert('No JPG images found in network!');
        return;
    }
    
    async function downloadImage(url, index) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement('a');
            const objectUrl = URL.createObjectURL(blob);
            
            link.href = objectUrl;
            link.download = `network-${index + 1}.jpg`;
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
    
    for (let i = 0; i < imageUrls.length; i++) {
        const success = await downloadImage(imageUrls[i], i);
        if (success) successCount++;
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    alert(`Downloaded ${successCount}/${imageUrls.length} JPG images`);
})();