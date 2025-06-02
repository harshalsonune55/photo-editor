const dropArea = document.querySelector('.to');
const fileInput = document.querySelector('#filechoose');

dropArea.addEventListener('click', () => {
    fileInput.click();
});

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('highlight');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('highlight');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        document.querySelector('.gi').textContent = `Selected: ${files[0].name}`;
    }
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        document.querySelector('.gi').textContent = `Selected: ${fileInput.files[0].name}`;
    }
});