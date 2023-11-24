const drawImage = (context, img, canvasWidth, canvasHeight) => {
    // Clear the canvas
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // Calculate scales
    const scaleX = canvasWidth / img.width;
    const scaleY = canvasHeight / img.height;

    // Use the smaller scale
    const scale = Math.min(scaleX, scaleY);

    // Calculate new image dimensions
    const width = img.width * scale;
    const height = img.height * scale;

    // Center the image on the canvas
    const centerShiftX = (canvasWidth - width) / 2;
    const centerShiftY = (canvasHeight - height) / 2;

    // Draw the image
    context.drawImage(img, centerShiftX, centerShiftY, width, height);

    return { scale, centerShiftX, centerShiftY };
};

const drawBoxes = (context, bndboxList, scale, centerShiftX, centerShiftY) => {
    bndboxList.forEach((bndbox) => {
        let { xmin, ymin, xmax, ymax } = bndbox.box;
        const color = bndbox.class_name === 'dog' ? 'rgb(25, 135, 84)' : 'rgb(220, 53, 69)';

        // Scale and shift box coordinates
        xmin = xmin * scale + centerShiftX;
        ymin = ymin * scale + centerShiftY;
        xmax = xmax * scale + centerShiftX;
        ymax = ymax * scale + centerShiftY;

        // Calculate width and height of bounding box
        const boxWidth = xmax - xmin;
        const boxHeight = ymax - ymin;

        context.beginPath(); // Start draw box

        context.rect(xmin, ymin, boxWidth, boxHeight); // draw a rectangle for the object
        context.lineWidth = 1; // 1 pixels wide
        context.strokeStyle = color; // color outline

        // Draw background of class name text
        context.fillStyle = color;

        const width = bndbox.class_name === 'dog' ? 30 : 25; // width of text
        context.fillRect(xmin, ymin, width, 15);

        context.stroke(); // to actually draw the bounding boxes

        // Draw a class name text
        context.font = '15px serif'
        context.fillStyle = '#ffffff'
        context.fillText(bndbox.class_name, xmin, ymin + 12)
    });
};

export { drawImage, drawBoxes };